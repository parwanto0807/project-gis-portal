'use client';

import React, { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import { Button } from '@/components/ui/button';
import { Camera, RefreshCw, X, Check, Scan, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CameraCaptureProps {
  onCapture: (imageSrc: string) => void;
  onClose: () => void;
}

const videoConstraints = {
  width: 1920,
  height: 1080,
  facingMode: "environment" 
};

export function CameraCapture({ onCapture, onClose }: CameraCaptureProps) {
  const webcamRef = useRef<Webcam>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setImgSrc(imageSrc);
    }
  }, [webcamRef]);

  const retake = () => {
    setImgSrc(null);
  };

  const confirm = () => {
    if (imgSrc) {
      onCapture(imgSrc);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-xl flex flex-col items-center justify-center p-6 md:p-12"
      >
        <div className="relative w-full max-w-4xl bg-black rounded-[3rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] border border-white/10 aspect-video lg:aspect-square xl:aspect-video flex items-center justify-center">
          {!imgSrc ? (
            <>
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
                className="w-full h-full object-cover"
              />
              
              {/* Camera Overlays */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-10 left-10 w-20 h-20 border-l-2 border-t-2 border-white/30 rounded-tl-3xl" />
                <div className="absolute top-10 right-10 w-20 h-20 border-r-2 border-t-2 border-white/30 rounded-tr-3xl" />
                <div className="absolute bottom-10 left-10 w-20 h-20 border-l-2 border-b-2 border-white/30 rounded-bl-3xl" />
                <div className="absolute bottom-10 right-10 w-20 h-20 border-r-2 border-b-2 border-white/30 rounded-br-3xl" />
                
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.5)] animate-pulse" />
                
                <div className="absolute top-10 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-black/40 backdrop-blur-md px-6 py-2 rounded-full border border-white/10 uppercase tracking-[0.3em] font-black text-[10px] text-white">
                  <Scan className="w-3 h-3 text-red-500 animate-pulse" />
                  Live Capture Active
                </div>
              </div>

              <div className="absolute bottom-12 left-0 right-0 flex justify-center gap-10 items-center">
                <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={onClose}
                    className="h-16 w-16 rounded-full bg-white/5 hover:bg-white/10 text-white border-white/10 backdrop-blur-xl transition-all active:scale-90"
                >
                    <X className="w-8 h-8" />
                </Button>
                
                <motion.div whileTap={{ scale: 0.8 }} transition={{ duration: 0.1 }}>
                    <Button 
                        onClick={capture}
                        className="w-24 h-24 rounded-full bg-white hover:bg-slate-100 text-slate-950 shadow-[0_0_50px_rgba(255,255,255,0.3)] p-0 flex items-center justify-center group"
                    >
                        <div className="w-20 h-20 rounded-full border-4 border-slate-950/5 group-hover:scale-90 transition-transform flex items-center justify-center">
                            <Camera className="w-10 h-10" />
                        </div>
                    </Button>
                </motion.div>

                <div className="w-16 h-16" /> {/* Spacer */}
              </div>
            </>
          ) : (
            <motion.div 
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-full h-full relative"
            >
              <img src={imgSrc} alt="captured" className="w-full h-full object-cover" />
              
              <div className="absolute inset-0 bg-emerald-500/10 pointer-events-none" />
              
              <div className="absolute top-10 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-emerald-500/80 backdrop-blur-md px-8 py-3 rounded-full border border-emerald-400/50 uppercase tracking-[0.3em] font-black text-[10px] text-white shadow-2xl">
                <ShieldCheck className="w-4 h-4" />
                Evidence Secure
              </div>

              <div className="absolute bottom-12 left-0 right-0 flex justify-center gap-10">
                <Button 
                    variant="outline" 
                    onClick={retake}
                    className="h-16 px-10 rounded-[2rem] bg-white/5 hover:bg-white/10 text-white border-white/10 backdrop-blur-xl font-black uppercase tracking-widest text-[10px]"
                >
                    <RefreshCw className="w-4 h-4 mr-3" />
                    Reset
                </Button>
                <Button 
                    onClick={confirm}
                    className="h-16 px-12 rounded-[2rem] bg-emerald-500 hover:bg-emerald-600 text-white shadow-[0_20px_50px_rgba(16,185,129,0.3)] border-0 font-black uppercase tracking-widest text-[10px]"
                >
                    <Check className="w-4 h-4 mr-3" />
                    Confirm Protocol
                </Button>
              </div>
            </motion.div>
          )}
        </div>
        
        <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mt-10 text-white/30 text-[10px] font-black uppercase tracking-[0.5em]"
        >
          Secured Optical Evidence Acquisition Unit
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
}
