import { FlatList, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { categoriesApi } from '@zavora/api';

export default function CategoriesScreen() {
  const router = useRouter();
  const { data: categories, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: categoriesApi.list,
  });

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <View className="bg-white px-4 pb-3 pt-4">
        <Text className="text-xl font-bold text-slate-900">Categories</Text>
      </View>
      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-slate-400">Loading…</Text>
        </View>
      ) : (
        <FlatList
          data={categories}
          keyExtractor={(item) => String(item.id)}
          numColumns={2}
          contentContainerStyle={{ padding: 12, gap: 12 }}
          columnWrapperStyle={{ gap: 12 }}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => router.push(`/search?category=${item.slug}`)}
              className="flex-1 items-center rounded-2xl border border-slate-200 bg-white py-6"
            >
              <Text className="text-4xl">🏷️</Text>
              <Text className="mt-2 text-sm font-medium text-slate-800">{item.name}</Text>
              {item.productCount !== undefined && (
                <Text className="text-xs text-slate-400">{item.productCount} products</Text>
              )}
            </Pressable>
          )}
        />
      )}
    </SafeAreaView>
  );
}
