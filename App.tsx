import { StatusBar } from "expo-status-bar";
import React from "react";
import Landing from "./src/pages/Landing";
import { AppLoading } from "expo";
// usefonts só é necessária uma importação dele para usar em todas as fontes
import {
  Archivo_400Regular,
  Archivo_700Bold,
  useFonts,
} from "@expo-google-fonts/archivo";
import {
  Poppins_400Regular,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";
import AppStack from "./src/routes/AppStack";

export default function App() {
  let [fontsLoaded] = useFonts({
    Archivo_400Regular,
    Archivo_700Bold,
    Poppins_400Regular,
    Poppins_600SemiBold,
  });
  if (!fontsLoaded) {
    return <AppLoading></AppLoading>;
  } else {
    return (
      <>
      <AppStack></AppStack>
        <StatusBar style="light" />
      </>
    );
  }
}
