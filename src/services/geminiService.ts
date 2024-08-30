import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';


dotenv.config();

// Função para obter a chave da API
function getApiKey(): string {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('GEMINI_API_KEY is not set in the environment variables');
    process.exit(1);
  }
  return apiKey;
}

// Inicializa o cliente Gemini com a chave da API
const genAI = new GoogleGenerativeAI(getApiKey());

export async function recognizeImageValue(base64Image: string): Promise<number> {
  try {
    console.log('Initializing Gemini API');
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro-vision' });

    const prompt = 'What is the numeric value shown in this meter image?';
    const imageParts = [
      {
        inlineData: {
          data: base64Image,
          mimeType: 'image/jpeg',
        },
      },
    ];

    console.log('Sending request to Gemini API');
    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    const text = response.text();
    console.log('Received response from Gemini API:', text);

    const numericValue = parseFloat(text.replace(/[^\d.]/g, ''));

    if (isNaN(numericValue)) {
      throw new Error('Failed to extract numeric value from image');
    }

    return numericValue;
  } catch (error) {
    console.error('Gemini API error:', error);
    throw error;
  }
}