import { ScrollView, Text, View, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import { useOrder } from '@/features/orders/hooks/useOrders';
import { formatPrice, formatDate } from '@zavora/utils';
import type { OrderStatus } from '@zavora/types';

const STATUS_COLOR: Record<OrderStatus, string> = {
  pending: 'bg-amber-100 text-amber-700',
  confirmed: 'bg-blue-100 text-blue-700',
  processing: 'bg-blue-100 text-blue-700',
  shipped: 'bg-blue-100 text-blue-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
  refunded: 'bg-slate-100 text-slate-700',
};

export default function OrderDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: order, isLoading } = useOrder(Number(id));

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator color="#F97316" />
      </SafeAreaView>
    );
  }

  if (!order) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <Text className="text-slate-400">Order not found.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-slate-50" edges={['bottom']}>
      <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
        <View className="flex-row items-center justify-between rounded-2xl border border-slate-200 bg-white p-4">
          <View>
            <Text className="font-bold text-slate-900">#{order.orderNumber}</Text>
            <Text className="text-xs text-slate-400">{formatDate(order.createdAt)}</Text>
          </View>
          <View className={`rounded-full px-3 py-1 ${STATUS_COLOR[order.status]}`}>
            <Text className="text-xs font-semibold capitalize">{order.status}</Text>
          </View>
        </View>

        <View className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          {order.items.map((item, i) => (
            <View
              key={item.id}
              className={`flex-row gap-3 p-3 ${i < order.items.length - 1 ? 'border-b border-slate-100' : ''}`}
            >
              {item.product.primaryImage ? (
                <Image
                  source={{ uri: item.product.primaryImage.url }}
                  className="h-14 w-14 rounded-xl"
                  resizeMode="cover"
                />
              ) : (
                <View className="h-14 w-14 items-center justify-center rounded-xl bg-slate-100">
                  <Text className="text-2xl">📦</Text>
                </View>
              )}
              <View className="flex-1 justify-between">
                <Text className="text-sm font-medium text-slate-800" numberOfLines={2}>
                  {item.product.name}
                </Text>
                <View className="flex-row justify-between">
                  <Text className="text-xs text-slate-400">Qty: {item.quantity}</Text>
                  <Text className="text-sm font-semibold">{formatPrice(item.totalPrice)}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        <View className="rounded-2xl border border-slate-200 bg-white p-4">
          <Text className="mb-2 font-semibold text-slate-900">Delivery Address</Text>
          <Text className="text-sm text-slate-600">
            {order.shippingAddress.firstName} {order.shippingAddress.lastName}
          </Text>
          <Text className="text-sm text-slate-500">{order.shippingAddress.addressLine1}</Text>
          <Text className="text-sm text-slate-500">
            {order.shippingAddress.city}, {order.shippingAddress.state}
          </Text>
          <Text className="text-sm text-slate-500">{order.shippingAddress.phone}</Text>
        </View>

        <View className="gap-2 rounded-2xl border border-slate-200 bg-white p-4">
          <View className="flex-row justify-between">
            <Text className="text-sm text-slate-500">Subtotal</Text>
            <Text className="text-sm">{formatPrice(order.subtotal)}</Text>
          </View>
          {parseFloat(order.discount) > 0 && (
            <View className="flex-row justify-between">
              <Text className="text-sm text-green-600">Discount</Text>
              <Text className="text-sm text-green-600">-{formatPrice(order.discount)}</Text>
            </View>
          )}
          <View className="flex-row justify-between">
            <Text className="text-sm text-slate-500">Delivery</Text>
            <Text className="text-sm">{formatPrice(order.deliveryFee)}</Text>
          </View>
          <View className="flex-row justify-between border-t border-slate-100 pt-2">
            <Text className="font-bold text-slate-900">Total</Text>
            <Text className="font-bold text-slate-900">{formatPrice(order.total)}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
