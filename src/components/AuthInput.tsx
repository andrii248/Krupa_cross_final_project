import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import {
  BG_COLOR,
  BORDER_COLOR,
  MUTED_TEXT,
  PRIMARY_TEXT,
} from "../theme/colors";

type Props = {
  placeholder: string;
  secureTextEntry?: boolean;
  value: string;
  onChangeText: (text: string) => void;
};

export default function AuthInput({
  placeholder,
  secureTextEntry,
  value,
  onChangeText,
}: Props) {
  return (
    <View style={styles.wrapper}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={MUTED_TEXT}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: BG_COLOR,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
  },
  input: {
    fontSize: 16,
    color: PRIMARY_TEXT,
  },
});
