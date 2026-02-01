
import React, { useState, useRef, useEffect } from 'react';

interface CameraScannerProps {
  onBack: () => void;
  onComplete: () => void;
}

const CameraScanner: React.FC<CameraScannerProps> = ({ onBack, onComplete }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    const startCamera = async () => {
      setCameraError(null);
      
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setCameraError("Trình duyệt không hỗ trợ truy cập camera.");
        return;
      }

      // Kiểm tra xem có thiết bị camera nào không trước khi yêu cầu quyền
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const hasCamera = devices.some(device => device.kind === 'videoinput');
        if (!hasCamera) {
          setCameraError("Không tìm thấy thiết bị camera trên máy này.");
          return;
        }
      } catch (e) {
        console.warn("Không thể liệt kê thiết bị:", e);
      }

      try {
        let stream: MediaStream;
        try {
          // Thử mở camera sau với các yêu cầu linh hoạt bằng 'ideal'
          stream = await navigator.mediaDevices.getUserMedia({ 
            video: { 
              facingMode: { ideal: 'environment' }
            } 
          });
        } catch (e) {
          console.warn("Không thể mở camera sau, thử cấu hình mặc định...");
          // Fallback cực kỳ đơn giản để tránh lỗi 'Requested device not found'
          stream = await navigator.mediaDevices.getUserMedia({ video: true });
        }
        
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          // Sử dụng onloadedmetadata để đảm bảo video sẵn sàng trước khi phát
          videoRef.current.onloadedmetadata = () => {
            videoRef.current?.play().catch(err => {
              console.error("Lỗi khi phát video:", err);
            });
          };
        }
      } catch (err: any) {
        console.error("Camera Error Details:", err);
        if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
          setCameraError("Không tìm thấy camera. Bạn có thể chọn ảnh từ thư viện.");
        } else if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
          setCameraError("Quyền truy cập camera bị từ chối. Vui lòng cấp quyền trong cài đặt.");
        } else {
          setCameraError(`Lỗi camera: ${err.message || "Vui lòng thử lại sau."}`);
        }
      }
    };

    startCamera();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => {
          track.stop();
          console.debug(`Dừng track: ${track.label}`);
        });
      }
    };
  }, []);

  const handleCapture = () => {
    if (cameraError || !streamRef.current) return;
    setIsScanning(true);
    setTimeout(() => onComplete(), 1500);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsScanning(true);
      setTimeout(() => onComplete(), 1200);
    }
  };

  return (
    <div className="flex h-screen flex-col bg-black text-white relative z-[200] animate-in slide-in-from-bottom duration-500">
      <div className="absolute inset-0 z-0 overflow-hidden bg-zinc-950 flex items-center justify-center">
        {cameraError ? (
          <div className="text-center p-10 space-y-6 max-w-xs animate-in fade-in zoom-in duration-300">
            <div className="size-20 bg-white/5 rounded-full flex items-center justify-center mx-auto border border-white/10">
              <span className="material-symbols-outlined text-4xl text-gray-500">videocam_off</span>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-bold text-gray-300 leading-relaxed">{cameraError}</p>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest font-medium">Bạn có thể chụp ảnh hóa đơn và tải lên từ máy</p>
            </div>
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-4 bg-white text-black rounded-2xl text-xs font-black uppercase tracking-widest active-scale shadow-lg"
            >
              Chọn ảnh từ thư viện
            </button>
          </div>
        ) : (
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            muted
            className="w-full h-full object-cover opacity-90 transition-opacity duration-700"
          />
        )}
      </div>

      <header className="relative z-10 flex items-center p-6 pt-12 justify-between bg-gradient-to-b from-black/90 to-transparent">
        <button onClick={onBack} className="p-2 active-scale rounded-full bg-black/20 backdrop-blur-md">
          <span className="material-symbols-outlined text-white">close</span>
        </button>
        <div className="text-center">
          <h2 className="text-sm font-black uppercase tracking-[0.2em]">Quét Hóa đơn</h2>
          <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Hỗ trợ bởi Nmap AI</p>
        </div>
        <button className="p-2 active-scale rounded-full bg-black/20 backdrop-blur-md">
          <span className="material-symbols-outlined text-white">flash_on</span>
        </button>
      </header>

      <main className="relative z-10 flex-1 flex flex-col items-center justify-center p-8">
        {!cameraError && (
          <div className={`relative w-full max-w-[280px] aspect-[1/1] border-2 border-white/20 rounded-[2.5rem] shadow-[0_0_0_9999px_rgba(0,0,0,0.7)] transition-all duration-700 ${isScanning ? 'scale-105 border-emerald-400 shadow-[0_0_40px_rgba(52,211,153,0.3)]' : ''}`}>
            {!isScanning && (
              <div className="absolute top-0 left-0 w-full h-[2px] bg-emerald-400/60 shadow-[0_0_15px_rgba(52,211,153,0.6)] animate-[scan_2.5s_infinite_ease-in-out]"></div>
            )}
            
            <div className="absolute -top-1 -left-1 w-10 h-10 border-t-4 border-l-4 border-white/80 rounded-tl-2xl"></div>
            <div className="absolute -top-1 -right-1 w-10 h-10 border-t-4 border-r-4 border-white/80 rounded-tr-2xl"></div>
            <div className="absolute -bottom-1 -left-1 w-10 h-10 border-b-4 border-l-4 border-white/80 rounded-bl-2xl"></div>
            <div className="absolute -bottom-1 -right-1 w-10 h-10 border-b-4 border-r-4 border-white/80 rounded-br-2xl"></div>
            
            {isScanning && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-emerald-500/10 backdrop-blur-[2px] rounded-[2.5rem] animate-pulse">
                <span className="material-symbols-outlined text-emerald-400 text-7xl mb-2">auto_awesome</span>
                <span className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em]">Đang xử lý...</span>
              </div>
            )}
          </div>
        )}

        {!isScanning && (
          <div className="mt-12 bg-black/50 backdrop-blur-2xl px-8 py-4 rounded-3xl border border-white/10 shadow-2xl">
            <p className="text-[10px] font-black text-center tracking-[0.2em] uppercase text-white/80">
              {cameraError ? 'Vui lòng tải ảnh lên' : 'Đưa hóa đơn vào giữa khung hình'}
            </p>
          </div>
        )}
      </main>

      <footer className="relative z-10 bg-gradient-to-t from-black to-black/80 backdrop-blur-xl p-10 flex items-center justify-between pb-14">
        <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileUpload} />
        
        <button onClick={() => fileInputRef.current?.click()} className="flex flex-col items-center gap-2 active-scale group">
          <div className="size-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors">
             <span className="material-symbols-outlined text-white/70">image</span>
          </div>
          <span className="text-[9px] font-black uppercase tracking-widest text-gray-500 group-hover:text-gray-300">Thư viện</span>
        </button>

        <button 
          onClick={handleCapture} 
          disabled={!!cameraError || isScanning}
          className={`size-24 rounded-full border-[6px] p-1.5 transition-all duration-300 active-scale ${cameraError || isScanning ? 'border-gray-800 opacity-20' : 'border-white/30 hover:border-white'}`}
        >
          <div className={`w-full h-full rounded-full flex items-center justify-center transition-colors ${cameraError || isScanning ? 'bg-gray-800' : 'bg-white shadow-[0_0_20px_rgba(255,255,255,0.3)]'}`}>
            <span className={`material-symbols-outlined text-4xl ${cameraError || isScanning ? 'text-gray-600' : 'text-black'}`}>
              {isScanning ? 'hourglass_top' : 'photo_camera'}
            </span>
          </div>
        </button>

        <button className="flex flex-col items-center gap-2 active-scale opacity-30 cursor-not-allowed">
          <div className="size-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
            <span className="material-symbols-outlined text-white/70">history</span>
          </div>
          <span className="text-[9px] font-black uppercase tracking-widest text-gray-500">Lịch sử</span>
        </button>
      </footer>

      <style>{`
        @keyframes scan {
          0% { top: 5%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 95%; opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default CameraScanner;
