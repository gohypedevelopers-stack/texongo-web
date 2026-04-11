"use client";

import { useCartStore } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Minus, Plus, ShoppingBag, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export function CartDrawer() {
  const { items, isCartOpen, toggleCart, updateQuantity, removeItem, getTotalPrice } = useCartStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => toggleCart(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[150]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-sm bg-[#F5F5F5] shadow-2xl z-[160] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-white border-b border-gray-100">
              <button 
                onClick={() => toggleCart(false)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={18} />
              </button>
              <div className="flex items-center gap-2">
                <ShoppingBag size={18} className="text-black" />
                <h2 className="text-sm font-bold text-[#121212]">Cart</h2>
              </div>
              <div className="w-8" /> {/* Spacer */}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-40">
                  <ShoppingBag size={32} />
                  <p className="text-xs font-bold uppercase tracking-widest">Cart is empty</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="bg-white p-3 space-y-4 border border-gray-100">
                    <div className="flex gap-4">
                      <div className="relative w-16 aspect-square bg-gray-50 shrink-0">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-2">
                          <h3 className="text-[10px] font-black uppercase tracking-tight truncate pr-4">{item.name}</h3>
                          <button onClick={() => removeItem(item.id)} className="text-orange-500 hover:text-red-500">
                            <Trash2 size={12} fill="currentColor" />
                          </button>
                        </div>
                        <div className="flex text-[8px] text-gray-200 gap-0.5 mt-0.5">
                          {"★".repeat(5)}
                        </div>
                        <p className="text-[11px] font-bold mt-2">₹{item.price}.00</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                      <div className="flex items-center gap-4">
                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Quantity</span>
                        <div className="flex items-center border border-gray-100 rounded-sm">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-black"
                          >
                            <Minus size={10} />
                          </button>
                          <span className="w-8 text-center text-[10px] font-bold">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-black"
                          >
                            <Plus size={10} />
                          </button>
                        </div>
                      </div>
                      <span className="text-[10px] font-black">₹{item.price * item.quantity}.00</span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-4 bg-white border-t border-gray-100 space-y-4">
                <div className="text-center">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#121212] mb-4">Payment Details</h3>
                  <div className="flex justify-between items-baseline mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#121212]">Sub Total</span>
                    <span className="text-sm font-black">₹{getTotalPrice()}.00</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Link 
                    href="/cart"
                    onClick={() => toggleCart(false)}
                    className="flex-1 h-10 border border-black text-black flex items-center justify-center text-[9px] font-bold uppercase tracking-[0.1em] hover:bg-gray-50 transition-all"
                  >
                    View cart
                  </Link>
                  <Link 
                    href="/checkout"
                    onClick={() => toggleCart(false)}
                    className="flex-1 h-10 bg-black text-white flex items-center justify-center text-[9px] font-bold uppercase tracking-[0.1em] transition-all duration-300 hover:bg-[#222222] group"
                  >
                    <span className="text-white">Checkout</span>
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
