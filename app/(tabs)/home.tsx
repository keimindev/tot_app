import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "@/context/GlobalProvider";
import RecordsView, { IRecord } from "@/components/RecordsView";
import {
  getMonthlyRecords,
  getTodayRecords,
  getTodayTotalRecords,
  getUserRecords,
} from "@/lib/appwrite";
import { formatTimeClock } from "@/context/formatTime";
import { isToday } from "@/context/formatDay";

const HOME = () => {
  const { user } = useGlobalContext();
  const [totalRecord, setTotalRecord] = useState<any>([]);
  const [totalTimeRecord, setTotalTimeRecord] = useState<number>(0);
  const [todayRecord, setTodayRecord] = useState<any>([]);
  const [todayTotalRecord, setTodayTotalRecord] = useState<number>(0);

  const month = new Date().getMonth();
  const year = new Date().getFullYear();
  const today = new Date().getDate();

  useEffect(() => {
    getUserRecords(user.$id, year, month + 1).then((res) =>
      setTotalRecord(res)
    );

    getMonthlyRecords(user.$id, year, month + 1).then((res) =>
      setTotalTimeRecord(res)
    );

    getTodayRecords(user.$id, year, month + 1, today).then((res) =>
      setTodayRecord(res)
    );

    getTodayTotalRecords(user.$id, year, month + 1, today).then((res) =>
      setTodayTotalRecord(res)
    );
  }, []);

  const submit = () => {
    router.replace("/section");
  };

  const capitalize = (ch: string) => {
    return ch.charAt(0).toUpperCase() + ch.slice(1);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="flex flex-row justify-between mx-5">
        <Text className="text-lg color-text font-Rsemibold">Welcome To</Text>
        <Link href="/user">
          <Image
            source={{ uri: user.avatar }}
            className="w-[50px] h-[50px] rounded-full"
          />
        </Link>
      </View>
      <View className="flex justify-center items-center bg-secondary m-5 px-3 py-3 rounded-lg">
        <Text>Tracking Time</Text>
        <View className="w-[130px] text-sm bg-white rounded-lg mt-3">
          <TouchableOpacity
            onPress={submit}
            activeOpacity={0.7}
            className="min-h-[40px] flex flex-row justify-center items-center"
          >
            <Text className="text-primary font-Rsemibold text-sm">
              Start Timer
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className="m-5">
        <Text className="text-xl font-Rsemibold color-text">
          Today's Session
        </Text>
        <View className="flex justify-end">
          <Text className="text-lg font-Rsemibold color-text text-right">
            {formatTimeClock(todayTotalRecord)}
          </Text>
        </View>
        <View className="bg-secondary rounded-lg p-3 mt-3">
          {todayRecord?.length === 0 ? (
            <Text className="text-center">There are no records</Text>
          ) : (
            todayRecord?.map((item: any) => {
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
      <View className="m-5">
        <Text className="text-xl font-Rsemibold color-text">
          {isToday(new Date())}
        </Text>
        <Text className="text-right text-lg text-secondary font-Rbold">
          {formatTimeClock(totalTimeRecord)}
        </Text>
        <View className="flex flex-row mt-3 items-center justify-center">
          {totalRecord.map((record: IRecord) => {
            return <RecordsView record={record} />;
          })}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HOME;
