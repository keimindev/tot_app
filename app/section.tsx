import { useGlobalContext } from "@/context/GlobalProvider";
import { Link, router } from "expo-router";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Section = () => {
  const list = [
    { id: 1, content: "📚 Record your reading time", category: "Reading" },
    { id: 2, content: "📝 Record your study time", category: "Study" },
    { id: 3, content: "🏋🏻 Record your workout time", category: "Workout" },
    { id: 4, content: "👩🏻‍🍳 Record your cooking time", category: "Cook" },
    { id: 5, content: "🎨 Record your drawing time", category: "Draw" },
  ];

  const { setSection } = useGlobalContext();

  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="flex flex-col">
        <Text className="text-lg font-Rsemibold text-secondary text-center m-5">
          Let&apos;s record your day!
        </Text>
        {list.map((item) => {
          return (
            <View
              key={`key-${item.id}`}
              className="text-center bg-secondary m-3 items-center justify-center p-3 rounded-lg"
            >
              <Text
                onPress={() => {
                  router.push("/stopwatch");
                  setSection(item.category);
                }}
              >
                {item.content}
              </Text>
            </View>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

export default Section;
