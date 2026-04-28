"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { X } from "lucide-react";

const ITEMS_PER_PAGE = 12;
const VIDEO_COUNT = 35;
const LOAD_TIMEOUT = 10000; // Increased to 10 seconds

function FashionCard({ id, onClick }: { id: number; onClick: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Reset state when id changes
    setIsLoaded(false);
    setHasError(false);

    const timer = setTimeout(() => {
      if (!isLoaded) {
        console.warn(`Video fashion/${id} timed out loading.`);
        setHasError(true);
      }
    }, LOAD_TIMEOUT);

    return () => clearTimeout(timer);
  }, [id, isLoaded]); // Use isLoaded in dependency to check if it's still false

  const handleMouseEnter = () => {
    if (videoRef.current && isLoaded) {
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

  if (hasError) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
      className="relative aspect-[3/4] bg-zinc-900 overflow-hidden group cursor-pointer border border-white/5"
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <video
        ref={videoRef}
        src={`/digital-fashion-fixed/${id}.mp4`}
        muted
        loop
        playsInline
        preload="metadata"
        onLoadedData={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      />
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-zinc-900">
          <div className="w-4 h-4 border border-white/10 border-t-white/40 rounded-full animate-spin" />
        </div>
      )}
    </motion.div>
  );
}

export default function DigitalFashionPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  
  const totalPages = Math.ceil(VIDEO_COUNT / ITEMS_PER_PAGE);
  
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentIds = Array.from(
    { length: Math.min(ITEMS_PER_PAGE, VIDEO_COUNT - startIndex) }, 
    (_, i) => startIndex + i + 1
  );

  // Close modal on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedVideo(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

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
          <AnimatePresence mode="popLayout">
            {currentIds.map((id) => (
              <FashionCard 
                key={`${currentPage}-${id}`} 
                id={id} 
                onClick={() => setSelectedVideo(`/digital-fashion-fixed/${id}.mp4`)}
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

      {/* Lightbox / Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 md:p-10"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl w-full aspect-video bg-zinc-900 rounded-lg overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <video
                src={selectedVideo}
                autoPlay
                controls
                loop
                playsInline
                className="w-full h-full object-contain"
              />
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black text-white rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer Info */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-10 py-20 text-center border-t border-white/5">
        <p className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.3em]">
          Texongo 3D Studio &copy; 2026 • All Rights Reserved
        </p>
      </section>
    </main>
  );
}
