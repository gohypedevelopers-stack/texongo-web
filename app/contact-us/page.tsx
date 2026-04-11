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
            src="https://texongo.com/wp-content/uploads/2025/06/jordi-pujadas-6Ju76xzahY-unsplash-1-scaled-1.jpg" 
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
    </main>
  );
}
