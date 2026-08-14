import { HomeExperience } from "./home-experience";
import { getShopifyProducts, getShopifyArticles } from "../lib/shopify";

export default async function HomePage() {
  const products = await getShopifyProducts(100);
  const articles = await getShopifyArticles(3);

  const blogs = articles.map(article => ({
    title: article.title,
    image: article.image || "/fabric-bg-clean.png",
    category: "Insights",
    link: `/blog/${article.blogHandle}/${article.handle}`
  }));

  return <HomeExperience products={products} blogs={blogs} />;
}
