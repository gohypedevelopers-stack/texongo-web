import { NextResponse } from 'next/server';
import { getShopifyProduct } from '@/lib/shopify';

export const dynamic = 'force-dynamic';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ handle: string }> }
) {
  const { handle } = await params;

  try {
    const product = await getShopifyProduct(handle);

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch product from Shopify' },
      { status: 500 }
    );
  }
}
