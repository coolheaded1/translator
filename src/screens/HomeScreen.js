import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Dimensions,
  ImageBackground,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function HomeScreen({ language, languageName, setLanguage }) {
  const [text, setText] = useState("");
  const navigation = useNavigation();

  return (
    <>
      <ScrollView style={styles.container}>
        <StatusBar style="dark" backgroundColor="#f1f5f9" />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ImageBackground source={require("../../assets/buky.jpg")}>
            <View style={styles.box}>
              <TextInput
                style={styles.input}
                value={text}
                onChangeText={(text) => setText(text)}
                multiline={true}
                numberOfLines={10}
                placeholder="Enter Text"
                returnKeyType="go"
                spellCheck={true}
              />
              {text !== "" ? (
                <TouchableOpacity
                  style={styles.translate_btn}
                  activeOpacity={0.9}
                  onPress={() =>
                    navigation.navigate("Translate", {
                      text,
                      language,
                      languageName,
                    })
                  }
                >
                  <Text style={styles.translate_txt}>Translate</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={[
                    styles.translate_btn,
                    { backgroundColor: "#f1f5f9", elevation: 0 },
                  ]}
                  activeOpacity={0.9}
                >
                  <Text style={styles.translate_txt}></Text>
                </TouchableOpacity>
              )}
            </View>
          </ImageBackground>
        </KeyboardAvoidingView>
      </ScrollView>

      <View style={styles.row}>
        <TouchableOpacity style={styles.lang_btn} activeOpacity={0.9}>
          <Text style={styles.lang_txt}>English</Text>
        </TouchableOpacity>
        <View style={{ flex: 1 }} />
        <View style={{ justifyContent: "center" }}>
          <AntDesign name="arrowright" size={24} color="#4b5563" />
        </View>
        <View style={{ flex: 1 }} />

        <TouchableOpacity
          style={styles.lang_btn}
          activeOpacity={0.9}
          onPress={() => navigation.navigate("TranslateTo")}
        >
          <Text style={styles.lang_txt}>{languageName}</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  input: {
    fontFamily: "Calcutta-Regular",
    fontSize: 30,
    padding: 10,
    textAlignVertical: "top",
    color: "#4b5563",
    height: "80%",
    marginBottom: 20,
  },
  box: {
    paddingHorizontal: 20,
    // backgroundColor: "#f1f5f9",
    backgroundColor: "rgba(241,245,249,0.96)",
    paddingTop: 20,
    paddingBottom: 30,
    // borderRadius: 40,
    // borderTopRightRadius: 0,
    // borderTopLeftRadius: 0,
    height: windowHeight / 1.4,
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 40,
    width: "90%",
    alignSelf: "center",
    position: "absolute",
    bottom: 20,
  },
  lang_btn: {
    padding: 20,
    // paddingHorizontal: 40,
    backgroundColor: "#475569",
    borderRadius: 10,
    width: "40%",
    alignItems: "center",
  },
  lang_txt: {
    fontSize: 15,
    fontFamily: "Calcutta-Regular",
    color: "white",
  },
  translate_btn: {
    alignSelf: "flex-end",
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#bfdbfe",
    elevation: 5,
  },
  translate_txt: {
    fontSize: 15,
    fontFamily: "Calcutta-Bold",
    color: "#4b5563",
    letterSpacing: 1,
  },
});
