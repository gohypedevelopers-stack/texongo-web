"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { LazyVideo } from '../../app/lazy-video';

interface Content {
  heading: string;
  description: string | React.ReactNode;
}

interface PageData {
  leftVideoSrc?: string | null;
  rightVideoSrc?: string | null;
  leftContent: Content | null;
  rightContent: Content | null;
  bgColor: string;
}

const pages: PageData[] = [
  {
    leftVideoSrc: '/video/1-1.mp4',
    rightVideoSrc: null,
    leftContent: null,
    rightContent: {
      heading: "PREMIUM KNITS THAT INSPIRE BEAUTIFUL WOMEN'S WEAR.",
      description:
        "From lightweight essentials to plush winter textures, our knit fabrics offer unmatched versatility. Create dresses, tops, co-ords, or loungewear with materials crafted to drape effortlessly and stand the test of time.",
    },
    bgColor: '#121212',
  },
  {
    leftVideoSrc: null,
    rightVideoSrc: '/video/2-1.mp4',
    leftContent: {
      heading: 'BOLD FABRICS FOR THE MODERN MAN',
      description:
        "From sharp office attire to effortless weekend looks, our fabrics are crafted to offer true versatility—adapting flawlessly to every mood, moment, and season.",
    },
    rightContent: null,
    bgColor: '#57AD43',
  },

];

export default function ScrollAdventure() {
  const numOfPages = pages.length;
  const [currentPage, setCurrentPage] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrolling = useRef(false);
  const reachedEnd = useRef(false);   // true after user scrolls down on last page once
  const reachedStart = useRef(false); // true after user scrolls up on first page once
  const animTime = 900;

  // Track when section leaves viewport — reset flags
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          reachedEnd.current = false;
          reachedStart.current = false;
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Check if section covers most of the viewport
  const isSectionFullyVisible = () => {
    if (!containerRef.current) return false;
    const rect = containerRef.current.getBoundingClientRect();
    const vh = window.innerHeight;
    // How much of the section is visible in viewport
    const visibleTop = Math.max(rect.top, 0);
    const visibleBottom = Math.min(rect.bottom, vh);
    const visibleHeight = Math.max(0, visibleBottom - visibleTop);
    // Trigger when 85%+ of viewport is covered by this section
    return visibleHeight / vh >= 0.85;
  };

  // Wheel handler: lock outer scroll, two-step unlock at boundaries
  const handleWheel = useCallback(
    (e: WheelEvent) => {
      // Only lock when section fully fills the viewport
      if (!isSectionFullyVisible()) return;

      // Block ALL events during page transition animation
      // This prevents leftover momentum from triggering boundary unlock
      if (scrolling.current) {
        e.preventDefault();
        return;
      }

      const goingDown = e.deltaY > 0;
      const atStart = currentPage === 0;
      const atEnd = currentPage === numOfPages - 1;

      // Two-step unlock going DOWN from last page
      if (atEnd && goingDown) {
        if (reachedEnd.current) {
          // Second scroll at end → release outer scroll
          return;
        }
        // First scroll at end → mark as completed, still block
        e.preventDefault();
        reachedEnd.current = true;
        return;
      }

      // Two-step unlock going UP from first page
      if (atStart && !goingDown) {
        if (reachedStart.current) {
          return;
        }
        e.preventDefault();
        reachedStart.current = true;
        return;
      }

      // Reset boundary flags when navigating away from edges
      reachedEnd.current = false;
      reachedStart.current = false;

      // Block outer scroll and navigate inner pages
      e.preventDefault();

      if (scrolling.current) return;
      scrolling.current = true;

      setCurrentPage((p) => (goingDown ? Math.min(p + 1, numOfPages - 1) : Math.max(p - 1, 0)));

      setTimeout(() => {
        scrolling.current = false;
      }, animTime);
    },
    [currentPage, numOfPages]
  );

  // Keyboard support
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isSectionFullyVisible() || scrolling.current) return;

      const atStart = currentPage === 0;
      const atEnd = currentPage === numOfPages - 1;

      if (e.key === 'ArrowDown' && !atEnd) {
        e.preventDefault();
        reachedEnd.current = false;
        scrolling.current = true;
        setCurrentPage((p) => p + 1);
        setTimeout(() => (scrolling.current = false), animTime);
      } else if (e.key === 'ArrowUp' && !atStart) {
        e.preventDefault();
        reachedStart.current = false;
        scrolling.current = true;
        setCurrentPage((p) => p - 1);
        setTimeout(() => (scrolling.current = false), animTime);
      }
    },
    [currentPage, numOfPages]
  );

  useEffect(() => {
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleWheel, handleKeyDown]);

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Premium Font Injection */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
        
        .font-editorial-heading {
          font-family: 'Playfair Display', serif;
        }
        .font-jakarta {
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
      ` }} />

      {/* Animated background */}
      <div
        className="absolute inset-0 transition-colors duration-700 ease-in-out"
        style={{ backgroundColor: pages[currentPage].bgColor }}
      />

      {/* Pages */}
      {pages.map((page, i) => {
        const isCurrent = currentPage === i;
        const isPast = currentPage > i;

        // Left half: enters from bottom, exits to top
        let leftY = '0%';
        if (isPast) leftY = '-100%';
        if (!isCurrent && !isPast) leftY = '100%';

        // Right half: enters from top, exits to bottom (opposite)
        let rightY = '0%';
        if (isPast) rightY = '100%';
        if (!isCurrent && !isPast) rightY = '-100%';

        return (
          <div
            key={i}
            className="absolute inset-0"
            style={{
              zIndex: isCurrent ? 10 : isPast ? 5 : 1,
              pointerEvents: isCurrent ? 'auto' : 'none',
            }}
          >
            {/* Left Half */}
            <div
              className="absolute top-0 left-0 w-full md:w-1/2 h-1/2 md:h-full will-change-transform"
              style={{
                transform: `translateY(${leftY})`,
                transition: `transform ${animTime}ms cubic-bezier(0.76, 0, 0.24, 1)`,
              }}
            >
              <div className="w-full h-full relative overflow-hidden">
                {page.leftVideoSrc && (
                  <LazyVideo
                    src={page.leftVideoSrc}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}

                <div className="relative flex flex-col items-center justify-center h-full text-white p-6 md:p-12 font-jakarta">
                  {page.leftContent && (
                    <div className="max-w-lg">
                      <span className="text-[11px] font-bold uppercase tracking-[0.5em] text-white/40 mb-6 block">
                        TEXONGO COLLECTION
                      </span>
                      <h2 className="text-4xl md:text-5xl lg:text-7xl font-editorial-heading font-black mb-8 tracking-tighter leading-[1.05]">
                        {page.leftContent.heading}
                      </h2>
                      <p className="text-base md:text-lg font-normal opacity-70 leading-relaxed max-w-md mb-10">
                        {page.leftContent.description}
                      </p>
                      <a
                        href="https://texongo.com/shop/"
                        className="inline-flex items-center h-14 px-10 border border-white/30 bg-white/5 backdrop-blur-sm text-white text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all duration-500 rounded-full"
                      >
                        Explore More
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Half */}
            <div
              className="absolute top-1/2 md:top-0 md:left-1/2 w-full md:w-1/2 h-1/2 md:h-full will-change-transform"
              style={{
                transform: `translateY(${rightY})`,
                transition: `transform ${animTime}ms cubic-bezier(0.76, 0, 0.24, 1)`,
              }}
            >
              <div className="w-full h-full relative overflow-hidden">
                {page.rightVideoSrc && (
                  <LazyVideo
                    src={page.rightVideoSrc}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}

                <div className="relative flex flex-col items-center justify-center h-full text-white p-6 md:p-12 font-jakarta">
                  {page.rightContent && (
                    <div className="max-w-lg">
                      <span className="text-[11px] font-bold uppercase tracking-[0.5em] text-white/40 mb-6 block">
                        TEXONGO COLLECTION
                      </span>
                      <h2 className="text-4xl md:text-5xl lg:text-7xl font-editorial-heading font-black mb-8 tracking-tighter leading-[1.05]">
                        {page.rightContent.heading}
                      </h2>
                      {typeof page.rightContent.description === 'string' ? (
                        <p className="text-base md:text-lg font-normal opacity-70 leading-relaxed max-w-md mb-10">
                          {page.rightContent.description}
                        </p>
                      ) : (
                        <div className="text-base md:text-lg font-normal opacity-70 leading-relaxed max-w-md mb-10">
                          {page.rightContent.description}
                        </div>
                      )}
                      <a
                        href="https://texongo.com/shop/"
                        className="inline-flex items-center h-14 px-10 border border-white/30 bg-white/5 backdrop-blur-sm text-white text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all duration-500 rounded-full"
                      >
                        Explore More
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Page Indicators */}
      <div className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
        {pages.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              if (scrolling.current) return;
              setCurrentPage(i);
              reachedEnd.current = false;
              reachedStart.current = false;
            }}
            className={`w-1.5 transition-all duration-500 rounded-full cursor-pointer outline-none ${currentPage === i ? 'h-10 bg-white' : 'h-2 bg-white/25 hover:bg-white/50'
              }`}
            aria-label={`Go to page ${i + 1}`}
          />
        ))}
      </div>

      {/* Scroll Hint */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 transition-opacity duration-700 ${currentPage === 0 ? 'opacity-100' : 'opacity-0'
          }`}
      >
        <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/40">Scroll</span>
        <div className="w-5 h-8 border-2 border-white/20 rounded-full flex items-start justify-center p-1">
          <div className="w-1 h-2 bg-white/60 rounded-full animate-bounce" />
        </div>
      </div>
    </div>
  );
}
