import { createStorefrontApiClient } from '@shopify/storefront-api-client';

const domain = process.env.SHOPIFY_STORE_DOMAIN || '';
const publicAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || '';

const API_VERSION = '2025-01'; 

export const storefrontClient = createStorefrontApiClient({
  storeDomain: domain,
  apiVersion: API_VERSION,
  publicAccessToken: publicAccessToken,
});

export async function shopifyFetch<T>({
  query,
  variables = {},
}: {
  query: string;
  variables?: any;
}): Promise<{ data: T } | never> {
  try {
    const response = await fetch(
      `https://${domain}/api/${API_VERSION}/graphql.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': publicAccessToken,
        },
        body: JSON.stringify({ query, variables }),
      }
    );

    if (!response.ok) {
      throw new Error(`Shopify API error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching from Shopify:', error);
    throw error;
  }
}

export const PRODUCTS_QUERY = `
  query getProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
          productType
          images(first: 5) {
            edges {
              node {
                url
                altText
              }
            }
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          metafields(identifiers: [{namespace: "custom", key: "gsm"}]) {
            key
            value
          }
        }
      }
    }
  }
`;

export interface Fabric {
  id: string;
  sku: string;
  name: string;
  price: string;
  gsm: string;
  image: string;
  images: string[];
  composition: string;
  width: string;
  description: string;
  fabric?: string;
  content?: string;
  ounce?: string;
  qty?: string;
  knit_style?: string;
  shade?: string;
  usage?: string;
  type?: string;
  totalInventory?: number;
  weight?: string;
}

export function mapShopifyProduct(node: any): Fabric {
  if (!node) return {} as Fabric;
  
  const metafields = Array.isArray(node.metafields) ? node.metafields : [];

  const getMeta = (key: string) => {
    const m = metafields.find((m: any) => m?.key?.toLowerCase() === key.toLowerCase());
    return m?.value || 'N/A';
  };

  const totalInventory = node.variants?.edges?.reduce((acc: number, edge: any) => {
    return acc + (edge.node.quantityAvailable || 0);
  }, 0);
  const firstVariant = node.variants?.edges?.[0]?.node;
  const weight = firstVariant?.weight ? `${firstVariant.weight} ${firstVariant.weightUnit || 'kg'}` : undefined;

  const allImages = node.images?.edges?.map((e: any) => e.node.url) || [];

  // Logic: If 'fabric' metafield is N/A but 'type' metafield has a value, use 'type' for fabric.
  const fabricMeta = getMeta('fabric');
  const typeMeta = getMeta('type');
  
  return {
    id: node.handle || '',
    sku: firstVariant?.sku || node.id?.split('/').pop() || '',
    name: node.title || '',
    price: node.priceRange?.minVariantPrice?.amount || '0',
    gsm: getMeta('gsm'),
    image: allImages[0] || '',
    images: allImages,
    composition: getMeta('composition'),
    width: getMeta('width'),
    description: node.description || '',
    fabric: fabricMeta !== 'N/A' ? fabricMeta : (typeMeta !== 'N/A' ? typeMeta : 'N/A'),
    content: getMeta('content'),
    ounce: getMeta('ounce'),
    qty: getMeta('qty') !== 'N/A' ? getMeta('qty') : undefined,
    knit_style: getMeta('knit_style'),
    shade: getMeta('shade'),
    usage: getMeta('usage'),
    type: node.productType || 'N/A',
    totalInventory: typeof totalInventory === 'number' ? totalInventory : undefined,
    weight
  };
}

export async function getShopifyProducts(limit: number = 20): Promise<Fabric[]> {
  try {
    const response = await shopifyFetch<any>({
      query: PRODUCTS_QUERY,
      variables: { first: limit },
    });

    if (!response.data || !response.data.products) {
      return [];
    }

    return response.data.products.edges.map(({ node }: any) => mapShopifyProduct(node));
  } catch (err) {
    return [];
  }
}

export const PRODUCT_BY_HANDLE_QUERY = `
  query getProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      title
      handle
      description
      productType
      images(first: 10) {
        edges {
          node {
            url
            altText
          }
        }
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      variants(first: 10) {
        edges {
          node {
            sku
            quantityAvailable
            weight
            weightUnit
          }
        }
      }
      metafields(identifiers: [
        {namespace: "custom", key: "fabric"},
        {namespace: "custom", key: "content"},
        {namespace: "custom", key: "gsm"},
        {namespace: "custom", key: "ounce"},
        {namespace: "custom", key: "width"},
        {namespace: "custom", key: "qty"},
        {namespace: "custom", key: "knit_style"},
        {namespace: "custom", key: "shade"},
        {namespace: "custom", key: "usage"},
        {namespace: "custom", key: "type"}
      ]) {
        key
        value
      }
    }
  }
`;

export async function getShopifyProduct(handle: string): Promise<Fabric | null> {
  try {
    const response = await shopifyFetch<any>({
      query: PRODUCT_BY_HANDLE_QUERY,
      variables: { handle },
    });

    if (response.data?.product) {
      return mapShopifyProduct(response.data.product);
    }

    const all = await getShopifyProducts(50);
    return all.find(p => p.id === handle) || null;
  } catch (err) {
    return null;
  }
}
