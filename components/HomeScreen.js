import React from "react";
import { View } from "react-native";
import QRCodeScanner from "./QRCodeScanner";

export default function HomeScreen() {
  return (
    <View
      testID="home"
      style={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    }}
    >
      <QRCodeScanner />
    </View>
  );
}
