
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load env từ file .env hoặc hệ thống Vercel
  // Fix: Explicitly cast process to any to avoid "Property 'cwd' does not exist on type 'Process'" error.
  const env = loadEnv(mode, (process as any).cwd(), '');
  
  return {
    plugins: [react()],
    define: {
      // Ép kiểu để browser có thể đọc được process.env.API_KEY
      // Dùng 'process.env.API_KEY' thay vì các biến VITE_ để đồng bộ với mã nguồn
      'process.env.API_KEY': JSON.stringify(env.API_KEY || process.env.API_KEY),
    },
    build: {
      outDir: 'dist',
    },
    server: {
      port: 3000,
    }
  };
});
