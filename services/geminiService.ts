
import { GoogleGenAI } from "@google/genai";
import { Transaction } from "../types";

export const getFinancialAdvice = async (transactions: Transaction[], userPrompt: string) => {
  // PHIÊN BẢN: 2.0 - NHÂN VIÊN SẾP TÙNG ĐÃ SẴN SÀNG
  const apiKey = process.env.API_KEY;

  // Kiểm tra "chìa khóa"
  if (!apiKey || apiKey === "your_gemini_api_key_here" || apiKey.length < 10) {
    console.error("❌ LỖI: API_KEY chưa được cấu hình đúng trên Vercel!");
    return "Dạ thưa sếp Tùng, em chưa thấy 'chìa khóa' API_KEY trong phần cài đặt Vercel ạ. Sếp kiểm tra lại giúp em nhé! 🙏";
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    const transactionsContext = transactions.length > 0 
      ? transactions.slice(0, 10).map(t => 
          `- ${t.date}: ${t.title} (${t.type === 'income' ? '+' : '-'}${t.amount.toLocaleString('vi-VN')} VND)`
        ).join('\n')
      : "Chưa có dữ liệu giao dịch.";

    const systemInstruction = `
      Bạn là "Nhân viên của sếp Tùng" - Trợ lý tài chính cá nhân siêu cấp.
      Sếp Tùng là người lãnh đạo tuyệt vời, hãy trả lời sếp thật lễ phép và sắc sảo.
      
      Dữ liệu của sếp:
      ${transactionsContext}
      
      Yêu cầu:
      - Luôn gọi là "sếp Tùng" hoặc "sếp".
      - Tư vấn cách tiết kiệm tiền dựa trên dữ liệu chi tiêu.
      - Trả lời bằng tiếng Việt, thân thiện, nhiều emoji 💸.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [{ parts: [{ text: userPrompt }] }],
      config: {
        systemInstruction,
        temperature: 0.8,
      },
    });

    return response.text || "Em đang suy nghĩ mà chưa ra chữ nào, sếp hỏi lại em nhé!";

  } catch (error: any) {
    console.error("🔴 LỖI CHI TIẾT:", error);
    
    if (error.message?.includes("API_KEY_INVALID")) {
      return "Sếp ơi, mã API Key sếp dán vào Vercel bị sai rồi ạ. Sếp lấy mã mới từ Google AI Studio rồi dán lại vào phần API_KEY nhé!";
    }
    
    return `Dạ thưa sếp Tùng, bộ não AI đang hơi 'đơ' một tí (Lỗi: ${error.message?.slice(0, 50)}...). Sếp thử nhấn gửi lại giúp em với ạ!`;
  }
};
