import CustomButton from '@/components/CustomButton';
import FormField from '@/components/FormField'
import { useGlobalContext } from '@/context/GlobalProvider';
import { getCurrentUser, signIn } from '@/lib/appwrite';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'


const SignIn = () => {
  const { setUser, setIsLogged } = useGlobalContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const submit = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }

    setIsSubmitting(true);
    try {
      await signIn(form.email, form.password);
      const result = await getCurrentUser();
      setUser(result);
      setIsLogged(true);

      Alert.alert("Success", "User signed in successfully");
      router.replace("/home");

      router.replace("/home");
    } catch (error : any) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className='bg-[#fff] h-full'>
      <ScrollView>
        <View className="w-full justify-center min-h-[80vh] px-4 my-6">
        <Text className="text-2xl font-semibold text-[#647ce6] mt-10 font-Rsemibold">
            Log in to T.o.T
          </Text>
        
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />
          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-[#aab0e6] font-Rregular">
              Don't have an account?
            </Text>
            <Link
              href="/sign-up"
              className="text-lg font-Rsemibold text-[#ff7666]"
            >
              Signup
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn