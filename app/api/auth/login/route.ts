import { NextResponse } from "next/server";
import crypto from "crypto";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");
  
  const host = request.headers.get("host") || "";
  const isVercel = host.includes("vercel.app");
  
  // Choose redirect URI based on environment (Vercel vs localhost)
  const appUrl = isVercel 
    ? "https://texongo-web.vercel.app" 
    : (process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000");
    
  const redirectUri = `${appUrl}/api/auth/callback`;
  
  const client_id = process.env.NEXT_PUBLIC_SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID || "01d4f605-18ed-45c5-bea3-eeb30b6f48b7";
  const shop_id = process.env.NEXT_PUBLIC_SHOPIFY_CUSTOMER_ACCOUNT_SHOP_ID || "98366849388";
  
  // PKCE Generation
  const codeVerifier = crypto.randomBytes(32).toString('hex');
  const codeChallenge = crypto
    .createHash('sha256')
    .update(codeVerifier)
    .digest('base64url');
    
  const state = crypto.randomBytes(16).toString('hex');
  
  // Store verifier in secure cookies
  const cookieStore = await cookies();
  cookieStore.set("shopify_code_verifier", codeVerifier, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 3600, // 1 hour
  });
  
  cookieStore.set("shopify_auth_state", state, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 3600,
  });

  const authorizeUrl = new URL(`https://shopify.com/authentication/${shop_id}/oauth/authorize`);
  authorizeUrl.searchParams.set("client_id", client_id);
  authorizeUrl.searchParams.set("scope", "openid email customer-account-api:full");
  authorizeUrl.searchParams.set("redirect_uri", redirectUri);
  authorizeUrl.searchParams.set("response_type", "code");
  authorizeUrl.searchParams.set("code_challenge", codeChallenge);
  authorizeUrl.searchParams.set("code_challenge_method", "S256");
  authorizeUrl.searchParams.set("state", state);

  // Pre-fill the email address on Shopify's login screen if provided in storefront form
  if (email) {
    authorizeUrl.searchParams.set("login_hint", email);
  }

  return NextResponse.redirect(authorizeUrl.toString());
}
