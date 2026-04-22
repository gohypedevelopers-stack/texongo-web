"use client";

import { FabricCard } from "../../components/ui/fabric-card";
import { ChevronDown, Filter, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Fabric, mapShopifyProduct } from "@/lib/shopify";

export default function FabricsListingPage() {
  const [fabrics, setFabrics] = useState<Fabric[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/api/shopify/products');
        const result = await response.json();

        if (result.data?.products?.edges) {
          // The API route currently returns the raw Shopify response. 
          // Let's use the mapping logic we put in lib/shopify.ts or map it here.
          // Since the API route returns the raw response, we'll map it here for now.
          const mappedProducts = result.data.products.edges.map(({ node }: any) => mapShopifyProduct(node));
          setFabrics(mappedProducts);
        } else {
          setError("No products found");
        }
      } catch (err) {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);
  return (
    <main className="min-h-screen bg-white">

      {/* Hero Banner Section */}
      <section className="relative h-[25vh] md:h-[50vh] w-full overflow-hidden bg-gray-900 border-b border-gray-100 flex items-center justify-center">
        <img
          src="/hero/hero-fabrics.jpg"
          alt="Our Fabrics"
          className="absolute inset-0 w-full h-full object-cover opacity-60 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="relative z-10 text-center px-6">
           <span className="text-[10px] font-black uppercase tracking-[0.6em] text-[#57AD43] mb-4 block">Exquisite Curation</span>
           <h1 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none">
              KNIT <span className="text-[#57AD43]">STYLE</span>
           </h1>
        </div>
      </section>

      {/* Filter & Sorting Bar */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-12">
        <div className="flex flex-col items-center gap-12 text-center">
          {/* Filter Labels */}
          <div className="space-y-4">
            <h2 className="text-4xl lg:text-7xl font-black uppercase tracking-tighter text-black">Curation <span className="text-[#57AD43]">Filters</span></h2>
            <div className="h-px bg-gray-100 w-24 mx-auto" />
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-6">
            <FilterDropdown label="Gsm Range" />
            <FilterDropdown label="Color Palette" />
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-100 pt-12 gap-8 mt-12">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em]">
              Archive Analysis: {fabrics.length} result{fabrics.length !== 1 ? 's' : ''}
            </p>
            <div className="flex items-center gap-4 border-b-2 border-black pb-2 cursor-pointer hover:border-[#57AD43] transition-all group">
              <span className="text-xs font-black uppercase tracking-widest text-gray-400">Sort Matrix:</span>
              <span className="text-sm font-black uppercase tracking-tight">Latest Selection</span>
              <ChevronDown size={14} className="text-black" />
            </div>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[400px] w-full gap-4">
            <Loader2 className="animate-spin text-gray-400" size={40} />
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Loading fine fabrics...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center min-h-[400px] w-full gap-4">
            <p className="text-sm font-bold text-red-400 uppercase tracking-widest">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-black text-white text-[10px] font-black uppercase tracking-widest rounded-sm"
            >
              Retry
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 mt-16">
            {fabrics.map((fabric) => (
              <FabricCard
                key={fabric.id}
                id={fabric.id}
                name={fabric.name}
                price={fabric.price}
                gsm={fabric.gsm}
                image={fabric.image}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {fabrics.length > 20 && (
          <div className="flex justify-center items-center gap-2 mt-24 mb-12">
            <PaginationButton label="1" active />
            <PaginationButton isNext />
          </div>
        )}
      </div>

    </main>
  );
}

function FilterDropdown({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-8 border border-gray-100 rounded-full px-8 py-4 min-w-[180px] justify-between cursor-pointer hover:border-[#57AD43] hover:bg-gray-50 transition-all group">
      <span className="text-[11px] lg:text-xs font-black uppercase tracking-[0.2em] text-[#121212]">{label}</span>
      <ChevronDown size={14} className="text-gray-400 group-hover:text-black transition-colors" />
    </div>
  );
}

function PaginationButton({ label, active, isNext }: { label?: string, active?: boolean, isNext?: boolean }) {
  return (
    <button
      className={`h-10 w-10 flex items-center justify-center text-[11px] font-black transition-all rounded-sm border ${active
          ? "bg-black text-white border-black"
          : "bg-white text-gray-400 border-gray-100 hover:border-black hover:text-black"
        }`}
    >
      {isNext ? "→" : label}
    </button>
  );
}
