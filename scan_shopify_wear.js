
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
          priceRange {
            minVariantPrice {
              amount
            }
          }
          images(first: 1) {
            edges {
              node {
                url
              }
            }
          }
          metafields(identifiers: [
            {namespace: "custom", key: "usage"},
            {namespace: "custom", key: "fabric"},
            {namespace: "custom", key: "composition"}
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

  let mens = [];
  let womens = [];

  const menKeywords = [
    "cargo", "hoodie", "hoodies", "coord", "coords", "tshirt", "t-shirt", "jogger", "joggers",
    "loungewear", "polo", "polos", "sweatshirt", "sweatshirts", "men", "mens", "boy", "boys"
  ];
  
  const womenKeywords = [
    "tshirt", "t-shirt", "top", "tops", "athleisure", "coord", "coords", "dress", "dresses", "hoodie",
    "hoodies", "jumpsuit", "jumpsuits", "lining", "polo", "polos", "scarf", "scarves", "skirt", "skirts",
    "sweatshirt", "sweatshirts", "women", "womens", "girl", "girls"
  ];

  for (const edge of data.products.edges) {
    const p = edge.node;
    const metafields = p.metafields.filter(m => m !== null);
    
    let usage = metafields.find(m => m.key === "usage")?.value || "";
    let fabric = metafields.find(m => m.key === "fabric")?.value || "";
    let composition = metafields.find(m => m.key === "composition")?.value || "";
    let type = p.productType || "";
    let name = p.title || "";
    
    const searchStr = `${usage} ${fabric} ${composition} ${type} ${name}`.toLowerCase();
    
    // Check women
    if (womenKeywords.some(keyword => searchStr.includes(keyword)) && womens.length < 5) {
      womens.push({
        name: p.title,
        price: `₹${parseFloat(p.priceRange.minVariantPrice.amount).toFixed(2)}`,
        image: p.images.edges[0]?.node?.url || "",
        href: `/product/${p.handle}`
      });
    }
    
    // Check men
    if (menKeywords.some(keyword => searchStr.includes(keyword)) && mens.length < 5) {
      // Simple heuristic to not duplicate exactly
      if (!womens.find(w => w.name === p.title)) {
        mens.push({
          name: p.title,
          price: `₹${parseFloat(p.priceRange.minVariantPrice.amount).toFixed(2)}`,
          image: p.images.edges[0]?.node?.url || "",
          href: `/product/${p.handle}`
        });
      }
    }
  }

  console.log("=== WOMENS WEAR ===");
  console.log(JSON.stringify(womens, null, 2));
  
  console.log("\n=== MENS WEAR ===");
  console.log(JSON.stringify(mens, null, 2));
}

checkProducts();
