"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

const videoSources = [
  "FAB_10_DES_10A.mp4", "FAB_11_DES_11A.mp4", "FAB_12_DES_12A.mp4", "FAB_13_DES_13A.mp4",
  "FAB_14_DES_14B.mp4", "FAB_15_DES_15A.mp4", "FAB_16_DES_16A.mp4", "FAB_17_DES_17A.mp4",
  "FAB_18_DES_18A.mp4", "FAB_19_DES19A.mp4", "FAB_1_DES_1A.mp4", "FAB_20_DES_20A.mp4",
  "FAB_21_DES_21A.mp4", "FAB_22_DES_10B.mp4", "FAB_23_DES_16A.mp4", "FAB_24_DES_2B.mp4",
  "FAB_25_DES_8C.mp4", "FAB_26_DES_15B.mp4", "FAB_27_DES_2C.mp4", "FAB_28_DES_9C.mp4",
  "FAB_29_DES_21A.mp4", "FAB_2_DES_2A.mp4", "FAB_30_DES_10A.mp4", "FAB_31_DES_15C.mp4",
  "FAB_32_DES_11C.mp4", "FAB_33_DES_20A.mp4", "FAB_34_DES_5C.mp4", "FAB_35_DES_15B.mp4",
  "FAB_36_DES_2A.mp4", "FAB_37_DES_17A.mp4", "FAB_38_DES_2C.mp4", "FAB_39_DES_16C.mp4",
  "FAB_3_DES_3A.mp4", "FAB_40_DES_18B.mp4", "FAB_41_DES_9B.mp4", "FAB_42_DES_7C.mp4",
  "FAB_43_DES_7A.mp4", "FAB_44_DES_12C.mp4", "FAB_45_DES_11A.mp4", "FAB_46_DES_3B.mp4",
  "FAB_47_DES_13A.mp4", "FAB_48_DES_2A.mp4", "FAB_49_DES_17C.mp4", "FAB_4_DES_4A.mp4",
  "FAB_50_DES_5C.mp4", "FAB_51_DES_2A.mp4", "FAB_52_DES_1B.mp4", "FAB_53_DES_2A.mp4",
  "FAB_54_DES_2A.mp4", "FAB_55_DES_2A.mp4", "FAB_56_DES_2C.mp4", "FAB_57_DES_2B.mp4",
  "FAB_58_DES_12C.mp4", "FAB_59_DES_15B.mp4", "FAB_5_DES_5A.mp4", "FAB_60_DES_8B.mp4",
  "FAB_61_DES_10A.mp4", "FAB_62_DES_10B.mp4", "FAB_63_DES_3A.mp4", "FAB_64_DES_18B.mp4",
  "FAB_65_DES_10C.mp4", "FAB_66_DES_11C.mp4", "FAB_67_DES_2C.mp4", "FAB_68_DES_10B.mp4",
  "FAB_69_DES_12B.mp4", "FAB_6_DES_6A.mp4", "FAB_70_DES_8B.mp4", "FAB_71_DES_9C.mp4",
  "FAB_72_DES_20A.mp4", "FAB_73_DES_5B.mp4", "FAB_74_DES_2C.mp4", "FAB_75_DES_9C.mp4",
  "FAB_76_DES_21B.mp4", "FAB_77_DES_8C.mp4", "FAB_78_DES_1B.mp4", "FAB_79_DES_12A.mp4",
  "FAB_7_DES_7A.mp4", "FAB_80_DES_2B.mp4", "FAB_81_DES_19C.mp4", "FAB_82_DES_17C.mp4",
  "FAB_83_DES_8B.mp4", "FAB_84_DES_15B.mp4", "FAB_85_DES_20C.mp4", "FAB_86_DES_21C.mp4",
  "FAB_87_DES_2C.mp4", "FAB_88_DES_10A.mp4", "FAB_89_DES_10B.mp4", "FAB_8_DES_8A.mp4",
  "FAB_90_DES_7C.mp4", "FAB_91_DES_13A.mp4", "FAB_9_DES_9A.mp4"
];

const ITEMS_PER_PAGE = 12;

function FashionCard({ src, index }: { src: string; index: number }) {
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
        src={`/digital-fashion-fixed/${src}`}
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      
      {/* Overlays removed as per user request */}
    </motion.div>
  );
}

export default function DigitalFashionPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(videoSources.length / ITEMS_PER_PAGE);
  
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentVideos = videoSources.slice(startIndex, startIndex + ITEMS_PER_PAGE);

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
            {currentVideos.map((src, index) => (
              <FashionCard key={`${currentPage}-${src}`} src={src} index={startIndex + index} />
            ))}
          </AnimatePresence>
        </div>

        {/* Pagination Controls */}
        <div className="mt-16 flex items-center justify-center gap-4">
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
