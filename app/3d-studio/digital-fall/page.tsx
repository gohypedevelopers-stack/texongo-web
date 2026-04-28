"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

function FallCard({ videoSrc, id }: { videoSrc: string; id: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(err => console.log("Playback error:", err));
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: (id % 3) * 0.1 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative aspect-[3/4] bg-zinc-900 overflow-hidden group cursor-pointer border border-white/5"
    >
      <video
        ref={videoRef}
        src={videoSrc}
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity duration-700"
      />
      
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 flex items-center justify-center pointer-events-none">
        <span className="text-[10px] font-black uppercase tracking-widest border border-white/30 px-4 py-2 bg-black/20 backdrop-blur-sm">
          View Fall Analysis
        </span>
      </div>
      
      <div className="absolute inset-0 flex items-center justify-center text-white/10 text-[10px] font-black uppercase tracking-[0.5em] rotate-90 pointer-events-none group-hover:opacity-0 transition-opacity">
        Texongo 3D Studio Content
      </div>
    </motion.div>
  );
}

export default function DigitalFallPage() {
  const videoCount = 91;
  const placeholders = Array.from({ length: videoCount }, (_, i) => i + 1);

  return (
    <main className="min-h-screen bg-black text-white pt-24 lg:pt-32">

      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-16 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl md:text-5xl font-black uppercase tracking-[0.3em] mb-4"
        >
          Digital Fall
        </motion.h1>
        <p className="text-zinc-500 text-xs md:text-sm uppercase tracking-widest max-w-2xl mx-auto font-medium">
          Analyze the natural drape and weight of fabrics through high-fidelity vertical fall simulations.
        </p>
      </div>

      <section className="max-w-[1440px] mx-auto px-6 lg:px-10 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
          {placeholders.map((id) => (
            <FallCard 
              key={id} 
              id={id} 
              videoSrc={`/digital-fall-fixed/${id}.mp4`} 
            />
          ))}
        </div>
      </section>
    </main>
  );
}
