'use client';

import { ReactNode, Suspense, useRef } from 'react';
import { useInView } from 'framer-motion';

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
    margin: "200px 0px 200px 0px" // Load slightly before coming into view
  });

  return (
    <div ref={ref} className={className}>
      <Suspense fallback={fallback}>
        {isInView ? children : fallback}
      </Suspense>
    </div>
  );
}
