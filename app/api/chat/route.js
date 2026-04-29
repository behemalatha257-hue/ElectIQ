export const runtime = 'nodejs';

export async function POST(request) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== 'string') {
      return Response.json({ error: 'Invalid message' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    
    // Check if we should use the simulated fallback
    if (!apiKey || apiKey === 'your_gemini_api_key_here' || apiKey === 'undefined' || apiKey === '') {
      const lowerMessage = message.toLowerCase();
      let simulatedReply = "🤖 **ElectIQ AI (Demo Mode)**\n\nI am currently running in demo mode. To unlock full AI responses, please add a valid **GEMINI_API_KEY**.\n\n### Your Question: \"" + message + "\"\n\n";
      
      if (lowerMessage.includes("register")) {
        simulatedReply += "🗳️ **How to Register:** Visit your official government election website (e.g., **vote.gov** in the US). You'll usually need a valid ID and proof of residence. Registration deadlines vary by region, so check yours today!";
      } else if (lowerMessage.includes("count") || lowerMessage.includes("vote")) {
        simulatedReply += "📊 **Counting Process:** Ballots are typically collected at local polling stations, verified against registration records, and then tallied using either optical scanners or manual counting. The results are then certified by election officials.";
      } else if (lowerMessage.includes("college") || lowerMessage.includes("electoral")) {
        simulatedReply += "🏛️ **Electoral College:** In the US, the president is chosen by 538 electors. Each state gets a number of electors equal to its total congressional delegation. A candidate needs 270 to win.";
      } else if (lowerMessage.includes("gerrymander")) {
        simulatedReply += "🗺️ **Gerrymandering:** This is the manipulation of electoral district boundaries to favor one party or class. It can significantly impact election outcomes and representation fairness.";
      } else if (lowerMessage.includes("mail") || lowerMessage.includes("absentee")) {
        simulatedReply += "✉️ **Vote by Mail:** This allows you to receive your ballot at home, fill it out, and return it via post or a secure drop-box. It's a convenient way to ensure your voice is heard!";
      } else {
        simulatedReply += "That's a great question about democracy! In a live environment with an API key, I would provide a detailed, AI-generated answer specifically for this query. Visit the **Voter Journey** timeline above to learn more about the election process.";
      }
      
      return Response.json({ reply: simulatedReply });
    }

    // If we have a key, we use the real AI
    const { GoogleGenerativeAI } = await import('@google/generative-ai');
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
    const result = await model.generateContent(message);
    const reply = result.response.text();

    return Response.json({ reply });
  } catch (err) {
    console.error('Chat API Error:', err);
    return Response.json(
      { 
        error: 'Communication Error', 
        reply: '⚠️ The AI is currently unavailable. Please ensure your project is properly configured.',
        debug: err.message
      },
      { status: 500 }
    );
  }
}
