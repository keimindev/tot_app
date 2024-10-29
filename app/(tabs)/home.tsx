import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
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
import Icon from "@/assets/images/timer.svg";

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

    getTodayRecords(user.$id, year, month + 1, today).then((res) => {
      setTodayRecord(res);
    });

    getTodayTotalRecords(user.$id, year, month + 1, today).then((res) =>
      setTodayTotalRecord(res)
    );
  }, []);

  const capitalize = (ch: string) => {
    return ch.charAt(0).toUpperCase() + ch.slice(1);
  };

  return (
    <SafeAreaView className="bg-[#fff] h-full">
      <View className="flex flex-col mx-5 mt-8">
        <Text className="text-sm font-Rsemibold">Hello</Text>
        <Text className="text-lg text-text-highlight font-Rsemibold">
          {user.username}
        </Text>
      </View>
      <View className="h-[100px]">
        <Text>calender section</Text>
      </View>
      <View className="min-h-[200px] m-5 flex flex-row justify-between">
        <View className="relative">
          <Icon width={150} height={150} className="absolute top-2"/>
          <View className="absolute top-20 left-6 transform -translate-x-1/2 -translate-y-1/2">
            <Text className="text-2xl text-[#fff] font-semibold">
              {formatTimeClock(todayTotalRecord)}
            </Text>
          </View>
        </View>
        <View>
          <View>
            <Text className="text-xl font-Rsemibold text-right">Today</Text>
            <Text className="text-xl font-Rsemibold text-right">
              Your Time Tracker
            </Text>
          </View>
          <View className="bg-rounded-lg p-3 mt-3">
            {todayRecord?.length === 0 ? (
              <Text className="text-center text-[#647ce6] font-Rsemibold">
                There are no records
              </Text>
            ) : (
              todayRecord?.map((item: any) => {
                return (
                  <View
                    className="flex flex-row justify-between px-2"
                    key={`key-${item.id}`}
                  >
                    <Text className="text-[#647ce6] font-Rregular">
                      {capitalize(item.category)}
                    </Text>
                    <Text className="text-[#647ce6] font-Rregular">
                      {formatTimeClock(item.recordTime)}
                    </Text>
                  </View>
                );
              })
            )}
          </View>
        </View>
      </View>
      <View className="bg-[#aab0e6] h-full rounded-t-xl p-8">
        <Text className="text-xl font-Rsemibold">This Month Proggress</Text>
        <Text className="text-right text-lg font-Rbold">
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
