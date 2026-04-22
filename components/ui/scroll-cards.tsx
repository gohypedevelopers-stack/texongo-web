"use client";
import { FC, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { LazyVideo } from "../../app/lazy-video";
import { motion, useScroll, useTransform } from "framer-motion";

// Types
export interface iCardItem {
  title: string;
  description: string;
  tag: string;
  src?: string;
  videoUrl?: string;
  link: string;
  color: string;
  textColor: string;
}

interface iCardProps extends iCardItem {
  i: number;
  progress: any;
  range: [number, number];
  targetScale: number;
}

// Components
const Card: FC<iCardProps> = ({
  title,
  description,
  tag,
  videoUrl,
  src,
  link,
  i,
  progress,
  range,
}) => {
  const container = useRef(null);

  // Minimal opacity fade - disabling purely dynamic transforms on mobile for better FPS
  const opacity = useTransform(progress, range, [1, 0.7]);

  return (
    <div ref={container} className="relative w-full h-[75vh] md:h-[80vh] sticky top-0 overflow-hidden bg-white flex items-center justify-center border-b border-gray-50 transform-gpu">

      {/* 1. Large Faint Background Marquee (z-10) - Hidden on smaller screens for performance */}
      <div className="absolute inset-0 z-99 flex items-center pointer-events-none select-none overflow-hidden hidden lg:flex">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 40, // Slower is easier on GPU
            repeat: Infinity,
            ease: "linear"
          }}
          className="flex whitespace-nowrap"
        >
          <span className="text-[20vw] font-black tracking-tighter uppercase text-black opacity-[0.03] pr-20">
            {title} &nbsp; {title} &nbsp; {title} &nbsp;
          </span>
          <span className="text-[20vw] font-black tracking-tighter uppercase text-black opacity-[0.03] pr-20">
            {title} &nbsp; {title} &nbsp; {title} &nbsp;
          </span>
        </motion.div>
      </div>

      {/* 2. Primary Model Composition */}
      <div className="relative z-0 h-full w-full max-w-5xl flex items-center justify-center pt-10 md:pt-0">
        <motion.div
          initial={{ opacity: 0.01 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: "circOut" }}
          className="relative h-[85%] md:h-[90%] aspect-[3/4] md:aspect-square flex items-center justify-center overflow-hidden"
        >
          {videoUrl ? (
            <LazyVideo
              src={videoUrl}
              className="w-full h-full"
              style={{ objectFit: 'contain' }} // Ensure realism for the 3D models
              threshold={0.15} // Don't start until nicely in view
            />
          ) : src ? (
            <div className="relative w-full h-full">
              <Image
                className="object-contain"
                src={src}
                alt={title}
                fill
                priority={i === 0}
                sizes="(max-width: 768px) 100vw, 80vw"
              />
            </div>
          ) : null}
        </motion.div>
      </div>

      {/* 3. High-Contrast Text Overlay */}
      <motion.div
        style={{ opacity: i === 0 ? 1 : opacity }} // Only fade non-primary cards
        className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center p-6 bg-gradient-to-t from-white/10 via-transparent to-transparent"
      >
        <div className="max-w-2xl mt-auto mb-12 md:mb-16 flex flex-col items-center">
          <span className="text-[10px] font-bold uppercase tracking-[0.5em] mb-4 text-black/40">
            {tag || "Collection"}
          </span>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black mb-4 md:mb-6 tracking-tighter uppercase leading-[0.85] text-black">
            {title}
          </h2>

          <p className="text-sm md:text-base font-medium text-black/60 mb-8 md:mb-10 max-w-md leading-relaxed px-4">
            {description}
          </p>

          <Link
            href={link}
            style={{ color: '#ffffff', backgroundColor: '#000000' }}
            className="relative z-30 inline-flex items-center justify-center h-12 md:h-16 px-10 md:px-16 text-[12px] md:text-[14px] font-black uppercase tracking-[0.4em] rounded-full hover:scale-105 transition-all shadow-2xl active:scale-95"
          >
            Explore
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

interface iCardSlideProps {
  items: iCardItem[];
}

export const CardsParallax: FC<iCardSlideProps> = ({ items }) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  });

  return (
    <div ref={container} className="relative" style={{ height: `${items.length * 85}vh` }}>
      {items.map((project, i) => {
        const range = [i * (1 / items.length), (i + 1) * (1 / items.length)];
        return (
          <Card
            key={`p_${i}`}
            {...project}
            i={i}
            progress={scrollYProgress}
            range={range as [number, number]}
            targetScale={1}
          />
        );
      })}
    </div>
  );
};

