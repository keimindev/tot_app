import CustomButton from "@/components/CustomButton";
import { useGlobalContext } from "@/context/GlobalProvider";
import { Redirect, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Welcome = () => {
  const { isLoading, isLoggedIn} = useGlobalContext();

  if (!isLoading && isLoggedIn) return <Redirect href="/home" />;

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{height: '100%'}}>
      <View className="w-full h-full px-4 items-center justify-center">
        <Text className="text-xl">Trace of Time</Text>
        <Text className="text-3xl">T.o.T</Text>
        <StatusBar style="auto" />
        <CustomButton
        title="Continue with Email"
        handlePress={() => router.push("/sign-in")}
        containerStyles="w-full mt-7" />
      </View>
      </ScrollView>

      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
}

export default Welcome