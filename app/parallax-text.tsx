"use client";
import { useEffect, useRef } from "react";

interface ParallaxTextProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
}

export function ParallaxText({ children, className, speed = 0.5 }: ParallaxTextProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    let rafId: number | null = null;
    let scheduled = false;

    const compute = () => {
      scheduled = false;
      const container = el.parentElement;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const viewH = window.innerHeight;

      // Early exit: section is far outside viewport — skip calc entirely
      if (rect.bottom < -viewH || rect.top > viewH * 2) return;

      const progress = (viewH / 2 - (rect.top + rect.height / 2)) / viewH;
      const rawOffset = progress * rect.height * speed;

      // Lock at 50% travel max
      const maxOffset = rect.height * 0.5;
      const offset = Math.max(-maxOffset, Math.min(maxOffset, rawOffset));

      el.style.transform = `translateX(-50%) translateY(${offset}px)`;
    };

    const schedule = () => {
      if (scheduled) return;
      scheduled = true;
      rafId = requestAnimationFrame(compute);
    };

    compute(); // run once on mount
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [speed]);

  return (
    <div ref={wrapperRef} className={className} aria-hidden>
      {children}
    </div>
  );
}
