'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { useProduct, useRelatedProducts } from '@/features/products/hooks/useProducts';
import { useAddToCart } from '@/features/cart/hooks/useCart';
import { useUIStore } from '@/store/ui';
import { Button } from '@/components/ui/Button';
import { Badge, Skeleton } from '@/components/ui';
import { ProductGrid } from '@/components/product/ProductGrid';
import { formatPrice, calculateDiscount } from '@zavora/utils';
import type { ProductVariant } from '@zavora/types';

export function ProductDetailView({ slug }: { slug: string }) {
  const { data: product, isLoading } = useProduct(slug);
  const { data: related } = useRelatedProducts(slug);
  const addToCart = useAddToCart();
  const { openCart } = useUIStore();

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  if (isLoading) {
    return (
      <div className="container-page py-8">
        <div className="grid gap-8 md:grid-cols-2">
          <Skeleton className="aspect-square w-full rounded-xl" />
          <div className="flex flex-col gap-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-24 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container-page py-16 text-center text-slate-400">
        <p>Product not found.</p>
      </div>
    );
  }

  const discount = product.compareAtPrice
    ? calculateDiscount(product.price, product.compareAtPrice)
    : 0;

  const handleAddToCart = () => {
    addToCart.mutate(
      { productId: product.id, variantId: selectedVariant?.id, quantity },
      { onSuccess: openCart }
    );
  };

  return (
    <div className="container-page py-8">
      <div className="grid gap-8 md:grid-cols-2">
        {/* Images */}
        <div className="flex flex-col gap-3">
          <div className="relative aspect-square overflow-hidden rounded-xl bg-slate-100">
            {product.images[activeImage] && (
              <Image
                src={product.images[activeImage].url}
                alt={product.images[activeImage].alt ?? product.name}
                fill
                className="object-cover"
                priority
              />
            )}
            {discount > 0 && (
              <Badge variant="error" className="absolute left-3 top-3 text-sm">
                -{discount}%
              </Badge>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {product.images.map((img, i) => (
                <button
                  key={img.id}
                  onClick={() => setActiveImage(i)}
                  className={`relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border-2 ${
                    i === activeImage ? 'border-primary' : 'border-transparent'
                  }`}
                >
                  <Image src={img.url} alt={img.alt ?? ''} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-sm text-slate-400">{product.category.name}</p>
            <h1 className="mt-1 text-2xl font-bold text-slate-900">{product.name}</h1>
            {product.brand && <p className="text-sm text-slate-500">Brand: {product.brand}</p>}
          </div>

          {product.reviewCount > 0 && (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5 text-amber-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < Math.round(product.rating) ? 'fill-current' : 'text-slate-300'}`}
                  />
                ))}
              </div>
              <span className="text-sm text-slate-500">({product.reviewCount} reviews)</span>
            </div>
          )}

          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-slate-900">{formatPrice(product.price)}</span>
            {product.compareAtPrice && (
              <span className="text-lg text-slate-400 line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>

          {product.variants.length > 0 && (
            <div>
              <p className="mb-2 text-sm font-medium text-slate-700">Options</p>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariant(v)}
                    className={`rounded-lg border px-3 py-1.5 text-sm transition-colors ${
                      selectedVariant?.id === v.id
                        ? 'border-primary bg-orange-50 text-primary'
                        : 'border-slate-300 hover:border-primary'
                    }`}
                  >
                    {v.name}: {v.value}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center gap-3">
            <p className="text-sm font-medium text-slate-700">Quantity</p>
            <div className="flex items-center gap-2 rounded-lg border border-slate-300">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 py-2 hover:bg-slate-50"
              >
                −
              </button>
              <span className="w-8 text-center text-sm font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                className="px-3 py-2 hover:bg-slate-50"
              >
                +
              </button>
            </div>
            <span className="text-xs text-slate-400">{product.stock} in stock</span>
          </div>

          <div className="flex gap-3">
            <Button
              size="lg"
              className="flex-1"
              onClick={handleAddToCart}
              loading={addToCart.isPending}
              disabled={!product.isAvailable}
            >
              <ShoppingCart className="h-5 w-5" />
              {product.isAvailable ? 'Add to Cart' : 'Out of Stock'}
            </Button>
            <Button size="lg" variant="outline">
              <Heart className="h-5 w-5" />
            </Button>
          </div>

          <div className="rounded-lg border border-slate-200 p-3">
            <p className="text-xs text-slate-400">Sold by</p>
            <p className="font-medium text-slate-800">{product.seller.storeName}</p>
          </div>

          <div>
            <p className="mb-2 font-medium text-slate-900">Description</p>
            <p className="text-sm leading-relaxed text-slate-600">{product.description}</p>
          </div>
        </div>
      </div>

      {related && related.length > 0 && (
        <div className="mt-16">
          <h2 className="mb-6 text-xl font-bold text-slate-900">Related Products</h2>
          <ProductGrid products={related} />
        </div>
      )}
    </div>
  );
}
