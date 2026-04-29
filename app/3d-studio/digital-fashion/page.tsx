"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { X, Download, Loader2, ArrowRight } from "lucide-react";

const ITEMS_PER_PAGE = 12;

// These are the names extracted from the "digital fashion" folder for descriptive labels
const FASHION_NAMES = [
  "FAB 1 DES 1A", "FAB 10 DES 10A", "FAB 11 DES 11A", "FAB 12 DES 12A", "FAB 13 DES 13A",
  "FAB 14 DES 14B", "FAB 15 DES 15A", "FAB 16 DES 16A", "FAB 17 DES 17A", "FAB 18 DES 18A",
  "FAB 19 DES19A", "FAB 2 DES 2A", "FAB 20 DES 20A", "FAB 21 DES 21A", "FAB 22 DES 10B",
  "FAB 23 DES 16A", "FAB 24 DES 2B", "FAB 25 DES 8C", "FAB 26 DES 15B", "FAB 27 DES 2C",
  "FAB 28  DES 9C", "FAB 29 DES 21A", "FAB 3 DES 3A", "FAB 30 DES 10A", "FAB 30 DES 20B",
  "FAB 31 DES 15C", "FAB 32 DES 11C", "FAB 32 DES 15C", "FAB 33 DES 20A", "FAB 34 DES 5C",
  "FAB 35 DES 15B", "FAB 36 DES 2A", "FAB 37 DES 17A", "FAB 38 DES 2C", "FAB 39 DES 16C",
  "FAB 4 DES 4A", "FAB 40 DES 18B", "FAB 41 DES 9B", "FAB 42 DES 7C", "FAB 43 DES 7A",
  "FAB 44 DES 12C", "FAB 44 DES 8A", "FAB 45 DES 11A", "FAB 46 DES 3B", "FAB 47 DES 13A",
  "FAB 48 DES 2A", "FAB 49 DES 17C", "FAB 5 DES 5A", "FAB 50 DES 5C", "FAB 51 DES 2A",
  "FAB 52 DES 1B", "FAB 53 DES 2A", "FAB 54 DES 2A", "FAB 55 DES 2A", "FAB 56 DES 2C",
  "FAB 57 DES 2B", "FAB 58 DES 12C", "FAB 59 DES 15B", "FAB 6 DES 6A", "FAB 60 DES 8B",
  "FAB 61 DES 10A", "FAB 62 DES 10B", "FAB 63 DES 3A", "FAB 64 DES 18B", "FAB 65 DES 10C",
  "FAB 66 DES 11C", "FAB 67 DES 2C", "FAB 68 DES 10B", "FAB 69 DES 12B", "FAB 7 DES 7A",
  "FAB 70 DES 8B", "FAB 71 DES 9C", "FAB 72 DES 20A", "FAB 73 DES 5B", "FAB 74 DES 2C",
  "FAB 75 DES 9C", "FAB 76 DES 11B", "FAB 76 DES 21B", "FAB 77 DES 8C", "FAB 78 DES 1B",
  "FAB 79 DES 12A", "FAB 8 DES 8A", "FAB 80 DES 2B", "FAB 81 DES 19C", "FAB 82 DES 17C",
  "FAB 83 DES 8B", "FAB 84 DES 15B", "FAB 85 DES 20C", "FAB 86 DES 21C", "FAB 87 DES 2C",
  "FAB 88 DES 10A", "FAB 88 DES 20C", "FAB 89 DES 10B", "FAB 9 DES 9A", "FAB 90 DES 7C",
  "FAB 90 DES 8C", "FAB 91 DES 13A"
];

// The "fixed" folder contains 35 optimized videos named 1.mp4 through 35.mp4
const VIDEO_COUNT = 97;

function FashionCard({ id, onClick }: { id: number; onClick: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);

  const name = FASHION_NAMES[id - 1] || `Fashion Preview #${id}`;
  const videoSrc = `/digital-fashion-fixed/${id}.mp4`;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.05, rootMargin: "200px" }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [id]);

  const handleMouseEnter = () => {
    if (videoRef.current && isLoaded) {
      videoRef.current.play().catch(err => console.log("Playback error:", err));
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    const link = document.createElement('a');
    link.href = videoSrc;
    link.download = `texongo-${name.toLowerCase().replace(/\s+/g, '-')}.mp4`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative aspect-[4/5] bg-white overflow-hidden group cursor-pointer border border-black/5"
    >
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#F9FAFB]">
          <Loader2 className="w-5 h-5 text-zinc-200 animate-spin" />
        </div>
      )}

      {isInView && (
        <video
          ref={videoRef}
          src={videoSrc}
          muted
          loop
          playsInline
          preload="metadata"
          onLoadedData={() => setIsLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
      )}

      {/* Overlay Actions */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300">
        {/* Top Left Badge */}
        <div className="absolute top-4 left-4 pointer-events-none transform -translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <div className="bg-black text-white px-2.5 py-1 rounded-[2px] text-[9px] font-black uppercase tracking-widest">
            {name}
          </div>
        </div>

        <button
          onClick={handleDownload}
          className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-md rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white translate-y-2 group-hover:translate-y-0"
          title="Download Simulation"
        >
          <Download size={16} className="text-black" />
        </button>
      </div>
    </motion.div>
  );
}

export default function DigitalFashionPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedVideo, setSelectedVideo] = useState<{ src: string, name: string } | null>(null);

  const totalPages = Math.ceil(VIDEO_COUNT / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentIds = Array.from(
    { length: Math.min(ITEMS_PER_PAGE, VIDEO_COUNT - startIndex) },
    (_, i) => startIndex + i + 1
  );

  const handleModalDownload = () => {
    if (!selectedVideo) return;
    const link = document.createElement('a');
    link.href = selectedVideo.src;
    link.download = `texongo-${selectedVideo.name.toLowerCase().replace(/\s+/g, '-')}.mp4`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className="min-h-screen bg-[#F9FAFB] text-[#111111] pt-24 lg:pt-32">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-20 text-center border-b border-black/5">
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
          className="text-[#475467] text-[10px] md:text-xs max-w-2xl mx-auto uppercase tracking-[0.3em] leading-relaxed font-bold"
        >
          Cinematic 3D garment simulations showcasing hyper-realistic movement,
          texture, and fluid digital drape.
        </motion.p>
      </div>

      <section className="max-w-[1440px] mx-auto px-6 lg:px-10 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1">
          <AnimatePresence mode="popLayout">
            {currentIds.map((id) => (
              <FashionCard
                key={id}
                id={id}
                onClick={() => setSelectedVideo({
                  src: `/digital-fashion-fixed/${id}.mp4`,
                  name: FASHION_NAMES[id - 1] || `Fashion #${id}`
                })}
              />
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-16 flex items-center justify-center gap-4 flex-wrap">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => {
                setCurrentPage(page);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`w-10 h-10 flex items-center justify-center text-[10px] font-black uppercase tracking-widest border transition-all ${currentPage === page
                ? "bg-black text-white border-black"
                : "bg-transparent text-black/40 border-black/10 hover:border-black/40 hover:text-black"
                }`}
            >
              {page}
            </button>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-white/95 backdrop-blur-md p-4 md:p-10"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl w-full aspect-video bg-black rounded-lg overflow-hidden shadow-2xl border border-black/5 flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative flex-1 bg-[#F9FAFB] flex items-center justify-center overflow-hidden">
                <video
                  src={selectedVideo.src}
                  autoPlay
                  controls
                  loop
                  playsInline
                  className="w-full h-full object-contain bg-black"
                />

                {/* Lightbox Badge Overlay */}
                <div className="absolute top-6 left-6 pointer-events-none z-10">
                  <div className="bg-black text-white px-3 py-1.5 rounded-[2px] text-[10px] font-black uppercase tracking-[0.2em] shadow-lg">
                    {selectedVideo.name}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-4 right-4 z-10 p-2 text-white/40 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="max-w-[1440px] mx-auto px-6 lg:px-10 py-20 text-center border-t border-black/5">
        <p className="text-[#475467] text-[10px] font-black uppercase tracking-[0.3em]">
          Texongo 3D Studio &copy; 2026 • All Rights Reserved
        </p>
      </section>
    </main>
  );
}
