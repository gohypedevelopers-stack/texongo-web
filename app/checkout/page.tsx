"use client";

import { useCartStore, useAuthStore } from "@/lib/store";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, CreditCard, Truck, ShieldCheck, ArrowLeft, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AuthModal } from "@/components/ui/auth-modal";

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const { isLoggedIn, addOrder, openAuthModal } = useAuthStore();
  const [isReady, setIsReady] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [lastOrderId, setLastOrderId] = useState<string | null>(null);

  useEffect(() => {
    setIsReady(true);
  }, []);

  const handleCompletePurchase = () => {
    if (!isLoggedIn) {
      openAuthModal();
      return;
    }

    const orderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    addOrder({
      id: orderId,
      date: new Date().toISOString().split('T')[0],
      total: getTotalPrice() * 1.18, // Total with GST
      status: "Processing",
      items: [...items]
    });
    setLastOrderId(orderId);
    setIsSuccess(true);
    clearCart();
  };

  if (!isReady) return null;

  if (isSuccess) {
    return (
      <main className="min-h-screen bg-white flex flex-col items-center justify-center p-6 md:p-12 lg:p-24 pb-40">
        <div className="max-w-[1440px] w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left: Success Message */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-left"
          >
            <div className="w-16 h-16 bg-[#57AD43]/10 text-[#57AD43] flex items-center justify-center rounded-full mb-8">
              <CheckCircle2 size={32} />
            </div>
            <h1 className="text-5xl font-black uppercase tracking-tighter mb-6 leading-[0.9]">Order<br />Confirmed</h1>
            <p className="text-sm font-medium text-gray-400 uppercase tracking-widest leading-relaxed mb-10 max-w-sm">
              Your order <span className="text-black font-black">#{lastOrderId}</span> has been received and is being processed by our weaving team.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/orders" 
                className="inline-flex items-center justify-center gap-3 bg-black text-white px-10 py-5 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#57AD43] transition-all rounded-sm group"
              >
                <span className="text-white">View Orders</span>
              </Link>
              <Link 
                href="/fabrics" 
                className="inline-flex items-center justify-center gap-3 border border-black text-black px-10 py-5 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-gray-50 transition-all rounded-sm"
              >
                Continue Shopping
              </Link>
            </div>
          </motion.div>

          {/* Right: Order Summary (Real Data) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-50 p-10 lg:p-16 rounded-sm border border-gray-100"
          >
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-8 border-b border-gray-200 pb-4">
              Order Details
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest">
                <span className="text-gray-400">Status</span>
                <span className="text-[#57AD43]">Processing</span>
              </div>
              <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest">
                <span className="text-gray-400">Estimated Delivery</span>
                <span className="text-black">3-5 Working Days</span>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-[12px] font-black uppercase tracking-widest text-black mb-2">Track Your Package</p>
              <p className="text-[10px] font-medium text-gray-400 uppercase tracking-widest leading-relaxed">
                You will receive real-time updates via email as your fabric moves from weft to doorstep.
              </p>
            </div>
          </motion.div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white pb-32 pt-16">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Header & Breadcrumbs */}
        <div className="text-center mb-16">
          <h1 className="text-[28px] font-black uppercase tracking-[0.2em] text-black mb-3">Checkout</h1>
          <nav className="flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
            <Link href="/" className="hover:text-black transition-colors">Home</Link>
            <span className="text-gray-300">/</span>
            <span className="text-black">Checkout</span>
          </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left: Checkout Forms */}
          <div className="lg:col-span-12 xl:col-span-7 space-y-12">
            
            {/* Contact Info */}
            <section>
              <h2 className="text-[13px] font-black uppercase tracking-[0.2em] mb-6">Contact information</h2>
              <div className="space-y-4">
                <input 
                  type="email" 
                  placeholder="Email address"
                  className="w-full h-14 border border-gray-200 outline-none px-6 text-[13px] focus:border-black transition-colors"
                />
                <p className="text-[10px] text-gray-400 font-medium">You are currently checking out as a guest.</p>
              </div>
            </section>

            {/* Billing Address */}
            <section>
              <h2 className="text-[13px] font-black uppercase tracking-[0.2em] mb-6">Billing address</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Country/Region</p>
                  <select className="w-full h-14 border border-gray-200 outline-none px-6 text-[13px] focus:border-black transition-colors bg-white appearance-none">
                    <option>India</option>
                  </select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="First name" className="h-14 border border-gray-200 outline-none px-6 text-[13px] focus:border-black transition-colors" />
                  <input type="text" placeholder="Last name" className="h-14 border border-gray-200 outline-none px-6 text-[13px] focus:border-black transition-colors" />
                </div>

                <input type="text" placeholder="Address" className="w-full h-14 border border-gray-200 outline-none px-6 text-[13px] focus:border-black transition-colors" />
                <button className="text-[11px] font-bold text-black border-b border-black pb-0.5 hover:text-gray-600 transition-colors inline-block">+ Add apartment, suite, etc.</button>

                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="City" className="h-14 border border-gray-200 outline-none px-6 text-[13px] focus:border-black transition-colors" />
                  <div className="relative">
                    <select className="w-full h-14 border border-gray-200 outline-none px-6 text-[13px] focus:border-black transition-colors bg-white appearance-none">
                      <option>Delhi</option>
                    </select>
                    <span className="absolute left-6 top-2 text-[8px] font-black uppercase tracking-widest text-gray-400">State</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="PIN Code" className="h-14 border border-gray-200 outline-none px-6 text-[13px] focus:border-black transition-colors" />
                  <input type="text" placeholder="Phone (optional)" className="h-14 border border-gray-200 outline-none px-6 text-[13px] focus:border-black transition-colors" />
                </div>
              </div>
            </section>

            {/* Payment Options */}
            <section>
              <h2 className="text-[13px] font-black uppercase tracking-[0.2em] mb-6">Payment options</h2>
              <div className="border border-black p-8 space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[12px] font-black uppercase tracking-widest">Pay by Razorpay</span>
                  <div className="flex gap-2">
                    {/* Placeholder for small icons if needed */}
                  </div>
                </div>
                <p className="text-[11px] text-gray-500 leading-relaxed font-medium">
                  Pay securely via UPI, Credit/Debit Card, or Internet Banking through Razorpay.
                </p>
              </div>
            </section>

            {/* Note & Terms */}
            <div className="space-y-8">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 border border-gray-300 rounded-sm accent-black" />
                <span className="text-[11px] font-medium text-gray-500 group-hover:text-black transition-colors">Add a note to your order</span>
              </label>

              <div className="text-[11px] text-gray-400 font-medium leading-[1.8] border-t border-gray-100 pt-8">
                By proceeding with your purchase you agree to our <Link href="/terms" className="text-black underline">Terms and Conditions</Link> and <Link href="/privacy" className="text-black underline">Privacy Policy</Link>
              </div>

              <div className="flex items-center justify-between pt-4">
                <Link href="/cart" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black transition-all">
                  <ArrowLeft size={14} />
                  Return to Cart
                </Link>
                <button 
                  onClick={handleCompletePurchase}
                  className="bg-black text-white px-12 py-5 text-[11px] font-black uppercase tracking-[0.3em] hover:bg-[#57AD43] transition-all rounded-sm shadow-xl active:scale-[0.98]"
                >
                  Place Order
                </button>
              </div>
            </div>

          </div>

          {/* Right: Order Summary Sidebar */}
          <div className="lg:col-span-12 xl:col-span-5">
            <div className="bg-[#F6F6F6] p-8 lg:p-12 sticky top-24 self-start">
              <h2 className="text-[16px] font-black uppercase tracking-[0.1em] mb-8">Order summary</h2>
              
              <div className="space-y-8 mb-12">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-6 relative">
                    <div className="relative group">
                      <div className="w-20 h-24 bg-white overflow-hidden flex-shrink-0 border border-gray-100">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <span className="absolute -top-3 -right-3 w-6 h-6 bg-gray-400 text-white text-[10px] font-black rounded-full flex items-center justify-center z-10">
                        {item.quantity}
                      </span>
                    </div>
                    
                    <div className="flex-1 space-y-1">
                      <div className="flex justify-between items-start">
                        <h4 className="text-[11px] font-black uppercase tracking-widest text-black/80 max-w-[200px] leading-relaxed">
                          {item.name}
                        </h4>
                        <span className="text-[11px] font-black">₹{item.price.toFixed(2)}</span>
                      </div>
                      <p className="text-[11px] font-black text-black">₹{item.price.toFixed(2)}</p>
                      
                      {/* Technical Specs based on screenshot */}
                      <div className="pt-3 space-y-1 text-[9px] font-bold uppercase tracking-widest text-gray-400">
                        <p>Diameter: <span className="text-gray-500">65 inches / 165.1 cm</span></p>
                        <p>GSM: <span className="text-gray-500">{item.gsm || "170"} g/m²</span></p>
                        <p>Type: <span className="text-gray-500">Open</span></p>
                        <p>Blend: <span className="text-gray-500">{item.name.toLowerCase().includes("cotton") ? "Cotton" : "Viscose"}</span></p>
                        <p>Knit Style: <span className="text-gray-500">Single Jersey</span></p>
                        <p>Usages: <span className="text-gray-500 line-clamp-1">T-shirts, Comfortwear...</span></p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-8 border-t border-gray-200">
                <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-gray-400">
                  <span>Subtotal</span>
                  <span className="text-black">₹{getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-gray-400">
                  <span>GST</span>
                  <span className="text-black">₹{(getTotalPrice() * 0.18).toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center pt-6 border-t border-gray-200 mt-6">
                  <span className="text-sm font-black uppercase tracking-widest">Total</span>
                  <span className="text-2xl font-black">₹{(getTotalPrice() * 1.18).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <AuthModal />
    </main>
  );
}
