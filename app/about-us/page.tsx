"use client";

import { motion } from "framer-motion";
import { FaInstagram, FaXTwitter, FaYoutube, FaFacebookF } from "react-icons/fa6";

export default function AboutUsPage() {
  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: "easeOut" as const }
  };


  return (
    <main className="min-h-screen bg-white">

      {/* Hero Banner Section */}
      <section className="relative h-[40vh] md:h-[50vh] w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/fabric-bg-clean.png" 
            alt="About Us Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]"></div>
        </div>
        <div className="relative z-10 h-full flex items-center justify-center">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="text-white text-5xl md:text-8xl font-black uppercase tracking-tighter"
          >
            About Us
          </motion.h1>
        </div>
      </section>

      {/* Content Sections Wrapper */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-20 py-24 space-y-32">
        
        {/* Section 1: Legacy & Journey */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeIn} className="relative aspect-square md:aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl">
            <img 
              src="/category/fabric-rib.png" 
              alt="Legacy Journey" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          </motion.div>
          <motion.div {...fadeIn} transition={{ ...fadeIn.transition, delay: 0.2 }} className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-black mb-6 tracking-tight">About Us</h2>
              <p className="text-sm font-medium text-gray-400 leading-relaxed uppercase tracking-widest">
                Syndicate Cloth House Pvt. Ltd. & Texongo – A Legacy of Innovation and Trust. 
              </p>
              <p className="text-sm font-medium text-gray-500 leading-relaxed mt-4">
                For over 50 years, Syndicate Cloth House Pvt. Ltd. has been a trusted name in the textile industry, evolving with time while staying true to its core values of quality, trust, and innovation.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-black text-black mb-4 uppercase tracking-tighter">Our Journey</h3>
              <p className="text-sm font-medium text-gray-500 leading-relaxed">
                In 1975, Mr. Jagdish Chand Gupta founded Syndicate Cloth House with a vision to revolutionize fabric trading. Leaving behind a stable career in the auto parts industry, he embarked on an entrepreneurial journey, sourcing and supplying premium woven fabrics. In an era without digital connectivity, he built his business through personal relationships, traveling extensively to establish strong and lasting bonds with clients and vendors.
              </p>
            </div>
          </motion.div>
        </section>

        {/* Section 2: Growth & Expansion (Inverted) */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeIn} className="order-2 lg:order-1 space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-black mb-6 tracking-tight">Growth & Expansion</h2>
              <p className="text-sm font-medium text-gray-500 leading-relaxed">
                As the business flourished, the next generation stepped in. Manoj Gupta, his son, joined the company and, by the late 1990s, expanded operations into knitted fabrics, exports, dyeing, and knitting units, transforming the company into a fully integrated textile powerhouse.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-black text-black mb-4 uppercase tracking-tighter">A New Chapter with Texongo</h3>
              <p className="text-sm font-medium text-gray-500 leading-relaxed">
                In 2017, Aman Gupta took the helm, bringing a fresh perspective and technological innovation. Recognizing the challenges of fabric sourcing, he launched Texongo, a pioneering platform designed to simplify fabric procurement through curated swatches and a unique subscription-based model. Today, Texongo serves 150+ brands and 50+ export & buying houses, making fabric sourcing more efficient and hassle-free.
              </p>
            </div>
          </motion.div>
          <motion.div {...fadeIn} transition={{ ...fadeIn.transition, delay: 0.2 }} className="order-1 lg:order-2 relative aspect-square md:aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl">
            <img 
              src="/category/fabric-pique.png" 
              alt="Growth Expansion" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          </motion.div>
        </section>

        {/* Section 3: Commitment */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeIn} className="relative aspect-square md:aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl">
            <img 
              src="/category/fabric-single-jersey.png" 
              alt="Our Commitment" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          </motion.div>
          <motion.div {...fadeIn} transition={{ ...fadeIn.transition, delay: 0.2 }} className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-black text-black mb-6 tracking-tight">Our Commitment</h2>
            <div className="space-y-4">
              <p className="text-sm font-medium text-gray-500 leading-relaxed">
                At Syndicate Cloth House Pvt. Ltd. & Texongo, we believe in more than just business—we believe in relationships, reliability, and continuous innovation. Our commitment extends beyond providing high-quality fabrics; we strive to deliver an exceptional customer experience by offering transparency, efficiency, and personalized solutions tailored to our clients' needs.
              </p>
              <p className="text-sm font-medium text-gray-500 leading-relaxed">
                We understand that the textile industry is ever-evolving, and we embrace change by integrating technology, sustainability, and creative sourcing methods to stay ahead. Our goal is to bridge the gap between traditional textile trading and modern digital solutions, ensuring that our clients have access to the best fabrics with unmatched ease and convenience.
              </p>
              <p className="text-sm font-bold text-black border-l-4 border-[#57AD43] pl-6 italic leading-relaxed py-2">
                With a legacy built on trust and a future driven by technology, we continue to redefine fabric sourcing for the modern era.
              </p>
            </div>
          </motion.div>
        </section>
      </div>
    </main>
  );
}
