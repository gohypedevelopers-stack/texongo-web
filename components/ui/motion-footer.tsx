"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

// Register ScrollTrigger safely for React
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// -------------------------------------------------------------------------
// 1. THEME-ADAPTIVE INLINE STYLES
// -------------------------------------------------------------------------
const STYLES = `
.cinematic-footer-wrapper {
  font-family: var(--font-sans), sans-serif;
  -webkit-font-smoothing: antialiased;
}

@keyframes footer-breathe {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
  100% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
}

@keyframes footer-scroll-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

.animate-footer-breathe {
  animation: footer-breathe 8s ease-in-out infinite alternate;
}

.animate-footer-scroll-marquee {
  animation: footer-scroll-marquee 40s linear infinite;
}

/* Theme-adaptive Grid Background */
.footer-bg-grid {
  background-size: 60px 60px;
  background-image: 
    linear-gradient(to right, rgba(87, 173, 67, 0.05) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(87, 173, 67, 0.05) 1px, transparent 1px);
  mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
}

/* Theme-adaptive Aurora Glow */
.footer-aurora {
  background: radial-gradient(
    circle at 50% 50%, 
    rgba(87, 173, 67, 0.15) 0%, 
    rgba(87, 173, 67, 0.08) 40%, 
    transparent 70%
  );
}

/* Giant Background Text Masking */
.footer-giant-bg-text {
  font-size: 23vw;
  line-height: 0.5;
  font-weight: 900;
  letter-spacing: -0.05em;
  color: #57AD43;
}

/* Metallic Text Glow */
.footer-text-glow {
  background: linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0.4) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0px 0px 20px rgba(87, 173, 67, 0.2));
}

/* Glass Pill Theming */
.footer-glass-pill {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(87, 173, 67, 0.2);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.footer-glass-pill:hover {
  background: rgba(87, 173, 67, 0.1);
  border-color: rgba(87, 173, 67, 0.5);
  color: #57AD43;
}
`;

// -------------------------------------------------------------------------
// 2. MAGNETIC BUTTON PRIMITIVE
// -------------------------------------------------------------------------
export type MagneticButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    as?: React.ElementType;
  };

const MagneticButton = React.forwardRef<HTMLElement, MagneticButtonProps>(
  ({ className, children, as: Component = "button", ...props }, forwardedRef) => {
    const localRef = useRef<HTMLElement>(null);

    useEffect(() => {
      if (typeof window === "undefined") return;
      const element = localRef.current;
      if (!element) return;

      const ctx = gsap.context(() => {
        const handleMouseMove = (e: MouseEvent) => {
          const rect = element.getBoundingClientRect();
          const h = rect.width / 2;
          const w = rect.height / 2;
          const x = e.clientX - rect.left - h;
          const y = e.clientY - rect.top - w;

          gsap.to(element, {
            x: x * 0.4,
            y: y * 0.4,
            rotationX: -y * 0.15,
            rotationY: x * 0.15,
            scale: 1.05,
            ease: "power2.out",
            duration: 0.4,
          });
        };

        const handleMouseLeave = () => {
          gsap.to(element, {
            x: 0,
            y: 0,
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            ease: "elastic.out(1, 0.3)",
            duration: 1.2,
          });
        };

        element.addEventListener("mousemove", handleMouseMove as any);
        element.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          element.removeEventListener("mousemove", handleMouseMove as any);
          element.removeEventListener("mouseleave", handleMouseLeave);
        };
      }, element);

      return () => ctx.revert();
    }, []);

    return (
      <Component
        ref={(node: HTMLElement) => {
          (localRef as any).current = node;
          if (typeof forwardedRef === "function") forwardedRef(node);
          else if (forwardedRef) (forwardedRef as any).current = node;
        }}
        className={cn("cursor-pointer", className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
MagneticButton.displayName = "MagneticButton";

// -------------------------------------------------------------------------
// 3. MARQUEE COMPONENT
// -------------------------------------------------------------------------
const MarqueeItem = () => (
  <div className="flex items-center space-x-12 px-6">
    <span>Premium Fabrics</span> <span className="text-[#57AD43]/60">✦</span>
    <span>Quality Assured</span> <span className="text-[#57AD43]/60">✦</span>
    <span>Fast Delivery</span> <span className="text-[#57AD43]/60">✦</span>
    <span>Global Shipping</span> <span className="text-[#57AD43]/60">✦</span>
    <span>Expert Support</span> <span className="text-[#57AD43]/60">✦</span>
  </div>
);

// -------------------------------------------------------------------------
// 4. MAIN COMPONENT
// -------------------------------------------------------------------------
export function MotionFooter() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const giantTextRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  const contactInfo = [
    {
      icon: <Mail size={18} className="text-[#57AD43]" />,
      text: "Connect@texongo.com",
      href: "mailto:Connect@texongo.com",
    },
    {
      icon: <Phone size={18} className="text-[#57AD43]" />,
      text: "+91 9910048498 / 9310598498",
      href: "tel:+919910048498",
    },
    {
      icon: <MapPin size={18} className="text-[#57AD43]" />,
      text: "D 10/1 Okhla Industrial Area Phase II, New Delhi - 110020",
    },
  ];

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!wrapperRef.current) return;

    // Safety fallback: if ScrollTrigger never fires (e.g. page too tall from many products),
    // force the elements visible after 1.5 seconds.
    const safetyTimer = setTimeout(() => {
      if (headingRef.current) gsap.set(headingRef.current, { opacity: 1, y: 0 });
      if (linksRef.current) gsap.set(linksRef.current, { opacity: 1, y: 0 });
      if (giantTextRef.current) gsap.set(giantTextRef.current, { opacity: 1, y: 0, scale: 1 });
      ScrollTrigger.refresh();
    }, 1500);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        giantTextRef.current,
        { y: "10vh", scale: 0.8, opacity: 0 },
        {
          y: "0vh",
          scale: 1,
          opacity: 1,
          ease: "power1.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 95%",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        [headingRef.current, linksRef.current],
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 95%",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );
    }, wrapperRef);

    // Re-refresh ScrollTrigger whenever the document height changes
    // (critical when 1100+ product cards finish rendering)
    const resizeObserver = new ResizeObserver(() => {
      ScrollTrigger.refresh();
    });
    resizeObserver.observe(document.body);

    return () => {
      clearTimeout(safetyTimer);
      resizeObserver.disconnect();
      ctx.revert();
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      <div
        ref={wrapperRef}
        className="relative h-screen w-full"
        style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
      >
        <footer className="fixed bottom-0 left-0 flex h-screen w-full flex-col justify-between overflow-hidden bg-black text-white cinematic-footer-wrapper">

          {/* Ambient Light & Grid Background */}
          <div className="footer-aurora absolute left-1/2 top-1/2 h-[60vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 animate-footer-breathe rounded-[50%] blur-[80px] pointer-events-none z-0" />
          <div className="footer-bg-grid absolute inset-0 z-0 pointer-events-none" />

          {/* Giant background text */}
          <div
            ref={giantTextRef}
            className="footer-giant-bg-text absolute bottom-[3vh] left-1/2 -translate-x-1/2 whitespace-nowrap z-0 pointer-events-none select-none"
          >
            TEXONGO
          </div>

          {/* 2. Main Center Content - Moved higher */}
          <div className="relative z-10 flex flex-col items-center justify-start px-6 pt-20 pb-100 w-full max-w-5xl mx-auto">
            <h2
              ref={headingRef}
              className="text-5xl md:text-7xl font-black footer-text-glow tracking-tighter mb-12 text-center"
            >
              Explore Our Collection
            </h2>

            {/* Content Grid */}
            <div ref={linksRef} className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full">

              {/* About Us */}
              <div className="space-y-4">
                <h4 className="text-white font-bold uppercase tracking-widest text-sm">About Us</h4>
                <ul className="space-y-2">
                  {[
                    { name: "Home", href: "/" },
                    { name: "About Us", href: "/about-us" },
                    { name: "Fabrics", href: "/fabrics" },
                  ].map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-white text-sm hover:text-[#57AD43] transition-colors font-medium"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Menu */}
              <div className="space-y-4">
                <h4 className="text-white font-bold uppercase tracking-widest text-sm">Menu</h4>
                <ul className="space-y-2">
                  {[
                    { name: "Contact Us", href: "/contact-us" },
                    { name: "Terms & Conditions", href: "/terms-and-conditions" },
                    { name: "Shipping & Return Policy", href: "/shipping-and-return-policy" },
                  ].map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-white text-sm hover:text-[#57AD43] transition-colors font-medium"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact Details */}
              <div className="space-y-4">
                <h4 className="text-white font-bold uppercase tracking-widest text-sm">Contact Details</h4>
                <ul className="space-y-3">
                  {contactInfo.map((item, i) => (
                    <li key={i} className="flex items-start space-x-3">
                      {item.icon}
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-white text-sm hover:text-[#57AD43] transition-colors font-medium"
                        >
                          {item.text}
                        </a>
                      ) : (
                        <span className="text-white text-sm font-medium">
                          {item.text}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* 1. Marquee Between Navlinks and TEXONGO Text */}
          <div className="absolute top-1/2 left-0 w-full overflow-hidden border-y border-white/10 bg-black/60 backdrop-blur-md py-4 z-10 -rotate-2 scale-110 shadow-2xl transform -translate-y-1/2">
            <div className="flex w-max animate-footer-scroll-marquee text-xs md:text-sm font-bold tracking-[0.3em] text-white/60 uppercase">
              <MarqueeItem />
              <MarqueeItem />
            </div>
          </div>

          {/* 3. Bottom Bar / Credits */}
          <div className="relative z-20 w-full pb-8 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">

            {/* Copyright */}
            <div className="text-white/40 text-[10px] md:text-xs font-semibold tracking-widest uppercase order-2 md:order-1">
              © 2026 Texongo Fabrics. All rights reserved.
            </div>

            {/* Back to top */}
            <MagneticButton
              as="button"
              onClick={scrollToTop}
              className="w-12 h-12 rounded-full footer-glass-pill flex items-center justify-center text-white hover:text-[#57AD43] group order-3"
            >
              <svg className="w-5 h-5 transform group-hover:-translate-y-1.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
              </svg>
            </MagneticButton>

          </div>
        </footer>
      </div>
    </>
  );
}
