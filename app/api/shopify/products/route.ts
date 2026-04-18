import { NextResponse } from 'next/server';
import { shopifyFetch, PRODUCTS_QUERY } from '@/lib/shopify';

export async function GET() {
  try {
    const response = await shopifyFetch({
      query: PRODUCTS_QUERY,
      variables: { first: 10 },
    });

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch products from Shopify' },
      { status: 500 }
    );
  }
}
