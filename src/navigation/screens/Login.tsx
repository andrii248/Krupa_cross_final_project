import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import AuthInput from "../../components/AuthInput";
import LogoHeader from "../../components/LogoHeader";
import OrDivider from "../../components/OrDivider";
import PrimaryButton from "../../components/PrimaryButton";
import SocialButtonRow from "../../components/SocialButtonRow";
import TextLink from "../../components/TextLink";
import { useThemeContext } from "../../context/ThemeContext";

export function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigation = useNavigation<any>();
  const { colors } = useThemeContext();

  const handleLogin = () => {
    navigation.replace("HomeTabs");
  };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.topBlock}>
          <LogoHeader />
          <Text style={[styles.welcome, { color: colors.text }]}>Welcome!</Text>
        </View>

        <View style={styles.formBlock}>
          <AuthInput
            placeholder="Email Address"
            value={email}
            onChangeText={setEmail}
          />
          <AuthInput
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <View style={styles.forgotRow}>
            <TextLink
              text="Forgot password?"
              onPress={() => console.log("Forgot password")}
            />
          </View>

          <PrimaryButton title="Login" onPress={handleLogin} />

          <View style={styles.registerRow}>
            <Text style={[styles.muted, { color: colors.mutedText }]}>
              Not a member?{" "}
            </Text>
            <TextLink
              text="Register now"
              onPress={() => console.log("Register")}
            />
          </View>
        </View>

        <View style={styles.footerBlock}>
          <OrDivider />
          <SocialButtonRow
            onPressGoogle={() => console.log("Google")}
            onPressApple={() => console.log("Apple")}
            onPressFacebook={() => console.log("Facebook")}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  topBlock: {
    alignItems: "center",
    marginTop: 16,
    marginBottom: 16,
  },
  welcome: {
    fontSize: 28,
    fontWeight: "700",
    marginTop: 16,
    marginBottom: 24,
  },
  formBlock: {
    marginBottom: 8,
  },
  forgotRow: {
    alignSelf: "flex-start",
    marginTop: 8,
    marginBottom: 16,
  },
  registerRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 8,
    marginBottom: 4,
  },
  muted: {
    fontSize: 14,
  },
  footerBlock: {
    marginTop: 4,
    marginBottom: 8,
  },
});
