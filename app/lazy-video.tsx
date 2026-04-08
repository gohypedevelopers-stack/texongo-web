"use client";
import { useEffect, useRef } from "react";

interface LazyVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
  /** How much of the video needs to be visible before it starts playing (0–1). Default: 0.15 */
  threshold?: number;
}

/**
 * A video that only loads + plays once it scrolls into view,
 * and pauses (saving CPU/GPU) when it scrolls out of view.
 */
export function LazyVideo({ src, threshold = 0.15, style, ...props }: LazyVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Set src only when first becoming visible (lazy load)
            if (!video.src && src) {
              video.src = src;
              video.load();
            }
            video.play().catch(() => {/* autoplay blocked — no-op */});
          } else {
            video.pause();
          }
        });
      },
      { threshold }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [src, threshold]);

  return (
    <video
      ref={videoRef}
      muted
      loop
      playsInline
      preload="none"
      style={{ willChange: "transform", ...style }}
      {...props}
    />
  );
}
