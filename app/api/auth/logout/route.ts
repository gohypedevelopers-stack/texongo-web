import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const cookieStore = await cookies();
  const idToken = cookieStore.get("shopify_id_token")?.value;
  
  cookieStore.delete("shopify_customer_token");
  cookieStore.delete("shopify_id_token");
  cookieStore.delete("shopify_code_verifier");
  cookieStore.delete("shopify_auth_state");
  
  const host = request.headers.get("host") || "";
  const isVercel = host.includes("vercel.app");
  const appUrl = isVercel 
    ? "https://texongo-web.vercel.app" 
    : (process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000");
    
  const shop_id = process.env.NEXT_PUBLIC_SHOPIFY_CUSTOMER_ACCOUNT_SHOP_ID || "98366849388";
  const client_id = process.env.NEXT_PUBLIC_SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID || "01d4f605-18ed-45c5-bea3-eeb30b6f48b7";
  
  // Redirect to Shopify's logout endpoint with id_token_hint to terminate session
  let logoutUrl = `https://shopify.com/authentication/${shop_id}/logout?client_id=${client_id}&post_logout_redirect_uri=${encodeURIComponent(appUrl)}`;
  if (idToken) {
    logoutUrl += `&id_token_hint=${encodeURIComponent(idToken)}`;
  }
  
  return NextResponse.redirect(logoutUrl);
}
