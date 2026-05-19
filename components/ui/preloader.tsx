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
            {/* Text Overlay Container */}
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
                  opacity: [0.8, 1, 0.8],
                  scale: [0.98, 1, 0.98],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="flex flex-col items-center w-full"
              >
                {/* Text Loader Container */}
                <div className="relative inline-block py-20 px-10">
                  {/* Green Text with Breathing Effect (Fills from 0 to 100%) */}
                  <motion.div 
                    className="overflow-hidden py-10"
                    style={{ 
                      width: `${progress}%`,
                    }}
                  >
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#57AD43] to-[#61CE70] select-none font-sans whitespace-nowrap leading-[1.5] py-4 px-10">
                      Texongo
                    </h1>
                  </motion.div>
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
