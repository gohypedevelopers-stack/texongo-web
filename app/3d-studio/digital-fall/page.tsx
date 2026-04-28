"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

const ITEMS_PER_PAGE = 12;
const VIDEO_COUNT = 91;

function FallCard({ videoSrc, id }: { videoSrc: string; id: number }) {
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
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
      />
      
      {/* Overlays removed as per user request */}
    </motion.div>
  );
}

export default function DigitalFallPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(VIDEO_COUNT / ITEMS_PER_PAGE);
  
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentIds = Array.from({ length: Math.min(ITEMS_PER_PAGE, VIDEO_COUNT - startIndex) }, (_, i) => startIndex + i + 1);

  return (
    <main className="min-h-screen bg-black text-white pt-24 lg:pt-32">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-16 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl md:text-5xl font-black uppercase tracking-[0.3em] mb-4"
        >
          Digital Fall
        </motion.h1>
        <p className="text-zinc-500 text-xs md:text-sm uppercase tracking-widest max-w-2xl mx-auto font-medium">
          Analyze the natural drape and weight of fabrics through high-fidelity vertical fall simulations.
        </p>
      </div>

      <section className="max-w-[1440px] mx-auto px-6 lg:px-10 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
          <AnimatePresence mode="wait">
            {currentIds.map((id) => (
              <FallCard 
                key={`${currentPage}-${id}`} 
                id={id} 
                videoSrc={`/digital-fall-fixed/${id}.mp4`} 
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Pagination Controls */}
        <div className="mt-16 flex items-center justify-center gap-4 flex-wrap">
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
