import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

import { icons, COLORS } from "../constants";

const TabBarIcon = ({ focused, icon }) => {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image
        source={icon}
        resizeMode="contain"
        style={{
          width: 30,
          height: 30,
          tintColor: focused ? COLORS.blue : COLORS.gray,
        }}
      />
    </View>
  );
};

export default TabBarIcon;
