import LottieView from "lottie-react-native";
import { View } from "@gluestack-ui/themed";
import ThinkingAnimation from "../../assets/loading/thinking.json";
import React from "react";

const Thinking = () => {
  return (
    <View w="$12" h="$12">
      <LottieView
        source={ThinkingAnimation}
        style={{
          width: "100%",
          height: "100%",
        }}
        autoPlay
        loop
      />
    </View>
  );
};

export default Thinking;
