import { useState, useEffect } from 'react';
import { View, TextInput, Text, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import { productsApi } from '@zavora/api';
import { ProductCard } from '@/components/product/ProductCard';
import { SEARCH_DEBOUNCE_MS } from '@zavora/config';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query), SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(t);
  }, [query]);

  const { data, isLoading } = useQuery({
    queryKey: ['search', debouncedQuery],
    queryFn: () => productsApi.search(debouncedQuery),
    enabled: debouncedQuery.length > 1,
  });

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <View className="bg-white px-4 pb-3 pt-4">
        <TextInput
          autoFocus={false}
          value={query}
          onChangeText={setQuery}
          placeholder="Search products…"
          placeholderTextColor="#94A3B8"
          className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900"
        />
      </View>

      {isLoading && debouncedQuery.length > 1 ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator color="#F97316" />
        </View>
      ) : (
        <FlatList
          data={data?.results ?? []}
          keyExtractor={(item) => String(item.id)}
          numColumns={2}
          contentContainerStyle={{ padding: 12, gap: 12 }}
          columnWrapperStyle={{ gap: 12 }}
          ListEmptyComponent={
            debouncedQuery.length > 1 ? (
              <View className="items-center py-16">
                <Text className="text-slate-400">No results for "{debouncedQuery}"</Text>
              </View>
            ) : (
              <View className="items-center py-16">
                <Text className="text-slate-400">Start typing to search</Text>
              </View>
            )
          }
          renderItem={({ item }) => <ProductCard product={item} />}
        />
      )}
    </SafeAreaView>
  );
}
