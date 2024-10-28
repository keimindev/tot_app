import { View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import FontAwesome from '@expo/vector-icons/FontAwesome';

const TabIcon = ({ color, name, focused, iconID } : any) => {
  return (
    <View className="items-center justify-center gap-2">
      <FontAwesome name={iconID as any} size={24} color={color} />
      {/* <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
        style={{ color: color }}
      >
        {name}
      </Text> */}
    </View>
  );
};

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#7DD3FC",
          tabBarInactiveTintColor: "#CDCDE0",
          tabBarStyle: {
            backgroundColor: "#075985",
            borderTopWidth: 1,
            borderTopColor: "#075985",
            height: 84,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "HOME",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon color={color} name="Home" focused={focused} iconID="home" />
            ),
          }}
        />
        <Tabs.Screen
          name="user"
          options={{
            title: "USER",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon color={color} name="User" focused={focused} iconID="user" />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;
