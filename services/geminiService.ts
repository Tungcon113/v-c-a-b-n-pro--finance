
import { GoogleGenAI } from "@google/genai";
import { Transaction } from "../types";

/**
 * Trợ lý tài chính cho sếp Tùng
 * Sử dụng model gemini-3-flash-preview để tư vấn nhanh và chính xác nhất.
 */
export const getFinancialAdvice = async (transactions: Transaction[], userPrompt: string) => {
  // Lấy API_KEY từ process.env (được Vite inject từ Vercel)
  const apiKey = process.env.API_KEY;

  // Kiểm tra an toàn trước khi gọi Google
  if (!apiKey || apiKey === "your_gemini_api_key_here" || apiKey.length < 20) {
    console.warn("⚠️ API_KEY chưa sẵn sàng");
    return "Dạ thưa sếp Tùng, em chưa thấy 'chìa khóa' API_KEY của mình đâu ạ. Sếp kiểm tra lại phần Settings trên Vercel và nhớ nhấn 'Redeploy' để em nhận mã nhé!";
  }

  try {
    // 1. Khởi tạo AI (Bắt buộc dùng process.env.API_KEY trực tiếp theo quy định)
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // 2. Chuẩn bị ngữ cảnh tài chính của sếp
    const history = transactions.length > 0 
      ? transactions.slice(0, 15).map(t => `- ${t.date}: ${t.title} (${t.type === 'income' ? '+' : '-'}${t.amount.toLocaleString()}đ)`).join('\n')
      : "Sếp chưa ghi chép giao dịch nào.";

    // 3. Gọi Google Gemini với Model Flash 3 mới nhất
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userPrompt,
      config: {
        systemInstruction: `Bạn là trợ lý tài chính riêng cực kỳ lễ phép và thông minh của "sếp Tùng".
        Nhiệm vụ: Phân tích chi tiêu, gợi ý tiết kiệm và trả lời mọi thắc mắc về tiền bạc.
        Dữ liệu chi tiêu gần đây của sếp Tùng:
        ${history}
        
        Phong cách: Luôn gọi "sếp Tùng", xưng "em". Trả lời ngắn gọn, hài hước nhưng cực kỳ chuyên nghiệp.`,
        temperature: 0.8,
        topP: 0.95,
      },
    });

    // 4. Trả về kết quả
    return response.text || "Dạ sếp, em nghe rõ rồi nhưng đang mải tính toán quá, sếp hỏi lại em câu khác được không ạ?";

  } catch (error: any) {
    console.error("🔴 LỖI TRỢ LÝ:", error);
    
    const errMsg = error.message || "";
    
    // Báo lỗi cụ thể cho sếp dễ xử lý
    if (errMsg.includes("403") || errMsg.includes("API_KEY_INVALID")) {
      return "❌ LỖI GOOGLE: Sếp ơi, cái Key này bị Google từ chối rồi. Sếp kiểm tra lại xem có copy thiếu ký tự nào không, hoặc thử tạo 1 cái Key MỚI TINH ở Google AI Studio xem sao ạ.";
    }
    
    if (errMsg.includes("quota") || errMsg.includes("429")) {
      return "Dạ sếp ơi, Google bảo mình dùng hơi nhiều nên họ bắt đợi một lát. Sếp đợi em vài giây rồi hỏi lại nhé!";
    }

    return `Dạ thưa sếp Tùng, em gặp chút trục trặc: ${errMsg.slice(0, 100)}... Sếp thử nhấn gửi lại giúp em với ạ!`;
  }
};
