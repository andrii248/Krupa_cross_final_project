import React, { createContext, useState, useContext, ReactNode } from "react";
import {
  BG_COLOR,
  BORDER_COLOR,
  MUTED_TEXT,
  PRIMARY_TEXT,
  CARD_COLOR,
  DARK_BG_COLOR,
  DARK_PRIMARY_TEXT,
  DARK_BORDER_COLOR,
  DARK_MUTED_TEXT,
  DARK_CARD_COLOR,
} from "../theme/colors";

type ThemeType = "light" | "dark";

type ThemeContextValue = {
  theme: ThemeType;
  toggleTheme: () => void;
  colors: {
    background: string;
    text: string;
    border: string;
    mutedText: string;
    card: string;
  };
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const LIGHT_COLORS = {
  background: BG_COLOR,
  text: PRIMARY_TEXT,
  border: BORDER_COLOR,
  mutedText: MUTED_TEXT,
  card: CARD_COLOR,
};

const DARK_COLORS = {
  background: DARK_BG_COLOR,
  text: DARK_PRIMARY_TEXT,
  border: DARK_BORDER_COLOR,
  mutedText: DARK_MUTED_TEXT,
  card: DARK_CARD_COLOR,
};

type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeType>("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const colors = theme === "light" ? LIGHT_COLORS : DARK_COLORS;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = (): ThemeContextValue => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useThemeContext must be used within ThemeProvider");
  }
  return ctx;
};
