"use client";

import React from "react";

export function WatermarkOverlay() {
  return null;
}

export function VideoBadge() {
  return (
    <div className="absolute top-4 left-4 z-[60] pointer-events-none">
      <div className="bg-white px-3 py-1.5 rounded-full shadow-xl border border-black/5 flex items-center justify-center scale-[0.5] md:scale-[0.8] origin-top-left">
        <img
          src="/logos/logo.png"
          alt="Texongo"
          className="h-4 w-auto object-contain mix-blend-multiply"
        />
      </div>
    </div>
  );
}
