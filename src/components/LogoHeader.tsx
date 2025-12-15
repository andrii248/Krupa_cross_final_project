import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { PRIMARY_BLUE } from "../theme/colors";

export default function LogoHeader() {
  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo.png")} style={styles.logo} />
      <Text style={styles.title}>PERMIT ELITE</Text>
    </View>
  );
}

const LOGO_SIZE = 140;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 56,
    marginBottom: 32,
  },
  logo: {
    width: LOGO_SIZE,
    height: LOGO_SIZE,
    marginBottom: 16,
    resizeMode: "contain",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: PRIMARY_BLUE,
    letterSpacing: 1.2,
  },
});
