// Health check endpoint for Cloud Run / Docker health checks
export async function GET() {
  return Response.json({
    status: 'ok',
    service: 'electiq-app',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '0.1.0',
    environment: process.env.NODE_ENV,
    gemini: !!process.env.GEMINI_API_KEY ? 'configured' : 'missing',
  });
}
