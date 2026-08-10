"use client";

import React from "react";

export function WatermarkOverlay() {
  return (
    <div className="absolute inset-0 pointer-events-none z-[50] overflow-hidden">
      {/* Tiled Watermark (Invisible by default, triggered by parent state) */}
      <div 
        className="absolute inset-0 flex flex-wrap gap-20 p-10 rotate-[-25deg] scale-[1.5]"
        style={{ width: '200%', height: '200%', left: '-50%', top: '-50%' }}
      >
        {Array.from({ length: 40 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center justify-center grayscale brightness-0 invert opacity-[0.15]">
            <span className="text-[14px] font-black tracking-[0.2em] uppercase">TEXONGO</span>
            <span className="text-[8px] font-bold tracking-[0.1em] opacity-80">www.texongo.com</span>
            <span className="text-[6px] font-medium tracking-[0.05em] opacity-60">SYNDICATE CLOTH HOUSE PVT. LTD.</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function VideoBadge() {
  return (
    <div className="absolute top-4 left-4 z-[60] pointer-events-none">
      <div className="bg-white px-3 py-1.5 rounded-full shadow-xl border border-black/5 flex items-center justify-center scale-[0.5] md:scale-[0.8] origin-top-left">
        <img
          src="https://texongo.com/wp-content/uploads/2025/09/Untitled-design-2-1-e1758707290987.png"
          alt="Texongo"
          className="h-4 w-auto object-contain mix-blend-multiply"
        />
      </div>
    </div>
  );
}
