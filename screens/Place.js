import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { View, Text, ImageBackground, Image } from "react-native";

import { HeaderBar } from "../components";
import { COLORS, FONTS, icons, SIZES } from "../constants";
import { TextIconButton } from "../components";

const Place = ({ navigation, route }) => {
  const [selectedPlace, setSelectedPlace] = useState(null);

  useEffect(() => {
    let { selectedPlace } = route.params;
    setSelectedPlace(selectedPlace);
  }, []);

  const renderPlace = () => {
    return (
      <ImageBackground
        style={{
          height: "100%",
          width: "100%",
        }}
        source={selectedPlace?.image}
        resizeMode="cover"
      >
        <HeaderBar
          leftOnPressed={() => navigation.goBack()}
          containerStyle={{
            marginTop: SIZES.padding * 2,
            paddingHorizontal: SIZES.padding,
          }}
        />
        <View
          style={{
            flex: 1,
            marginBottom: SIZES.padding,
            justifyContent: "flex-end",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: SIZES.padding,
            }}
          >
            <Text style={{ ...FONTS.h1, color: COLORS.white }}>
              {selectedPlace?.name}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{ ...FONTS.h3, color: COLORS.white, marginRight: 5 }}
              >
                {selectedPlace?.rate}
              </Text>
              <Image source={icons.star} style={{ width: 20, height: 20 }} />
            </View>
          </View>
          <Text
            style={{
              ...FONTS.body3,
              color: COLORS.white,
              marginTop: SIZES.radius,
              paddingHorizontal: SIZES.padding,
            }}
          >
            {selectedPlace?.description}
          </Text>
          <TextIconButton
            label="Book a flight"
            icon={icons.aeroplane}
            containerStyle={{
              marginHorizontal: SIZES.padding,
              marginTop: SIZES.radius,
            }}
            onPress={() => {}}
          />
        </View>
      </ImageBackground>
    );
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {renderPlace()}
    </View>
  );
};

export default Place;
