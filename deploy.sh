#!/bin/bash
# ============================================================
#  ElectIQ — Google Cloud Run Deployment Script
#  Run: chmod +x deploy.sh && ./deploy.sh
# ============================================================

set -e  # Exit on any error

# ── Configuration ────────────────────────────────────────────
PROJECT_ID="${GOOGLE_CLOUD_PROJECT:-your-gcp-project-id}"
REGION="${GOOGLE_CLOUD_REGION:-us-central1}"
SERVICE_NAME="electiq-app"
REPO_NAME="electiq"
IMAGE_NAME="${REGION}-docker.pkg.dev/${PROJECT_ID}/${REPO_NAME}/${SERVICE_NAME}"

# ── Color output ─────────────────────────────────────────────
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${CYAN}"
echo "  ███████╗██╗     ███████╗ ██████╗████████╗██╗ ██████╗ "
echo "  ██╔════╝██║     ██╔════╝██╔════╝╚══██╔══╝██║██╔═══██╗"
echo "  █████╗  ██║     █████╗  ██║        ██║   ██║██║   ██║"
echo "  ██╔══╝  ██║     ██╔══╝  ██║        ██║   ██║██║▄▄ ██║"
echo "  ███████╗███████╗███████╗╚██████╗   ██║   ██║╚██████╔╝"
echo "  ╚══════╝╚══════╝╚══════╝ ╚═════╝   ╚═╝   ╚═╝ ╚══▀▀═╝ "
echo -e "${NC}"
echo -e "${BLUE}🗳️  ElectIQ Cloud Run Deployment${NC}"
echo -e "   Project: ${YELLOW}${PROJECT_ID}${NC}"
echo -e "   Region:  ${YELLOW}${REGION}${NC}"
echo -e "   Service: ${YELLOW}${SERVICE_NAME}${NC}"
echo ""

# ── Pre-flight checks ─────────────────────────────────────────
echo -e "${BLUE}[1/7] Running pre-flight checks...${NC}"

if ! command -v gcloud &> /dev/null; then
  echo -e "${RED}❌ gcloud CLI not found. Install: https://cloud.google.com/sdk/docs/install${NC}"
  exit 1
fi

if ! command -v docker &> /dev/null; then
  echo -e "${RED}❌ Docker not found. Install: https://docs.docker.com/get-docker/${NC}"
  exit 1
fi

echo -e "${GREEN}✅ Pre-flight checks passed${NC}"

# ── Authenticate & set project ────────────────────────────────
echo -e "${BLUE}[2/7] Setting GCP project...${NC}"
gcloud config set project "${PROJECT_ID}"
gcloud auth configure-docker "${REGION}-docker.pkg.dev" --quiet
echo -e "${GREEN}✅ GCP project configured${NC}"

# ── Enable required APIs ───────────────────────────────────────
echo -e "${BLUE}[3/7] Enabling required GCP APIs...${NC}"
gcloud services enable \
  run.googleapis.com \
  artifactregistry.googleapis.com \
  cloudbuild.googleapis.com \
  secretmanager.googleapis.com \
  --quiet
echo -e "${GREEN}✅ APIs enabled${NC}"

# ── Create Artifact Registry (if not exists) ──────────────────
echo -e "${BLUE}[4/7] Setting up Artifact Registry...${NC}"
gcloud artifacts repositories describe "${REPO_NAME}" \
  --location="${REGION}" 2>/dev/null || \
gcloud artifacts repositories create "${REPO_NAME}" \
  --repository-format=docker \
  --location="${REGION}" \
  --description="ElectIQ Docker images"
echo -e "${GREEN}✅ Artifact Registry ready${NC}"

# ── Store Gemini API Key in Secret Manager ────────────────────
echo -e "${BLUE}[5/7] Configuring Gemini API Key in Secret Manager...${NC}"
if [ -z "${GEMINI_API_KEY}" ]; then
  echo -e "${YELLOW}⚠️  GEMINI_API_KEY not set in environment."
  echo -e "   Run: export GEMINI_API_KEY=your_key_here${NC}"
  read -p "Enter your Gemini API key: " GEMINI_API_KEY
fi

echo -n "${GEMINI_API_KEY}" | gcloud secrets create gemini-api-key \
  --data-file=- \
  --replication-policy=automatic 2>/dev/null || \
echo -n "${GEMINI_API_KEY}" | gcloud secrets versions add gemini-api-key --data-file=-
echo -e "${GREEN}✅ Secret stored in Secret Manager${NC}"

# ── Build & Push Docker image ─────────────────────────────────
echo -e "${BLUE}[6/7] Building and pushing Docker image...${NC}"
COMMIT_SHA=$(git rev-parse --short HEAD 2>/dev/null || echo "latest")
FULL_IMAGE="${IMAGE_NAME}:${COMMIT_SHA}"
LATEST_IMAGE="${IMAGE_NAME}:latest"

docker build \
  --cache-from "${LATEST_IMAGE}" \
  -t "${FULL_IMAGE}" \
  -t "${LATEST_IMAGE}" \
  .

docker push "${FULL_IMAGE}"
docker push "${LATEST_IMAGE}"
echo -e "${GREEN}✅ Image pushed: ${FULL_IMAGE}${NC}"

# ── Deploy to Cloud Run ────────────────────────────────────────
echo -e "${BLUE}[7/7] Deploying to Cloud Run...${NC}"

# Get Cloud Run service account
SA_EMAIL="${SERVICE_NAME}-sa@${PROJECT_ID}.iam.gserviceaccount.com"

# Create service account if not exists
gcloud iam service-accounts describe "${SA_EMAIL}" 2>/dev/null || \
gcloud iam service-accounts create "${SERVICE_NAME}-sa" \
  --display-name="ElectIQ Cloud Run Service Account"

# Grant Secret Manager access to service account
gcloud secrets add-iam-policy-binding gemini-api-key \
  --member="serviceAccount:${SA_EMAIL}" \
  --role="roles/secretmanager.secretAccessor" \
  --quiet

gcloud run deploy "${SERVICE_NAME}" \
  --image="${FULL_IMAGE}" \
  --region="${REGION}" \
  --platform=managed \
  --allow-unauthenticated \
  --port=3000 \
  --memory=1Gi \
  --cpu=1 \
  --min-instances=0 \
  --max-instances=10 \
  --concurrency=80 \
  --timeout=60s \
  --service-account="${SA_EMAIL}" \
  --set-env-vars="NODE_ENV=production,NEXT_TELEMETRY_DISABLED=1" \
  --set-secrets="GEMINI_API_KEY=gemini-api-key:latest" \
  --quiet

# ── Get Service URL ────────────────────────────────────────────
SERVICE_URL=$(gcloud run services describe "${SERVICE_NAME}" \
  --region="${REGION}" \
  --format='value(status.url)')

echo ""
echo -e "${GREEN}════════════════════════════════════════════════${NC}"
echo -e "${GREEN}  ✅ ElectIQ deployed successfully!${NC}"
echo -e "${GREEN}════════════════════════════════════════════════${NC}"
echo -e "  🌐 Live URL:  ${CYAN}${SERVICE_URL}${NC}"
echo -e "  ❤️  Health:   ${CYAN}${SERVICE_URL}/api/health${NC}"
echo -e "  🤖 AI Chat:  ${CYAN}${SERVICE_URL}/#ai-chat${NC}"
echo -e "${GREEN}════════════════════════════════════════════════${NC}"
echo ""
