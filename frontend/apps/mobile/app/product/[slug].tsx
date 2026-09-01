import { useState } from 'react';
import {
  ScrollView, Text, View, Image, Pressable, FlatList, ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ShoppingCart, Heart, Star } from 'lucide-react-native';
import { useProduct } from '@/features/products/hooks/useProducts';
import { useAddToCart } from '@/features/cart/hooks/useCart';
import { formatPrice, calculateDiscount } from '@zavora/utils';
import type { ProductVariant } from '@zavora/types';

export default function ProductScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const router = useRouter();
  const { data: product, isLoading } = useProduct(slug);
  const addToCart = useAddToCart();

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator color="#F97316" />
      </View>
    );
  }

  if (!product) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-slate-400">Product not found.</Text>
      </View>
    );
  }

  const discount = product.compareAtPrice
    ? calculateDiscount(product.price, product.compareAtPrice)
    : 0;

  const handleAddToCart = () => {
    addToCart.mutate(
      { productId: product.id, variantId: selectedVariant?.id, quantity },
      { onSuccess: () => router.push('/cart') }
    );
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Main image */}
        <View className="relative aspect-square bg-slate-100">
          {product.images[activeImage] ? (
            <Image
              source={{ uri: product.images[activeImage].url }}
              className="h-full w-full"
              resizeMode="cover"
            />
          ) : (
            <View className="flex-1 items-center justify-center">
              <Text className="text-6xl">📦</Text>
            </View>
          )}
          {discount > 0 && (
            <View className="absolute left-3 top-3 rounded-full bg-red-500 px-2 py-0.5">
              <Text className="text-xs font-bold text-white">-{discount}%</Text>
            </View>
          )}
        </View>

        {/* Thumbnail strip */}
        {product.images.length > 1 && (
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={product.images}
            keyExtractor={(img) => String(img.id)}
            contentContainerStyle={{ padding: 12, gap: 8 }}
            renderItem={({ item, index }) => (
              <Pressable onPress={() => setActiveImage(index)}>
                <Image
                  source={{ uri: item.url }}
                  className={`h-14 w-14 rounded-xl border-2 ${
                    index === activeImage ? 'border-primary' : 'border-transparent'
                  }`}
                  resizeMode="cover"
                />
              </Pressable>
            )}
          />
        )}

        <View className="px-4 pb-32">
          {/* Title */}
          <Text className="text-xs text-slate-400">{product.category.name}</Text>
          <Text className="mt-1 text-xl font-bold text-slate-900">{product.name}</Text>
          {product.brand && (
            <Text className="mt-0.5 text-sm text-slate-500">Brand: {product.brand}</Text>
          )}

          {/* Rating */}
          {product.reviewCount > 0 && (
            <View className="mt-2 flex-row items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  color="#F59E0B"
                  fill={i < Math.round(product.rating) ? '#F59E0B' : 'transparent'}
                />
              ))}
              <Text className="ml-1 text-xs text-slate-500">({product.reviewCount})</Text>
            </View>
          )}

          {/* Price */}
          <View className="mt-3 flex-row items-baseline gap-2">
            <Text className="text-2xl font-bold text-slate-900">{formatPrice(product.price)}</Text>
            {product.compareAtPrice && (
              <Text className="text-base text-slate-400 line-through">
                {formatPrice(product.compareAtPrice)}
              </Text>
            )}
          </View>

          {/* Variants */}
          {product.variants.length > 0 && (
            <View className="mt-4">
              <Text className="mb-2 text-sm font-semibold text-slate-700">Options</Text>
              <View className="flex-row flex-wrap gap-2">
                {product.variants.map((v) => (
                  <Pressable
                    key={v.id}
                    onPress={() => setSelectedVariant(v)}
                    className={`rounded-xl border px-3 py-2 ${
                      selectedVariant?.id === v.id
                        ? 'border-primary bg-orange-50'
                        : 'border-slate-200'
                    }`}
                  >
                    <Text
                      className={`text-sm ${
                        selectedVariant?.id === v.id ? 'text-primary font-medium' : 'text-slate-700'
                      }`}
                    >
                      {v.name}: {v.value}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
          )}

          {/* Quantity */}
          <View className="mt-4 flex-row items-center gap-3">
            <Text className="text-sm font-semibold text-slate-700">Qty</Text>
            <View className="flex-row items-center rounded-xl border border-slate-200">
              <Pressable
                onPress={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-4 py-2"
              >
                <Text className="text-lg text-slate-600">−</Text>
              </Pressable>
              <Text className="w-8 text-center font-medium">{quantity}</Text>
              <Pressable
                onPress={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                className="px-4 py-2"
              >
                <Text className="text-lg text-slate-600">+</Text>
              </Pressable>
            </View>
            <Text className="text-xs text-slate-400">{product.stock} in stock</Text>
          </View>

          {/* Seller */}
          <View className="mt-4 rounded-xl border border-slate-200 p-3">
            <Text className="text-xs text-slate-400">Sold by</Text>
            <Text className="font-medium text-slate-800">{product.seller.storeName}</Text>
          </View>

          {/* Description */}
          <View className="mt-4">
            <Text className="mb-1 font-semibold text-slate-900">Description</Text>
            <Text className="text-sm leading-relaxed text-slate-600">{product.description}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Sticky bottom bar */}
      <View className="absolute bottom-0 left-0 right-0 flex-row gap-3 border-t border-slate-200 bg-white px-4 pb-8 pt-3">
        <Pressable className="items-center justify-center rounded-2xl border border-slate-300 p-3">
          <Heart size={20} color="#64748B" />
        </Pressable>
        <Pressable
          onPress={handleAddToCart}
          disabled={!product.isAvailable || addToCart.isPending}
          className="flex-1 flex-row items-center justify-center gap-2 rounded-2xl bg-primary py-4 disabled:opacity-50"
        >
          <ShoppingCart size={18} color="white" />
          <Text className="font-bold text-white">
            {product.isAvailable ? 'Add to Cart' : 'Out of Stock'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
