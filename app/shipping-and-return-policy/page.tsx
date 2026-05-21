"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Truck, Package, Clock, ShieldCheck, Globe } from "lucide-react";
import { PageHero } from "../../components/ui/page-hero";

const FeatureCard = ({ icon: Icon, title, content }: any) => (
  <div className="bg-gray-50/50 p-8 border border-gray-100 space-y-4">
    <Icon className="text-[#57AD43]" size={24} />
    <h3 className="text-[11px] font-bold uppercase tracking-widest text-black">{title}</h3>
    <p className="text-sm text-gray-600 leading-relaxed">{content}</p>
  </div>
);

export default function ShippingAndReturnPolicy() {
  return (
    <main className="min-h-screen bg-white pb-32">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[15%] -left-[10%] w-[40%] h-[40%] bg-[#57AD43]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[15%] -right-[10%] w-[40%] h-[40%] bg-blue-50/40 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-[1240px] mx-auto px-8 lg:px-12 relative z-10 pt-12 text-center">
        <Link
          href="/"
          className="group inline-flex items-center gap-3 text-[12px] font-black uppercase tracking-[0.3em] text-gray-400 hover:text-black transition-all mb-4"
        >
          <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-2" />
          Return to Store
        </Link>
      </div>

      <PageHero subtitle="Store Policies" mainTitle="Shipping &" accentTitle="Returns" />

      <div className="max-w-[1240px] mx-auto px-8 lg:px-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="mb-24 text-center"
        >
          <p className="max-w-2xl text-gray-500 text-sm font-medium leading-relaxed italic border-l-4 border-[#57AD43] pl-8 py-2 mx-auto text-center">
            "Delivering premium knitted fabrics worldwide with accuracy, care, and total transparency."
          </p>
        </motion.div>

        {/* Quick Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-32">
          <FeatureCard
            icon={ShieldCheck}
            title="Inspection Ready"
            content="Buyers are responsible for inspecting all fabrics immediately upon receipt. Quality testing must be completed prior to any cutting or production."
          />
          <FeatureCard
            icon={Package}
            title="No-Return Policy"
            content="Cut fabric cannot be returned or exchanged. Any fabric that has been laundered or processed is deemed accepted by the buyer."
          />
          <FeatureCard
            icon={Truck}
            title="Tracked Shipping"
            content="We provide reliable, real-time tracked delivery across India and international destinations through professional logistics partners."
          />
        </div>

        {/* Detailed Sections */}
        <div className="space-y-32">
          {/* Shipping Rates */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start border-t border-gray-200 pt-16">
            <div className="lg:col-span-4 sticky top-32">
              <span className="text-[#57AD43] font-black text-sm tracking-widest uppercase mb-4 block">Section 01</span>
              <h2 className="text-3xl lg:text-4xl font-black uppercase tracking-tighter text-black">
                Shipping <span className="text-[#57AD43]">Rates</span>
              </h2>
            </div>
            <div className="lg:col-span-8 space-y-10">
              <div className="text-lg lg:text-xl text-gray-600 leading-relaxed font-medium">
                <p>
                  Shipping rates are calculated at checkout based on the total weight, packaging dimensions, and final destination. At Texongo, we minimize shipping overhead to ensure fair and economical pricing for our global clients.
                </p>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10">
                {[
                  "Subsidized & discounted checkout rates",
                  "Automatic weight-based calculation",
                  "Crease-free tube packing (where applicable)",
                  "No hidden handling or service charges",
                  "Bulky packaging costs absorbed by us",
                  "Transparent carrier selection"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-[13px] font-black uppercase tracking-widest text-black/80">
                    <div className="w-2 h-2 bg-[#57AD43] mt-1" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Shipping Time */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start border-t border-gray-200 pt-16">
            <div className="lg:col-span-4 sticky top-32">
              <span className="text-[#57AD43] font-black text-sm tracking-widest uppercase mb-4 block">Section 02</span>
              <div className="flex items-center gap-4 mb-4">
                <Clock className="text-[#57AD43]" size={28} />
                <h2 className="text-3xl lg:text-4xl font-black uppercase tracking-tighter text-black">Timeline</h2>
              </div>
            </div>
            <div className="lg:col-span-8">
              <div className="bg-gray-50 border border-gray-100 p-12 space-y-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                  <div className="space-y-4">
                    <h4 className="text-[12px] font-black text-[#57AD43] uppercase tracking-[0.3em]">Standard Ground</h4>
                    <p className="text-2xl font-black text-black">3–7 Business Days</p>
                    <p className="text-sm text-gray-500">Reliable pan-India delivery for bulk orders.</p>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-[12px] font-black text-[#57AD43] uppercase tracking-[0.3em]">Express Metros</h4>
                    <p className="text-2xl font-black text-black">2–4 Business Days</p>
                    <p className="text-sm text-gray-500">Prioritized delivery for major metropolitan hubs.</p>
                  </div>
                </div>
                <div className="pt-8 border-t border-gray-200">
                  <p className="text-sm text-gray-400 italic">
                    * Orders are typically dispatched within 1–7 business days after payment confirmation. Business days: Monday to Friday.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* International Shipping */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start border-t border-gray-200 pt-16">
            <div className="lg:col-span-4 sticky top-32">
              <span className="text-[#57AD43] font-black text-sm tracking-widest uppercase mb-4 block">Section 03</span>
              <div className="flex items-center gap-4 mb-4">
                <Globe className="text-[#57AD43]" size={28} />
                <h2 className="text-3xl lg:text-4xl font-black uppercase tracking-tighter text-black">Exports</h2>
              </div>
            </div>
            <div className="lg:col-span-8 bg-black text-white p-16 space-y-10 shadow-2xl">
              <h3 className="text-3xl font-black uppercase tracking-tight">International Shipping</h3>
              <p className="text-lg text-gray-400 leading-relaxed">
                Texongo provides global logistics reach. All international shipments are subject to local customs duties, taxes, and import regulations of the destination country, which are the exclusive responsibility of the recipient.
              </p>
              <div className="pt-10 border-t border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8">
                <div>
                  <p className="text-[12px] font-black uppercase tracking-[0.3em] mb-4 text-white/40">Inquiries</p>
                  <a href="mailto:connect@texongo.com" className="text-[#57AD43] text-xl font-bold border-b-2 border-[#57AD43] pb-1 hover:text-white transition-colors">
                    connect@texongo.com
                  </a>
                </div>
                <Link href="/contact-us" className="bg-[#57AD43] text-black text-[12px] font-black tracking-widest uppercase px-10 py-5 rounded-full hover:bg-white transition-all">
                  Request Quote
                </Link>
              </div>
            </div>
          </section>

          {/* Undeliverables */}
          <section className="bg-gray-50 p-16 lg:p-24 text-center space-y-8 border border-gray-100">
            <h2 className="text-[13px] font-black uppercase tracking-[0.5em] text-red-500">Notice for Returns</h2>
            <p className="max-w-3xl mx-auto text-xl lg:text-2xl font-medium text-black leading-tight italic">
              "Orders returned due to incorrect address details or refusal will be treated as returns. Initial shipping costs and return handling fees will be deducted from your final credit."
            </p>
          </section>

          {/* Support Info */}
          <section className="pt-32 border-t border-gray-200 text-center pb-24">
            <p className="text-[13px] font-black uppercase tracking-[0.4em] text-[#57AD43] mb-12">Global Assistance</p>
            <div className="flex flex-col md:flex-row justify-center items-center gap-16 lg:gap-24 font-bold uppercase tracking-[0.2em] text-sm text-black">
              {[
                { label: "Email", value: "connect@texongo.com" },
                { label: "Direct", value: "+91 99100 48498" },
                { label: "Business Hours", value: "Mon - Fri | 10:00 - 18:00 (IST)" }
              ].map((info, i) => (
                <div key={i} className="space-y-3">
                  <p className="text-gray-400 text-[11px] uppercase font-black">{info.label}</p>
                  <p className="text-base lg:text-lg">{info.value}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
