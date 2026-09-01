import { Image, Pressable, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Star } from 'lucide-react-native';
import type { ProductListItem } from '@zavora/types';
import { formatPrice, calculateDiscount } from '@zavora/utils';

export function ProductCard({ product }: { product: ProductListItem }) {
  const router = useRouter();
  const discount = product.compareAtPrice
    ? calculateDiscount(product.price, product.compareAtPrice)
    : 0;

  return (
    <Pressable
      onPress={() => router.push(`/product/${product.slug}`)}
      className="flex-1 overflow-hidden rounded-2xl border border-slate-200 bg-white"
    >
      <View className="relative aspect-square bg-slate-100">
        {product.primaryImage ? (
          <Image
            source={{ uri: product.primaryImage.url }}
            className="h-full w-full"
            resizeMode="cover"
          />
        ) : (
          <View className="flex-1 items-center justify-center">
            <Text className="text-4xl">📦</Text>
          </View>
        )}
        {discount > 0 && (
          <View className="absolute left-2 top-2 rounded-full bg-red-500 px-2 py-0.5">
            <Text className="text-[10px] font-bold text-white">-{discount}%</Text>
          </View>
        )}
        {!product.isAvailable && (
          <View className="absolute inset-0 items-center justify-center bg-white/70">
            <Text className="text-xs font-semibold text-slate-500">Out of stock</Text>
          </View>
        )}
      </View>

      <View className="gap-1 p-2">
        <Text className="text-xs font-medium text-slate-800" numberOfLines={2}>
          {product.name}
        </Text>
        <Text className="text-[10px] text-slate-400">{product.seller.storeName}</Text>
        <View className="flex-row items-center justify-between">
          <Text className="text-sm font-bold text-slate-900">{formatPrice(product.price)}</Text>
          {product.reviewCount > 0 && (
            <View className="flex-row items-center gap-0.5">
              <Star size={10} color="#F59E0B" fill="#F59E0B" />
              <Text className="text-[10px] text-amber-500">{product.rating.toFixed(1)}</Text>
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
}
