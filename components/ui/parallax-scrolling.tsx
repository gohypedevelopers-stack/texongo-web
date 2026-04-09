'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import styles from '@/app/page.module.css';

export function ParallaxComponent() {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const triggerElement = parallaxRef.current?.querySelector('[data-parallax-layers]');

    if (triggerElement) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          start: "0% 0%",
          end: "100% 0%",
          scrub: 1.2,
        }
      });

      const layers = [
        { layer: "1", yPercent: 30 },  // Background drifts DOWN (with scroll)
        { layer: "3", yPercent: 60 },  // Text drifts DOWN (with scroll)
        { layer: "4", yPercent: -120 } // Model drifts UP significantly (opposite)
      ];

      layers.forEach((layerObj, idx) => {
        tl.to(
          triggerElement.querySelectorAll(`[data-parallax-layer="${layerObj.layer}"]`),
          {
            yPercent: layerObj.yPercent,
            ease: "none"
          },
          idx === 0 ? undefined : "<"
        );
      });
    }

    const lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 1,
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
      if (triggerElement) gsap.killTweensOf(triggerElement);
      lenis.destroy();
    };
  }, []);

  return (
    <div className={styles.parallaxContainer} ref={parallaxRef}>
      <section className={styles.parallaxHeader}>
        <div className={styles.parallaxVisuals}>
          <div data-parallax-layers className={styles.parallaxLayers}>
            {/* Layer 1: Background - Clean Fabric Branding */}
            <img 
              src="/studio-bg-clean.png" 
              loading="eager" 
              data-parallax-layer="1" 
              alt="Premium Texongo studio background" 
              className={styles.parallaxLayerImg} 
            />

            {/* Layer 3: Text Content (Middle-Ground) */}
            <div data-parallax-layer="3" className={styles.parallaxLayerTitle}>
              <div className="flex flex-col items-center">
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#7BA451] mb-6 drop-shadow-md">Texongo Studio</span>
                <h2 className={styles.parallaxTitle}>TEXONGO</h2>
              </div>
            </div>

            {/* Layer 4: Foreground - The standing model */}
            <div data-parallax-layer="4" className={styles.parallaxModelForeground}>
              <img
                src="/Untitled design (11).png"
                loading="eager"
                alt="Premium Texongo model"
                className={styles.parallaxModelImg}
              />
            </div>
          </div>
          <div className={styles.parallaxFade}></div>
        </div>
      </section>

      {/* Decorative arrow section */}
      <section className={styles.parallaxContent}>
        <div className="animate-bounce">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-white/30">
            <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
          </svg>
        </div>
      </section>
    </div>
  );
}
