async function test() {
  try {
    const res = await fetch('http://localhost:3000/api/shopify/products');
    const data = await res.json();
    console.log("SUCCESS FETCHING PRODUCTS:", data.data?.products?.edges?.length);
    if (data.data?.products?.edges) {
      const sample = data.data.products.edges.slice(0, 5).map(e => ({
        title: e.node.title,
        imageCount: e.node.images?.edges?.length,
        firstImageUrl: e.node.images?.edges?.[0]?.node?.url
      }));
      console.log("Sample Products:", JSON.stringify(sample, null, 2));
    } else {
      console.log("No products data structure:", data);
    }
  } catch (err) {
    console.error("ERROR FETCHING PRODUCTS:", err);
  }
}

test();
