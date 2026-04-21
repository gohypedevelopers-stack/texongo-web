"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsAndConditions() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  return (
    <main className="min-h-screen bg-white pb-32 pt-24 lg:pt-44">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-[10%] -right-[10%] w-[40%] h-[40%] bg-[#57AD43]/5 rounded-full blur-[120px]" />
        <div className="absolute -bottom-[10%] -left-[10%] w-[40%] h-[40%] bg-gray-100/50 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-[1000px] mx-auto px-6 lg:px-10 relative z-10">
        {/* Header */}
        <motion.div {...fadeIn} className="mb-20">
          <Link 
            href="/" 
            className="group flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors mb-12 w-fit"
          >
            <ArrowLeft size={12} className="transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>
          <h1 className="text-4xl lg:text-6xl font-bold uppercase tracking-tighter text-black mb-6">
            Terms & <span className="text-[#57AD43]">Conditions</span>
          </h1>
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-gray-400">
            Last Updated: April 2026
          </p>
        </motion.div>

        {/* Content */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="space-y-16"
        >
          {/* Section 1: Care Info */}
          <section className="space-y-6">
            <h2 className="text-lg font-bold uppercase tracking-widest text-[#57AD43] border-b border-gray-100 pb-4">
              01. Care Info
            </h2>
            <div className="text-sm leading-relaxed text-gray-600 italic">
              <p>
                Wash in warm or cool water to prevent shrinking and fading. It can be machine-dried or air-dried using moderate to high temperatures. Iron on high heat while the fabric is slightly damp. Use steam if needed. These care instructions given are for Cotton in general, however, Texongo does not accept responsibility for fabrics that are incorrectly laundered/damaged by following these instructions. Customers must test a swatch before laundering any fabric.
              </p>
            </div>
          </section>

          {/* Section 2: Tolerances */}
          <section className="space-y-6">
            <h2 className="text-lg font-bold uppercase tracking-widest text-black border-b border-gray-100 pb-4">
              02. Manufacturing & Quality Tolerances
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-4">
                <h3 className="text-[11px] font-bold uppercase tracking-widest text-black">GSM Tolerance</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  All fabrics supplied by Texongo are subject to a GSM tolerance of ±10% from the specifications mentioned on the website, invoice, or order confirmation. Such variation is inherent to knitted fabric production and shall not be considered a defect.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-[11px] font-bold uppercase tracking-widest text-black">Width Tolerance</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Fabric width may vary marginally due to knitting structure, finishing processes, and batch-to-batch production variations. Minor deviations in width are normal and acceptable within industry standards.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Disclaimers */}
          <section className="space-y-6">
            <h2 className="text-lg font-bold uppercase tracking-widest text-black border-b border-gray-100 pb-4">
              03. Disclaimers
            </h2>
            <div className="space-y-8">
              <div className="p-8 bg-gray-50 border-l-4 border-[#57AD43]">
                <h3 className="text-[11px] font-bold uppercase tracking-widest text-[#57AD43] mb-4">Color Variation</h3>
                <p className="text-sm text-gray-600 leading-relaxed italic">
                  Minor variations in color may occur due to dye lots, fabric batches, lighting conditions, and screen or device display differences. Such variations shall not be treated as defects.
                </p>
              </div>
              <div className="flex flex-col md:flex-row gap-12">
                <div className="flex-1 space-y-4">
                  <h3 className="text-[11px] font-bold uppercase tracking-widest text-black">Quantity Tolerance</h3>
                  <p className="text-sm text-gray-600">Fabric orders may be delivered with a quantity variance of ±3–5%, which is considered standard for bulk textile supplies.</p>
                </div>
                <div className="flex-1 space-y-4">
                  <h3 className="text-[11px] font-bold uppercase tracking-widest text-black">Sample Disclaimer</h3>
                  <p className="text-sm text-gray-600">Samples provided are intended solely for reference of fabric quality, texture, and construction. Bulk orders may vary slightly in shade, GSM, width, or finish.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Responsibility */}
          <section className="space-y-6">
            <h2 className="text-lg font-bold uppercase tracking-widest text-black border-b border-gray-100 pb-4">
              04. Inspection & Responsibility
            </h2>
            <div className="text-sm leading-relaxed text-gray-600 space-y-4">
              <p>
                The buyer is responsible for inspecting the fabric upon receipt and conducting necessary testing prior to cutting or production. Texongo shall not be liable for any loss, damage, or claims arising after fabric processing or usage.
              </p>
              <p className="font-bold text-black uppercase text-[10px] tracking-widest bg-gray-50 p-4 inline-block">
                Minor irregularities such as knots, slubs, or texture variations are natural characteristics of knitted fabrics and shall not be considered manufacturing defects.
              </p>
            </div>
          </section>

          {/* Section 5: Packaging & Authority */}
          <section className="space-y-6">
            <h2 className="text-lg font-bold uppercase tracking-widest text-black border-b border-gray-100 pb-4">
              05. Packaging & Final Authority
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Fabrics are packed either rolled or folded, depending on fabric type, quantity, and logistics requirements. Packaging method shall not be a basis for claim unless physical damage is evident at delivery. Texongo reserves the right of final decision regarding quality, tolerances, or defects.
            </p>
          </section>

          {/* Contact Details Section (Formerly Footer) */}
          <section className="pt-20 border-t border-gray-100 pb-12">
            <div className="bg-black text-white p-12 lg:p-16 flex flex-col md:flex-row justify-between items-start gap-12">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#57AD43] mb-6">Sold & Marketed by</p>
                <div className="space-y-1 text-sm font-bold uppercase tracking-widest">
                  <p>TEXTILE ON PVT LTD</p>
                  <p>D 10/1 Okhla Industrial Area</p>
                  <p>Phase II, New Delhi – 110020</p>
                  <p className="text-[#57AD43] mt-4">GST NO: 07AAJCT3326N1ZY</p>
                </div>
              </div>
              <div className="pt-8">
                <Link 
                  href="/shipping-and-return-policy"
                  className="text-white border border-white/20 px-8 py-4 text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all"
                >
                  View Shipping Policy
                </Link>
              </div>
            </div>
          </section>
        </motion.div>
      </div>
    </main>
  );
}
