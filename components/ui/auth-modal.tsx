"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Lock, User, ArrowRight, ShieldCheck } from "lucide-react";
import { useAuthStore } from "@/lib/store";

export function AuthModal() {
  const { isAuthModalOpen, closeAuthModal } = useAuthStore();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    // Redirect to secure Shopify Auth flow, pre-filling their email in Shopify
    window.location.href = `/api/auth/login?email=${encodeURIComponent(email)}`;
  };

  if (!isAuthModalOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeAuthModal}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md bg-white overflow-hidden shadow-2xl rounded-sm"
        >
          <button 
            onClick={closeAuthModal}
            className="absolute top-6 right-6 p-2 text-gray-400 hover:text-black transition-colors z-10"
          >
            <X size={20} />
          </button>

          <div className="p-8 md:p-12">
            <div className="mb-8 text-center">
              <div className="w-10 h-10 bg-gray-50 border border-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 text-[#57AD43]">
                <ShieldCheck size={20} />
              </div>
              <h2 className="text-xl font-black uppercase tracking-[0.2em] text-black mb-2">
                {isLogin ? "Welcome Back" : "Create Account"}
              </h2>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                {isLogin ? "Enter details to access your textile archive" : "Register for a premium fabric experience"}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && (
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 block ml-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                    <input
                      type="text"
                      required={!isLogin}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="JOHN DOE"
                      className="w-full bg-gray-50 border border-gray-100 py-3.5 px-11 text-[11px] font-bold tracking-widest focus:bg-white focus:border-black transition-all outline-none rounded-sm"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 block ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="EMAIL@EXAMPLE.COM"
                    className="w-full bg-gray-50 border border-gray-100 py-3.5 px-11 text-[11px] font-bold tracking-widest focus:bg-white focus:border-black transition-all outline-none rounded-sm"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 block ml-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-gray-50 border border-gray-100 py-3.5 px-11 text-[11px] font-bold tracking-widest focus:bg-white focus:border-black transition-all outline-none rounded-sm"
                  />
                </div>
              </div>

              {isLogin && (
                <div className="flex justify-end">
                  <button type="button" className="text-[9px] font-black uppercase tracking-widest text-gray-400 hover:text-black transition-colors">
                    Forgot Password?
                  </button>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-black text-white py-4.5 flex items-center justify-center gap-3 group hover:bg-[#57AD43] transition-all duration-500 rounded-sm text-[11px] font-black uppercase tracking-[0.25em] shadow-sm hover:shadow-md"
              >
                <span>{isLogin ? "Sign In" : "Register Now"}</span>
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            {/* Google Sign-In Options */}
            <div className="mt-5 flex flex-col items-center justify-center">
              <div className="flex items-center w-full mb-5">
                <div className="h-[1px] bg-gray-100 flex-1"></div>
                <span className="text-[8px] font-black uppercase tracking-[0.2em] text-gray-300 mx-4">OR</span>
                <div className="h-[1px] bg-gray-100 flex-1"></div>
              </div>

              <a
                href="/api/auth/login"
                className="w-full bg-white hover:bg-gray-50 border border-gray-200 text-black py-4 flex items-center justify-center gap-3 transition-colors text-[11px] font-black uppercase tracking-[0.2em] rounded-sm shadow-sm hover:shadow-md"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>Continue with Google</span>
              </a>
            </div>

            <div className="mt-6 pt-5 border-t border-gray-100 text-center">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button 
                  onClick={() => setIsLogin(!isLogin)}
                  className="ml-2 text-black hover:underline transition-all font-black"
                >
                  {isLogin ? "Create One" : "Login Here"}
                </button>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
