"use client";

import React from "react";
import { CardsParallax, iCardItem } from "./scroll-cards";

export const ParallaxFeatureSection = () => {
  const cardItems: iCardItem[] = [
    {
      title: "FEMININE SIGNATURE",
      description: "From lightweight essentials to luxury winter textures, our knit fabrics offer unmatched versatility and 3D realism.",
      videoUrl: "/video/1-1.mp4",
      tag: "Women's Collection",
      link: "/fabrics",
      color: "#5a68b4ff",
      textColor: "white"
    },
    {
      title: "MODERN MASCULINITY",
      description: "Sharp tailoring meets technical performance. Experience fabrics crafted for the modern man's lifestyle.",
      videoUrl: '/video/2-1.mp4',
      tag: "Men's Collection",
      link: "/fabrics",
      color: "#57AD43",
      textColor: "white"
    },
    // {
    //   title: "DIGITAL INNOVATION",
    //   description: "Experience the next generation of textile design with our high-fidelity 3D drapery simulations. See every fold, texture, and movement in stunning detail directly through your browser, where traditional craft meets futuristic technique.",
    //   videoUrl: 'https://vimeo.com/1032216404?fl=pl&fe=cm',
    //   tag: "3D Studio",
    //   link: "#",
    //   color: "#f3efe8",
    //   textColor: "#121212"
    // }
  ];

  return (
    <div className="bg-white">
      <CardsParallax items={cardItems} />
    </div>
  );
};
