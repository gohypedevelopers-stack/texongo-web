"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Lock, User, ArrowRight } from "lucide-react";
import { useAuthStore } from "@/lib/store";

export function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, login } = useAuthStore();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate auth
    login(email, isLogin ? "Member" : name);
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
          className="relative w-full max-w-md bg-white overflow-hidden shadow-2xl"
        >
          <button 
            onClick={closeAuthModal}
            className="absolute top-6 right-6 p-2 text-gray-400 hover:text-black transition-colors z-10"
          >
            <X size={20} />
          </button>

          <div className="p-8 md:p-12">
            <div className="mb-10 text-center">
              <h2 className="text-2xl font-black uppercase tracking-[0.2em] text-black mb-2">
                {isLogin ? "Welcome Back" : "Create Account"}
              </h2>
              <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400">
                {isLogin ? "Enter your details to access your orders" : "Join Texongo for a premium fabric experience"}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block ml-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      type="text"
                      required={!isLogin}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="JOHN DOE"
                      className="w-full bg-gray-50 border border-gray-100 py-4 px-12 text-[12px] font-bold tracking-widest focus:bg-white focus:border-black transition-all outline-none"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="EMAIL@EXAMPLE.COM"
                    className="w-full bg-gray-50 border border-gray-100 py-4 px-12 text-[12px] font-bold tracking-widest focus:bg-white focus:border-black transition-all outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block ml-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-gray-50 border border-gray-100 py-4 px-12 text-[12px] font-bold tracking-widest focus:bg-white focus:border-black transition-all outline-none"
                  />
                </div>
              </div>

              {isLogin && (
                <div className="flex justify-end">
                  <button type="button" className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black transition-colors">
                    Forgot Password?
                  </button>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-black text-white py-5 flex items-center justify-center gap-3 group hover:bg-[#57AD43] transition-all duration-500 rounded-sm"
              >
                <span className="text-[11px] font-black uppercase tracking-[0.3em]">{isLogin ? "Sign In" : "Register Now"}</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            <div className="mt-10 pt-8 border-t border-gray-100 text-center">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button 
                  onClick={() => setIsLogin(!isLogin)}
                  className="ml-2 text-black hover:underline transition-all"
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
