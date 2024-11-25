import CollapsibleView from "@/components/CollapsibleView";
import { useGlobalContext } from "@/context/GlobalProvider";
import { signOut, updateYourname } from "@/lib/appwrite";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Setting = () => {
  const { user,username, setUsername, setUser, setIsLogged } = useGlobalContext();
  const [edit, setEdit] = useState(false);
  const [name, setName]= useState(username)

  useEffect(()=>{
    setName(username)
  },[])

  const handlePressBtn = () => {
    if (edit) {
      updateYourname(user.$id, name);
      setUsername(name)
      
    }
    setEdit(!edit);
  };

  const logout = async() => {
    await signOut();
    setUser(null);
    setIsLogged(false);
    Alert.alert("Success", "User logged out successfully");
    
    router.replace("/sign-in");
  }
  return (
    <SafeAreaView className="bg-[#fff] h-full">
      <View className="m-3">
        <View className="mb-2">
          <CollapsibleView title="Set Your Profile" color="white">
            <View className="flex flex-row justify-between mt-3 px-3 rounded-xl">
              {!edit? (
                <Text className="text-lg font-Rsemibold mt-2">{username}</Text>
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
              {!edit ?
              <TouchableOpacity
                onPress={handlePressBtn}
                activeOpacity={0.7}
                className="min-h-[40px] w-[60px] flex flex-row justify-center items-center bg-[#aab0e6] rounded-2xl"
              >
                <Text className="font-Rsemibold text-sm">
                 edit
                </Text>
              </TouchableOpacity> : 
               <TouchableOpacity
               onPress={handlePressBtn}
               activeOpacity={0.7}
               className="min-h-[40px] w-[60px] flex flex-row justify-center items-center bg-[#FF6777] rounded-2xl"
             >
               <Text className="font-Rsemibold text-sm text-white">
                save
               </Text>
             </TouchableOpacity> }
            </View>
          </CollapsibleView>
        </View>
        {/* <View className="mb-2">
          <CollapsibleView title="About App" color="white">
            <View className="mt-3 px-5">
              <Text className="font-Rregular">
                This appp is....
              </Text>
            </View>
          </CollapsibleView>
        </View> */}
        <View className="border border-[#647ce6]"></View>
        <View className="mt-5">
          <Text className="font-Rsemibold">Version 1.0.0</Text>
        </View>
        <View className="mt-5">
          <TouchableOpacity
            onPress={logout}
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
