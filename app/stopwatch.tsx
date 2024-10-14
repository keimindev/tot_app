import { Link } from "expo-router";
import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Stopwatch = () => {
  const [timer, setTimer] = useState("timer");
  return (
    <SafeAreaView className="bg-primary h-full justify-center">
      <View className="bg-secondary rounded-full m-10 min-h-[300px] justify-center">
        {timer === "stopwatch" ? (
          <Text className="text-6xl text-center font-Rbold">00:00:00</Text>
        ) : (
          <Text className="text-6xl text-center font-Rbold">24:00:00</Text>
        )}
      </View>
      <View className="flex flex-row justify-center items-center gap-5">
        <TouchableOpacity
          onPress={() => setTimer("timer")}
          activeOpacity={0.7}
          className="min-h-[40px] p-5 rounded-lg flex flex-row justify-center items-center bg-secondary"
        >
          <Text className="text-primary font-Rsemibold text-sm">
            Start Timer
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setTimer("stopwatch")}
          activeOpacity={0.7}
          className="min-h-[40px] p-5 rounded-lg flex flex-row justify-center items-center bg-secondary"
        >
          <Text className="text-primary font-Rsemibold text-sm">
            Start Timer
          </Text>
        </TouchableOpacity>
      </View>
      <View className="mt-20">
        <Link href="/home">
          <Text className="text-center text-xl text-text">back to home</Text>
        </Link>
      </View>
    </SafeAreaView>
  );
};

export default Stopwatch;
