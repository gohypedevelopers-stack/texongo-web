"use client";

import { ContactForm } from "../../components/ui/contact-form";
import { motion } from "framer-motion";
import { PageHero } from "../../components/ui/page-hero";

export default function ContactUsPage() {
  const fadeIn = {
    initial: { opacity: 0, y: -40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: "easeOut" as const }
  };

  return (
    <main className="min-h-screen bg-white pb-0">
      <PageHero subtitle="Get In Touch" mainTitle="Contact" accentTitle="Us" />


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
