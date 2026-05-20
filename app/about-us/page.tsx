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
        <div className="relative z-10 h-full flex flex-col items-center justify-center">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#57AD43] mb-1 block">Our Story</span>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="text-white text-3xl md:text-6xl font-bold tracking-tight text-center"
          >
            About Us
          </motion.h1>
        </div>
      </section>

      {/* Content Sections Wrapper */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-20 py-24 space-y-32">
        
        {/* Section 1: Legacy & Journey */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <motion.div {...fadeIn} className="relative aspect-square md:aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl group">
              <img 
                src="/ChatGPT Image Apr 30, 2026, 12_48_00 PM.png" 
                alt="Mr. Jagdish Chand Gupta" 
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
            <motion.div {...fadeIn} transition={{ ...fadeIn.transition, delay: 0.1 }} className="text-center md:text-left space-y-1 px-4">
              <h3 className="text-2xl font-bold text-black tracking-tighter">Mr. Jagdish Chand Gupta</h3>
              <span className="text-[#57AD43] font-bold text-xs uppercase tracking-[0.3em] block">Founder</span>
            </motion.div>
          </div>
          <motion.div {...fadeIn} transition={{ ...fadeIn.transition, delay: 0.2 }} className="space-y-8">
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#57AD43] mb-1 block">Legacy & Journey</span>
              <h2 className="text-2xl md:text-5xl font-bold text-black mb-6 tracking-tight">About Us</h2>
              <p className="text-sm font-medium text-gray-400 leading-relaxed uppercase tracking-widest">
                Syndicate Cloth House Pvt. Ltd. & Texongo – A Legacy of Innovation and Trust. 
              </p>
              <p className="text-sm font-medium text-gray-500 leading-relaxed mt-4">
                For over 50 years, Syndicate Cloth House Pvt. Ltd. has been a trusted name in the textile industry, evolving with time while staying true to its core values of quality, trust, and innovation.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-black mb-4 tracking-tighter">Our Journey</h3>
              <p className="text-sm font-medium text-gray-500 leading-relaxed">
                In 1975, Mr. Jagdish Chand Gupta founded Syndicate Cloth House with a vision to revolutionize fabric trading. Leaving behind a stable career in the auto parts industry, he embarked on an entrepreneurial journey, sourcing and supplying premium woven fabrics. In an era without digital connectivity, he built his business through personal relationships, traveling extensively to establish strong and lasting bonds with clients and vendors.
              </p>
            </div>
          </motion.div>
        </section>

        {/* Section 2: Growth & Expansion (Inverted) */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeIn} className="order-2 lg:order-1 space-y-6">
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#57AD43] mb-1 block">Timeline</span>
              <h2 className="text-2xl md:text-5xl font-bold text-black mb-6 tracking-tight">Growth & Expansion</h2>
              <div className="space-y-4">
                <p className="text-sm font-medium text-gray-500 leading-relaxed">
                  As the business flourished under the visionary foundation laid by our founder, the next generation stepped in to scale the brand to new heights. Manoj Gupta, his son, joined the company with a mandate to diversify, modernize, and institutionalize operations. By the late 1990s, under his dynamic leadership, Syndicate Cloth House took a massive leap forward by expanding its core operations into knitted fabrics, specialized dyeing, modern processing, and advanced knitting units.
                </p>
                <p className="text-sm font-medium text-gray-500 leading-relaxed">
                  This bold diversification successfully transformed the company from a traditional fabric trading house into a fully integrated textile powerhouse. Under his direction, the company built state-of-the-art facilities that streamlined the entire manufacturing cycle—from raw yarn selection to complex finishing processes. This high level of vertical integration ensured unparalleled quality control, rapid turnaround times, and the capability to cater to the demanding needs of global export markets and premium domestic brands.
                </p>
                <p className="text-sm font-medium text-gray-500 leading-relaxed">
                  Today, this robust infrastructure forms the backbone of our manufacturing prowess. Manoj Gupta's insistence on upgrading technology, investing in green manufacturing practices, and nurturing long-term relationships with weavers and processors has cemented Syndicate's reputation as a reliable and progressive leader in the highly competitive knitted fabrics sector.
                </p>
              </div>
            </div>
          </motion.div>
          <div className="order-1 lg:order-2 space-y-6">
            <motion.div {...fadeIn} transition={{ ...fadeIn.transition, delay: 0.2 }} className="relative aspect-square md:aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl group">
              <img 
                src="/ChatGPT Image Apr 30, 2026, 12_44_57 PM.png" 
                alt="Mr. Manoj Gupta" 
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
            <motion.div {...fadeIn} transition={{ ...fadeIn.transition, delay: 0.3 }} className="text-center md:text-left space-y-1 px-4">
              <h3 className="text-2xl font-bold text-black tracking-tighter">Mr. Manoj Gupta</h3>
              <span className="text-[#57AD43] font-bold text-xs uppercase tracking-[0.3em] block">Managing Director</span>
            </motion.div>
          </div>
        </section>

        {/* Section 3: A New Chapter */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <motion.div {...fadeIn} className="relative aspect-square md:aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl group">
              <img 
                src="https://i.postimg.cc/vZm5xzFP/new-one.png" 
                alt="Aman Gupta" 
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
            <motion.div {...fadeIn} transition={{ ...fadeIn.transition, delay: 0.1 }} className="text-center md:text-left space-y-1 px-4">
              <h3 className="text-2xl font-bold text-black tracking-tighter">Aman Gupta</h3>
              <span className="text-[#57AD43] font-bold text-xs uppercase tracking-[0.3em] block">Managing Director</span>
            </motion.div>
          </div>
          <motion.div {...fadeIn} transition={{ ...fadeIn.transition, delay: 0.2 }} className="space-y-6">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#57AD43] mb-1 block">Innovation</span>
            <h2 className="text-2xl md:text-5xl font-bold text-black mb-6 tracking-tight">A New Chapter</h2>
            <div className="space-y-4">
              <p className="text-sm font-medium text-gray-500 leading-relaxed">
                In 2017, Aman Gupta took the helm of the legacy business, bringing a fresh, global perspective and a passion for technological innovation. Recognizing the traditional, fragmented nature of fabric sourcing and the high friction points faced by designers and brands, he realized the industry was ripe for a digital transformation. With a bold vision to bridge the gap between traditional textile expertise and digital speed, he launched Texongo.
              </p>
              <p className="text-sm font-medium text-gray-500 leading-relaxed">
                Texongo was built as a pioneering B2B platform designed to completely simplify and modernize fabric procurement. By introducing curated swatch kits, transparent pricing, and a unique, highly convenient subscription-based model, Texongo eliminated the endless back-and-forth typical of fabric sourcing. Aman's embrace of cutting-edge tech—including interactive digital fall simulators and 3D fashion studio drapes—has enabled designers to visualize fabrics in real-time, drastically reducing physical waste and product development cycles.
              </p>
              <p className="text-sm font-medium text-gray-500 leading-relaxed">
                Today, Texongo has grown into a highly trusted digital partner, proudly serving over 150+ leading brands and 50+ prestigious export & buying houses worldwide. By combining half a century of textile heritage with frictionless digital experiences, Aman is driving Texongo to establish a new global standard for the fabric supply chain, making it more efficient, creative, and completely hassle-free.
              </p>
            </div>
          </motion.div>
        </section>

        {/* Section 4: Commitment (Text Only) */}
        <section className="max-w-4xl mx-auto">
          <motion.div {...fadeIn} className="space-y-8">
            <div className="text-center mb-10">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#57AD43] mb-1 block">Our Promise</span>
              <h2 className="text-2xl md:text-5xl font-bold text-black tracking-tight">Our Commitment</h2>
            </div>
            <div className="space-y-6">
              <p className="text-lg font-medium text-gray-600 leading-relaxed text-center">
                At Syndicate Cloth House Pvt. Ltd. & Texongo, we believe in more than just business—we believe in relationships, reliability, and continuous innovation. Our commitment extends beyond providing high-quality fabrics; we strive to deliver an exceptional customer experience by offering transparency, efficiency, and personalized solutions tailored to our clients' needs.
              </p>
              <p className="text-lg font-medium text-gray-600 leading-relaxed text-center">
                We understand that the textile industry is ever-evolving, and we embrace change by integrating technology, sustainability, and creative sourcing methods to stay ahead. Our goal is to bridge the gap between traditional textile trading and modern digital solutions, ensuring that our clients have access to the best fabrics with unmatched ease and convenience.
              </p>
              <div className="pt-8">
                <p className="text-xl font-bold text-black border-l-4 border-[#57AD43] pl-8 italic leading-relaxed py-4 bg-gray-50 rounded-r-2xl shadow-sm">
                  With a legacy built on trust and a future driven by technology, we continue to redefine fabric sourcing for the modern era.
                </p>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </main>
  );
}
