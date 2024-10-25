import { getUserRecords } from "@/lib/appwrite";
import { Link } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Stopwatch = () => {
  const [timer, setTimer] = useState("stopwatch");


  // State to manage time and stopwatch status
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  // Function to format time as 00:00:00
  const formatTime = (timeInSeconds: number) => {
    const hours = String(Math.floor(timeInSeconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((timeInSeconds % 3600) / 60)).padStart(
      2,
      "0"
    );
    const seconds = String(timeInSeconds % 60).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  // Function to start the stopwatch
  const startStopwatch = () => {
    startTimeRef.current = Date.now() - time * 1000;
    intervalRef.current = setInterval(() => {
      setTime(Math.floor((Date.now() - startTimeRef.current) / 1000));
    }, 1000);
    setRunning(true);
  };

  // Function to pause the stopwatch
  const pauseStopwatch = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
    }
    setRunning(false);
  };

  // Function to resume the stopwatch
  const resumeStopwatch = () => {
    startStopwatch();
  };

  // Function to reset the stopwatch
  const resetStopwatch = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
    }
    setTime(0);
    setRunning(false);
  };
  return (
    <SafeAreaView className="bg-primary h-full justify-center">
      <View className="mb-10">
        {timer === "stopwatch" ? (
          <Text className="text-7xl text-center font-Rbold text-white">
            {formatTime(time)}
          </Text>
        ) : (
          <Text className="text-7xl text-center font-Rbold text-whtie">
            24:00:00
          </Text>
        )}
      </View>
      <View className="flex flex-row justify-center items-center gap-5 mt-10">
        <TouchableOpacity
          onPress={resetStopwatch}
          activeOpacity={0.7}
          className="min-h-[40px] p-5 rounded-lg flex flex-row justify-center items-center bg-secondary"
        >
          <Text className="text-primary font-Rsemibold text-sm">Reset</Text>
        </TouchableOpacity>
        {running ? (
          <TouchableOpacity
            onPress={pauseStopwatch}
            activeOpacity={0.7}
            className="min-h-[40px] p-5 rounded-lg flex flex-row justify-center items-center bg-secondary"
          >
            <Text className="text-primary font-Rsemibold text-sm">Pause</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={startStopwatch}
            activeOpacity={0.7}
            className="min-h-[40px] p-5 rounded-lg flex flex-row justify-center items-center bg-secondary"
          >
            <Text className="text-primary font-Rsemibold text-sm">Start</Text>
          </TouchableOpacity>
        )}
      </View>
      <View className="mt-10">
      {!running && time > 0 && (
          <TouchableOpacity
            onPress={resumeStopwatch}
            activeOpacity={0.7}
            className="w-[150px] min-h-[40px] p-5 rounded-lg flex justify-center items-center bg-secondary"
          >
            <Text className="text-primary font-Rsemibold text-sm">Resume</Text>
          </TouchableOpacity>
        )}
        <Link href="/home">
          <Text className="text-center text-xl text-text">back to home</Text>
        </Link>
      </View>
    </SafeAreaView>
  );
};

export default Stopwatch;
