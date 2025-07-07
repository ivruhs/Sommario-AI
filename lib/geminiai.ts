import { SUMMARY_SYSTEM_PROMPT } from "@/utils/prompts";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export const generateSummaryFromGemini = async (pdfText: string) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 2048, // you can tweak this
      },
    });

    const prompt = {
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `${SUMMARY_SYSTEM_PROMPT}\n\nTransform this document into an engaging, easy-to-read summary with contextually relevant emojis and proper markdown formatting:\n\n${pdfText}`,
            },
          ],
        },
      ],
    };

    const result = await model.generateContent(prompt);
    const response = await result.response;

    const summary = await response.text(); // ✅ await is required

    if (!summary) {
      throw new Error("No summary text received from Gemini API");
    }

    return summary;
  } catch (error: any) {
    console.error("Gemini API error:", error);
    throw new Error("Failed to generate summary from Gemini");
  }
};
