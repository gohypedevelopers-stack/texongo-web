"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-black text-white pt-24 pb-12">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 mb-20">
          <div className="space-y-8">
            <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-white/40">About Us</h3>
            <p className="text-sm font-medium text-white/70 leading-relaxed max-w-sm">
              At Texongo, we redefine the fabric sourcing experience, transforming a traditionally complex process into a seamless journey from idea to inventory. We are your one-stop solution for all knit fabrics.
            </p>
          </div>
          <div className="space-y-8">
            <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-white/40">Menu</h3>
            <ul className="grid grid-cols-2 gap-4">
              {["Home", "About Us", "Contact Us", "Terms of Service", "Refund Policy", "Shipping Policy", "Privacy Policy"].map((item) => (
                <li key={item}>
                  <Link
                    href={item === "Home" ? "/" : `/${item.toLowerCase().replace(/ /g, '-')}`}
                    className="text-sm font-bold text-white/60 hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-8">
            <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-white/40">Contact Details</h3>
            <div className="space-y-4">
              <p className="text-sm text-white/70 font-medium">D 10/1
                Okhla Industrial Area Phase II
                New Delhi , Delhi - 110020 </p>
              <p className="text-sm text-white/70 font-medium">Contact No: +91 9910048498 / 9310598498</p>
              <p className="text-sm text-white/70 font-medium">Email id - Connect@texongo.com</p>
            </div>
          </div>
        </div>
        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">© 2026 Texongo Fabrics. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
