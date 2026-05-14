import { NextResponse } from 'next/server';
import { shopifyFetch, PRODUCTS_QUERY } from '@/lib/shopify';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    let allProducts: any[] = [];
    let hasNextPage = true;
    let cursor = null;

    // Fetch in chunks of 250 (Shopify max)
    while (hasNextPage && allProducts.length < 1000) {
      const response: any = await shopifyFetch({
        query: `
          query getProducts($first: Int!, $after: String) {
            products(first: $first, after: $after) {
              pageInfo {
                hasNextPage
                endCursor
              }
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
                  variants(first: 1) {
                    nodes {
                      id
                      sku
                      selectedOptions {
                        name
                        value
                      }
                    }
                  }
                  metafields(identifiers: [
                    {namespace: "custom", key: "gsm"},
                    {namespace: "custom", key: "shade"},
                    {namespace: "shopify", key: "color"},
                    {namespace: "standard", key: "color"},
                    {namespace: "custom", key: "width"},
                    {namespace: "custom", key: "composition"},
                    {namespace: "custom", key: "knit_style"},
                    {namespace: "custom", key: "usage"}
                  ]) {
                    namespace
                    key
                    value
                    reference {
                      ... on Metaobject {
                        fields {
                          key
                          value
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        `,
        variables: { first: 250, after: cursor },
      });

      const products = response.data?.products;
      if (!products) break;

      allProducts = [...allProducts, ...products.edges];
      hasNextPage = products.pageInfo.hasNextPage;
      cursor = products.pageInfo.endCursor;

      if (!hasNextPage) break;
    }

    return NextResponse.json({
      data: {
        products: {
          edges: allProducts
        }
      }
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products from Shopify' },
      { status: 500 }
    );
  }
}
