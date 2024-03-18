import { Dimensions, TouchableWithoutFeedback, Image } from "react-native";
import React from "react";

var { width, height } = Dimensions.get("window");

export default function MovieCard({ item, handleClick }) {
  return (
    <TouchableWithoutFeedback onPress={() => handleClick(item)}>
      <Image
        source={require("../../assets/images/splash.jpg")}
        style={{
          width: width * 0.8,
          height: height * 0.25,
        }}
        resizeMode="cover"
        className="rounded-3xl"
      />
    </TouchableWithoutFeedback>
  );
}
