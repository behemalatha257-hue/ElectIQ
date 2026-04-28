import { GoogleGenerativeAI } from '@google/generative-ai';

export const runtime = 'nodejs';

const SYSTEM_PROMPT = `You are ElectIQ AI, an expert civic education assistant specializing in elections, voting processes, democratic systems, and political science. Your mission is to make elections understandable, accessible, and engaging for every citizen.

Guidelines:
- Always be nonpartisan — never favor any political party, candidate, or ideology
- Explain complex concepts in clear, simple language with relevant examples
- Use bullet points and structure for long answers
- Include practical tips voters can act on
- When asked about specific elections, focus on the PROCESS, not outcomes or partisan views
- Encourage civic participation and democratic engagement
- If asked about controversial political opinions, provide balanced perspectives and redirect to factual civic education
- Use emojis sparingly to make responses more readable (e.g., 🗳️ for voting, 📋 for registration, ⚖️ for rights)
- Respond in the user's language if possible
- Keep answers concise unless depth is needed — most answers 2-4 paragraphs max

You can discuss:
✅ Voter registration processes
✅ How votes are cast and counted
✅ Election systems (FPTP, proportional, ranked choice, etc.)
✅ Electoral history and milestones
✅ Voting rights and legislation
✅ Election security and technology
✅ How to research candidates and issues
✅ Global election comparisons
✅ Civic innovations and future of voting

You should NOT discuss:
❌ Which party or candidate to vote for
❌ Partisan political opinions
❌ Unverified election fraud claims without official evidence`;

export async function POST(request) {
  try {
    const { message, history = [] } = await request.json();

    if (!message || typeof message !== 'string') {
      return Response.json({ error: 'Invalid message' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    // Check if key is missing or is the default placeholder
    if (!apiKey || apiKey === 'your_gemini_api_key_here') {
      // Fallback demo response when API key is not set
      const demoResponses = {
        default: "🤖 **ElectIQ AI** is ready to help!\n\nTo enable full AI responses, add your **GEMINI_API_KEY** to the `.env.local` file.\n\nIn the meantime, here are quick answers:\n\n🗳️ **Voter Registration**: Visit your country's official election website to register. In the USA, go to **vote.gov**.\n\n📅 **Election Timeline**: Typically spans 6–12 months — from candidate filing to final certification.\n\n🏛️ **How Votes Are Counted**: Ballots are tallied at precinct level, reported to county, then state/national authorities.",
      };
      return Response.json({ reply: demoResponses.default });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      systemInstruction: SYSTEM_PROMPT,
    });

    // Build chat history for context
    // Gemini strictly requires an alternating user/model sequence starting with user
    const formattedHistory = [];
    let expectedRole = 'user';
    
    // We filter the incoming history to ensure it strictly alternates
    // We skip the first message if it's from the assistant
    for (const msg of history) {
      const mappedRole = msg.role === 'assistant' ? 'model' : 'user';
      if (mappedRole === expectedRole) {
        formattedHistory.push({
          role: mappedRole,
          parts: [{ text: msg.content }],
        });
        expectedRole = expectedRole === 'user' ? 'model' : 'user';
      }
    }

    // The current expectedRole after a valid sequence of pairs should be 'user'
    // If the sequence ended with a user message (expectedRole === 'model'), it's invalid (we are about to send a user message)
    // We must ensure the history ends with a model message, so the next incoming message (from user) fits the pattern.
    if (formattedHistory.length > 0 && formattedHistory[formattedHistory.length - 1].role !== 'model') {
      formattedHistory.pop();
    }

    // Keep only the last 10 messages (5 pairs)
    const chatHistory = formattedHistory.slice(-10);

    const chat = model.startChat({ history: chatHistory });
    const result = await chat.sendMessage(message);
    const reply = result.response.text();

    return Response.json({ reply });
  } catch (err) {
    console.error('Chat API error:', err);
    return Response.json(
      { error: 'Failed to generate response', reply: '⚠️ Sorry, I encountered an error. Please try again in a moment.' },
      { status: 500 }
    );
  }
}
