import { ScrollView, Text, View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Package, Heart, MapPin, User, LogOut, ChevronRight } from 'lucide-react-native';
import { useAuthStore } from '@/store/auth';
import { useLogout } from '@/features/auth/hooks/useAuth';
import { getInitials } from '@zavora/utils';

const MENU = [
  { icon: Package, label: 'My Orders', href: '/orders/index' },
  { icon: Heart, label: 'Wishlist', href: '/wishlist/index' },
  { icon: MapPin, label: 'Addresses', href: '/addresses/index' },
  { icon: User, label: 'Profile', href: '/profile/index' },
];

export default function AccountScreen() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const logout = useLogout();

  if (!isAuthenticated) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-slate-50 px-6">
        <Text className="text-5xl">👤</Text>
        <Text className="mt-4 text-lg font-bold text-slate-900">Sign in to your account</Text>
        <Text className="mt-2 text-center text-sm text-slate-500">
          Access your orders, wishlist, and more.
        </Text>
        <Pressable
          onPress={() => router.push('/auth/login')}
          className="mt-6 w-full items-center rounded-2xl bg-primary py-4"
        >
          <Text className="font-bold text-white">Sign In</Text>
        </Pressable>
        <Pressable
          onPress={() => router.push('/auth/register')}
          className="mt-3 w-full items-center rounded-2xl border border-slate-300 py-4"
        >
          <Text className="font-semibold text-slate-700">Create Account</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <ScrollView>
        {/* Profile header */}
        <View className="bg-white px-4 pb-6 pt-4">
          <View className="flex-row items-center gap-4">
            <View className="h-14 w-14 items-center justify-center rounded-full bg-primary">
              <Text className="text-xl font-bold text-white">
                {user ? getInitials(user.firstName, user.lastName) : '?'}
              </Text>
            </View>
            <View>
              <Text className="text-lg font-bold text-slate-900">
                {user?.firstName} {user?.lastName}
              </Text>
              <Text className="text-sm text-slate-500">{user?.email}</Text>
            </View>
          </View>
        </View>

        {/* Menu */}
        <View className="mt-4 mx-4 rounded-2xl border border-slate-200 bg-white overflow-hidden">
          {MENU.map(({ icon: Icon, label, href }, i) => (
            <Pressable
              key={href}
              onPress={() => router.push(href as never)}
              className={`flex-row items-center gap-3 px-4 py-4 ${
                i < MENU.length - 1 ? 'border-b border-slate-100' : ''
              }`}
            >
              <Icon size={18} color="#64748B" />
              <Text className="flex-1 text-sm font-medium text-slate-800">{label}</Text>
              <ChevronRight size={16} color="#CBD5E1" />
            </Pressable>
          ))}
        </View>

        {/* Logout */}
        <Pressable
          onPress={() => logout.mutate()}
          className="mx-4 mt-4 flex-row items-center gap-3 rounded-2xl border border-red-100 bg-red-50 px-4 py-4"
        >
          <LogOut size={18} color="#EF4444" />
          <Text className="text-sm font-medium text-red-500">Sign Out</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
