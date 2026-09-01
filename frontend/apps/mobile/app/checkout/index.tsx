import { useState } from 'react';
import { ScrollView, Text, View, Pressable, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { addressesApi, deliveryApi } from '@zavora/api';
import { useCartQuery } from '@/features/cart/hooks/useCart';
import { useCreateOrder } from '@/features/orders/hooks/useOrders';
import { formatPrice } from '@zavora/utils';

export default function CheckoutScreen() {
  const router = useRouter();
  const { data: cart } = useCartQuery();
  const { data: addresses, isLoading: loadingAddresses } = useQuery({
    queryKey: ['addresses'],
    queryFn: addressesApi.list,
  });
  const { data: deliveryMethods } = useQuery({
    queryKey: ['delivery-methods'],
    queryFn: deliveryApi.methods,
  });
  const createOrder = useCreateOrder();

  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
  const [selectedDeliveryId, setSelectedDeliveryId] = useState<number | null>(null);
  const [step, setStep] = useState(0);

  const handlePlaceOrder = () => {
    if (!selectedAddressId || !selectedDeliveryId) return;
    createOrder.mutate(
      { addressId: selectedAddressId, deliveryMethodId: selectedDeliveryId },
      { onSuccess: (order) => router.replace(`/orders/${order.id}`) }
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50" edges={['bottom']}>
      <ScrollView contentContainerStyle={{ padding: 16, gap: 16, paddingBottom: 100 }}>
        {/* Step 0: Address */}
        <View>
          <Text className="mb-3 text-base font-bold text-slate-900">Delivery Address</Text>
          {loadingAddresses ? (
            <ActivityIndicator color="#F97316" />
          ) : (
            addresses?.map((addr) => (
              <Pressable
                key={addr.id}
                onPress={() => setSelectedAddressId(addr.id)}
                className={`mb-2 rounded-2xl border p-4 ${
                  selectedAddressId === addr.id ? 'border-primary bg-orange-50' : 'border-slate-200 bg-white'
                }`}
              >
                <Text className="font-medium text-slate-800">
                  {addr.firstName} {addr.lastName}
                </Text>
                <Text className="text-sm text-slate-500">
                  {addr.addressLine1}, {addr.city}
                </Text>
                <Text className="text-sm text-slate-500">{addr.phone}</Text>
              </Pressable>
            ))
          )}
        </View>

        {/* Delivery method */}
        <View>
          <Text className="mb-3 text-base font-bold text-slate-900">Delivery Method</Text>
          {deliveryMethods?.map((method) => (
            <Pressable
              key={method.id}
              onPress={() => setSelectedDeliveryId(method.id)}
              className={`mb-2 flex-row items-center justify-between rounded-2xl border p-4 ${
                selectedDeliveryId === method.id ? 'border-primary bg-orange-50' : 'border-slate-200 bg-white'
              }`}
            >
              <View>
                <Text className="font-medium text-slate-800">{method.name}</Text>
                <Text className="text-xs text-slate-400">{method.estimatedDays}</Text>
              </View>
              <Text className="font-semibold text-slate-900">
                {parseFloat(method.price) === 0 ? 'Free' : formatPrice(method.price)}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Summary */}
        {cart && (
          <View className="rounded-2xl border border-slate-200 bg-white p-4">
            <Text className="mb-3 font-bold text-slate-900">Order Summary</Text>
            <View className="gap-2">
              <View className="flex-row justify-between">
                <Text className="text-sm text-slate-500">Subtotal</Text>
                <Text className="text-sm">{formatPrice(cart.subtotal)}</Text>
              </View>
              <View className="flex-row justify-between border-t border-slate-100 pt-2">
                <Text className="font-semibold text-slate-900">Total</Text>
                <Text className="font-bold text-slate-900">{formatPrice(cart.total)}</Text>
              </View>
            </View>
          </View>
        )}

        {createOrder.error && (
          <Text className="text-sm text-red-500">{createOrder.error.message}</Text>
        )}
      </ScrollView>

      <View className="absolute bottom-0 left-0 right-0 border-t border-slate-200 bg-white px-4 pb-8 pt-3">
        <Pressable
          onPress={handlePlaceOrder}
          disabled={!selectedAddressId || !selectedDeliveryId || createOrder.isPending}
          className="items-center rounded-2xl bg-primary py-4 disabled:opacity-50"
        >
          <Text className="font-bold text-white">
            {createOrder.isPending ? 'Placing Order…' : 'Place Order'}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
