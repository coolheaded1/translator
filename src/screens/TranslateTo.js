import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import request from "../component/request";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { BarIndicator } from "react-native-indicators";
import { StatusBar } from "expo-status-bar";

const BASE_URL = request.BASE_URL;
const API_KEY = request.API_KEY;

const data = [
  {
    code: "yo",
    name: "Yoruba",
  },
  {
    code: "ha",
    name: "Hausa",
  },
  {
    code: "ig",
    name: "Igbo",
  },
  {
    code: "fr",
    name: "French",
  },
];
export default function TranslateTo({ language, languageName, setLanguage }) {
  const navigation = useNavigation();
  const [lang, setLang] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      // getLanguages();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const getLanguages = async () => {
    setIsLoading(true);
    try {
      let { data } = await axios.get(`${BASE_URL}/language/list`, {
        headers: {
          "X-RapidAPI-Key": API_KEY,
          "X-RapidAPI-Host": "translef-translator.p.rapidapi.com",
        },
      });
      setLang(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  const renderItem = ({ item }) => {
    return (
      <View>
        {languageName === item.name ? (
          <TouchableOpacity
            style={[styles.lang_btn, { backgroundColor: "#93c5fd" }]}
            activeOpacity={0.6}
            onPress={() => (
              setLanguage({
                code: item.code,
                name: item.name,
              }),
              navigation.goBack()
            )}
          >
            <View style={{ flexDirection: "row" }}>
              <View style={{ justifyContent: "center" }}>
                <Text style={styles.lang_txt}>{item.name}</Text>
              </View>
              <View style={{ flex: 1 }} />
              <View style={{ justifyContent: "center" }}>
                <MaterialIcons name="check-circle" size={24} color="#1e3a8a" />
              </View>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.lang_btn}
            activeOpacity={0.6}
            onPress={() => (
              setLanguage({
                code: item.code,
                name: item.name,
              }),
              navigation.goBack()
            )}
          >
            <Text style={styles.lang_txt}>{item.name}</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <>
      <StatusBar style="dark" backgroundColor="#f1f5f9" />

      {isLoading && (
        <View style={styles.loading_animation}>
          <BarIndicator
            color="#2563eb"
            size={20}
            count={3}
            style={{ alignSelf: "center", marginTop: 30 }}
          />
        </View>
      )}
      <View style={{ paddingBottom: 10 }}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          style={{ paddingHorizontal: 20, backgroundColor: "#f1f5f9" }}
        />
      </View>
      {/* <View style={styles.select_box}>
            <TouchableOpacity style={styles.select_btn} activeOpacity={0.9}>
               <Text style={styles.select_txt}>confirm selection</Text>
            </TouchableOpacity>
         </View> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f5f9",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  lang_btn: {
    padding: 15,
    borderRadius: 5,
    backgroundColor: "#e5e7eb",
    marginVertical: 5,
  },
  lang_txt: {
    fontSize: 15,
    fontFamily: "Calcutta-Regular",
  },
  select_btn: {
    padding: 15,
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: "#4b5563",
  },
  select_txt: {
    fontSize: 15,
    fontFamily: "Calcutta-Bold",
    textTransform: "capitalize",
    color: "white",
  },
  select_box: {
    paddingHorizontal: 20,
    position: "absolute",
    bottom: 0,
    backgroundColor: "#f1f5f9",
    width: "100%",
    paddingVertical: 10,
  },
  loading_animation: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  loading_txt: {
    fontSize: 20,
    letterSpacing: 2,
    fontFamily: "Calcutta-Regular",
    color: "#94a3b8",
  },
});
