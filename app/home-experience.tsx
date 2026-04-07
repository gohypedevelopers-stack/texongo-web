import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

const marqueeProducts = [
  {
    name: "AirWeave Cotton",
    price: "From INR 380 / m",
    tone: "linear-gradient(145deg, #202020 0%, #555555 48%, #0d0d0d 100%)",
  },
  {
    name: "Drape Satin",
    price: "From INR 520 / m",
    tone: "linear-gradient(145deg, #8e6b52 0%, #b8926f 46%, #5c4230 100%)",
  },
  {
    name: "Digital Print Silk",
    price: "From INR 610 / m",
    tone: "linear-gradient(145deg, #efe8df 0%, #d4b38e 52%, #f5eee8 100%)",
  },
  {
    name: "Heritage Twill",
    price: "From INR 440 / m",
    tone: "linear-gradient(145deg, #6b4b31 0%, #9b6c44 48%, #2e1c13 100%)",
  },
  {
    name: "Studio Rib Knit",
    price: "From INR 395 / m",
    tone: "linear-gradient(145deg, #151515 0%, #3c3c3c 50%, #070707 100%)",
  },
];

const categoryCards = [
  {
    title: "Women's Wear",
    label: "Premium line",
    caption: "Modern silhouettes designed in smooth fabrics with elevated comfort.",
    tone: "linear-gradient(145deg, #edf2f3 0%, #b8d5da 54%, #93bfc6 100%)",
    href: "#campaign",
    cta: "View line",
  },
  {
    title: "Baby Suits",
    label: "Soft touch",
    caption: "Gentle textures and breathable fabrics crafted for daily wear.",
    tone: "linear-gradient(145deg, #f8e3df 0%, #e8b0b5 54%, #d68890 100%)",
    href: "#new-collection",
    cta: "Shop now",
  },
  {
    title: "Digital Print",
    label: "Statement surface",
    caption: "Bold textile stories developed for standout seasonal collections.",
    tone: "linear-gradient(145deg, #d4f0c1 0%, #a8d45a 54%, #7f9a31 100%)",
    href: "#campaign",
    cta: "Notify me",
    comingSoon: true,
  },
  {
    title: "Ethnic Fabrics",
    label: "Rich drape",
    caption: "Heritage textures and color depth for occasion and festive wear.",
    tone: "linear-gradient(145deg, #d9ddb6 0%, #aab05c 52%, #7b8136 100%)",
    href: "#new-collection",
    cta: "Discover",
  },
];

const storyProducts = [
  {
    name: "Premium Women's Wear",
    price: "From INR 1,890",
    image: "/hero/hero-model.jpg",
    alt: "Texongo premium womenswear editorial look",
    word: "Soft",
    href: "#new-collection",
    tone: "#dbe8ea",
  },
  {
    name: "Digital Print Edit",
    price: "From INR 1,650",
    image: "/video/video-poster.jpg",
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
  tone,
}: {
  name: string;
  price: string;
  tone: string;
}) {
  return (
    <article
      className={`${styles.productCard} shrink-0 rounded-none border border-black/6 bg-white`}
    >
      <div className={`${styles.productVisual} relative overflow-hidden rounded-none bg-[#ece9e4]`}>
        <div className={styles.fabricSwatch} style={{ background: tone }}>
          <div aria-hidden className={styles.fabricWeave} />
        </div>

        <div className={styles.productInfo}>
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-base font-semibold text-black">{name}</h3>
              <p className="mt-1 text-sm text-black/62">{price}</p>
            </div>
            <button className={styles.addButton} type="button">
              Add
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

function CategoryCard({
  title,
  label,
  caption,
  tone,
  href,
  cta,
  comingSoon,
}: {
  title: string;
  label: string;
  caption: string;
  tone: string;
  href: string;
  cta: string;
  comingSoon?: boolean;
}) {
  return (
    <Link href={href} className={styles.categoryCard}>
      <div className={styles.categoryFabricBackdrop} style={{ background: tone }}>
        <div aria-hidden className={styles.categoryFabricGlow} />
      </div>

      <div aria-hidden className={styles.categoryCardShade} />

      <div className={styles.categoryCardLabel}>{label}</div>

      {comingSoon ? <div className={styles.categoryCardSoon}>Coming soon</div> : null}

      <div className={styles.categoryCardInfo}>
        <div>
          <h3 className={styles.categoryCardTitle}>{title}</h3>
          <p className={styles.categoryCardCaption}>{caption}</p>
        </div>

        <span
          className={comingSoon ? styles.categoryCardButtonMuted : styles.categoryCardButton}
        >
          {cta}
        </span>
      </div>
    </Link>
  );
}

function StoryProductCard({
  name,
  price,
  image,
  alt,
  word,
  href,
  tone,
}: {
  name: string;
  price: string;
  image: string;
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
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(max-width: 640px) 100vw, 50vw"
          className={styles.storyProductImage}
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
      <section className="bg-[#d2e7ea]">
        <div className="mx-auto max-w-7xl px-0 sm:px-6 sm:py-4 lg:px-10">
          <div className={`${styles.heroPanel} relative overflow-hidden rounded-none  shadow-sm`}>
            <div aria-hidden className={styles.heroGlow} />
            <div className={styles.heroImageWrap}>
              <Image
                src="/hero/hero-model.jpg"
                alt="Woman featured in the new collection campaign"
                fill
                priority
                sizes="(max-width: 640px) 52vw, (max-width: 1024px) 32vw, 22rem"
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
          </div>
        </div>
      </section>

      <section id="new-collection" className="overflow-hidden bg-white py-10 sm:py-14">
        <div className="mx-auto max-w-[120rem]">
          <div className="px-4 sm:px-6 lg:px-10">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-black/35">
              Newly added
            </p>
          </div>

          <div className="relative mt-2 overflow-hidden">
            <h2 className={styles.arrivalsHeading}>
              fabrics
            </h2>

            <div className={`${styles.marqueeViewport} -mt-1 sm:-mt-3`}>
              <div className={styles.productTrack}>
                {[...marqueeProducts, ...marqueeProducts].map((product, index) => (
                  <MarqueeProductCard
                    key={`${product.name}-${index}`}
                    name={product.name}
                    price={product.price}
                    tone={product.tone}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="category" className="overflow-hidden bg-[#050505] py-16 text-white sm:py-20">
        <div className="mx-auto max-w-[120rem] px-4 sm:px-6 lg:px-10">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-white/42">
            Browse by
          </p>

          <div className="relative mt-4">
            <h2 className={styles.categoryHeading}>collections</h2>

            <div className={styles.categoryGrid}>
              {categoryCards.map((card) => (
                <CategoryCard key={card.title} {...card} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="campaign" className="bg-[#09c8ef] py-0">
        <div className="mx-auto max-w-[120rem] px-0 sm:px-6 sm:py-4 lg:px-10">
          <div className={`${styles.campaignPanel} ${styles.panelShadow}`}>
            <Image
              src="/campaign/campaign-aqua.jpg"
              alt="Woman relaxing on a yellow float in a blue pool for the summer campaign"
              fill
              sizes="100vw"
              className={styles.campaignImage}
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
                <Image
                  src="/video/video-poster.jpg"
                  alt="Texongo studio clothing campaign in a red set"
                  fill
                  sizes="100vw"
                  className={styles.videoPosterImage}
                />
                <div aria-hidden className={styles.videoPosterShade} />
                <span aria-hidden className={styles.videoPlayButton}>
                  <span className={styles.videoPlayTriangle} />
                </span>
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
                <Image
                  src="/video/video-poster.jpg"
                  alt="Texongo fabric and clothing campaign poster"
                  fill
                  sizes="(max-width: 1024px) 92vw, 72vw"
                  className={styles.videoModalImage}
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

      <footer id="footer" className="bg-[#050505] text-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-10">
          <div className={styles.closingVisual}>
            <Image
              src="/hero/hero-model.jpg"
              alt="Model featured in the closing Texongo brand panel"
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
