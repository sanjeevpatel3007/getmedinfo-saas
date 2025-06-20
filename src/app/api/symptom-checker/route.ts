// app/api/symptom-checker/route.ts
import { NextResponse } from "next/server";
import { Message, SymptomData } from "@/app/symptom-checker/types";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      throw new Error("Gemini API key is not configured. Please add GEMINI_API_KEY to your environment variables.");
    }

    const { messages, symptomData } = await req.json();
    
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      throw new Error("Invalid or empty messages array");
    }

    // Format conversation history for context
    const conversationHistory = messages
      .map((msg: Message) => `${msg.type === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
      .join('\n');

    // Create patient profile section only if symptomData exists
    const patientProfile = symptomData ? `
Patient Profile:
${symptomData.age ? `Age: ${symptomData.age} years` : 'Age: Not provided'}
${symptomData.gender ? `Gender: ${symptomData.gender}` : 'Gender: Not provided'}
${symptomData.duration ? `Duration of symptoms: ${symptomData.duration}` : 'Duration: Not provided'}
${symptomData.severity ? `Severity: ${symptomData.severity}` : 'Severity: Not provided'}
` : 'Patient profile not available.';

    // Create a detailed prompt based on symptom data and conversation history
  const prompt = `
You are an empathetic and knowledgeable medical AI assistant. You're helping a patient with the following information:

${patientProfile}

Previous conversation:
${conversationHistory}

Provide a concise and helpful response using this exact format:

[Brief empathetic acknowledgment]

**Clarifying Questions:**
* [List relevant questions]

**Recommended OTC Medicines:** (if appropriate)
* **[Medicine Name]:** [Purpose]. [Form available]
* **[Medicine Name]:** [Purpose]. [Form available]

**Self-Care Tips:**
* [Tip 1]
* [Tip 2]

**When to Seek Medical Help:**
* [List critical symptoms or conditions]

Remember:
- Keep each section brief and focused
- Use bullet points with asterisks (*)
- Bold headers with double asterisks (**)
- Maximum 2-3 items per section
- Always end with suggested follow-up questions

Suggested questions:
- [question 1]
- [question 2]
- [question 3]

Latest user message: ${messages[messages.length - 1].content}`;

    try {
  const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
      body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: prompt
                  }
                ]
              }
            ],
            generationConfig: {
              temperature: 0.7,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 1024,
            },
            safetySettings: [
              {
                category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                threshold: "BLOCK_MEDIUM_AND_ABOVE"
              }
            ]
      }),
    }
  );

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(
          `Gemini API error: ${res.status} ${res.statusText}${
            errorData.error ? ` - ${errorData.error.message}` : ''
          }`
        );
      }

  const data = await res.json();
      
      if (!data?.candidates?.[0]?.content?.parts?.[0]?.text) {
        throw new Error("Invalid response from Gemini API");
      }

      const aiResponse = data.candidates[0].content.parts[0].text;

      return NextResponse.json({ 
        message: aiResponse,
        error: null 
      });
    } catch (apiError) {
      console.error('Gemini API error:', apiError);
      throw new Error(
        `Failed to get AI response: ${
          apiError instanceof Error ? apiError.message : 'Unknown error'
        }`
      );
    }
  } catch (error) {
    console.error('Symptom checker API error:', error);
    return NextResponse.json(
      { 
        message: null, 
        error: error instanceof Error ? error.message : 'Failed to process your request. Please try again.' 
      },
      { status: 500 }
    );
  }
}
