import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("shopify_customer_token")?.value;
  
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  const shop_id = process.env.NEXT_PUBLIC_SHOPIFY_CUSTOMER_ACCOUNT_SHOP_ID || "98366849388";
  
  const query = `
    query {
      customer {
        orders(first: 10) {
          edges {
            node {
              id
              name
              processedAt
              totalPrice {
                amount
                currencyCode
              }
              financialStatus
              fulfillmentStatus
              lineItems(first: 5) {
                edges {
                  node {
                    id
                    title
                    quantity
                    price {
                      amount
                    }
                    image {
                      url
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;
  
  try {
    const response = await fetch(`https://shopify.com/${shop_id}/account/api/2024-04/graphql.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token,
      },
      body: JSON.stringify({ query }),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Shopify Customer API failed:", errorText);
      return NextResponse.json({ error: "Failed to fetch orders from Shopify" }, { status: response.status });
    }
    
    const result = await response.json();
    
    if (result.errors) {
      console.error("GraphQL errors:", result.errors);
      return NextResponse.json({ error: "GraphQL query failed", details: result.errors }, { status: 400 });
    }
    
    if (!result.data || !result.data.customer) {
      return NextResponse.json({ orders: [] });
    }
    
    const orders = result.data.customer.orders.edges.map(({ node }: any) => ({
      id: node.name || node.id,
      date: node.processedAt.split("T")[0],
      total: parseFloat(node.totalPrice.amount),
      status: node.fulfillmentStatus === "FULFILLED" ? "Delivered" : "Processing",
      items: node.lineItems.edges.map(({ node: item }: any) => ({
        id: item.id,
        name: item.title,
        price: parseFloat(item.price.amount),
        image: item.image?.url || "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=800",
        gsm: "N/A",
        quantity: item.quantity,
      })),
    }));
    
    return NextResponse.json({ orders });
  } catch (error: any) {
    console.error("Get orders error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
