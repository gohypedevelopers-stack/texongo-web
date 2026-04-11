"use client";

import { BlogCard } from "../../components/ui/blog-card";

const blogPosts = [
  {
    title: "Trump's Trade Policies: Impact on Fashion Imports and Exports",
    date: "February 24, 2026",
    excerpt: "As the world of international trade continues to evolve, the impact of political and economic decisions becomes ever more significant. One of the most notable...",
    image: "/category/fabric-rib.png",
    href: "/blog/trumps-trade-policies"
  },
  {
    title: "Behind the Scenes at Texongo: A Day in the Life",
    date: "February 7, 2026",
    excerpt: "Welcome to Texongo! Ever wondered what it's like to be part of our innovative team? Join us as we take you behind the scenes for...",
    image: "/category/fabric-pique.png",
    href: "/blog/behind-the-scenes"
  },
  {
    title: "Cross-Cultural Collaborations in the Digital Fashion Space: How India and Global Designers Are Merging Traditions with Digital Innovation",
    date: "February 6, 2026",
    excerpt: "The fashion industry is undergoing a profound transformation, propelled by technological advancements and the global interconnectedness of creative communities. One of the most exciting developments...",
    image: "/fabric-bg-clean.png",
    href: "/blog/cross-cultural-collaborations"
  },
  {
    title: "Exploring the Summer 2026 Trends: A Deep Dive Into the World of Knit Fabrics",
    date: "February 6, 2026",
    excerpt: "Introduction: As the fashion landscape evolves with each passing season, knit fabrics continue to captivate designers and consumers alike with their versatility, comfort, and style.",
    image: "/category/fabric-french-terry.png",
    href: "/blog/summer-2026-trends"
  },
  {
    title: "The Fusion of Traditional Indian Textiles with Digital Fashion: A Technological Revolution or Cultural Appropriation?",
    date: "February 6, 2026",
    excerpt: "The intersection of technology and fashion has given rise to a new frontier: digital fashion. With advancements in 3D modeling, augmented reality (AR), and virtual...",
    image: "/arrivals/prod-poly-viscose-spandex.png",
    href: "/blog/digital-fashion-fusion"
  },
  {
    title: "Transform your Design with our stock fabrics",
    date: "February 6, 2026",
    excerpt: "Introduction: In the world of fashion design, the choice of fabric plays a pivotal role in bringing a designer's vision to life. Whether you're creating...",
    image: "/category/lime-slides.jpg",
    href: "/blog/stock-fabrics-design"
  },
  {
    title: "The Unrivaled Reign of Cotton Textiles in India's Domestic Market by Texongo",
    date: "February 6, 2026",
    excerpt: "In the vibrant tapestry of India's textile industry, one fabric stands out as the unrivaled king – cotton. With its rich history, versatile applications, and...",
    image: "/arrivals/prod-cotton-spandex-interlock.png",
    href: "/blog/cotton-textiles-reign"
  },
  {
    title: "Shifting U.S.-India Trade Relations and the Future of Fashion Collaboration",
    date: "February 6, 2026",
    excerpt: "The landscape of global trade is ever-changing, and one of the most exciting and promising developments in recent years has been the evolving relationship between...",
    image: "/arrivals/prod-nylon-spandex.png",
    href: "/blog/us-india-trade-relations"
  },
  {
    title: "CRAFTING SUSTAINABILITY: ECO-FRIENDLY KNITS THROUGH SUSTAINABLE PRACTISES",
    date: "February 6, 2026",
    excerpt: "Introduction: In a world where environmental consciousness is increasingly becoming a priority, the fashion industry is undergoing a transformative shift towards sustainability (As consumers become...",
    image: "/category/fabric-single-jersey.png",
    href: "/blog/crafting-sustainability"
  }
];

export default function BlogListingPage() {
  return (
    <main className="min-h-screen bg-white">

      {/* Hero Banner Section (Subtitle/Breadcrumb Feel) */}
      <section className="py-20 bg-gray-50 border-b border-gray-100">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 text-center">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-[#121212]">
            Our Blog
          </h1>
          <p className="mt-6 text-sm font-bold text-gray-400 uppercase tracking-widest">
            Latest Industry Insights & Textile Innovation
          </p>
        </div>
      </section>

      {/* Blog Grid Section */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-10 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
          {blogPosts.map((post, idx) => (
            <BlogCard 
              key={`${post.title}-${idx}`}
              {...post}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
