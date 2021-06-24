import React from "react";
import { useState, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  ScrollView,
  Platform,
  Image,
  SafeAreaView,
} from "react-native";

import { COLORS, FONTS, icons, SIZES, dummyData, images } from "../constants";
import { TextButton } from "../components";

const COUNTRY_ITEM_SIZE = SIZES.width / 3;
const PLACES_ITEM_SIZE = SIZES.width / 1.2;
const EMPTY_ITEM_SIZE = (SIZES.width - PLACES_ITEM_SIZE) / 2;

const Dashboard = ({ navigation }) => {
  const countryScrollX = useRef(new Animated.Value(0)).current;
  const placesScrollX = useRef(new Animated.Value(0)).current;
  const [countries, setCountries] = useState([
    { id: -1 },
    ...dummyData.countries,
    { id: -2 },
  ]);
  const [places, setPlaces] = useState([
    { id: -1 },
    ...dummyData.countries[0].places,
    { id: -2 },
  ]);
  const [placesScrollPosition, setPlacesScrollPosition] = useState(0);

  const exploreButtonHandler = () => {
    const currentIndex = parseInt(placesScrollPosition, 10) + 1;
    navigation.navigate("Place", { selectedPlace: places[currentIndex] });
  };

  const renderHeader = () => {
    return (
      <SafeAreaView
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: SIZES.padding,
        }}
      >
        <TouchableOpacity
          style={{
            width: 45,
            height: 45,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            style={{ width: 25, height: 25, tintColor: COLORS.white }}
            source={icons.side_drawer}
          />
        </TouchableOpacity>

        <Text
          style={{
            flex: 1,
            color: COLORS.gray,
            textAlign: "center",
            ...FONTS.h3,
          }}
        >
          ASIA
        </Text>
        <TouchableOpacity
          style={{
            width: 45,
            height: 45,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            style={{ width: 45, height: 45, borderRadius: 23 }}
            source={images.profile_pic}
          />
        </TouchableOpacity>
      </SafeAreaView>
    );
  };

  const renderCountries = () => {
    return (
      <Animated.FlatList
        horizontal
        snapToAlignment="center"
        snapToInterval={COUNTRY_ITEM_SIZE}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        decelerationRate={0}
        data={countries}
        onMomentumScrollEnd={(event) => {
          var position = (
            event.nativeEvent.contentOffset.x / COUNTRY_ITEM_SIZE
          ).toFixed(0);
          setPlaces([
            { id: -1 },
            ...dummyData.countries[position].places,
            {
              id: -2,
            },
          ]);
        }}
        keyExtractor={(item) => `${item.id}`}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: countryScrollX } } }],
          { useNativeDriver: false }
        )}
        renderItem={({ item, index }) => {
          const opacity = countryScrollX.interpolate({
            inputRange: [
              (index - 2) * COUNTRY_ITEM_SIZE,
              (index - 1) * COUNTRY_ITEM_SIZE,
              index * COUNTRY_ITEM_SIZE,
            ],
            outputRange: [0.3, 1, 0.3],
            extrapolate: "clamp",
          });
          const mapSize = countryScrollX.interpolate({
            inputRange: [
              (index - 2) * COUNTRY_ITEM_SIZE,
              (index - 1) * COUNTRY_ITEM_SIZE,
              index * COUNTRY_ITEM_SIZE,
            ],
            outputRange: [25, 80, 25],
            extrapolate: "clamp",
          });
          const fontSize = countryScrollX.interpolate({
            inputRange: [
              (index - 2) * COUNTRY_ITEM_SIZE,
              (index - 1) * COUNTRY_ITEM_SIZE,
              index * COUNTRY_ITEM_SIZE,
            ],
            outputRange: [15, 25, 15],
            extrapolate: "clamp",
          });

          if (index == 0 || index == countries.length - 1) {
            return <View style={{ width: COUNTRY_ITEM_SIZE }} />;
          } else {
            return (
              <Animated.View
                style={{
                  width: COUNTRY_ITEM_SIZE,
                  height: 130,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                opacity={opacity}
              >
                <Animated.Image
                  source={item.image}
                  style={{
                    tintColor: COLORS.white,
                    width: mapSize,
                    height: mapSize,
                  }}
                  resizeMode="contain"
                />
                <Animated.Text
                  style={{
                    ...FONTS.h1,
                    color: COLORS.white,
                    fontSize: fontSize,
                    marginTop: 3,
                  }}
                >
                  {item.name}
                </Animated.Text>
              </Animated.View>
            );
          }
        }}
      />
    );
  };

  const renderPlaces = () => {
    return (
      <Animated.FlatList
        horizontal
        pagingEnabled
        snapToInterval={
          Platform.OS === "ios" ? PLACES_ITEM_SIZE + 20 : PLACES_ITEM_SIZE
        }
        onMomentumScrollEnd={(event) => {
          const position = (
            event.nativeEvent.contentOffset.x / PLACES_ITEM_SIZE
          ).toFixed(0);
          setPlacesScrollPosition(position);
        }}
        snapToAlignment="center"
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        decelerationRate={0}
        bounces={false}
        data={places}
        keyExtractor={(item) => `${item.id}`}
        contentContainerStyle={{ alignItems: "center" }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: placesScrollX } } }],
          { useNativeDriver: false }
        )}
        renderItem={({ item, index }) => {
          const opacity = placesScrollX.interpolate({
            inputRange: [
              (index - 2) * PLACES_ITEM_SIZE,
              (index - 1) * PLACES_ITEM_SIZE,
              index * PLACES_ITEM_SIZE,
            ],
            outputRange: [0.3, 1, 0.3],
            extrapolate: "clamp",
          });
          const height = placesScrollX.interpolate({
            inputRange: [
              (index - 2) * PLACES_ITEM_SIZE,
              (index - 1) * PLACES_ITEM_SIZE,
              index * PLACES_ITEM_SIZE,
            ],
            outputRange: [
              SIZES.height / 2,
              SIZES.height / 1.6,
              SIZES.height / 2,
            ],
            extrapolate: "clamp",
          });

          if (index == 0 || index == places.length - 1) {
            return <View style={{ width: EMPTY_ITEM_SIZE }} />;
          } else {
            return (
              <Animated.View
                opacity={opacity}
                style={{
                  height: height,
                  width: PLACES_ITEM_SIZE,
                  alignItems: "center",
                  padding: 10,
                  borderRadius: 20,
                }}
              >
                <Image
                  source={item.image}
                  resizeMode="cover"
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    borderRadius: 20,
                  }}
                />

                <View
                  style={{
                    flex: 1,
                    justifyContent: "flex-end",
                    alignItems: "center",
                    marginHorizontal: SIZES.padding,
                  }}
                >
                  <Text
                    style={{
                      ...FONTS.h1,
                      color: COLORS.white,
                      marginBottom: SIZES.radius,
                    }}
                  >
                    {item.name}
                  </Text>
                  <Text
                    style={{
                      ...FONTS.body3,
                      color: COLORS.white,
                      marginBottom: SIZES.padding * 2,
                      textAlign: "center",
                    }}
                  >
                    {item.description}
                  </Text>
                  <TextButton
                    label="Explore"
                    containerStyle={{
                      position: "absolute",
                      bottom: -20,
                      width: 150,
                    }}
                    labelStyle={{ color: COLORS.black }}
                    onPress={() =>
                      exploreButtonHandler(navigation, placesScrollPosition)
                    }
                  />
                </View>
              </Animated.View>
            );
          }
        }}
      />
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.black,
        paddingTop: SIZES.padding,
      }}
    >
      <StatusBar style="light" />
      {renderHeader()}

      <ScrollView
        contentContainerStyle={{
          paddingBottom: 80,
        }}
      >
        <View>
          {renderCountries()}
          <View style={{ height: 500 }}>{renderPlaces()}</View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Dashboard;
