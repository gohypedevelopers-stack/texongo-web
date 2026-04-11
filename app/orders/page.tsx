"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Package, Clock, CheckCircle2, Truck, XCircle, ShoppingBag, ArrowRight } from "lucide-react";
import { useAuthStore } from "@/lib/store";
import Link from "next/link";

export default function OrdersPage() {
  const { isLoggedIn, orders, user } = useAuthStore();

  // Simple route protection
  useEffect(() => {
    if (!isLoggedIn) {
      // In a real app we might redirect, but for this demo 
      // we'll just show the empty state or prompt to login
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return (
      <main className="min-h-screen pt-32 pb-24 flex items-center justify-center">
        <div className="text-center max-w-md px-6">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8 text-gray-400">
            <ShoppingBag size={32} />
          </div>
          <h1 className="text-2xl font-black uppercase tracking-[0.2em] mb-4">Access Denied</h1>
          <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-10 leading-relaxed">
            Please sign in to view your order history and track your latest fabric deliveries.
          </p>
          <Link 
            href="/"
            className="inline-flex items-center gap-3 px-10 py-5 bg-black text-white text-[11px] font-black uppercase tracking-[0.3em] hover:bg-[#57AD43] transition-all rounded-sm group"
          >
            <span className="text-white">Go to Homepage</span>
          </Link>
        </div>
      </main>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Delivered": return <CheckCircle2 className="text-[#57AD43]" size={14} />;
      case "Shipped": return <Truck className="text-blue-500" size={14} />;
      case "Processing": return <Clock className="text-amber-500" size={14} />;
      case "Cancelled": return <XCircle className="text-red-500" size={14} />;
      default: return <Package size={14} />;
    }
  };

  return (
    <main className="min-h-screen pt-32 pb-24 bg-gray-50/30">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 pb-12 border-b border-gray-100">
          <div>
            <h1 className="text-3xl font-black uppercase tracking-[0.3em] text-black mb-4">Order History</h1>
            <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400">
              Welcome back, <span className="text-black">{user?.name}</span>. Managing your textile archive.
            </p>
          </div>
          <div className="flex items-center gap-12">
            <div>
              <p className="text-[9px] font-black uppercase tracking-widest text-gray-300 mb-2">Total Orders</p>
              <p className="text-xl font-black">{orders.length}</p>
            </div>
            <div>
              <p className="text-[9px] font-black uppercase tracking-widest text-gray-300 mb-2">Member Since</p>
              <p className="text-xl font-black uppercase tracking-widest text-sm">2024</p>
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-8">
          {orders.length === 0 ? (
            <div className="bg-white p-20 text-center border border-gray-100">
              <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400">No orders found.</p>
            </div>
          ) : (
            orders.map((order, idx) => (
              <motion.div 
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Order Meta */}
                <div className="bg-gray-50/50 px-8 py-5 border-b border-gray-100 flex flex-wrap items-center justify-between gap-6">
                  <div className="flex items-center gap-10">
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1">Order ID</p>
                      <p className="text-[12px] font-black text-black">#{order.id}</p>
                    </div>
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1">Placed On</p>
                      <p className="text-[11px] font-bold text-gray-600">{order.date}</p>
                    </div>
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1">Total</p>
                      <p className="text-[12px] font-black text-[#57AD43]">₹{order.total.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-white px-4 py-2 border border-gray-100 rounded-full">
                    {getStatusIcon(order.status)}
                    <span className="text-[10px] font-black uppercase tracking-widest text-black">{order.status}</span>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-8">
                  <div className="space-y-6">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-8">
                        <div className="w-20 h-24 bg-gray-50 overflow-hidden flex-shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-[12px] font-black uppercase tracking-widest text-black mb-1">{item.name}</h4>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">GSM: {item.gsm} | Composition: {item.id === "1" ? "Cotton Spandex" : "Viscose Spandex"}</p>
                          <div className="flex items-center gap-6">
                            <p className="text-[11px] font-bold text-gray-600">Qty: {item.quantity} units</p>
                            <p className="text-[11px] font-bold text-gray-600">Price: ₹{item.price}/unit</p>
                          </div>
                        </div>
                          <Link 
                            href={`/fabrics/${item.id}`} // Dummy link
                            className="bg-transparent text-black border border-gray-100 px-6 py-3 text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 hover:bg-black hover:text-white flex items-center gap-2 group"
                          >
                            <span className="group-hover:text-white transition-colors">Buy Again</span>
                            <ArrowRight size={12} className="group-hover:text-white group-hover:translate-x-1 transition-all" />
                          </Link>
                        </div>
                    ))}
                  </div>
                </div>

                {/* Actions Footer */}
                <div className="px-8 py-4 border-t border-gray-50 flex justify-end gap-6 text-[10px] font-black uppercase tracking-widest">
                  <button className="text-gray-400 hover:text-black transition-colors">Download Invoice</button>
                  <button className="text-gray-400 hover:text-black transition-colors">Help & Support</button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
