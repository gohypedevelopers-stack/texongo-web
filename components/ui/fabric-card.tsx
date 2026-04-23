"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/lib/store";

interface FabricCardProps {
  id: string;
  name: string;
  price: string;
  gsm: string;
  image: string;
  isNew?: boolean;
}

export function FabricCard({ id, name, gsm, price, image }: FabricCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id,
      name,
      price: parseInt(price),
      gsm,
      image
    });
  };

  return (
    <motion.div 
      className="group relative flex flex-col items-center text-center bg-white p-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <Link href={`/fabrics/${id}`} className="w-full">
        {/* Product Image Container */}
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-gray-50 mb-6">
          {image && image !== "" ? (
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">No Image</span>
            </div>
          )}
          
          {/* GSM Badge */}
          <div className="absolute top-0 left-0 bg-[#57AD43] text-white text-[9px] font-black uppercase tracking-widest px-2 py-1 z-10">
            GSM: {gsm} g/m²
          </div>

          {/* Hover Action Overlay */}
          <AnimatePresence>
            {isHovered && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute bottom-4 left-4 right-4 z-20"
              >
                <button 
                  onClick={handleAddToCart}
                  className="w-full bg-black text-white text-[10px] font-black uppercase tracking-[0.2em] py-3 hover:bg-[#57AD43] transition-colors rounded-sm shadow-xl"
                >
                  Add to cart
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Product Info */}
        <div className="w-full flex flex-col items-center gap-3 py-2">
          <h3 className="text-sm font-black uppercase tracking-widest text-black leading-tight max-w-[240px] group-hover:text-[#57AD43] transition-colors duration-300">
            {name}
          </h3>
          <p className="text-lg font-black text-black uppercase tracking-tighter flex items-center gap-2">
            <span className="text-[#57AD43]">₹</span>{parseFloat(price).toFixed(2)}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
