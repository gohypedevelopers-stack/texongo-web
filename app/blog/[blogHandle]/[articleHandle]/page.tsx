import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getShopifyArticle, getShopifyArticles } from "../../../../lib/shopify";
import { BlogCard } from "../../../../components/ui/blog-card";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ blogHandle: string; articleHandle: string }>;
}): Promise<Metadata> {
  const { blogHandle, articleHandle } = await params;
  const article = await getShopifyArticle(blogHandle, articleHandle);

  if (!article) return { title: "Article Not Found" };

  return {
    title: article.seo?.title || article.title,
    description: article.seo?.description || article.excerpt || article.title,
    openGraph: {
      images: article.image ? [article.image.url] : [],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ blogHandle: string; articleHandle: string }>;
}) {
  const { blogHandle, articleHandle } = await params;
  const article = await getShopifyArticle(blogHandle, articleHandle);

  if (!article) {
    notFound();
  }

  // Fetch related articles (for simplicity, just get recent ones excluding current)
  const allArticles = await getShopifyArticles(4);
  const relatedArticles = allArticles
    .filter(a => a.handle !== articleHandle)
    .slice(0, 3);


  const readingTime = article.metafields?.find((m: any) => m?.key === 'reading_time')?.value;
  const subtitle = article.metafields?.find((m: any) => m?.key === 'subtitle')?.value;

  const formattedDate = new Date(article.publishedAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <main className="min-h-screen bg-white pb-24 pt-24 md:pt-28">
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 mt-6">
        <header className="mb-12">
          <h1 className="text-2xl md:text-4xl lg:text-[42px] font-bold text-[#121212] leading-[1.2] mb-6 uppercase tracking-tight">
            {article.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-[11px] font-medium uppercase tracking-[0.2em] text-gray-400">
            <div className="flex items-center gap-2">
              <span className="text-[#121212]">Posted on</span>
              <span>{formattedDate}</span>
            </div>
            {readingTime && (
              <div className="flex items-center gap-2 border-l border-gray-200 pl-6">
                <span className="text-[#121212]">Estimate</span>
                <span>{readingTime}</span>
              </div>
            )}
            <div className="flex items-center gap-2 border-l border-gray-200 pl-6">
              <span className="text-[#121212]">By</span>
              <span>{article.authorV2?.name || "Texongo"}</span>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {article.image && (
          <div className="relative aspect-[21/9] mb-16 rounded-sm overflow-hidden bg-gray-50 group">
            <Image
              src={article.image.url}
              alt={article.image.altText || article.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
            />
          </div>
        )}

        {/* Article Content */}
        <div 
          className="blog-content-v3"
          dangerouslySetInnerHTML={{ __html: article.contentHtml }}
        />

        {/* Tags Section */}
        {article.tags && article.tags.length > 0 && (
          <div className="mt-20 pt-10 border-t border-gray-100 flex flex-wrap items-center gap-6">
            <span className="text-[11px] font-medium uppercase tracking-widest text-[#121212]">Filed Under:</span>
            <div className="flex flex-wrap gap-3">
              {article.tags.map((tag: string) => (
                <Link 
                  key={tag} 
                  href={`/blog/tag/${tag}`}
                  className="px-6 py-3 bg-gray-50 text-[11px] font-bold text-gray-500 hover:bg-[#57AD43] hover:text-white transition-all rounded-sm"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>

    </main>
  );
}




