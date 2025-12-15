import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { BG_COLOR, MUTED_TEXT, PRIMARY_TEXT } from "../../theme/colors";
import MapPlaceholder from "../../assets/usa_map.png";
import { useThemeContext } from "../../context/ThemeContext";

type TripDetailsRouteParams = {
  itemId?: number;
  from?: string;
  via?: string;
  to?: string;
};

type TripDetailsProps = {
  route: { params?: TripDetailsRouteParams };
};

// Trip details screen navigated from Trips list or Home
export function TripDetails({ route }: TripDetailsProps) {
  const { colors } = useThemeContext();
  const { itemId, from, via, to } = route.params ?? {};

  // Case when trip comes from Home screen with from/to(/via)
  if (from && to) {
    const routeLabel = via ? `${from} → ${via} → ${to}` : `${from} → ${to}`;

    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.title, { color: colors.text }]}>{routeLabel}</Text>

        <View style={styles.mapContainer}>
          <Image source={MapPlaceholder} style={styles.mapImage} />
        </View>

        <Text style={[styles.details, { color: colors.mutedText }]}>
          Static map preview for this trip.
        </Text>
      </View>
    );
  }

  // Case when trip comes from Trips list with itemId from API
  if (itemId) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.title, { color: colors.text }]}>
          Trip #{itemId}
        </Text>

        <View style={styles.mapContainer}>
          <Image source={MapPlaceholder} style={styles.mapImage} />
        </View>

        <Text style={[styles.details, { color: colors.mutedText }]}>
          Trip details.
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>
        No trip selected
      </Text>
      <Text style={[styles.details, { color: colors.mutedText }]}>
        Trip details are not available.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: BG_COLOR,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: PRIMARY_TEXT,
    marginBottom: 16,
  },
  mapContainer: {
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 16,
  },
  mapImage: {
    width: "100%",
    height: 220,
    resizeMode: "cover",
  },
  details: {
    fontSize: 16,
    color: MUTED_TEXT,
    lineHeight: 24,
  },
});
