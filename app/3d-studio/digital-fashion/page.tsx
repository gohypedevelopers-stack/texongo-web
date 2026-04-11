"use client";

import { motion } from "framer-motion";

export default function DigitalFashionPage() {
  // Creating a large array of placeholders as seen in the screenshot
  const placeholders = Array.from({ length: 45 }, (_, i) => i + 1);

  return (
    <main className="min-h-screen bg-black text-white">

      {/* Page Title */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-16 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl md:text-3xl font-black uppercase tracking-[0.3em]"
        >
          Digital Fashion
        </motion.h1>
      </div>

      {/* Cinematic Grid */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-10 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1">
          {placeholders.map((id) => (
            <motion.div
              key={id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (id % 3) * 0.1 }}
              className="relative aspect-[3/4] bg-zinc-900 overflow-hidden group cursor-pointer"
            >
              {/* Overlay for hover interaction */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 flex items-center justify-center">
                <span className="text-[10px] font-black uppercase tracking-widest border border-white/30 px-4 py-2">
                  View Case Study
                </span>
              </div>
              
              {/* Placeholder indicator (User will add images/videos later) */}
              <div className="absolute inset-0 flex items-center justify-center text-zinc-800 text-[10px] font-black uppercase tracking-[0.5em] rotate-90">
                Texongo 3D Studio Content
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
