
const domain = '6c1sut-eb.myshopify.com';
const publicAccessToken = 'bfa5b8ee39ed717821bac71ed9286e2b';

async function checkHandle(handle) {
  const query = `
    query getProduct($handle: String!) {
      product(handle: $handle) {
        id
        title
        handle
      }
    }
  `;

  try {
    const response = await fetch(`https://${domain}/api/2025-01/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': publicAccessToken,
      },
      body: JSON.stringify({ query, variables: { handle } }),
    });

    const result = await response.json();
    console.log(`Result for ${handle}:`, JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('Error:', error);
  }
}

checkHandle('go-hype-fabric');
