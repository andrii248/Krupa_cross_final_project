import { FontAwesome, Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import {
  APPLE_BLACK,
  BG_COLOR,
  FACEBOOK_BLUE,
  GOOGLE_RED,
} from "../theme/colors";

type Props = {
  onPressGoogle?: () => void;
  onPressApple?: () => void;
  onPressFacebook?: () => void;
};

export default function SocialButtonRow({
  onPressGoogle,
  onPressApple,
  onPressFacebook,
}: Props) {
  return (
    <View style={styles.row}>
      {/* Google */}
      <TouchableOpacity
        style={[styles.circle, styles.google]}
        onPress={onPressGoogle}
      >
        <FontAwesome name="google" size={20} color={BG_COLOR} />
      </TouchableOpacity>

      {/* Apple */}
      <TouchableOpacity
        style={[styles.circle, styles.apple]}
        onPress={onPressApple}
      >
        <Ionicons name="logo-apple" size={22} color={BG_COLOR} />
      </TouchableOpacity>

      {/* Facebook */}
      <TouchableOpacity
        style={[styles.circle, styles.facebook]}
        onPress={onPressFacebook}
      >
        <FontAwesome name="facebook" size={20} color={BG_COLOR} />
      </TouchableOpacity>
    </View>
  );
}

const CIRCLE_SIZE = 40;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
    marginTop: 16,
  },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  google: {
    backgroundColor: GOOGLE_RED,
  },
  apple: {
    backgroundColor: APPLE_BLACK,
  },
  facebook: {
    backgroundColor: FACEBOOK_BLUE,
  },
});
