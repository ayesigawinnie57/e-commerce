import { FlatList, Image, Pressable, Text, View, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Minus, Plus, Trash2 } from 'lucide-react-native';
import { useCartQuery, useUpdateCartItem, useRemoveCartItem } from '@/features/cart/hooks/useCart';
import { formatPrice } from '@zavora/utils';

export default function CartScreen() {
  const router = useRouter();
  const { data: cart, isLoading } = useCartQuery();
  const updateItem = useUpdateCartItem();
  const removeItem = useRemoveCartItem();

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-slate-50">
        <ActivityIndicator color="#F97316" />
      </SafeAreaView>
    );
  }

  if (!cart?.items.length) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-slate-50">
        <Text className="text-5xl">🛒</Text>
        <Text className="mt-4 text-base font-medium text-slate-500">Your cart is empty</Text>
        <Pressable
          onPress={() => router.push('/search')}
          className="mt-4 rounded-xl bg-primary px-6 py-3"
        >
          <Text className="font-semibold text-white">Browse Products</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <View className="bg-white px-4 pb-3 pt-4">
        <Text className="text-xl font-bold text-slate-900">Cart ({cart.itemCount})</Text>
      </View>

      <FlatList
        data={cart.items}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={{ padding: 12, gap: 12, paddingBottom: 120 }}
        renderItem={({ item }) => (
          <View className="flex-row gap-3 rounded-2xl border border-slate-200 bg-white p-3">
            {item.product.primaryImage ? (
              <Image
                source={{ uri: item.product.primaryImage.url }}
                className="h-16 w-16 rounded-xl"
                resizeMode="cover"
              />
            ) : (
              <View className="h-16 w-16 items-center justify-center rounded-xl bg-slate-100">
                <Text className="text-2xl">📦</Text>
              </View>
            )}
            <View className="flex-1 gap-1">
              <Text className="text-sm font-medium text-slate-800" numberOfLines={2}>
                {item.product.name}
              </Text>
              <Text className="text-sm font-bold text-primary">{formatPrice(item.totalPrice)}</Text>
              <View className="flex-row items-center gap-2">
                <Pressable
                  onPress={() => updateItem.mutate({ itemId: item.id, quantity: item.quantity - 1 })}
                  disabled={item.quantity <= 1}
                  className="rounded-lg border border-slate-200 p-1"
                >
                  <Minus size={12} color="#64748B" />
                </Pressable>
                <Text className="w-6 text-center text-sm font-medium">{item.quantity}</Text>
                <Pressable
                  onPress={() => updateItem.mutate({ itemId: item.id, quantity: item.quantity + 1 })}
                  className="rounded-lg border border-slate-200 p-1"
                >
                  <Plus size={12} color="#64748B" />
                </Pressable>
                <Pressable
                  onPress={() => removeItem.mutate(item.id)}
                  className="ml-auto rounded-lg p-1"
                >
                  <Trash2 size={14} color="#EF4444" />
                </Pressable>
              </View>
            </View>
          </View>
        )}
      />

      {/* Sticky checkout bar */}
      <View className="absolute bottom-0 left-0 right-0 border-t border-slate-200 bg-white px-4 pb-6 pt-3">
        <View className="mb-3 flex-row justify-between">
          <Text className="text-slate-500">Total</Text>
          <Text className="text-lg font-bold text-slate-900">{formatPrice(cart.total)}</Text>
        </View>
        <Pressable
          onPress={() => router.push('/checkout')}
          className="items-center rounded-2xl bg-primary py-4"
        >
          <Text className="text-base font-bold text-white">Checkout</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
