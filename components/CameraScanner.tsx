
import React, { useState, useRef, useEffect } from 'react';
import { analyzeReceipt } from '../services/geminiService';

interface CameraScannerProps {
  onBack: () => void;
  onComplete: (data: any) => void;
}

const CameraScanner: React.FC<CameraScannerProps> = ({ onBack, onComplete }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [statusText, setStatusText] = useState('Đưa hóa đơn vào giữa khung hình');
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: { ideal: 'environment' } } 
        });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err: any) {
        setCameraError("Không thể truy cập camera. Vui lòng chọn ảnh từ thư viện.");
      }
    };
    startCamera();
    return () => streamRef.current?.getTracks().forEach(t => t.stop());
  }, []);

  const processImage = async (base64: string) => {
    setIsScanning(true);
    setStatusText("Em đang đọc hóa đơn cho sếp...");
    try {
      const result = await analyzeReceipt(base64);
      onComplete(result);
    } catch (err) {
      alert("Dạ lỗi rồi sếp ơi! Sếp chụp lại rõ hơn hoặc kiểm tra API Key giúp em.");
      setIsScanning(false);
      setStatusText("Thử lại hoặc chọn ảnh khác");
    }
  };

  const handleCapture = () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx?.drawImage(video, 0, 0);
    
    const base64 = canvas.toDataURL('image/jpeg', 0.8);
    processImage(base64);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => processImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex h-screen flex-col bg-black text-white relative z-[200] animate-in slide-in-from-bottom duration-500">
      <canvas ref={canvasRef} className="hidden" />
      
      <div className="absolute inset-0 z-0 bg-zinc-950 flex items-center justify-center">
        {cameraError ? (
          <div className="text-center p-10 space-y-6">
            <span className="material-symbols-outlined text-6xl text-gray-700">no_photography</span>
            <p className="text-sm font-bold text-gray-400">{cameraError}</p>
            <button onClick={() => fileInputRef.current?.click()} className="w-full py-4 bg-white text-black rounded-2xl font-black">CHỌN ẢNH</button>
          </div>
        ) : (
          <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover opacity-80" />
        )}
      </div>

      <header className="relative z-10 flex items-center p-6 pt-12 justify-between bg-gradient-to-b from-black/80 to-transparent">
        <button onClick={onBack} className="p-2 active-scale rounded-full bg-black/20 backdrop-blur-md">
          <span className="material-symbols-outlined">close</span>
        </button>
        <div className="text-center">
          <h2 className="text-sm font-black uppercase tracking-[0.2em]">Siêu Quét AI</h2>
          <p className="text-[9px] text-emerald-400 font-bold uppercase tracking-widest animate-pulse">Gemini Vision 3.0</p>
        </div>
        <div className="w-10"></div>
      </header>

      <main className="relative z-10 flex-1 flex flex-col items-center justify-center p-8">
        <div className={`relative w-full max-w-[300px] aspect-[3/4] border-2 rounded-[2.5rem] transition-all duration-700 ${isScanning ? 'border-emerald-400 scale-105' : 'border-white/20'}`}>
          <div className="absolute -top-1 -left-1 w-12 h-12 border-t-4 border-l-4 border-white/60 rounded-tl-3xl"></div>
          <div className="absolute -top-1 -right-1 w-12 h-12 border-t-4 border-r-4 border-white/60 rounded-tr-3xl"></div>
          <div className="absolute -bottom-1 -left-1 w-12 h-12 border-b-4 border-l-4 border-white/60 rounded-bl-3xl"></div>
          <div className="absolute -bottom-1 -right-1 w-12 h-12 border-b-4 border-r-4 border-white/60 rounded-br-3xl"></div>
          
          {isScanning ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-emerald-500/10 backdrop-blur-sm rounded-[2.5rem]">
              <div className="size-20 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Đang bóc tách dữ liệu...</p>
            </div>
          ) : (
            <div className="absolute top-0 left-0 w-full h-1 bg-emerald-400/50 shadow-[0_0_20px_emerald] animate-[scan_2s_infinite_ease-in-out]"></div>
          )}
        </div>

        <div className="mt-12 bg-black/40 backdrop-blur-xl px-8 py-4 rounded-3xl border border-white/10">
          <p className="text-[10px] font-black text-center tracking-[0.2em] uppercase text-white">{statusText}</p>
        </div>
      </main>

      <footer className="relative z-10 bg-black/80 backdrop-blur-2xl p-10 flex items-center justify-between pb-14 border-t border-white/5">
        <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileUpload} />
        <button onClick={() => fileInputRef.current?.click()} className="flex flex-col items-center gap-2 active-scale group">
          <div className="size-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
            <span className="material-symbols-outlined text-white/70">image</span>
          </div>
          <span className="text-[9px] font-black uppercase text-gray-500">Thư viện</span>
        </button>

        <button onClick={handleCapture} disabled={isScanning} className="size-24 rounded-full border-[6px] border-white/20 p-1.5 active-scale">
          <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-black">
            <span className="material-symbols-outlined text-4xl">{isScanning ? 'sync' : 'photo_camera'}</span>
          </div>
        </button>

        <div className="w-14"></div>
      </footer>

      <style>{`
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          50% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default CameraScanner;
