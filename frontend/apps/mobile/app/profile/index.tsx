import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '@/store/auth';
import { getInitials, formatDate } from '@zavora/utils';

export default function ProfileScreen() {
  const { user } = useAuthStore();

  if (!user) return null;

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <View className="bg-white px-4 pb-3 pt-4">
        <Text className="text-xl font-bold text-slate-900">My Profile</Text>
      </View>
      <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
        {/* Avatar */}
        <View className="items-center rounded-2xl border border-slate-200 bg-white py-8">
          <View className="h-20 w-20 items-center justify-center rounded-full bg-primary">
            <Text className="text-2xl font-bold text-white">
              {getInitials(user.firstName, user.lastName)}
            </Text>
          </View>
          <Text className="mt-3 text-lg font-bold text-slate-900">
            {user.firstName} {user.lastName}
          </Text>
          <Text className="text-sm text-slate-500">{user.email}</Text>
        </View>

        {/* Details */}
        <View className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
          {[
            { label: 'Email', value: user.email },
            { label: 'Phone', value: user.phone ?? '—' },
            { label: 'Role', value: user.role },
            { label: 'Account Status', value: user.isActive ? 'Active' : 'Inactive' },
            { label: 'Verified', value: user.isVerified ? 'Yes' : 'Pending' },
            { label: 'Member Since', value: formatDate(user.createdAt) },
          ].map(({ label, value }, i, arr) => (
            <View
              key={label}
              className={`flex-row items-center justify-between px-4 py-3 ${
                i < arr.length - 1 ? 'border-b border-slate-100' : ''
              }`}
            >
              <Text className="text-sm text-slate-500">{label}</Text>
              <Text className="text-sm font-medium capitalize text-slate-800">{value}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
