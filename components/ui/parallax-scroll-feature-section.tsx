"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from "lucide-react";
import { LazyVideo } from '../../app/lazy-video';

interface Section {
  id: number;
  title: string;
  description: string;
  videoUrl: string;
  reverse: boolean;
}

export const ParallaxFeatureSection = () => {
  const sections: Section[] = [
    {
      id: 1,
      title: "PREMIUM KNITS THAT INSPIRE BEAUTIFUL WOMEN’S WEAR.",
      description: "From lightweight essentials to plush winter textures, our knit fabrics offer unmatched versatility. Create dresses, tops, co-ords, or loungewear with materials crafted to drape effortlessly and stand the test of time. With rich textures and refined finishes, every fabric reflects our commitment to exceptional craftsmanship—transforming simple ideas into stunning women's wear.",
      videoUrl: "/video/1-1.mp4",
      reverse: false
    },
    {
      id: 2,
      title: "BOLD FABRICS FOR THE MODERN MAN",
      description: "From sharp office attire to effortless weekend looks, our fabrics are crafted to offer true versatility—adapting flawlessly to every mood, moment, and season. Each piece blends comfort, structure, and durability, giving today's man the confidence to move through his day with ease and unmistakable style.",
      videoUrl: '/video/2-1.mp4',
      reverse: true
    },

  ];

  return (
    <div className="bg-white text-[#111111]">
      <div className="flex flex-col md:px-0 px-10 max-w-7xl mx-auto py-20">
        {sections.map((section, index) => (
          <SectionView key={section.id} section={section} />
        ))}
      </div>
    </div>
  );
};

const SectionView = ({ section }: { section: Section }) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center start"]
  });

  const translateText = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <div
      ref={ref}
      className={`min-h-[80vh] flex flex-col md:flex-row items-center justify-between md:gap-32 gap-16 py-24 ${section.reverse ? 'md:flex-row-reverse' : ''}`}
    >
      <motion.div
        style={{ y: translateText, opacity }}
        className="flex-1"
      >
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight uppercase mb-8 leading-[1.15]">
          {section.title}
        </h2>
        <p className="text-[#666666] text-sm md:text-base font-normal max-w-xl leading-relaxed">
          {section.description}
        </p>
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative flex-1 w-full aspect-square md:aspect-[4/5] overflow-hidden flex items-center justify-center p-4 text-center"
      >
        <LazyVideo
          src={section.videoUrl}
          className="w-full h-full object-contain mix-blend-multiply"
        />
      </motion.div>
    </div>
  );
};
