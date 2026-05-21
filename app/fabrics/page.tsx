import { Suspense } from "react";
import { FabricsCatalogClient } from "../../components/ui/fabrics-catalog-client";
import { getAllShopifyProducts } from "@/lib/shopify";

export const revalidate = 60; // Keep it fresh with 1 minute Incremental Static Regeneration

export default async function FabricsListingPage() {
  const fabrics = await getAllShopifyProducts();

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

      <Suspense fallback={
        <div className="flex items-center justify-center min-h-[400px]">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest animate-pulse">Loading Fabrics Catalog...</span>
        </div>
      }>
        <FabricsCatalogClient initialFabrics={fabrics} />
      </Suspense>
    </main>
  );
}
