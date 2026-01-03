import { GoogleGenAI, Type } from "@google/genai";
import { WorkoutPlan } from "../types";

// Helper to sanitize JSON string if the model returns markdown code blocks
const cleanJsonString = (str: string) => {
  return str.replace(/```json/g, '').replace(/```/g, '').trim();
};

export const generateAIWorkout = async (targets: string[], level: string, focusDescription?: string): Promise<WorkoutPlan | null> => {
  try {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      console.error("VITE_GEMINI_API_KEY not found in environment");
      return null;
    }

    const ai = new GoogleGenAI({ apiKey });

    const specificFocus = focusDescription
      ? `The user has a specific request/limitation: "${focusDescription}". You MUST adjust exercise selection to address this. Do NOT restrict yourself to common exercises. If a niche variation is biomechanically superior for this specific problem, use it.`
      : '';

    const targetString = targets.join(", ");

    const prompt = `
      You are an expert scientific hypertrophy coach. Create a detailed workout plan for a ${level} level lifter focusing on these muscles: ${targetString}.
      ${specificFocus}
      
      Instructions:
      1. Use scientific principles (proper volume, time under tension).
      2. If the user specified a "weak point" or specific problem (e.g. "lower chest", "wrist pain"), select exercises that specifically target that mechanism, even if they are not "standard" compound lifts.
      3. Return ONLY the JSON.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            estimatedDuration: { type: Type.STRING },
            exercises: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  sets: { type: Type.NUMBER },
                  reps: { type: Type.STRING },
                  notes: { type: Type.STRING }
                }
              }
            }
          }
        }
      }
    });

    const text = response.text;
    if (!text) return null;

    return JSON.parse(cleanJsonString(text)) as WorkoutPlan;

  } catch (error) {
    console.error("Error generating workout:", error);
    return null;
  }
};

// Unified chat function that handles text AND optional image
export const chatWithNutritionist = async (message: string, imageBase64?: string): Promise<string> => {
  try {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) return "API Key (VITE_GEMINI_API_KEY) missing.";

    const ai = new GoogleGenAI({ apiKey });

    let contents: any[] = [];

    if (imageBase64) {
      // Clean base64 string if it includes the data URL prefix
      const cleanBase64 = imageBase64.split(',')[1] || imageBase64;

      contents = [
        {
          parts: [
            {
              inlineData: {
                mimeType: 'image/jpeg',
                data: cleanBase64
              }
            },
            {
              text: `You are an expert sports nutritionist and dietician. 
                     Analyze the attached image (it could be a meal or a nutrition label) and the user's question: "${message}". 
                     If it's a label, explain the macros. If it's food, estimate calories and protein. 
                     Give scientific advice on portions for hypertrophy or fat loss.`
            }
          ]
        }
      ];
    } else {
      contents = [
        {
          parts: [{
            text: `You are an expert sports nutritionist. User asks: "${message}". Provide a concise, scientific answer.`
          }]
        }
      ];
    }

    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: contents,
    });

    return response.text || "I couldn't generate a response.";
  } catch (e) {
    console.error(e);
    return "Error connecting to AI. Please ensure the image is a valid format and try again.";
  }
};

// Kept for backward compatibility if needed, but chatWithNutritionist supersedes this
export const analyzeNutritionLabel = async (labelData: string): Promise<string> => {
  return chatWithNutritionist(`Analyze this nutrition label data: ${labelData}`);
};