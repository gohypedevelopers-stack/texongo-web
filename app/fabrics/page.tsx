"use client";

import { FabricCard } from "../../components/ui/fabric-card";
import { ChevronDown, Filter, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { Fabric, mapShopifyProduct } from "@/lib/shopify";

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
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-white">




      {/* Filter Bar */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-12 relative z-[100]">
        <div className="flex flex-col items-center gap-12 text-center">
          <div className="space-y-4">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#57AD43] mb-1 block">Curate Selection</span>
            <h2 className="text-2xl md:text-5xl font-bold tracking-tight text-black">Curation <span className="text-[#57AD43]">Filters</span></h2>
            <div className="h-px bg-gray-100 w-24 mx-auto" />
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-6 relative">
            <FilterDropdown 
              label={selectedGsm || "Gsm Range"} 
              options={gsmOptions} 
              onSelect={setSelectedGsm}
              active={!!selectedGsm && selectedGsm !== "All GSM"}
            />
            <FilterDropdown 
              label={selectedColor || "Color Palette"} 
              options={colorOptions} 
              onSelect={setSelectedColor}
              active={!!selectedColor && selectedColor !== "All Colors"}
            />
          </div>

          {/* Sort Matrix Section */}
          <div className="pt-4">
            <SortDropdown 
              label={sortBy} 
              options={sortOptions} 
              onSelect={setSortBy} 
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-100 pt-12 gap-8 mt-12">
            {!loading && (
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em]">
                Archive Analysis: {filteredFabrics.length} result{filteredFabrics.length !== 1 ? 's' : ''}
                {fabrics.length !== filteredFabrics.length && ` (of ${fabrics.length})`}
              </p>
            )}
            {!loading && (
              <div 
                onClick={() => { setSelectedGsm(""); setSelectedColor(""); setSortBy("Latest Selection"); }}
                className="text-[10px] font-black uppercase tracking-widest text-[#57AD43] cursor-pointer hover:text-black transition-colors"
              >
                Reset Filters
              </div>
            )}
        </div>
      </div>

        {/* Product Grid */}
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 pb-20">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 mt-16">
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
                    className="h-10 w-10 flex items-center justify-center rounded-sm border border-gray-100 text-gray-400 hover:border-black hover:text-black transition-all disabled:opacity-30 disabled:hover:border-gray-100 disabled:hover:text-gray-400"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter(p => {
                      // Show first page, last page, and pages around current page
                      return p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1;
                    })
                    .map((page, index, array) => {
                      const showEllipsis = index > 0 && page - array[index - 1] > 1;
                      return (
                        <div key={page} className="flex items-center gap-3">
                          {showEllipsis && <span className="text-gray-300">...</span>}
                          <button
                            onClick={() => handlePageChange(page)}
                            className={`h-10 w-10 flex items-center justify-center text-[11px] font-black transition-all rounded-sm border ${
                              currentPage === page
                                ? "bg-black text-white border-black"
                                : "bg-white text-gray-400 border-gray-100 hover:border-black hover:text-black"
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
                    className="h-10 w-10 flex items-center justify-center rounded-sm border border-gray-100 text-gray-400 hover:border-black hover:text-black transition-all disabled:opacity-30 disabled:hover:border-gray-100 disabled:hover:text-gray-400"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    );
  }

function FilterDropdown({ label, options, onSelect, active }: { label: string, options: string[], onSelect: (val: string) => void, active?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-8 border rounded-full px-8 py-4 min-w-[240px] justify-between cursor-pointer transition-all group ${
          active ? 'border-[#57AD43] bg-[#57AD43]/5' : 'border-gray-100 hover:border-[#57AD43] hover:bg-gray-50'
        }`}
      >
        <span className={`text-[11px] lg:text-xs font-black uppercase tracking-[0.2em] ${active ? 'text-[#57AD43]' : 'text-[#121212]'}`}>{label}</span>
        <ChevronDown size={14} className={`${active ? 'text-[#57AD43]' : 'text-gray-400'} group-hover:text-black transition-all ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 mt-4 w-full bg-white border border-gray-100 rounded-2xl shadow-2xl z-[500] overflow-hidden py-2 max-h-[300px] overflow-y-auto min-w-[240px]">
          {options.map((opt) => (
            <div 
              key={opt}
              onClick={(e) => { 
                e.stopPropagation();
                onSelect(opt); 
                setIsOpen(false); 
              }}
              className={`px-8 py-4 text-[10px] font-black uppercase tracking-widest cursor-pointer transition-colors ${
                label === opt ? 'bg-[#57AD43] text-white' : 'text-gray-500 hover:bg-gray-50 hover:text-black'
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
    <div className="relative inline-block border-b-2 border-[#57AD43] pb-1 min-w-[280px]">
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 cursor-pointer group"
      >
        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Sort Matrix:</span>
        <span className="text-[11px] font-black text-black uppercase tracking-widest">{label}</span>
        <ChevronDown size={14} className={`text-black transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-100 rounded-lg shadow-2xl z-[500] overflow-hidden py-2">
          {options.map((opt) => (
            <div 
              key={opt}
              onClick={(e) => { 
                e.stopPropagation();
                onSelect(opt); 
                setIsOpen(false); 
              }}
              className={`px-4 py-3 text-[10px] font-black uppercase tracking-widest cursor-pointer transition-colors ${
                label === opt ? 'bg-[#57AD43] text-white' : 'text-gray-500 hover:bg-gray-50 hover:text-black'
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
