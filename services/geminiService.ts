import { GoogleGenAI, Modality, type GenerateContentResponse } from "@google/genai";
import { type GeneratedImage } from '../types';
import { TARGET_AGES } from '../constants';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

async function generateSingleImage(base64ImageData: string, mimeType: string, ageDescription: string): Promise<string | null> {
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image-preview',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64ImageData,
              mimeType: mimeType,
            },
          },
          {
            text: `أظهر هذا الشخص على أنه ${ageDescription}`,
          },
        ],
      },
      config: {
        responseModalities: [Modality.IMAGE, Modality.TEXT],
      },
    });

    const candidate = response?.candidates?.[0];

    if (!candidate || !candidate.content || !candidate.content.parts) {
      console.error(`Image generation failed for age "${ageDescription}". Reason:`, response?.promptFeedback?.blockReason || 'No candidate data returned.');
      return null;
    }

    for (const part of candidate.content.parts) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error(`Error generating image for age "${ageDescription}":`, error);
    return null; // Return null on failure for this specific age
  }
}

export const generateAgeProgressionImages = async (
  base64Image: string,
  mimeType: string
): Promise<GeneratedImage[]> => {
  const imagePromises = TARGET_AGES.map(async (target) => {
    const imageUrl = await generateSingleImage(base64Image, mimeType, target.description);
    return {
      age: target.description,
      url: imageUrl || 'https://picsum.photos/512/512?grayscale', // Placeholder for failed images
    };
  });

  const results = await Promise.all(imagePromises);
  
  // Filter out any results that completely failed if necessary, but placeholder is better UX.
  return results;
};