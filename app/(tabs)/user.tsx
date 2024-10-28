import { getLastMonth, isToday } from "@/context/formatDay";
import { useGlobalContext } from "@/context/GlobalProvider";
import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Progress from "react-native-progress";
import { getMonthlyRecords, getUserRecords } from "@/lib/appwrite";
import { formatTimeClock } from "@/context/formatTime";

const User = () => {
  const { user, goalTime, setGoalTime } = useGlobalContext();

  const [edit, setEdit] = useState(false);
  const [lastMonthRecord, setLastMonthRecord] = useState<any>([]);
  const [totalRecord, setTotalRecord] = useState<number>(0);
  const [lastMonthTotalRecord, setlastMonthTotalRecord] = useState<number>(0);

  // 년도 달 구하기
  const today = new Date();
  const month = new Date().getMonth();
  const year = new Date().getFullYear();

  const handlePressBtn = () => {
    setEdit(!edit);
  };

  useEffect(() => {
    getUserRecords(user.$id, year, month).then((res) => {
      setLastMonthRecord(res);
    });

    getMonthlyRecords(user.$id, year, month + 1).then((res) => {
      setTotalRecord(res);
    });

    getMonthlyRecords(user.$id, year, month).then((res) =>
      setlastMonthTotalRecord(res)
    );
  }, []);

  const capitalize = (ch: string) => {
    return ch.charAt(0).toUpperCase() + ch.slice(1);
  };

  const goalConvertToPercent = (time: number) => {
    const res = time / (goalTime * 60 * 60);
    return Number(res.toFixed(2));
  };

  const camparedRecords = (time: number) => {
    const res = time / lastMonthTotalRecord;
    return Number(res.toFixed(2));
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      {/* <View className="flex flex-col justify-center items-center mb-5 mt-8">
        <Image
          source={{ uri: user.avatar }}
          className="w-[50px] h-[50px] rounded-full"
        />
        <Text className="text-text mt-1">{user.username}</Text>
      </View> */}
      <View className="mx-5 mt-8 mb-10">
        <Text className="text-text font-Rsemibold text-xl">
          Current Proggress
        </Text>
        <View className="flex flex-row justify-center">
          <Progress.Circle
            progress={goalConvertToPercent(totalRecord)}
            size={100}
            thickness={8}
            showsText={true}
            strokeCap={"square"}
            color={"white"}
            className="mt-3"
          />
        </View>
      </View>

      <View className="flex flex-row justify-between items-center py-3 px-5 mx-5 bg-secondary rounded-lg">
        <Text>Goal</Text>
        {!edit ? (
          <Text>{goalTime} hours</Text>
        ) : (
          <TextInput
            onChangeText={setGoalTime}
            value={goalTime}
            placeholder="Please put only number"
            keyboardType="numeric"
          />
        )}
        <TouchableOpacity
          onPress={handlePressBtn}
          activeOpacity={0.7}
          className="min-h-[40px] w-[60px] flex flex-row justify-center items-center bg-primary rounded-full"
        >
          <Text className="text-text font-Rsemibold text-sm">
            {!edit ? "edit" : "save"}
          </Text>
        </TouchableOpacity>
      </View>

      {lastMonthRecord.length > 0 ? (
        <View className="mx-5 mt-5">
          <View className="flex flex-row justify-between">
            <Text className="text-secondary">Compared to Last Month</Text>
            <Text className="text-secondary">
              {Number(camparedRecords(totalRecord)) * 100}%
            </Text>
          </View>
          <Progress.Bar
            progress={camparedRecords(totalRecord)}
            width={null}
            height={10}
            color={"white"}
            className="mt-3"
          />
        </View>
      ) : (
        <View></View>
      )}

      <View className="mx-5 mt-7 bg-secondary rounded-lg p-2">
        <Text>Last Month Records</Text>
        <View className="mt-5">
          <Text>
            {month != undefined ? getLastMonth(month) : isToday(new Date())}
          </Text>
          {lastMonthRecord.length === 0 ? (
            <Text className="text-center">There are no records</Text>
          ) : (
            lastMonthRecord?.map((item: any) => {
              return (
                <View className="flex flex-row justify-between px-2">
                  <Text className="">{capitalize(item.category)}</Text>
                  <Text className="">{formatTimeClock(item.recordTime)}</Text>
                </View>
              );
            })
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default User;
