"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { X, Loader2, ArrowRight } from "lucide-react";
import { WatermarkOverlay, VideoBadge } from "@/components/ui/watermark";

const ITEMS_PER_PAGE = 12;

const FABRIC_INFO: Record<string, { name: string; sku: string }> = {
  "FAB 1": { name: "Corduroy", sku: "SCH6049" },
  "FAB 2": { name: "Pin Stripe", sku: "SCH5812" },
  "FAB 3": { name: "2 x 2 Rib", sku: "SCH5687" },
  "FAB 4": { name: "1 x 1 Rib", sku: "SCH5109" },
  "FAB 5": { name: "Single Jersey", sku: "SCH6021" },
  "FAB 6": { name: "Jacquard Terry", sku: "SCH5108" },
  "FAB 7": { name: "Slub Single Jersey", sku: "SCH6066" },
  "FAB 8": { name: "Ponte", sku: "SCH6070" },
  "FAB 9": { name: "Popcorn", sku: "SCH5091" },
  "FAB 10": { name: "Nylon Lycra", sku: "SCH6071" },
  "FAB 11": { name: "Terry", sku: "SCH6058" },
  "FAB 12": { name: "Single Jersey Melange Neps", sku: "SCH6084" },
  "FAB 13": { name: "GreyHeather Terry Melange", sku: "SCH5100" },
  "FAB 14": { name: "Polyester Spandex", sku: "SCH6060" },
  "FAB 15": { name: "Shiffly", sku: "SCH6061" },
  "FAB 16": { name: "Single Jersey Slub", sku: "SCH6062" },
  "FAB 17": { name: "Single Jersey Injected Slub", sku: "SCH6063" },
  "FAB 18": { name: "Single Jersey Yarn Dyed", sku: "SCH6064" },
  "FAB 19": { name: "French Terry", sku: "SCH5811" },
  "FAB 20": { name: "Terry Injected Slub", sku: "SCH6072" },
  "FAB 21": { name: "Pique", sku: "SCH6073" },
  "FAB 22": { name: "Cotton Modal", sku: "SCH6074" },
  "FAB 23": { name: "Jacquard Single Jersey", sku: "SCH6075" },
  "FAB 24": { name: "3 thread Fleece", sku: "SCH6044" },
  "FAB 25": { name: "Camouflage", sku: "SCH5121" },
  "FAB 26": { name: "Single Jersey Lurex", sku: "SCH6045" },
  "FAB 27": { name: "Waffle Jacquard", sku: "SCH6076" },
  "FAB 28": { name: "Polyester Cotton Spandex", sku: "SCH6077" },
  "FAB 29": { name: "Sweater Knit Terry", sku: "SCH6078" },
  "FAB 30": { name: "Mercerised Interlock Yarn Dyed", sku: "SCH6079" },
  "FAB 31": { name: "Viscose Bamboo Lycra", sku: "SCH6092" },
  "FAB 32": { name: "Single Jersey Neps", sku: "SCH6098" },
  "FAB 33": { name: "Stretch Jersey", sku: "SCH6097" },
  "FAB 34": { name: "Micro Modal", sku: "SCH6096" },
  "FAB 35": { name: "Tencel Jersey", sku: "SCH6093" },
  "FAB 36": { name: "Organic Cotton", sku: "W6095" },
  "FAB 37": { name: "Bamboo Jersey", sku: "W5395" },
  "FAB 38": { name: "Recycled Polyester", sku: "SCH6051" },
  "FAB 39": { name: "Hemp Blend", sku: "SCH6052" },
  "FAB 40": { name: "Linen Jersey", sku: "SCH6053" },
  "FAB 41": { name: "Silk Touch Jersey", sku: "SCH6090" },
  "FAB 42": { name: "Modal Spandex", sku: "SCH6091" },
  "FAB 43": { name: "Double Knit", sku: "SCH5059" },
  "FAB 44": { name: "Heavy Interlock", sku: "SCH5032" },
  "FAB 45": { name: "Lightweight Jersey", sku: "SCH5771" },
  "FAB 46": { name: "Pointelle Knit", sku: "SCH6042" },
  "FAB 47": { name: "Pointelle Rib", sku: "SCH6043" },
  "FAB 48": { name: "French Rib", sku: "SCH5003" },
  "FAB 49": { name: "Ottoman Knit", sku: "SCH5040" },
  "FAB 50": { name: "Milano Knit", sku: "SCH5021" },
  "FAB 51": { name: "Scuba Fabric", sku: "SCH5046" },
  "FAB 52": { name: "Techno Crepe", sku: "SCH6047" },
  "FAB 53": { name: "Bubble Crepe", sku: "SCH5844" },
  "FAB 54": { name: "Liverpool Knit", sku: "SCH6054" },
  "FAB 55": { name: "Bullet Knit", sku: "SCH6055" },
  "FAB 56": { name: "Venice Knit", sku: "SCH6056" },
  "FAB 57": { name: "DTY Brushed", sku: "SCH6046" },
  "FAB 58": { name: "ITY Jersey", sku: "SCH6057" },
  "FAB 59": { name: "Slinky Jersey", sku: "SCH6040" },
  "FAB 60": { name: "Power Mesh", sku: "SCH5417" },
  "FAB 61": { name: "Nylon Mesh", sku: "SCH5796" },
  "FAB 62": { name: "Eyelet Fabric", sku: "SCH6080" },
  "FAB 63": { name: "Birdseye Mesh", sku: "SCH5778" },
  "FAB 64": { name: "Athletic Mesh", sku: "SCH6050" },
  "FAB 65": { name: "Space Dye Jersey", sku: "SCH6086" },
  "FAB 66": { name: "Space Dye Terry", sku: "SCH6087" },
  "FAB 67": { name: "Melange Rib", sku: "SCH6088" },
  "FAB 68": { name: "Heathered Knit", sku: "SCH6089" },
  "FAB 69": { name: "Marled Jersey", sku: "SCH6065" },
  "FAB 70": { name: "Striped Jersey", sku: "SCH6048" },
  "FAB 71": { name: "Striped Rib", sku: "SCH6067" },
  "FAB 72": { name: "Variegated Rib", sku: "SCH6068" },
  "FAB 73": { name: "Waffle Knit", sku: "SCH6069" },
  "FAB 74": { name: "Thermal Knit", sku: "SCH5805" },
  "FAB 75": { name: "Velour", sku: "SCH6083" },
  "FAB 76": { name: "Crushed Velvet", sku: "SCH6082" },
  "FAB 77": { name: "Stretch Velvet", sku: "SCH6084" },
  "FAB 78": { name: "Chenille Knit", sku: "SCH6085" },
  "FAB 79": { name: "Sherpa Fleece", sku: "SCH5058" },
  "FAB 80": { name: "Polar Fleece", sku: "SCH5780" },
  "FAB 81": { name: "Coral Fleece", sku: "SCH6049" },
  "FAB 82": { name: "Minky Fabric", sku: "SCH5812" },
  "FAB 83": { name: "Faux Fur", sku: "SCH5687" },
  "FAB 84": { name: "Boucle Knit", sku: "SCH5109" },
  "FAB 85": { name: "Slub Knit", sku: "SCH6021" },
  "FAB 86": { name: "Nep Knit", sku: "SCH5108" },
  "FAB 87": { name: "Lurex Knit", sku: "SCH6066" },
  "FAB 88": { name: "Metallic Jersey", sku: "SCH6070" },
  "FAB 89": { name: "Glitter Knit", sku: "SCH5091" },
  "FAB 90": { name: "Sequin Fabric", sku: "SCH6071" },
  "FAB 91": { name: "Embroidered Mesh", sku: "SCH6058" },
};

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

const getFabricData = (rawName: string) => {
  const fabMatch = rawName.match(/FAB (\d+)/);
  const fabKey = fabMatch ? `FAB ${fabMatch[1]}` : "FAB 1";
  const baseInfo = FABRIC_INFO[fabKey] || { name: "Premium Fabric", sku: "SCH-0000" };

  const desMatch = rawName.match(/DES (\d+[ABC])/);
  if (desMatch) {
    const des = desMatch[1];
    // Map SKUs based on the user-provided design table
    if (["18B", "16A", "5B", "10B", "7C", "21C", "8C"].includes(des)) return { ...baseInfo, sku: "SCH6083" };
    if (["2A", "5A", "2B", "8B", "12B", "2C", "13C"].includes(des)) return { ...baseInfo, sku: "SCH5805" };
    if (["13A", "18A", "6B", "18C"].includes(des)) return { ...baseInfo, sku: "SCH6084" };
    if (["9C", "15B"].includes(des)) return { ...baseInfo, sku: "SCH6085" };
    if (["8A", "6A", "7A", "15A", "19A", "21A", "19C"].includes(des)) return { ...baseInfo, sku: "SCH6086" };
    if (["1A", "1B", "1C", "10A", "17C", "20B"].includes(des)) return { ...baseInfo, sku: "SCH6087" };
    if (["17A", "11C", "5C", "15C"].includes(des)) return { ...baseInfo, sku: "SCH6088" };
    if (["3B", "6C", "14C"].includes(des)) return { ...baseInfo, sku: "SCH6091" };
    if (["16C", "16B", "11B", "11A"].includes(des)) return { ...baseInfo, sku: "SCH6043" };
    if (["9A", "9B"].includes(des)) return { ...baseInfo, sku: "SCH5003" };
  }

  return baseInfo;
};

function DrapeCard({ id, onClick }: { id: number; onClick: (src: string, name: string, fabric: string, sku: string) => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [isError, setIsError] = useState(false);

  const rawName = DRAPE_NAMES[id - 1] || `FAB ${id} DES 1A`;
  const fabricData = getFabricData(rawName);

  const [videoSrc, setVideoSrc] = useState("");

  useEffect(() => {
    setVideoSrc(`/digital-drape-fixed/${rawName}.mp4`);
  }, [id, rawName]);

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
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      onClick={() => onClick(videoSrc, rawName, fabricData.name, fabricData.sku)}
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

export default function DigitalDrapePage() {
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
