
import { GoogleGenAI } from "@google/genai";
import { Transaction } from "../types";

export const getFinancialAdvice = async (transactions: Transaction[], userPrompt: string) => {
  // Use process.env.API_KEY directly for initialization as per guidelines
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const transactionsContext = transactions.map(t => 
    `${t.date}: ${t.title} (${t.type === 'income' ? '+' : '-'}${t.amount.toLocaleString('vi-VN')} VND)`
  ).join('\n');

  const systemInstruction = `
    Bạn là một chuyên gia tài chính cá nhân người Việt Nam. 
    Dưới đây là danh sách giao dịch gần đây của người dùng:
    ${transactionsContext}
    
    Hãy trả lời câu hỏi của người dùng một cách ngắn gọn, súc tích và đưa ra lời khuyên tài chính thông minh bằng tiếng Việt. 
    Hãy sử dụng các emoji để làm câu trả lời sinh động hơn.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userPrompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    // Access .text property directly
    return response.text || "Xin lỗi, tôi không thể xử lý yêu cầu của bạn lúc này.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Có lỗi xảy ra khi kết nối với chuyên gia AI.";
  }
};
