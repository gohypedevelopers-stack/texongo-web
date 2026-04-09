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
        className="w-full relative aspect-square bg-transparent mb-8 flex items-center justify-center overflow-hidden shadow-none"
      >
        <LazyVideo
          src={video}
          aria-label={alt}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', mixBlendMode: 'multiply' }}
        />
      </Link>

      <h3 className="text-3xl font-bold mb-4 tracking-tight">{name}</h3>
      <p className="text-[#121212]/80 text-sm font-medium max-w-sm mb-10 leading-relaxed">
        {desc}
      </p>

      <Link
        href={href}
        className="inline-flex items-center justify-center gap-2 bg-[#57AD43] text-white px-8 py-3 rounded-full font-bold text-sm tracking-wide shadow-md hover:bg-[#489935] transition-colors"
      >
        Shop Now
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 16l4-4-4-4" /><path d="M8 12h8" /></svg>
      </Link>
    </article>
  );
}

function KnitStylesSection() {
  const knitStyles = [
    { name: "VISCOSE", image: "/category/fabric-single-jersey.png", color: "#14868c" },
    { name: "RIB", image: "/category/fabric-rib.png", color: "#e1a84f" },
    { name: "PIQUE", image: "/category/fabric-pique.png", color: "#e84733" },
    { name: "FRENCH TERRY", image: "/category/fabric-french-terry.png", color: "#4f658c" },
    { name: "WAFFLE", image: "/category/fabric-waffle.png", color: "#5bb2e1" },
  ];

  const scrollRef = useRef<HTMLDivElement>(null);

  // Initialize scroll to the middle so user can endlessly scroll left or right
  useEffect(() => {
    if (scrollRef.current) {
      const itemWidth = window.innerWidth >= 768 ? 280 + 24 : 220 + 16;
      // Start in the middle of our 30 sets
      scrollRef.current.scrollLeft = itemWidth * 5 * 10;
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
      scrollRef.current.scrollLeft += itemWidth * 5 * 10;
    }
    // Jump backward if scrolled too far right
    else if (scrollLeft > scrollWidth - clientWidth - 1500) {
      scrollRef.current.scrollLeft -= itemWidth * 5 * 10;
    }
  };

  // Using 30 sets (150 items) creates a huge native scroll loop buffer
  const extendedStyles = Array(30).fill(knitStyles).flat();

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12 text-center relative">
        <h2 className="text-4xl font-bold mb-16 tracking-tight">Choose your Knit Style</h2>
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
    { name: "Banana Fiber", src: "https://texongo.com/wp-content/uploads/2025/12/Banana_f7269dad-a9d2-4553-8572-9fb18786d287_360x.webp" },
    { name: "Supima", src: "https://texongo.com/wp-content/uploads/2025/12/Supiima_360x-1.webp" },
    { name: "Lotus Fiber", src: "https://texongo.com/wp-content/uploads/2025/12/Lotus_360x.webp" },
    { name: "Hemp", src: "https://texongo.com/wp-content/uploads/2025/12/Hemp_ee5107c1-6add-4868-bc46-6d9111850ba3_360x.webp" },
    { name: "BCI Cotton", src: "https://texongo.com/wp-content/uploads/2025/12/BCI_a1b34c70-fc29-4342-9c45-a8f95375fa51_360x.webp" },
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
        <h2 className="text-3xl md:text-4xl font-bold mb-12 md:mb-20 tracking-tight text-black">Sustainable Brand</h2>

        <div className="relative max-w-full mx-auto">
          {/* Scrollable Container with Drag intent */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="flex items-center gap-12 md:gap-24 overflow-x-auto hide-scroll snap-x snap-mandatory cursor-grab active:cursor-grabbing px-12 md:px-[20%] pb-12 pt-4"
          >
            {logos.map((logo, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                onClick={() => {
                  setActiveIndex(i % baseLogos.length);
                  scrollToLogo(i % baseLogos.length);
                }}
                className="flex flex-col items-center justify-center min-w-[200px] md:min-w-[280px] shrink-0 snap-center transition-all duration-300 cursor-pointer"
              >
                <div className="h-32 md:h-48 flex flex-col items-center justify-center w-full group">
                  <img
                    src={logo.src}
                    alt={logo.name}
                    className={`max-h-24 md:max-h-36 max-w-full object-contain transition-all duration-500 ${activeIndex === (i % baseLogos.length) ? 'scale-110 grayscale-0 opacity-100' : 'scale-90 grayscale opacity-40 group-hover:opacity-60'}`}
                  />
                  <span className={`text-[10px] md:text-xs font-black tracking-[0.3em] mt-8 uppercase transition-all duration-300 ${activeIndex === (i % baseLogos.length) ? 'text-black opacity-100' : 'text-black/20 opacity-40'}`}>
                    {logo.name}
                  </span>
                </div>
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
    {
      name: "Neha Verma",
      text: "The material quality of fabrics are excellent and prices of fabrics are reasonable. I loved how fabrics could be visualized digitally before ordering."
    },
    {
      name: "Amrita Malhan",
      text: "This website saved me time and money. Their digital fabric previews helped me decide instantly, and the delivered fabric was absolutely good."
    },
    {
      name: "Amit Mittal",
      text: "From gym wear to party and casual, fabrics here are all available. The 3D visualization is good and the customer service was also good."
    }
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
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-white">What Our Customers Say</h2>

          <div className="flex items-center justify-center gap-4">
            <div className="h-[1px] w-12 bg-white/30"></div>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none" className="text-white/80">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            <div className="h-[1px] w-12 bg-white/30"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-black/50 backdrop-blur-md rounded border border-white/10 p-8 flex flex-col justify-between h-full min-h-[200px] shadow-lg">
              <p className="text-white/80 text-sm leading-relaxed mb-8 flex-1 text-center font-medium">
                {t.text}
              </p>
              <h4 className="text-center font-bold text-lg text-white mt-auto">{t.name}</h4>
            </div>
          ))}
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
    <main className="relative overflow-x-hidden bg-[#F9FAFB] text-[#121212]">
      {/* ── HERO ─────────────────────────────────────────── */}
      <ScrollExpandMedia
        mediaType="video"
        mediaSrc="/video/Untitled-design-1-1.mp4"
        bgImageSrc="/fabric-bg-clean.png"
        title="PREMIUM TEXTILES"
        date="COLLECTION 2026"
        scrollToExpand="Scroll to Explore"
        textBlend={true}
      >
        <div className="max-w-4xl mx-auto text-center pb-10">
          <h2 className="text-4xl md:text-5xl font-black mb-8 uppercase tracking-tighter">Crafting the <span className="text-[#57AD43]">Future</span> of Fabric</h2>
          <p className="text-xl text-[#475467] font-medium leading-relaxed">
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
      <section className="bg-white py-0 overflow-hidden border-y border-black/5">
        <div className={styles.streamlineGrid}>
          <div className={styles.streamlineVideoWrap}>
            <LazyVideo
              src="/video/efficient_en.webm"
              className={styles.streamlineVideo}
            />
          </div>

          <div className={styles.streamlineContent}>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-green mb-6 block">Innovation</span>
            <h2 className={styles.streamlineHeading}>
              Streamline Your<br />Fabric Journey
            </h2>
            <p className={styles.streamlineBody}>
              Preview texture, drape, movement, and micro-texture in stunning detail with 3D visualization. Sourcing fabric has never been more precise—where innovation meets craftsmanship.
            </p>
            <div className="mt-12 flex items-center gap-6">
              <button className="h-14 px-8 bg-black text-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-brand-green transition-colors">
                Book a Demo
              </button>
              <button className="text-[10px] font-black uppercase tracking-[0.2em] border-b-2 border-black/10 pb-1">
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

      <TestimonialsSection />



      {/* ── NEW ARRIVALS ─────────────────────────────────── */}
      <section id="fabrics" className="py-24 bg-white">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-xl">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-green mb-4 block">New Additions</span>
              <h2 className="text-5xl md:text-7xl font-black leading-none tracking-tight">Newly Added Fabrics</h2>
            </div>
            <p className="text-sm font-bold text-black/40 uppercase tracking-widest border-b-2 border-brand-green pb-2 cursor-pointer hover:text-brand-green transition-colors">
              View All Fabrics
            </p>
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

      <section id="faq" className={`${styles.faqSection} overflow-hidden bg-[#f3efe8] pt-11 pb-5 sm:pt-[3.75rem] sm:pb-9`}>
        <div className={styles.sectionBackdropIntro}>
          <p className={styles.sectionBackdropEyebrowLight}>Need help?</p>
          <ParallaxText className={styles.faqHeading} speed={0.4}>
            FAQs
          </ParallaxText>
        </div>
        <FaqSection />
      </section>

      <footer id="footer" className="bg-[#000000] text-white pt-32 pb-16 overflow-hidden">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
          <div className="relative z-10">
            {/* ── ACTIONS & INFO ──────────────────────────── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 pt-20 border-t border-white/10">
              <div>
                <p className="text-sm font-bold uppercase tracking-widest mb-10 max-w-sm leading-relaxed">
                  Get updates on fabric drops, clothing launches, and wholesale offers.
                </p>

                <div className="flex flex-col gap-6 max-w-md">
                  <div className="relative">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40 block mb-2">Email</label>
                    <input
                      type="email"
                      placeholder="YOUR@EMAIL.COM"
                      className="w-full bg-transparent border-b border-white/20 pb-4 text-white font-bold tracking-widest focus:border-white transition-colors uppercase outline-none"
                    />
                  </div>
                  <button type="button" className="w-fit px-12 py-5 border border-white/20 font-black uppercase tracking-[0.3em] text-[10px] hover:bg-white hover:text-black transition-all rounded-sm mt-4">
                    Subscribe
                  </button>
                  <label className="flex items-center gap-3 cursor-pointer group mt-4">
                    <input type="checkbox" className="w-4 h-4 accent-[#57AD43]" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 group-hover:text-white/60 transition-colors">I agree to the Texongo privacy policy.</span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-12 lg:pl-10">
                {[
                  { title: "Brand", links: ["Women's wear", "Digital print", "About Texongo"] },
                  { title: "Client Service", links: ["Contact", "FAQ", "Shipping and returns"] },
                  { title: "Follow Us", links: ["Instagram", "Pinterest", "WhatsApp"] }
                ].map((col) => (
                  <div key={col.title}>
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-10">{col.title}</h4>
                    <ul className="flex flex-col gap-5">
                      {col.links.map((link) => (
                        <li key={link}>
                          <a href="#" className="text-sm font-bold text-white/80 hover:text-[#57AD43] transition-colors">
                            {link}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-32 flex flex-col md:flex-row justify-between items-center gap-8 text-white/20">
              <p className="text-[10px] font-black uppercase tracking-[0.4em]">
                © {new Date().getFullYear()} TEXONGO FABRICS. All rights reserved.
              </p>
              <div className="flex gap-10">
                <a href="#" className="text-[10px] font-black uppercase tracking-widest hover:text-white">Privacy Policy</a>
                <a href="#" className="text-[10px] font-black uppercase tracking-widest hover:text-white">Terms of Use</a>
              </div>
            </div>
          </div>
        </div>
      </footer>


    </main>
  );
}
