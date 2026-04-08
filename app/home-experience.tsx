import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import { CategorySlider } from "./category-slider";
import { FaqSection } from "./faq-section";
import { ParallaxText } from "./parallax-text";
import { LazyVideo } from "./lazy-video";

const marqueeProducts = [
  {
    name: "Cotton Spandex Interlock",
    price: "₹650 / m",
    href: "https://texongo.com/product/cotton-spandex-interlock/",
    image: "/arrivals/prod-cotton-spandex-interlock.png",
  },
  {
    name: "Cotton Indigo Terry",
    price: "₹999 / m",
    href: "https://texongo.com/product/cotton-indigo-terry/",
    image: "/arrivals/prod-cotton-indigo-terry.png",
  },
  {
    name: "Poly Viscose Spandex S/J",
    price: "₹700 / m",
    href: "https://texongo.com/shop/",
    image: "/arrivals/prod-poly-viscose-spandex.png",
  },
  {
    name: "Nylon Spandex S/J",
    price: "₹799 / m",
    href: "https://texongo.com/shop/",
    image: "/arrivals/prod-nylon-spandex.png",
  },
  {
    name: "Slub Melange Single Jersey",
    price: "₹600 / m",
    href: "https://texongo.com/shop/",
    image: "/arrivals/prod-slub-melange.png",
  },
  {
    name: "Rib Fabric",
    price: "₹380 / m",
    href: "https://texongo.com/product-category/knit-style/rib/",
    image: "/category/fabric-rib.png",
  },
  {
    name: "French Terry",
    price: "₹520 / m",
    href: "https://texongo.com/product-category/knit-style/french-terry/",
    image: "/category/fabric-french-terry.png",
  },
  {
    name: "Waffle Knit",
    price: "₹440 / m",
    href: "https://texongo.com/product-category/knit-style/waffle/",
    image: "/category/fabric-waffle.png",
  },
  {
    name: "Single Jersey",
    price: "₹395 / m",
    href: "https://texongo.com/product-category/knit-style/single-jersey/",
    image: "/category/fabric-single-jersey.png",
  },
  {
    name: "Pique",
    price: "₹460 / m",
    href: "https://texongo.com/product-category/knit-style/pique/",
    image: "/category/fabric-pique.png",
  },
];

const categoryCards = [
  {
    title: "Rib",
    label: "Stretch & Structure",
    caption: "A vertically ribbed knit fabric known for its elasticity and body-hugging fit. Ideal for cuffs, collars, and fitted garments. Offers excellent recovery and a clean, classic texture.",
    image: "/category/fabric-rib.png",
    href: "#new-collection",
    cta: "Explore",
  },
  {
    title: "Pique",
    label: "Textured Weave",
    caption: "A raised honeycomb-textured fabric commonly used in polo shirts and sportswear. Breathable, durable, and structured — it adds refined visual interest to any garment.",
    image: "/category/fabric-pique.png",
    href: "#new-collection",
    cta: "Explore",
  },
  {
    title: "French Terry",
    label: "Soft Comfort",
    caption: "A looped-back knit with a smooth face and a soft, absorbent interior. Perfect for loungewear, hoodies, and sweatshirts. Lightweight yet warm with excellent drape.",
    image: "/category/fabric-french-terry.png",
    href: "#new-collection",
    cta: "Explore",
  },
  {
    title: "Waffle",
    label: "Grid Texture",
    caption: "Distinctive grid-patterned thermal knit that offers superior insulation and moisture management. Popular in thermal underlayers, robes, and cozy everyday wear.",
    image: "/category/fabric-waffle.png",
    href: "#new-collection",
    cta: "Explore",
  },
  {
    title: "Single Jersey",
    label: "Everyday Essential",
    caption: "A lightweight, single-layer plain knit that is soft, smooth, and highly versatile. The go-to fabric for T-shirts and everyday basics — breathable, comfortable, and easy to print on.",
    image: "/category/fabric-single-jersey.png",
    href: "#new-collection",
    cta: "Explore",
  },
];

const storyProducts = [
  {
    name: "Premium Women's Wear",
    price: "From INR 1,890",
    video: "/video/7.mp4",
    alt: "Texongo premium womenswear editorial look",
    word: "Soft",
    href: "#new-collection",
    tone: "#dbe8ea",
  },
  {
    name: "Digital Print Edit",
    price: "From INR 1,650",
    video: "/video/Untitled-design-1.mp4",
    alt: "Texongo studio fashion story in bold red",
    word: "Bold",
    href: "#new-collection",
    tone: "#f4ddd9",
  },
];

const footerColumns = [
  {
    title: "Brand",
    links: ["Women's wear", "Digital print", "About Texongo"],
  },
  {
    title: "Client service",
    links: ["Contact", "FAQ", "Shipping and returns"],
  },
  {
    title: "Follow us",
    links: ["Instagram", "Pinterest", "WhatsApp"],
  },
];

function MarqueeProductCard({
  name,
  price,
  href,
  image,
}: {
  name: string;
  price: string;
  href: string;
  image: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${styles.productCard} shrink-0 block`}
    >
      <div className={`${styles.productVisual} relative overflow-hidden bg-[#f5f3f0]`}>
        <img
          src={image}
          alt={name}
          loading="lazy"
          decoding="async"
          className={styles.productImage}
        />
        <div className={styles.productInfo}>
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-sm font-semibold text-black uppercase tracking-wide">{name}</h3>
              <p className="mt-0.5 text-xs text-black/60 font-medium">{price}</p>
            </div>
            <span className={styles.addButton}>
              View
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}



function StoryProductCard({
  name,
  price,
  video,
  alt,
  word,
  href,
  tone,
}: {
  name: string;
  price: string;
  video: string;
  alt: string;
  word: string;
  href: string;
  tone: string;
}) {
  return (
    <article className={styles.storyProductCard}>
      <Link
        href={href}
        className={styles.storyProductVisual}
        style={{ backgroundColor: tone }}
      >
        <LazyVideo
          src={video}
          aria-label={alt}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <span className={styles.storyProductWord}>{word}</span>
      </Link>

      <div className={styles.storyProductMeta}>
        <div>
          <h3 className={styles.storyProductName}>{name}</h3>
          <p className={styles.storyProductPrice}>{price}</p>
        </div>
        <Link href={href} className={styles.storyProductButton}>
          SHOP NOW
        </Link>
      </div>
    </article>
  );
}

export function HomeExperience() {
  return (
    <main className="overflow-x-hidden bg-[#f3efe8] text-[#111111]">
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className={styles.heroPanel}>
        <div aria-hidden className={styles.heroGlow} />
        <div className={styles.heroImageWrap}>
          <video
            src="/video/Untitled-design-1-1.mp4"
            autoPlay
            loop
            muted
            playsInline
            className={styles.heroImage}
          />
        </div>

        <div className={styles.heroContent}>
          <header className={styles.heroHeader}>
            <div className={styles.heroBrandGroup}>
              <a href="#category" aria-label="Jump to category section" className={styles.heroMenuButton}>
                <span className={styles.heroMenuLine} />
                <span className={styles.heroMenuLine} />
              </a>

              <Link href="/" className={styles.heroBrand}>
                TEXONGO
              </Link>
            </div>

            <nav className={styles.heroNav} aria-label="Primary navigation">
              <a href="#new-collection" className={styles.heroHeaderLink}>
                Fabrics
              </a>
              <a href="#campaign" className={styles.heroHeaderLink}>
                Womenswear
              </a>
            </nav>

            <div className={styles.heroMeta}>
              <a href="#footer" className={styles.heroHeaderLink}>
                Contact
              </a>
              <a href="#footer" className={styles.heroHeaderLink}>
                About
              </a>
              <a href="#new-collection" className={styles.heroHeaderLink}>
                Catalog
              </a>
            </div>
          </header>

          <div className="mt-10 sm:mt-14">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-white/70">
              Texongo textile studio
            </p>
            <h1 className="sr-only">Fabrics that redefine style and comfort</h1>
          </div>

          <div className={styles.heroActions}>
            <a
              href="#new-collection"
              className="rounded-none bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-white/90"
            >
              Browse fabrics
            </a>
            <a
              href="#campaign"
              className="rounded-none border border-white/25 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10"
            >
              View clothing line
            </a>
          </div>

          <div className={`${styles.heroMarqueeViewport} relative z-10 mt-6 sm:mt-10 opacity-70`}>
            <a href="#new-collection" className={styles.heroMarqueeLink}>
              <div className={styles.heroMarqueeTrack}>
                {Array.from({ length: 4 }).map((_, index) => (
                  <span key={index} className={styles.heroMarqueeItem}>
                    / Fabrics That Redefine Style And Comfort /
                  </span>
                ))}
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* ── NEW ARRIVALS ─────────────────────────────────── */}

      <section
        id="new-collection"
        className={`${styles.arrivalsSection} overflow-hidden bg-white pt-11 pb-5 sm:pt-[3.75rem] sm:pb-9`}
      >
        <div className="w-full">
          <div className={styles.sectionBackdropIntro}>
            <p className={styles.sectionBackdropEyebrowLight}>Newly added</p>
            <ParallaxText className={styles.arrivalsHeading} speed={0.4}>
              fabrics
            </ParallaxText>
          </div>

          <div className={styles.arrivalsBackdropOverlap}>
            <div className={styles.marqueeViewport}>
              <div className={styles.productTrack}>
                {[...marqueeProducts, ...marqueeProducts].map((product, index) => (
                  <MarqueeProductCard
                    key={`${product.name}-${index}`}
                    name={product.name}
                    price={product.price}
                    href={product.href}
                    image={product.image}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="category"
        className={`${styles.categorySection} overflow-hidden bg-[#050505] pt-11 pb-5 text-white sm:pt-[3.75rem] sm:pb-9`}
      >
        <div className={styles.sectionBackdropIntro}>
          <p className={styles.sectionBackdropEyebrowDark}>Browse by</p>
          <ParallaxText className={styles.categoryHeading} speed={0.4}>
            collections
          </ParallaxText>
        </div>

        <CategorySlider />
      </section>

      {/* <section id="campaign" className="bg-[#09c8ef] py-0">
        <div className="mx-auto max-w-480 px-0 sm:px-6 sm:py-4 lg:px-10">
          <div className={`${styles.campaignPanel} ${styles.panelShadow}`}>
            <video
              src="/video/Untitled-design-1-1.mp4"
              autoPlay
              loop
              muted
              playsInline
              className={styles.campaignImage}
              style={{ objectFit: 'cover', width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
            />

            <div aria-hidden className={styles.campaignShade} />

            <div className={styles.campaignContent}>
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-white/72">
                Featured textile story
              </p>

              <div className={styles.campaignMarqueeViewport}>
                <a href="#campaign-story" className={styles.campaignMarqueeLink}>
                  <div className={styles.campaignMarqueeTrack}>
                    {Array.from({ length: 4 }).map((_, index) => (
                      <span key={index} className={styles.campaignMarqueeItem}>
                        Womenswear / Baby Suits / Digital Print /
                      </span>
                    ))}
                  </div>
                </a>
              </div>

              <div className={styles.campaignActionRow}>
                <a href="#campaign-story" className={styles.campaignButton}>
                  Explore the Texongo catalog
                </a>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      <section className="bg-white py-0 overflow-hidden">
        <div className={styles.streamlineGrid}>
          <div className={styles.streamlineVideoWrap}>
            <LazyVideo
              src="/video/efficient_en.webm"
              className={styles.streamlineVideo}
            />
          </div>

          <div className={styles.streamlineContent}>
            <h2 className={styles.streamlineHeading}>
              Streamline<br />Your Fabric<br />Journey
            </h2>
            <p className={styles.streamlineBody}>
              With 3D fabric visualization, your samples come to life digitally—long
              before physical production begins. Preview texture, drape, movement,
              and even micro-texture in stunning detail, ensuring every choice is
              made with absolute clarity. Our intuitive platform lets you compare
              swatches side-by-side, fine-tune colors, and finalize designs with
              confidence. Discover a smarter, faster, and more precise way to source
              fabric—where innovation meets craftsmanship.
            </p>
          </div>
        </div>
      </section>

      <section id="campaign-story" className="bg-[#f7f2eb] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <div className={styles.storyIntro}>
            <p>
              TEXONGO CREATES FABRICS AND CLOTHING THAT BRING TOGETHER
              <span> STYLE AND COMFORT </span>FOR WOMEN&apos;S WEAR, BABY SUITS,
              DIGITAL PRINTS, AND MODERN EVERYDAY COLLECTIONS.
            </p>
          </div>

          <div className={styles.storyProductGrid}>
            {storyProducts.map((product) => (
              <StoryProductCard key={product.name} {...product} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f5f0e8] py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <div id="video-story" className={styles.videoSection}>
            <a href="#video-modal" className={styles.videoPosterLink}>
              <div className={`${styles.videoPosterFrame} ${styles.panelShadow}`}>
                <LazyVideo
                  src="/video/Veo_Prompt_—_TEXONGO_Fabrics_.mp4"
                  className={styles.videoPosterImage}
                  style={{ objectFit: 'cover', width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, transform: 'scale(1.1)' }}
                />
                <div aria-hidden className={styles.videoPosterShade} />
              </div>
            </a>

            <div className={styles.videoCaptionRow}>
              <a href="#video-modal" className={styles.videoCaption}>
                Play the Texongo studio reel
              </a>
            </div>
          </div>

          <div id="video-modal" className={styles.videoModal}>
            <a
              href="#video-story"
              aria-label="Close video preview"
              className={styles.videoModalBackdrop}
            />
            <div className={styles.videoModalPanel}>
              <a href="#video-story" className={styles.videoModalClose}>
                Close
              </a>

              <div className={styles.videoModalVisual}>
                <LazyVideo
                  src="/video/Veo_Prompt_—_TEXONGO_Fabrics_.mp4"
                  className={styles.videoModalImage}
                  style={{ objectFit: 'cover', width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, transform: 'scale(1.15)', pointerEvents: 'none' }}
                />
                <div aria-hidden className={styles.videoModalPulse} />
              </div>

              <div className={styles.videoModalCopy}>
                <p className={styles.videoModalEyebrow}>Texongo fabric story</p>
                <h3 className={styles.videoModalTitle}>Clothing and textile preview</h3>
                <p className={styles.videoModalText}>
                  A quick brand preview focused on fabrics, womenswear, and digital print direction.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className={`${styles.faqSection} overflow-hidden bg-[#f3efe8] pt-11 pb-5 sm:pt-[3.75rem] sm:pb-9`}>
        <div className={styles.sectionBackdropIntro}>
          <p className={styles.sectionBackdropEyebrowLight}>Need help?</p>
          <ParallaxText className={styles.faqHeading} speed={0.4}>
            FAQs
          </ParallaxText>
        </div>
        <FaqSection />
      </section>

      <footer id="footer" className="bg-[#050505] text-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-10">
          <div className={styles.closingVisual}>
            <Image
              src="/hero/hero-fabrics.jpg"
              alt="Texongo premium fabrics featured in the brand panel"
              fill
              sizes="100vw"
              className={styles.closingVisualImage}
            />
          </div>

          <div className={styles.closingBody}>
            <p className={styles.closingEyebrow}>Enter the Texongo world</p>

            <div className={styles.closingWordmark}>
              <span>TEXONGO</span>
              <span>FABRICS</span>
            </div>

            <div className={styles.closingFooterGrid}>
              <div className={styles.closingSignup}>
                <p className={styles.closingSignupCopy}>
                  Get updates on fabric drops, clothing launches, and wholesale offers.
                </p>

                <div className={styles.closingFormRow}>
                  <input
                    type="email"
                    placeholder="Email"
                    className={styles.closingInput}
                    aria-label="Email address"
                  />
                  <button type="button" className={styles.closingButton}>
                    Subscribe
                  </button>
                </div>

                <label className={styles.closingConsent}>
                  <input type="checkbox" />
                  <span>I agree to the Texongo privacy policy.</span>
                </label>
              </div>

              <div className={styles.closingLinksGrid}>
                {footerColumns.map((group) => (
                  <div key={group.title}>
                    <p className={styles.closingLinkTitle}>{group.title}</p>
                    <div className={styles.closingLinkList}>
                      {group.links.map((item) => (
                        <p key={item}>{item}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
