"use client";

import React from "react";
import { CardsParallax, iCardItem } from "./scroll-cards";

export const ParallaxFeatureSection = () => {
  const cardItems: iCardItem[] = [
    {
      title: "PREMIUM KNITS",
      description: "From lightweight essentials to plush winter textures, our knit fabrics offer unmatched versatility. Create dresses, tops, co-ords, or loungewear with materials crafted to drape effortlessly and stand the test of time.",
      videoUrl: "/video/1-1.mp4",
      tag: "Women's Collection",
      link: "#",
      color: "#121212",
      textColor: "white"
    },
    {
      title: "MODERN MAN",
      description: "From sharp office attire to effortless weekend looks, our fabrics are crafted to offer true versatility adapting flawlessly to every mood moment and season.",
      videoUrl: '/video/2-1.mp4',
      tag: "Men's Collection",
      link: "#",
      color: "#57AD43",
      textColor: "white"
    },
    // {
    //   title: "DIGITAL INNOVATION",
    //   description: "Experience the next generation of textile design with our high-fidelity 3D drapery simulations. See every fold, texture, and movement in stunning detail directly through your browser, where traditional craft meets futuristic technique.",
    //   src: "https://images.unsplash.com/photo-1558584449-32dd24172e08?q=80&w=2835&auto=format&fit=crop&ixlib=rb-4.1.0",
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
