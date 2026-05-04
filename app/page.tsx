import { HomeExperience } from "./home-experience";
import { getShopifyProducts } from "../lib/shopify";

export default async function HomePage() {
  const products = await getShopifyProducts(24);
  return <HomeExperience products={products} />;
}


