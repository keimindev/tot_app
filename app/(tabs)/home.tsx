import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "@/context/GlobalProvider";
import RecordsView, { IRecord } from "@/components/recordsView";


const records = [
  { id: 1, title: "reading", category: "reading", time: "00:02:01" },
  { id: 2, title: "reading", category: "study", time: "10:05:10" },
  { id: 3, title: "reading", category: "study", time: "10:05:10" },
];
const HOME = () => {
  const { user } = useGlobalContext();

  const submit = () => {
    router.replace("/user");
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
            00:00:00
          </Text>
        </View>
        <View className="bg-secondary rounded-lg p-3 mt-3">
          <Text className="text-center">There are no records</Text>
        </View>
      </View>
      <View className="m-5">
        <Text className="text-xl font-Rsemibold color-text">October 2024</Text>
        <View className="flex flex-row gap-4 mt-3">
          {records.map((record : IRecord) => {
            return (
              <RecordsView record={record} />
            )
          })}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HOME;
