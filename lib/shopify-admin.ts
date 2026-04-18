import '@shopify/shopify-api/adapters/node';
import { shopifyApi, ApiVersion, Session } from '@shopify/shopify-api';

const shopify = shopifyApi({
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_API_SECRET || '',
  scopes: ['read_products', 'write_products', 'read_orders'],
  hostName: process.env.SHOPIFY_STORE_DOMAIN || '',
  apiVersion: ApiVersion.April26,
  isEmbeddedApp: false,
});

export const shopifyAdmin = shopify;

export async function getAdminSession() {
  // This is for a custom app with an access token
  const session = shopify.session.customAppSession(process.env.SHOPIFY_STORE_DOMAIN!);
  // Note: customAppSession doesn't actually take the token here, 
  // you usually use the client directly with the token for private sessions.
  return session;
}

export async function fetchAdminProducts() {
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
