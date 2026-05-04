"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, useTransform, useSpring, useMotionValue, MotionValue } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Fabric } from "../../lib/shopify";

// --- Types ---
interface FabricCardProps {
    src: string;
    label: string;
    index: number;
    totalCount: number;
    smoothProgress: MotionValue<number>;
    isMobile: boolean;
    containerSize: { w: number; h: number };
    scatterPos: { x: number; y: number; r: number };
}

// --- Optimized FabricCard Component ---
const FabricCard = React.memo(({
    src,
    label,
    index,
    totalCount,
    smoothProgress,
    isMobile,
    containerSize,
    scatterPos,
    direction = "clockwise"
}: FabricCardProps & { direction?: "clockwise" | "anticlockwise" }) => {

    // Constant geometry calculations
    const directionMultiplier = direction === "clockwise" ? 1 : -1;
    const baseAngle = directionMultiplier * (index / totalCount) * 360;
    const minDim = Math.min(containerSize.w, containerSize.h);
    const radius = isMobile ? minDim * 0.44 : minDim * 0.36;

    // Restored tighter spacing between images (as before)
    const hSpacing = isMobile ? 170 : 300;
    const totalW = (totalCount - 1) * hSpacing;
    const initialLineX = index * hSpacing;

    // Position & Scale Transform
    const transform = useTransform(smoothProgress, (p) => {
        const morph = p < 0.15 ? 0 : (p < 0.30 ? (p - 0.15) / 0.15 : 1);
        const shuffleProgress = p < 0.30 ? 0 : (p < 0.45 ? (p - 0.30) / 0.15 : 1);
        const lineProgress = p < 0.45 ? 0 : (p < 0.55 ? (p - 0.45) / 0.1 : 1);
        const slideProgress = p < 0.55 ? 0 : (p < 0.90 ? (p - 0.55) / 0.35 : 1);

        const angle = baseAngle + (directionMultiplier * shuffleProgress * 120);
        const rad = (angle * Math.PI) / 180;

        // Base Position
        let tx = Math.cos(rad) * radius;
        let ty = Math.sin(rad) * radius;
        let tr = angle + 90;
        let ts = isMobile ? 0.7 : 0.9;

        if (lineProgress > 0) {
            const endSlideOffset = isMobile ? containerSize.w * 0.1 : containerSize.w * 0.35;
            const slideTarget = totalW - endSlideOffset;
            const lineX = (direction === "clockwise" ? 1 : -1) * (initialLineX - (slideProgress * slideTarget));

            tx = tx * (1 - lineProgress) + lineX * lineProgress;
            ty = ty * (1 - lineProgress);
            tr = tr * (1 - lineProgress);
            const maxCardH = isMobile ? 220 : 380;
            const safeTs = containerSize.h < maxCardH ? (containerSize.h / 140) * 0.8 : (isMobile ? 1.4 : 2.7);
            ts = ts * (1 - lineProgress) + safeTs * lineProgress;
        }

        const finalX = scatterPos.x * (1 - morph) + tx * morph;
        const finalY = scatterPos.y * (1 - morph) + ty * morph;
        const finalR = scatterPos.r * (1 - morph) + tr * morph;
        const finalS = 0.4 * (1 - morph) + ts * morph;

        return `translate3d(${finalX.toFixed(2)}px, ${finalY.toFixed(2)}px, 0) rotate(${finalR.toFixed(2)}deg) scale(${finalS.toFixed(3)})`;
    });

    const opacity = useTransform(smoothProgress, [0, 0.1, 1.0], [0, 1, 1]);

    return (
        <motion.div
            style={{
                transform,
                opacity,
                position: "absolute",
                width: 100,
                height: 140,
                willChange: "transform",
                zIndex: 2,
                transformStyle: "preserve-3d",
                isolation: "isolate",
            }}
            className="group"
        >
            <motion.div
                className="relative h-full w-full overflow-hidden rounded-2xl shadow-2xl bg-gray-100 border border-black/5 transform-gpu"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
            >
                <img
                    src={src}
                    alt={label}
                    className="h-full w-full object-cover transform-gpu"
                    loading="lazy"
                    decoding="async"
                />

                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 w-full px-3 flex justify-center transform-gpu">
                    <div className="bg-white px-2 py-1 rounded-full shadow-lg border border-black/5 flex items-center justify-center min-w-[65%] transform-gpu will-change-transform">
                        <span
                            className="text-[12px] font-bold uppercase text-black tracking-widest leading-none text-center antialiased whitespace-nowrap"
                            style={{
                                textRendering: "geometricPrecision",
                                transform: "translateZ(0) scale(0.5)",
                                transformOrigin: "center",
                                WebkitFontSmoothing: "antialiased",
                                display: "inline-block"
                            }}
                        >
                            {label.split(/[\s-]+/)[0]}
                        </span>
                    </div>
                </div>

                <motion.div
                    className="absolute inset-0 bg-black/5 pointer-events-none"
                    initial={{ opacity: 1 }}
                    whileHover={{ opacity: 0 }}
                />
            </motion.div>
        </motion.div>
    );
});

FabricCard.displayName = "FabricCard";

const KNIT_DATA = [
    { name: "Pique", src: "https://texongo.com/wp-content/uploads/2025/08/Pique_20241215064036pm.png" },
    { name: "French Terry", src: "https://texongo.com/wp-content/uploads/2025/12/Terry_20241215064032pm.png" },
    { name: "Waffle", src: "https://texongo.com/wp-content/uploads/2025/08/Waffle_20241215064033pm.png" },
    { name: "Single Jersey", src: "https://texongo.com/wp-content/uploads/2025/12/Single-Jersey_20241215064031pm.png" },
    { name: "Poly Cotton", src: "https://texongo.com/wp-content/uploads/2025/08/Poly-Cotton_20241215064036pm.png" },
    { name: "Jacquard", src: "https://texongo.com/wp-content/uploads/2025/12/Jacquard_20241215064035pm.png" },
    { name: "Polyester", src: "https://texongo.com/wp-content/uploads/2025/12/Polyester_20241215064037pm.png" },
    { name: "Melange", src: "https://texongo.com/wp-content/uploads/2025/12/Melange_20241215064035pm.png" },
    { name: "Fleece", src: "https://texongo.com/wp-content/uploads/2025/09/Fleece_20241215064034pm.png" },
    { name: "Cotton Spandex", src: "https://texongo.com/wp-content/uploads/2025/12/Cotton-Spandex_20241215064033pm.png" },
    { name: "Cotton", src: "https://texongo.com/wp-content/uploads/2025/12/Cotton_20241215064034pm.png" },
    { name: "Viscose", src: "https://texongo.com/wp-content/uploads/2025/11/Viscose_20241215064032pm.png" },
    { name: "Rib", src: "https://texongo.com/wp-content/uploads/2025/12/Rib_20241215064030pm.png" },
];

const BLEND_DATA = [
    { name: "Cotton Bamboo", src: "https://texongo.com/wp-content/uploads/2025/12/Banana_f7269dad-a9d2-4553-8572-9fb18786d287_360x.webp" },
    { name: "Poly Cotton", src: "https://texongo.com/wp-content/uploads/2025/08/Poly-Cotton_20241215064036pm.png" },
    { name: "Cotton Modal", src: "https://texongo.com/wp-content/uploads/2025/11/Viscose_20241215064032pm.png" },
    { name: "Viscose Spandex", src: "https://texongo.com/wp-content/uploads/2025/12/Cotton-Spandex_20241215064033pm.png" },
    { name: "Cotton Linen", src: "https://texongo.com/wp-content/uploads/2025/11/image_1a1e365a-2b74-4d96-8165-f7788358c9bd-768x768-1-300x300.jpg" },
    { name: "Supima", src: "https://texongo.com/wp-content/uploads/2025/12/Supiima_360x-1.webp" },
    { name: "Hemp", src: "https://texongo.com/wp-content/uploads/2025/12/Hemp_ee5107c1-6add-4868-bc46-6d9111850ba3_360x.webp" },
    { name: "Lotus Fiber", src: "https://texongo.com/wp-content/uploads/2025/12/Lotus_360x.webp" },
    { name: "Banana Fiber", src: "https://texongo.com/wp-content/uploads/2025/12/Banana_f7269dad-a9d2-4553-8572-9fb18786d287_360x.webp" },
    { name: "Organic Cotton", src: "https://texongo.com/wp-content/uploads/2025/12/BCI_a1b34c70-fc29-4342-9c45-a8f95375fa51_360x.webp" },
];

export function IntroAnimation({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
    const [isMobile, setIsMobile] = useState(false);
    const [containerSize, setContainerSize] = useState({ w: 1200, h: 800 });
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const update = () => {
            setIsMobile(window.innerWidth < 768);
            if (containerRef.current) {
                setContainerSize({
                    w: containerRef.current.offsetWidth,
                    h: containerRef.current.offsetHeight,
                });
            }
        };
        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, []);

    const smoothProgress = useSpring(scrollProgress, {
        stiffness: 60,
        damping: 40,
        mass: 1.2,
        restDelta: 0.001
    });

    const scatterPositions = useMemo(() => {
        return KNIT_DATA.map(() => ({
            x: (Math.random() - 0.5) * 1200,
            y: (Math.random() - 0.5) * 800,
            r: (Math.random() - 0.5) * 180,
        }));
    }, []);

    const titleOpacity = useTransform(smoothProgress, [0, 0.1, 0.2, 0.4, 0.45], [0, 0, 1, 1, 0]);
    const titleY = useTransform(smoothProgress, [0, 0.1, 0.2, 0.4, 0.45], [20, 20, 0, 0, -30]);

    const arrowOpacity = useTransform(smoothProgress, [0.45, 0.55, 0.9], [0, 1, 1]);

    return (
        <div ref={containerRef} className="relative w-full h-full bg-white overflow-hidden font-sans select-none transform-gpu">
            <div className="flex h-full w-full items-center justify-center pt-10 md:pt-14">

                {/* Showroom Header */}
                <motion.div
                    style={{ opacity: arrowOpacity }}
                    className="absolute top-24 left-0 w-full text-center z-20 pointer-events-none"
                >
                    <h2 className="text-xl md:text-3xl font-black text-black uppercase tracking-tight">Our Premium Knit Collection</h2>
                </motion.div>


                {/* Hero Header */}
                <motion.div
                    style={{ opacity: titleOpacity, y: titleY }}
                    className="absolute z-10 text-center pointer-events-none"
                >
                    <h1 className="text-5xl font-black tracking-tighter text-black md:text-7xl uppercase leading-[0.9] mb-6">
                        Choose Your <br />
                        <span className="text-[#57AD43]">Knit Style</span>
                    </h1>
                </motion.div>

                {/* Cards Layer */}
                <div className="relative flex items-center justify-center w-full h-full perspective-1000 transform-gpu">
                    {(isMobile ? KNIT_DATA.slice(0, 6) : KNIT_DATA).map((item, i) => (
                        <FabricCard
                            key={i}
                            index={i}
                            src={item.src}
                            label={item.name}
                            totalCount={isMobile ? 6 : KNIT_DATA.length}
                            smoothProgress={smoothProgress}
                            isMobile={isMobile}
                            containerSize={containerSize}
                            scatterPos={scatterPositions[i]}
                            direction="clockwise"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export function BlendAnimation({ scrollProgress, products }: { scrollProgress: MotionValue<number>, products?: Fabric[] }) {
    const [isMobile, setIsMobile] = useState(false);
    const [containerSize, setContainerSize] = useState({ w: 1200, h: 800 });
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const update = () => {
            setIsMobile(window.innerWidth < 768);
            if (containerRef.current) {
                setContainerSize({
                    w: containerRef.current.offsetWidth,
                    h: containerRef.current.offsetHeight,
                });
            }
        };
        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, []);

    const smoothProgress = useSpring(scrollProgress, {
        stiffness: 60,
        damping: 40,
        mass: 1.2,
        restDelta: 0.001
    });

    const scatterPositions = useMemo(() => {
        return BLEND_DATA.map(() => ({
            x: (Math.random() - 0.5) * 1200,
            y: (Math.random() - 0.5) * 800,
            r: (Math.random() - 0.5) * 180,
        }));
    }, []);

    const titleOpacity = useTransform(smoothProgress, [0, 0.1, 0.2, 0.4, 0.45], [0, 0, 1, 1, 0]);
    const titleY = useTransform(smoothProgress, [0, 0.1, 0.2, 0.4, 0.45], [20, 20, 0, 0, -30]);

    const arrowOpacity = useTransform(smoothProgress, [0.45, 0.55, 0.9], [0, 1, 1]);

    return (
        <div ref={containerRef} className="relative w-full h-full bg-white overflow-hidden font-sans select-none transform-gpu">
            <div className="flex h-full w-full items-center justify-center pt-10 md:pt-14">

                {/* Showroom Header */}
                <motion.div
                    style={{ opacity: arrowOpacity }}
                    className="absolute top-24 left-0 w-full text-center z-20 pointer-events-none"
                >
                    <h2 className="text-xl md:text-3xl font-black text-black uppercase tracking-tight">Our Premium Blend Collection</h2>
                </motion.div>


                {/* Hero Header */}
                <motion.div
                    style={{ opacity: titleOpacity, y: titleY }}
                    className="absolute z-10 text-center pointer-events-none"
                >
                    <h1 className="text-5xl font-black tracking-tighter text-black md:text-7xl uppercase leading-[0.9] mb-6">
                        Choose Your <br />
                        <span className="text-[#57AD43]">Blend Style</span>
                    </h1>
                </motion.div>

                {/* Cards Layer */}
                <div className="relative flex items-center justify-center w-full h-full perspective-1000 transform-gpu">
                    {(products && products.length > 0 
                        ? (isMobile ? products.slice(0, 6) : products.slice(0, 10))
                        : (isMobile ? BLEND_DATA.slice(0, 6) : BLEND_DATA)
                    ).map((item, i) => (
                        <FabricCard
                            key={i}
                            index={i}
                            src={item.image || (item as any).src}
                            label={item.name}
                            totalCount={products && products.length > 0 ? (isMobile ? 6 : Math.min(products.length, 10)) : (isMobile ? 6 : BLEND_DATA.length)}
                            smoothProgress={smoothProgress}
                            isMobile={isMobile}
                            containerSize={containerSize}
                            scatterPos={scatterPositions[i]}
                            direction="anticlockwise"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default IntroAnimation;
