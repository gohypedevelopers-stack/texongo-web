"use client";

import { motion } from "framer-motion";
import { PageHero } from "../../components/ui/page-hero";

export default function AboutUsPage() {
  const fadeIn = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.8, ease: "easeOut" as const }
  };

  const imageVariant = {
    initial: { opacity: 0, scale: 0.95 },
    whileInView: { opacity: 1, scale: 1 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.8, ease: "easeOut" as const }
  };

  return (
    <main className="min-h-screen bg-white pb-20">
      <PageHero subtitle="Legacy & Journey" mainTitle="About" accentTitle="Us" />
      
      <div className="max-w-[1440px] mx-auto px-6 lg:px-20 space-y-24 md:space-y-40 mt-12 md:mt-24">
        
        {/* Section 1: Our Legacy */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
          <motion.div {...imageVariant} className="order-1">
            <div className="space-y-4 md:space-y-5 w-full max-w-[380px] md:max-w-[550px] lg:max-w-[460px] mx-auto">
              <div className="relative aspect-square md:aspect-[4/5] lg:aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl group">
                <img
                  src="/ChatGPT Image Apr 30, 2026, 12_48_00 PM.png"
                  alt="Mr. Jagdish Chand Gupta"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="text-center px-2">
                <h3 className="text-xl md:text-2xl font-bold text-black tracking-tighter">Mr. Jagdish Chand Gupta</h3>
                <span className="text-[#57AD43] font-bold text-xs md:text-sm uppercase block mt-1 tracking-widest">Founder</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div {...fadeIn} className="order-2 space-y-6 md:space-y-8 text-center lg:text-left">
            <div>
              <span className="text-sm font-black uppercase text-[#57AD43] mb-2 block tracking-widest">Legacy & Journey</span>
              <h2 className="text-3xl md:text-5xl lg:text-[48px] font-extrabold lg:font-[500] text-black mb-6 tracking-tight">Our Legacy</h2>
              <div className="w-16 h-1 bg-[#57AD43] mx-auto lg:mx-0 mb-6 rounded-full" />
              <p className="text-base md:text-lg font-semibold text-gray-800 leading-relaxed uppercase">
                <strong className="font-extrabold text-black">Syndicate Cloth House Pvt. Ltd. & Texongo</strong> – A Legacy of Innovation and Trust.
              </p>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed mt-4">
                For over 50 years, <strong className="font-bold text-black">Syndicate Cloth House Pvt. Ltd.</strong> has been a trusted name in the textile industry, evolving with time while staying true to its core values of quality, trust, and innovation.
              </p>
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-black mb-4 tracking-tighter">Our Journey</h3>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                In 1975, <strong className="font-bold text-black">Mr. Jagdish Chand Gupta</strong> founded <strong className="font-bold text-black">Syndicate Cloth House</strong> with a vision to revolutionize fabric trading. Leaving behind a stable career in the auto parts industry, he embarked on an entrepreneurial journey, sourcing and supplying premium woven fabrics. In an era without digital connectivity, he built his business through personal relationships, traveling extensively to establish strong and lasting bonds with clients and vendors.
              </p>
            </div>
          </motion.div>
        </section>

        {/* Section 2: Growth & Expansion */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
          <motion.div {...fadeIn} className="order-2 lg:order-1 space-y-6 md:space-y-8 text-center lg:text-left">
            <div>
              <span className="text-sm font-black uppercase text-[#57AD43] mb-2 block tracking-widest">Timeline</span>
              <h2 className="text-3xl md:text-5xl lg:text-[48px] font-extrabold lg:font-[500] text-black mb-6 tracking-tight">Growth & Expansion</h2>
              <div className="w-16 h-1 bg-[#57AD43] mx-auto lg:mx-0 mb-6 rounded-full" />
              <div className="space-y-6">
                <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                  As the business flourished under the visionary foundation laid by our founder, the next generation stepped in to scale the brand to new heights. <strong className="font-bold text-black">Manoj Gupta</strong>, his son, joined the company with a mandate to diversify, modernize, and institutionalize operations. By the late 1990s, under his dynamic leadership, <strong className="font-bold text-black">Syndicate Cloth House</strong> took a massive leap forward by expanding its core operations into knitted fabrics, specialized dyeing, modern processing, and advanced knitting units.
                </p>
                <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                  This bold diversification successfully transformed the company from a traditional fabric trading house into a fully integrated textile powerhouse. Under his direction, the company built state-of-the-art facilities that streamlined the entire manufacturing cycle—from raw yarn selection to complex finishing processes. This high level of vertical integration ensured unparalleled quality control, rapid turnaround times, and the capability to cater to the demanding needs of global export markets and premium domestic brands.
                </p>
              </div>
            </div>
          </motion.div>
          
          <motion.div {...imageVariant} className="order-1 lg:order-2">
            <div className="space-y-4 md:space-y-5 w-full max-w-[380px] md:max-w-[550px] lg:max-w-[460px] mx-auto">
              <div className="relative aspect-square md:aspect-[4/5] lg:aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl group">
                <img
                  src="/ChatGPT Image Apr 30, 2026, 12_44_57 PM.png"
                  alt="Mr. Manoj Gupta"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="text-center px-2">
                <h3 className="text-xl md:text-2xl font-bold text-black tracking-tighter">Mr. Manoj Gupta</h3>
                <span className="text-[#57AD43] font-bold text-xs md:text-sm uppercase block mt-1 tracking-widest">Managing Director</span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Section 3: A New Chapter */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
          <motion.div {...imageVariant} className="order-1">
            <div className="space-y-4 md:space-y-5 w-full max-w-[380px] md:max-w-[550px] lg:max-w-[460px] mx-auto">
              <div className="relative aspect-square md:aspect-[4/5] lg:aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl group">
                <img
                  src="https://i.postimg.cc/vZm5xzFP/new-one.png"
                  alt="Aman Gupta"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="text-center px-2">
                <h3 className="text-xl md:text-2xl font-bold text-black tracking-tighter">Aman Gupta</h3>
                <span className="text-[#57AD43] font-bold text-xs md:text-sm uppercase block mt-1 tracking-widest">Managing Director</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div {...fadeIn} className="order-2 space-y-6 md:space-y-8 text-center lg:text-left">
            <div>
              <span className="text-sm font-black uppercase text-[#57AD43] mb-2 block tracking-widest">Innovation</span>
              <h2 className="text-3xl md:text-5xl lg:text-[48px] font-extrabold lg:font-[500] text-black mb-6 tracking-tight">A New Chapter</h2>
              <div className="w-16 h-1 bg-[#57AD43] mx-auto lg:mx-0 mb-6 rounded-full" />
              <div className="space-y-6">
                <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                  In 2017, <strong className="font-bold text-black">Aman Gupta</strong> took the helm of the legacy business, bringing a fresh, global perspective and a passion for technological innovation. Recognizing the traditional, fragmented nature of fabric sourcing and the high friction points faced by designers and brands, he realized the industry was ripe for a digital transformation. With a bold vision to bridge the gap between traditional textile expertise and digital speed, he launched <strong className="font-bold text-black">Texongo</strong>.
                </p>
                <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                  <strong className="font-bold text-black">Texongo</strong> was built as a pioneering B2B platform designed to completely simplify and modernize fabric procurement. By introducing curated swatch kits, transparent pricing, and a unique, highly convenient subscription-based model, <strong className="font-bold text-black">Texongo</strong> eliminated the endless back-and-forth typical of fabric sourcing. <strong className="font-bold text-black">Aman's</strong> embrace of cutting-edge tech—including interactive digital fall simulators and 3D fashion studio drapes—has enabled designers to visualize fabrics in real-time, drastically reducing physical waste and product development cycles.
                </p>
              </div>
            </div>
          </motion.div>
        </section>

      </div>

      {/* Section 4: Our Commitment */}
      <section className="relative bg-neutral-50 py-16 md:py-24 mt-20 md:mt-32 w-full z-40 border-t border-gray-200">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
          <motion.div {...fadeIn} className="text-center space-y-4 mb-12 md:mb-20">
            <span className="text-sm font-black tracking-widest uppercase text-[#57AD43] block">
              Our Promise
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-[48px] font-extrabold lg:font-[500] text-black tracking-tight">
              Our Commitment
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#57AD43] to-transparent mx-auto mt-6" />
          </motion.div>

          <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 md:gap-8 lg:gap-10 pb-8 [&::-webkit-scrollbar]:hidden px-4 md:px-2">
            {/* Card 1 */}
            <motion.div
              {...fadeIn}
              className="relative shrink-0 snap-start w-[85vw] max-w-[380px] h-[450px] lg:w-[400px] rounded-3xl overflow-hidden bg-gradient-to-br from-[#57AD43] via-[#4a9a38] to-[#2d6e20] p-8 md:p-10 lg:p-12 shadow-[0_20px_50px_rgba(87,173,67,0.2)] group hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(87,173,67,0.3)] transition-all duration-500 flex flex-col"
            >
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/20 rounded-full blur-[80px] pointer-events-none transition-all duration-700 group-hover:bg-white/30 group-hover:scale-150" />
              <div className="absolute -bottom-8 -right-4 text-[140px] md:text-[180px] font-black text-white/10 leading-none select-none pointer-events-none transition-all duration-700 group-hover:scale-110 group-hover:text-white/15 group-hover:-translate-y-4">
                01
              </div>
              <div className="relative z-10 flex-1 flex flex-col justify-center">
                <div className="w-12 h-1 bg-white/40 rounded-full mb-8 transition-all duration-500 group-hover:w-20 group-hover:bg-white/80" />
                <p className="text-white/95 leading-relaxed font-medium relative z-10 mb-4" style={{ fontSize: "clamp(0.875rem, 1.2vw + 0.5rem, 1.125rem)" }}>
                  At <strong className="font-bold text-white">Syndicate Cloth House Pvt. Ltd. & Texongo</strong>, we believe in more than just business—we believe in relationships, reliability, and continuous innovation. Our commitment extends beyond providing high-quality fabrics; we strive to deliver an exceptional customer experience by offering transparency, efficiency, and personalized solutions tailored to our clients' needs.
                </p>
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              {...fadeIn}
              transition={{ ...fadeIn.transition, delay: 0.1 }}
              className="relative shrink-0 snap-start w-[85vw] max-w-[380px] h-[450px] lg:w-[400px] rounded-3xl overflow-hidden bg-gradient-to-br from-[#57AD43] via-[#4a9a38] to-[#2d6e20] p-8 md:p-10 lg:p-12 shadow-[0_20px_50px_rgba(87,173,67,0.2)] group hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(87,173,67,0.3)] transition-all duration-500 flex flex-col"
            >
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-black/20 rounded-full blur-[80px] pointer-events-none transition-all duration-700 group-hover:bg-black/30 group-hover:scale-150" />
              <div className="absolute -bottom-8 -right-4 text-[140px] md:text-[180px] font-black text-white/10 leading-none select-none pointer-events-none transition-all duration-700 group-hover:scale-110 group-hover:text-white/15 group-hover:-translate-y-4">
                02
              </div>
              <div className="relative z-10 flex-1 flex flex-col justify-center">
                <div className="w-12 h-1 bg-white/40 rounded-full mb-8 transition-all duration-500 group-hover:w-20 group-hover:bg-white/80" />
                <p className="text-white/95 leading-relaxed font-medium relative z-10 mb-4" style={{ fontSize: "clamp(0.875rem, 1.2vw + 0.5rem, 1.125rem)" }}>
                  We understand that the textile industry is ever-evolving, and we embrace change by integrating technology, sustainability, and creative sourcing methods to stay ahead. Our goal is to bridge the gap between traditional textile trading and modern digital solutions, ensuring that our clients have access to the best fabrics with unmatched ease and convenience.
                </p>
              </div>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              {...fadeIn}
              transition={{ ...fadeIn.transition, delay: 0.2 }}
              className="relative shrink-0 snap-start w-[85vw] max-w-[380px] h-[450px] lg:w-[400px] rounded-3xl overflow-hidden bg-gradient-to-br from-[#57AD43] via-[#4a9a38] to-[#2d6e20] p-8 md:p-10 lg:p-12 shadow-[0_20px_50px_rgba(87,173,67,0.2)] group hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(87,173,67,0.3)] transition-all duration-500 flex flex-col"
            >
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/20 rounded-full blur-[80px] pointer-events-none transition-all duration-700 group-hover:bg-white/30 group-hover:scale-150" />
              <div className="absolute -bottom-8 -right-4 text-[140px] md:text-[180px] font-black text-white/10 leading-none select-none pointer-events-none transition-all duration-700 group-hover:scale-110 group-hover:text-white/15 group-hover:-translate-y-4">
                03
              </div>
              <div className="relative z-10 flex-1 flex flex-col justify-center">
                <div className="w-12 h-1 bg-white/40 rounded-full mb-8 transition-all duration-500 group-hover:w-20 group-hover:bg-white/80" />
                <p className="text-white/95 leading-relaxed font-medium relative z-10 mb-4" style={{ fontSize: "clamp(0.875rem, 1.2vw + 0.5rem, 1.125rem)" }}>
                  With a legacy built on trust and a future driven by technology, we continue to redefine fabric sourcing for the modern era.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

    </main>
  );
}
