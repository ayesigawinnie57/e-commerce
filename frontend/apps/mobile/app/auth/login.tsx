import { ScrollView, Text, TextInput, View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginInput } from '@zavora/validation';
import { useLogin } from '@/features/auth/hooks/useAuth';
import { APP_NAME } from '@zavora/config';

export default function LoginScreen() {
  const router = useRouter();
  const login = useLogin();
  const { control, handleSubmit, formState: { errors } } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <View className="flex-1 justify-center px-6 py-8">
          <Text className="text-3xl font-bold text-primary">{APP_NAME}</Text>
          <Text className="mt-2 text-xl font-bold text-slate-900">Sign in</Text>

          {login.error && (
            <View className="mt-4 rounded-xl bg-red-50 px-4 py-3">
              <Text className="text-sm text-red-600">{login.error.message}</Text>
            </View>
          )}

          <View className="mt-6 gap-4">
            <View>
              <Text className="mb-1 text-sm font-medium text-slate-700">Email</Text>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    value={value}
                    onChangeText={onChange}
                    placeholder="you@example.com"
                    placeholderTextColor="#94A3B8"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    className="h-12 rounded-xl border border-slate-300 px-4 text-sm text-slate-900"
                  />
                )}
              />
              {errors.email && (
                <Text className="mt-1 text-xs text-red-500">{errors.email.message}</Text>
              )}
            </View>

            <View>
              <Text className="mb-1 text-sm font-medium text-slate-700">Password</Text>
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    value={value}
                    onChangeText={onChange}
                    placeholder="••••••••"
                    placeholderTextColor="#94A3B8"
                    secureTextEntry
                    className="h-12 rounded-xl border border-slate-300 px-4 text-sm text-slate-900"
                  />
                )}
              />
              {errors.password && (
                <Text className="mt-1 text-xs text-red-500">{errors.password.message}</Text>
              )}
            </View>
          </View>

          <Pressable
            onPress={handleSubmit((data) => login.mutate(data))}
            disabled={login.isPending}
            className="mt-6 items-center rounded-2xl bg-primary py-4 disabled:opacity-60"
          >
            <Text className="font-bold text-white">
              {login.isPending ? 'Signing in…' : 'Sign In'}
            </Text>
          </Pressable>

          <Pressable onPress={() => router.push('/auth/register')} className="mt-4 items-center">
            <Text className="text-sm text-slate-500">
              No account?{' '}
              <Text className="font-semibold text-primary">Register</Text>
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
