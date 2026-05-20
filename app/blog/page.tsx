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
      <section className="pt-24 pb-12 md:pt-32 md:pb-16 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 text-center space-y-4">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#57AD43] block">Latest Insights</span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-[#121212]">
            Our Blog
          </h1>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto mt-6">
            Discover the latest trends, insights, and stories from the world of fabrics and fashion.
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

