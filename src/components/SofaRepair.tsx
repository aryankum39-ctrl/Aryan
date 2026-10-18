import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Camera, 
  X, 
  Check, 
  Trash2, 
  Sparkles, 
  Shield, 
  Wrench, 
  RefreshCw, 
  Upload, 
  Eye, 
  CheckCircle2, 
  AlertCircle,
  PhoneCall,
  Plus
} from 'lucide-react';

const SofaRepair: React.FC = () => {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [capturedImages, setCapturedImages] = useState<string[]>([]);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [cameraLoading, setCameraLoading] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isStreamReady, setIsStreamReady] = useState(false);
  const [isFlashing, setIsFlashing] = useState(false);
  const [justCaptured, setJustCaptured] = useState(false);
  const [selectedPreviewImage, setSelectedPreviewImage] = useState<string | null>(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);
  const [quoteFormData, setQuoteFormData] = useState({ name: '', phone: '', issue: '' });

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Play shutter sound via Web Audio API
  const playShutterSound = useCallback(() => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch {
      // Audio playback fails silently if restricted
    }
  }, []);

  const stopCameraStream = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => {
        try {
          track.stop();
        } catch {}
      });
      setStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsStreamReady(false);
  }, [stream]);

  const startCamera = async (overrideFacingMode?: 'environment' | 'user') => {
    const targetFacing = overrideFacingMode || facingMode;
    setCameraLoading(true);
    setCameraError(null);
    setIsCameraActive(true);

    // Stop existing stream if switching
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera API is not supported in this browser environment.');
      }

      let mediaStream: MediaStream;
      try {
        mediaStream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: { ideal: targetFacing },
            width: { ideal: 1920 },
            height: { ideal: 1080 }
          },
          audio: false
        });
      } catch {
        // Fallback to simpler constraints
        mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false
        });
      }

      setStream(mediaStream);
      setCameraLoading(false);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.play().catch(err => console.warn('Autoplay error:', err));
      }
    } catch (err: unknown) {
      console.error('Error accessing camera:', err);
      setCameraLoading(false);
      setCameraError(
        'Camera permission not available or device has no camera. You can snap or select photos directly from your phone gallery.'
      );
    }
  };

  const closeCameraModal = () => {
    stopCameraStream();
    setIsCameraActive(false);
    setCameraError(null);
    setCameraLoading(false);
  };

  const switchCameraFacing = () => {
    const nextMode = facingMode === 'environment' ? 'user' : 'environment';
    setFacingMode(nextMode);
    startCamera(nextMode);
  };

  // Video element ref callback
  const handleVideoRef = useCallback((element: HTMLVideoElement | null) => {
    videoRef.current = element;
    if (element && stream) {
      if (element.srcObject !== stream) {
        element.srcObject = stream;
      }
      element.play().catch(() => {});
    }
  }, [stream]);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
      videoRef.current.play().catch(() => {});
    }
  }, [stream, isCameraActive]);

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(t => t.stop());
      }
    };
  }, [stream]);

  // Capture image from video stream
  const captureImage = () => {
    const video = videoRef.current;
    if (!video) return;

    // Trigger visual shutter flash
    setIsFlashing(true);
    setTimeout(() => setIsFlashing(false), 150);

    // Vibration on mobile
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(60);
      } catch {}
    }

    playShutterSound();

    try {
      const canvas = canvasRef.current || document.createElement('canvas');
      const width = video.videoWidth > 0 ? video.videoWidth : 1280;
      const height = video.videoHeight > 0 ? video.videoHeight : 720;

      canvas.width = width;
      canvas.height = height;

      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, width, height);
        const imageData = canvas.toDataURL('image/jpeg', 0.88);
        if (imageData && imageData.length > 200) {
          setCapturedImages(prev => [imageData, ...prev]);
          setJustCaptured(true);
          setTimeout(() => setJustCaptured(false), 2200);
        }
      }
    } catch (err) {
      console.error('Error capturing image:', err);
    }
  };

  // File upload / native camera capture handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file) continue;
      const reader = new FileReader();
      reader.onload = event => {
        if (event.target?.result) {
          setCapturedImages(prev => [event.target!.result as string, ...prev]);
        }
      };
      reader.readAsDataURL(file);
    }

    e.target.value = '';
    closeCameraModal();
  };

  const removeImage = (index: number) => {
    setCapturedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setQuoteSubmitted(true);
    setTimeout(() => {
      setQuoteSubmitted(false);
      setIsQuoteModalOpen(false);
      setQuoteFormData({ name: '', phone: '', issue: '' });
    }, 2500);
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden" id="repair">
      {/* Hidden File Input for Native Phone Camera / Gallery */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        capture="environment"
        multiple
        onChange={handleFileUpload}
        className="hidden"
      />

      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Content Side */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-wood block">
                  Expert Restoration & Care
                </span>
                <h2 className="text-4xl md:text-5xl font-serif leading-tight">
                  Sofa Repair & Restoration Services
                </h2>
                <p className="text-charcoal/60 leading-relaxed">
                  Is your favorite sofa showing signs of wear, sagging cushions, or torn fabric?
                  Our master craftsmen specialize in restoring luxury furniture to pristine condition.
                  Snap a quick photo using our camera tool for an instant condition assessment and free quote.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex gap-4 p-4 bg-cream rounded-xl border border-charcoal/5">
                  <div className="w-10 h-10 bg-wood/10 rounded-full flex items-center justify-center shrink-0">
                    <Wrench size={20} className="text-wood" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold mb-1">Structural Frame Repair</h4>
                    <p className="text-[11px] text-charcoal/60">
                      Reinforcing teak frames, heavy springs, and joints for lasting stability.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 p-4 bg-cream rounded-xl border border-charcoal/5">
                  <div className="w-10 h-10 bg-wood/10 rounded-full flex items-center justify-center shrink-0">
                    <Sparkles size={20} className="text-wood" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold mb-1">Reupholstery & Foam</h4>
                    <p className="text-[11px] text-charcoal/60">
                      High-density foam replacement and premium velvet, leatherette, or linen fabric.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-charcoal text-white rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <Shield size={20} className="text-wood" />
                  <h4 className="text-sm font-bold uppercase tracking-widest">How It Works</h4>
                </div>
                <ol className="space-y-3 text-xs text-white/70">
                  <li className="flex gap-3">
                    <span className="text-wood font-bold">01.</span>
                    <span>Tap the Camera button to click clear photos of damaged sofa parts.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-wood font-bold">02.</span>
                    <span>Our master craftsmen inspect the damage and calculate an exact estimate.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-wood font-bold">03.</span>
                    <span>Free doorstep inspection, pickup, repair, and doorstep delivery.</span>
                  </li>
                </ol>
              </div>
            </motion.div>

            {/* Visual Side / Gallery Assessment */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="relative min-h-[460px] bg-cream rounded-3xl p-8 border border-charcoal/5 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-lg font-serif">Condition Assessment</h3>
                    <p className="text-xs text-charcoal/50">Capture photos for expert inspection</p>
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 bg-wood/10 text-wood rounded-full">
                    {capturedImages.length} {capturedImages.length === 1 ? 'Photo' : 'Photos'} Captured
                  </span>
                </div>

                {capturedImages.length === 0 ? (
                  <div className="h-[280px] flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-charcoal/15 rounded-2xl bg-white/50">
                    <div className="w-16 h-16 bg-wood/10 text-wood rounded-full flex items-center justify-center mb-4">
                      <Camera size={32} />
                    </div>
                    <h4 className="text-sm font-bold text-charcoal mb-1">No Photos Added Yet</h4>
                    <p className="text-xs text-charcoal/60 max-w-xs mb-6">
                      Click the camera button below to take a photo of your sofa or upload from your device.
                    </p>
                    <div className="flex flex-wrap gap-3 justify-center">
                      <button
                        onClick={() => startCamera()}
                        className="px-5 py-2.5 bg-wood text-white rounded-full text-xs font-semibold flex items-center gap-2 hover:bg-wood/90 transition shadow-md"
                      >
                        <Camera size={16} />
                        Open Live Camera
                      </button>
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="px-5 py-2.5 bg-white border border-charcoal/15 text-charcoal rounded-full text-xs font-semibold flex items-center gap-2 hover:bg-charcoal/5 transition"
                      >
                        <Upload size={16} />
                        Upload from Phone
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[300px] overflow-y-auto pr-1">
                      {capturedImages.map((img, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="group relative aspect-square bg-white rounded-xl overflow-hidden shadow-sm border border-charcoal/10"
                        >
                          <img
                            src={img}
                            alt={`Condition damage ${index + 1}`}
                            className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                            onClick={() => setSelectedPreviewImage(img)}
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            <button
                              onClick={() => setSelectedPreviewImage(img)}
                              className="p-2 bg-white/90 text-charcoal rounded-full hover:bg-white transition"
                              title="Preview"
                            >
                              <Eye size={14} />
                            </button>
                            <button
                              onClick={() => removeImage(index)}
                              className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition"
                              title="Delete photo"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </motion.div>
                      ))}

                      {/* Add more button tile */}
                      <button
                        onClick={() => startCamera()}
                        className="aspect-square rounded-xl border-2 border-dashed border-charcoal/20 flex flex-col items-center justify-center text-charcoal/50 hover:border-wood hover:text-wood transition bg-white/40"
                      >
                        <Plus size={24} />
                        <span className="text-[10px] font-bold uppercase mt-1">Add More</span>
                      </button>
                    </div>

                    {/* Action buttons when images exist */}
                    <div className="pt-2 flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={() => setIsQuoteModalOpen(true)}
                        className="flex-1 py-3 px-5 bg-charcoal text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-black transition shadow-lg"
                      >
                        <CheckCircle2 size={16} className="text-emerald-400" />
                        Request Repair Estimate ({capturedImages.length})
                      </button>
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="py-3 px-4 bg-white border border-charcoal/10 text-charcoal rounded-xl text-xs font-semibold flex items-center justify-center gap-2 hover:bg-charcoal/5 transition"
                      >
                        <Upload size={14} />
                        Upload
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Floating Camera Button */}
              <div className="mt-6 flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => startCamera()}
                  className="w-16 h-16 bg-wood text-white rounded-full shadow-2xl flex items-center justify-center group relative overflow-hidden ring-4 ring-wood/20 hover:ring-wood/40 transition-all"
                  aria-label="Open Camera Tool"
                  title="Open Camera to capture sofa photos"
                >
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <Camera size={28} />
                  <span className="absolute -top-1 -right-1 flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white"></span>
                  </span>
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Live Camera Viewfinder Modal */}
      <AnimatePresence>
        {isCameraActive && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeCameraModal}
              className="absolute inset-0 bg-charcoal/90 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 16 }}
              className="relative w-full max-w-xl bg-white rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col max-h-[92vh]"
            >
              {/* Header */}
              <div className="p-4 sm:p-5 border-b border-charcoal/5 flex justify-between items-center bg-white">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-wood/10 text-wood flex items-center justify-center">
                    <Camera size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-charcoal">
                      Live Sofa Camera
                    </h3>
                    <p className="text-[10px] text-charcoal/50">Point camera at damaged area & tap Capture</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={switchCameraFacing}
                    disabled={cameraLoading || !!cameraError}
                    className="p-2.5 rounded-full hover:bg-charcoal/5 text-charcoal/70 transition-colors disabled:opacity-30"
                    title="Switch Front/Rear Camera"
                  >
                    <RefreshCw size={18} />
                  </button>
                  <button
                    onClick={closeCameraModal}
                    className="p-2.5 rounded-full hover:bg-charcoal/5 text-charcoal transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Viewfinder Window */}
              <div className="relative aspect-[4/3] sm:aspect-video bg-black overflow-hidden flex items-center justify-center">
                {/* Camera Error / Permission Fallback */}
                {cameraError ? (
                  <div className="p-6 text-center text-white space-y-4 max-w-md">
                    <div className="w-12 h-12 bg-red-500/20 text-red-400 rounded-full flex items-center justify-center mx-auto">
                      <AlertCircle size={28} />
                    </div>
                    <p className="text-xs text-white/80 leading-relaxed">{cameraError}</p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="px-5 py-3 bg-wood text-white rounded-full text-xs font-bold uppercase tracking-wider hover:bg-wood/90 transition flex items-center justify-center gap-2 shadow-lg"
                      >
                        <Camera size={16} />
                        Use Phone Camera / Photos
                      </button>
                      <button
                        onClick={() => startCamera()}
                        className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full text-xs font-bold uppercase tracking-wider transition"
                      >
                        Retry Camera
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Live Video */}
                    <video
                      ref={handleVideoRef}
                      autoPlay
                      playsInline
                      muted
                      onLoadedMetadata={() => setIsStreamReady(true)}
                      className={`w-full h-full object-cover transition-opacity duration-300 ${
                        isStreamReady ? 'opacity-100' : 'opacity-0'
                      }`}
                    />

                    {/* Canvas for taking snapshot */}
                    <canvas ref={canvasRef} className="hidden" />

                    {/* Camera Loading Spinner */}
                    {(!isStreamReady || cameraLoading) && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 text-white gap-3 z-10">
                        <RefreshCw size={32} className="animate-spin text-wood" />
                        <span className="text-xs font-medium tracking-wide">Starting Camera...</span>
                      </div>
                    )}

                    {/* Shutter Flash Animation */}
                    {isFlashing && (
                      <div className="absolute inset-0 bg-white z-30 pointer-events-none animate-fade-out" />
                    )}

                    {/* Viewfinder Target Frame */}
                    <div className="absolute inset-8 sm:inset-12 border border-white/25 pointer-events-none rounded-lg">
                      <div className="absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2 border-wood rounded-tl" />
                      <div className="absolute -top-1 -right-1 w-6 h-6 border-t-2 border-r-2 border-wood rounded-tr" />
                      <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-2 border-l-2 border-wood rounded-bl" />
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2 border-wood rounded-br" />
                    </div>

                    {/* Success Toast Overlay on capture */}
                    <AnimatePresence>
                      {justCaptured && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute top-4 bg-emerald-600/90 backdrop-blur-md text-white text-xs font-bold px-4 py-2 rounded-full flex items-center gap-2 shadow-lg z-20"
                        >
                          <Check size={16} />
                          Photo Captured! ({capturedImages.length} Saved)
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Thumbnails counter in corner */}
                    {capturedImages.length > 0 && (
                      <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 bg-black/60 backdrop-blur-md p-1.5 rounded-full pr-3 border border-white/10">
                        <img
                          src={capturedImages[0]}
                          alt="Latest thumbnail"
                          className="w-8 h-8 rounded-full object-cover border border-white/30"
                        />
                        <span className="text-[11px] font-bold text-white">
                          {capturedImages.length} captured
                        </span>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Controls Footer */}
              <div className="p-5 sm:p-6 bg-white flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-charcoal/5">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-xs font-semibold text-charcoal/70 hover:text-charcoal flex items-center gap-2 order-2 sm:order-1"
                >
                  <Upload size={16} />
                  <span>Choose from Gallery</span>
                </button>

                {/* Shutter Button */}
                <div className="flex items-center gap-6 order-1 sm:order-2">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={captureImage}
                    disabled={cameraLoading || !!cameraError}
                    className="w-18 h-18 sm:w-20 sm:h-20 rounded-full border-4 border-wood p-1.5 flex items-center justify-center transition-all disabled:opacity-40"
                    title="Tap to capture photo"
                  >
                    <div className="w-full h-full bg-wood rounded-full flex items-center justify-center text-white shadow-xl hover:bg-wood/90 transition-transform active:scale-95">
                      <Camera size={26} />
                    </div>
                  </motion.button>
                </div>

                <button
                  type="button"
                  onClick={closeCameraModal}
                  className="px-6 py-2.5 bg-charcoal text-white rounded-full text-xs font-bold uppercase tracking-wider hover:bg-black transition-colors order-3"
                >
                  {capturedImages.length > 0 ? `Done (${capturedImages.length})` : 'Cancel'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Full Image Preview Modal */}
      <AnimatePresence>
        {selectedPreviewImage && (
          <div className="fixed inset-0 z-[250] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPreviewImage(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-3xl max-h-[85vh] z-10 flex flex-col items-center"
            >
              <img
                src={selectedPreviewImage}
                alt="Selected damage preview"
                className="max-w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl border border-white/10"
              />
              <button
                onClick={() => setSelectedPreviewImage(null)}
                className="mt-4 px-6 py-2.5 bg-white text-charcoal rounded-full text-xs font-bold uppercase tracking-widest hover:bg-charcoal hover:text-white transition shadow-lg"
              >
                Close Preview
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Repair Estimate Request Modal */}
      <AnimatePresence>
        {isQuoteModalOpen && (
          <div className="fixed inset-0 z-[250] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsQuoteModalOpen(false)}
              className="absolute inset-0 bg-charcoal/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl z-10"
            >
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-xl font-serif">Get Free Sofa Estimate</h3>
                  <p className="text-xs text-charcoal/50">
                    We will review your {capturedImages.length} captured {capturedImages.length === 1 ? 'photo' : 'photos'}
                  </p>
                </div>
                <button
                  onClick={() => setIsQuoteModalOpen(false)}
                  className="p-2 hover:bg-charcoal/5 rounded-full transition"
                >
                  <X size={18} />
                </button>
              </div>

              {quoteSubmitted ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 size={32} />
                  </div>
                  <h4 className="text-lg font-serif">Assessment Request Received!</h4>
                  <p className="text-xs text-charcoal/60 max-w-xs mx-auto">
                    Our master craftsman will call you shortly with a personalized restoration plan and transparent quote.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleQuoteSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-charcoal/70 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Sharma"
                      value={quoteFormData.name}
                      onChange={e => setQuoteFormData({ ...quoteFormData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-charcoal/15 text-sm focus:outline-none focus:border-wood"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-charcoal/70 mb-1">
                      Phone Number (WhatsApp)
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={quoteFormData.phone}
                      onChange={e => setQuoteFormData({ ...quoteFormData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-charcoal/15 text-sm focus:outline-none focus:border-wood"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-charcoal/70 mb-1">
                      Describe Damage (Optional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Cushion sunken, fabric scratched, leg wobbling..."
                      value={quoteFormData.issue}
                      onChange={e => setQuoteFormData({ ...quoteFormData, issue: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-charcoal/15 text-sm focus:outline-none focus:border-wood resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 bg-wood text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-wood/90 transition shadow-lg flex items-center justify-center gap-2"
                    >
                      <PhoneCall size={16} />
                      Submit Photos & Request Callback
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default SofaRepair;
