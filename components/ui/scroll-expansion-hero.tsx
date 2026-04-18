'use client';

import {
  useEffect,
  useRef,
  useState,
  ReactNode,
} from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface ScrollExpandMediaProps {
  mediaType?: 'video' | 'image';
  mediaSrc: string;
  posterSrc?: string;
  bgImageSrc: string;
  title?: string;
  date?: string;
  scrollToExpand?: string;
  textBlend?: boolean;
  children?: ReactNode;
}

const ScrollExpandMedia = ({
  mediaType = 'video',
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  date,
  scrollToExpand,
  textBlend,
  children,
}: ScrollExpandMediaProps) => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [showContent, setShowContent] = useState<boolean>(false);
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState<boolean>(false);
  const touchStartYRef = useRef<number>(0);
  const [isMobileState, setIsMobileState] = useState<boolean>(false);

  const sectionRef = useRef<HTMLDivElement | null>(null);

  // Ref for state ensures listeners always have the latest data
  const stateRef = useRef({ progress: 0, expanded: false });

  useEffect(() => {
    stateRef.current = { progress: scrollProgress, expanded: mediaFullyExpanded };
    // Safety: ensure body is restored if fully expanded
    if (mediaFullyExpanded) document.body.style.overflow = '';
  }, [scrollProgress, mediaFullyExpanded]);

  // Global cleanup
  useEffect(() => {
    return () => { document.body.style.overflow = ''; };
  }, []);

  // Initialization: handles refresh and mount
  useEffect(() => {
    const detectInitialState = () => {
      if (window.scrollY > 150) {
        setScrollProgress(1);
        setShowContent(true);
        setMediaFullyExpanded(true);
      } else {
        setScrollProgress(0);
        setShowContent(false);
        setMediaFullyExpanded(false);
      }
    };

    const checkIfMobile = () => setIsMobileState(window.innerWidth < 768);

    checkIfMobile();
    const timer = setTimeout(detectInitialState, 150);

    window.addEventListener('resize', checkIfMobile);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  // Main interaction logic
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const { progress, expanded } = stateRef.current;
      const currentScroll = window.scrollY;
      const isAtTop = currentScroll < 10;
      const isMidExpansion = progress > 0 && progress < 1;

      // Expansion/Contraction Phase
      if (isMidExpansion || (isAtTop && !expanded) || (isAtTop && expanded && e.deltaY < 0)) {
        if (e.cancelable) e.preventDefault();

        const scrollDelta = e.deltaY * 0.0015;
        const newProgress = Math.min(Math.max(progress + scrollDelta, 0), 1);
        
        if (newProgress >= 0.96) {
          setScrollProgress(1);
          setMediaFullyExpanded(true);
          setShowContent(true);
        } else {
          setScrollProgress(newProgress);
          setMediaFullyExpanded(false);
          if (newProgress < 0.7) setShowContent(false);
        }

        if (newProgress < 1 && currentScroll > 0) {
          window.scrollTo({ top: 0, behavior: 'auto' });
        }
      }
    };

    const handleTouchStart = (e: TouchEvent) => { 
      touchStartYRef.current = e.touches[0].clientY; 
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartYRef.current) return;
      
      const { progress, expanded } = stateRef.current;
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartYRef.current - touchY;
      const currentScroll = window.scrollY;
      
      // We consider ourselves "at top" more leniently on mobile to account for elastic bounce
      const isAtTop = currentScroll <= 15;
      const isMidExpansion = progress > 0 && progress < 1;

      // Swiping UP (to scroll DOWN)
      if (deltaY > 0) {
        if (isMidExpansion || (isAtTop && !expanded)) {
          if (e.cancelable) e.preventDefault();
          const scrollDelta = deltaY * 0.008;
          const newProgress = Math.min(Math.max(progress + scrollDelta, 0), 1);
          
          setScrollProgress(newProgress);
          if (newProgress >= 0.96) {
            setMediaFullyExpanded(true);
            setShowContent(true);
          }
          
          if (newProgress < 1 && currentScroll > 0) {
            window.scrollTo({ top: 0, behavior: 'auto' });
          }
          touchStartYRef.current = touchY;
        }
      } 
      // Swiping DOWN (to scroll UP / COLLAPSE)
      else if (deltaY < 0) {
        if (isMidExpansion || (isAtTop && expanded)) {
          if (e.cancelable) e.preventDefault();
          const scrollDelta = deltaY * 0.008;
          const newProgress = Math.min(Math.max(progress + scrollDelta, 0), 1);
          
          setScrollProgress(newProgress);
          setMediaFullyExpanded(false);
          if (newProgress < 0.7) setShowContent(false);
          
          if (currentScroll > 0) {
            window.scrollTo({ top: 0, behavior: 'auto' });
          }
          touchStartYRef.current = touchY;
        }
      }
    };

    window.addEventListener('wheel', handleWheel as unknown as EventListener, { passive: false });
    window.addEventListener('touchstart', handleTouchStart as unknown as EventListener, { passive: false });
    window.addEventListener('touchmove', handleTouchMove as unknown as EventListener, { passive: false });
    window.addEventListener('touchend', () => { touchStartYRef.current = 0; });

    return () => {
      window.removeEventListener('wheel', handleWheel as unknown as EventListener);
      window.removeEventListener('touchstart', handleTouchStart as unknown as EventListener);
      window.removeEventListener('touchmove', handleTouchMove as unknown as EventListener);
    };
  }, []);

  const mediaWidth = 300 + scrollProgress * (isMobileState ? 700 : 1620);
  const mediaHeight = 400 + scrollProgress * (isMobileState ? 400 : 850);
  const textTranslateX = scrollProgress * (isMobileState ? 180 : 150);

  const firstWord = title ? title.split(' ')[0] : '';
  const restOfTitle = title ? title.split(' ').slice(1).join(' ') : '';

  return (
    <div ref={sectionRef} className='transition-colors duration-700 ease-in-out overflow-x-hidden'>
      <section className='relative flex flex-col items-center justify-start min-h-[100dvh]'>
        <div className='relative w-full flex flex-col items-center min-h-[100dvh]'>
          <motion.div
            className='absolute inset-0 z-0 h-full'
            animate={{ opacity: 1 - scrollProgress }}
            transition={{ duration: 0.1 }}
          >
            <Image src={bgImageSrc} alt='Background' fill className='object-cover' priority />
            <div className='absolute inset-0 bg-black/10' />
          </motion.div>

          <div className='container mx-auto flex flex-col items-center justify-start relative z-10'>
            <div className='flex flex-col items-center justify-center w-full h-[100dvh] relative'>
              <motion.div
                className='absolute z-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-2xl overflow-hidden'
                style={{
                  width: `${mediaWidth}px`,
                  height: `${mediaHeight}px`,
                  maxWidth: '95vw',
                  maxHeight: '90vh',
                  boxShadow: '0px 0px 50px rgba(0, 0, 0, 0.3)',
                }}
              >
                {mediaType === 'video' ? (
                  <video src={mediaSrc} poster={posterSrc} autoPlay muted loop playsInline className='w-full h-full object-cover' />
                ) : (
                  <Image src={mediaSrc} alt={title || ''} fill className='object-cover' />
                )}
                <div className="absolute inset-x-0 bottom-8 z-20 flex flex-col items-center text-center">
                  {date && (
                    <p
                      className='text-2xl text-white font-black uppercase tracking-tighter'
                      style={{ transform: `translateX(-${textTranslateX}vw)` }}
                    >
                      {date}
                    </p>
                  )}
                  {scrollToExpand && (
                    <p
                      className='text-white/80 font-black text-center uppercase tracking-widest text-[10px]'
                      style={{ transform: `translateX(${textTranslateX}vw)` }}
                    >
                      {scrollToExpand}
                    </p>
                  )}
                </div>
                <motion.div className='absolute inset-0 bg-black/40' animate={{ opacity: 0.5 - scrollProgress * 0.3 }} />
              </motion.div>

              <div className={`absolute top-1/2 left-0 w-full -translate-y-1/2 flex items-center justify-center z-10 pointer-events-none transition-none ${textBlend ? 'mix-blend-difference' : ''}`}>
                <div className="flex-1 flex justify-end pr-8 md:pr-[160px]">
                  <motion.h2 className='text-4xl md:text-6xl lg:text-8xl font-black text-white tracking-tighter mb-20 md:mb-32 lg:mb-48' style={{ transform: `translateX(-${textTranslateX}vw)` }}>{firstWord}</motion.h2>
                </div>
                <div className="flex-1 flex justify-start pl-8 md:pl-[160px]">
                  <motion.h2 className='text-4xl md:text-6xl lg:text-8xl font-black text-white tracking-tighter mt-20 md:mt-32 lg:mt-48' style={{ transform: `translateX(${textTranslateX}vw)` }}>{restOfTitle}</motion.h2>
                </div>
              </div>
            </div>

            <motion.section className='flex flex-col w-full px-8 md:px-16 pt-0 pb-20' animate={{ opacity: showContent ? 1 : 0 }}>
              {children}
            </motion.section>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScrollExpandMedia;
