import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

import { icons, COLORS, SIZES, FONTS } from "../constants";

export default function TextButton({
  label,
  onPress,
  containerStyle,
  labelStyle,
}) {
  return (
    <TouchableOpacity
      style={{
        ...containerStyle,
        height: 55,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.white,
      }}
      onPress={onPress}
    >
      <Text style={{ ...FONTS.h2, ...labelStyle }}>{label}</Text>
    </TouchableOpacity>
  );
}
