import CustomButton from "@/components/CustomButton";
import { useGlobalContext } from "@/context/GlobalProvider";
import { Redirect, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Welcome = () => {
  const { isLoading, isLoggedIn } = useGlobalContext();

  if (!isLoading && isLoggedIn) return <Redirect href="/home" />;

  return (
    <SafeAreaView className="bg-[#647ce6] h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full h-full px-4 items-center justify-center">
          <Text className="text-lg text-white font-Rmedium">
            Trace of Your Time
          </Text>
          <Text className="text-6xl text-white font-Rbold">T.o.T</Text>
          <StatusBar style="auto" />
          <TouchableOpacity
            onPress={() => router.push("/sign-in")}
            activeOpacity={0.7}
            className="flex flex-row justify-center items-center bg-[#FF7666] rounded-full p-3 mt-20 px-6"
          >
            <Text className="text-[#fff] font-Rsemibold text-sm">
              Continue with Email
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default Welcome;
