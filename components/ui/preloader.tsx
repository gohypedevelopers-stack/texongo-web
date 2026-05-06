"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    let currentProgress = 0;
    let targetProgress = 90; // Aim for 90% while loading
    let animationFrameId: number;

    const animate = () => {
      if (currentProgress < targetProgress) {
        // Smoothly approach the target
        const diff = targetProgress - currentProgress;
        currentProgress += diff * 0.02; // Adjust speed here
        setProgress(currentProgress);
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    const handleLoad = () => {
      targetProgress = 100;
      
      const finishAnimation = () => {
        if (currentProgress < 99.9) {
          const diff = 100.1 - currentProgress;
          currentProgress += diff * 0.15; // Faster finish
          setProgress(currentProgress);
          animationFrameId = requestAnimationFrame(finishAnimation);
        } else {
          setProgress(100);
          setTimeout(() => {
            setIsLoading(false);
            document.body.style.overflow = "";
          }, 600);
        }
      };
      
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(finishAnimation);
    };

    if (document.readyState === "complete") {
      // If already loaded, still show a quick smooth progress to 100
      setTimeout(handleLoad, 500);
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("load", handleLoad);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 1, ease: [0.76, 0, 0.24, 1] }
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0a0a]"
        >
          <div className="relative w-full max-w-[400px] flex flex-col items-center px-10">
            {/* Logo Image & Text */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center mb-16"
            >
              <img
                src="/logos/logo.png"
                alt="Texongo"
                className="h-6 md:h-8 w-auto object-contain brightness-0 invert opacity-50 mb-6"
              />
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-2">
                Texongo
              </h1>
              <span className="text-[10px] font-black uppercase tracking-[0.6em] text-white/20">
                Premium Fabrics
              </span>
            </motion.div>

            {/* Progress Bar Container */}
            <div className="w-full">
              <div className="w-full h-[2px] bg-white/5 relative mb-4">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1, ease: "linear" }}
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#57AD43] to-[#61CE70] shadow-[0_0_15px_rgba(87,173,67,0.4)]"
                />
              </div>

              {/* Percentage */}
              <div className="flex justify-start">
                <motion.span
                  className="text-lg font-medium text-white/40 tracking-tight"
                >
                  {Math.round(progress)}%
                </motion.span>
              </div>
            </div>
          </div>
          
          {/* Subtle Ambient Glows */}
          <div className="absolute inset-0 pointer-events-none">
             <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#57AD43]/10 blur-[150px] rounded-full opacity-50" />
             <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
