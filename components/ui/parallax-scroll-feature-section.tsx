"use client";

import React from "react";
import { CardsParallax, iCardItem } from "./scroll-cards";

export const ParallaxFeatureSection = () => {
  const cardItems: iCardItem[] = [
    {
      title: "FEMININE SIGNATURE",
      description: "From lightweight essentials to luxury winter textures, our knit fabrics offer unmatched versatility and 3D realism.",
      videoUrl: "https://cdn.shopify.com/videos/c/o/v/f44604a8812c4022bf7a5291fa7deb19.mp4",
      tag: "Women's Collection",
      link: "/fabrics",
      color: "#5a68b4ff",
      textColor: "white"
    },
    {
      title: "MODERN MASCULINITY",
      description: "Sharp tailoring meets technical performance. Experience fabrics crafted for the modern man's lifestyle.",
      videoUrl: 'https://cdn.shopify.com/videos/c/o/v/4be9177b96a54e09b0b1a9a469bee238.mp4',
      tag: "Men's Collection",
      link: "/fabrics",
      color: "#57AD43",
      textColor: "white"
    }
  ];

  return (
    <div className="bg-white">
      <CardsParallax items={cardItems} />
    </div>
  );
};
