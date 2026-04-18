"use client";

import { use, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ShoppingBag, ArrowLeft, Heart, Share2, Minus, Plus, Loader2 } from "lucide-react";
import { notFound } from "next/navigation";
import { Fabric } from "@/lib/shopify";

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [product, setProduct] = useState<Fabric | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Fabric[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const addItem = useCartStore((state) => state.addItem);
  const [activeTab, setActiveTab] = useState("description");
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState("");

  // Update active image when product is loaded
  useEffect(() => {
    if (product?.image) {
      setActiveImage(product.image);
    }
  }, [product]);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const productRes = await fetch(`/api/shopify/products/${slug}`);
        if (!productRes.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        const productData = await productRes.json();
        setProduct(productData);

        // Fetch related products
        const relatedRes = await fetch('/api/shopify/products');
        const relatedData = await relatedRes.json();
        if (relatedData.data?.products?.edges) {
          const mapped = relatedData.data.products.edges
            .map(({ node }: any) => ({
              id: node.handle,
              name: node.title,
              price: node.priceRange.minVariantPrice.amount,
              gsm: node.metafields?.find((m: any) => m?.key === 'gsm')?.value || 'N/A',
              image: node.images.edges[0]?.node.url || '',
            }))
            .filter((p: any) => p.id !== slug)
            .slice(0, 4);
          setRelatedProducts(mapped);
        }
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-white">
        <Loader2 className="animate-spin text-gray-400" size={40} />
        <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Fetching product details...</p>
      </div>
    );
  }

  if (error || !product) {
    notFound();
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: parseInt(product.price),
      gsm: product.gsm,
      image: product.image
    }, quantity);
  };

  return (
    <main className="min-h-screen bg-white pb-16 pt-20 lg:pt-28 lg:pb-32">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

          {/* Left Column: Image Gallery */}
          <div className="space-y-4 lg:space-y-6">
            <div
              className="relative aspect-square w-full bg-gray-50 overflow-hidden border border-gray-100 group cursor-zoom-in"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                const img = e.currentTarget.querySelector('img') as HTMLImageElement;
                if (img) {
                  img.style.transformOrigin = `${x}% ${y}%`;
                }
              }}
            >
              <Image
                src={activeImage || product.image}
                alt={product.name}
                fill
                priority
                className="object-cover transition-transform duration-500 group-hover:scale-[2.5]"
              />
              <div className="absolute top-4 left-4 bg-black/80 px-2 py-1 z-10">
                <img src="https://texongo.com/wp-content/uploads/2025/09/Untitled-design-2-1-e1758707290987.png" alt="Logo" className="h-4" />
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              {product.images?.map((imgUrl, i) => (
                <div
                  key={i}
                  onClick={() => setActiveImage(imgUrl)}
                  className={`aspect-square relative bg-gray-50 cursor-pointer border transition-all ${activeImage === imgUrl ? 'border-[#57AD43] ring-1 ring-[#57AD43]' : 'border-gray-100 hover:border-gray-300'}`}
                >
                  <Image
                    src={imgUrl}
                    alt={`${product.name} view ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            <button
              onClick={() => document.getElementById('related-products')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full bg-[#57AD43] text-white py-4 lg:py-3 text-[11px] font-bold uppercase tracking-widest hover:bg-[#489936] transition-colors"
            >
              View Possible Variations
            </button>
          </div>

          {/* Right Column: Product Details */}
          <div className="flex flex-col">
            <div className="space-y-1 mb-6">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">SKU: {product.sku || "A1K15126"}</p>
              <h1 className="text-3xl font-bold uppercase text-[#121212] tracking-tight">{product.name}</h1>
            </div>

            <div className="mb-8 p-4 bg-gray-50/50 border-y border-gray-100">
              <span className="text-3xl font-black tracking-tighter">₹{parseFloat(product.price || '0').toFixed(2)}</span>
            </div>

            <Link href="#" className="text-[11px] font-medium text-[#57AD43] underline underline-offset-4 mb-8 block">
              Shipping calculated at checkout
            </Link>

            {/* Selection & Add to Cart */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6 mb-10">
              <div className="flex items-center justify-between sm:justify-start gap-4">
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest min-w-[120px]">
                  {product.qty
                    ? (product.qty.toLowerCase().includes('stock') ? product.qty : `${product.qty} IN STOCK`)
                    : (product.totalInventory !== undefined ? `${product.totalInventory} KG IN STOCK` : "IN STOCK")}
                </div>
                <div className="flex items-center border border-gray-200">
                  <button onClick={() => setQuantity(prev => Math.max(1, prev - 1))} className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors"><Minus size={12} /></button>
                  <input type="text" value={quantity} readOnly className="w-12 h-10 text-center text-sm font-bold border-x border-gray-200 outline-none" />
                  <button onClick={() => setQuantity(prev => prev + 1)} className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors"><Plus size={12} /></button>
                </div>
              </div>
              <button onClick={handleAddToCart} className="flex-1 bg-[#444444] text-white px-8 h-16 sm:h-10 flex items-center justify-center gap-3 text-[13px] sm:text-[11px] font-bold uppercase tracking-widest hover:bg-black transition-colors">
                <ShoppingBag size={14} /> Add to cart
              </button>
            </div>

            {/* Specifications Table */}
            <div className="space-y-1 border-t border-gray-100 pt-8 mb-12">
              <SpecRow label="TYPE" value={product.type || "N/A"} />
              <SpecRow label="FABRIC" value={product.fabric || "N/A"} />
              <SpecRow label="CONTENT" value={product.content || product.composition || "N/A"} />
              <SpecRow label="GSM" value={product.gsm === "N/A" ? "N/A" : `${product.gsm} g/m²`} />
              <SpecRow label="OUNCE" value={product.ounce || "N/A"} />
              <SpecRow label="WIDTH" value={product.width || "N/A"} />
              <SpecRow label="QTY" value={product.qty || (product.totalInventory !== undefined ? `${product.totalInventory} KG` : "N/A")} />
              <SpecRow label="KNIT STYLE" value={product.knit_style || "N/A"} />
              <SpecRow label="SHADE" value={product.shade || "N/A"} />
              <SpecRow label="USAGE" value={product.usage || "N/A"} />
            </div>

            {/* Weight/Color Grid */}
            <div className="grid grid-cols-2 gap-px bg-gray-100 border border-gray-100 mb-12">
              <div className="bg-gray-50 p-3 text-[11px] font-bold uppercase">Weight</div>
              <div className="bg-white p-3 text-[11px] font-medium italic">{product.weight || "1 kg"}</div>
              <div className="bg-gray-50 p-3 text-[11px] font-bold uppercase">Color</div>
              <div className="bg-white p-3 text-[11px] font-medium italic">{product.shade || "NAVY"}</div>
            </div>

            {/* Accordions */}
            <div className="border-t border-gray-100 divide-y divide-gray-100">
              <AccordionItem title="Note" content='"Please note that color difference on website may vary due to lighting and environmental factors."' defaultOpen />
              <AccordionItem title="Shipping Info" content="Worldwide shipping available. Standard rates apply." />
              <AccordionItem title="Care Info" content="Machine wash cold, tumble dry low." />
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-20 lg:mt-32 border-t border-gray-100">
          <div className="flex overflow-x-auto no-scrollbar justify-start lg:justify-center gap-8 lg:gap-12 -mt-px pt-8 mb-16 px-4">
            {["Description", "Additional information", "Reviews (0)"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase())}
                className={`py-6 lg:py-8 text-[11px] font-bold uppercase tracking-[0.2em] border-t-2 transition-all whitespace-nowrap ${activeTab === tab.toLowerCase() ? "border-black text-black" : "border-transparent text-gray-400 hover:text-black"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="max-w-4xl mx-auto px-6 mb-32">
            <AnimatePresence mode="wait">
              {activeTab === "description" && (
                <motion.div key="desc" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-gray-600 leading-relaxed text-center italic text-sm">
                  {product.description || "No description available."}
                </motion.div>
              )}
              {activeTab === "additional information" && (
                <motion.div key="add" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="max-w-xl mx-auto border border-gray-100 divide-y divide-gray-100">
                  <div className="grid grid-cols-3"><div className="bg-gray-50/50 p-4 text-[11px] font-bold uppercase tracking-widest text-black">Weight</div><div className="col-span-2 p-4 text-[11px] font-medium italic text-gray-500">{product.weight || "1 kg"}</div></div>
                  <div className="grid grid-cols-3"><div className="bg-gray-50/50 p-4 text-[11px] font-bold uppercase tracking-widest text-black">Color</div><div className="col-span-2 p-4 text-[11px] font-medium italic text-gray-500 uppercase">{product.shade || "N/A"}</div></div>
                  <div className="grid grid-cols-3"><div className="bg-gray-50/50 p-4 text-[11px] font-bold uppercase tracking-widest text-black">Composition</div><div className="col-span-2 p-4 text-[11px] font-medium italic text-gray-500">{product.content || product.composition || "N/A"}</div></div>
                </motion.div>
              )}
              {activeTab === "reviews (0)" && (
                <motion.div key="rev" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-center text-gray-400 italic text-sm">
                  There are no reviews yet.
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Related Products */}
        <div id="related-products" className="mt-24 lg:mt-32">
          <h2 className="text-xl font-bold uppercase tracking-tight mb-12">Related products</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map((fabric) => (
              <Link key={fabric.id} href={`/fabrics/${fabric.id}`} className="group cursor-pointer">
                <div className="relative aspect-square mb-4 bg-gray-50 overflow-hidden border border-gray-100">
                  <Image src={fabric.image} alt={fabric.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-0 left-0 bg-[#57AD43] text-white text-[8px] font-black px-2 py-0.5 z-10">GSM: {fabric.gsm} g/m²</div>
                </div>
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-center group-hover:text-[#57AD43] transition-colors">{fabric.name}</h3>
                <p className="text-[10px] font-bold text-gray-400 text-center mt-1">₹{fabric.price}.00</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

function SpecRow({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex items-start gap-4 text-[11px] leading-relaxed py-1">
      <span className="font-bold text-black min-w-[80px]">{label}:</span>
      <span className="text-gray-500 font-medium">{value}</span>
    </div>
  );
}

function AccordionItem({ title, content, defaultOpen = false }: { title: string, content: string, defaultOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 w-full text-left"
      >
        <span className="text-xs font-bold text-gray-400">{isOpen ? "−" : "+"}</span>
        <span className="text-[11px] font-bold uppercase tracking-widest">{title}</span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="mt-4 text-[11px] text-gray-500 italic leading-relaxed pl-6">{content}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
