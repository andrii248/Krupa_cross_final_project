// Trips screen: loads trips from API and shows list
import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { fetchTrips } from "../../api";
import { TripCard } from "../../components/TripCard";
import PrimaryButton from "../../components/PrimaryButton";
import { ERROR_RED, PRIMARY_BLUE } from "../../theme/colors";
import { useThemeContext } from "../../context/ThemeContext";

type Trip = { id: number; title: string; body: string };

type TripsScreenNavigation = {
  navigate: (screen: string, params?: { itemId?: number }) => void;
};

// Trips tab: shows list of trips loaded from API
export function TripsScreen() {
  const navigation = useNavigation<TripsScreenNavigation>();
  const { colors } = useThemeContext();

  const [data, setData] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load trips data from API on first render
    fetchTrips()
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={PRIMARY_BLUE} />
        <Text style={[styles.loadingText, { color: colors.mutedText }]}>
          Loading trips...
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <Text style={[styles.errorText, { color: ERROR_RED }]}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <TripCard
            item={item}
            onPress={(id: number) =>
              navigation.navigate("TripDetails", { itemId: id })
            }
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          <View style={styles.footer}>
            <PrimaryButton
              title="New trip"
              onPress={() => console.log("New trip")}
            />
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
  },
  errorText: {
    fontSize: 16,
    textAlign: "center",
  },
  list: {
    paddingBottom: 20,
  },
  footer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
});
