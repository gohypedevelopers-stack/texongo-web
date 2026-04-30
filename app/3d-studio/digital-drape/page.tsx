"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { X, Download, Loader2, ArrowRight } from "lucide-react";

const ITEMS_PER_PAGE = 12;

const DRAPE_NAMES = [
  "FAB 1 DES 1C", "FAB 10 DES 10B", "FAB 11 DES 11C", "FAB 12 DES 12B", "FAB 13 DES 13A",
  "FAB 14 DES 18C", "FAB 15 DES 21C", "FAB 16 DES 16A", "FAB 17 DES 17A", "FAB 18 DES 18B",
  "FAB 19 DES 19A", "FAB 19 DES 19C", "FAB 2 DES 2B", "FAB 2 DES 2C", "FAB 20 DES 15B",
  "FAB 21 DES 21B", "FAB 21 DES 4B", "FAB 22 DES 21C", "FAB 23 DES 16A", "FAB 24 DES 2C",
  "FAB 26 FAB 2A", "FAB 27 FAB 2C", "FAB 28 DES 9C", "FAB 29 DES 7A", "FAB 3 DES 3A",
  "FAB 30 DES 1A", "FAB 31 DES 11C", "FAB 32 DES 1B", "FAB 33 DES 2A", "FAB 34 DES 14C",
  "FAB 35 DES 2A", "FAB 36 DES 9C", "FAB 37 DES 15B", "FAB 38 DES 2A", "FAB 39 DES 16C",
  "FAB 4 DES 4A", "FAB 40 DES 18A", "FAB 41 DES 18A", "FAB 42 DES 13B", "FAB 43 DES 7B",
  "FAB 44 DES 12C", "FAB 45 DES 14C", "FAB 46 DES 6B", "FAB 47 DES 13A", "FAB 48 DES 2A",
  "FAB 49 DES 15B", "FAB 5 DES 5C", "FAB 50 DES 12A", "FAB 51 DES 2C", "FAB 52 DES 13A",
  "FAB 53 DES 10B", "FAB 54 DES 10B", "FAB 55 DES 2A", "FAB 56 DES 15B", "FAB 57 DES 2A",
  "FAB 58 DES 12C", "FAB 59 DES 19B", "FAB 6 DES 6A", "FAB 60 DES 8B", "FAB 61 DES 3A",
  "FAB 62 DES 21A", "FAB 63 DES 13A", "FAB 64 DES 5B", "FAB 65 DES 14A", "FAB 66 DES 6C",
  "FAB 67 DES 8B", "FAB 68 DES 2A", "FAB 69 DES 17B", "FAB 7 DES 7C", "FAB 70 DES 2A",
  "FAB 71 DES 9C", "FAB 72 DES 20A", "FAB 73 DES 9B", "FAB 74 DES 17C", "FAB 75 DES 17A",
  "FAB 76 DES 15A", "FAB 77 DES 4C", "FAB 78 DES 3B", "FAB 79 DES 3C", "FAB 8 DES 8B",
  "FAB 80 DES 17A", "FAB 81 DES 13C", "FAB 82 DES 17C", "FAB 83 DES 13C", "FAB 84 DES 17C",
  "FAB 85 DES 21C", "FAB 86 DES 11A", "FAB 87 DES 13C", "FAB 88 DES 10C", "FAB 89 DES 16B",
  "FAB 9 DES 9A", "FAB 90 DES 15A", "FAB 91 DES 18B"
];
const VIDEO_COUNT = DRAPE_NAMES.length;

function DrapeCard({ id, onClick }: { id: number; onClick: (src: string, name: string) => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [isError, setIsError] = useState(false);

  const name = DRAPE_NAMES[id - 1] || `Drape #${id}`;
  const [videoSrc, setVideoSrc] = useState("");

  useEffect(() => {
    setVideoSrc(`/digital-drape-fixed/${name}.mp4`);
  }, [id, name]);

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
      videoRef.current.currentTime = 0;
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

  const handleError = () => {
    const idPath = `/digital-drape-fixed/${id}.mp4`;
    if (videoSrc !== idPath) {
      setVideoSrc(idPath);
    } else {
      setIsError(true);
    }
  };

  if (isError) return null;

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      onClick={() => onClick(videoSrc, name)}
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
          onError={handleError}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
      )}

      {/* Overlay Actions */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300">
        {/* Top Left Badge */}
        <div className="absolute top-4 left-4 pointer-events-none z-10">
          <div className="bg-black text-white px-2.5 py-1 rounded-[2px] text-[9px] font-black uppercase tracking-widest shadow-lg">
            {name}
          </div>
        </div>

        <button
          onClick={handleDownload}
          className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-md rounded-full shadow-lg transition-all duration-300 hover:bg-white z-10"
          title="Download Simulation"
        >
          <Download size={16} className="text-black" />
        </button>
      </div>
    </motion.div>
  );
}

export default function DigitalDrapePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedVideo, setSelectedVideo] = useState<{ src: string, name: string } | null>(null);

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
          Digital Drape
        </motion.h1>
        <p className="text-[#475467]/60 text-[10px] md:text-xs uppercase tracking-[0.3em] max-w-2xl mx-auto font-bold leading-relaxed">
          Digital Drape, Real-World Sourcing. Explore hyper-realistic 3D simulations of fabrics you can buy and use today.
        </p>
      </div>

      <section className="max-w-[1440px] mx-auto px-6 lg:px-10 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
          <AnimatePresence mode="popLayout">
            {currentIds.map((id) => (
              <DrapeCard
                key={`${currentPage}-${id}`}
                id={id}
                onClick={(src, name) => setSelectedVideo({ src, name })}
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
    </main>
  );
}
