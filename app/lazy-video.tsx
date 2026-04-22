"use client";
import { useEffect, useRef, useState } from "react";

interface LazyVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
  /** How much of the video needs to be visible before it starts playing (0–1). Default: 0.15 */
  threshold?: number;
}

/**
 * A video that only loads + plays once it scrolls into view,
 * and pauses (saving CPU/GPU) when it scrolls out of view.
 */
export function LazyVideo({ src, threshold = 0.15, style, className, ...props }: LazyVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(true);

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
            video.play().catch(() => {/* autoplay blocked — no-op */ });
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
    <div className={`relative h-full w-full ${className || ""}`} style={style}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="w-8 h-8 border-2 border-[#57AD43] border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="none"
        onLoadedData={() => setIsLoading(false)}
        style={{
          willChange: "transform, opacity",
          transform: "translateZ(0)", // Force GPU acceleration
          backgroundColor: "transparent",
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }}
        {...props}
      />
    </div>
  );
}


