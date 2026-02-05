
import { GoogleGenAI, Type } from "@google/genai";
import { Transaction, Wallet } from "../types";

const getAIInstance = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey || apiKey === "undefined") return null;
  return new GoogleGenAI({ apiKey });
};

export const getFinancialAdvice = async (
  transactions: Transaction[], 
  userPrompt: string, 
  wallets: Wallet[] = [], 
  monthlyLimit: number = 0
) => {
  const ai = getAIInstance();
  if (!ai) return "❌ Sếp Tùng ơi, sếp quên chưa cài API_KEY trong Env rồi!";

  try {
    const totalBalance = wallets.reduce((sum, w) => sum + w.balance, 0);
    const walletInfo = wallets.map(w => `${w.name}: ${w.balance.toLocaleString()}đ`).join(", ");
    const recentTx = transactions.slice(0, 10).map(t => `${t.title} (${t.amount.toLocaleString()}đ)`).join(", ");

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [{ parts: [{ text: userPrompt }] }],
      config: {
        systemInstruction: `Bạn là trợ lý tài chính riêng tên là 'Em Bé Nmap'. 
        Đối tượng phục vụ: sếp Tùng. 
        Ngữ cảnh: sếp Tùng có ${totalBalance.toLocaleString()}đ trong các ví (${walletInfo}). 
        Hạn mức chi tiêu tháng này: ${monthlyLimit.toLocaleString()}đ. 
        Giao dịch gần đây: ${recentTx}.
        Phong cách: Lễ phép, thỉnh thoảng hài hước, tư vấn sát thực tế.`,
        temperature: 0.8,
      },
    });

    return response.text;
  } catch (error: any) {
    return `Dạ thưa sếp, lỗi rồi ạ: ${error.message}`;
  }
};

/**
 * NÂNG CẤP: Phân tích hóa đơn bằng AI Vision
 */
export const analyzeReceipt = async (base64Image: string) => {
  const ai = getAIInstance();
  if (!ai) throw new Error("API_KEY_MISSING");

  // Xử lý chuỗi base64 để loại bỏ header data:image/jpeg;base64,
  const base64Data = base64Image.split(',')[1] || base64Image;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        {
          parts: [
            {
              inlineData: {
                mimeType: "image/jpeg",
                data: base64Data
              }
            },
            {
              text: "Phân tích hóa đơn này và trả về dữ liệu JSON chính xác. Store name, các món hàng (name, price), tổng tiền (totalAmount), ngày (date dạng YYYY-MM-DD), và gợi ý 1 hạng mục phù hợp nhất từ danh sách: Ăn uống, Mua sắm, Di chuyển, Giải trí, Hóa đơn, Sức khỏe."
            }
          ]
        }
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            storeName: { type: Type.STRING },
            items: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  price: { type: Type.NUMBER }
                },
                required: ["name", "price"]
              }
            },
            totalAmount: { type: Type.NUMBER },
            date: { type: Type.STRING },
            suggestedCategory: { type: Type.STRING }
          },
          required: ["storeName", "items", "totalAmount", "suggestedCategory"]
        }
      }
    });

    const result = JSON.parse(response.text || "{}");
    return result;
  } catch (error) {
    console.error("Lỗi phân tích hóa đơn:", error);
    throw error;
  }
};
