# 🗳️ ElectIQ: Advanced Civic Education Platform

**Empowering Voters Through AI-Driven Education**

ElectIQ is a comprehensive, production-grade civic education platform designed to simplify the complexities of elections and democratic participation. Built with a modern tech stack and deployed on Google Cloud, it provides citizens with interactive tools to understand their voting journey, learn key electoral concepts, and get instant answers via an AI-powered assistant.

## 🚀 Live Demo
**Live on Google Cloud Run:** [https://electiq-534741630610.us-central1.run.app](https://electiq-534741630610.us-central1.run.app)

---

## ✨ Key Features

### 1. 📅 Interactive Voter Journey
A visually rich, horizontal timeline that guides users through the entire electoral lifecycle—from initial registration and candidate research to election day and final certification.

### 2. 🃏 Civic Flashcards
A gamified learning module with elegant flip animations. Users can quickly master essential terms like "Gerrymandering," "Ranked Choice Voting," and "The Electoral College" through an engaging interactive interface.

### 3. 🤖 ElectIQ AI Assistant
A Gemini-powered chat interface specializing in civic education.
- **Context-Aware:** Tailored for voting rights and electoral processes.
- **Non-Partisan:** Designed to provide factual, unbiased educational data.
- **Robust Integration:** Features a smart fallback system ensuring 100% availability even in demo environments.

### 4. 💡 Election Innovations
A dedicated section exploring the future of democracy, covering advancements like Blockchain Voting, AI in voter outreach, and secure digital identities.

---

## 🛠️ Technology Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Vanilla CSS with Modern UI Design Patterns (Glassmorphism, Dark Mode)
- **Animations:** Framer Motion (for smooth micro-interactions)
- **AI Backend:** Google Gemini (via `@google/generative-ai`)
- **Cloud Infrastructure:**
  - **Google Cloud Run:** Scalable containerized deployment.
  - **Google Artifact Registry:** Secure container image management.
  - **GitHub CLI:** Automated repository management.

---

## 📦 Local Development

To run ElectIQ locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/behemalatha257-hue/ElectIQ.git
   cd ElectIQ
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env.local` file in the root:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to see the result.

---

## ☁️ Deployment

This project is optimized for **Google Cloud Run**. 

**Deployment Command:**
```bash
gcloud run deploy electiq --source . --region us-central1 --allow-unauthenticated
```

The project includes a multi-stage `Dockerfile` optimized for Next.js `standalone` output, ensuring minimal cold-start times and high performance in production.

---

## ⚖️ License
This project is open-source and available for civic education purposes.

*Created for Google's Prompt Wars by B.E. Hemalatha*
