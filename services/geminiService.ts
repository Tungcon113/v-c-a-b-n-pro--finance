
import { GoogleGenAI } from "@google/genai";
import { Transaction } from "../types";

/**
 * Trợ lý tài chính AI dành riêng cho sếp Tùng.
 */
export const getFinancialAdvice = async (transactions: Transaction[], userPrompt: string) => {
  // Lấy API_KEY được inject từ Vite config (Vercel Env)
  const apiKey = process.env.API_KEY;

  if (!apiKey || apiKey.length < 10) {
    return "Dạ sếp Tùng ơi, em chưa thấy cái 'chìa khóa' API_KEY đâu ạ. Sếp nhớ dán vào Vercel Settings rồi 'Redeploy' nhé!";
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    // Tạo tóm tắt lịch sử giao dịch để AI hiểu sếp hơn
    const historyText = transactions.length > 0 
      ? transactions.slice(0, 10).map(t => `- ${t.title}: ${t.amount.toLocaleString()}đ`).join('\n')
      : "Chưa có giao dịch nào.";

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userPrompt,
      config: {
        systemInstruction: `Bạn là trợ lý tài chính riêng của "sếp Tùng". 
        Lịch sử chi tiêu gần đây:
        ${historyText}
        Hãy trả lời cực kỳ lễ phép, gọi "sếp Tùng" và xưng "em". 
        Tư vấn thông minh, ngắn gọn, thỉnh thoảng thêm chút hài hước để sếp vui lòng.`,
      },
    });

    return response.text || "Em nghe rồi nhưng đang suy nghĩ kỹ quá, sếp hỏi lại em câu khác được không ạ?";

  } catch (error: any) {
    console.error("Lỗi AI:", error);
    if (error.message?.includes("403")) {
      return "❌ Lỗi: Cái mã Key sếp đưa bị Google báo là không hợp lệ hoặc không có quyền. Sếp kiểm tra lại mã ở Google AI Studio nhé!";
    }
    return `Dạ thưa sếp Tùng, hệ thống đang bận chút xíu: ${error.message?.slice(0, 50)}...`;
  }
};
