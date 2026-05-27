import { HomeExperience } from "./home-experience";
import { getShopifyProducts } from "../lib/shopify";

export default async function HomePage() {
  const products = await getShopifyProducts(100);
  return <HomeExperience products={products} />;
}


