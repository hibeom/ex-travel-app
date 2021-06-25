import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

import { icons, COLORS, SIZES, FONTS } from "../constants";

export default function HeaderBar({
  title,
  leftOnPressed,
  right,
  containerStyle,
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        ...containerStyle,
      }}
    >
      <TouchableOpacity
        onPress={leftOnPressed}
        style={{
          width: 50,
          height: 50,
          borderRadius: 25,
          backgroundColor: COLORS.transparentBlack,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          source={icons.left_arrow}
          style={{ width: 20, height: 20, tintColor: COLORS.white }}
        />
      </TouchableOpacity>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ ...FONTS.h3, color: COLORS.white }}>{title}</Text>
      </View>
      <TouchableOpacity
        onPress={() => console.log("pressed right button")}
        style={{
          width: 50,
          height: 50,
          borderRadius: 25,
          backgroundColor: right ? COLORS.transparentBlack : null,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {right && (
          <Image
            source={icons.settings}
            resizeMode="contain"
            style={{ width: 20, height: 20, tintColor: COLORS.white }}
          />
        )}
      </TouchableOpacity>
    </View>
  );
}
