import { useGlobalContext } from "@/context/GlobalProvider";
import { router } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


const Section = () => {
  const list = [
    { id: 1, name: "library-books", category: "reading" },
    { id: 2, name: "edit-note", category: "study" },
    { id: 3, name: "directions-run", category: "workout" },
    { id: 4, name: "draw", category: "drawing" },
    { id: 5, name: "videogame-asset", category: "game" },
  ];

  const { setSection } = useGlobalContext();

  const capitalize = (ch: string) => {
    return ch.charAt(0).toUpperCase() + ch.slice(1);
  };

  return (
    <SafeAreaView className="bg-sky-800 h-full">
      <View className="flex flex-col">
        <Text className="text-lg font-Rsemibold text-secondary text-center m-5">
          Let&apos;s record your day!
        </Text>
        <View className="flex flex-wrap flex-row justify-center items-center mt-5">
          {list.map((item) => {
            return (
              <View key={`key-${item.id}`} className="w-[130px] h-[130px] m-3 bg-secondary rounded-full text-center">
                <TouchableOpacity
                  onPress={() => {
                    router.push("/stopwatch");
                    setSection(item.category);
                  }}
                  activeOpacity={0.7}
                  className="flex justify-center items-center text-center h-[130px]"
                >
                  <MaterialIcons name={item.name as any} size={55} color="black" />
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
