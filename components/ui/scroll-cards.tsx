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
  targetScale
}) => {
  const container = useRef(null);

  // Minimal opacity fade for a sleek feel
  const opacity = useTransform(progress, range, [1, 0.7]);

  return (
    <div ref={container} className="relative w-full h-[75vh] sticky top-0 overflow-hidden bg-white flex items-center justify-center border-b border-gray-50">

      {/* 1. Large Faint Background Marquee (z-10) */}
      <div className="absolute inset-0 z-99 flex items-center pointer-events-none select-none overflow-hidden hidden md:flex">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          className="flex whitespace-nowrap"
        >
          <span className="text-[20vw] font-black tracking-tighter uppercase text-black opacity-[0.04] pr-20">
            {title} &nbsp; {title} &nbsp; {title} &nbsp;
          </span>
          <span className="text-[20vw] font-black tracking-tighter uppercase text-black opacity-[0.04] pr-20">
            {title} &nbsp; {title} &nbsp; {title} &nbsp;
          </span>
        </motion.div>
      </div>

      {/* 2. Primary Model Composition (z-0 to sit in background) */}
      <div className="relative z-0 h-full w-full max-w-5xl flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: "circOut" }}
          className="relative h-[95%] aspect-[3/4] md:aspect-square flex items-center justify-center"
        >
          {videoUrl ? (
            <LazyVideo
              src={videoUrl}
              className="w-full h-full object-contain"
              threshold={0.01}
            />
          ) : src ? (
            <div className="relative w-full h-full">
              <Image
                className="object-contain"
                src={src}
                alt={title}
                fill
                priority={i === 0}
              />
            </div>
          ) : null}
        </motion.div>
      </div>

      {/* 3. High-Contrast Text Overlay (z-20 for top layer) */}
      <motion.div
        style={{ opacity }}
        className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center p-6"
      >
        <div className="max-w-2xl mt-auto mb-16 flex flex-col items-center">
          <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.5em] mb-4 text-black/40">
            {tag || "Women's Collection"}
          </span>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black mb-4 md:mb-6 tracking-tighter uppercase leading-[0.8] text-black">
            {title}
          </h2>

          <p className="text-sm md:text-base lg:text-lg font-medium text-black/60 mb-10 max-w-lg leading-relaxed">
            {description}
          </p>

          <Link
            href={link}
            style={{ color: '#ffffff', backgroundColor: '#000000' }}
            className="relative z-30 inline-flex items-center justify-center h-14 md:h-16 px-12 md:px-16 text-[13px] md:text-[14px] font-black uppercase tracking-[0.4em] rounded-full hover:scale-105 transition-all shadow-2xl active:scale-95"
          >
            Explore Collection
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
    <div ref={container} className="relative" style={{ height: `${items.length * 75}vh` }}>
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

