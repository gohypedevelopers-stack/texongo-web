"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Package, Clock, CheckCircle2, Truck, XCircle, ShoppingBag, ArrowRight } from "lucide-react";
import { useAuthStore } from "@/lib/store";
import Link from "next/link";
import { PageHero } from "@/components/ui/page-hero";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  image: string;
  gsm: string;
  quantity: number;
}

interface Order {
  id: string;
  date: string;
  total: number;
  status: string;
  items: OrderItem[];
}

export default function OrdersPage() {
  const { isLoggedIn, login, logout, user } = useAuthStore();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  // Sync session query parameters on mount
  useEffect(() => {
    setIsMounted(true);
    
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      const loginSuccess = searchParams.get("login_success");
      const email = searchParams.get("email");
      const name = searchParams.get("name");

      if (loginSuccess === "true" && email && name) {
        // Sync the Zustand local storage session
        login(email, name);
        
        // Clean URL to keep it pristine
        const cleanUrl = window.location.pathname;
        window.history.replaceState({}, document.title, cleanUrl);
      }
    }
  }, [login]);

  // Fetch real orders from Shopify customer endpoint
  useEffect(() => {
    if (!isMounted || !isLoggedIn) {
      setIsLoading(false);
      return;
    }

    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("/api/orders");
        
        if (res.status === 401) {
          // Token expired or invalid, log out locally
          logout();
          return;
        }

        if (!res.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await res.json();
        setOrders(data.orders || []);
      } catch (err) {
        console.error("Error retrieving orders from Shopify:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [isLoggedIn, isMounted, logout]);

  // Prevent hydration mismatch
  if (!isMounted) return null;

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
          <a
            href="/api/auth/login"
            className="inline-flex items-center gap-3 px-10 py-5 bg-black text-white text-[11px] font-black uppercase tracking-[0.3em] hover:bg-[#57AD43] transition-all rounded-sm group"
          >
            <span className="text-white">Sign In to Continue</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </a>
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
    <main className="min-h-screen bg-gray-50/30 pb-24">
      <PageHero subtitle="Order History" mainTitle="Your" accentTitle="Orders" />
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
        
        {/* User Greeting & Stats Bar */}
        <div className="bg-white border border-gray-100 p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 shadow-sm rounded-sm">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#57AD43] mb-1">Authenticated Member</p>
            <h2 className="text-lg font-black uppercase tracking-wider text-black">
              Welcome Back, {user?.name}
            </h2>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mt-1">
              Managing your curated textile archive.
            </p>
          </div>
          <div className="flex items-center gap-12 border-t md:border-t-0 pt-4 md:pt-0 w-full md:w-auto border-gray-50">
            <div>
              <p className="text-[9px] font-black uppercase tracking-widest text-gray-300 mb-1">Live Orders</p>
              <p className="text-xl font-black text-black">{orders.length}</p>
            </div>
            <div>
              <p className="text-[9px] font-black uppercase tracking-widest text-gray-300 mb-1">Shopify Sync</p>
              <p className="text-xl font-black text-[#57AD43] uppercase tracking-widest text-xs font-black">Active</p>
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-8">
          {isLoading ? (
            // Premium Loading Skeleton
            <div className="space-y-8">
              {[1, 2].map((i) => (
                <div key={i} className="bg-white border border-gray-100 p-8 animate-pulse space-y-6">
                  <div className="h-6 bg-gray-100 w-1/3 rounded"></div>
                  <div className="h-[1px] bg-gray-100"></div>
                  <div className="flex gap-6 items-center">
                    <div className="w-20 h-24 bg-gray-100 rounded"></div>
                    <div className="flex-1 space-y-3">
                      <div className="h-4 bg-gray-100 w-2/3 rounded"></div>
                      <div className="h-3 bg-gray-100 w-1/2 rounded"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : orders.length === 0 ? (
            <div className="bg-white p-20 text-center border border-gray-100 shadow-sm rounded-sm">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
                <ShoppingBag size={24} />
              </div>
              <h3 className="text-sm font-black uppercase tracking-widest text-black mb-2">No active orders</h3>
              <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 max-w-xs mx-auto leading-relaxed">
                You haven't placed any fabric orders yet. Check out our catalogs to start your archive.
              </p>
            </div>
          ) : (
            orders.map((order, idx) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow rounded-sm"
              >
                {/* Order Meta */}
                <div className="bg-gray-50/50 px-8 py-5 border-b border-gray-100 flex flex-wrap items-center justify-between gap-6">
                  <div className="flex items-center gap-10">
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1">Order Ref</p>
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
                        <div className="w-20 h-24 bg-gray-50 overflow-hidden flex-shrink-0 border border-gray-100 rounded-sm">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-[12px] font-black uppercase tracking-widest text-black mb-1">{item.name}</h4>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Sync: Shopify Database</p>
                          <div className="flex items-center gap-6">
                            <p className="text-[11px] font-bold text-gray-600">Qty: {item.quantity} units</p>
                            <p className="text-[11px] font-bold text-gray-600">Price: ₹{item.price}/unit</p>
                          </div>
                        </div>
                        <Link
                          href="/fabrics"
                          className="bg-transparent text-black border border-gray-100 px-6 py-3 text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 hover:bg-black hover:text-white flex items-center gap-2 group rounded-sm"
                        >
                          <span className="group-hover:text-white transition-colors">Shop Catalog</span>
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
