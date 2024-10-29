import { getLastMonth, isToday } from "@/context/formatDay";
import { useGlobalContext } from "@/context/GlobalProvider";
import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Progress from "react-native-progress";
import {
  getMonthlyRecords,
  getUserRecords,
  getWeeklyRecords,
  saveGoalTime,
} from "@/lib/appwrite";
import { formatTimeClock } from "@/context/formatTime";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { BarChart } from "react-native-gifted-charts";

const User = () => {
  const { user, goalTime, setGoalTime } = useGlobalContext();

  const [edit, setEdit] = useState(false);
  const [lastMonthRecord, setLastMonthRecord] = useState<any>([]);
  const [totalRecord, setTotalRecord] = useState<number>(0);
  const [lastMonthTotalRecord, setlastMonthTotalRecord] = useState<number>(0);
  const [weeklyRecord, setWeeklyRecord] = useState<any>([]);

  // 년도 달 구하기
  const today = new Date();
  const month = new Date().getMonth();
  const year = new Date().getFullYear();
  const day = new Date().getDay();

  const handlePressBtn = () => {
    if (edit) {
      saveGoalTime(user.$id, Number(goalTime));
    }
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

    getWeeklyRecords(user.$id, day).then((res) => {
      getWeek(res);
    });
  }, []);

  const goalConvertToPercent = (time: number) => {
    const res = time / (goalTime * 60 * 60);
    return Number(res.toFixed(2));
  };

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  let result = [];
  const getWeek = (
    weeklyRecords: Array<{
      day: number;
      totalRecordTime: number;
      dayforString: number;
    }>
  ) => {
    const labelTextStyle = {
      fontSize: 12,
      fontWeight: 500,
      color: "#888",
    };

    for (let i = 0; i < 8; i++) {
      const haveIt = weeklyRecords.find((item) => item.dayforString === i);
      const transformedNum = (num : number) => {
        const total = ((num / 3600) / (goalTime/(4*7))).toFixed(1)
        return Number(total)
      }
      if (haveIt) {
        result.push({
          day: haveIt.day,
          dayforString: haveIt.dayforString,
          label: daysOfWeek[haveIt.dayforString],
          value: transformedNum(haveIt.totalRecordTime) || 0,
          labelTextStyle: labelTextStyle,
        });
      } else {
        result.push({
          day: i,
          dayforString: i,
          label: daysOfWeek[i],
          value: 0,
          labelTextStyle: labelTextStyle,
        });
      }
    }
    console.log(result, 'resut')
    setWeeklyRecord(result);
  };

  const yAxisTextStyle = {
    fontSize: 12,
    color: "#888",
  };

  const getMaxValue = () => {
    const str = (goalTime / (4*7)).toFixed(1);
    return Number(str);
  };

  return (
    <SafeAreaView className="bg-[#647ce6] h-full">
      <View className="py-3">
        <Text className="text-[#ffffff] font-Rsemibold text-xl text-center">
          Current Proggress
        </Text>
        <View className="flex flex-row justify-center py-5">
          <Progress.Circle
            progress={goalConvertToPercent(totalRecord)}
            size={130}
            thickness={8}
            showsText={true}
            color={"white"}
            className="mt-3"
          />
        </View>
      </View>
      <View className="bg-[#fff] h-full rounded-t-xl">
        <View className="m-3">
          <Text className="text-center font-Rsemibold text-lg">
            Weekly Track
          </Text>
          <View>
            <BarChart
              maxValue={getMaxValue()}
              data={weeklyRecord}
              height={120}
              dashGap={0}
              disablePress
              initialSpacing={20}
              spacing={25}
              barBorderRadius={2}
              barWidth={20}
              frontColor={"#FF7666"}
              xAxisIndicesColor={"#e4e7f7"}
              xAxisColor={"#e4e7f7"}
              yAxisTextStyle={yAxisTextStyle}
              yAxisThickness={0}
              noOfSections={1}
            />
          </View>
        </View>
        <View className="flex flex-row justify-between items-center py-3 px-5">
          <View className="bg-[#ff7666] rounded-xl">
            <Text className="p-3 font-Rsemibold">Goal</Text>
          </View>
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
            className="min-h-[40px] w-[60px] flex flex-row justify-center items-center bg-[#aab0e6] rounded-2xl"
          >
            <Text className="font-Rsemibold text-sm">
              {!edit ? "edit" : "save"}
            </Text>
          </TouchableOpacity>
        </View>
        <View className="mx-5 mt-7 rounded-lg p-2">
          <Text className="text-lg font-Rsemibold">
            Last Month Your Records
          </Text>
          {lastMonthRecord.length === 0 ? (
            <View></View>
          ) : (
            <Text className="text-right font-Rsemibold text-xl">
              {formatTimeClock(lastMonthTotalRecord)}
            </Text>
          )}
          <View className="mt-5">
            {lastMonthRecord.length === 0 ? (
              <Text className="mt-5 text-lg text-center font-Rmedium text-[#647ce6]">
                There are no records
              </Text>
            ) : (
              <View>
                <Text className="font-Rmedium">
                  {month != undefined
                    ? getLastMonth(month)
                    : isToday(new Date())}
                </Text>

                {lastMonthRecord?.map((item: any) => {
                  return (
                    <View
                      key={`${item.id}-key`}
                      className="bg-[#647ce6] rounded-lg h-[80px] w-[80px] flex flex-col justify-center items-center m-3"
                    >
                      <MaterialIcons
                        name="library-books"
                        size={35}
                        color="black"
                      />
                      {/* <Text className="text-sm font-Rregular">{capitalize(record.category)}</Text> */}
                      <Text className="text-sm font-Rsemibold">
                        {formatTimeClock(Number(item.recordTime))}
                      </Text>
                    </View>
                  );
                })}
              </View>
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default User;
