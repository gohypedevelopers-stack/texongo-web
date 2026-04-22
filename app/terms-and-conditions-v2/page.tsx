"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsAndConditions() {
   return (
      <main className="min-h-screen bg-white pb-32 pt-24 lg:pt-48">
         {/* Background Decor */}
         <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            <div className="absolute -top-[10%] -right-[10%] w-[50%] h-[50%] bg-[#57AD43]/5 rounded-full blur-[150px]" />
            <div className="absolute -bottom-[10%] -left-[10%] w-[50%] h-[50%] bg-gray-100/50 rounded-full blur-[150px]" />
         </div>

         <div className="max-w-[1200px] mx-auto px-8 lg:px-12 relative z-10">
            {/* Header */}
            <motion.div
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, ease: "easeOut" }}
               className="mb-32"
            >
               <Link
                  href="/"
                  className="group flex items-center gap-3 text-[12px] font-black uppercase tracking-[0.3em] text-gray-400 hover:text-black transition-all mb-16 w-fit"
               >
                  <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-2" />
                  Back to Home
               </Link>
               <h1 className="text-5xl lg:text-9xl font-black uppercase tracking-tighter text-black mb-8 leading-[0.85]">
                  Terms & <br />
                  <span className="text-[#57AD43]">Conditions</span>
               </h1>
               <div className="flex items-center gap-6">
                  <span className="h-px w-12 bg-[#57AD43]" />
                  <p className="text-[12px] font-black uppercase tracking-[0.4em] text-gray-400">
                     Revision: April 2026
                  </p>
               </div>
            </motion.div>

            {/* Content Area */}
            <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.3, duration: 1 }}
               className="space-y-32"
            >
               {/* Section 1: Care Info */}
               <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
                  <div className="lg:col-span-4">
                     <h2 className="text-sm font-black uppercase tracking-[0.5em] text-[#57AD43] mb-4">01. Fabric Care</h2>
                     <p className="text-gray-400 text-sm font-black uppercase tracking-widest">Maintenance Guidelines</p>
                  </div>
                  <div className="lg:col-span-8">
                     <div className="text-lg lg:text-xl leading-[1.6] text-gray-600 font-medium italic border-b border-gray-100 pb-12">
                        <p>
                           Wash in warm or cool water to prevent shrinking and fading. Machine-dry or air-dry using moderate temperatures. Iron on high heat while the fabric is slightly damp, using steam if needed. These care instructions are for Cotton in general; however, Texongo does not accept responsibility for fabrics damaged by following these instructions. <span className="text-black font-black underline decoration-[#57AD43] decoration-2 underline-offset-4">Customers MUST test a swatch before laundering any fabric.</span>
                        </p>
                     </div>
                  </div>
               </section>

               {/* Section 2: Tolerances */}
               <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
                  <div className="lg:col-span-4">
                     <h2 className="text-sm font-black uppercase tracking-[0.5em] text-black mb-4">02. Tolerances</h2>
                     <p className="text-gray-400 text-sm font-black uppercase tracking-widest">Quality Standards</p>
                  </div>
                  <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-16">
                     <div className="space-y-6">
                        <h3 className="text-[13px] font-black uppercase tracking-widest text-black flex items-center gap-3">
                           <div className="w-2 h-2 bg-[#57AD43] rotate-45" /> GSM Margin
                        </h3>
                        <p className="text-base lg:text-lg text-gray-500 leading-relaxed font-medium">
                           All fabrics supplied by Texongo are subject to a GSM tolerance of ±10% from the specifications. Such variation is inherent to knitted fabric production and shall not be considered a defect.
                        </p>
                     </div>
                     <div className="space-y-6">
                        <h3 className="text-[13px] font-black uppercase tracking-widest text-black flex items-center gap-3">
                           <div className="w-2 h-2 bg-[#57AD43] rotate-45" /> Width Deviation
                        </h3>
                        <p className="text-base lg:text-lg text-gray-500 leading-relaxed font-medium">
                           Fabric width may vary marginally due to knitting structure and finishing processes. Minor deviations are standard and acceptable within global textile industry norms.
                        </p>
                     </div>
                  </div>
               </section>

               {/* Section 3: Disclaimers */}
               <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
                  <div className="lg:col-span-4">
                     <h2 className="text-sm font-black uppercase tracking-[0.5em] text-black mb-4">03. Disclaimers</h2>
                     <p className="text-gray-400 text-sm font-black uppercase tracking-widest">Legal Notice</p>
                  </div>
                  <div className="lg:col-span-8 space-y-16">
                     <div className="p-12 bg-gray-50 border-l-[12px] border-[#57AD43] shadow-sm">
                        <h3 className="text-[12px] font-black uppercase tracking-[0.4em] text-[#57AD43] mb-6">Color Variation</h3>
                        <p className="text-lg lg:text-xl text-black font-medium leading-relaxed italic">
                           "Minor variations in color may occur due to dye lots, fabric batches, and lighting conditions. These variations are an organic part of the textile process and shall not be treated as defects."
                        </p>
                     </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                        <div className="space-y-6">
                           <h3 className="text-[13px] font-black uppercase tracking-widest text-black">Quantity Tolerance</h3>
                           <p className="text-base text-gray-500 font-medium">Bulk fabric orders may be delivered with a quantity variance of ±3–5%, which is standard for large-scale supply.</p>
                        </div>
                        <div className="space-y-6">
                           <h3 className="text-[13px] font-black uppercase tracking-widest text-black">Sample Disclaimer</h3>
                           <p className="text-base text-gray-500 font-medium">Samples are for reference only. Bulk orders may vary slightly in shade, GSM, width, or finish from the initial sample swatch.</p>
                        </div>
                     </div>
                  </div>
               </section>

               {/* Section 4: Responsibility */}
               <section className="bg-black text-white p-12 lg:p-24 space-y-10 group hover:bg-[#57AD43] transition-colors duration-700">
                  <h2 className="text-[12px] font-black uppercase tracking-[0.6em] text-[#57AD43] group-hover:text-black transition-colors">04. Inspection & Risk</h2>
                  <div className="space-y-8">
                     <p className="text-2xl lg:text-4xl font-black leading-tight tracking-tighter">
                        The buyer bears absolute responsibility for inspecting fabric upon delivery and conducting all necessary testing prior to cutting.
                     </p>
                     <p className="text-lg text-white/60 font-medium max-w-2xl group-hover:text-black/80 transition-colors">
                        Texongo shall not be liable for any loss, damage, or legal claims arising after the fabric has been cut, processed, or introduced into production.
                     </p>
                  </div>
               </section>

               {/* Final Authority */}
               <section className="text-center py-24 border-t border-gray-100">
                  <div className="max-w-4xl mx-auto space-y-10">
                     <h2 className="text-sm font-black uppercase tracking-[0.5em] text-black">05. Authority</h2>
                     <p className="text-lg lg:text-xl text-gray-500 leading-relaxed font-medium">
                        Packaging method (rolled vs. folded) is based on logistics requirements and shall not be grounds for claims. Texongo reserves the exclusive right of final decision regarding quality, tolerances, or defects.
                     </p>
                     <div className="pt-12">
                        <p className="text-[11px] font-black uppercase tracking-[0.4em] text-gray-300 mb-8">Official Representative</p>
                        <div className="text-black font-black uppercase tracking-widest text-sm space-y-2">
                           <p className="text-xl lg:text-2xl">Textile On Pvt Ltd</p>
                           <p className="text-gray-400">New Delhi, India</p>
                        </div>
                     </div>
                  </div>
               </section>
            </motion.div>
         </div>
      </main>
   );
}
