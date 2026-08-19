"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { WatermarkOverlay, VideoBadge } from "@/components/ui/watermark";
import { PageHero } from "@/components/ui/page-hero";

const ITEMS_PER_PAGE = 12;

// Deduplicated unique filenames from the public/digital-fashion-fixed folder
const FASHION_FILES = [
  "1.mp4", "10.mp4", "11.mp4", "12.mp4", "13.mp4", "14.mp4", "15.mp4", "16.mp4", "17.mp4",
  "18.mp4", "19.mp4", "2.mp4", "20.mp4", "21.mp4", "22.mp4", "23.mp4", "24.mp4", "25.mp4",
  "26.mp4", "27.mp4", "28.mp4", "29.mp4", "3.mp4", "30.mp4", "31.mp4", "32.mp4", "33.mp4",
  "34.mp4", "4.mp4", "5.mp4", "6.mp4", "7.mp4", "8.mp4", "9.mp4", "FAB 10 DES 10A.mp4",
  "FAB 11 DES 11A.mp4", "FAB 12 DES 12A.mp4", "FAB 13 DES 13A.mp4", "FAB 14 DES 14B.mp4",
  "FAB 15 DES 15A.mp4", "FAB 16 DES 16A.mp4", "FAB 17 DES 17A.mp4", "FAB 18 DES 18A.mp4",
  "FAB 19 DES19A.mp4", "FAB 2 DES 2A.mp4", "FAB 20 DES 20A.mp4", "FAB 21 DES 21A.mp4",
  "FAB 22 DES 10B.mp4", "FAB 23 DES 16A.mp4", "FAB 24 DES 2B.mp4", "FAB 25 DES 8C.mp4",
  "FAB 26 DES 15B.mp4", "FAB 27 DES 2C.mp4", "FAB 28  DES 9C.mp4", "FAB 29 DES 21A.mp4",
  "FAB 3 DES 3A.mp4", "FAB 30 DES 10A.mp4", "FAB 30 DES 20B.mp4", "FAB 31 DES 15C.mp4",
  "FAB 32 DES 11C.mp4", "FAB 32 DES 15C.mp4", "FAB 33 DES 20A.mp4", "FAB 34 DES 5C.mp4",
  "FAB 35 DES 15B.mp4", "FAB 36 DES 2A.mp4", "FAB 37 DES 17A.mp4", "FAB 38 DES 2C.mp4",
  "FAB 39 DES 16C.mp4", "FAB 4 DES 4A.mp4", "FAB 40 DES 18B.mp4", "FAB 41 DES 9B.mp4",
  "FAB 42 DES 7C.mp4", "FAB 43 DES 7A.mp4", "FAB 44 DES 12C.mp4", "FAB 44 DES 8A.mp4",
  "FAB 45 DES 11A.mp4", "FAB 46 DES 3B.mp4", "FAB 47 DES 13A.mp4", "FAB 48 DES 2A.mp4",
  "FAB 49 DES 17C.mp4", "FAB 5 DES 5A.mp4", "FAB 50 DES 5C.mp4", "FAB 51 DES 2A.mp4",
  "FAB 52 DES 1B.mp4", "FAB 53 DES 2A.mp4", "FAB 54 DES 2A.mp4", "FAB 55 DES 2A.mp4",
  "FAB 56 DES 2C.mp4", "FAB 57 DES 2B.mp4", "FAB 58 DES 12C.mp4", "FAB 59 DES 15B.mp4",
  "FAB 6 DES 6A.mp4", "FAB 60 DES 8B.mp4", "FAB 61 DES 10A.mp4", "FAB 62 DES 10B.mp4",
  "FAB 63 DES 3A.mp4", "FAB 64 DES 18B.mp4", "FAB 65 DES 10C.mp4", "FAB 66 DES 11C.mp4",
  "FAB 67 DES 2C.mp4", "FAB 68 DES 10B.mp4", "FAB 69 DES 12B.mp4", "FAB 7 DES 7A.mp4",
  "FAB 70 DES 8B.mp4", "FAB 71 DES 9C.mp4", "FAB 72 DES 20A.mp4", "FAB 73 DES 5B.mp4",
  "FAB 74 DES 2C.mp4", "FAB 75 DES 9C.mp4", "FAB 76 DES 11B.mp4", "FAB 76 DES 21B.mp4",
  "FAB 77 DES 8C.mp4", "FAB 78 DES 1B.mp4", "FAB 79 DES 12A.mp4", "FAB 8 DES 8A.mp4",
  "FAB 80 DES 2B.mp4", "FAB 81 DES 19C.mp4", "FAB 82 DES 17C.mp4", "FAB 83 DES 8B.mp4",
  "FAB 84 DES 15B.mp4", "FAB 85 DES 20C.mp4", "FAB 86 DES 21C.mp4", "FAB 87 DES 2C.mp4",
  "FAB 88 DES 10A.mp4", "FAB 88 DES 20C.mp4", "FAB 89 DES 10B.mp4", "FAB 9 DES 9A.mp4",
  "FAB 90 DES 7C.mp4", "FAB 90 DES 8C.mp4", "FAB 91 DES 13A.mp4"
];

import { getFabricData } from "@/lib/3d-fabric-mapping";

function FashionCard({ fileName }: { fileName: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [isError, setIsError] = useState(false);

  const videoSrc = `/digital-fashion-fixed/${fileName}`;
  const fabricData = getFabricData(fileName);

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
  }, [fileName]);


  const handleMouseEnter = () => { if (videoRef.current && isLoaded) videoRef.current.play().catch(() => { }); };
  const handleMouseLeave = () => { if (videoRef.current) { videoRef.current.pause(); } };

  const [showWatermark, setShowWatermark] = useState(false);

  const handleContextMenu = (e: React.MouseEvent) => {
    setShowWatermark(true);
    setTimeout(() => setShowWatermark(false), 2000);
  };

  if (isError) return null;

  return (
    <Link
      href={`/fabrics?category=${encodeURIComponent(fabricData.name.toLowerCase().replace(/\s+/g, '-'))}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onContextMenu={handleContextMenu}
      className="relative aspect-[4/5] bg-white overflow-hidden group cursor-pointer border border-black/5 block"
    >
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="w-full h-full relative"
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
            onError={() => setIsError(true)}
            className={`w-full h-full object-cover transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          />
        )}

        <div className={`absolute inset-0 pointer-events-none z-[50] overflow-hidden transition-opacity duration-300 ${showWatermark ? 'opacity-100' : 'opacity-0'}`}>
          <WatermarkOverlay />
        </div>

        <VideoBadge />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-100 transition-all duration-500">
          <div className="absolute bottom-0 left-0 p-5 w-full pointer-events-none z-10">
            <div className="flex flex-col gap-1.5 items-start">
              <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} className="h-[1px] w-12 bg-white/60 origin-left" />
              <div className="flex flex-col">
                <span className="text-[11px] font-black uppercase tracking-[0.25em] text-white leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                  {fabricData.name}
                </span>
                <span className="text-[9px] font-medium uppercase tracking-[0.3em] text-white/70 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)] mt-0.5">
                  {fabricData.sku}
                </span>
                <span className="text-[8px] font-medium uppercase tracking-[0.2em] text-white/50 mt-1">
                  [{fileName.replace('.mp4', '')}]
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

export default function DigitalFashionPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(FASHION_FILES.length / ITEMS_PER_PAGE);
  const currentFiles = FASHION_FILES.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <main className="min-h-screen bg-white">
      <PageHero subtitle="3D Studio" mainTitle="Digital" accentTitle="Fashion" />
      
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 text-center mt-2">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-[#475467]/60 text-[10px] md:text-xs uppercase tracking-[0.3em] max-w-2xl mx-auto font-bold leading-relaxed"
        >
          The Future of Fashion, Digitized. High-fidelity 3D simulations of fabrics available in our inventory
        </motion.p>
      </div>

      <section className="max-w-[1440px] mx-auto px-6 lg:px-10 pb-24 mt-12">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
          <AnimatePresence mode="popLayout">
            {currentFiles.map((fileName) => (
              <FashionCard
                key={`${currentPage}-${fileName}`}
                fileName={fileName}
              />
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-16 flex items-center justify-center gap-2 md:gap-4 flex-wrap">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => {
                setCurrentPage(page);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`w-8 h-8 md:w-10 md:h-10 flex items-center justify-center text-[10px] font-black uppercase tracking-widest border transition-all ${currentPage === page
                ? "bg-black text-white border-black"
                : "bg-transparent text-black/40 border-black/10 hover:border-black/40 hover:text-black"
                }`}
            >
              {page}
            </button>
          ))}
        </div>
      </section>



      <section className="max-w-[1440px] mx-auto px-6 lg:px-10 py-20 text-center border-t border-black/5">
        <p className="text-[#475467] text-[10px] font-black uppercase tracking-[0.3em]">
          Texongo 3D Studio &copy; 2026 • All Rights Reserved
        </p>
      </section>
    </main>
  );
}
