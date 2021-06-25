import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

import { icons, COLORS, SIZES, FONTS } from "../constants";

export default function TextIconButton({
  label,
  icon,
  onPress,
  containerStyle,
  labelStyle,
}) {
  return (
    <TouchableOpacity
      style={{
        ...containerStyle,
        flexDirection: "row",
        height: 55,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.white,
      }}
      onPress={onPress}
    >
      <Text style={{ ...FONTS.h2, ...labelStyle }}>{label}</Text>
      <Image source={icon} style={{ height: 20, width: 20, marginLeft: 5 }} />
    </TouchableOpacity>
  );
}
