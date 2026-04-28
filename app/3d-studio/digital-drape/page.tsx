"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

const videoSources = [
  "/digital-drape-fixed/FAB_1_DES_1C.mp4",
  "/digital-drape-fixed/FAB_10_DES_10B.mp4",
  "/digital-drape-fixed/FAB_11_DES_11C.mp4",
  "/digital-drape-fixed/FAB_12_DES_12B.mp4",
  "/digital-drape-fixed/FAB_13_DES_13A.mp4",
  "/digital-drape-fixed/FAB_14_DES_18C.mp4",
  "/digital-drape-fixed/FAB_15_DES_21C.mp4",
  "/digital-drape-fixed/FAB_16_DES_16A.mp4",
  "/digital-drape-fixed/FAB_17_DES_17A.mp4",
  "/digital-drape-fixed/FAB_18_DES_18B.mp4",
  "/digital-drape-fixed/FAB_19_DES_19A.mp4",
  "/digital-drape-fixed/FAB_2_DES_2B.mp4",
  "/digital-drape-fixed/FAB_20_DES_15B.mp4",
  "/digital-drape-fixed/FAB_21_DES_21B.mp4",
  "/digital-drape-fixed/FAB_22_DES_21C.mp4",
  "/digital-drape-fixed/FAB_23_DES_16A.mp4",
  "/digital-drape-fixed/FAB_24_DES_2C.mp4",
  "/digital-drape-fixed/FAB_26_FAB_2A.mp4",
  "/digital-drape-fixed/FAB_28_DES_9C.mp4",
  "/digital-drape-fixed/FAB_29_DES_7A.mp4",
  "/digital-drape-fixed/FAB_3_DES_3A.mp4",
  "/digital-drape-fixed/FAB_30_DES_1A.mp4"
];

const ITEMS_PER_PAGE = 12;

function DrapeCard({ videoSrc, id }: { videoSrc: string; id: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(err => console.log("Playback error:", err));
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative aspect-[3/4] bg-zinc-900 overflow-hidden group cursor-pointer border border-white/5"
    >
      <video
        ref={videoRef}
        src={videoSrc}
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700"
      />
      
      {/* Overlay removed as per user request */}
    </motion.div>
  );
}

export default function DigitalDrapePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(videoSources.length / ITEMS_PER_PAGE);
  
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentVideos = videoSources.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <main className="min-h-screen bg-black text-white pt-24 lg:pt-32">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-16 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl md:text-5xl font-black uppercase tracking-[0.3em] mb-4"
        >
          Digital Drape
        </motion.h1>
        <p className="text-zinc-500 text-xs md:text-sm uppercase tracking-widest max-w-2xl mx-auto font-medium">
          Experience the authentic flow and texture of our high-performance textiles through interactive 3D simulations.
        </p>
      </div>

      <section className="max-w-[1440px] mx-auto px-6 lg:px-10 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
          <AnimatePresence mode="wait">
            {currentVideos.map((src, index) => (
              <DrapeCard 
                key={`${currentPage}-${index}`} 
                id={startIndex + index} 
                videoSrc={src} 
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Pagination Controls */}
        <div className="mt-16 flex items-center justify-center gap-4">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => {
                setCurrentPage(page);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`w-10 h-10 flex items-center justify-center text-[10px] font-black uppercase tracking-widest border transition-all ${
                currentPage === page 
                  ? "bg-white text-black border-white" 
                  : "bg-transparent text-white/40 border-white/10 hover:border-white/40"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}
