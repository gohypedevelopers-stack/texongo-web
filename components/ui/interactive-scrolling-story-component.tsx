"use client";

import React, { useState, useRef } from 'react';
import { motion, useScroll, AnimatePresence } from 'framer-motion';

const slidesData = [
  {
    title: "Rib",
    description: "A vertically ribbed knit fabric known for its elasticity and body-hugging fit. Ideal for cuffs, collars, and fitted garments.",
    image: "/category/fabric-rib.png",
    bgColor: "#F9FAFB",
    textColor: "#121212",
  },
  {
    title: "Pique",
    description: "A raised honeycomb-textured fabric commonly used in polo shirts and sportswear. Breathable, durable, and structured.",
    image: "/category/fabric-pique.png",
    bgColor: "#57AD43",
    textColor: "#ffffff",
  },
  {
    title: "French Terry",
    description: "A looped-back knit with a soft, absorbent interior. Perfect for loungewear, hoodies, and sweatshirts.",
    image: "/category/fabric-french-terry.png",
    bgColor: "#121212",
    textColor: "#ffffff",
  },
  {
    title: "Waffle",
    description: "Distinctive grid-patterned thermal knit that offers superior insulation and moisture management.",
    image: "/category/fabric-waffle.png",
    bgColor: "#57AD43",
    textColor: "#ffffff",
  },
  {
    title: "Single Jersey",
    description: "A lightweight, single-layer plain knit that is soft, smooth, and highly versatile. The go-to fabric for everyday basics.",
    image: "/category/fabric-single-jersey.png",
    bgColor: "#F9FAFB",
    textColor: "#121212",
  },
];

export function ScrollingFeatureShowcase() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    container: scrollRef
  });

  React.useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      const idx = Math.min(slidesData.length - 1, Math.floor(v * slidesData.length * 1.001));
      if (idx !== activeIndex) setActiveIndex(idx);
    });
  }, [scrollYProgress, activeIndex]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Import Serif Font for that premium look from the screenshot */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;700&display=swap');
        
        .font-serif-premium {
          font-family: 'Playfair Display', serif;
        }
        .font-sans-clean {
          font-family: 'Inter', sans-serif;
        }
        .hide-scroll::-webkit-scrollbar { display: none; }
        .hide-scroll { -ms-overflow-style: none; scrollbar-width: none; }
      ` }} />

      {/* Internal Scroll Engine */}
      <div 
        ref={scrollRef}
        className="absolute inset-0 overflow-y-auto hide-scroll z-50 h-full"
        style={{ scrollSnapType: 'y mandatory' }}
      >
        {slidesData.map((_, i) => (
          <div key={i} className="h-full w-full snap-start" />
        ))}
      </div>

      {/* Background layer */}
      <motion.div 
        className="absolute inset-0 pointer-events-none transition-colors duration-1000"
        style={{ 
          backgroundColor: slidesData[activeIndex].bgColor,
          color: slidesData[activeIndex].textColor
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 h-full w-full max-w-[1440px] mx-auto items-center px-8 md:px-24">
          
          {/* Text Layer - Typography updated to match screenshot */}
          <div className="relative flex flex-col justify-center font-sans-clean">
            {/* Pagination Tracks */}
            <div className="flex space-x-3 mb-10">
              {slidesData.map((_, i) => (
                <motion.div
                  key={i}
                  className="h-1 rounded-full bg-current"
                  animate={{ 
                    width: i === activeIndex ? 64 : 24,
                    opacity: i === activeIndex ? 1 : 0.2
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              ))}
            </div>

            <div className="relative h-[450px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 0.98, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98, y: -10 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <span className="text-[11px] font-bold uppercase tracking-[0.4em] opacity-50 mb-6 block">Texongo Story {activeIndex + 1}</span>
                  
                  {/* Title: Premium Bold Serif as seen in "Trendy Fabrics" */}
                  <h2 className="text-6xl lg:text-8xl font-serif-premium leading-tight mb-8 tracking-tight">
                    {slidesData[activeIndex].title}
                  </h2>
                  
                  {/* Description: Clean, elegant sans-serif */}
                  <p className="text-lg md:text-xl font-medium leading-relaxed max-w-md opacity-80">
                    {slidesData[activeIndex].description}
                  </p>

                  <div className="mt-14 pointer-events-auto">
                    <a href="/shop" className="inline-flex h-12 items-center px-12 bg-current font-bold uppercase tracking-[0.2em] text-[10px] rounded-full hover:scale-105 transition-all shadow-lg shadow-black/5" 
                       style={{ backgroundColor: slidesData[activeIndex].textColor, color: slidesData[activeIndex].bgColor }}>
                      Explore More
                    </a>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Image Layer: Perfectly Framed and Shadowed */}
          <div className="hidden md:flex items-center justify-center pr-12">
            <div className="relative w-[687px] h-[687px] rounded-[40px] overflow-hidden shadow-[0_60px_100px_-20px_rgba(0,0,0,0.25)] border-[1px] border-current/10">
              <AnimatePresence initial={false}>
                <motion.div
                  key={activeIndex}
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ scale: 1.1, opacity: 0 }}
                  transition={{ 
                    duration: 0.9, 
                    ease: [0.23, 1, 0.32, 1] 
                  }}
                  className="absolute inset-0 w-full h-full"
                >
                  <img 
                    src={slidesData[activeIndex].image} 
                    alt={slidesData[activeIndex].title} 
                    className="h-full w-full object-cover" 
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
