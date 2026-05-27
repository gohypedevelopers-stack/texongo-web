"use client";

import { motion } from "framer-motion";

interface PageHeroProps {
  subtitle: string;
  mainTitle: string;
  accentTitle: string;
  className?: string;
}

export function PageHero({ subtitle, mainTitle, accentTitle, className = "" }: PageHeroProps) {
  return (
    <div className={`max-w-[1680px] mx-auto px-6 lg:px-10 pt-28 md:pt-36 pb-0 relative z-[100] ${className}`}>
      <div className="flex flex-col items-center gap-2.5 text-center">
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-xs font-black uppercase tracking-[0.4em] text-[#57AD43] mb-0 block"
        >
          {subtitle}
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          className="text-3xl md:text-6xl font-bold tracking-tight text-black"
        >
          {mainTitle} <span className="text-[#57AD43]">{accentTitle}</span>
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="h-px bg-emerald-100/60 w-24 mx-auto mt-2 origin-center"
        />
      </div>
    </div>
  );
}
