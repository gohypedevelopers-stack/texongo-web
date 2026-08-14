import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getShopifyCollection } from "@/lib/shopify";
import { FabricsCatalogClient } from "@/components/ui/fabrics-catalog-client";
import { Metadata } from "next";

export const revalidate = 60; // 1 minute ISR

interface Props {
  params: Promise<{
    handle: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  const collection = await getShopifyCollection(handle);
  
  if (!collection) {
    return {
      title: 'Collection Not Found',
    };
  }

  return {
    title: collection.seoTitle || `${collection.title} - Texongo`,
    description: collection.seoDescription || collection.description || `Browse the ${collection.title} collection at Texongo.`,
  };
}

export default async function CollectionPage({ params }: Props) {
  const { handle } = await params;
  const collection = await getShopifyCollection(handle);

  if (!collection) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Title Header Section */}
      <div className="max-w-[1680px] mx-auto px-6 lg:px-10 pt-28 md:pt-36 pb-6 relative z-[100]">
        <div className="flex flex-col items-center gap-4 text-center">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#57AD43] mb-1 block">Collection</span>
          <h1 className="text-3xl md:text-6xl font-bold tracking-tight text-black">{collection.title}</h1>
          {collection.description && (
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
              {collection.description}
            </p>
          )}
          <div className="h-px bg-emerald-100/60 w-24 mx-auto mt-4" />
        </div>
      </div>

      <Suspense fallback={
        <div className="flex items-center justify-center min-h-[400px]">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest animate-pulse">Loading Collection...</span>
        </div>
      }>
        <FabricsCatalogClient initialFabrics={collection.products} />
      </Suspense>
    </main>
  );
}
