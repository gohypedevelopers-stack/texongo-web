
const domain = '6c1sut-eb.myshopify.com';
const publicAccessToken = 'bfa5b8ee39ed717821bac71ed9286e2b';

async function checkProducts() {
  const query = `
    query {
      products(first: 50) {
        edges {
          node {
            id
            title
            handle
          }
        }
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
      body: JSON.stringify({ query }),
    });

    const result = await response.json();
    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('Error:', error);
  }
}

checkProducts();
