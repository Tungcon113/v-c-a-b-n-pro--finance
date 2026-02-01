import { GoogleGenAI } from "@google/genai";
import { Transaction } from "../types";

/**
 * Trợ lý tài chính AI dành riêng cho sếp Tùng.
 */
export const getFinancialAdvice = async (transactions: Transaction[], userPrompt: string) => {
  // Ưu tiên lấy Key từ Vite (VITE_) sau đó mới đến process.env
  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY || process.env.API_KEY;

  if (!apiKey || apiKey.length < 10) {
    return "Dạ sếp Tùng ơi, em chưa thấy 'chìa khóa' API_KEY. Sếp nhớ dán mã 'AIza...' vào Vercel Settings với tên Key là VITE_GOOGLE_API_KEY rồi 'Redeploy' nhé!";
  }

  try {
    const genAI = new GoogleGenAI(apiKey);
    
    // Sử dụng model ổn định nhất hiện nay
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: {
        maxOutputTokens: 500,
        temperature: 0.7,
      }
    });
    
    // Tóm tắt 10 giao dịch gần nhất
    const historyText = transactions.length > 0 
      ? transactions.slice(0, 10).map(t => `- ${t.title}: ${t.amount.toLocaleString()}đ`).join('\n')
      : "Chưa có giao dịch nào.";

    const systemPrompt = `Bạn là trợ lý tài chính riêng của "sếp Tùng". 
      Lịch sử chi tiêu:
      ${historyText}
      Quy tắc: Trả lời lễ phép, gọi "sếp Tùng", xưng "em". Tư vấn thông minh, hài hước.`;

    const result = await model.generateContent([systemPrompt, userPrompt]);
    const response = await result.response;
    const text = response.text();

    return text || "Em nghe rồi nhưng đang suy nghĩ kỹ quá, sếp hỏi lại em câu khác nhé!";

  } catch (error: any) {
    console.error("Lỗi AI:", error);
    if (error.message?.includes("403") || error.message?.includes("API_KEY_INVALID")) {
      return "❌ Lỗi: Cái mã Key sếp dán bị Google báo sai rồi. Sếp lấy mã mới nhất dán lại vào Vercel nhé!";
    }
    return `Dạ sếp Tùng, AI đang bận chút xíu, sếp thử lại sau 1 giây nhé.`;
  }
};
