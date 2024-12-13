import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "@/context/GlobalProvider";
import RecordsView, { IRecord } from "@/components/RecordsView";
import {
  getMonthlyRecords,
  getTodayRecords,
  getTodayTotalRecords,
  getUserRecords,
  getWeeklyRecords,
} from "@/lib/appwrite";
import { formatTimeClock } from "@/context/formatTime";
import CalendarStrip from "react-native-calendar-strip";
import { findYearMonth} from "@/context/formatDay";
import moment from "moment";
import Icon from "@/assets/icon";

const HOME = () => {
  const { user } = useGlobalContext();
  const [totalRecord, setTotalRecord] = useState<any>([]);
  const [totalTimeRecord, setTotalTimeRecord] = useState<number>(0);
  const [todayRecord, setTodayRecord] = useState<any>([]);
  const [todayTotalRecord, setTodayTotalRecord] = useState<number>(0);
  const [selectedDate, setSelectedDate] = useState(moment());
  const [markedDate, setMarkedDate] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(moment().format("MM"));
  const [currentYear, setCurrentYear] = useState(moment().format("YYYY")); // 초기 연도 설정
  const [currentWeekStart, setCurrentWeekStart] = useState(moment());

  const month = new Date().getMonth();
  const year = new Date().getFullYear();
  const today = new Date().getDate();
  const dayToFetch = new Date().getDay();

  const fetchRecords = (
    userId: string,
    year: number,
    month: number,
    day: number
  ) => {
    return Promise.all([
      getTodayRecords(userId, year, month, day),
      getTodayTotalRecords(userId, year, month, day),
    ]);
  };

  const handleDateSelect = (date: any) => {
    setSelectedDate(date); // 선택된 날짜를 상태에 저장
    const selected = moment(date);
    const year = selected.year(); // 2024
    const month = selected.month() + 1; // 10 (0부터 시작하므로 +1)
    const day = selected.date();

    fetchRecords(user.$id, year, month, day).then(
      ([todayRecordRes, todayTotalRecordRes]) => {
        setTodayRecord(todayRecordRes);
        setTodayTotalRecord(todayTotalRecordRes);
      }
    );

    setCurrentMonth(selected.format("MM")); // 주 시작 날짜 기준으로 월 업데이트
    setCurrentYear(selected.format("YYYY"));
  };

  useEffect(() => {
    getUserRecords(user.$id, year, month + 1).then((res) =>
      setTotalRecord(res)
    );

    getMonthlyRecords(user.$id, year, month + 1).then((res) =>
      setTotalTimeRecord(res)
    );

    fetchRecords(user.$id, year, month + 1, today).then(
      ([todayRecordRes, todayTotalRecordRes]) => {
        setTodayRecord(todayRecordRes);
        setTodayTotalRecord(todayTotalRecordRes);
      }
    );

    getWeeklyRecords(user.$id, selectedDate, dayToFetch).then((res) => {
      checkingForMark(res);
    });
  }, []);

  const capitalize = (ch: string) => {
    return ch.charAt(0).toUpperCase() + ch.slice(1);
  };

  const checkingForMark = (week: any) => {
    const marked = week
      .filter((day: any) => day.totalRecordTime > 0) // totalRecordTime이 0보다 큰 요소만 필터링
      .map((item: any) => ({
        date: moment(item.date),
        dots: [{ color: "#647ce6", selectedColor: "white" }],
      }));
    setMarkedDate(marked);
  };

  const handleWeekChange = (startOfWeek: any) => {
    setCurrentWeekStart(startOfWeek.add(6, "days"));
    getWeeklyRecords(user.$id, startOfWeek, 7).then((res) => {
      checkingForMark(res);
    });
  };

  return (
    <SafeAreaView className="bg-[#fff] h-full">
      <View className="flex flex-row mx-5 mt-3 justify-between items-center">
        <View>
          <Text className="text-sm font-Rsemibold">Hello</Text>
          {user && (
            <Text className="text-lg text-text-highlight font-Rsemibold">
              {user.username}
            </Text>
          )}
        </View>
        <View>
          <Text className="text-2xl font-Rsemibold">
            {findYearMonth(currentYear, currentMonth)}
          </Text>
        </View>
      </View>
      <View className="h-[100px]">
        <CalendarStrip
          showMonth={false}
          style={{ height: 80, paddingTop: 0, paddingBottom: 0 }}
          calendarColor={"#ffffff"}
          calendarHeaderStyle={{ color: "black" }}
          dateNumberStyle={{ color: "black" }}
          dateNameStyle={{ color: "black" }}
          highlightDateContainerStyle={{ backgroundColor: "#647ce6" }}
          iconContainer={{ flex: 0.1 }}
          highlightDateNumberStyle={{ color: "white" }}
          highlightDateNameStyle={{ color: "white" }}
          selectedDate={selectedDate}
          onWeekChanged={handleWeekChange}
          onDateSelected={handleDateSelect}
          markedDates={markedDate}
        />
      </View>
      <View className="min-h-[200px] m-5 mt-20 mb-10 flex flex-row justify-between">
        <View className="relative">
          <Icon
            name="timerIcon"
            width={155}
            height={155}
            className="absolute top-2"
          />
          <View className="absolute top-20 left-5 transform -translate-x-1/2 -translate-y-1/2">
            <Text className="text-3xl text-[#fff] font-Rbold">
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
                    key={`key-${item.category}`}
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
      <View className="bg-[#aab0e6] h-full rounded-t-xl p-5">
        <Text className="text-lg font-Rsemibold">This Month Proggress</Text>
        <Text className="text-right text-lg font-Rbold">
          {formatTimeClock(totalTimeRecord)}
        </Text>
        <ScrollView
        horizontal 
        contentContainerStyle={{ paddingHorizontal: 0 }}
        className="flex flex-row mt-5"
        >
          {totalRecord.map((record: IRecord) => {
            return <RecordsView record={record} />;
          })}
      </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default HOME;
