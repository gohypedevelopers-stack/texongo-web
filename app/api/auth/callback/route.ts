import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  
  const cookieStore = await cookies();
  const savedState = cookieStore.get("shopify_auth_state")?.value;
  const codeVerifier = cookieStore.get("shopify_code_verifier")?.value;
  
  if (!code || !state || state !== savedState || !codeVerifier) {
    console.error("Auth mismatch or missing info:", { code: !!code, state: !!state, savedState: !!savedState, codeVerifier: !!codeVerifier });
    return NextResponse.json({ error: "Invalid state, code, or verifier" }, { status: 400 });
  }
  
  const host = request.headers.get("host") || "";
  const isVercel = host.includes("vercel.app");
  const appUrl = isVercel 
    ? "https://texongo-web.vercel.app" 
    : (process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000");
    
  const redirectUri = `${appUrl}/api/auth/callback`;
  const client_id = process.env.NEXT_PUBLIC_SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID || "01d4f605-18ed-45c5-bea3-eeb30b6f48b7";
  const shop_id = process.env.NEXT_PUBLIC_SHOPIFY_CUSTOMER_ACCOUNT_SHOP_ID || "98366849388";
  
  try {
    // Exchange Authorization Code for Access Token
    const params = new URLSearchParams();
    params.append("grant_type", "authorization_code");
    params.append("client_id", client_id);
    params.append("redirect_uri", redirectUri);
    params.append("code", code);
    params.append("code_verifier", codeVerifier);
    
    const tokenResponse = await fetch(`https://shopify.com/authentication/${shop_id}/oauth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });
    
    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error("Token exchange failed:", errorText);
      return NextResponse.json({ error: "Token exchange failed", details: errorText }, { status: 500 });
    }
    
    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;
    const idToken = tokenData.id_token;
    
    // Decode ID token to get user info (it's a JWT)
    let email = "";
    let name = "Shopify Member";
    if (idToken) {
      try {
        const payloadBase64 = idToken.split(".")[1];
        const decodedPayload = JSON.parse(Buffer.from(payloadBase64, "base64").toString("utf-8"));
        email = decodedPayload.email || "";
        
        const firstName = decodedPayload.given_name || "";
        const lastName = decodedPayload.family_name || "";
        const fullName = decodedPayload.name || "";
        
        if (fullName) {
          name = fullName;
        } else if (firstName || lastName) {
          name = `${firstName} ${lastName}`.trim();
        } else if (email) {
          name = email.split("@")[0];
        } else {
          name = "Shopify Member";
        }
      } catch (err) {
        console.error("Failed to decode ID token:", err);
      }
    }
    
    // Save the Access Token in a secure HTTP-Only cookie
    cookieStore.set("shopify_customer_token", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: tokenData.expires_in || 7200, // default 2 hours or what Shopify returns
    });
    
    // Save the ID Token in a secure HTTP-Only cookie to use as id_token_hint during logout
    if (idToken) {
      cookieStore.set("shopify_id_token", idToken, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
        maxAge: tokenData.expires_in || 7200,
      });
    }
    
    // Clean up temporary authorization cookies
    cookieStore.delete("shopify_code_verifier");
    cookieStore.delete("shopify_auth_state");
    
    // Redirect to the orders page with query parameters to sync Zustand store client-side
    const responseUrl = `${appUrl}/orders?login_success=true&email=${encodeURIComponent(email)}&name=${encodeURIComponent(name)}`;
    return NextResponse.redirect(responseUrl);
  } catch (error: any) {
    console.error("Callback error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
