"use client";

import { useRef } from "react";
import { useScroll } from "framer-motion";
import IntroAnimation from "../../components/ui/scroll-morph-hero";

export default function DemoPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    return (
        <div className="w-full bg-[#FAFAFA]">
            <div className="h-[100vh] flex items-center justify-center bg-zinc-100 border-b">
                <h1 className="text-4xl font-black uppercase">Scroll Down to Morph</h1>
            </div>
            
            <div ref={containerRef} className="relative h-[300vh]">
                <div className="sticky top-0 h-screen w-full overflow-hidden">
                    <IntroAnimation scrollProgress={scrollYProgress} />
                </div>
            </div>

            <div className="h-[100vh] flex items-center justify-center bg-zinc-100 border-t">
                <h1 className="text-4xl font-black uppercase">Section Ended</h1>
            </div>
        </div>
    );
}
