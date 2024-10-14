import { Link } from "expo-router";
import { useState } from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Stopwatch = () => {
  const [ timer, setTimer] = useState("timer");
  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="bg-secondary rounded-lg m-10 min-h-[200px]">
        <Text>00:00:00</Text>
      </View>
      <View className="flex flex-row justify-center items-center gap-5">
        <Text>Stopwatch</Text>
        <Text>Timer</Text>
      </View>
      <Link href="/home">back to home</Link>
    </SafeAreaView>
  );
};

export default Stopwatch;
