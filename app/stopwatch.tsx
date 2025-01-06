import { formatTimeClock, hours, mins } from "@/context/formatTime";
import { useGlobalContext } from "@/context/GlobalProvider";
import { saveRecords } from "@/lib/appwrite";
import { Link, router } from "expo-router";
import { createRef, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  ScrollViewProps,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useKeepAwake } from "expo-keep-awake";
import Icon from "@/assets/icon";
import { debounce } from "lodash";

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

  const BUTTON_HEIGHT = 50;

  // set timer number
  const getTimerCenter = (offsetY: any) => {
    return Math.round(offsetY / BUTTON_HEIGHT) * BUTTON_HEIGHT;
  };

  const getCenterPositionFromIndex = (index: number) => {
    return index * BUTTON_HEIGHT;
  };

  const fillEmpty = (visibleCount : any, values: any) => {
    const fillCount = (visibleCount - 1) / 2;
    for (let i = 0; i < fillCount; i++) {
      values.unshift('');
      values.push('');
    }
    return values;
  };

  const refs = useRef(
    Array.from({ length: 3 }).map(() => createRef<ScrollView>())
  );

  const getOnScrollStop = (index: number) => (offsetY: any, label: any) => {
    const CENTER_POSITION = getTimerCenter(offsetY);
    const scrollRef = refs.current[index]?.current;

    if (scrollRef) {
      scrollRef?.scrollTo({ y: CENTER_POSITION });
    }
  };

  const getScrollProps = (index: number): ScrollViewProps => {
    const onScrollStop = debounce(getOnScrollStop(index), 200, {
      leading: false,
      trailing: true,
    });

    return {
      showsVerticalScrollIndicator: false,
      // contentContainerStyle: {
      //   left: 0,
      //   right: 0,
      //   position: "absolute",
      // },
      onScrollBeginDrag: () => {
        onScrollStop.cancel();
      },
      onScrollEndDrag: (e) => {
        onScrollStop.cancel();
        onScrollStop(e.nativeEvent.contentOffset.y, "onScrollEndDrag");
      },
      onMomentumScrollBegin: () => {
        onScrollStop.cancel();
      },
      onMomentumScrollEnd: (e) => {
        onScrollStop.cancel();
        onScrollStop(e.nativeEvent.contentOffset.y, "onMomentumScrollEnd");
      },
    };
  };

  const [scrollProps] = useState(() => {
    return Array.from({ length: 2 }).map((_, index) => getScrollProps(index));
  });

  const getOnPress = (scrollViewIdx: number, buttonIdx: number) => () => {
    const targetIdx = buttonIdx - 1;
    if (targetIdx < 0) return;
    const CENTER_POSITION = getCenterPositionFromIndex(targetIdx);
    const scrollRef = refs.current[scrollViewIdx]?.current;

    if (scrollRef) {
      scrollRef.scrollTo({ y: CENTER_POSITION });
    }
  };

  // function to start timer
  const startTimer = () => {};

  const Button = ({ label }: any) => {
    return (
      <TouchableWithoutFeedback>
        <View className="items-center justify-center mt-2">
          <Text className="h-[50px] font-bold text-white text-4xl">
          {label}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  useEffect(() => {
    console.log("Refs initialized:", refs.current);
    console.log(hours, mins, 'i');
    console.log(scrollProps);
  }, []);

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
      <View className="mb-20 flex flex-row justify-center items-center">
        {timer === "stopwatch" ? (
          <Text className="text-7xl text-center font-Rbold text-[#fff]">
            {formatTimeClock(time)}
          </Text>
        ) : (
          <View className="w-[250px] h-[170px] flex flex-row items-center border-2 border-white">
            <ScrollView {...scrollProps[0]} ref={refs.current[0]}>
              {hours.map((item: string, index: number) => (
                <Button label={item} onPress={getOnPress(0, index)} key={index}/>
              ))}
            </ScrollView>
            <Text className="text-[#fff] text-5xl">:</Text>
            <ScrollView {...scrollProps[1]} ref={refs.current[1]}>
              {mins.map((item: string, index: number) => (
                <Button label={item} onPress={getOnPress(1, index)}key={index} />
              ))}
            </ScrollView>
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
