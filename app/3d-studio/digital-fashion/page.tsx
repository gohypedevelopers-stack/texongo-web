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

      {/* Footer */}
      <footer className="bg-zinc-900 border-t border-white/5 text-white pt-24 pb-12">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 mb-20">
            <div className="space-y-8">
              <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-white/40">About Us</h3>
              <p className="text-sm font-medium text-white/70 leading-relaxed max-w-sm">
                At Texongo, we redefine the fabric sourcing experience, transforming a traditionally complex process into a seamless journey from idea to inventory.
              </p>
            </div>
            <div className="space-y-8">
              <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-white/40">Menu</h3>
              <ul className="grid grid-cols-2 gap-4">
                {["Home", "About Us", "Contact Us", "Terms of Service", "Refund Policy", "Shipping Policy", "Privacy Policy"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm font-bold text-white/60 hover:text-white transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-8">
              <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-white/40">Contact Details</h3>
              <div className="space-y-4">
                <p className="text-sm text-white/70 font-medium">D 10/1, Pocket D, Okhla Industrial Area Phase II, New Delhi, Delhi 110020</p>
                <p className="text-sm text-white/70 font-medium">Contact No: +91 9910048498</p>
                <p className="text-sm text-white/70 font-medium">Email id - contact@texongo.com</p>
              </div>
            </div>
          </div>
          <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">© 2026 Texongo. Made with ThemeHunk WordPress Theme</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
