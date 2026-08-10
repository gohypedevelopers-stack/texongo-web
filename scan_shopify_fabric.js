
const domain = "6c1sut-eb.myshopify.com";
const token = "bfa5b8ee39ed717821bac71ed9286e2b";

const query = `
  query getProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          title
          handle
          productType
          metafields(identifiers: [
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
  const fabrics = new Set();
  const examples = {};

  for (const edge of data.products.edges) {
    const p = edge.node;
    const metafields = p.metafields.filter(m => m !== null);
    
    let fabric = metafields.find(m => m.key === "fabric")?.value || "";
    if (fabric) {
      fabrics.add(fabric);
      if (!examples[fabric]) {
        examples[fabric] = p.title;
      }
    }
  }

  console.log("=== UNIQUE FABRIC FIELDS ===");
  console.log(Array.from(fabrics));
  
  console.log("\n=== EXAMPLES ===");
  console.log(JSON.stringify(examples, null, 2));
}

checkProducts();
