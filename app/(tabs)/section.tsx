import { useGlobalContext } from "@/context/GlobalProvider";
import { router } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "@/assets/icon";
import { categoryList } from "@/context/category";


const Section = () => {
  const { setSection } = useGlobalContext();

  const capitalize = (ch: string) => {
    return ch.charAt(0).toUpperCase() + ch.slice(1);
  };

  return (
    <SafeAreaView className="bg-[#647ce6] h-full">
      <View className="flex flex-col">
        <Text className="text-xl font-Rsemibold text-[#fff] text-center m-5">
          Let&apos;s record your day!
        </Text>
        <View className="flex flex-wrap flex-row justify-center items-center mt-5">
          {categoryList.map((item) => {
            return (
              <View key={`key-${item.id}`} className="w-[130px] h-[130px] m-3 bg-[#fff] rounded-full text-center">
                <TouchableOpacity
                  onPress={() => {
                    router.push("/stopwatch");
                    setSection(item.category);
                  }}
                  activeOpacity={0.7}
                  className="flex justify-center items-center text-center h-[130px]"
                >
                  <Icon name={item.iconId as any} width={50} height={50}/>
                  <Text className="text-sm font-Rsemibold">{capitalize(item.category)}</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Section;
