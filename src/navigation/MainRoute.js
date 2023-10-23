import React, { useState, useEffect } from "react";
import { View, Button } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

import HomeScreen from "../screens/HomeScreen";
import TranslateTo from "../screens/TranslateTo";
import Translate from "../screens/Translate";

export default function MainRoute({ language, languageName, setLanguage }) {
   return (
      <NavigationContainer>
         <Stack.Navigator
            // initialRouteName="Dashboard"
            screenOptions={{
               headerShown: false,
               headerPressColorAndroid: "rgba(0, 150, 49, 0.1)",
            }}
         >
            <Stack.Screen
               name="HomeScreen"
               children={() => (
                  <HomeScreen
                     language={language}
                     languageName={languageName}
                     setLanguage={setLanguage}
                  />
               )}
               options={{
                  headerShown: true,
                  headerTitle: "Text Translate",
                  headerStyle: {
                     backgroundColor: "#f1f5f9",
                  },
                  headerTitleStyle: {
                     fontSize: 20,
                     fontFamily: "Calcutta-Bold",
                     color: "#475569",
                  },
                  headerTitleAlign: "center",
                  headerShadowVisible: false,
               }}
            />
            <Stack.Screen
               name="TranslateTo"
               children={() => (
                  <TranslateTo
                     language={language}
                     languageName={languageName}
                     setLanguage={setLanguage}
                  />
               )}
               options={{
                  headerShown: true,
                  headerTitle: "Translate To",
                  headerStyle: {
                     backgroundColor: "#f1f5f9",
                  },
                  headerTitleStyle: {
                     fontSize: 20,
                     fontFamily: "Calcutta-Bold",
                     color: "#475569",
                  },
                  headerTitleAlign: "center",
                  headerShadowVisible: false,
               }}
            />
            <Stack.Screen
               name="Translate"
               component={Translate}
               options={{
                  headerShown: true,
                  headerTitle: "Nigerian Mobile Translation App",
                  headerStyle: {
                     backgroundColor: "#f1f5f9",
                  },
                  headerTitleStyle: {
                     fontSize: 18,
                     fontFamily: "Calcutta-Bold",
                     color: "#475569",
                  },
                  headerTitleAlign: "center",
                  headerShadowVisible: false,
               }}
            />
         </Stack.Navigator>
      </NavigationContainer>
   );
}
