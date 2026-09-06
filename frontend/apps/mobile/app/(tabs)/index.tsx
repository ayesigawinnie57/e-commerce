import { ScrollView, Text, View, Pressable, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { categoriesApi } from '@zavora/api';
import { useFeaturedProducts } from '@/features/products/hooks/useProducts';
import { ProductCard } from '@/components/product/ProductCard';
import { APP_NAME } from '@zavora/config';

export default function HomeScreen() {
  const router = useRouter();
  const { data: categories } = useQuery({ queryKey: ['categories'], queryFn: categoriesApi.list });
  const { data: featured, isLoading } = useFeaturedProducts();

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="bg-white px-4 pb-4 pt-4">
          <Text className="text-2xl font-bold text-slate-900">{APP_NAME}</Text>
          <Pressable
            onPress={() => router.push('/search')}
            className="mt-3 flex-row items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
          >
            <Text className="text-sm text-slate-400">Search products…</Text>
          </Pressable>
        </View>

        {/* Hero banner */}
        <View className="mx-4 mt-4 rounded-2xl bg-orange-500 p-6">
          <Text className="text-2xl font-bold text-white">Shop Everything{'\n'}You Need</Text>
          <Pressable
            onPress={() => router.push('/search')}
            className="mt-4 self-start rounded-xl bg-white px-5 py-2"
          >
            <Text className="font-semibold text-orange-500">Shop Now</Text>
          </Pressable>
        </View>

        {/* Categories */}
        {categories && categories.length > 0 && (
          <View className="mt-6 px-4">
            <Text className="mb-3 text-lg font-bold text-slate-900">Categories</Text>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={categories.slice(0, 8)}
              keyExtractor={(item) => String(item.id)}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => router.push(`/search?category=${item.slug}`)}
                  className="mr-3 items-center rounded-xl border border-slate-200 bg-white px-4 py-3"
                >
                  <Text className="text-2xl">🏷️</Text>
                  <Text className="mt-1 text-xs font-medium text-slate-700">{item.name}</Text>
                </Pressable>
              )}
            />
          </View>
        )}

        {/* Featured products */}
        <View className="mt-6 px-4 pb-8">
          <Text className="mb-3 text-lg font-bold text-slate-900">Featured Products</Text>
          {isLoading ? (
            <View className="h-48 items-center justify-center">
              <Text className="text-slate-400">Loading…</Text>
            </View>
          ) : (
            <View className="flex-row flex-wrap gap-3">
              {featured?.map((product) => (
                <View key={product.id} className="w-[47%]">
                  <ProductCard product={product} />
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
