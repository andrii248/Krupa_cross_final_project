import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import {
  BG_COLOR,
  BORDER_COLOR,
  PRIMARY_TEXT,
  MUTED_TEXT,
} from "../../theme/colors";
import { useThemeContext } from "../../context/ThemeContext";
import MapPlaceholder from "../../assets/usa_map.png";

export function Settings() {
  const { colors } = useThemeContext();

  return (
    <ScrollView
      style={[styles.safe, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.container}
    >
      <Text style={[styles.title, { color: colors.text }]}>
        Regulations map
      </Text>

      <Text style={[styles.subtitle, { color: colors.mutedText }]}>
        Choose a state to see our complete guid of restrictions and regulations
        for each state
      </Text>

      <View
        style={[
          styles.mapWrapper,
          {
            backgroundColor: colors.background,
            borderColor: colors.border,
          },
        ]}
      >
        <Image source={MapPlaceholder} style={styles.map} />
        <Text style={[styles.helperText, { color: colors.mutedText }]}>
          Tap on a state in the map to view details (placeholder).
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: BG_COLOR,
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: PRIMARY_TEXT,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: PRIMARY_TEXT,
    marginBottom: 16,
  },
  mapWrapper: {
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    borderRadius: 12,
    padding: 8,
    backgroundColor: BG_COLOR,
    height: 360,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  map: {
    width: "100%",
    height: 260,
    borderRadius: 8,
  },
  helperText: {
    marginTop: 12,
    fontSize: 13,
    color: MUTED_TEXT,
  },
});
