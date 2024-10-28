import { View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';

const TabIcon = ({ color, name, focused, iconID } : any) => {
  return (
    <View className="items-center justify-center gap-2">
      <Ionicons name={iconID as any} size={24} color={color} />
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
          tabBarActiveTintColor: "#F4EBDB",
          tabBarInactiveTintColor: "#537072",
          tabBarStyle: {
            backgroundColor: "#2C4A52",
            borderTopWidth: 1,
            borderTopColor: "#2C4A52",
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
          name="section"
          options={{
            title: "Stopwatch",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon color={color} name="Stopwatch" focused={focused} iconID="stopwatch" />
            ),
          }}
        />
        <Tabs.Screen
          name="user"
          options={{
            title: "USER",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon color={color} name="User" focused={focused} iconID="person-circle" />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;
