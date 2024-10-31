import { Link } from "expo-router";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Setting = () => {
  return (
    <SafeAreaView className="bg-[#fff] h-full">
      <View className="p-5">
        <Text>Your profile</Text>
        <Text>logout</Text>
        <Text>License</Text>
        <Text>Version 1.0</Text>
      </View>
    </SafeAreaView>
  );
};

export default Setting;
