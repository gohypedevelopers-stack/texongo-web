'use client';

import { ReactNode, Suspense, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface LazySectionProps {
  children: ReactNode;
  fallback?: ReactNode;
  threshold?: number;
  once?: boolean;
  className?: string;
}

export function LazySection({
  children,
  fallback = <div className="w-full h-40 flex items-center justify-center bg-[#F9FAFB]/50 animate-pulse rounded-2xl" />,
  threshold = 0.1,
  once = true,
  className = "",
}: LazySectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once,
    amount: threshold,
    margin: "0px 0px -100px 0px" // Trigger slightly after coming into view for better visibility
  });

  return (
    <div ref={ref} className={className}>
      <Suspense fallback={fallback}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1], // Cubic bezier for smooth reveal
            delay: 0.1
          }}
        >
          {isInView ? children : <div className="invisible">{children}</div>}
        </motion.div>
      </Suspense>
    </div>
  );
}
