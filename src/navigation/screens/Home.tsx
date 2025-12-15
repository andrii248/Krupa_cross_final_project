import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  Switch,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  BG_COLOR,
  BORDER_COLOR,
  MUTED_TEXT,
  PRIMARY_BLUE,
  PRIMARY_TEXT,
  DARK_BG_COLOR,
  DARK_BORDER_COLOR,
  DARK_MUTED_TEXT,
  DARK_PRIMARY_TEXT,
} from "../../theme/colors";
import { useNavigation } from "@react-navigation/native";
import { useThemeContext } from "../../context/ThemeContext";
import PrimaryButton from "../../components/PrimaryButton";

const MOCK_LOCATIONS = [
  "Chicago, IL",
  "Dallas, TX",
  "Los Angeles, CA",
  "New York, NY",
];

type MyTrip = {
  id: string;
  from: string;
  via?: string;
  to: string;
};

export function Home() {
  const [from, setFrom] = useState("Current location");
  const [via, setVia] = useState("");
  const [to, setTo] = useState("");
  const [showVia, setShowVia] = useState(false);
  const [myTrip, setMyTrip] = useState<MyTrip | null>(null);

  const navigation = useNavigation<any>();
  const { theme, toggleTheme, colors } = useThemeContext();
  const themedStyles = getThemedStyles(theme);

  const isDark = theme === "dark";

  const handleAddStop = () => {
    setShowVia(true);
  };

  const handleGo = () => {
    if (!to.trim()) {
      return;
    }

    const trip: MyTrip = {
      id: Date.now().toString(),
      from: from.trim(),
      via: showVia && via.trim() ? via.trim() : undefined,
      to: to.trim(),
    };

    setMyTrip(trip);

    navigation.navigate("TripDetails", {
      from: trip.from,
      via: trip.via,
      to: trip.to,
    });
  };

  const handleDelete = () => {
    setMyTrip(null);
    setVia("");
    setTo("");
  };

  const routeLabel =
    showVia && via.trim().length > 0
      ? `${from} → ${via} → ${to}`
      : `${from} → ${to}`;

  return (
    <ScrollView
      style={[styles.safe, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.container}
    >
      <View style={themedStyles.headerRow}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          Where to go?
        </Text>

        <View style={themedStyles.themeToggle}>
          <Text style={{ color: colors.text, marginRight: 8 }}>
            {isDark ? "Dark" : "Light"}
          </Text>
          <Switch
            value={isDark}
            onValueChange={toggleTheme}
            trackColor={{ false: BORDER_COLOR, true: PRIMARY_BLUE }}
            thumbColor={isDark ? PRIMARY_BLUE : "#ffffff"}
          />
        </View>
      </View>

      <View style={themedStyles.routeCard}>
        <View style={themedStyles.routeIconColumn}>
          <Ionicons name="ellipse-outline" size={16} color={PRIMARY_BLUE} />
          <View style={themedStyles.routeLine} />
          <Ionicons name="location-outline" size={18} color={PRIMARY_BLUE} />
        </View>

        <View style={styles.routeInputsColumn}>
          <TextInput
            style={themedStyles.routeInput}
            value={from}
            onChangeText={setFrom}
            placeholder="From"
            placeholderTextColor={MUTED_TEXT}
          />
          {showVia && (
            <TextInput
              style={themedStyles.routeInput}
              value={via}
              onChangeText={setVia}
              placeholder="Via"
              placeholderTextColor={MUTED_TEXT}
            />
          )}
          <TextInput
            style={themedStyles.routeInput}
            value={to}
            onChangeText={setTo}
            placeholder="To"
            placeholderTextColor={MUTED_TEXT}
          />
        </View>

        <View style={themedStyles.addStopButton}>
          <Ionicons
            name="add"
            size={22}
            color={PRIMARY_BLUE}
            onPress={handleAddStop}
          />
        </View>
      </View>

      {to.trim().length > 0 && (
        <View style={{ marginTop: 12 }}>
          <Text style={[styles.sectionLabel, { color: colors.mutedText }]}>
            {routeLabel}
          </Text>
          <View style={{ flexDirection: "row", marginTop: 8 }}>
            <View style={{ flex: 1 }}>
              <PrimaryButton title="Go" onPress={handleGo} />
            </View>
            <View style={{ width: 12 }} />
            <View style={{ flex: 1 }}>
              <PrimaryButton title="Delete" onPress={handleDelete} />
            </View>
          </View>
        </View>
      )}

      <Text
        style={[
          styles.sectionLabel,
          { color: colors.mutedText, marginTop: 24 },
        ]}
      >
        Recent searches
      </Text>

      <View style={themedStyles.list}>
        {MOCK_LOCATIONS.map((name, index) => (
          <View key={name} style={themedStyles.listItem}>
            <Ionicons
              name="location-sharp"
              size={18}
              color={PRIMARY_BLUE}
              style={styles.listIcon}
            />
            <View style={styles.listTextColumn}>
              <Text style={[styles.listTitle, { color: colors.text }]}>
                {name}
              </Text>
              <Text style={[styles.listSubtitle, { color: colors.mutedText }]}>
                {index + 3} km • Saved destination
              </Text>
            </View>
          </View>
        ))}
      </View>

      <View style={{ marginTop: 24 }}>
        <Button
          title="Open cart"
          onPress={() => navigation.navigate("Cart")}
          color={PRIMARY_BLUE}
        />
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
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: PRIMARY_TEXT,
    textAlign: "left",
    marginBottom: 16,
  },
  routeCard: {
    flexDirection: "row",
    backgroundColor: BG_COLOR,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    paddingHorizontal: 12,
    paddingVertical: 10,
    alignItems: "flex-start",
    marginBottom: 16,
  },
  routeIconColumn: {
    alignItems: "center",
    paddingTop: 4,
  },
  routeLine: {
    width: 2,
    height: 20,
    backgroundColor: BORDER_COLOR,
    marginVertical: 4,
  },
  routeInputsColumn: {
    flex: 1,
    marginLeft: 8,
  },
  routeInput: {
    backgroundColor: BG_COLOR,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 15,
    marginBottom: 8,
    color: PRIMARY_TEXT,
  },
  addStopButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
    marginTop: 8,
    backgroundColor: BG_COLOR,
  },
  sectionLabel: {
    fontSize: 14,
    color: MUTED_TEXT,
    marginBottom: 8,
    marginLeft: 4,
  },
  list: {
    borderTopWidth: 1,
    borderTopColor: BORDER_COLOR,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: BORDER_COLOR,
  },
  listIcon: {
    marginRight: 12,
  },
  listTextColumn: {
    flex: 1,
  },
  listTitle: {
    fontSize: 16,
    color: PRIMARY_TEXT,
    fontWeight: "500",
  },
  listSubtitle: {
    fontSize: 13,
    color: MUTED_TEXT,
    marginTop: 2,
  },
});

const getThemedStyles = (theme: "light" | "dark") =>
  StyleSheet.create({
    headerRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 16,
    },
    themeToggle: {
      flexDirection: "row",
      alignItems: "center",
    },
    routeCard: {
      ...styles.routeCard,
      backgroundColor: theme === "light" ? BG_COLOR : DARK_BG_COLOR,
      borderColor: theme === "light" ? BORDER_COLOR : DARK_BORDER_COLOR,
    },
    routeIconColumn: {
      ...styles.routeIconColumn,
    },
    routeLine: {
      ...styles.routeLine,
      backgroundColor: theme === "light" ? BORDER_COLOR : DARK_BORDER_COLOR,
    },
    routeInput: {
      ...styles.routeInput,
      backgroundColor: theme === "light" ? BG_COLOR : DARK_BG_COLOR,
      borderColor: theme === "light" ? BORDER_COLOR : DARK_BORDER_COLOR,
      color: theme === "light" ? PRIMARY_TEXT : DARK_PRIMARY_TEXT,
    },
    addStopButton: {
      ...styles.addStopButton,
      backgroundColor: theme === "light" ? BG_COLOR : DARK_BG_COLOR,
      borderColor: theme === "light" ? BORDER_COLOR : DARK_BORDER_COLOR,
    },
    list: {
      ...styles.list,
      borderTopColor: theme === "light" ? BORDER_COLOR : DARK_BORDER_COLOR,
    },
    listItem: {
      ...styles.listItem,
      borderBottomColor: theme === "light" ? BORDER_COLOR : DARK_BORDER_COLOR,
    },
  });
