"use client";

import { FabricCard } from "../../components/ui/fabric-card";
import { ChevronDown, Filter, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Fabric } from "@/lib/shopify";

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
          const mappedProducts = result.data.products.edges.map(({ node }: any) => ({
            id: node.handle,
            sku: node.id.split('/').pop(),
            name: node.title,
            price: node.priceRange.minVariantPrice.amount,
            gsm: node.metafields?.find((m: any) => m?.key === 'gsm')?.value || 'N/A',
            image: node.images.edges[0]?.node.url || '',
            description: node.description,
          }));
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
      className={`h-10 w-10 flex items-center justify-center text-[11px] font-black transition-all rounded-sm border ${active
          ? "bg-black text-white border-black"
          : "bg-white text-gray-400 border-gray-100 hover:border-black hover:text-black"
        }`}
    >
      {isNext ? "→" : label}
    </button>
  );
}
