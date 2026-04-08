"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import styles from "./page.module.css";

const categoryCards = [
  {
    title: "Rib",
    label: "Stretch & Structure",
    caption:
      "A vertically ribbed knit fabric known for its elasticity and body-hugging fit. Ideal for cuffs, collars, and fitted garments. Offers excellent recovery and a clean, classic texture.",
    image: "/category/fabric-rib.png",
    href: "#new-collection",
  },
  {
    title: "Pique",
    label: "Textured Weave",
    caption:
      "A raised honeycomb-textured fabric commonly used in polo shirts and sportswear. Breathable, durable, and structured — it adds refined visual interest to any garment.",
    image: "/category/fabric-pique.png",
    href: "#new-collection",
  },
  {
    title: "French Terry",
    label: "Soft Comfort",
    caption:
      "A looped-back knit with a smooth face and a soft, absorbent interior. Perfect for loungewear, hoodies, and sweatshirts. Lightweight yet warm with excellent drape.",
    image: "/category/fabric-french-terry.png",
    href: "#new-collection",
  },
  {
    title: "Waffle",
    label: "Grid Texture",
    caption:
      "Distinctive grid-patterned thermal knit that offers superior insulation and moisture management. Popular in thermal underlayers, robes, and cozy everyday wear.",
    image: "/category/fabric-waffle.png",
    href: "#new-collection",
  },
  {
    title: "Single Jersey",
    label: "Everyday Essential",
    caption:
      "A lightweight, single-layer plain knit that is soft, smooth, and highly versatile. The go-to fabric for T-shirts and everyday basics — breathable, comfortable, and easy to print on.",
    image: "/category/fabric-single-jersey.png",
    href: "#new-collection",
  },
];

const INTERVAL = 3500;

export function CategorySlider() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragScrollLeft = useRef(0);

  const goTo = useCallback((index: number) => {
    const slider = sliderRef.current;
    if (!slider) return;
    const slide = slider.children[index] as HTMLElement;
    if (!slide) return;
    slider.scrollTo({ left: slide.offsetLeft, behavior: "smooth" });
    setCurrent(index);
  }, []);

  const next = useCallback(() => {
    setCurrent((prev) => {
      const n = (prev + 1) % categoryCards.length;
      const slider = sliderRef.current;
      if (slider) {
        const slide = slider.children[n] as HTMLElement;
        if (slide) slider.scrollTo({ left: slide.offsetLeft, behavior: "smooth" });
      }
      return n;
    });
  }, []);

  // Auto-slide
  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setInterval(next, INTERVAL);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isPaused, next]);

  // Sync dot from scroll position
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    const onScroll = () => {
      if (isDragging.current) return;
      const idx = Math.round(slider.scrollLeft / slider.clientWidth);
      setCurrent(Math.min(idx, categoryCards.length - 1));
    };
    slider.addEventListener("scroll", onScroll, { passive: true });
    return () => slider.removeEventListener("scroll", onScroll);
  }, []);

  // Mouse drag
  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    dragStartX.current = e.pageX;
    dragScrollLeft.current = sliderRef.current?.scrollLeft ?? 0;
    setIsPaused(true);
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !sliderRef.current) return;
    e.preventDefault();
    sliderRef.current.scrollLeft = dragScrollLeft.current - (e.pageX - dragStartX.current);
  };
  const onMouseUp = () => {
    isDragging.current = false;
    // Snap to nearest slide
    const slider = sliderRef.current;
    if (slider) {
      const idx = Math.round(slider.scrollLeft / slider.clientWidth);
      const clamped = Math.max(0, Math.min(idx, categoryCards.length - 1));
      goTo(clamped);
    }
    setTimeout(() => setIsPaused(false), 1200);
  };

  return (
    <div
      className={styles.categoryBackdropOverlap}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => { if (!isDragging.current) setIsPaused(false); }}
    >
      {/* Slider track — wrapped to allow next-slide peek */}
      <div className={styles.categorySliderWrap}>
        <div
          ref={sliderRef}
          className={styles.categorySlider}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setTimeout(() => setIsPaused(false), 1200)}
        >
          {categoryCards.map((card) => (
            <div key={card.title} className={styles.categorySlide}>
              <Link href={card.href} className={styles.categoryCardLink}>
                <div className={styles.categoryCardVisual}>
                  <img
                    src={card.image}
                    alt={`${card.title} fabric texture`}
                    className={styles.categoryFabricImage}
                    draggable={false}
                  />
                  <div aria-hidden className={styles.categoryCardHoverOverlay} />
                  <div className={styles.categoryCardDesc}>
                    <p className={styles.categoryCardDescLabel}>{card.label}</p>
                    <p className={styles.categoryCardDescText}>{card.caption}</p>
                    <span className={styles.categoryCardDescCta}>Explore →</span>
                  </div>
                </div>
                <div className="pt-3 px-1">
                  <h3 className={styles.categoryCardTitleText}>{card.title}</h3>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Dot indicators */}
      <div className={styles.categoryDots}>
        {categoryCards.map((_, i) => (
          <button
            key={i}
            onClick={() => { goTo(i); setIsPaused(true); setTimeout(() => setIsPaused(false), 3000); }}
            className={`${styles.categoryDot} ${i === current ? styles.categoryDotActive : ""}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className={styles.categoryProgress}>
        <div
          key={`${current}-${isPaused}`}
          className={`${styles.categoryProgressBar} ${isPaused ? styles.categoryProgressPaused : ""}`}
          style={{ animationDuration: `${INTERVAL}ms` }}
        />
      </div>
    </div>
  );
}
