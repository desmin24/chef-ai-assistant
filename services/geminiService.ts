
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// Ensure API_KEY is set in the environment variables
const apiKey = process.env.API_KEY;
if (!apiKey) {
  throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey });
const modelName = 'gemini-2.5-flash-preview-04-17';

const systemInstruction = `你是一位友善且樂於助人的AI廚師助理，專門為使用者解決「清冰箱」的煩惱。請根據使用者提供的食材，以繁體中文生成一份包含以下內容的簡易食譜：
1.  一個吸引人的「菜名」。
2.  「所需食材」：請使用 Markdown 的項目符號（例如使用 '-' 或 '*'）條列出所有食材（包含使用者提供的，也可建議少量額外常見調料，如鹽、糖、醬油等）。
3.  「烹飪步驟」：請務必使用 Markdown 的編號清單 (例如：1. 第一步 2. 第二步) 條列出詳細步驟，每個步驟清晰易懂。
4.  一個「小撇步」或「溫馨提示」，讓料理更美味或製作更順利。
請確保食譜簡單易懂，適合廚房新手。回應時請直接提供食譜內容，不要有多餘的開場白或自我介紹。整體回應必須嚴格遵守 Markdown 格式進行排版，特別是清單部分。`;


export const generateRecipe = async (ingredients: string): Promise<string> => {
  try {
    const userPrompt = `我目前的食材有：${ingredients}。請根據這些食材設計一道料理。`;
    
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: modelName,
      contents: [
        { role: "user", parts: [{ text: userPrompt }] }
      ],
      config: {
        systemInstruction: { role: "system", parts: [{text: systemInstruction}]},
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
      }
    });

    const text = response.text;
    if (text) {
      return text;
    } else {
      throw new Error("從AI收到的回應無效或為空。");
    }
  } catch (error) {
    console.error('Gemini API 錯誤:', error);
    if (error instanceof Error) {
        // Check for specific error messages if needed, e.g., quota issues, API key problems
        if (error.message.includes('API key not valid')) {
            throw new Error('API 金鑰無效。請檢查您的 API 金鑰。');
        }
        if (error.message.includes('quota')) {
            throw new Error('已達到 API 配額限制。請稍後再試。');
        }
         // More general error handling based on status codes might be useful if the SDK provides them easily.
        // For now, we rely on message content.
    }
    throw new Error('生成食譜時發生錯誤，請檢查網路連線或稍後再試。');
  }
};
