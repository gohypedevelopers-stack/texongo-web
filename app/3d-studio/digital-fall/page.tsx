"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { X, Download, Loader2, ArrowRight } from "lucide-react";

const ITEMS_PER_PAGE = 12;
const VIDEO_COUNT = 91;

function FallCard({ videoSrc, id, onClick }: { videoSrc: string; id: number; onClick: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);

  const name = `Fall Analysis #${id}`;

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

  useEffect(() => {
    setIsLoaded(false);
    setHasError(false);
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
    link.download = `texongo-fall-${id}.mp4`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (hasError) return null;

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative aspect-[3/4] bg-white overflow-hidden group cursor-pointer border border-black/5"
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
          onError={() => setHasError(true)}
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

export default function DigitalFallPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedVideo, setSelectedVideo] = useState<{src: string, id: number} | null>(null);

  const totalPages = Math.ceil(VIDEO_COUNT / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentIds = Array.from(
    { length: Math.min(ITEMS_PER_PAGE, VIDEO_COUNT - startIndex) },
    (_, i) => startIndex + i + 1
  );

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedVideo(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const selectedName = selectedVideo ? `Fall Analysis #${selectedVideo.id}` : "";

  return (
    <main className="min-h-screen bg-[#F9FAFB] text-[#111111] pt-24 lg:pt-32">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-16 text-center">
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
          Digital Fall
        </motion.h1>
        <p className="text-[#475467]/60 text-[10px] md:text-xs uppercase tracking-[0.3em] max-w-2xl mx-auto font-bold leading-relaxed">
          Precise 3D simulations of vertical drape and structural fabric weight.
        </p>
      </div>

      <section className="max-w-[1440px] mx-auto px-6 lg:px-10 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
          <AnimatePresence mode="popLayout">
            {currentIds.map((id) => (
              <FallCard
                key={`${currentPage}-${id}`}
                id={id}
                videoSrc={`/digital-fall-fixed/${id}.mp4`}
                onClick={() => setSelectedVideo({ src: `/digital-fall-fixed/${id}.mp4`, id })}
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
                    {selectedName}
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
    </main>
  );
}
