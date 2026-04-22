import { createStorefrontApiClient } from '@shopify/storefront-api-client';

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || process.env.SHOPIFY_STORE_DOMAIN || '';
const publicAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || '';

const API_VERSION = '2025-01';

export const storefrontClient = (domain && publicAccessToken)
  ? createStorefrontApiClient({
    storeDomain: domain,
    apiVersion: API_VERSION,
    publicAccessToken: publicAccessToken,
  })
  : null;

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

  const variantInventory = node.variants?.edges?.reduce((acc: number, edge: any) => {
    return acc + (edge.node.quantityAvailable || 0);
  }, 0);

  const qtyMeta = getMeta('qty');
  const totalInventory = (variantInventory && variantInventory > 0)
    ? variantInventory
    : (typeof node.totalInventory === 'number' && node.totalInventory > 0
      ? node.totalInventory
      : (qtyMeta !== 'N/A' ? parseInt(qtyMeta) : 0));
  const firstVariant = node.variants?.edges?.[0]?.node;
  const weight = firstVariant?.weight ? `${firstVariant.weight} ${firstVariant.weightUnit || 'kg'}` : undefined;

  const allImages = node.images?.edges?.map((e: any) => e.node.url) || [];

  const fabricMeta = getMeta('fabric');
  const typeMeta = getMeta('type');

  const selectedOptions = firstVariant?.selectedOptions || [];
  const colorOption = selectedOptions.find((opt: any) =>
    opt.name.toLowerCase() === 'color' || opt.name.toLowerCase() === 'shade'
  );

  const colorMeta = metafields.find((m: any) =>
    (m?.namespace === 'shopify' && m?.key === 'color') ||
    (m?.namespace === 'standard' && m?.key === 'color') ||
    m?.key?.toLowerCase() === 'color'
  );

  const metafieldColor = (() => {
    if (!colorMeta) return undefined;
    if (colorMeta.reference?.fields) {
      const labelField = colorMeta.reference.fields.find((f: any) =>
        ['label', 'name', 'display_name', 'title'].includes(f.key.toLowerCase())
      );
      return labelField?.value || colorMeta.reference.fields[0]?.value;
    }
    return colorMeta.value;
  })();

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
    knit_style: getMeta('knit_style'),
    shade: (() => {
      const base = colorOption?.value || metafieldColor || getMeta('shade');
      if (base && base.startsWith('{')) {
        try { return JSON.parse(base).label || base; } catch (e) { return base; }
      }
      return base;
    })(),
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
      totalInventory
      variants(first: 10) {
        edges {
          node {
            sku
            quantityAvailable
            weight
            weightUnit
            selectedOptions {
              name
              value
            }
          }
        }
      }
      metafields(identifiers: [
        {namespace: "custom", key: "fabric"},
        {namespace: "custom", key: "content"},
        {namespace: "custom", key: "gsm"},
        {namespace: "custom", key: "ounce"},
        {namespace: "custom", key: "width"},
        {namespace: "shopify", key: "color"},
        {namespace: "standard", key: "color"},
        {namespace: "custom", key: "color"},
        {namespace: "custom", key: "knit_style"},
        {namespace: "custom", key: "shade"},
        {namespace: "custom", key: "usage"},
        {namespace: "custom", key: "type"}
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
`;

export const FILE_BY_NAME_QUERY = `
  query getFileByName($query: String!) {
    files(first: 1, query: $query) {
      edges {
        node {
          ... on Video {
            id
            sources {
              url
              format
              mimeType
            }
          }
          ... on GenericFile {
            id
            url
          }
        }
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

/**
 * Fetches a video CDN URL from Shopify by its Filename.
 */
export async function getShopifyVideoUrl(fileName: string): Promise<string | null> {
  try {
    if (/^\d+$/.test(fileName)) {
      return getShopifyVideoUrlById(fileName);
    }

    const cleanName = fileName.replace(/\.[^/.]+$/, "");

    const response = await shopifyFetch<any>({
      query: FILE_BY_NAME_QUERY,
      variables: { query: `filename:${cleanName}` },
    });

    const fileNode = response.data?.files?.edges?.[0]?.node;
    if (!fileNode) return null;

    if (fileNode.sources) {
      const mp4Source = fileNode.sources
        .filter((s: any) => s.mimeType === 'video/mp4')
        .sort((a: any) => a.url.includes('1080p') ? -1 : 1)[0];

      return mp4Source?.url || fileNode.sources[0].url;
    }

    return (fileNode as any).url || null;
  } catch (error) {
    console.error("Error fetching Shopify video URL:", error);
    return null;
  }
}

/**
 * Fetches a video CDN URL from Shopify by its numerical ID or GID.
 */
export async function getShopifyVideoUrlById(id: string): Promise<string | null> {
  try {
    const gid = id.startsWith('gid://') ? id : `gid://shopify/Video/${id}`;

    const response = await shopifyFetch<any>({
      query: `
        query getFileById($id: ID!) {
          node(id: $id) {
            ... on Video {
              id
              sources {
                url
                mimeType
              }
            }
          }
        }
      `,
      variables: { id: gid },
    });

    const fileNode = response.data?.node;
    if (!fileNode) return null;

    if (fileNode.sources) {
      const mp4Source = fileNode.sources
        .filter((s: any) => s.mimeType === 'video/mp4')
        .sort((a: any) => a.url.includes('1080p') ? -1 : 1)[0];

      return mp4Source?.url || fileNode.sources[0].url;
    }

    return null;
  } catch (error) {
    console.error("Error fetching Shopify video by ID:", error);
    return null;
  }
}
