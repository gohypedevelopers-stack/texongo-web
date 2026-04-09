"use client";
import React, { useState, useEffect, useRef } from 'react';
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
    leftVideoSrc: '/video/FAB%202%20DES%202C.mp4',
    rightVideoSrc: null,
    leftContent: null,
    rightContent: {
      heading: 'Exquisite Weaves',
      description: 'Discover the rhythm of design in every thread. Our premium textures are captured with cinematic precision.',
    },
    bgColor: '#121212',
  },
  {
    leftVideoSrc: null,
    rightVideoSrc: '/video/FAB%202%20DES%202A.mp4',
    leftContent: {
      heading: 'Artisan Quality',
      description: 'Experience the perfect blend of traditional craftsmanship and modern material science.',
    },
    rightContent: null,
    bgColor: '#57AD43',
  },
  {
    leftVideoSrc: '/video/Veo_Prompt_-_TEXONGO_Fabrics_.mp4',
    rightVideoSrc: null,
    leftContent: null,
    rightContent: {
      heading: 'Digital Innovation',
      description: 'Visualizing the future of textiles through digital-first collection design and sustainable sourcing.',
    },
    bgColor: '#14868c',
  },
];

export default function ScrollAdventure() {
  const [currentPage, setCurrentPage] = useState(1);
  const numOfPages = pages.length;
  const animTime = 1000;
  const scrolling = useRef(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        isInView.current = entry.isIntersecting;
      },
      { threshold: 0.8 }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const navigateUp = () => {
    if (currentPage > 1) setCurrentPage(p => p - 1);
  };

  const navigateDown = () => {
    if (currentPage < numOfPages) setCurrentPage(p => p + 1);
  };

  const handleWheel = (e: WheelEvent) => {
    if (!isInView.current) return;

    const isScrollingDown = e.deltaY > 0;
    const isAtEnd = currentPage === numOfPages;
    const isAtStart = currentPage === 1;

    if ((isAtEnd && isScrollingDown) || (isAtStart && !isScrollingDown)) {
      return;
    }

    if (e.cancelable) e.preventDefault();
    
    if (scrolling.current) return;
    scrolling.current = true;
    (isScrollingDown) ? navigateDown() : navigateUp();
    setTimeout(() => (scrolling.current = false), animTime);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!isInView.current || scrolling.current) return;
    
    const isAtEnd = currentPage === numOfPages;
    const isAtStart = currentPage === 1;

    if (e.key === 'ArrowUp' && !isAtStart) {
      e.preventDefault();
      scrolling.current = true;
      navigateUp();
      setTimeout(() => (scrolling.current = false), animTime);
    } else if (e.key === 'ArrowDown' && !isAtEnd) {
      e.preventDefault();
      scrolling.current = true;
      navigateDown();
      setTimeout(() => (scrolling.current = false), animTime);
    }
  };

  useEffect(() => {
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentPage, numOfPages]);

  return (
    <div 
      ref={containerRef}
      className="relative overflow-hidden h-screen transition-colors duration-1000 ease-in-out w-full"
      style={{ backgroundColor: pages[currentPage - 1].bgColor }}
    >
      {pages.map((page, i) => {
        const idx = i + 1;
        const isActive = currentPage === idx;
        const upOff = 'translateY(-100%)';
        const downOff = 'translateY(100%)';
        
        const leftTrans = isActive ? 'translateY(0)' : downOff;
        const rightTrans = isActive ? 'translateY(0)' : upOff;

        return (
          <div key={idx} className={`absolute inset-0 z-${isActive ? '10' : '0'}`}>
            {/* Left Half */}
            <div
              className="absolute top-0 left-0 w-full md:w-1/2 h-1/2 md:h-full transition-transform duration-[1000ms] ease-in-out"
              style={{ transform: leftTrans }}
            >
              <div className="w-full h-full relative overflow-hidden">
                {page.leftVideoSrc && (
                  <LazyVideo 
                    src={page.leftVideoSrc}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-black/40" />
                <div className="relative flex flex-col items-center justify-center h-full text-white p-8">
                  {page.leftContent && (
                    <div className="max-w-md">
                      <h2 className="text-3xl md:text-5xl font-black uppercase mb-6 text-center tracking-tighter">
                        {page.leftContent.heading}
                      </h2>
                      <p className="text-sm md:text-lg text-center font-medium opacity-90 leading-relaxed">
                        {page.leftContent.description}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Half */}
            <div
              className="absolute top-1/2 md:top-0 md:left-1/2 w-full md:w-1/2 h-1/2 md:h-full transition-transform duration-[1000ms] ease-in-out"
              style={{ transform: rightTrans }}
            >
              <div className="w-full h-full relative overflow-hidden">
                {page.rightVideoSrc && (
                  <LazyVideo 
                    src={page.rightVideoSrc}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-black/40" />
                <div className="relative flex flex-col items-center justify-center h-full text-white p-8">
                  {page.rightContent && (
                    <div className="max-w-md">
                      <h2 className="text-3xl md:text-5xl font-black uppercase mb-6 text-center tracking-tighter">
                        {page.rightContent.heading}
                      </h2>
                      {typeof page.rightContent.description === 'string' ? (
                        <p className="text-sm md:text-lg text-center font-medium opacity-90 leading-relaxed">
                          {page.rightContent.description}
                        </p>
                      ) : (
                        <div className="text-sm md:text-lg text-center font-medium opacity-90 leading-relaxed">
                          {page.rightContent.description}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
      
      {/* Scroll Indicators */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4">
        {pages.map((_, i) => (
          <div 
            key={i} 
            className={`w-1 transition-all duration-500 rounded-full ${currentPage === i + 1 ? 'h-8 bg-white' : 'h-2 bg-white/20'}`} 
          />
        ))}
      </div>
    </div>
  );
}
