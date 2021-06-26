import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { View, Text, ImageBackground, Image } from "react-native";
import SlidingUpPanel from "rn-sliding-up-panel";
import { useRef } from "react";
import MapView, { Marker } from "react-native-maps";
import { MapStyle } from "../styles";

import { HeaderBar } from "../components";
import { COLORS, FONTS, icons, SIZES } from "../constants";
import { TextIconButton } from "../components";

const SWIPE_HEADER_HEIGHT = 120;

const Place = ({ navigation, route }) => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);
  let _panel = useRef(null);

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
            marginBottom: SWIPE_HEADER_HEIGHT - 20,
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

  const renderMap = () => {
    return (
      <SlidingUpPanel
        ref={(c) => {
          _panel = c;
        }}
        draggableRange={{
          top: SIZES.height + SWIPE_HEADER_HEIGHT,
          bottom: SWIPE_HEADER_HEIGHT,
        }}
        showBackdrop={false}
        snappingPoints={[SIZES.height + SWIPE_HEADER_HEIGHT]}
        height={SIZES.height + SWIPE_HEADER_HEIGHT}
        friction={0.7}
      >
        <View style={{ flex: 1 }}>
          <View
            style={{
              height: SWIPE_HEADER_HEIGHT,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={icons.up_arrow}
              style={{ height: 20, width: 20, tintColor: COLORS.white }}
            />
            <Text style={{ ...FONTS.h3, color: COLORS.white }}>
              SWIPE FOR DETAILS
            </Text>
          </View>
          <View
            style={{
              backgroundColor: COLORS.white,
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MapView
              style={{ height: "100%", width: "100%" }}
              initialRegion={selectedPlace?.mapInitialRegion}
              customMapStyle={MapStyle}
            >
              {selectedPlace?.hotels.map((hotel, index) => {
                return (
                  <Marker
                    key={index}
                    coordinate={hotel.latlng}
                    identifier={hotel.id}
                    onPress={() => {
                      setSelectedHotel(hotel);
                    }}
                  >
                    <Image
                      source={
                        selectedHotel?.id == hotel.id
                          ? icons.bed_on
                          : icons.bed_off
                      }
                      style={{ width: 50, height: 50 }}
                      resizeMode="contain"
                    />
                  </Marker>
                );
              })}
            </MapView>
            <HeaderBar
              title={selectedPlace?.name}
              leftOnPressed={() => _panel.hide()}
              right
              containerStyle={{
                position: "absolute",
                top: SIZES.padding * 2,
                paddingHorizontal: SIZES.padding,
              }}
            />
          </View>
        </View>
      </SlidingUpPanel>
    );
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {renderPlace()}
      {renderMap()}
    </View>
  );
};

export default Place;
