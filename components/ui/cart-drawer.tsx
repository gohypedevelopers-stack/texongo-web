"use client";

import { useCartStore } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Minus, Plus, ShoppingBag, ArrowRight, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createCheckout } from "@/lib/shopify";

export function CartDrawer() {
  const { items, isCartOpen, toggleCart, updateQuantity, removeItem, getTotalPrice } = useCartStore();
  const [isMounted, setIsMounted] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartOpen]);

  const handleCheckout = async () => {
    if (items.length === 0) return;
    
    setIsCheckingOut(true);
    try {
      const checkoutItems = items.map(item => ({
        variantId: item.variantId || "",
        quantity: item.quantity
      })).filter(item => item.variantId !== "");

      if (checkoutItems.length === 0) {
        alert("Your cart items are missing Shopify identifiers. Please try removing and re-adding them to your cart.");
        setIsCheckingOut(false);
        return;
      }

      const response = await fetch('/api/shopify/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items: checkoutItems }),
      });

      const data = await response.json();

      if (data.checkoutUrl) {
        toggleCart(false);
        setIsCheckingOut(false);
        window.location.href = data.checkoutUrl;
      } else {
        alert(data.error || "Failed to create checkout. Please try refreshing and adding items again.");
        setIsCheckingOut(false);
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("An error occurred during checkout. Please check your internet connection.");
      setIsCheckingOut(false);
    }
  };

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
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[1100]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-sm bg-[#F5F5F5] shadow-2xl z-[1200] flex flex-col"
            data-lenis-prevent="true"
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
                      <div className="relative w-16 aspect-square bg-gray-50 shrink-0 overflow-hidden">
                        {item.image ? (
                          <Image src={item.image} alt={item.name} fill className="object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-100 text-[8px] text-gray-400 font-bold uppercase text-center p-1">No Image</div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-2">
                          <h3 className="text-[12px] font-black uppercase tracking-tight truncate pr-4">{item.name}</h3>
                          <button 
                            id={`cart-item-remove-btn-${item.id}`}
                            onClick={() => removeItem(item.id)} 
                            className="text-red-500 hover:text-red-600 transition-colors flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-widest"
                          >
                            <Trash2 size={14} />
                            <span>Remove</span>
                          </button>
                        </div>

                        <p className="text-[12px] font-bold mt-2">₹{item.price}.00</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                      <div className="flex items-center gap-4">
                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Quantity</span>
                        <div className="flex items-center border border-gray-100 rounded-sm overflow-hidden">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-black hover:bg-gray-50 transition-colors"
                          >
                            <Minus size={10} />
                          </button>
                          <span className="w-10 text-center text-[10px] font-bold">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-black hover:bg-gray-50 transition-colors"
                          >
                            <Plus size={10} />
                          </button>
                        </div>
                      </div>
                      <span className="text-[11px] font-black tracking-tight">₹{(item.price * item.quantity).toLocaleString()}.00</span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 bg-white border-t border-gray-100 space-y-6">
                <div className="space-y-4">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 text-center">Payment Details</h3>
                  <div className="flex justify-between items-center bg-gray-50 px-4 py-3 border border-gray-100">
                    <span className="text-[10px] font-black uppercase tracking-widest text-black">Sub Total</span>
                    <span className="text-sm font-black text-black">₹{getTotalPrice().toLocaleString()}.00</span>
                  </div>
                </div>
                
                <div className="flex flex-col gap-3">
                  <button 
                    id="cart-drawer-checkout-btn"
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                    className="h-14 bg-white border border-black group flex items-center justify-center gap-3 hp-link text-[12px] uppercase tracking-[0.2em] transition-all duration-300 hover:bg-black shadow-lg shadow-black/5 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="text-black group-hover:text-white transition-colors font-black text-[12px] tracking-[0.2em]">{isCheckingOut ? "PROCESSING..." : "CHECKOUT NOW"}</span>
                    {!isCheckingOut && <ArrowRight size={14} className="text-black group-hover:text-white transition-colors" />}
                    {isCheckingOut && <Loader2 size={14} className="text-black group-hover:text-white transition-colors animate-spin" />}
                  </button>
                  <Link 
                    href="/cart"
                    onClick={() => toggleCart(false)}
                    className="h-14 border border-gray-200 text-black flex items-center justify-center hp-link !text-[12px] hover:bg-gray-50 transition-all active:scale-[0.98]"
                  >
                    <span>View my cart</span>
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
