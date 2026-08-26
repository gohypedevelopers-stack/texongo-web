async function run() {
  const q = 'query { products(first: 5, query: "title:*Jacquard*") { edges { node { images(first: 1) { edges { node { url } } } } } } }';
  const res = await fetch('https://6c1sut-eb.myshopify.com/api/2025-01/graphql.json', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Shopify-Storefront-Access-Token': 'bfa5b8ee39ed717821bac71ed9286e2b' },
    body: JSON.stringify({ query: q })
  });
  console.log(JSON.stringify(await res.json(), null, 2));
}
run();
