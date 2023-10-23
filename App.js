import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import MainRoute from "./src/navigation/MainRoute";
import FlashMessage from "react-native-flash-message";

export default function App() {
  const [language, setLanguage] = useState({
    code: "fr",
    name: "French",
  });
  const [loaded] = useFonts({
    "Calcutta-Bold": require("./assets/fonts/Calcutta-Bold.otf"),
    "Calcutta-BoldItalic": require("./assets/fonts/Calcutta-BoldItalic.otf"),
    "Calcutta-Italic": require("./assets/fonts/Calcutta-Italic.otf"),
    "Calcutta-Light": require("./assets/fonts/Calcutta-Light.otf"),
    "Calcutta-LightItalic": require("./assets/fonts/Calcutta-LightItalic.otf"),
    "Calcutta-Medium": require("./assets/fonts/Calcutta-Medium.otf"),
    "Calcutta-Regular": require("./assets/fonts/Calcutta-Regular.otf"),
    "Calcutta-SemiBold": require("./assets/fonts/Calcutta-SemiBold.otf"),
    icomoon: require("./assets/fonts/icomoon.ttf"),
  });

  if (!loaded) {
    return null;
  }
  return (
    <View style={styles.container}>
      <MainRoute
        language={language.code}
        languageName={language.name}
        setLanguage={setLanguage}
      />
      <FlashMessage position="top" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
