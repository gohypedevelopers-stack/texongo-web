import '@shopify/shopify-api/adapters/node';
import { shopifyApi, ApiVersion, Session } from '@shopify/shopify-api';

const isBuild = process.env.NODE_ENV === 'production' && !process.env.SHOPIFY_API_KEY;

const shopify = !isBuild ? shopifyApi({
  apiKey: process.env.SHOPIFY_API_KEY || 'temp',
  apiSecretKey: process.env.SHOPIFY_API_SECRET || 'temp',
  scopes: ['read_products', 'write_products', 'read_orders'],
  hostName: process.env.SHOPIFY_STORE_DOMAIN || 'localhost',
  apiVersion: ApiVersion.April26,
  isEmbeddedApp: false,
}) : null;

export const shopifyAdmin = shopify!;

export async function getAdminSession() {
  const session = shopify?.session.customAppSession(process.env.SHOPIFY_STORE_DOMAIN || 'localhost');
  return session;
}

export async function fetchAdminProducts() {
  if (!shopify) return null;
  
  const client = new shopify.clients.Rest({
    session: {
      shop: process.env.SHOPIFY_STORE_DOMAIN!,
      accessToken: process.env.SHOPIFY_ADMIN_ACCESS_TOKEN!,
    } as any,
  });

  const response = await client.get({
    path: 'products',
  });

  return response.body;
}
