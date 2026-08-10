const domain = "6c1sut-eb.myshopify.com";
const token = "bfa5b8ee39ed717821bac71ed9286e2b";

const query = `
  query getProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          title
          productType
          metafields(identifiers: [
            {namespace: "custom", key: "composition"},
            {namespace: "custom", key: "content"},
            {namespace: "custom", key: "fabric"}
          ]) {
            key
            value
          }
        }
      }
    }
  }
`;

async function checkProducts() {
  const response = await fetch(`https://${domain}/api/2025-01/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': token,
    },
    body: JSON.stringify({ query, variables: { first: 250 } })
  });

  const { data } = await response.json();
  const values = { composition: new Set(), content: new Set(), fabric: new Set(), productType: new Set() };

  for (const edge of data.products.edges) {
    const p = edge.node;
    if (p.productType) values.productType.add(p.productType);
    
    const metafields = p.metafields.filter(m => m !== null);
    for (const meta of metafields) {
      if (meta.value) values[meta.key].add(meta.value);
    }
  }

  console.log("=== COMPOSITION ===");
  console.log(Array.from(values.composition));
  
  console.log("\n=== CONTENT ===");
  console.log(Array.from(values.content));
  
  console.log("\n=== FABRIC ===");
  console.log(Array.from(values.fabric));

  console.log("\n=== PRODUCT TYPE ===");
  console.log(Array.from(values.productType));
}

checkProducts();
