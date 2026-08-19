"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { WatermarkOverlay, VideoBadge } from "@/components/ui/watermark";
import { PageHero } from "@/components/ui/page-hero";

const ITEMS_PER_PAGE = 12;

import { getFabricData } from "@/lib/3d-fabric-mapping";

const VIDEO_COUNT = 91;

function FallCard({ id }: { id: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [isError, setIsError] = useState(false);

  const fabricData = getFabricData(id.toString());
  const [videoSrc, setVideoSrc] = useState("");

  useEffect(() => {
    setVideoSrc(`/digital-fall-fixed/${id}.mp4`);
  }, [id]);

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

  const handleMouseEnter = () => { if (videoRef.current && isLoaded) videoRef.current.play().catch(() => { }); };
  const handleMouseLeave = () => { if (videoRef.current) { videoRef.current.pause(); videoRef.current.currentTime = 0; } };

  const handleError = () => {
    setIsError(true);
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
                  [FAB {id}]
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

export default function DigitalFallPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedVideo, setSelectedVideo] = useState<{
    src: string;
    name: string;
    fabric?: string;
    sku?: string;
  } | null>(null);

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
      <PageHero subtitle="3D Studio" mainTitle="Digital" accentTitle="Fall" />
      
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 text-center mt-2">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-[#475467]/60 text-[10px] md:text-xs uppercase tracking-[0.3em] max-w-2xl mx-auto font-bold leading-relaxed"
        >
          See How It Falls, Know How It Feels. High-fidelity 3D simulations of fabrics available in our inventory
        </motion.p>
      </div>

      <section className="max-w-[1440px] mx-auto px-6 lg:px-10 pb-24 mt-12">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
          <AnimatePresence mode="popLayout">
            {currentIds.map((id) => (
              <FallCard
                key={`${currentPage}-${id}`}
                id={id}
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
