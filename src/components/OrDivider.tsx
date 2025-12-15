import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { BORDER_COLOR, MUTED_TEXT } from "../theme/colors";

export default function OrDivider() {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <Text style={styles.text}>Or continue with</Text>
      <View style={styles.line} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 32,
    marginBottom: 8,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: BORDER_COLOR,
  },
  text: {
    marginHorizontal: 12,
    color: MUTED_TEXT,
    fontSize: 13,
  },
});
