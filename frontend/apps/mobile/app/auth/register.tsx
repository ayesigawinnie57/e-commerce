import { ScrollView, Text, TextInput, View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, type RegisterInput } from '@zavora/validation';
import { useRegister } from '@/features/auth/hooks/useAuth';

export default function RegisterScreen() {
  const router = useRouter();
  const register_ = useRegister();
  const { control, handleSubmit, formState: { errors } } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <View className="px-6 py-8">
          <Text className="text-xl font-bold text-slate-900">Create Account</Text>

          {register_.error && (
            <View className="mt-4 rounded-xl bg-red-50 px-4 py-3">
              <Text className="text-sm text-red-600">{register_.error.message}</Text>
            </View>
          )}

          <View className="mt-6 gap-4">
            {(
              [
                { name: 'firstName', label: 'First Name', placeholder: 'John' },
                { name: 'lastName', label: 'Last Name', placeholder: 'Doe' },
                { name: 'email', label: 'Email', placeholder: 'you@example.com', keyboardType: 'email-address' },
                { name: 'phone', label: 'Phone (optional)', placeholder: '+234…', keyboardType: 'phone-pad' },
                { name: 'password', label: 'Password', placeholder: '••••••••', secure: true },
                { name: 'confirmPassword', label: 'Confirm Password', placeholder: '••••••••', secure: true },
              ] as const
            ).map(({ name, label, placeholder, keyboardType, secure }) => (
              <View key={name}>
                <Text className="mb-1 text-sm font-medium text-slate-700">{label}</Text>
                <Controller
                  control={control}
                  name={name}
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      value={value ?? ''}
                      onChangeText={onChange}
                      placeholder={placeholder}
                      placeholderTextColor="#94A3B8"
                      secureTextEntry={secure}
                      keyboardType={keyboardType as never}
                      autoCapitalize="none"
                      className="h-12 rounded-xl border border-slate-300 px-4 text-sm text-slate-900"
                    />
                  )}
                />
                {errors[name] && (
                  <Text className="mt-1 text-xs text-red-500">{errors[name]?.message}</Text>
                )}
              </View>
            ))}
          </View>

          <Pressable
            onPress={handleSubmit((data) => register_.mutate(data))}
            disabled={register_.isPending}
            className="mt-6 items-center rounded-2xl bg-primary py-4 disabled:opacity-60"
          >
            <Text className="font-bold text-white">
              {register_.isPending ? 'Creating account…' : 'Create Account'}
            </Text>
          </Pressable>

          <Pressable onPress={() => router.push('/auth/login')} className="mt-4 items-center">
            <Text className="text-sm text-slate-500">
              Already have an account?{' '}
              <Text className="font-semibold text-primary">Sign In</Text>
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
