import { View, Text, Image, Button } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

export default function WelcomeScreen() {
  const navigation = useNavigation();

  return (
    <View className="flex-1 justify-end items-center space-y-10 relative">
      <Image
        source={require("../../assets/images/splash.jpg")}
        style={{ position: "absolute", width: "100%", height: "100%" }}
        resizeMod="cover"
      />
      <StatusBar style="light"></StatusBar>
      {}
      <View className="flex items-center justify-center py-28 max-w-[80%]">
        <Text className="text-white text-4xl font-bold -tracking-wide my-4">
          Rick&Morty
        </Text>

        <Text className="text-white tracking-widest mb-1 text-lg text-center font-normal">
          Bedirhan Tong
        </Text>
        <Button
          title="Learn More"
          color="#97ce4c"
          onPress={() => navigation.navigate("HomeTabs")}
        ></Button>
      </View>
    </View>
  );
}
