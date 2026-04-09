"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import { CategorySlider } from "./category-slider";
import { FaqSection } from "./faq-section";
import { ParallaxText } from "./parallax-text";
import { LazyVideo } from "./lazy-video";
import { ScrollingFeatureShowcase } from "../components/ui/interactive-scrolling-story-component";
import ScrollExpandMedia from "../components/ui/scroll-expansion-hero";

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
    name: "Premium Women's Wear",
    price: "From INR 1,890",
    video: "/video/7.mp4",
    alt: "Texongo premium womenswear editorial look",
    word: "Soft",
    href: "#new-collection",
    tone: "#dbe8ea",
  },
  {
    name: "Digital Print Edit",
    price: "From INR 1,650",
    video: "/video/Untitled-design-1.mp4",
    alt: "Texongo studio fashion story in bold red",
    word: "Bold",
    href: "#new-collection",
    tone: "#f4ddd9",
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
  price,
  video,
  alt,
  word,
  href,
  tone,
}: {
  name: string;
  price: string;
  video: string;
  alt: string;
  word: string;
  href: string;
  tone: string;
}) {
  return (
    <article className={styles.storyProductCard}>
      <Link
        href={href}
        className={styles.storyProductVisual}
        style={{ backgroundColor: tone }}
      >
        <LazyVideo
          src={video}
          aria-label={alt}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <span className={styles.storyProductWord}>{word}</span>
      </Link>

      <div className="mt-8 flex justify-between items-end">
        <div>
          <h3 className={styles.storyProductName}>{name}</h3>
          <p className={styles.storyProductPrice}>{price}</p>
        </div>
        <Link href={href} className="group flex items-center gap-2 text-sm font-bold tracking-widest uppercase py-2">
          Shop Now
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </article>
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
        mediaSrc="/video/Veo_Prompt_—_TEXONGO_Fabrics_.mp4"
        bgImageSrc="/fabric-bg-clean.png"
        title="PREMIUM TEXTILES"
        date="COLLECTION 2026"
        scrollToExpand="Scroll to Explore"
        textBlend={true}
      >
        <div className="max-w-4xl mx-auto text-center py-20">
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
        <ScrollingFeatureShowcase />
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
      <section id="womenswear" className="bg-[#FBF9F4] py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="max-w-3xl mb-24">
            <p className="text-3xl md:text-5xl font-black leading-tight tracking-tight">
              TEXONGO CREATES FABRICS THAT BRING TOGETHER <span className="text-brand-green">STYLE AND COMFORT</span> FOR THE MODERN WOMAN.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {storyProducts.map((product) => (
              <StoryProductCard key={product.name} {...product} />
            ))}
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
