"use client";

import { ReactLenis } from "@studio-freight/react-lenis";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import { FiArrowRight, FiMapPin } from "react-icons/fi";
import { useRef } from "react";
import Link from "next/link";

export const SmoothScrollHero = () => {
  return (
    <div className="bg-[#FBF9F4]">
      <ReactLenis root>
        <Nav />
        <Hero />
        <Schedule />
      </ReactLenis>
    </div>
  );
};

const Nav = () => {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-4 text-black">
      <Link href="/" className="text-2xl font-black tracking-tighter mix-blend-difference">
        TEX<span className="text-[#5D8233]">O</span>NGO
      </Link>
      <button
        onClick={() => {
          document.getElementById("fabric-collections")?.scrollIntoView({
            behavior: "smooth",
          });
        }}
        className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-[#5D8233]"
      >
        View Collections <FiArrowRight />
      </button>
    </nav>
  );
};

const SECTION_HEIGHT = 1500;

const Hero = () => {
  return (
    <div
      style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }}
      className="relative w-full"
    >
      <CenterImage />

      <ParallaxImages />

      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-b from-transparent to-[#FBF9F4]" />
    </div>
  );
};

const CenterImage = () => {
  const { scrollY } = useScroll();

  const clip1 = useTransform(scrollY, [0, 1500], [25, 0]);
  const clip2 = useTransform(scrollY, [0, 1500], [75, 100]);

  const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`;

  const backgroundSize = useTransform(
    scrollY,
    [0, SECTION_HEIGHT + 500],
    ["170%", "100%"]
  );
  const opacity = useTransform(
    scrollY,
    [SECTION_HEIGHT, SECTION_HEIGHT + 500],
    [1, 0]
  );

  return (
    <motion.div
      className="sticky top-0 h-screen w-full"
      style={{
        clipPath,
        backgroundSize,
        opacity,
        backgroundImage:
          "url(https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=2672&auto=format&fit=crop)",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#5D8233",
      }}
    />
  );
};

const ParallaxImages = () => {
  return (
    <div className="mx-auto max-w-5xl px-4 pt-[200px]">
      <ParallaxImg
        src="https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=2670&auto=format&fit=crop"
        alt="Premium Cotton Fabric"
        start={-200}
        end={200}
        className="w-1/3 rounded-sm shadow-2xl"
      />
      <ParallaxImg
        src="https://images.unsplash.com/photo-1590733401569-42b36fb2f57b?q=80&w=2670&auto=format&fit=crop"
        alt="Textile Weaving Process"
        start={200}
        end={-250}
        className="mx-auto w-2/3 rounded-sm shadow-2xl"
      />
      <ParallaxImg
        src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2370&auto=format&fit=crop"
        alt="Linen Texture Detail"
        start={-200}
        end={200}
        className="ml-auto w-1/3 rounded-sm shadow-2xl"
      />
      <ParallaxImg
        src="https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=2670&auto=format&fit=crop"
        alt="Sustainability in Textiles"
        start={0}
        end={-500}
        className="ml-24 w-5/12 rounded-sm shadow-2xl"
      />
    </div>
  );
};

const ParallaxImg = ({
  className,
  alt,
  src,
  start,
  end,
}: {
  className?: string;
  alt: string;
  src: string;
  start: number;
  end: number;
}) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`${start}px end`, `end ${end * -1}px`] as any,
  });

  const opacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0.75, 1], [1, 0.85]);

  const y = useTransform(scrollYProgress, [0, 1], [start, end]);
  const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`;

  return (
    <motion.img
      src={src}
      alt={alt}
      className={className}
      ref={ref}
      style={{ transform, opacity, objectFit: "cover", aspectRatio: "16/9" }}
    />
  );
};

const Schedule = () => {
  return (
    <section
      id="fabric-collections"
      className="mx-auto max-w-5xl px-4 py-48 text-[#121212]"
    >
      <motion.h1
        initial={{ y: 48, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.75 }}
        className="mb-20 text-5xl md:text-7xl font-black uppercase tracking-tighter"
      >
        Production <span className="text-[#5D8233]">Cycle</span>
      </motion.h1>
      <ScheduleItem
        title="Sustainable Sourcing"
        date="Phase 01"
        location="Global"
        desc="Procuring high-quality, eco-friendly raw materials from certified origins."
      />
      <ScheduleItem
        title="Precision Weaving"
        date="Phase 02"
        location="Studio"
        desc="Transforming yarns into premium textiles with state-of-the-art machinery."
      />
      <ScheduleItem
        title="Digital Print Audit"
        date="Phase 03"
        location="Lab"
        desc="Testing clarity and durability of digital patterns on specialized bases."
      />
      <ScheduleItem
        title="Quality Assurance"
        date="Phase 04"
        location="Warehouse"
        desc="Meticulous inspection of drape, texture, and color consistency."
      />
      <ScheduleItem
        title="Global Distribution"
        date="Phase 05"
        location="Logistics"
        desc="Readying the collections for delivery to top-tier fashion houses."
      />
    </section>
  );
};

const ScheduleItem = ({ title, date, location, desc }: { title: string; date: string; location: string; desc: string }) => {
  return (
    <motion.div
      initial={{ y: 48, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.75 }}
      className="mb-12 border-b border-[#121212]/10 pb-12"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="mb-0.5 text-2xl font-black">{title}</p>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#5D8233]">{date}</p>
        </div>
        <div className="flex items-center gap-1.5 text-end text-[10px] font-black uppercase tracking-[0.2em] text-black/40">
          <p>{location}</p>
          <FiMapPin />
        </div>
      </div>
      <p className="max-w-xl text-sm leading-relaxed text-black/60 font-medium">
        {desc}
      </p>
    </motion.div>
  );
};
