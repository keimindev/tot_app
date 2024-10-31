import React, { useState } from "react";
import { View, Text, TouchableWithoutFeedback, Animated } from "react-native";

interface CollapsibleViewProps {
  title: string;
  color?: string;
  children: React.ReactNode;
}

const CollapsibleView = ({ title, color, children }: CollapsibleViewProps) => {
  const [collapsed, setCollapsed] = useState(true);
  const [animation] = useState(new Animated.Value(0));

  const toggleCollapse = () => {
    Animated.timing(animation, {
      toValue: collapsed ? 1 : 0,
      duration: 300,
      useNativeDriver: false, // Height animation does not support native driver
    }).start();
    setCollapsed(!collapsed);
  };

  const heightInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 100], // Adjust 200 to desired max height
  });

  return (
    <View>
      <TouchableWithoutFeedback onPress={toggleCollapse}>
        <View>
          <Text className={`text-${color} font-Rsemibold`}>{title}</Text>
        </View>
      </TouchableWithoutFeedback>
      <Animated.View style={{ height: heightInterpolate, overflow: "hidden" }}>
        {collapsed ? null : children}
      </Animated.View>
    </View>
  );
};

export default CollapsibleView;
