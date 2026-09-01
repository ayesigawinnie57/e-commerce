import '../global.css';
import '../store/auth'; // wire token store
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryProvider } from '@/lib/QueryProvider';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <QueryProvider>
        <StatusBar style="dark" />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="auth" />
          <Stack.Screen
            name="product/[slug]"
            options={{ headerShown: true, title: '', headerBackTitle: 'Back' }}
          />
          <Stack.Screen
            name="checkout/index"
            options={{ headerShown: true, title: 'Checkout' }}
          />
          <Stack.Screen
            name="orders/[id]"
            options={{ headerShown: true, title: 'Order Details' }}
          />
          <Stack.Screen
            name="orders/index"
            options={{ headerShown: true, title: 'My Orders' }}
          />
          <Stack.Screen
            name="wishlist/index"
            options={{ headerShown: true, title: 'Wishlist' }}
          />
          <Stack.Screen
            name="addresses/index"
            options={{ headerShown: true, title: 'My Addresses' }}
          />
          <Stack.Screen
            name="profile/index"
            options={{ headerShown: true, title: 'Profile' }}
          />
        </Stack>
      </QueryProvider>
    </SafeAreaProvider>
  );
}
