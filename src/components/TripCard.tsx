// Trip card component for Trips list
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { PRIMARY_BLUE } from "../theme/colors";
import { useThemeContext } from "../context/ThemeContext";

type TripCardProps = {
  item: { id: number; title: string; body: string };
  onPress: (id: number) => void;
};

export function TripCard({ item, onPress }: TripCardProps) {
  const { colors } = useThemeContext();

  return (
    <TouchableOpacity
      style={[
        styles.card,
        {
          backgroundColor: colors.background,
          borderBottomColor: colors.border,
        },
      ]}
      onPress={() => onPress(item.id)}
    >
      <View
        style={[
          styles.iconContainer,
          {
            backgroundColor: colors.background,
          },
        ]}
      >
        <Ionicons name="map-outline" size={24} color={PRIMARY_BLUE} />
      </View>

      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>{item.title}</Text>
        <Text
          style={[styles.subtitle, { color: colors.mutedText }]}
          numberOfLines={2}
        >
          {item.body}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
  },
});
