"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Truck, Package, Clock, ShieldCheck, Globe } from "lucide-react";

const FeatureCard = ({ icon: Icon, title, content }: any) => (
  <div className="bg-gray-50/50 p-8 border border-gray-100 space-y-4">
    <Icon className="text-[#57AD43]" size={24} />
    <h3 className="text-[11px] font-bold uppercase tracking-widest text-black">{title}</h3>
    <p className="text-sm text-gray-600 leading-relaxed">{content}</p>
  </div>
);

export default function ShippingAndReturnPolicy() {
  return (
    <main className="min-h-screen bg-white pb-32 pt-24 lg:pt-44">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[20%] -left-[5%] w-[30%] h-[30%] bg-[#57AD43]/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[20%] -right-[5%] w-[30%] h-[30%] bg-blue-50/30 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-[1100px] mx-auto px-6 lg:px-10 relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-20 text-center lg:text-left"
        >
          <Link 
            href="/" 
            className="group flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors mb-12 w-fit mx-auto lg:mx-0"
          >
            <ArrowLeft size={12} className="transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>
          <h1 className="text-4xl lg:text-7xl font-bold uppercase tracking-tighter text-black mb-6">
            Shipping & <span className="text-[#57AD43]">Returns</span>
          </h1>
          <p className="max-w-2xl text-gray-500 text-sm leading-relaxed italic">
            "Delivering premium knitted fabrics worldwide with accuracy, care, and transparency."
          </p>
        </motion.div>

        {/* Quick Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          <FeatureCard 
            icon={ShieldCheck} 
            title="Inspection Ready" 
            content="The buyer is responsible for inspecting fabric upon receipt and testing prior to any cutting or production." 
          />
          <FeatureCard 
            icon={Package} 
            title="No-Return Policy" 
            content="Cut fabric cannot be returned or exchanged. Laundry or processed fabric is deemed accepted by the buyer." 
          />
          <FeatureCard 
            icon={Truck} 
            title="Tracked Shipping" 
            content="Reliable delivery across India and international destinations with real-time tracking updates." 
          />
        </div>

        {/* Detailed Sections */}
        <div className="space-y-24">
          {/* Shipping Rates */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start border-t border-gray-100 pt-12">
            <div className="lg:col-span-4">
              <h2 className="text-2xl font-bold uppercase tracking-tighter text-black">
                Shipping <span className="text-[#57AD43]">Rates</span>
              </h2>
            </div>
            <div className="lg:col-span-8 space-y-8">
              <div className="text-sm text-gray-600 leading-relaxed">
                <p>
                  Your shipping rate at checkout is calculated based on the total weight, packaging type, and delivery destination of your order. At Texongo, we aim to keep shipping charges as fair and economical as possible.
                </p>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">
                {[
                  "Subsidized & discounted checkout rates",
                  "Automatic weight-based calculation",
                  "Crease-free tube packing (where applicable)",
                  "No hidden handling charges",
                  "Bulky packaging costs absorbed by us"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest text-black">
                    <div className="w-1 h-1 bg-[#57AD43]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Shipping Time */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start border-t border-gray-100 pt-12">
            <div className="lg:col-span-4">
              <div className="flex items-center gap-4 mb-4">
                <Clock className="text-[#57AD43]" size={20} />
                <h2 className="text-2xl font-bold uppercase tracking-tighter text-black">Dispatch Time</h2>
              </div>
            </div>
            <div className="lg:col-span-8">
              <div className="bg-gray-50 p-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-[10px] font-bold text-[#57AD43] uppercase tracking-widest mb-2">Standard Ground</h4>
                    <p className="text-sm font-bold">3–7 Business Days</p>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold text-[#57AD43] uppercase tracking-widest mb-2">Metro Cities</h4>
                    <p className="text-sm font-bold">2–4 Business Days</p>
                  </div>
                </div>
                <div className="pt-6 border-t border-gray-200">
                  <p className="text-[11px] text-gray-400 italic">
                    * Orders are usually dispatched within 1–7 business days after payment confirmation. Business days: Mon-Fri.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* International Shipping */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start border-t border-gray-100 pt-12">
            <div className="lg:col-span-4">
              <div className="flex items-center gap-4 mb-4">
                <Globe className="text-[#57AD43]" size={20} />
                <h2 className="text-2xl font-bold uppercase tracking-tighter text-black">Global Reach</h2>
              </div>
            </div>
            <div className="lg:col-span-8 bg-black text-white p-12 space-y-8">
              <h3 className="text-xl font-bold uppercase tracking-tight">International Shipping Info</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Texongo provides international shipping worldwide, subject to serviceability. All shipments may be subject to customs duties and taxes of the destination country, which are the sole responsibility of the customer.
              </p>
              <div className="pt-8 border-t border-white/10">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4">Need a Quote?</p>
                <a href="mailto:connect@texongo.com" className="text-[#57AD43] text-sm font-bold border-b border-[#57AD43] pb-1 hover:text-white transition-colors">
                  connect@texongo.com
                </a>
              </div>
            </div>
          </section>

          {/* Undeliverables */}
          <section className="bg-gray-50 p-12 lg:p-16 text-center space-y-6">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.4em] text-red-500">Undeliverable / Returned Shipments</h2>
            <p className="max-w-2xl mx-auto text-sm text-gray-600 leading-relaxed italic">
              "Orders returned due to incorrect details or refusal will be treated as returns. Initial shipping costs and return charges will be deducted from any refund."
            </p>
          </section>

          {/* Customer Support Info (Formerly Footer) */}
          <section className="pt-20 border-t border-gray-100 text-center pb-12">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-8">Customer Support</p>
            <div className="flex flex-col md:flex-row justify-center items-center gap-12 font-bold uppercase tracking-widest text-xs text-black">
              <div className="space-y-1">
                <p className="text-gray-400 text-[10px] mb-2 font-bold">Email</p>
                <p>connect@texongo.com</p>
              </div>
              <div className="space-y-1">
                <p className="text-gray-400 text-[10px] mb-2 font-bold">Phone</p>
                <p>+91 99100 48498</p>
              </div>
              <div className="space-y-1">
                <p className="text-gray-400 text-[10px] mb-2 font-bold">Hours</p>
                <p>Mon - Fri | 10:00 - 18:00 (IST)</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
