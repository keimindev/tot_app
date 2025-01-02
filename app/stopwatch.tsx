import { formatTimeClock } from "@/context/formatTime";
import { useGlobalContext } from "@/context/GlobalProvider";
import { saveRecords } from "@/lib/appwrite";
import { Link, router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useKeepAwake } from "expo-keep-awake";
import Icon from "@/assets/icon";

const Stopwatch = () => {
  useKeepAwake();
  const [timer, setTimer] = useState("stopwatch");
  const { user, section } = useGlobalContext();

  // State to manage time and stopwatch status
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  const [inputMinutes, setInputMinutes] = useState("00");
  const [inputHours, setInputHours] = useState("00");

  useEffect(() => {
    setTime(0);
    setRunning(false);
  }, []);

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
  const saveStopwatchRecord = () => {
    saveRecords(section, user.$id, time);
    router.push("/home");
  };

  // Function to reset the stopwatch
  const resetStopwatch = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
    }
    setTime(0);
    setRunning(false);
  };

  // function to start timer
  const startTimer = () => {

  };

  return (
    <SafeAreaView className="bg-[#647ce6] h-full justify-center">
      <View className="mb-20 flex flex-row justify-center items-center">
        <Icon name={"spinIcon" as any} width={16} height={16} fill={"white"} />
        {timer === "stopwatch" ? (
          <Text
            onPress={() => {
              setTimer("timer");
            }}
            className="text-[#fff] font-Rsemibold text-lg ml-2"
          >
            Timer
          </Text>
        ) : (
          <Text
            onPress={() => {
              setTimer("stopwatch");
            }}
            className="text-[#fff] font-Rsemibold text-lg ml-2"
          >
            Stopwatch
          </Text>
        )}
      </View>
      <View className="mb-20">
        {timer === "stopwatch" ? (
          <Text className="text-7xl text-center font-Rbold text-[#fff]">
            {formatTimeClock(time)}
          </Text>
        ) : (
          <View className="text-7xl text-center font-Rbold text-[#fff]">
            <TextInput
              className="text-center"
              keyboardType="numeric"
              placeholder="Enter minutes"
              value={inputMinutes}
              onChangeText={setInputHours}
            />
            <Text>:</Text>
            <TextInput
              className="text-center"
              keyboardType="numeric"
              placeholder="Enter minutes"
              value={inputMinutes}
              onChangeText={setInputMinutes}
            />
          </View>
        )}
      </View>
      <View className="flex flex-row justify-center items-center gap-5 mt-10">
        <TouchableOpacity
          onPress={resetStopwatch}
          activeOpacity={0.7}
          className="min-h-[40px] px-3 rounded-2xl flex flex-row justify-center items-center bg-[#aab0e6]"
        >
          <Text className="text-[#fff] font-Rsemibold text-sm">Reset</Text>
        </TouchableOpacity>
        {running ? (
          <TouchableOpacity
            onPress={pauseStopwatch}
            activeOpacity={0.7}
            className="min-h-[40px] px-3 rounded-2xl flex flex-row justify-center items-center bg-[#aab0e6]"
          >
            <Text className="text-[#fff] font-Rsemibold text-sm">Pause</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={startStopwatch}
            activeOpacity={0.7}
            className="min-h-[40px] px-3 rounded-2xl flex flex-row justify-center items-center bg-[#fff]"
          >
            <Text className="font-Rsemibold text-sm">Start</Text>
          </TouchableOpacity>
        )}
      </View>
      <View className="mt-5 justify-center items-center">
        {!running && time > 0 && (
          <TouchableOpacity
            onPress={saveStopwatchRecord}
            activeOpacity={0.7}
            className="min-h-[40px] px-5 rounded-full flex justify-center items-center bg-[#ff7666] mb-10"
          >
            <Text className="text-[#fff] font-Rsemibold text-sm">
              Record Your Time!
            </Text>
          </TouchableOpacity>
        )}
        <View className="mt-10">
          <Link href="/home">
            <Ionicons name={"home" as any} size={24} color={"#fff"} />
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Stopwatch;
