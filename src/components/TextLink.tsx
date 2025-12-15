import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { PRIMARY_BLUE } from "../theme/colors";

type Props = {
  text: string;
  onPress: () => void;
};

export default function TextLink({ text, onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.link}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  link: {
    color: PRIMARY_BLUE,
    fontSize: 14,
    fontWeight: "600",
  },
});
