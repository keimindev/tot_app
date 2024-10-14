import { getLastMonth, isToday } from "@/context/formatDay";
import { useGlobalContext } from "@/context/GlobalProvider";
import { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, Image, Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Progress from 'react-native-progress';

const User = () => {
  const { user } = useGlobalContext();

  const [edit, setEdit] = useState(false);

  // 년도 달 구하기
  const today = new Date();
  const currentYear = today.getFullYear();
  const prevMonth = today.getMonth();
  const currentMonth = today.getMonth() + 1;

  const handlePressBtn = () => {
    setEdit(!edit);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="flex flex-col justify-center items-center mb-5">
        <Image
          source={{ uri: user.avatar }}
          className="w-[50px] h-[50px] rounded-full"
        />
        <Text className="text-text mt-1">{user.username}</Text>
      </View>
      <View className="flex flex-row justify-between items-center py-3 px-5 mx-5 bg-secondary rounded-lg">
        <Text>Goal</Text>
        <Text>30 hours</Text>
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
      <View className="mx-5 mt-5">
        <View className="flex flex-row justify-between">
          <Text className="text-secondary">Reach towards the Goal</Text>
          <Text className="text-secondary">9%</Text>
        </View>
        <Progress.Bar 
          progress={0.5}
          width={null}
          height={10}
          color={"white"}
          className="mt-3"
          />
      </View>
      <View className="mx-5 mt-5">
        <View className="flex flex-row justify-between">
          <Text className="text-secondary">Reach towards the Goal</Text>
          <Text className="text-secondary">9%</Text>
        </View>
        <Progress.Bar 
          progress={0.5}
          width={null}
          height={10}
          color={"white"}
          className="mt-3"
          />
      </View>
      <View className="mx-5 mt-7 bg-secondary rounded-lg p-2">
        <Text>Last Month Records</Text>
        <View className="mt-5">
          <Text>
            {prevMonth != undefined
              ? getLastMonth(prevMonth)
              : isToday(new Date())}
          </Text>
          <Text>00:00:00</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default User;
