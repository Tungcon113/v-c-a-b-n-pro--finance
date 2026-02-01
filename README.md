
# 📱 Ví của bạn - Nmap Finance

![Version](https://img.shields.io/badge/version-1.0.1-black?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![Tailwind](https://img.shields.io/badge/Tailwind-3.0-38B2AC?style=for-the-badge&logo=tailwind-css)

**Ví của bạn** là ứng dụng quản lý tài chính cá nhân được thiết kế theo ngôn ngữ tối giản của iOS, kết hợp sức mạnh của trí tuệ nhân tạo (Google Gemini) để giúp bạn làm chủ dòng tiền một cách thông minh và thú vị nhất.

---

## ✨ Tính năng nổi bật

### 🤖 Trợ lý Tài chính AI (Gemini 3 Flash)
*   **Tư vấn thông minh:** Trò chuyện trực tiếp với AI để nhận lời khuyên về tiết kiệm và đầu tư dựa trên lịch sử giao dịch.
*   **Nhận diện giọng nói:** Ra lệnh bằng giọng nói để thêm giao dịch hoặc hỏi đáp nhanh.

### 📸 Chia hóa đơn AI (AI Bill Splitter)
*   **Quét hóa đơn:** Sử dụng camera để chụp ảnh hóa đơn, AI tự động bóc tách các món ăn, giá tiền và thuế.
*   **Chia tiền thông minh:** Chọn người trả cho từng món, tính toán tiền lẻ và tạo QR thanh toán ngay lập tức.

### 🌱 Vườn AI (Gamification)
*   **Tiết kiệm để tưới cây:** Mỗi khi bạn hoàn thành nhiệm vụ tài chính hoặc tiết kiệm, bạn sẽ nhận được "nước" để chăm sóc cây trong vườn AI.
*   **Theo dõi sự trưởng thành:** Cây sẽ lớn dần theo kỷ luật tài chính của bạn.

### 🎨 Trải nghiệm iOS Thuần khiết
*   **Dark Mode:** Chuyển đổi giao diện Sáng/Tối mượt mà.
*   **Widget Màn hình khóa:** Xem số dư và ngân sách ngay từ màn hình khóa.
*   **Tùy biến Icon:** Thay đổi biểu tượng ứng dụng theo sở thích.

---

## 🛠 Yêu cầu hệ thống & Cài đặt

### 1. Chuẩn bị
Ứng dụng sử dụng **Google Gemini API**. Bạn cần có một API Key để các tính năng AI hoạt động.
*   Lấy key tại: [Google AI Studio](https://aistudio.google.com/app/apikey)

### 2. Cài đặt môi trường
Vì ứng dụng sử dụng cấu trúc ES Modules trực tiếp (không cần qua bước Build phức tạp), bạn chỉ cần một Web Server đơn giản.

**Sử dụng Node.js (npx):**
```bash
# Di chuyển vào thư mục dự án
cd nmap-finance-app

# Chạy server ảo
npx serve .
```

**Hoặc sử dụng VS Code Live Server:**
*   Mở thư mục dự án bằng VS Code.
*   Nhấn chuột phải vào file `index.html` và chọn **Open with Live Server**.

### 3. Cấu hình API Key
Ứng dụng sẽ tự động nhận diện API Key từ biến môi trường `process.env.API_KEY`. Đảm bảo key đã được thiết lập trong môi trường chạy của bạn.

---

## 🚀 Hướng dẫn sử dụng nhanh

1.  **Đăng ký tài khoản:** Tạo tài khoản mới và xác thực bằng mã OTP (Demo mặc định 123456).
2.  **Thiết lập Ngân sách:** Vào tab **Ngân sách**, nhấn vào số tiền lớn để đặt hạn mức chi tiêu hàng tháng.
3.  **Thêm giao dịch:** Nhấn nút **[+]** ở giữa thanh điều hướng. Bạn có thể nhập số tiền bằng bàn phím số iOS hoặc dùng **Quét hóa đơn**.
4.  **Hỏi Trợ lý AI:** Nhấn icon Robot ở trang chủ để bắt đầu trò chuyện về tài chính của bạn.
5.  **Cài đặt:** Vào tab **Cài đặt** để đổi ảnh đại diện, tiền tệ (VND/USD), hoặc tải icon ứng dụng.

---

## 📁 Cấu trúc thư mục

*   `/components`: Chứa các màn hình và thành phần UI (React).
*   `/services`: Xử lý logic kết nối với Google Gemini API.
*   `types.ts`: Định nghĩa các kiểu dữ liệu cho toàn bộ ứng dụng.
*   `constants.tsx`: Chứa dữ liệu mẫu và cấu hình danh mục.
*   `App.tsx`: File điều phối chính của ứng dụng.

---

## 🛡 Bảo mật dữ liệu
Toàn bộ dữ liệu giao dịch và thông tin cá nhân của bạn được lưu trữ cục bộ trên trình duyệt (**LocalStorage**). Chúng tôi không lưu trữ dữ liệu của bạn trên server trung gian, đảm bảo quyền riêng tư tuyệt đối.

---

ví của bạn -finance Mọi người đều biết chúng ta đang ở thời đại 4.0, thời đại bùng nổ Al Hiện nay vấn đề nhức nhối và được mọi người quan tâm lớn nhất đó chính công nghệ Al và tài chính của cá nhân Vấn đề này đã được nhiều bên nhìn thấy và kahi thác nó bằng cách kết hợp giữa cả 2 cái sẽ trở nên một kịch bản hoàn hảo Trên website hay thị trường chúng ta đều có thể bắt gặp được nhiều app quản lí tài chính hay nhiều app quản lí chiêu rầm rộ khá phổ biến hiện nay Chính vì sự bủng nổ này hôm nay tôi làm dự án này là để cho mọi người có thể biết được nó như thế nào và cách hoạt động sử dụng và tìm hiểu được một số thứ cơ bản về cái này Trước hết chúng ta có thể biết là để làm ra một cái quản lí tài chính như v cũng không tốn bao nhiều thời gian là mấy cái công đoạn tốn thời gian mà tôi nghĩ là oải nhất là thiết kế sao cho hợp lí Để có thể tiếp cận và đi sâu hơn thì tôi đã tạo ra cái này làm demo cho những ai thực sự cần và cần tìm nguồn tham khảo :) Tui hơi cùi bắp nhưng tôi tin rằng nó sẽ giúp ích cho bạn rất nhiều trong việc làm đó nhé hãy sử dụng nó cho mục đích học tập và làm những gì có ích nhé :)) Cảm ơn vì đã ghe qua hehe

---
*Lưu ý: Ứng dụng này là phiên bản Concept/Demo dành cho mục đích trình diễn tính năng AI trong tài chính.*
