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
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7010.67730394791!2d77.2705829458456!3d28.529539028952048!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce11cbb1b65c1%3A0xcb19821f10705b22!2sTexongo%20(Syndicate%20Cloth%20House)!5e0!3m2!1sen!2sin!4v1779880942926!5m2!1sen!2sin" 
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
