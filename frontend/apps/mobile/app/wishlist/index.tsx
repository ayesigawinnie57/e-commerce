import { FlatList, Image, Pressable, Text, View, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Trash2 } from 'lucide-react-native';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { wishlistApi } from '@zavora/api';
import { formatPrice } from '@zavora/utils';

export default function WishlistScreen() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: wishlist, isLoading } = useQuery({
    queryKey: ['wishlist'],
    queryFn: wishlistApi.get,
  });

  const removeItem = useMutation({
    mutationFn: (itemId: number) => wishlistApi.removeItem(itemId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['wishlist'] }),
  });

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-slate-50">
        <ActivityIndicator color="#F97316" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <View className="bg-white px-4 pb-3 pt-4">
        <Text className="text-xl font-bold text-slate-900">
          Wishlist {wishlist?.items.length ? `(${wishlist.items.length})` : ''}
        </Text>
      </View>
      <FlatList
        data={wishlist?.items ?? []}
        keyExtractor={(item) => String(item.id)}
        numColumns={2}
        contentContainerStyle={{ padding: 12, gap: 12 }}
        columnWrapperStyle={{ gap: 12 }}
        ListEmptyComponent={
          <View className="items-center py-16">
            <Text className="text-5xl">❤️</Text>
            <Text className="mt-4 text-sm text-slate-400">Your wishlist is empty.</Text>
          </View>
        }
        renderItem={({ item }) => (
          <Pressable
            onPress={() => router.push(`/product/${item.product.slug}`)}
            className="flex-1 overflow-hidden rounded-2xl border border-slate-200 bg-white"
          >
            <View className="relative aspect-square bg-slate-100">
              {item.product.primaryImage ? (
                <Image
                  source={{ uri: item.product.primaryImage.url }}
                  className="h-full w-full"
                  resizeMode="cover"
                />
              ) : (
                <View className="flex-1 items-center justify-center">
                  <Text className="text-4xl">📦</Text>
                </View>
              )}
              <Pressable
                onPress={() => removeItem.mutate(item.id)}
                className="absolute right-2 top-2 rounded-full bg-white p-1.5 shadow"
              >
                <Trash2 size={14} color="#EF4444" />
              </Pressable>
            </View>
            <View className="gap-1 p-2">
              <Text className="text-xs font-medium text-slate-800" numberOfLines={2}>
                {item.product.name}
              </Text>
              <Text className="text-sm font-bold text-slate-900">{formatPrice(item.product.price)}</Text>
            </View>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}
