
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

const SYSTEM_INSTRUCTION = `
You are the Kithademics AI Tutor, a knowledgeable, respectful, and scholarly assistant for students of Islamic sciences.
Your goal is to help students understand their coursework (Fiqh, Aqidah, Seerah, etc.) based on authentic traditional scholarship.
- Use a calm, professional, and encouraging tone.
- Start your initial response with "Assalamu Alaikum".
- When explaining complex concepts like Fiqh rules, provide clear, step-by-step breakdowns.
- If a question is outside the scope of Islamic education, politely redirect the student to the platform's focus.
- Avoid issuing Fatwas (legal rulings); instead, explain the positions of the major schools of thought (Madhabs) if relevant, or point them to the specific lesson in their course.
- Keep responses concise but comprehensive.
`;

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    // Fix: Always use { apiKey: process.env.API_KEY } directly as per Google GenAI guidelines
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  async chat(history: ChatMessage[], message: string) {
    const chat = this.ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    // Note: The history in gemini-3-flash-preview is handled by providing it in the sendMessage context if needed, 
    // but for simplicity in this demo we send the prompt with history context or use the chat session.
    // For a real app, you'd map our ChatMessage[] to the API's expected format.
    
    try {
      const response = await chat.sendMessage({ message });
      // Fix: response.text is a property that returns the extracted string output
      return response.text || "I apologize, but I'm unable to provide a response at the moment.";
    } catch (error) {
      console.error("Gemini Error:", error);
      return "An error occurred while connecting to the AI Tutor. Please try again later.";
    }
  }
}

export const geminiService = new GeminiService();
