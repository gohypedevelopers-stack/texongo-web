import { BlogCard } from "../../components/ui/blog-card";
import { getShopifyArticles } from "../../lib/shopify";

export default async function BlogListingPage() {
  const articles = await getShopifyArticles(12);

  const blogPosts = articles.map(article => ({
    title: article.title,
    date: new Date(article.publishedAt).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }),
    excerpt: article.excerpt || "Read our latest insights on fashion and textiles...",
    image: article.image || "/fabric-bg-clean.png",
    href: `/blog/${article.blogHandle}/${article.handle}`
  }));

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
        {blogPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
            {blogPosts.map((post, idx) => (
              <BlogCard
                key={`${post.title}-${idx}`}
                {...post}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500">No blog posts found.</p>
          </div>
        )}
      </section>
    </main>
  );
}

