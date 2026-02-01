
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load env từ mọi nguồn (file .env hoặc hệ thống Vercel)
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react()],
    define: {
      // Ép kiểu để browser có thể đọc được process.env.API_KEY
      // Chúng ta ưu tiên lấy trực tiếp từ process.env của Node (trên Vercel build)
      'process.env.API_KEY': JSON.stringify(process.env.API_KEY || env.API_KEY),
    },
    build: {
      outDir: 'dist',
    },
    server: {
      port: 3000,
    }
  };
});
