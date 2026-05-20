"use client";

import { ContactForm } from "../../components/ui/contact-form";
import { motion } from "framer-motion";

export default function ContactUsPage() {
  const fadeIn = {
    initial: { opacity: 0, y: -40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: "easeOut" as const }
  };

  return (
    <main className="min-h-screen bg-white -mt-16 pt-28 lg:pt-32 pb-0">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-20 mb-8 lg:mb-16">
        <motion.div {...fadeIn} className="text-center space-y-4">
          <span className="text-[10px] md:text-xs font-black uppercase text-[#57AD43] block tracking-widest">
            Get In Touch
          </span>
          <h1 className="text-4xl md:text-7xl font-bold text-black tracking-tight mb-6">
            Contact Us
          </h1>
          <p className="text-gray-500 font-medium max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            We'd love to hear from you. Whether you have a question about our fabrics, pricing, or anything else, our team is ready to answer all your questions.
          </p>
        </motion.div>
      </div>

      {/* Main Form & Info Section */}
      <section className="bg-white w-full">
        <ContactForm />
      </section>

      {/* Map Section */}
      <section className="w-full mt-16 lg:mt-32">
        <motion.div 
          {...fadeIn} 
          className="w-full h-[400px] lg:h-[500px] relative group"
        >
          <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-700 pointer-events-none z-10" />
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3505.518608465177!2d77.27301037617637!3d28.524103988448833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce36bef41bf97%3A0xc3f83769cda4479e!2sD%2010%2F1%2C%20Okhla%20Industrial%20Estate%20Phase%20III%2C%20Okhla%20Phase%20III%2C%20Okhla%20Industrial%20Estate%2C%20New%20Delhi%2C%20Delhi%20110020!5e0!3m2!1sen!2sin!4v1712745000000!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="grayscale group-hover:grayscale-0 transition-all duration-700"
          ></iframe>
        </motion.div>
      </section>
    </main>
  );
}
