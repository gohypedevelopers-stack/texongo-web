"use client";

import { FabricCard } from "../../components/ui/fabric-card";
import { ChevronDown, Filter } from "lucide-react";

const fabricsData = [
  { name: "Cotton Spandex Single Jersey", price: "750", gsm: "170", image: "/arrivals/prod-cotton-spandex-interlock.png" },
  { name: "Spandex Stripe Single Jersey", price: "700", gsm: "153", image: "/category/fabric-rib.png" },
  { name: "Rayon Interlock", price: "900", gsm: "170", image: "/category/fabric-pique.png" },
  { name: "Spandex Stripe Single Jersey", price: "700", gsm: "153", image: "/category/fabric-french-terry.png" },
  { name: "Polyester Vellour", price: "880", gsm: "265", image: "/category/fabric-single-jersey.png" },
  { name: "Polyester Viscose Spandex S/J", price: "825", gsm: "245", image: "/arrivals/prod-poly-viscose-spandex.png" },
  { name: "Viscose Single Jersey", price: "800", gsm: "161", image: "/arrivals/prod-nylon-spandex.png" },
  { name: "Viscose Jacquard Single Jersey", price: "800", gsm: "182", image: "/arrivals/prod-slub-melange.png" },
  { name: "Viscose Jacquard", price: "800", gsm: "182", image: "/category/fabric-waffle.png" },
  { name: "Viscose Jacquard Single Jersey (Grey)", price: "800", gsm: "182", image: "/category/fabric-rib.png" },
  { name: "Viscose Jacquard", price: "800", gsm: "182", image: "/category/fabric-pique.png" },
  { name: "Viscose Spandex", price: "750", gsm: "182", image: "/arrivals/prod-cotton-spandex-interlock.png" },
  { name: "Viscose Spandex (Black Print)", price: "750", gsm: "200", image: "/category/fabric-single-jersey.png" },
  { name: "Viscose Spandex (Pink)", price: "750", gsm: "200", image: "/category/fabric-french-terry.png" },
  { name: "Viscose Spandex Interlock", price: "700", gsm: "170", image: "/category/fabric-waffle.png" },
  { name: "Viscose Spandex (Blue)", price: "750", gsm: "182", image: "/arrivals/prod-nylon-spandex.png" },
];

export default function FabricsListingPage() {
  return (
    <main className="min-h-screen bg-white">

      {/* Hero Banner Section */}
      <section className="relative h-[20vh] md:h-[40vh] w-full overflow-hidden bg-gray-100 border-b border-gray-100">
        <img 
          src="/hero/hero-fabrics.jpg" 
          alt="Our Fabrics" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/10"></div>
      </section>

      {/* Filter & Sorting Bar */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-12">
        <div className="flex flex-col gap-10">
          {/* Filter Labels */}
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold tracking-tight text-gray-800">Filter</h1>
          </div>

          {/* Filter Dropdowns */}
          <div className="flex items-center gap-4">
            <FilterDropdown label="Gsm" />
            <FilterDropdown label="Colors" />
          </div>

          {/* Results Info & Sort */}
          <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-100 pt-8 gap-4">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              Showing 1–16 of 1298 results
            </p>
            <div className="flex items-center gap-3 border border-gray-100 rounded px-4 py-2 cursor-pointer hover:border-black transition-colors group">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest group-hover:text-black">Sort by:</span>
              <span className="text-xs font-black uppercase tracking-widest">Sort by latest</span>
              <ChevronDown size={14} className="text-gray-400" />
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 mt-16">
          {fabricsData.map((fabric, idx) => (
            <FabricCard 
              key={`${fabric.name}-${idx}`}
              name={fabric.name}
              price={fabric.price}
              gsm={fabric.gsm}
              image={fabric.image}
            />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 mt-24 mb-12">
          <PaginationButton label="1" active />
          <PaginationButton label="2" />
          <PaginationButton label="3" />
          <PaginationButton label="4" />
          <span className="px-3 text-gray-400">...</span>
          <PaginationButton label="80" />
          <PaginationButton label="81" />
          <PaginationButton label="82" />
          <PaginationButton isNext />
        </div>
      </div>

      {/* High-End Footer (Reused from logic) */}
      <footer className="bg-black text-white pt-24 pb-12">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 mb-20">
            <div className="space-y-8">
              <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-white/40">About Us</h3>
              <p className="text-sm font-medium text-white/70 leading-relaxed max-w-sm">
                At Texongo, we redefine the fabric sourcing experience, transforming a traditionally complex process into a seamless journey from idea to inventory. We are your one-stop solution for all knit fabrics.
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
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">© 2026 Texongo Fabrics. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}

function FilterDropdown({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-8 border border-gray-100 rounded px-6 py-2 min-w-[120px] justify-between cursor-pointer hover:border-black transition-colors">
      <span className="text-xs font-black uppercase tracking-widest text-[#121212]">{label}</span>
      <ChevronDown size={14} className="text-gray-400" />
    </div>
  );
}

function PaginationButton({ label, active, isNext }: { label?: string, active?: boolean, isNext?: boolean }) {
  return (
    <button 
      className={`h-10 w-10 flex items-center justify-center text-[11px] font-black transition-all rounded-sm border ${
        active 
          ? "bg-black text-white border-black" 
          : "bg-white text-gray-400 border-gray-100 hover:border-black hover:text-black"
      }`}
    >
      {isNext ? "→" : label}
    </button>
  );
}
