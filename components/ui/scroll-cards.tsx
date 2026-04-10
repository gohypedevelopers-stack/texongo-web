"use client";
import {FC, useRef} from "react";
import Image from "next/image";
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
	color,
	textColor,
	i,
	src,
  videoUrl,
  progress,
  range,
  targetScale
}) => {
  const container = useRef(null);
  const scale = useTransform(progress, range, [1, targetScale]);

	return (
		<div ref={container} className="h-screen flex items-center justify-center sticky top-0 overflow-hidden">
			<motion.div
				style={{
          backgroundColor: color, 
          scale,
          top: `calc(-5vh + ${i * 25}px)` 
        }}
				className="relative flex flex-col md:flex-row h-[85vh] w-[95vw] md:w-[1280px]
				items-center justify-between mx-auto shadow-2xl rounded-[40px] overflow-hidden origin-top"
			>
        {/* Media Side */}
				<div className="absolute inset-0 z-0 w-full h-full">
          {videoUrl ? (
            <LazyVideo
              src={videoUrl}
              className="w-full h-full object-cover opacity-80"
            />
          ) : src ? (
            <Image
              className="w-full h-full object-cover opacity-80"
              src={src}
              alt={title}
              fill
              priority={i === 0}
            />
          ) : null}
          <div className="absolute inset-0 bg-black/40" />
				</div>
        
        {/* Content Overlay */}
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center p-8 md:p-20">
          <span className="text-[11px] font-black uppercase tracking-[0.5em] mb-4 opacity-70" style={{color: textColor}}>
            Texongo Featured
          </span>
          <h2 
            className="text-4xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tighter uppercase leading-[0.9]"
            style={{color: textColor}}
          >
            {title}
          </h2>
          <p 
            className="text-lg md:text-2xl font-medium max-w-2xl opacity-90 leading-relaxed"
            style={{color: textColor}}
          >
            {description}
          </p>
          <div className="mt-12">
            <button className="h-14 px-10 bg-white text-black text-[11px] font-black uppercase tracking-[0.3em] rounded-full hover:scale-105 transition-transform">
              Explore Collection
            </button>
          </div>
        </div>
			</motion.div>
		</div>
	);
};

interface iCardSlideProps {
	items: iCardItem[];
}

export const CardsParallax: FC<iCardSlideProps> = ({items}) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  });

	return (
		<div ref={container} className="relative mt-[10vh]">
			{items.map((project, i) => {
        const targetScale = 1 - ( (items.length - i) * 0.05);
				return (
          <Card 
            key={`p_${i}`} 
            {...project} 
            i={i} 
            progress={scrollYProgress} 
            range={[i * 0.25, 1]} 
            targetScale={targetScale}
          />
        );
			})}
		</div>
	);
};

