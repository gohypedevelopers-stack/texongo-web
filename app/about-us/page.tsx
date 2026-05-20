"use client";

import { motion } from "framer-motion";

export default function AboutUsPage() {
  const fadeIn = {
    initial: { opacity: 0, y: -40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: "easeOut" as const }
  };

  const imageReveal = {
    initial: { clipPath: "inset(0 0 100% 0)" },
    whileInView: { clipPath: "inset(0 0 0% 0)" },
    viewport: { once: true },
    transition: { duration: 1.2, ease: [0.77, 0, 0.175, 1] }
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-24 pb-12 md:pt-32 md:pb-16 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 text-center space-y-4">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#57AD43] block">Our Story</span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-[#121212]">
            About Us
          </h1>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto mt-6">
            Discover our rich heritage and mission to revolutionize the textile industry through innovation and trust.
          </p>
        </div>
      </section>

      {/* -mt-16 removes this so we can have the hero above */}
      <div className="relative h-[100vh]">
        <section className="sticky top-0 h-screen bg-white z-10 flex items-center w-full overflow-hidden pt-16 md:pt-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-[1440px] mx-auto px-6 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full"
          >
            <div className="space-y-3">
              <motion.div {...imageReveal} className="relative aspect-square md:aspect-[6/7] rounded-2xl overflow-hidden shadow-xl group">
                <img
                  src="/ChatGPT Image Apr 30, 2026, 12_48_00 PM.png"
                  alt="Mr. Jagdish Chand Gupta"
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
              <motion.div {...fadeIn} transition={{ ...fadeIn.transition, delay: 0.1 }} className="text-center md:text-left space-y-1 px-4">
                <h3 className="text-2xl font-bold text-black tracking-tighter">Mr. Jagdish Chand Gupta</h3>
                <span className="text-[#57AD43] font-bold text-xs uppercase block">Founder</span>
              </motion.div>
            </div>
            <motion.div {...fadeIn} transition={{ ...fadeIn.transition, delay: 0.2 }} className="space-y-8">
              <div>
                <span className="text-[10px] font-black uppercase text-[#57AD43] mb-1 block">Legacy &amp; Journey</span>
                <h2 className="text-2xl md:text-5xl font-bold text-black mb-6 tracking-tight">About Us</h2>
                <p className="text-sm font-medium text-gray-400 leading-relaxed uppercase">
                  Syndicate Cloth House Pvt. Ltd. &amp; Texongo – A Legacy of Innovation and Trust.
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
          </motion.div>
        </section>
      </div>

      {/* ── Section 2 wrapper: gives 100vh of sticky scroll time ── */}
      <div className="relative h-[100vh]">
        <section className="sticky top-0 h-screen bg-white z-10 flex items-center w-full overflow-hidden">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
            <motion.div {...fadeIn} className="order-2 lg:order-1 space-y-6">
              <div>
                <span className="text-[10px] font-black uppercase text-[#57AD43] mb-1 block">Timeline</span>
                <h2 className="text-2xl md:text-5xl font-bold text-black mb-6 tracking-tight">Growth &amp; Expansion</h2>
                <div className="space-y-4">
                  <p className="text-sm font-medium text-gray-500 leading-relaxed">
                    As the business flourished under the visionary foundation laid by our founder, the next generation stepped in to scale the brand to new heights. Manoj Gupta, his son, joined the company with a mandate to diversify, modernize, and institutionalize operations. By the late 1990s, under his dynamic leadership, Syndicate Cloth House took a massive leap forward by expanding its core operations into knitted fabrics, specialized dyeing, modern processing, and advanced knitting units.
                  </p>
                  <p className="text-sm font-medium text-gray-500 leading-relaxed">
                    This bold diversification successfully transformed the company from a traditional fabric trading house into a fully integrated textile powerhouse. Under his direction, the company built state-of-the-art facilities that streamlined the entire manufacturing cycle—from raw yarn selection to complex finishing processes. This high level of vertical integration ensured unparalleled quality control, rapid turnaround times, and the capability to cater to the demanding needs of global export markets and premium domestic brands.
                  </p>
                </div>
              </div>
            </motion.div>
            <div className="order-1 lg:order-2 space-y-6">
              <motion.div {...imageReveal} className="relative aspect-square md:aspect-[6/7] rounded-2xl overflow-hidden shadow-xl group">
                <img
                  src="/ChatGPT Image Apr 30, 2026, 12_44_57 PM.png"
                  alt="Mr. Manoj Gupta"
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
              <motion.div {...fadeIn} transition={{ ...fadeIn.transition, delay: 0.3 }} className="text-center md:text-left space-y-1 px-4">
                <h3 className="text-2xl font-bold text-black tracking-tighter">Mr. Manoj Gupta</h3>
                <span className="text-[#57AD43] font-bold text-xs uppercase block">Managing Director</span>
              </motion.div>
            </div>
          </div>
        </section>
      </div>

      {/* ── Section 3 wrapper: gives 100vh of sticky scroll time ── */}
      <div className="relative h-[100vh]">
        <section className="sticky top-0 h-screen bg-white z-30 flex items-center w-full overflow-hidden">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
            <div className="space-y-6">
              <motion.div {...imageReveal} className="relative aspect-square md:aspect-[6/7] rounded-2xl overflow-hidden shadow-xl group">
                <img
                  src="https://i.postimg.cc/vZm5xzFP/new-one.png"
                  alt="Aman Gupta"
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
              <motion.div {...fadeIn} transition={{ ...fadeIn.transition, delay: 0.1 }} className="text-center md:text-left space-y-1 px-4">
                <h3 className="text-2xl font-bold text-black tracking-tighter">Aman Gupta</h3>
                <span className="text-[#57AD43] font-bold text-xs uppercase block">Managing Director</span>
              </motion.div>
            </div>
            <motion.div {...fadeIn} transition={{ ...fadeIn.transition, delay: 0.2 }} className="space-y-6">
              <span className="text-[10px] font-black uppercase text-[#57AD43] mb-1 block">Innovation</span>
              <h2 className="text-2xl md:text-5xl font-bold text-black mb-6 tracking-tight">A New Chapter</h2>
              <div className="space-y-4">
                <p className="text-sm font-medium text-gray-500 leading-relaxed">
                  In 2017, Aman Gupta took the helm of the legacy business, bringing a fresh, global perspective and a passion for technological innovation. Recognizing the traditional, fragmented nature of fabric sourcing and the high friction points faced by designers and brands, he realized the industry was ripe for a digital transformation. With a bold vision to bridge the gap between traditional textile expertise and digital speed, he launched Texongo.
                </p>
                <p className="text-sm font-medium text-gray-500 leading-relaxed">
                  Texongo was built as a pioneering B2B platform designed to completely simplify and modernize fabric procurement. By introducing curated swatch kits, transparent pricing, and a unique, highly convenient subscription-based model, Texongo eliminated the endless back-and-forth typical of fabric sourcing. Aman's embrace of cutting-edge tech—including interactive digital fall simulators and 3D fashion studio drapes—has enabled designers to visualize fabrics in real-time, drastically reducing physical waste and product development cycles.
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      {/* ── Section 4: Our Commitment — normal flow, no gaps ── */}
      <section className="relative bg-white pt-12 pb-16 lg:pt-16 lg:pb-32 w-full z-40">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
          {/* Header */}
          <div className="text-center space-y-4 mb-16">
            <span className="text-[10px] md:text-xs font-bold uppercase text-[#57AD43] block">
              Our Promise
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-black tracking-tight">
              Our Commitment
            </h2>
            <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-[#57AD43] to-transparent mx-auto mt-6" />
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {/* Card 1 */}
            <motion.div
              {...fadeIn}
              className="relative rounded-[2rem] overflow-hidden bg-gradient-to-br from-[#57AD43] via-[#4a9a38] to-[#2d6e20] p-8 lg:p-10 min-h-[350px] lg:min-h-[400px] shadow-[0_20px_50px_rgba(87,173,67,0.2)] group hover:-translate-y-4 hover:shadow-[0_30px_60px_rgba(87,173,67,0.3)] transition-all duration-500 flex flex-col justify-center"
            >
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
              <div className="absolute -top-20 -right-20 w-48 h-48 bg-white/20 rounded-full blur-[80px] pointer-events-none transition-all duration-700 group-hover:bg-white/30 group-hover:scale-150" />
              <div className="absolute -bottom-8 -right-4 text-[160px] font-black text-white/5 leading-none select-none pointer-events-none transition-all duration-700 group-hover:scale-110 group-hover:text-white/10 group-hover:-translate-y-4">
                01
              </div>
              <div className="relative z-10">
                <div className="w-12 h-1 bg-white/30 rounded-full mb-8 transition-all duration-500 group-hover:w-20 group-hover:bg-white/60" />
                <p className="text-white/95 text-sm lg:text-base leading-[2] font-normal relative z-10">
                  At Syndicate Cloth House Pvt. Ltd. &amp; Texongo, we believe in more than just business—we believe in relationships, reliability, and continuous innovation. Our commitment extends beyond providing high-quality fabrics; we strive to deliver an exceptional customer experience by offering transparency, efficiency, and personalized solutions tailored to our clients' needs.
                </p>
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              {...fadeIn}
              transition={{ ...fadeIn.transition, delay: 0.1 }}
              className="relative rounded-[2rem] overflow-hidden bg-gradient-to-br from-[#57AD43] via-[#4a9a38] to-[#2d6e20] p-8 lg:p-10 min-h-[350px] lg:min-h-[400px] shadow-[0_20px_50px_rgba(87,173,67,0.2)] group hover:-translate-y-4 hover:shadow-[0_30px_60px_rgba(87,173,67,0.3)] transition-all duration-500 flex flex-col justify-center"
            >
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
              <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-black/20 rounded-full blur-[80px] pointer-events-none transition-all duration-700 group-hover:bg-black/30 group-hover:scale-150" />
              <div className="absolute -bottom-8 -right-4 text-[160px] font-black text-white/5 leading-none select-none pointer-events-none transition-all duration-700 group-hover:scale-110 group-hover:text-white/10 group-hover:-translate-y-4">
                02
              </div>
              <div className="relative z-10">
                <div className="w-12 h-1 bg-white/30 rounded-full mb-8 transition-all duration-500 group-hover:w-20 group-hover:bg-white/60" />
                <p className="text-white/95 text-sm lg:text-base leading-[2] font-normal relative z-10">
                  We understand that the textile industry is ever-evolving, and we embrace change by integrating technology, sustainability, and creative sourcing methods to stay ahead. Our goal is to bridge the gap between traditional textile trading and modern digital solutions, ensuring that our clients have access to the best fabrics with unmatched ease and convenience.
                </p>
              </div>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              {...fadeIn}
              transition={{ ...fadeIn.transition, delay: 0.2 }}
              className="relative rounded-[2rem] overflow-hidden bg-gradient-to-br from-[#57AD43] via-[#4a9a38] to-[#2d6e20] p-8 lg:p-10 min-h-[350px] lg:min-h-[400px] shadow-[0_20px_50px_rgba(87,173,67,0.2)] group hover:-translate-y-4 hover:shadow-[0_30px_60px_rgba(87,173,67,0.3)] transition-all duration-500 flex flex-col justify-center"
            >
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
              <div className="absolute -top-20 -right-20 w-48 h-48 bg-white/20 rounded-full blur-[80px] pointer-events-none transition-all duration-700 group-hover:bg-white/30 group-hover:scale-150" />
              <div className="absolute -bottom-8 -right-4 text-[160px] font-black text-white/5 leading-none select-none pointer-events-none transition-all duration-700 group-hover:scale-110 group-hover:text-white/10 group-hover:-translate-y-4">
                03
              </div>
              <div className="relative z-10">
                <div className="w-12 h-1 bg-white/30 rounded-full mb-8 transition-all duration-500 group-hover:w-20 group-hover:bg-white/60" />
                <p className="text-white/95 text-sm lg:text-base leading-[2] font-normal relative z-10">
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
