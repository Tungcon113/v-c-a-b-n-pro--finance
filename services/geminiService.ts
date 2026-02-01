import { GoogleGenAI } from "@google/genai";

export const getFinancialAdvice = async (transactions: any[], userPrompt: string) => {
  // Code này sẽ tự tìm đúng "chìa khóa" sếp dán trên Vercel
  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY || process.env.API_KEY;

  if (!apiKey || apiKey.length < 10) {
    return "Dạ sếp Tùng ơi, em chưa thấy 'chìa khóa' VITE_GOOGLE_API_KEY. Sếp nhớ dán vào Vercel rồi 'Redeploy' nhé!";
  }

  try {
    const genAI = new GoogleGenAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const historyText = transactions.length > 0 
      ? transactions.slice(0, 10).map(t => `- ${t.title}: ${t.amount.toLocaleString()}đ`).join('\n')
      : "Chưa có giao dịch nào.";

    const systemPrompt = `Bạn là trợ lý tài chính của "sếp Tùng". Lịch sử chi tiêu: ${historyText}. Trả lời lễ phép, xưng em.`;

    const result = await model.generateContent([systemPrompt, userPrompt]);
    return result.response.text();
  } catch (error: any) {
    return "❌ Lỗi: Chìa khóa sếp đưa bị sai hoặc hết hạn rồi ạ!";
  }
};
