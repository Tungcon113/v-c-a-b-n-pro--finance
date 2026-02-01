
import { GoogleGenAI } from "@google/genai";
import { Transaction } from "../types";

export const getFinancialAdvice = async (transactions: Transaction[], userPrompt: string) => {
  // 1. Lấy API KEY từ môi trường (Vercel hoặc .env.local)
  const apiKey = process.env.API_KEY;

  // 2. Kiểm tra xem sếp đã điền Key chưa
  if (!apiKey || apiKey === "your_gemini_api_key_here" || apiKey.length < 10) {
    console.error("❌ LỖI NGHIÊM TRỌNG: API_KEY ĐANG TRỐNG HOẶC SAI TÊN!");
    console.log("Sếp Tùng ơi, sếp cần vào Vercel Settings -> Environment Variables, đặt tên Key là API_KEY nhé!");
    return "Sếp ơi, tôi chưa thấy 'chìa khóa' (API_KEY) đâu cả! Sếp kiểm tra lại phần cài đặt trên Vercel hoặc file .env nhé. Đặt tên đúng là API_KEY sếp nhé! 🙏";
  }

  try {
    // 3. Khởi tạo AI với mã của sếp
    const ai = new GoogleGenAI({ apiKey });
    
    const transactionsContext = transactions.length > 0 
      ? transactions.slice(0, 10).map(t => 
          `${t.date}: ${t.title} (${t.type === 'income' ? '+' : '-'}${t.amount.toLocaleString('vi-VN')} VND)`
        ).join('\n')
      : "Chưa có giao dịch nào.";

    const systemInstruction = `
      Bạn là "Nhân viên của sếp Tùng" - Trợ lý tài chính cá nhân siêu cấp.
      Sếp Tùng là một người rất quan trọng, hãy trả lời sếp thật lễ phép, thông minh và có tâm.
      
      Dữ liệu chi tiêu của sếp:
      ${transactionsContext}
      
      Phong cách trả lời:
      - Xưng hô: "Dạ thưa sếp Tùng", "Em nghe đây sếp", "Báo cáo sếp"...
      - Ngôn ngữ: Tiếng Việt, thân thiện, dùng nhiều emoji tài chính 💸💰📊.
      - Nội dung: Phân tích kỹ các khoản sếp tiêu, gợi ý cách tiết kiệm thực tế.
    `;

    // 4. Gọi lệnh cho AI trả lời
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [{ parts: [{ text: userPrompt }] }],
      config: {
        systemInstruction,
        temperature: 0.9,
      },
    });

    if (response && response.text) {
      return response.text;
    } else {
      throw new Error("AI không trả về chữ nào sếp ạ.");
    }

  } catch (error: any) {
    console.error("🔴 CHI TIẾT LỖI TỪ AI:", error);
    
    // Bắt lỗi thường gặp để báo cho sếp
    if (error.message?.includes("API_KEY_INVALID") || error.message?.includes("403")) {
      return "Sếp ơi, cái mã API Key sếp dán vào Vercel bị sai rồi! Sếp copy lại chuẩn cái mã AIzaSy... rồi dán lại nhé. (Nhớ xóa mã cũ đi dán mã mới hoàn toàn).";
    }
    
    if (error.message?.includes("quota") || error.message?.includes("429")) {
      return "Sếp ơi, AI đang bị 'quá tải' vì sếp hỏi nhanh quá. Đợi 10 giây rồi hỏi lại em trả lời ngay sếp nhé!";
    }

    return "Dạ thưa sếp, đường truyền tới bộ não AI đang hơi trục trặc. Sếp thử nhấn gửi lại hoặc F5 (tải lại) trang giúp em với ạ! 🙏";
  }
};
