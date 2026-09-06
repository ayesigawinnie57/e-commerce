import { Tabs } from 'expo-router';
import { Home, Grid2x2, Search, ShoppingCart, User } from 'lucide-react-native';
import { useCartQuery } from '@/features/cart/hooks/useCart';
import { View, Text } from 'react-native';

function CartIcon({ color, size }: { color: string; size: number }) {
  const { data: cart } = useCartQuery();
  const count = cart?.itemCount ?? 0;
  return (
    <View className="relative">
      <ShoppingCart color={color} size={size} />
      {count > 0 && (
        <View className="absolute -right-2 -top-1 h-4 w-4 items-center justify-center rounded-full bg-primary">
          <Text className="text-[9px] font-bold text-white">{count > 99 ? '99+' : count}</Text>
        </View>
      )}
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#F97316',
        tabBarInactiveTintColor: '#94A3B8',
        tabBarStyle: { borderTopColor: '#E2E8F0' },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ title: 'Home', tabBarIcon: ({ color, size }) => <Home color={color} size={size} /> }}
      />
      <Tabs.Screen
        name="categories"
        options={{ title: 'Categories', tabBarIcon: ({ color, size }) => <Grid2x2 color={color} size={size} /> }}
      />
      <Tabs.Screen
        name="search"
        options={{ title: 'Search', tabBarIcon: ({ color, size }) => <Search color={color} size={size} /> }}
      />
      <Tabs.Screen
        name="cart"
        options={{ title: 'Cart', tabBarIcon: ({ color, size }) => <CartIcon color={color} size={size} /> }}
      />
      <Tabs.Screen
        name="account"
        options={{ title: 'Account', tabBarIcon: ({ color, size }) => <User color={color} size={size} /> }}
      />
    </Tabs>
  );
}
