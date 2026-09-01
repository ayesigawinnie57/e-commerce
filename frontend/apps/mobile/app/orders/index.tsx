import { FlatList, Pressable, Text, View, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useOrders } from '@/features/orders/hooks/useOrders';
import { formatPrice, formatDate } from '@zavora/utils';
import type { OrderStatus } from '@zavora/types';

const STATUS_COLOR: Record<OrderStatus, string> = {
  pending: 'bg-amber-100 text-amber-700',
  confirmed: 'bg-blue-100 text-blue-700',
  processing: 'bg-blue-100 text-blue-700',
  shipped: 'bg-indigo-100 text-indigo-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
  refunded: 'bg-slate-100 text-slate-700',
};

export default function OrdersScreen() {
  const router = useRouter();
  const { data, isLoading } = useOrders();

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
        <Text className="text-xl font-bold text-slate-900">My Orders</Text>
      </View>
      <FlatList
        data={data?.results ?? []}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={{ padding: 12, gap: 10 }}
        ListEmptyComponent={
          <View className="items-center py-16">
            <Text className="text-5xl">📦</Text>
            <Text className="mt-4 text-sm text-slate-400">No orders yet.</Text>
          </View>
        }
        renderItem={({ item }) => (
          <Pressable
            onPress={() => router.push(`/orders/${item.id}`)}
            className="flex-row items-center justify-between rounded-2xl border border-slate-200 bg-white p-4"
          >
            <View className="gap-1">
              <Text className="font-semibold text-slate-900">#{item.orderNumber}</Text>
              <Text className="text-xs text-slate-400">{formatDate(item.createdAt)}</Text>
              <Text className="text-xs text-slate-500">{item.items.length} item(s)</Text>
            </View>
            <View className="items-end gap-2">
              <View className={`rounded-full px-3 py-1 ${STATUS_COLOR[item.status]}`}>
                <Text className="text-xs font-semibold capitalize">{item.status}</Text>
              </View>
              <Text className="font-bold text-slate-900">{formatPrice(item.total)}</Text>
            </View>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}
