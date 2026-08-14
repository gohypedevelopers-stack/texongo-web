"use client";
import { FC, useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { LazyVideo } from "../../app/lazy-video";
import { motion, useScroll } from "framer-motion";

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

  const isEven = i % 2 === 0;

  return (
    <div ref={container} className="relative w-full h-[65vh] lg:h-[60vh] sticky top-[10vh] lg:top-[15vh] overflow-hidden bg-white flex items-center justify-center border-b border-black/5 transform-gpu">

      {/* 1. Large Faint Background Marquee (z-10) */}
      <div className="absolute inset-0 z-10 flex items-center pointer-events-none select-none overflow-hidden hidden lg:flex">
        <motion.div
          animate={{ x: isEven ? ["0%", "-50%"] : ["-50%", "0%"] }}
          transition={{
            duration: 50,
            repeat: Infinity,
            ease: "linear"
          }}
          className="flex whitespace-nowrap"
        >
          <span className="text-[18vw] font-black tracking-tighter uppercase text-black/[0.02] pr-20">
            {title} &nbsp; {title} &nbsp; {title} &nbsp;
          </span>
          <span className="text-[18vw] font-black tracking-tighter uppercase text-black/[0.02] pr-20">
            {title} &nbsp; {title} &nbsp; {title} &nbsp;
          </span>
        </motion.div>
      </div>

      {/* 2. Content Layout (2-Column Editorial Grid) */}
      <div className="relative w-full h-full max-w-[1440px] px-6 lg:px-8 xl:px-12 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-4 xl:gap-16 pt-12 lg:pt-0">

        {/* Media Block (Alternating order on desktop) */}
        <div className={`relative z-0 w-full lg:w-[45%] h-[30vh] lg:h-[50vh] flex items-center justify-center overflow-hidden bg-white group transition-transform duration-500 ${isEven ? 'lg:order-1' : 'lg:order-2 xl:-translate-x-16'}`}>
          {videoUrl ? (
            <LazyVideo
              src={videoUrl}
              className="w-full h-full group-hover:scale-105 transition-transform duration-[2000ms]"
              objectFit="contain"
              threshold={0.1}
            />
          ) : src ? (
            <Image
              className="object-cover group-hover:scale-105 transition-transform duration-[2000ms]"
              src={src}
              alt={title}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          ) : null}
        </div>

        {/* Text Details Block (Alternating order on desktop) */}
        <motion.div
          className={`relative z-20 w-full lg:w-[40%] flex flex-col items-center lg:items-start text-center lg:text-left py-4 transition-transform duration-500 ${isEven ? 'lg:order-2 xl:mr-auto' : 'lg:order-1 xl:ml-auto xl:translate-x-16'}`}
        >
          <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] mb-1.5 text-[#57AD43]">
            {tag || "Collection"}
          </span>

          <h2 className="hp-heading mb-2 md:mb-3 text-[#111111] lg:whitespace-nowrap lg:!text-[36px] xl:!text-[48px]">
            {title}
          </h2>

          <p className="text-sm md:text-base font-medium text-[#111111] mb-3 md:mb-4 max-w-md leading-relaxed">
            {description}
          </p>

          <Link
            href={link}
            style={{ color: '#ffffff' }}
            className="inline-flex items-center justify-center h-12 md:h-14 px-8 md:px-12 text-[8px] md:text-[12px] font-bold uppercase tracking-[0.3em] bg-black text-white hover:bg-[#57AD43] rounded-full hover:scale-105 active:scale-95 transition-all duration-300 shadow-md"
          >
            Explore Collection
          </Link>
        </motion.div>

      </div>
    </div>
  );
};

interface iCardSlideProps {
  items: iCardItem[];
}

export const CardsParallax: FC<iCardSlideProps> = ({ items }) => {
  const container = useRef(null);
  const [mt, setMt] = useState(70);

  useEffect(() => {
    if (window.innerWidth < 1024) setMt(80);
  }, []);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  });

  return (
    <div ref={container} className="relative" style={{ height: `${items.length * mt}vh` }}>
      {items.map((project, i) => {
        const range = [i * (1 / items.length), (i + 1) * (1 / items.length)];
        return (
          <Card
            key={`p_${i}`}
            {...project}
            i={i}
            progress={scrollYProgress}
            range={range as [number, number]}
          />
        );
      })}
    </div>
  );
};

