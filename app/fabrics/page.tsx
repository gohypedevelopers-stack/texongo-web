"use client";

import { FabricCard } from "../../components/ui/fabric-card";
import { ChevronDown, Filter, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { Fabric, mapShopifyProduct } from "@/lib/shopify";
import Image from "next/image";
import { motion } from "framer-motion";

const ITEMS_PER_PAGE = 12;

export default function FabricsListingPage() {
  const [fabrics, setFabrics] = useState<Fabric[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);

  // Filter States
  const [selectedGsm, setSelectedGsm] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("Latest Selection");

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/api/shopify/products');
        const result = await response.json();

        if (result.data?.products?.edges) {
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

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedGsm, selectedColor, sortBy]);

  // Derived Data
  const gsmOptions = ["All GSM", "Light (<200)", "Medium (200-300)", "Heavy (>300)"];
  
  const colorOptions = useMemo(() => {
    return ["All Colors", ...Array.from(new Set(fabrics.map(f => f.shade).filter((val): val is string => !!val && val !== 'N/A')))].sort();
  }, [fabrics]);

  const sortOptions = ["Latest Selection", "Price: Low to High", "Price: High to Low", "GSM: Low to High"];

  // Filtering & Sorting Logic
  const filteredFabrics = useMemo(() => {
    return fabrics
      .filter(f => {
        const rawValue = typeof f.gsm === 'string' ? f.gsm : '';
        const rawGsm = parseInt(rawValue.replace(/[^0-9]/g, ''));
        const gsmMatch = !selectedGsm || selectedGsm === "All GSM" || (() => {
          if (isNaN(rawGsm)) return false;
          if (rawGsm < 200) return selectedGsm === "Light (<200)";
          if (rawGsm <= 300) return selectedGsm === "Medium (200-300)";
          return selectedGsm === "Heavy (>300)";
        })();
        const colorMatch = !selectedColor || selectedColor === "All Colors" || f.shade === selectedColor;
        return gsmMatch && colorMatch;
      })
      .sort((a, b) => {
        if (sortBy === "Price: Low to High") return parseFloat(a.price) - parseFloat(b.price);
        if (sortBy === "Price: High to Low") return parseFloat(b.price) - parseFloat(a.price);
        if (sortBy === "GSM: Low to High") {
          const gsmA = parseInt(a.gsm.replace(/[^0-9]/g, '')) || 0;
          const gsmB = parseInt(b.gsm.replace(/[^0-9]/g, '')) || 0;
          return gsmA - gsmB;
        }
        return 0; // Latest Selection is default order from API
      });
  }, [fabrics, selectedGsm, selectedColor, sortBy]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredFabrics.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedFabrics = filteredFabrics.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Title Header Section (centered and full width at top) */}
      <div className="max-w-[1680px] mx-auto px-6 lg:px-10 pt-28 md:pt-36 pb-6 relative z-[100]">
        <div className="flex flex-col items-center gap-4 text-center">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#57AD43] mb-1 block">Premium Collection</span>
          <h1 className="text-3xl md:text-6xl font-bold tracking-tight text-black">Fabrics <span className="text-[#57AD43]">Catalog</span></h1>
          <div className="h-px bg-emerald-100/60 w-24 mx-auto mt-4" />
        </div>
      </div>

      {/* Main Grid Section (Left: Filters Sidebar, Right: Products Grid) */}
      <div className="max-w-[1680px] mx-auto px-6 lg:px-10 pb-20 relative z-[50]">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mt-8">
          
          {/* Filters Sidebar (Left Column on Desktop, stacks on top on Mobile) */}
          <div className="lg:col-span-1 order-1 lg:order-1">
            <div className="lg:sticky lg:top-28 space-y-6 lg:pr-8 lg:border-r lg:border-gray-100 relative z-[200]">
              <div className="flex items-center gap-2 pb-2">
                <Filter size={14} className="text-black" />
                <span className="text-[11px] font-black uppercase tracking-widest text-black">Filter & Sort</span>
              </div>
              
              <div className="space-y-6">
                {/* GSM Filter */}
                <div className="space-y-2">
                  <span className="text-[8.5px] font-bold text-gray-400 uppercase tracking-widest block">Gsm Range</span>
                  <FilterDropdown 
                    label={selectedGsm || "All GSM"} 
                    options={gsmOptions} 
                    onSelect={setSelectedGsm} 
                    active={!!selectedGsm && selectedGsm !== "All GSM"}
                  />
                </div>

                {/* Color Filter */}
                <div className="space-y-2">
                  <span className="text-[8.5px] font-bold text-gray-400 uppercase tracking-widest block">Color Palette</span>
                  <FilterDropdown 
                    label={selectedColor || "All Colors"} 
                    options={colorOptions} 
                    onSelect={setSelectedColor}
                    active={!!selectedColor && selectedColor !== "All Colors"}
                  />
                </div>

                {/* Sort Matrix */}
                <div className="space-y-2">
                  <span className="text-[8.5px] font-bold text-gray-400 uppercase tracking-widest block">Sort Matrix</span>
                  <SortDropdown 
                    label={sortBy} 
                    options={sortOptions} 
                    onSelect={setSortBy} 
                  />
                </div>
              </div>

              {!loading && (
                <div className="pt-4">
                  <button 
                    onClick={() => { setSelectedGsm(""); setSelectedColor(""); setSortBy("Latest Selection"); }}
                    className="w-full flex items-center justify-center gap-2 border border-emerald-100/60 bg-white/40 shadow-[0_8px_20px_rgba(87,173,67,0.03)] rounded-xl px-5 py-3 text-[6.5px] font-bold text-[#435C46] uppercase tracking-widest hover:border-[#57AD43] hover:bg-emerald-50/20 backdrop-blur-sm transition-all cursor-pointer"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Product Grid (Right Column on Desktop, stacked underneath filters on Mobile) */}
          <div className="lg:col-span-3 order-2 lg:order-2">


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
                  className="px-8 py-3 bg-black text-white text-[10px] font-black uppercase tracking-widest rounded-2xl transition-all hover:bg-[#57AD43] shadow-[0_8px_20px_rgba(0,0,0,0.15)]"
                >
                  Retry
                </button>
              </div>
            ) : paginatedFabrics.length === 0 ? (
              <div className="flex flex-col items-center justify-center min-h-[400px] w-full gap-6 text-center">
                <p className="text-xl font-black uppercase tracking-tighter text-gray-300">No matches found for these filters</p>
                <button
                  onClick={() => { setSelectedGsm("All GSM"); setSelectedColor("All Colors"); }}
                  className="text-xs font-black uppercase tracking-widest text-[#57AD43] border-b border-[#57AD43] pb-1"
                >
                  Clear All Selections
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 mt-4">
                  {paginatedFabrics.map((fabric) => (
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

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-3 mt-24 mb-12">
                    <button
                      onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="h-10 w-10 flex items-center justify-center rounded-full border border-emerald-100/60 text-[#435C46]/60 hover:border-[#57AD43] hover:text-[#57AD43] transition-all disabled:opacity-30 disabled:hover:border-emerald-100/60 disabled:hover:text-[#435C46]/60"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter(p => {
                        return p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1;
                      })
                      .map((page, index, array) => {
                        const showEllipsis = index > 0 && page - array[index - 1] > 1;
                        return (
                          <div key={page} className="flex items-center gap-3">
                            {showEllipsis && <span className="text-gray-300">...</span>}
                            <button
                              onClick={() => handlePageChange(page)}
                              className={`h-10 w-10 flex items-center justify-center text-[11px] font-black transition-all rounded-full border ${
                                currentPage === page
                                  ? "bg-black text-white border-black shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
                                  : "bg-white text-[#435C46]/60 border-emerald-100/60 hover:border-[#57AD43] hover:text-[#57AD43]"
                              }`}
                            >
                              {page}
                            </button>
                          </div>
                        );
                      })}

                    <button
                      onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="h-10 w-10 flex items-center justify-center rounded-full border border-emerald-100/60 text-[#435C46]/60 hover:border-[#57AD43] hover:text-[#57AD43] transition-all disabled:opacity-30 disabled:hover:border-emerald-100/60 disabled:hover:text-[#435C46]/60"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

        </div>
      </div>
    </main>
  );
}

function FilterDropdown({ label, options, onSelect, active }: { label: string, options: string[], onSelect: (val: string) => void, active?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full">
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-4 border rounded-xl px-5 py-3 w-full justify-between cursor-pointer transition-all group ${
          active 
            ? 'border-[#57AD43] bg-[#57AD43]/5' 
            : 'border-emerald-100/60 bg-white/40 shadow-[0_8px_20px_rgba(87,173,67,0.03)] hover:border-[#57AD43] hover:bg-emerald-50/20 backdrop-blur-sm'
        }`}
      >
        <span className={`text-[9px] font-bold uppercase tracking-[0.2em] truncate ${active ? 'text-[#57AD43]' : 'text-black'}`}>{label}</span>
        <ChevronDown size={14} className={`${active ? 'text-[#57AD43]' : 'text-[#435C46]/60'} group-hover:text-black transition-all ${isOpen ? 'rotate-180' : ''} shrink-0`} />
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-full bg-white/95 backdrop-blur-lg border border-emerald-100/60 rounded-xl shadow-[0_20px_40px_rgba(87,173,67,0.12)] z-[500] overflow-hidden py-2 max-h-[300px] overflow-y-auto">
          {options.map((opt) => (
            <div 
              key={opt}
              onClick={(e) => { 
                e.stopPropagation();
                onSelect(opt); 
                setIsOpen(false); 
              }}
              className={`px-5 py-3 text-[9px] font-bold uppercase tracking-widest cursor-pointer transition-colors ${
                label === opt ? 'bg-[#57AD43] text-white' : 'text-[#435C46] hover:bg-emerald-50/40 hover:text-black'
              }`}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function SortDropdown({ label, options, onSelect }: { label: string, options: string[], onSelect: (val: string) => void }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full">
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-4 border border-emerald-100/60 bg-white/40 shadow-[0_8px_20px_rgba(87,173,67,0.03)] rounded-xl px-5 py-3 w-full justify-between cursor-pointer transition-all group hover:border-[#57AD43] hover:bg-emerald-50/20 backdrop-blur-sm"
      >
        <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-black truncate">{label}</span>
        <ChevronDown size={14} className={`text-[#435C46]/60 group-hover:text-black transition-all ${isOpen ? 'rotate-180' : ''} shrink-0`} />
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-full bg-white/95 backdrop-blur-lg border border-emerald-100/60 rounded-xl shadow-[0_20px_40px_rgba(87,173,67,0.12)] z-[500] overflow-hidden py-2 max-h-[300px] overflow-y-auto">
          {options.map((opt) => (
            <div 
              key={opt}
              onClick={(e) => { 
                e.stopPropagation();
                onSelect(opt); 
                setIsOpen(false); 
              }}
              className={`px-5 py-3 text-[9px] font-bold uppercase tracking-widest cursor-pointer transition-colors ${
                label === opt ? 'bg-[#57AD43] text-white' : 'text-[#435C46] hover:bg-emerald-50/40 hover:text-black'
              }`}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
