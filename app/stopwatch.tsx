import { formatTimeClock, hours, mins, seconds } from "@/context/formatTime";
import { useGlobalContext } from "@/context/GlobalProvider";
import { saveRecords } from "@/lib/appwrite";
import { Link, router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useKeepAwake } from "expo-keep-awake";
import Icon from "@/assets/icon";

const Stopwatch = () => {
  useKeepAwake();
  const [type, setType] = useState("stopwatch");
  const { user, section } = useGlobalContext();

  // State to manage time and stopwatch status
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState<boolean>(false);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    setTime(0);
    setRunning(false);
    setTimerRunning(false);
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

  // timer setting
  const [selectedHoursIndex, setSelectedHoursIndex] = useState(1); // 중앙 요소의 초기 위치
  const [selectedMinsIndex, setSelectedMinsIndex] = useState(1); // 중앙 요소의 초기 위치
  const [selectedSecsIndex, setSelectedSecsIndex] = useState(1); // 중앙 요소의 초기 위치

  const [timerHours, setTimerHours] = useState("00");
  const [timerMins, setTimerMins] = useState("00");
  const [timerSec, setTimerSecs] = useState("00");
  const [timeLeft, setTimeLeft] = useState<number>(0);

  const handleScrollHours = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y; // 스크롤 위치
    const itemHeight = 50; // 각 항목의 높이
    const index = Math.round(offsetY / itemHeight); // 스크롤에 따라 현재 중앙에 위치한 요소 계산
    setSelectedHoursIndex(index + 1);
    setTimerHours(hours[index + 1]);
  };

  const handleScrollMins = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const itemHeight = 50; // 각 항목의 높이
    const index = Math.round(offsetY / itemHeight);
    setSelectedMinsIndex(index + 1);
    setTimerMins(mins[index + 1]);
  };

  const handleScrollSecs = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const itemHeight = 50; // 각 항목의 높이
    const index = Math.round(offsetY / itemHeight);
    setSelectedSecsIndex(index + 1);
    setTimerSecs(seconds[index + 1]);
  };


  const totalMilliseconds =
  ((parseInt(timerHours) * 60 + parseInt(timerMins)) * 60 +
    parseInt(timerSec)) *
  1000;

  // Function to start the stopwatch
  const startTimer = () => {
    if (timerHours == "00" && timerMins == "00" && timerSec == "00") {
      setTimerRunning(false);
    }else{
      setTimerRunning(true);
      setTimeLeft(totalMilliseconds);
    }
  };

  useEffect(() => {
    if(!timerRunning && timeLeft <= 0 && type === "timer"){
      finishPopup();
    }
  }, [timerRunning]);

  useEffect(() => {
    let timer: any;
    if (timerRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1000); // 매초마다 1000ms씩 감소
      }, 1000);
    } else if (timeLeft <= 0 && type === "timer") {
      clearInterval(timer);
      setTimerRunning(false)
    }
    return () => clearInterval(timer);
  }, [timerRunning, timeLeft]);

  const converTimerNumber = (timeInMilliseconds: number) => {
    const hours = Math.floor(timeInMilliseconds / 3600000);
    const minutes = Math.floor((timeInMilliseconds % 3600000) / 60000);
    const seconds = Math.floor((timeInMilliseconds % 60000) / 1000);
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
  };

  const resetTimer = () => {
    setTimerRunning(false);
    setSelectedHoursIndex(1);
    setTimerHours("00");
    setSelectedMinsIndex(1);
    setTimerMins("00");
  };

  const finishPopup = () => {
    Alert.alert(
      "🔔 The Timer is up!",
      "Would you like to save your record?",
      [
        {
          text: "No",
          onPress: () => {
            console.log("No")
          }, 
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            const saveTime = parseInt(timerHours) * 3600 + parseInt(timerMins) * 60 + parseInt(timerSec)
            await saveRecords(section, user.$id, saveTime)
            Alert.alert("Success", `It successfully save.`);
            router.replace("/home");
          },
        }, 
      ],
      { cancelable: false }
    );
  };


  return (
    <SafeAreaView className="bg-[#647ce6] h-full justify-center">
      <View className="mb-20 flex flex-row justify-center items-center">
        <Icon name={"spinIcon" as any} width={16} height={16} fill={"white"} />
        {type === "stopwatch" ? (
          <Text
            onPress={() => {
              setType("timer");
              resetStopwatch();
            }}
            className="text-[#fff] font-Rsemibold text-lg ml-2"
          >
            Timer
          </Text>
        ) : (
          <Text
            onPress={() => {
              setType("stopwatch");
              resetTimer();
            }}
            className="text-[#fff] font-Rsemibold text-lg ml-2"
          >
            Stopwatch
          </Text>
        )}
      </View>
      <View className="mb-20 flex flex-row justify-center items-center">
        {type === "stopwatch" ? (
          <Text className="text-7xl text-center font-Rbold text-[#fff]">
            {formatTimeClock(time)}
          </Text>
        ) : (
          <View className="w-[200px] h-[160px] flex flex-row justify-center items-center relative">
            <ScrollView
              onScroll={handleScrollHours}
              scrollEventThrottle={16} // 스크롤 이벤트의 업데이트 빈도
              snapToInterval={50} // 스냅(스크롤 시 특정 위치 고정) 설정 (요소 높이)
              decelerationRate="fast" // 스크롤 속도
              showsVerticalScrollIndicator={false}
            >
              {hours.map((item, index) => (
                <View
                  key={index}
                  className="w-[50px] h-[50px] flex items-center justify-center"
                >
                  <Text
                    className={`text-3xl text-white ${
                      selectedHoursIndex === index
                        ? "font-bold text-4xl"
                        : "font-medium"
                    }`}
                  >
                    {item}
                  </Text>
                </View>
              ))}
            </ScrollView>
            <Text className="w-[20px] text-[#fff] text-5xl">:</Text>
            <ScrollView
              onScroll={handleScrollMins}
              scrollEventThrottle={16}
              snapToInterval={50}
              decelerationRate="fast"
              showsVerticalScrollIndicator={false}
            >
              {mins.map((item: string, index: number) => (
                <View
                  key={index}
                  className="w-[50px] h-[50px] flex items-center justify-center"
                >
                  <Text
                    className={`text-3xl text-white ${
                      selectedMinsIndex === index
                        ? "font-bold text-4xl"
                        : "font-medium"
                    }`}
                  >
                    {item}
                  </Text>
                </View>
              ))}
            </ScrollView>
            <Text className="w-[20px] text-[#fff] text-5xl">:</Text>
            <ScrollView
              onScroll={handleScrollSecs}
              scrollEventThrottle={16}
              snapToInterval={50}
              decelerationRate="fast"
              showsVerticalScrollIndicator={false}
            >
              {seconds.map((item: string, index: number) => (
                <View
                  key={index}
                  className="w-[50px] h-[50px] flex items-center justify-center"
                >
                  <Text
                    className={`text-3xl text-white ${
                      selectedSecsIndex === index
                        ? "font-bold text-4xl"
                        : "font-medium"
                    }`}
                  >
                    {item}
                  </Text>
                </View>
              ))}
            </ScrollView>
          </View>
        )}
        {timerRunning && (
          <View className="absolute top-0 left-0 w-[100%] bg-[#647ce6] p-12">
            <Text className="text-6xl text-white font-bold text-center">
              {converTimerNumber(timeLeft)}
            </Text>
          </View>
        )}
      </View>

      <View className="flex flex-row justify-center items-center gap-5 mt-10">
        <TouchableOpacity
          onPress={type== "timer" ? resetTimer : resetStopwatch}
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
            onPress={type === "timer" ? startTimer : startStopwatch}
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
