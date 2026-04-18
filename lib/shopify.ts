import { createStorefrontApiClient } from '@shopify/storefront-api-client';

const domain = process.env.SHOPIFY_STORE_DOMAIN || '';
const publicAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || '';

export const storefrontClient = createStorefrontApiClient({
  storeDomain: domain,
  apiVersion: '2026-04',
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
      `https://${domain}/api/2026-04/graphql.json`,
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

// Example query to get products
export const PRODUCTS_QUERY = `
  query getProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
          images(first: 1) {
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
        }
      }
    }
  }
`;

// Interface for our local fabric data
export interface Fabric {
  id: string;
  sku: string;
  name: string;
  price: string;
  gsm: string;
  image: string;
  composition: string;
  width: string;
  description: string;
}

// Helper to map Shopify node to Fabric interface
export function mapShopifyProduct(node: any): Fabric {
  return {
    id: node.handle, // Use handle as ID for SEO-friendly URLs
    sku: node.id.split('/').pop() || '', 
    name: node.title,
    price: node.priceRange?.minVariantPrice?.amount || '0',
    gsm: node.metafields?.find((m: any) => m?.key === 'gsm')?.value || '200', 
    image: node.images?.edges?.[0]?.node?.url || '',
    composition: node.metafields?.find((m: any) => m?.key === 'composition')?.value || 'N/A',
    width: node.metafields?.find((m: any) => m?.key === 'width')?.value || 'N/A',
    description: node.description || '',
  };
}

export async function getShopifyProducts(limit: number = 10): Promise<Fabric[]> {
  const query = PRODUCTS_QUERY;
  const response = await shopifyFetch<any>({
    query,
    variables: { first: limit },
  });

  if (!response.data || !response.data.products) {
    return [];
  }

  return response.data.products.edges.map(({ node }: any) => mapShopifyProduct(node));
}

export const PRODUCT_BY_HANDLE_QUERY = `
  query getProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      title
      handle
      description
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
      metafields(identifiers: [{namespace: "custom", key: "gsm"}, {namespace: "custom", key: "composition"}, {namespace: "custom", key: "width"}]) {
        key
        value
      }
    }
  }
`;

export async function getShopifyProduct(handle: string): Promise<Fabric | null> {
  const response = await shopifyFetch<any>({
    query: PRODUCT_BY_HANDLE_QUERY,
    variables: { handle },
  });

  if (!response.data || !response.data.product) {
    return null;
  }

  return mapShopifyProduct(response.data.product);
}
