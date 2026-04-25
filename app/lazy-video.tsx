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
  const [videoSrc, setVideoSrc] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  // Helper to convert storage URLs (Dropbox, Google Drive, etc.) to direct file links
  const getDirectUrl = (url: string) => {
    if (!url) return "";
    
    // Dropbox: Replace ?dl=0 with ?raw=1
    if (url.includes("dropbox.com")) {
      return url.replace("?dl=0", "").replace("?dl=1", "") + "?raw=1";
    }
    
    // Google Drive: Convert sharing link to direct link
    if (url.includes("drive.google.com")) {
      const id = url.match(/\/d\/([^/]+)/)?.[1];
      if (id) return `https://drive.google.com/uc?export=download&id=${id}`;
    }

    // Shopify Admin URL provided by user: convert to a format we might be able to handle
    // Note: In a real app, you'd call an API to get the CDN URL. 
    // Here we check if it looks like a Shopify ID.
    if (/^\d{10,}$/.test(url)) {
      // This is a Shopify Video ID. We'll mark it for resolution if needed,
      // but for now let's assume the user will provide direct links or we use a fallback.
      // Ideally, we'd have a server action to resolve this.
      return url; 
    }

    return url;
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const directUrl = getDirectUrl(src);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (videoSrc !== directUrl) {
              setVideoSrc(directUrl);
              setError(null);
            }
            video.play().catch((err) => {
              console.warn("Autoplay blocked or aborted:", err);
            });
          } else {
            video.pause();
            if (window.innerWidth < 1024) {
              setVideoSrc("");
              setIsLoading(true);
            }
          }
        });
      },
      { threshold }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [src, threshold, videoSrc]);

  const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    const target = e.target as HTMLVideoElement;
    const errorMessage = `Video failed to load: ${target.error?.message || "Unknown error"} (Source: ${videoSrc})`;
    console.error(errorMessage);
    setError(errorMessage);
    setIsLoading(false);
  };

  return (
    <div 
      className={`relative h-full w-full overflow-hidden bg-black/20 ${className || ""}`} 
      style={{ ...style, width: '100%', maxWidth: '100%', height: 'auto' }}
    >
      {isLoading && !error && (
        <div className="absolute inset-0 flex items-center justify-center z-10 bg-white/5 backdrop-blur-sm">
          <div className="w-8 h-8 border-2 border-[#57AD43] border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      
      {error && (
        <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/40 text-white p-4 text-center text-xs">
          <p>{error}</p>
        </div>
      )}

      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="metadata"
        onLoadedData={() => setIsLoading(false)}
        onError={handleVideoError}
        className={`w-full h-full ${props.controls ? 'aspect-video' : 'object-cover'}`}
        style={{
          opacity: isLoading ? 0.01 : 1,
          transition: "opacity 0.6s ease-in-out",
          display: error ? 'none' : 'block',
          width: '100%',
          maxWidth: '100%',
          height: props.controls ? 'auto' : '100%',
        }}
        {...props}
      >
        {videoSrc && <source src={videoSrc} type="video/mp4" />}
        Your browser does not support the video tag.
      </video>
    </div>
  );
}


