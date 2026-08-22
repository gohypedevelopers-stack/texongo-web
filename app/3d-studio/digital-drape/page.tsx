"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { WatermarkOverlay, VideoBadge } from "@/components/ui/watermark";
import { PageHero } from "@/components/ui/page-hero";

const DEFAULT_ITEMS_PER_PAGE = 12;

import { getFabricData } from "@/lib/3d-fabric-mapping";

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

function DrapeCard({ id, isMobileOrTablet }: { id: number; isMobileOrTablet: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [isError, setIsError] = useState(false);

  const rawName = DRAPE_NAMES[id - 1] || `FAB ${id} DES 1A`;
  const fabricData = getFabricData(rawName);

  const [videoSrc, setVideoSrc] = useState("");

  useEffect(() => {
    setVideoSrc(`/digital-drape-fixed/${id}.mp4`);
  }, [id]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setHasIntersected(true);
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.05, rootMargin: "100px" }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [id]);

  useEffect(() => {
    if (isMobileOrTablet && isLoaded && videoRef.current) {
      if (isInView) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [isMobileOrTablet, isLoaded, isInView]);

  const handleMouseEnter = () => { if (!isMobileOrTablet && videoRef.current && isLoaded) videoRef.current.play().catch(() => { }); };
  const handleMouseLeave = () => { if (!isMobileOrTablet && videoRef.current) { videoRef.current.pause(); videoRef.current.currentTime = 0; } };

  const handleError = () => {
    const idPath = `/digital-drape-fixed/${id}.mp4`;
    if (videoSrc !== idPath) {
      setVideoSrc(idPath);
    } else {
      setIsError(true);
    }
  };

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
      className="relative aspect-[3/4] bg-white overflow-hidden group cursor-pointer border border-black/5 block"
    >
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full h-full relative"
      >
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#F9FAFB]">
            <Loader2 className="w-5 h-5 text-zinc-200 animate-spin" />
          </div>
        )}

        {hasIntersected && (
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

        <div className={`absolute inset-0 pointer-events-none z-[50] overflow-hidden transition-opacity duration-300 ${showWatermark ? 'opacity-100' : 'opacity-0'}`}>
          <WatermarkOverlay />
        </div>

        <VideoBadge />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-100 transition-all duration-500">
          {/* Bottom Left Label - Premium Editorial Style */}
          <div className="absolute bottom-0 left-0 p-5 w-full pointer-events-none z-10">
            <div className="flex flex-col gap-1.5 items-start">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                className="h-[1px] w-12 bg-white/60 origin-left"
              />
              <div className="flex flex-col">
                <span className="text-[11px] font-black uppercase tracking-[0.25em] text-white leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                  {fabricData.name}
                </span>
                <span className="text-[9px] font-medium uppercase tracking-[0.3em] text-white/70 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)] mt-0.5">
                  {fabricData.sku}
                </span>
                <span className="text-[8px] font-medium uppercase tracking-[0.2em] text-white/50 mt-1">
                  [{rawName}]
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

export default function DigitalDrapePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE);

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 1024;
      setIsMobileOrTablet(isMobile);
      setItemsPerPage(isMobile ? 6 : 12);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [selectedVideo, setSelectedVideo] = useState<{
    src: string;
    name: string;
    fabric?: string;
    sku?: string;
  } | null>(null);

  const totalPages = Math.ceil(VIDEO_COUNT / itemsPerPage);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentIds = Array.from(
    { length: Math.min(itemsPerPage, VIDEO_COUNT - startIndex) },
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
    const fileName = selectedVideo.fabric
      ? `${selectedVideo.fabric.toLowerCase().replace(/\s+/g, '-')}-${selectedVideo.sku?.toLowerCase()}`
      : selectedVideo.name.toLowerCase().replace(/\s+/g, '-');
    link.download = `texongo-${fileName}.mp4`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className="min-h-screen bg-white text-[#111111]">
      <PageHero subtitle="3D Studio" mainTitle="Digital" accentTitle="Drape" />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 text-center mt-2">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-[#475467]/60 text-[10px] md:text-xs uppercase tracking-[0.3em] max-w-2xl mx-auto font-bold leading-relaxed"
        >
          Digital Drape, Real-World Sourcing. Explore hyper-realistic 3D simulations of fabrics you can buy and use today.
        </motion.p>
      </div>

      <section className="max-w-[1440px] mx-auto px-6 lg:px-10 pb-24 mt-12">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
          <AnimatePresence mode="popLayout">
            {currentIds.map((id) => (
              <DrapeCard
                key={`${currentPage}-${id}`}
                id={id}
                isMobileOrTablet={isMobileOrTablet}
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


    </main>
  );
}
