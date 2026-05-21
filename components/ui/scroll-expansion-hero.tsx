'use client';

import {
  useEffect,
  useRef,
  useState,
  ReactNode,
} from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion';

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
  const [isMobileState, setIsMobileState] = useState<boolean>(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const checkIfMobile = () => setIsMobileState(window.innerWidth < 768);
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'] // Progress goes from 0 to 1 as the 200vh container leaves the viewport
  });

  // Since height is 200vh, when it's fully pinned at top (0vh scrolled), progress is 0.
  // When we scroll 100vh down, the container's bottom hits the bottom of the screen (end end), wait no.
  // Actually, let's use a simpler mapping:
  // "start start" -> container top hits viewport top (scrollY = 0)
  // "end end" -> container bottom hits viewport bottom (scrollY = 100vh if container is 200vh)

  const { scrollYProgress: expansionProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end']
  });

  const mediaWidth = useTransform(
    expansionProgress,
    [0, 1],
    [300, 300 + 1 * (isMobileState ? 700 : 1620)]
  );

  const mediaHeight = useTransform(
    expansionProgress,
    [0, 1],
    [400, 400 + 1 * (isMobileState ? 400 : 850)]
  );

  const textTranslateXRaw = useTransform(
    expansionProgress,
    [0, 1],
    [0, isMobileState ? 180 : 150]
  );

  const textTranslateXLeft = useMotionTemplate`-${textTranslateXRaw}vw`;
  const textTranslateXRight = useMotionTemplate`${textTranslateXRaw}vw`;

  const bgOpacity = useTransform(expansionProgress, [0, 1], [1, 0]);
  const overlayOpacity = useTransform(expansionProgress, [0, 1], [0.5, 0.2]);
  const titleOpacity = useTransform(expansionProgress, [0, 0.4], [1, 0]);

  const firstWord = title ? title.split(' ')[0] : '';
  const restOfTitle = title ? title.split(' ').slice(1).join(' ') : '';

  return (
    <>
      <div ref={sectionRef} className='relative w-full' style={{ height: '200vh' }}>
        <div className='sticky top-0 h-screen w-full flex flex-col items-center justify-start overflow-hidden bg-[#F9FAFB]'>
          <motion.div
            className='absolute inset-0 z-0 h-full'
            style={{ opacity: bgOpacity }}
          >
            <Image src={bgImageSrc} alt='Background' fill className='object-cover' priority />
            <div className='absolute inset-0 bg-black/10' />
          </motion.div>

          <div className='container mx-auto flex flex-col items-center justify-start relative z-10 h-full'>
            <div className='flex flex-col items-center justify-center w-full h-full relative'>
              <motion.div
                className='absolute z-0 rounded-2xl overflow-hidden'
                style={{
                  width: mediaWidth,
                  height: mediaHeight,
                  maxWidth: '95vw',
                  maxHeight: '90vh',
                  boxShadow: '0px 0px 50px rgba(0, 0, 0, 0.3)',
                }}
              >
                {mediaType === 'video' ? (
                  <video
                    src={mediaSrc}
                    poster={posterSrc}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    {...{ fetchPriority: "high" }}
                    className='w-full h-full object-cover'
                  />
                ) : (
                  <Image src={mediaSrc} alt={title || ''} fill className='object-cover' priority />
                )}

                <motion.div
                  className="absolute inset-x-0 bottom-8 z-20 flex flex-col items-center text-center"
                  style={{ opacity: titleOpacity }}
                >
                  {date && (
                    <motion.p
                      className='text-2xl text-white font-black uppercase tracking-tighter'
                      style={{ x: textTranslateXLeft }}
                    >
                      {date}
                    </motion.p>
                  )}
                  {scrollToExpand && (
                    <motion.p
                      className='text-white/80 font-black text-center uppercase tracking-widest text-[10px]'
                      style={{ x: textTranslateXRight }}
                    >
                      {scrollToExpand}
                    </motion.p>
                  )}
                </motion.div>
                <motion.div className='absolute inset-0 bg-black/40' style={{ opacity: overlayOpacity }} />
              </motion.div>

              <motion.div
                style={{ opacity: titleOpacity }}
                className={`absolute top-1/2 left-0 w-full -translate-y-1/2 flex items-center justify-center z-10 pointer-events-none transition-none ${textBlend ? 'mix-blend-difference' : ''}`}
              >
                <div className="flex-1 flex justify-end pr-8 md:pr-[160px]">
                  <motion.h2 className='text-4xl md:text-6xl lg:text-8xl font-black text-white tracking-tighter mb-20 md:mb-32 lg:mb-48' style={{ x: textTranslateXLeft }}>{firstWord}</motion.h2>
                </div>
                <div className="flex-1 flex justify-start pl-8 md:pl-[160px]">
                  <motion.h2 className='text-4xl md:text-6xl lg:text-8xl font-black text-white tracking-tighter mt-20 md:mt-32 lg:mt-48' style={{ x: textTranslateXRight }}>{restOfTitle}</motion.h2>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 pt-3 pb-8 w-full px-8 md:px-16 bg-[#F9FAFB]">
        {children}
      </div>
    </>
  );
};

export default ScrollExpandMedia;
