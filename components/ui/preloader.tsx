"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    let currentProgress = 0;
    let animationFrameId: number;

    const animate = () => {
      if (currentProgress < 99.9) {
        // Smooth, luxurious progress curve that completes in less than 1 second
        const diff = 100.1 - currentProgress;
        currentProgress += diff * 0.08;
        setProgress(Math.min(currentProgress, 100));
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setProgress(100);
        setTimeout(() => {
          setIsLoading(false);
          document.body.style.overflow = "";
        }, 300); // snappier fade out for high performance feel
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
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
          <div className="relative w-full max-w-[1200px] flex flex-col items-center px-10">
            {/* Logo Overlay Container */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ 
                y: 0, 
                opacity: 1,
              }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center w-full"
            >
              <motion.div
                animate={{
                  opacity: [0.85, 1, 0.85],
                  scale: [0.99, 1.01, 0.99],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="flex flex-col items-center w-full"
                style={{
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                  willChange: "transform",
                }}
              >
                {/* Logo Image Loader Container */}
                <div className="relative py-16 px-6 flex items-center justify-center">
                  <div className="relative w-[150px] md:w-[200px] h-[30px] md:h-[39px] flex items-center justify-center">
                    {/* Background silhouette/outline of the logo - Muted Grey & Dark Green */}
                    <img
                      src="/logos/logo.png"
                      alt="Texongo Background"
                      className="absolute inset-0 w-full h-full object-contain select-none pointer-events-none"
                      style={{ 
                        imageRendering: '-webkit-optimize-contrast',
                        transform: 'translateZ(0)',
                        backfaceVisibility: 'hidden',
                        willChange: 'transform',
                        filter: 'invert(1) hue-rotate(180deg) brightness(0.35)'
                      }}
                    />
                    
                    {/* Filled/Colored Logo that expands horizontally from left to right as progress increases */}
                    <motion.div
                      className="absolute inset-y-0 left-0 overflow-hidden select-none pointer-events-none"
                      style={{ width: `${progress}%` }}
                    >
                      <img
                        src="/logos/logo.png"
                        alt="Texongo"
                        className="w-[150px] md:w-[200px] h-[30px] md:h-[39px] absolute top-0 left-0 object-contain"
                        style={{ 
                          maxWidth: 'none', 
                          imageRendering: '-webkit-optimize-contrast',
                          transform: 'translateZ(0)',
                          backfaceVisibility: 'hidden',
                          willChange: 'transform',
                          filter: 'invert(1) hue-rotate(180deg)'
                        }}
                      />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
          
          {/* Subtle Ambient Glows */}
          <div className="absolute inset-0 pointer-events-none">
             <motion.div 
               animate={{
                 opacity: [0.3, 0.6, 0.3],
                 scale: [1, 1.2, 1],
               }}
               transition={{
                 duration: 4,
                 repeat: Infinity,
                 ease: "easeInOut"
               }}
               className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#57AD43]/10 blur-[150px] rounded-full" 
             />
             <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
