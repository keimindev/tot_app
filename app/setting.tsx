import CollapsibleView from "@/components/CollapsibleView";
import { useGlobalContext } from "@/context/GlobalProvider";
import { signOut, updateYourname } from "@/lib/appwrite";
import { router } from "expo-router";
import { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Setting = () => {
  const { user,username, setUsername } = useGlobalContext();
  const [edit, setEdit] = useState(false);
  const [name, setName]= useState(username)

  const handlePressBtn = () => {
    if (edit) {
      updateYourname(user.$id, name);
      setUsername(name)
      
    }
    setEdit(!edit);
  };

  return (
    <SafeAreaView className="bg-[#fff] h-full">
      <View className="m-3">
        <View className="mb-2">
          <CollapsibleView title="Set Your Profile" color="white">
            <View className="flex flex-row justify-between mt-3 px-5 rounded-xl">
              {!edit? (
                <Text className="text-lg font-Rsemibold mt-2">{name}</Text>
              ) : (
                <TextInput
                  onChangeText={setName}
                  value={name}
                  placeholder="Please put only number"
                  keyboardType="numeric"
                  className="text-lg font-Rsemibold"
                  maxLength={20}
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
          </CollapsibleView>
        </View>
        <View className="mb-2">
          <CollapsibleView title="About App" color="white">
            <View className="mt-3 px-5">
              <Text className="font-Rregular">
                This appp is....
              </Text>
            </View>
          </CollapsibleView>
        </View>
        <View className="border border-[#647ce6]"></View>
        <View className="mt-5">
          <Text className="font-Rsemibold">Version 1.0</Text>
        </View>
        <View className="mt-5">
          <TouchableOpacity
            onPress={() => {
              signOut();
              router.push("/sign-in");
            }}
            activeOpacity={0.7}
            className=""
          >
            <Text className="text-[#ff7666] font-Rsemibold">Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Setting;
