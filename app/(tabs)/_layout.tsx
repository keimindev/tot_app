import { View, Text, Image } from "react-native";
import React from "react";
import { Tabs } from "expo-router";

const TabIcon = ({ color, name, focused } : any) => {
  return (
    <View className="items-center justify-center gap-2">
      <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#FFA001",
          tabBarInactiveTintColor: "#CDCDE0",
          tabBarStyle: {
            // backgroundColor: '#161622',
            borderTopWidth: 1,
            // borderTopColor: '#232533',
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
              <TabIcon color={color} name="Home" focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="user"
          options={{
            title: "USER",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon color={color} name="User" focused={focused} />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;
