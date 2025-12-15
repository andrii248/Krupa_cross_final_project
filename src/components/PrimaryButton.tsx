import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { BG_COLOR, PRIMARY_BLUE } from "../theme/colors";

type Props = {
  title: string;
  onPress: () => void;
};

export default function PrimaryButton({ title, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: PRIMARY_BLUE,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
  },
  text: {
    color: BG_COLOR,
    fontSize: 16,
    fontWeight: "600",
  },
});
