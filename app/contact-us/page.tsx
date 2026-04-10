"use client";

import { ContactForm } from "../../components/ui/contact-form";
import { motion } from "framer-motion";
import { FaInstagram, FaXTwitter, FaYoutube, FaFacebookF } from "react-icons/fa6";

export default function ContactUsPage() {
  return (
    <main className="min-h-screen bg-white">

      {/* Hero Banner Section */}
      <section className="relative h-[25vh] md:h-[40vh] w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/hero/hero-fabrics.jpg" 
            alt="Contact Us" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
        </div>
        <div className="relative z-10 h-full flex items-center justify-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white text-5xl md:text-7xl font-black uppercase tracking-tighter"
          >
            Contact Us
          </motion.h1>
        </div>
      </section>

      {/* Main Form & Info Section */}
      <section className="bg-gray-50">
        <ContactForm />
      </section>

      {/* Map Section */}
      <section className="w-full h-[450px] bg-gray-200 grayscale hover:grayscale-0 transition-all duration-700">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3505.518608465177!2d77.27301037617637!3d28.524103988448833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce36bef41bf97%3A0xc3f83769cda4479e!2sD%2010%2F1%2C%20Okhla%20Industrial%20Estate%20Phase%20III%2C%20Okhla%20Phase%20III%2C%20Okhla%20Industrial%20Estate%2C%20New%20Delhi%2C%20Delhi%20110020!5e0!3m2!1sen!2sin!4v1712745000000!5m2!1sen!2sin" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>

      {/* High-End Footer */}
      <footer className="bg-black text-white pt-24 pb-12">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 mb-20">
            {/* About Column */}
            <div className="space-y-8">
              <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-white/40">About Us</h3>
              <p className="text-sm font-medium text-white/70 leading-relaxed max-w-sm">
                At Texongo, we redefine the fabric sourcing experience, transforming a traditionally complex process into a seamless journey from idea to inventory. We are your one-stop solution for all knit fabrics.
              </p>
              <div className="flex items-center gap-5">
                {[FaFacebookF, FaInstagram, FaXTwitter, FaYoutube].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 hover:bg-white hover:text-black transition-all">
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            {/* Menu Column */}
            <div className="space-y-8">
              <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-white/40">Menu</h3>
              <ul className="grid grid-cols-2 gap-4">
                {["Home", "About Us", "Contact Us", "Terms of Service", "Refund Policy", "Shipping Policy", "Privacy Policy"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm font-bold text-white/60 hover:text-white transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Details Column */}
            <div className="space-y-8">
              <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-white/40">Contact Details</h3>
              <div className="space-y-4">
                <p className="text-sm text-white/70 font-medium">
                  D 10/1, Pocket D,<br />
                  Okhla Industrial Area Phase II,<br />
                  New Delhi, Delhi 110020
                </p>
                <p className="text-sm text-white/70 font-medium">
                  Contact No: +91 9910048498 - 9810598498
                </p>
                <p className="text-sm text-white/70 font-medium">
                  Email id - contact@texongo.com
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 text-center md:text-left">
              © {new Date().getFullYear()} Texongo Made with ThemeHunk WordPress Theme
            </p>
            <div className="flex gap-8">
              {["Privacy Policy", "Terms of Use"].map(item => (
                <a key={item} href="#" className="text-[10px] font-black uppercase tracking-widest text-white/20 hover:text-white transition-colors">{item}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
