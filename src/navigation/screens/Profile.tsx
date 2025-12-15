import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { BORDER_COLOR, MUTED_TEXT, PRIMARY_TEXT } from "../../theme/colors";
import { useThemeContext } from "../../context/ThemeContext";

type Props = {
  route?: { params?: { user?: string } };
};

// This screen represents the account / settings view
export function Profile({ route }: Props) {
  const user = route?.params?.user ?? "Lucas Scott";
  const { colors } = useThemeContext();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Settings</Text>

      <View style={styles.card}>
        <Text style={[styles.name, { color: colors.text }]}>{user}</Text>
        <Text style={[styles.handle, { color: colors.mutedText }]}>
          @lucasscott3
        </Text>
      </View>

      <View style={[styles.section, { borderTopColor: colors.border }]}>
        <Text style={[styles.item, { color: colors.text }]}>
          Account details
        </Text>
        <Text style={[styles.item, { color: colors.text }]}>Trucks</Text>
        <Text style={[styles.item, { color: colors.text }]}>Trailers</Text>
        <Text style={[styles.item, { color: colors.text }]}>Notifications</Text>
        <Text style={[styles.item, { color: colors.text }]}>Appearance</Text>
        <Text style={[styles.item, { color: colors.text }]}>Language</Text>
        <Text style={[styles.item, { color: colors.text }]}>
          Privacy & Security
        </Text>
        <Text style={[styles.item, { color: colors.text }]}>Settings</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
    color: PRIMARY_TEXT,
  },
  card: {
    marginBottom: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    color: PRIMARY_TEXT,
  },
  handle: {
    color: MUTED_TEXT,
  },
  section: {
    borderTopWidth: 1,
    borderTopColor: BORDER_COLOR,
    paddingTop: 12,
    gap: 8,
  },
  item: {
    fontSize: 16,
  },
});
