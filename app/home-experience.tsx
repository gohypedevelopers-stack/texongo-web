"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./page.module.css";
import { CategorySlider } from "./category-slider";
import { FaqSection } from "./faq-section";
import { ParallaxText } from "./parallax-text";
import { LazyVideo } from "./lazy-video";
import ScrollExpandMedia from "../components/ui/scroll-expansion-hero";
import { ParallaxFeatureSection } from "../components/ui/parallax-scroll-feature-section";

const marqueeProducts = [
  {
    name: "Cotton Spandex Interlock",
    price: "₹650 / m",
    href: "https://texongo.com/product/cotton-spandex-interlock/",
    image: "/arrivals/prod-cotton-spandex-interlock.png",
  },
  {
    name: "Cotton Indigo Terry",
    price: "₹999 / m",
    href: "https://texongo.com/product/cotton-indigo-terry/",
    image: "/arrivals/prod-cotton-indigo-terry.png",
  },
  {
    name: "Poly Viscose Spandex S/J",
    price: "₹700 / m",
    href: "https://texongo.com/shop/",
    image: "/arrivals/prod-poly-viscose-spandex.png",
  },
  {
    name: "Nylon Spandex S/J",
    price: "₹799 / m",
    href: "https://texongo.com/shop/",
    image: "/arrivals/prod-nylon-spandex.png",
  },
  {
    name: "Slub Melange Single Jersey",
    price: "₹600 / m",
    href: "https://texongo.com/shop/",
    image: "/arrivals/prod-slub-melange.png",
  },
  {
    name: "Rib Fabric",
    price: "₹380 / m",
    href: "https://texongo.com/product-category/knit-style/rib/",
    image: "/category/fabric-rib.png",
  },
  {
    name: "French Terry",
    price: "₹520 / m",
    href: "https://texongo.com/product-category/knit-style/french-terry/",
    image: "/category/fabric-french-terry.png",
  },
  {
    name: "Waffle Knit",
    price: "₹440 / m",
    href: "https://texongo.com/product-category/knit-style/waffle/",
    image: "/category/fabric-waffle.png",
  },
  {
    name: "Single Jersey",
    price: "₹395 / m",
    href: "https://texongo.com/product-category/knit-style/single-jersey/",
    image: "/category/fabric-single-jersey.png",
  },
  {
    name: "Pique",
    price: "₹460 / m",
    href: "https://texongo.com/product-category/knit-style/pique/",
    image: "/category/fabric-pique.png",
  },
];

const storyProducts = [
  {
    name: "Digital Drape",
    desc: "Visualize how fabrics drape digitally, bringing realistic flow, elegance, and style to every garment design effortlessly.",
    video: "/video/Untitled-design-1.mp4",
    alt: "Digital Drape",
    href: "#digital-drape",
  },
  {
    name: "Digital Fall",
    desc: "Experience digital fabric fall simulations, showcasing authentic movement, structure, and comfort across all fashion creations seamlessly.",
    video: "/video/7.mp4",
    alt: "Digital Fall",
    href: "#digital-fall",
  },
];

function MarqueeProductCard({
  name,
  price,
  href,
  image,
}: {
  name: string;
  price: string;
  href: string;
  image: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${styles.productCard} shrink-0 block`}
    >
      <div className={`${styles.productVisual} relative overflow-hidden bg-[#f5f3f0]`}>
        <img
          src={image}
          alt={name}
          loading="lazy"
          decoding="async"
          className={styles.productImage}
        />
        <div className={styles.productInfo}>
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-sm font-semibold text-black uppercase tracking-wide">{name}</h3>
              <p className="mt-0.5 text-xs text-black/60 font-medium">{price}</p>
            </div>
            <span className={styles.addButton}>
              View
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}

function StoryProductCard({
  name,
  desc,
  video,
  alt,
  href,
}: {
  name: string;
  desc: string;
  video: string;
  alt: string;
  href: string;
}) {
  return (
    <article className="flex flex-col items-center text-center">
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full relative aspect-square bg-transparent mb-8 flex items-center justify-center overflow-hidden shadow-none"
      >
        <LazyVideo
          src={video}
          aria-label={alt}
          threshold={0.05}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', mixBlendMode: 'multiply' }}
        />
      </Link>

      <h3 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4 tracking-tight px-4">{name}</h3>
      <p className="text-[#121212]/80 text-sm font-medium max-w-sm mb-8 md:mb-10 leading-relaxed px-6">
        {desc}
      </p>

      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 bg-[#57AD43] text-white px-6 md:px-8 py-3 rounded-full font-bold text-xs md:text-sm tracking-wide shadow-md hover:bg-[#489935] transition-colors w-[80%] md:w-auto"
      >
        Shop Now
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 16l4-4-4-4" /><path d="M8 12h8" /></svg>
      </Link>
    </article>
  );
}

function KnitStylesSection() {
  const knitStyles = [
    { name: "POLY COTTON", image: "/category/fabric-single-jersey.png", color: "#2e3b5e" },
    { name: "JACQUARD", image: "/category/fabric-waffle.png", color: "#d1d5db" },
    { name: "HONEY COMB", image: "/category/fabric-waffle.png", color: "#f59e0b" },
    { name: "PONTE", image: "/category/fabric-pique.png", color: "#312e81" },
    { name: "SEERSUCKER", image: "/arrivals/prod-slub-melange.png", color: "#7dd3fc" },
    { name: "POLYESTER", image: "/category/fabric-single-jersey.png", color: "#3b82f6" },
    { name: "MELANGE", image: "/arrivals/prod-slub-melange.png", color: "#4b5563" },
    { name: "FLEECE", image: "/category/fabric-single-jersey.png", color: "#14b8a6" },
    { name: "COTTON SPANDEX", image: "/arrivals/prod-cotton-spandex-interlock.png", color: "#c2410c" },
    { name: "COTTON", image: "/category/fabric-single-jersey.png", color: "#ec4899" },
    { name: "VISCOSE", image: "/arrivals/prod-poly-viscose-spandex.png", color: "#14868c" },
    { name: "RIB", image: "/category/fabric-rib.png", color: "#e1a84f" },
    { name: "PIQUE", image: "/category/fabric-pique.png", color: "#e84733" },
    { name: "FRENCH TERRY", image: "/category/fabric-french-terry.png", color: "#4f658c" },
    { name: "WAFFLE", image: "/category/fabric-waffle.png", color: "#5bb2e1" },
    { name: "SINGLE JERSEY", image: "/category/fabric-single-jersey.png", color: "#7f1d1d" },
  ];

  const scrollRef = useRef<HTMLDivElement>(null);

  // Initialize scroll to the middle so user can endlessly scroll left or right
  useEffect(() => {
    if (scrollRef.current) {
      const itemWidth = window.innerWidth >= 768 ? 280 + 24 : 220 + 16;
      // Start in the middle of our 30 sets
      scrollRef.current.scrollLeft = itemWidth * knitStyles.length * 10;
    }
  }, []);

  const scrollLeft = () => {
    if (scrollRef.current) {
      const itemWidth = window.innerWidth >= 768 ? 280 + 24 : 220 + 16;
      scrollRef.current.scrollBy({ left: -itemWidth, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      const itemWidth = window.innerWidth >= 768 ? 280 + 24 : 220 + 16;
      scrollRef.current.scrollBy({ left: itemWidth, behavior: 'smooth' });
    }
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const itemWidth = window.innerWidth >= 768 ? 280 + 24 : 220 + 16;

    // Jump forward if scrolled too far left
    if (scrollLeft < 1500) {
      scrollRef.current.scrollLeft += itemWidth * knitStyles.length * 10;
    }
    // Jump backward if scrolled too far right
    else if (scrollLeft > scrollWidth - clientWidth - 1500) {
      scrollRef.current.scrollLeft -= itemWidth * knitStyles.length * 10;
    }
  };

  // Using 30 sets (150 items) creates a huge native scroll loop buffer
  const extendedStyles = Array(30).fill(knitStyles).flat();

  return (
    <section className="py-12 md:py-24 bg-white overflow-hidden">
      <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-12 text-center relative">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-16 tracking-tight">Choose your Knit Style</h2>
        <div className="relative group/marquee">
          <button onClick={scrollLeft} className="absolute -left-10 md:-left-4 lg:-left-8 top-1/2 -translate-y-1/2 z-20 hidden md:flex hover:scale-110 transition-transform w-12 h-12 items-center justify-center bg-white/80 rounded-full shadow-md cursor-pointer border border-black/5">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
          </button>

          <div className="relative overflow-hidden w-full px-1" style={{ maskImage: "linear-gradient(to right, transparent, black 1%, black 99%, transparent)" }}>
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory pt-2 pb-6 px-4 w-full hide-scroll"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {extendedStyles.map((knit, i) => (
                <div key={`${knit.name}-${i}`} className="relative aspect-square md:aspect-[4/5] w-[220px] md:w-[280px] shrink-0 snap-center rounded-xl overflow-hidden group/card cursor-pointer shadow-[0_4px_18px_rgba(17,17,17,0.08)] hover:shadow-[0_12px_32px_rgba(17,17,17,0.14)] transition-all duration-300">
                  <div className="absolute inset-0" style={{ backgroundColor: knit.color }}></div>
                  <img src={knit.image} alt={knit.name} className="relative z-0 object-cover w-full h-full mix-blend-multiply opacity-60 group-hover/card:scale-110 transition-transform duration-700" />
                  <div className="absolute bottom-4 left-4 z-10 bg-white px-4 py-1.5 rounded-full text-[10px] font-bold text-black tracking-widest shadow-sm uppercase">
                    {knit.name}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button onClick={scrollRight} className="absolute -right-10 md:-right-4 lg:-right-8 top-1/2 -translate-y-1/2 z-20 hidden md:flex hover:scale-110 transition-transform w-12 h-12 items-center justify-center bg-white/80 rounded-full shadow-md cursor-pointer border border-black/5">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
          </button>
        </div>
      </div>
    </section>
  );
}

function SustainableBlendSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const baseLogos = [
    { name: "Banana Fiber", src: "https://texongo.com/wp-content/uploads/2025/12/Banana_f7269dad-a9d2-4553-8572-9fb18786d287_360x.webp", href: "https://texongo.com/product-category/sustainable-blends/banana-fabric/" },
    { name: "Supima", src: "https://texongo.com/wp-content/uploads/2025/12/Supiima_360x-1.webp", href: "https://texongo.com/product-category/blends/supima/" },
    { name: "Lotus Fiber", src: "https://texongo.com/wp-content/uploads/2025/12/Lotus_360x.webp", href: "https://texongo.com/product-category/sustainable-blends/lotus/" },
    { name: "Hemp", src: "https://texongo.com/wp-content/uploads/2025/12/Hemp_ee5107c1-6add-4868-bc46-6d9111850ba3_360x.webp", href: "https://texongo.com/product-category/sustainable-blends/hemp/" },
    { name: "BCI Cotton", src: "https://texongo.com/wp-content/uploads/2025/12/BCI_a1b34c70-fc29-4342-9c45-a8f95375fa51_360x.webp", href: "https://texongo.com/product-category/sustainable-blends/organic-cotton/" },
  ];

  // Create an extended list for infinite-like scrolling and centering
  const logos = [...baseLogos, ...baseLogos, ...baseLogos];

  const scrollToLogo = (index: number) => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const items = Array.from(container.children) as HTMLElement[];
      // We want to scroll to the middle set of logos for better looping
      const targetIndex = index + baseLogos.length;
      const targetItem = items[targetIndex];
      if (targetItem) {
        const scrollLeft = targetItem.offsetLeft - (container.clientWidth / 2) + (targetItem.offsetWidth / 2);
        container.scrollTo({
          left: scrollLeft,
          behavior: 'smooth'
        });
      }
    }
  };

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((current) => {
        const next = (current + 1) % baseLogos.length;
        scrollToLogo(next);
        return next;
      });
    }, 4000); // 4 seconds interval

    return () => clearInterval(interval);
  }, [baseLogos.length, isPaused]);

  // Initial scroll to middle
  useEffect(() => {
    setTimeout(() => scrollToLogo(activeIndex), 100);
  }, []);

  // Removed the useEffect that was firing scrollToLogo on every activeIndex change
  // to prevent fighting with manual scroll/drag interactions.

  const handleScroll = () => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const scrollLeft = container.scrollLeft;
      const clientWidth = container.clientWidth;
      const scrollCenterX = scrollLeft + clientWidth / 2;

      const items = Array.from(container.children) as HTMLElement[];
      let closestIndex = 0;
      let minDistance = Infinity;

      items.forEach((item, index) => {
        const itemCenterX = item.offsetLeft + item.offsetWidth / 2;
        const distance = Math.abs(scrollCenterX - itemCenterX);
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      });

      const mappedIndex = closestIndex % baseLogos.length;
      if (mappedIndex !== activeIndex) {
        setActiveIndex(mappedIndex);
      }
    }
  };

  return (
    <section className="py-12 md:py-24 bg-white overflow-hidden">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-12 md:mb-20 tracking-tight text-black">Sustainable Brand</h2>

        <div className="relative max-w-full mx-auto">
          {/* Scrollable Container with Drag intent */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="flex items-center gap-8 md:gap-24 overflow-x-auto hide-scroll snap-x snap-mandatory cursor-grab active:cursor-grabbing px-6 md:px-[20%] pb-12 pt-4"
          >
            {logos.map((logo, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0.01, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "100px" }}
                transition={{ duration: 0.4, delay: (i % baseLogos.length) * 0.05, ease: "easeOut" }}
                onClick={() => {
                  setActiveIndex(i % baseLogos.length);
                  scrollToLogo(i % baseLogos.length);
                }}
                className="flex flex-col items-center justify-center min-w-[200px] md:min-w-[280px] shrink-0 snap-center transition-all duration-300 cursor-pointer"
              >
                <a
                  href={logo.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-32 md:h-48 flex flex-col items-center justify-center w-full group"
                >
                  <img
                    src={logo.src}
                    alt={logo.name}
                    className={`max-h-24 md:max-h-36 max-w-full object-contain transition-all duration-500 ${activeIndex === (i % baseLogos.length) ? 'scale-110 grayscale-0 opacity-100' : 'scale-90 grayscale opacity-40 group-hover:opacity-60'}`}
                  />
                  <span className={`text-[10px] md:text-xs font-black tracking-[0.3em] mt-8 uppercase transition-all duration-300 ${activeIndex === (i % baseLogos.length) ? 'text-black opacity-100' : 'text-black/20 opacity-40'}`}>
                    {logo.name}
                  </span>
                </a>
              </motion.div>
            ))}
          </div>

          {/* Hidden left/right gradient overlaps (optional, based on design) */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none hidden md:block" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none hidden md:block" />
        </div>

        {/* Pagination Dots (Points) */}
        <div className="flex justify-center items-center gap-3 mt-4">
          {baseLogos.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setActiveIndex(i);
                scrollToLogo(i);
              }}
              className={`h-1.5 transition-all duration-500 rounded-full cursor-pointer ${activeIndex === i
                ? 'w-10 bg-black'
                : 'w-1.5 bg-[#E5E5E5] hover:bg-black/40'
                }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const testimonials = [
    { name: "Kamal Singh", text: "I've ordered several times from Syndicate Cloth House Pvt. Ltd. and the durability never disappoints. Their dense, even stitches mean the fabric resists pilling and lasts a long time. It's affordable for the high quality you get.", sub: "1 review • 3 months ago", rating: 5 },
    { name: "Neeraj Kumar", text: "This mill have Wide range of designer fabrics and different types of textiles available and the owner Mr. Aman and his team shashank ji nature is very nice. Thank you for providing such reliable, high-quality fabrics.", sub: "5 reviews • 3 months ago", rating: 5 },
    { name: "Jeet Sharma", text: "The team was professional, responsive, and very helpful throughout the process. The quality of service exceeded my expectations, and everything was delivered on time. Highly recommended!", sub: "3 reviews • 3 months ago", rating: 5 },
    { name: "Daksh Sharma", text: "Excellent fabric quality and a very professional team. Syndicate Cloth House has a wide variety of knits with consistent quantity. Truly reliable and trusted.", sub: "1 review • 3 months ago", rating: 5 },
    { name: "Krish Arora", text: "Nice collection of knitted fabrics and textured structures. Jacquard quality was good. Overall a decent experience.", sub: "1 review • 3 months ago", rating: 4 },
    { name: "Alice", text: "Good range of single jersey, ribs, and French terry. Reliable supplier. Loved the pointelle and Jacquard fabrics—great texture and finish.", sub: "5 reviews • 2 months ago", rating: 5 },
    { name: "Jigisha Bhatia", text: "Texongo has a wide range of knitted and structured fabrics. Average experience overall.", sub: "8 reviews • 3 months ago", rating: 3.5 },
    { name: "Mamta Narula", text: "Nice variety in ribs, French terry, and other knitted fabrics. Excellent quality Jacquards and structured knits. Very consistent fabric.", sub: "1 review • 2 months ago", rating: 5 },
    { name: "Trending Abstracts", text: "Great quality knit fabrics and very reliable supplier. Consistent materials, fair pricing, & timely delivery. Highly recommended.", sub: "1 review • 2 months ago", rating: 5 },
    { name: "Pavni Manchanda", text: "Absolutely loved the fabric and the service they provided. The entire experience was smooth and delightful!", sub: "4 reviews • 3 months ago", rating: 5 },
    { name: "Neha", text: "Huge collections of basic to Novelty fabrics. Quality fabrics at this store. Staff is very supportive.", sub: "3 reviews • 3 months ago", rating: 5 },
    { name: "Urmila Vaid", text: "Excellent quality of textured knits fabric. Very consistent fabric.", sub: "1 review • 2 months ago", rating: 5 },
    { name: "Mithun Yadav", text: "Good supplier with amazing fabric qualities. Highly recommended. 👌", sub: "3 reviews • 2 months ago", rating: 4.5 },
    { name: "Ansh", text: "Good fabric consistency and finishing across knits fabric. Liked it.", sub: "1 review • 2 months ago", rating: 5 },
    { name: "Punita", text: "I bought terry fabric from Texongo. Nice quality I received.", sub: "1 review • 3 months ago", rating: 4.5 },
    { name: "Premjit Sahoo", text: "Fabric quality achi or range bhi kafi achi h. 👍👍", sub: "1 review • 3 months ago", rating: 4 },
    { name: "Seamless", text: "Best Fabric supplier in India. Little bit expensive but quality is so good it's definitely worth it.", sub: "1 review • 2 years ago", rating: 5 },
    { name: "Kanishka Soni", text: "I purchased their swatch box and was amazed by the idea. If you want to start in the fashion industry, their swatches really help select premium fabrics. Thank you Texongo!", sub: "7 reviews • 3 years ago", rating: 5 },
    { name: "Mansi Vaid", text: "Nice texture and finish in pointelle and Jacquard knits.", sub: "5 reviews • 2 months ago", rating: 5 },
    { name: "Mahaveer Verma", text: "Absolutely love the quality of fabrics! The selection is premium and the materials feel luxurious and durable.", sub: "1 review • 1 year ago", rating: 5 },
    { name: "Priyanshi Sharma", text: "Syndicate Cloth House is a dependable supplier for ribs and single jersey.", sub: "1 review • 2 months ago", rating: 5 },
    { name: "Nitin Baghel", text: "Sampling range is excellent though the place can get busy at times.", sub: "1 review • 3 months ago", rating: 4 }
  ];

  return (
    <section className="relative py-28 overflow-hidden bg-black text-white">
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero/hero-fabrics.jpg"
          alt="Testimonials Background"
          fill
          className="object-cover opacity-60 mix-blend-overlay grayscale-[30%]"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-[1440px] px-6 lg:px-12 text-center">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-white">What Our Customers Say</h2>

          <div className="flex items-center justify-center gap-4">
            <div className="h-[1px] w-12 bg-white/30"></div>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none" className="text-white/80">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            <div className="h-[1px] w-12 bg-white/30"></div>
          </div>
        </div>

        <div className="h-[500px] md:h-[750px] overflow-hidden relative mt-8 md:mt-12">
          {/* Top and Bottom Fades for a seamless look */}
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black to-transparent z-20 pointer-events-none"></div>
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent z-20 pointer-events-none"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 h-full">
            {[
              { items: testimonials.slice(0, 8), duration: 45 },
              { items: testimonials.slice(8, 15), duration: 60, reverse: true },
              { items: testimonials.slice(15), duration: 52 }
            ].map((column, colIdx) => (
              <div key={colIdx} className={`relative h-full overflow-hidden ${colIdx === 1 ? 'hidden md:block' : colIdx === 2 ? 'hidden lg:block' : ''}`}>
                <motion.div
                  className="flex flex-col gap-8"
                  animate={{ y: column.reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
                  transition={{
                    repeat: Infinity,
                    duration: column.duration,
                    ease: "linear"
                  }}
                >
                  {[...column.items, ...column.items].map((t, idx) => (
                    <div key={idx} className="break-inside-avoid bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-8 flex flex-col shadow-xl text-center">
                      <div className="flex justify-center gap-1 mb-6">
                        <svg width="0" height="0" className="absolute">
                          <defs>
                            <linearGradient id="halfStar">
                              <stop offset="50%" stopColor="#FFD700" />
                              <stop offset="50%" stopColor="#333" stopOpacity="1" />
                            </linearGradient>
                          </defs>
                        </svg>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg key={star} xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
                            fill={star <= t.rating ? "#FFD700" : (star - 0.5 === t.rating ? "url(#halfStar)" : "#333")}
                            stroke="none">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-white/80 text-sm leading-relaxed mb-6 font-medium italic">
                        "{t.text}"
                      </p>
                      <div className="mt-auto pt-6 border-t border-white/5">
                        <h4 className="font-bold text-base text-white tracking-wide">{t.name}</h4>
                        <p className="text-[9px] text-white/40 mt-1 uppercase tracking-[0.2em] font-bold">{t.sub}</p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function HomeExperience() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main className="relative overflow-clip bg-[#F9FAFB] text-[#121212]">
      {/* ── HERO ─────────────────────────────────────────── */}
      <ScrollExpandMedia
        mediaType="video"
        mediaSrc="/video/Veo.mp4"
        bgImageSrc="/knit-fabric-hero.png"
        title="PREMIUM KNITS"
        date="COLLECTION 2026"
        scrollToExpand="Scroll to Explore"
        textBlend={true}
      >
        <div className="max-w-4xl mx-auto text-center pb-6 md:pb-10 px-6">
          <h2 className="text-2xl md:text-4xl font-black mb-6 md:mb-8 uppercase tracking-tighter">Crafting the <span className="text-[#57AD43]">Future</span> of Fabric</h2>
          <p className="text-base md:text-xl text-[#475467] font-medium leading-relaxed">
            Texongo combines traditional craftsmanship with cutting-edge 3D visualization.
            Our digital-first approach allows designers to experience the texture, drape,
            and movement of high-performance textiles before the first thread is even woven.
          </p>
        </div>
      </ScrollExpandMedia>



      {/* ── THE STORY ───────────────────────────────────── */}
      <section id="collections" className="relative">
        <ParallaxFeatureSection />
      </section>

      {/* ── STREAMLINE ──────────────────────────────────── */}
      <section className="bg-white overflow-hidden border-y border-black/5">
        <div className="flex flex-col md:flex-row w-full">
          <div className="w-full md:w-1/2 relative min-h-[300px] md:min-h-[500px]">
            <LazyVideo
              src="/video/efficient_en.webm"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          <div className="w-full md:w-1/2 flex flex-col justify-center px-6 py-12 md:p-16 lg:p-24 bg-[#F9FAFB]">
            <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-[#57AD43] mb-4 md:mb-6 block">Innovation</span>
            <h2 className="text-3xl md:text-5xl lg:text-7xl font-black mb-6 md:mb-8 leading-none tracking-tight text-black">
              Streamline Your<br />Fabric Journey
            </h2>
            <p className="text-sm md:text-lg text-black/70 leading-relaxed font-medium max-w-xl">
              Preview texture, drape, movement, and micro-texture in stunning detail with 3D visualization. Sourcing fabric has never been more precise—where innovation meets craftsmanship.
            </p>
            <div className="mt-8 md:mt-12 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 md:gap-6">
              <button className="h-12 md:h-14 px-6 md:px-8 bg-black text-white text-[10px] md:text-xs font-black uppercase tracking-[0.2em] hover:bg-[#57AD43] transition-colors font-bold whitespace-nowrap text-center">
                Book a Demo
              </button>
              <button className="h-12 md:h-14 px-6 md:px-8 bg-transparent text-black text-[10px] md:text-xs font-black uppercase tracking-[0.2em] border-2 border-black/10 hover:border-black transition-colors font-bold whitespace-nowrap text-center">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── CAMPAIGN STORY ─────────────────────────────── */}
      <section id="womenswear" className="bg-white py-20 pb-0">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {storyProducts.map((product) => (
              <StoryProductCard key={product.name} {...product} />
            ))}
          </div>
        </div>
      </section>

      <KnitStylesSection />
      <SustainableBlendSection />
      {/* <TrendyFabricsSection/> */}
      <ProductCatalogSection />

      {/* ── NEW ARRIVALS ─────────────────────────────────── */}
      <section id="fabrics" className="py-16 md:py-24 bg-white border-y border-black/5">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-10 md:mb-16 gap-6 md:gap-8 text-center md:text-left">
            <div className="max-w-xl">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#57AD43] mb-2 md:mb-4 block">New Additions</span>
              <h2 className="text-3xl md:text-6xl font-black leading-none tracking-tight">Newly Added Fabrics</h2>
            </div>
            <Link href="/fabrics" className="inline-block">
              <p className="text-sm font-bold text-black/40 uppercase tracking-widest border-b-2 border-[#57AD43] pb-2 cursor-pointer hover:text-[#57AD43] transition-colors">
                View All Fabrics
              </p>
            </Link>
          </div>

          <div className="-mx-6 lg:-mx-10 overflow-hidden">
            <div className={styles.productTrack}>
              {[...marqueeProducts, ...marqueeProducts].map((product, index) => (
                <MarqueeProductCard
                  key={`${product.name}-${index}`}
                  name={product.name}
                  price={product.price}
                  href={product.href}
                  image={product.image}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <TestimonialsSection />

      <FaqSection />

      <BlogSection />
    </main>
  );
}

// function TrendyFabricsSection() {
//   const models = [
//     { id: 1, image: "/Screenshot 2026-04-16 134454.png" },
//     { id: 2, image: "/Screenshot 2026-04-16 134502.png" },
//     { id: 3, image: "/Screenshot 2026-04-16 134513.png" },
//     { id: 4, image: "/Screenshot 2026-04-16 134521.png" },
//     { id: 5, image: "/Screenshot 2026-04-16 134527.png" },
//   ];

//   return (
//     <section className="py-24 bg-[#c5e3b6] overflow-hidden">
//       <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
//         <div className="flex flex-wrap justify-center gap-4 md:gap-5 mb-16">
//           {models.map((m, idx) => (
//             <motion.div
//               key={idx}
//               initial={{ opacity: 0, y: 50 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
//               viewport={{ once: true }}
//               className="w-[140px] md:w-[220px] h-[220px] md:h-[390px] bg-white/40 backdrop-blur-md rounded-t-full border-2 border-white/50 overflow-hidden relative group shadow-xl"
//             >
//               <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
//               <img 
//                 src={m.image} 
//                 alt="Trendy Fabric Showcase" 
//                 className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out relative z-10"
//               />
//             </motion.div>
//           ))}
//         </div>

//         <div className="text-center space-y-4">
//           <h2 className="text-6xl md:text-8xl font-medium tracking-tight text-[#111111] italic font-serif block">Trendy Fabrics</h2>
//           <p className="text-[#111111]/70 text-lg md:text-xl font-medium tracking-tight max-w-2xl mx-auto">
//             Explore our new seasonal fabrics and create the style you want
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// }

function ProductCatalogSection() {
  const row1 = [
    { name: "POLY SPANDEX MESH", price: "₹750.00", image: "https://texongo.com/wp-content/uploads/2025/10/12DAB4FF-CC73-4155-AC90-8636067A6951-768x769-1-300x300.jpg", href: "https://texongo.com/product/poly-spandex-mesh/" },
    { name: "COTTON FLEECE TERRY", price: "₹799.00", image: "https://texongo.com/wp-content/uploads/2025/11/Z2K6I157_3-768x768-1-300x300.jpg", href: "https://texongo.com/product/cotton-fleece-terry/" },
    { name: "COTTON LINEN SINGLE JERSEY", price: "₹600.00", image: "https://texongo.com/wp-content/uploads/2025/11/image_1a1e365a-2b74-4d96-8165-f7788358c9bd-768x768-1-300x300.jpg", href: "https://texongo.com/product/cotton-linen-single-jersey/" },
    { name: "COTTON LUREX SINGLE JERSEY", price: "₹1,000.00", image: "https://texongo.com/wp-content/uploads/2025/11/image_98606efd-a57d-44e0-b499-1698a9de6130-768x768-1-300x300.jpg", href: "https://texongo.com/product/cotton-lurex-single-jersey/" },
    { name: "COTTON 3X1 RIB", price: "₹999.00", image: "https://texongo.com/wp-content/uploads/2025/11/B5K1I131-3-768x768-1-300x300.jpg", href: "https://texongo.com/product/cotton-3x1-rib/" },
  ];

  const row2 = [
    { name: "POLYESTER POPCORN", price: "₹529.00", image: "https://texongo.com/wp-content/uploads/2025/10/A8K1S101-3-768x768-1-300x300.jpg", href: "https://texongo.com/product/polyester-popcorn/" },
    { name: "COTTON SHIFFLY SINGLE JERSEY", price: "₹1,000.00", image: "https://texongo.com/wp-content/uploads/2025/10/M9K4S107_3-600x600-1-300x300.jpg", href: "https://texongo.com/product/cotton-shiffly-single-jersey/" },
    { name: "POLY COTTON SINGLE JERSEY", price: "₹600.00", image: "https://texongo.com/wp-content/uploads/2025/10/B6K1S116-3-768x768-1-300x300.jpg", href: "https://texongo.com/product/poly-cotton-single-jersey/" },
    { name: "POLY SPANDEX SINGLE JERSEY", price: "₹849.00", image: "https://texongo.com/wp-content/uploads/2025/11/B5K4S151-3-768x768-1-300x300.jpg", href: "https://texongo.com/product/poly-spandex-single-jersey/" },
    { name: "POLY COTTON SPANDEX INTERLOCK", price: "₹650.00", image: "https://texongo.com/wp-content/uploads/2025/10/78_20241105034142pm-600x600-1-300x300.png", href: "https://texongo.com/product/poly-cotton-spandex-interlock/" },
  ];

  return (
    <section className="py-16 md:py-24 bg-white border-b border-black/5 overflow-hidden">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12 mb-8 md:mb-16 text-center md:text-left">
        <h2 className="text-2xl md:text-5xl font-black tracking-tight text-[#111111]">Product Catalog</h2>
      </div>

      <div className="space-y-12">
        {/* Row 1 - Left Loop */}
        <div className={styles.marqueeViewport}>
          <div className={styles.productTrack} style={{ animationDuration: '40s' }}>
            {[...row1, ...row1, ...row1, ...row1].map((p, idx) => (
              <Link key={idx} href={p.href} target="_blank" rel="noopener noreferrer" className={styles.productCard + " group"}>
                <div className="aspect-square bg-[#F9FAFB] border border-black/5 rounded-2xl overflow-hidden mb-6 shadow-sm group-hover:shadow-2xl transition-all duration-700 relative">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  {/* Add to Cart Overlay */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button className="bg-black text-white px-4 py-2 rounded-md flex items-center gap-2 text-[10px] font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></svg>
                      Add to cart
                    </button>
                  </div>
                </div>
                <div className="space-y-1 text-center px-2">
                  <h3 className="text-[10px] md:text-xs font-bold tracking-widest text-[#111111]/50 uppercase">{p.name}</h3>
                  <p className="text-base md:text-lg font-black text-[#111111]">{p.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Row 2 - Right Loop */}
        <div className={styles.marqueeViewport}>
          <div className={styles.productTrack} style={{ animationDuration: '45s', animationDirection: 'reverse' }}>
            {[...row2, ...row2, ...row2, ...row2].map((p, idx) => (
              <Link key={idx} href={p.href} target="_blank" rel="noopener noreferrer" className={styles.productCard + " group"}>
                <div className="aspect-square bg-[#F9FAFB] border border-black/5 rounded-2xl overflow-hidden mb-6 shadow-sm group-hover:shadow-2xl transition-all duration-700 relative">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  {/* Add to Cart Overlay */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button className="bg-black text-white px-4 py-2 rounded-md flex items-center gap-2 text-[10px] font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></svg>
                      Add to cart
                    </button>
                  </div>
                </div>
                <div className="space-y-1 text-center px-2">
                  <h3 className="text-[10px] md:text-xs font-bold tracking-widest text-[#111111]/50 uppercase">{p.name}</h3>
                  <p className="text-base md:text-lg font-black text-[#111111]">{p.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function BlogSection() {
  const blogs = [
    {
      title: "Trump's Trade Policies: Impact on Fashion Imports and Exports",
      image: "https://texongo.com/wp-content/uploads/2026/04/trumps-trade-policies-impact-blog1.png",
      category: "Market Insights",
      link: "https://texongo.com/trumps-trade-policies-impact-on-fashion-imports-and-exports/"
    },
    {
      title: "Behind the Scenes at Texongo: A Day in the Life",
      image: "https://texongo.com/wp-content/uploads/2026/04/Behind-the-Scenes-at-Texongo1.png",
      category: "Culture",
      link: "https://texongo.com/behind-the-scenes-at-texongo-a-day-in-the-life/"
    },
    {
      title: "Cross-Cultural Collaborations in the Digital Fashion Space",
      image: "https://texongo.com/wp-content/uploads/2026/02/how-India-global-designers-are-merging-traditions-with-digital-Innovation.png",
      category: "Innovation",
      link: "https://texongo.com/cross-cultural-collaborations-in-the-digital-fashion-space-how-india-and-global-designers-are-merging-traditions-with-digital-innovation/"
    }
  ];

  return (
    <section className="py-28 bg-[#F9FAFB]">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="flex flex-col items-center mb-20">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#007bff] mb-4">Latest insights</span>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-center text-[#111111]">Our Stories</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {blogs.map((b, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0.01, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.05, ease: "easeOut" }}
              viewport={{ once: true, margin: "100px" }}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700 border border-black/5 flex flex-col h-full"
            >
              <div className="aspect-[16/10] overflow-hidden relative">
                <img src={b.image} alt={b.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
              </div>
              <div className="p-10 space-y-6 flex flex-col flex-1">
                <span className="inline-block bg-[#007bff] text-white text-[9px] font-black px-4 py-1.5 rounded-sm uppercase tracking-widest w-fit shadow-md">
                  {b.category}
                </span>
                <h3 className="text-xl md:text-2xl font-bold leading-[1.3] flex-1 text-[#111111] group-hover:text-[#007bff] transition-colors duration-300">
                  {b.title}
                </h3>
                <Link
                  href={b.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-[#007bff] font-black text-[10px] group/btn w-fit pt-8 uppercase tracking-[0.2em] border-t border-black/5 w-full"
                >
                  Read Full Story
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover/btn:translate-x-1.5 transition-transform duration-300">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
