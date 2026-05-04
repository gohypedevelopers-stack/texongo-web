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
    amount: 0,
    margin: "0px" 
  });

  return (
    <div ref={ref} className={className}>
      <Suspense fallback={fallback}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.1
          }}
        >
          {children}
        </motion.div>
      </Suspense>
    </div>
  );
}
