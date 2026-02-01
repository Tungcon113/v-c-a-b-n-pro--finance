
import { GoogleGenAI } from "@google/genai";
import { Transaction, Wallet } from "../types";

/**
 * Trợ lý tài chính AI siêu cấp cho sếp Tùng.
 * Đã sửa lỗi truy cập response.text và xử lý lỗi kết nối.
 */
export const getFinancialAdvice = async (
  transactions: Transaction[], 
  userPrompt: string, 
  wallets: Wallet[] = [], 
  monthlyLimit: number = 0
) => {
  // Lấy key trực tiếp từ môi trường đã được Vite define
  const apiKey = process.env.API_KEY;

  if (!apiKey || apiKey === "undefined" || apiKey.length < 10) {
    return "❌ Báo cáo sếp Tùng: Em chưa thấy API_KEY đâu cả! Sếp vui lòng vào Vercel Settings -> Environment Variables, thêm biến API_KEY và dán mã 'AIzaSy...' vào, sau đó nhớ nhấn REDEPLOY nhé.";
  }

  try {
    // Khởi tạo instance mới mỗi lần gọi để đảm bảo lấy đúng key mới nhất
    const ai = new GoogleGenAI({ apiKey });
    
    // Chuẩn bị dữ liệu tài chính của sếp
    const totalBalance = wallets.reduce((sum, w) => sum + w.balance, 0);
    const walletInfo = wallets.map(w => `${w.name}: ${w.balance.toLocaleString()}đ`).join(", ");
    const recentTx = transactions.slice(0, 10).map(t => `${t.title} (${t.amount.toLocaleString()}đ)`).join(", ");

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview', // Model mới nhất, nhanh và thông minh
      contents: [{ parts: [{ text: userPrompt }] }],
      config: {
        systemInstruction: `Bạn là trợ lý tài chính riêng tên là 'Em Bé Nmap', cực kỳ đàng hoàng và chuyên nghiệp.
        Đối tượng phục vụ: sếp Tùng (Luôn gọi là 'sếp Tùng', xưng 'em').
        Ngữ cảnh: sếp Tùng đang có tổng cộng ${totalBalance.toLocaleString()}đ trong các ví (${walletInfo}). 
        Hạn mức chi tiêu tháng này là ${monthlyLimit.toLocaleString()}đ. 
        Giao dịch gần đây: ${recentTx}.
        Phong cách: Lễ phép, thỉnh thoảng hài hước, tư vấn sát thực tế, không nói suông.`,
        temperature: 0.8,
      },
    });

    // QUAN TRỌNG: Dùng .text (property) chứ không phải .text() (method)
    const reply = response.text;

    if (!reply) {
      return "Dạ sếp, em nghe rõ rồi nhưng ý tưởng của em đang hơi 'kẹt', sếp hỏi lại câu khác được không ạ?";
    }

    return reply;

  } catch (error: any) {
    console.error("Lỗi AI rồi sếp ơi:", error);
    
    // Phân loại lỗi để sếp dễ xử lý
    if (error.message?.includes("403") || error.message?.includes("API_KEY_INVALID")) {
      return "❌ Sếp Tùng ơi, cái API_KEY này bị sai hoặc hết hạn rồi ạ. Sếp lấy cái mới ở Google AI Studio dán lại giúp em!";
    }
    
    if (error.message?.includes("429") || error.message?.includes("quota")) {
      return "Dạ sếp, em đang bị 'quá tải' vì sếp hỏi nhanh quá. Sếp đợi em thở tí (khoảng 10 giây) rồi hỏi tiếp nha!";
    }

    return `Dạ thưa sếp Tùng, đường truyền đang có chút vấn đề: ${error.message?.slice(0, 80)}... Sếp thử lại giúp em với!`;
  }
};
