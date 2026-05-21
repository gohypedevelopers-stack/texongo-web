"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { X, Loader2, ArrowRight } from "lucide-react";
import { WatermarkOverlay, VideoBadge } from "@/components/ui/watermark";
import { PageHero } from "@/components/ui/page-hero";

const ITEMS_PER_PAGE = 12;

const FABRIC_INFO: Record<string, { name: string; sku: string }> = {
  "FAB 1": { name: "Corduroy", sku: "SCH5040" },
  "FAB 2": { name: "Pin Stripe", sku: "SCH5021" },
  "FAB 3": { name: "2 x 2 Rib", sku: "SCH5046" },
  "FAB 4": { name: "1 x 1 Rib", sku: "SCH6047" },
  "FAB 5": { name: "Single Jersey", sku: "SCH5844" },
  "FAB 6": { name: "Jacquard Terry", sku: "SCH6054" },
  "FAB 7": { name: "Slub Single Jersey", sku: "SCH6055" },
  "FAB 8": { name: "Ponte", sku: "SCH6056" },
  "FAB 9": { name: "Popcorn", sku: "SCH6046" },
  "FAB 10": { name: "Nylon Lycra", sku: "SCH6057" },
  "FAB 11": { name: "Terry", sku: "SCH6040" },
  "FAB 12": { name: "Single Jersey Melange Neps", sku: "SCH5417" },
  "FAB 13": { name: "GreyHeather Terry Melange", sku: "SCH5687" },
  "FAB 14": { name: "Polyester Spandex", sku: "SCH5812" },
  "FAB 15": { name: "Shiffly", sku: "SCH5796" },
  "FAB 16": { name: "Single Jersey Slub", sku: "SCH6080" },
  "FAB 17": { name: "Single Jersey Injected Slub", sku: "SCH5109" },
  "FAB 18": { name: "Single Jersey Yarn Dyed", sku: "SCH6021" },
  "FAB 19": { name: "French Terry", sku: "SCH5108" },
  "FAB 20": { name: "Terry Injected Slub", sku: "SCH6065" },
  "FAB 21": { name: "Pique", sku: "SCH6048" },
  "FAB 22": { name: "Cotton Modal", sku: "SCH6066" },
  "FAB 23": { name: "Jacquard Single Jersey", sku: "SCH6067" },
  "FAB 24": { name: "3 thread Fleece", sku: "SCH6068" },
  "FAB 25": { name: "Camouflage", sku: "SCH6069" },
  "FAB 26": { name: "Single Jersey Lurex", sku: "SCH6070" },
  "FAB 27": { name: "Waffle Jacquard", sku: "SCH5091" },
  "FAB 28": { name: "Polyester Cotton Spandex", sku: "SCH6071" },
  "FAB 29": { name: "Sweater Knit Terry", sku: "SCH6058" },
  "FAB 30": { name: "Mercerised Interlock Yarn Dyed", sku: "SCH6059" },
  "FAB 31": { name: "Viscose Bamboo Lycra", sku: "SCH5100" },
  "FAB 32": { name: "Single Jersey Neps", sku: "SCH6060" },
  "FAB 33": { name: "Stretch Jersey", sku: "SCH6061" },
  "FAB 34": { name: "Micro Modal", sku: "SCH6062" },
  "FAB 35": { name: "Tencel Jersey", sku: "SCH6063" },
  "FAB 36": { name: "Organic Cotton", sku: "SCH6064" },
  "FAB 37": { name: "Bamboo Jersey", sku: "SCH5811" },
  "FAB 38": { name: "Recycled Polyester", sku: "SCH6072" },
  "FAB 39": { name: "Hemp Blend", sku: "SCH6073" },
  "FAB 40": { name: "Linen Jersey", sku: "SCH6074" },
  "FAB 41": { name: "Silk Touch Jersey", sku: "SCH6075" },
  "FAB 42": { name: "Modal Spandex", sku: "SCH6044" },
  "FAB 43": { name: "Double Knit", sku: "SCH5121" },
  "FAB 44": { name: "Heavy Interlock", sku: "SCH6045" },
  "FAB 45": { name: "Lightweight Jersey", sku: "SCH6076" },
  "FAB 46": { name: "Pointelle Knit", sku: "SCH6077" },
  "FAB 47": { name: "Pointelle Rib", sku: "SCH6078" },
  "FAB 48": { name: "French Rib", sku: "SCH6079" },
  "FAB 49": { name: "Ottoman Knit", sku: "SCH6083" },
  "FAB 50": { name: "Milano Knit", sku: "SCH5805" },
  "FAB 51": { name: "Scuba Fabric", sku: "SCH6084" },
  "FAB 52": { name: "Techno Crepe", sku: "SCH6085" },
  "FAB 53": { name: "Bubble Crepe", sku: "SCH5058" },
  "FAB 54": { name: "Liverpool Knit", sku: "SCH5780" },
  "FAB 55": { name: "Bullet Knit", sku: "SCH6086" },
  "FAB 56": { name: "Venice Knit", sku: "SCH6087" },
  "FAB 57": { name: "DTY Brushed", sku: "SCH6088" },
  "FAB 58": { name: "ITY Jersey", sku: "SCH6089" },
  "FAB 59": { name: "Slinky Jersey", sku: "SCH6090" },
  "FAB 60": { name: "Power Mesh", sku: "SCH6091" },
  "FAB 61": { name: "Nylon Mesh", sku: "SCH5059" },
  "FAB 62": { name: "Eyelet Fabric", sku: "SCH5032" },
  "FAB 63": { name: "Birdseye Mesh", sku: "SCH5771" },
  "FAB 64": { name: "Athletic Mesh", sku: "SCH6042" },
  "FAB 65": { name: "Space Dye Jersey", sku: "SCH6043" },
  "FAB 66": { name: "Space Dye Terry", sku: "SCH5003" },
  "FAB 67": { name: "Melange Rib", sku: "SCH6083" },
  "FAB 68": { name: "Heathered Knit", sku: "SCH5805" },
  "FAB 69": { name: "Marled Jersey", sku: "SCH6084" },
  "FAB 70": { name: "Striped Jersey", sku: "SCH6085" },
  "FAB 71": { name: "Striped Rib", sku: "SCH6086" },
  "FAB 72": { name: "Variegated Rib", sku: "SCH6087" },
  "FAB 73": { name: "Waffle Knit", sku: "SCH6088" },
  "FAB 74": { name: "Thermal Knit", sku: "SCH6091" },
  "FAB 75": { name: "Velour", sku: "SCH6043" },
  "FAB 76": { name: "Crushed Velvet", sku: "SCH5003" },
  "FAB 77": { name: "Stretch Velvet", sku: "SCH6083" },
  "FAB 78": { name: "Chenille Knit", sku: "SCH5805" },
  "FAB 79": { name: "Sherpa Fleece", sku: "SCH6084" },
  "FAB 80": { name: "Polar Fleece", sku: "SCH6085" },
  "FAB 81": { name: "Coral Fleece", sku: "SCH6086" },
  "FAB 82": { name: "Minky Fabric", sku: "SCH6087" },
  "FAB 83": { name: "Faux Fur", sku: "SCH6088" },
  "FAB 84": { name: "Boucle Knit", sku: "SCH6091" },
  "FAB 85": { name: "Slub Knit", sku: "SCH6043" },
  "FAB 86": { name: "Nep Knit", sku: "SCH5003" },
  "FAB 87": { name: "Lurex Knit", sku: "SCH6083" },
  "FAB 88": { name: "Metallic Jersey", sku: "SCH5805" },
  "FAB 89": { name: "Glitter Knit", sku: "SCH6084" },
  "FAB 90": { name: "Sequin Fabric", sku: "SCH6085" },
  "FAB 91": { name: "Embroidered Mesh", sku: "SCH6086" },
};

const VIDEO_COUNT = 91;

// Helper to get fabric data for Digital Fall (mapping IDs to FAB entries)
const getFabricData = (id: number) => {
  const fabKey = `FAB ${id}`;
  return FABRIC_INFO[fabKey] || { name: `Fabric #${id}`, sku: "SCH-0000" };
};

function FallCard({ id, onClick }: { id: number; onClick: (src: string, name: string, fabric: string, sku: string) => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [isError, setIsError] = useState(false);

  const fabricData = getFabricData(id);
  const name = `Fall Analysis - ${fabricData.name}`;
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
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      onClick={() => onClick(videoSrc, name, fabricData.name, fabricData.sku)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onContextMenu={handleContextMenu}
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
            </div>
          </div>
        </div>
      </div>
    </motion.div>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
          <AnimatePresence mode="popLayout">
            {currentIds.map((id) => (
              <FallCard
                key={`${currentPage}-${id}`}
                id={id}
                onClick={(src, name, fabric, sku) => setSelectedVideo({ src, name, fabric, sku })}
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

                <VideoBadge />

                {/* Lightbox Badge Overlay */}
                <div className="absolute bottom-8 left-8 pointer-events-none z-10 flex flex-col gap-3">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="flex flex-col border-l-2 border-[#57AD43] pl-4 py-1"
                  >
                    <span className="text-[14px] font-black uppercase tracking-[0.3em] text-white drop-shadow-2xl">
                      {selectedVideo.fabric || selectedVideo.name}
                    </span>
                    {selectedVideo.sku && (
                      <span className="text-[12px] font-bold uppercase tracking-[0.1em] text-white/70 mt-1.5">
                        {selectedVideo.sku}
                      </span>
                    )}
                  </motion.div>
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
