"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

const ITEMS_PER_PAGE = 12;
const VIDEO_COUNT = 35;

function FashionCard({ id }: { id: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(err => {
        // Handle autoplay policy/abort errors silently
      });
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
      className="relative aspect-[3/4] bg-zinc-900 overflow-hidden group cursor-pointer border border-white/5"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <video
        ref={videoRef}
        src={`/digital-fashion-fixed/${id}.mp4`}
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
    </motion.div>
  );
}

export default function DigitalFashionPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(VIDEO_COUNT / ITEMS_PER_PAGE);
  
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentIds = Array.from(
    { length: Math.min(ITEMS_PER_PAGE, VIDEO_COUNT - startIndex) }, 
    (_, i) => startIndex + i + 1
  );

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header Section */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-20 text-center border-b border-white/5">
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-[10px] font-black uppercase tracking-[0.5em] text-[#57AD43] mb-4 block"
        >
          3D Studio
        </motion.span>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-5xl font-black uppercase tracking-[0.2em] mb-6"
        >
          Digital Fashion
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-zinc-500 text-xs md:text-sm max-w-2xl mx-auto uppercase tracking-widest leading-loose font-medium"
        >
          A curated collection of digital garment simulations, showcasing realistic movement, 
          texture, and drape in 3D environments.
        </motion.p>
      </div>

      {/* Cinematic Grid */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-10 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1">
          <AnimatePresence mode="wait">
            {currentIds.map((id) => (
              <FashionCard key={`${currentPage}-${id}`} id={id} />
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

      {/* Footer Info */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-10 py-20 text-center border-t border-white/5">
        <p className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.3em]">
          Texongo 3D Studio &copy; 2026 • All Rights Reserved
        </p>
      </section>
    </main>
  );
}
