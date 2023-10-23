import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TouchableNativeFeedback,
} from "react-native";
import { MaterialIcons, AntDesign, Feather } from "@expo/vector-icons";
import request from "../component/request";
import axios from "axios";
import * as Speech from "expo-speech";
import { BarIndicator } from "react-native-indicators";
import { StatusBar } from "expo-status-bar";
import * as Clipboard from "expo-clipboard";
import { showMessage, hideMessage } from "react-native-flash-message";

const BASE_URL = request.BASE_URL;
const API_KEY = request.API_KEY;

export default function Translate({ route, navigation }) {
  const { text, language, languageName } = route.params;
  const [translated_text, setTranslated_text] = useState("");
  const [play, setPlay] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      translate();
    }

    return () => {
      isMounted = false;
    };
  }, []);

  const translate = async () => {
    // const formData = new FormData();
    // formData.append("q", text);
    // formData.append("source", "en");
    // formData.append("target", language);
    setIsLoading(true);
    try {
      let { data } = await axios.post(
        `${BASE_URL}/language/translate/v2`,
        {
          q: text,
          source: "en",
          target: language,
        },
        {
          headers: {
            // "Content-Type": "multipart/form-data",
            "X-RapidAPI-Key": API_KEY,
            "X-RapidAPI-Host": "deep-translate1.p.rapidapi.com",
          },
        }
      );
      setTranslated_text(data.data.translations.translatedText);
      setIsLoading(false);
      console.log(data.data.translations);
    } catch (error) {
      setIsLoading(false);
      if (error.response) {
        console.log(error.response.data);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log(error.message);
      }
    }
  };

  const speak = () => {
    Speech.speak(text, {
      pitch: 1,
      rate: 1,
      onStart: () => {
        setPlay(true);
      },
      onDone: () => {
        setPlay(false);
      },
    });
  };

  const speak2 = () => {
    Speech.speak(translated_text, {
      pitch: 1,
      rate: 1,
      onStart: () => {
        setPlay(true);
      },
      onDone: () => {
        setPlay(false);
      },
    });
  };
  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(text);
    showMessage({
      message: "Text Copied",
      description: "",
      type: "default",
      duration: 1000,
      floating: true,
      position: "center",
    });
  };
  const copyToClipboard2 = async () => {
    await Clipboard.setStringAsync(translated_text);
    showMessage({
      message: "Text Copied",
      description: "",
      type: "default",
      duration: 1000,
      floating: true,
      position: "center",
    });
  };
  return (
    <>
      <TouchableNativeFeedback onPress={() => console.log("hello")}>
        <ScrollView style={styles.container}>
          <StatusBar style="dark" backgroundColor="#f1f5f9" />

          <View style={styles.row}>
            <View>
              <Text style={styles.translate_from}>English</Text>
            </View>
            <View style={{ flex: 1 }} />
            <TouchableOpacity
              style={{ paddingRight: 20 }}
              activeOpacity={0.9}
              onPress={copyToClipboard}
            >
              <MaterialIcons name="content-copy" size={24} color="black" />
            </TouchableOpacity>
            {play ? (
              <TouchableOpacity activeOpacity={0.9}>
                <Feather name="volume-x" size={25} color="black" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity activeOpacity={0.9} onPress={speak}>
                <Feather name="volume-2" size={25} color="black" />
              </TouchableOpacity>
            )}
          </View>

          <Text style={styles.translate_word}>{text}</Text>
          <View style={styles.divider} />
          <View style={styles.row}>
            <View>
              <Text style={[styles.translate_from, { color: "#2563eb" }]}>
                {languageName}
              </Text>
            </View>
            <View style={{ flex: 1 }} />
            <TouchableOpacity
              style={{ paddingRight: 20 }}
              activeOpacity={0.9}
              onPress={copyToClipboard2}
            >
              <MaterialIcons name="content-copy" size={24} color="#2563eb" />
            </TouchableOpacity>
            {play ? (
              <TouchableOpacity activeOpacity={0.9}>
                <Feather name="volume-x" size={25} color="#2563eb" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity activeOpacity={0.9} onPress={speak2}>
                <Feather name="volume-2" size={25} color="#2563eb" />
              </TouchableOpacity>
            )}
          </View>

          {isLoading ? (
            <BarIndicator
              color="#2563eb"
              size={20}
              count={3}
              style={{ alignSelf: "flex-start", marginTop: 30 }}
            />
          ) : (
            <Text
              style={[
                styles.translate_word,
                { color: "#2563eb", paddingBottom: 80 },
              ]}
            >
              {translated_text}
            </Text>
          )}
        </ScrollView>
      </TouchableNativeFeedback>

      <View style={{ backgroundColor: "#f1f5f9" }}>
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.new_translation_btn}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.new_translation_txt}>New translation</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f5f9",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  row: {
    flexDirection: "row",
  },
  translate_from: {
    fontSize: 20,
    fontFamily: "Calcutta-Light",
  },
  translate_word: {
    paddingTop: 30,
    fontSize: 25,
    fontFamily: "Calcutta-Regular",
  },
  divider: {
    borderWidth: 1,
    marginVertical: 100,
    borderColor: "#bfdbfe",
    width: "70%",
    alignSelf: "center",
  },
  new_translation_btn: {
    right: 20,
    padding: 15,
    borderRadius: 10,
    alignSelf: "flex-end",
    marginVertical: 10,
    elevation: 5,
    backgroundColor: "#bfdbfe",
  },
  new_translation_txt: {
    fontSize: 15,
    fontFamily: "Calcutta-Regular",
    letterSpacing: 1,
  },
});
