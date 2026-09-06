import { ScrollView, Text, View, Pressable, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Trash2, MapPin } from 'lucide-react-native';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { addressesApi } from '@zavora/api';

export default function AddressesScreen() {
  const queryClient = useQueryClient();

  const { data: addresses, isLoading } = useQuery({
    queryKey: ['addresses'],
    queryFn: addressesApi.list,
  });

  const deleteAddress = useMutation({
    mutationFn: (id: number) => addressesApi.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['addresses'] }),
  });

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <View className="bg-white px-4 pb-3 pt-4">
        <Text className="text-xl font-bold text-slate-900">My Addresses</Text>
      </View>

      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator color="#F97316" />
        </View>
      ) : (
        <ScrollView contentContainerStyle={{ padding: 12, gap: 10 }}>
          {!addresses?.length ? (
            <View className="items-center py-16">
              <MapPin size={40} color="#CBD5E1" />
              <Text className="mt-4 text-sm text-slate-400">No saved addresses yet.</Text>
            </View>
          ) : (
            addresses.map((addr) => (
              <View
                key={addr.id}
                className="flex-row items-start justify-between rounded-2xl border border-slate-200 bg-white p-4"
              >
                <View className="flex-1 gap-1">
                  <View className="flex-row items-center gap-2">
                    <Text className="font-semibold text-slate-900">
                      {addr.firstName} {addr.lastName}
                    </Text>
                    {addr.isDefault && (
                      <View className="rounded-full bg-blue-100 px-2 py-0.5">
                        <Text className="text-[10px] font-medium text-blue-700">Default</Text>
                      </View>
                    )}
                  </View>
                  <Text className="text-sm text-slate-500">{addr.addressLine1}</Text>
                  <Text className="text-sm text-slate-500">
                    {addr.city}, {addr.state}, {addr.country}
                  </Text>
                  <Text className="text-sm text-slate-500">{addr.phone}</Text>
                </View>
                <Pressable
                  onPress={() => deleteAddress.mutate(addr.id)}
                  className="rounded-xl p-2"
                >
                  <Trash2 size={16} color="#EF4444" />
                </Pressable>
              </View>
            ))
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
