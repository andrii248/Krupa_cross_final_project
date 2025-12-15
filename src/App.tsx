import { Assets as NavigationAssets } from "@react-navigation/elements";
import { DarkTheme, DefaultTheme, Theme } from "@react-navigation/native";
import { Asset } from "expo-asset";
import { createURL } from "expo-linking";
import * as SplashScreen from "expo-splash-screen";
import * as React from "react";
import { Navigation } from "./navigation";
import { useThemeContext } from "./context/ThemeContext";

Asset.loadAsync([
  ...NavigationAssets,
  require("./assets/newspaper.png"),
  require("./assets/bell.png"),
]);

SplashScreen.preventAutoHideAsync();

const prefix = createURL("/");

export function App() {
  const { theme } = useThemeContext();

  const navTheme: Theme = theme === "dark" ? DarkTheme : DefaultTheme;

  return (
    <Navigation
      theme={navTheme}
      linking={{
        enabled: "auto",
        prefixes: [prefix],
      }}
      onReady={() => {
        SplashScreen.hideAsync();
      }}
    />
  );
}
