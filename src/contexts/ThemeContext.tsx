// src/context/ThemeContext.tsx
import React, { createContext, useContext } from "react";
import { useColorScheme } from "react-native";
import { Colors, Fonts, Spacing } from "../constants/theme"; // Match paths

type ThemeType = typeof Colors.light;

interface ThemeContextProps {
  theme: ThemeType;
  fonts: typeof Fonts;
  spacing: typeof Spacing;
  isDarkMode: boolean;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const scheme = useColorScheme();
  const isDarkMode = scheme === "dark";

  // Select active runtime color mode configuration block cleanly
  const theme = isDarkMode ? Colors.dark : Colors.light;

  return (
    <ThemeContext.Provider
      value={{ theme, fonts: Fonts, spacing: Spacing, isDarkMode }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error(
      "useTheme must be enclosed completely within a <ThemeProvider /> structural root context.",
    );
  }
  return context;
}
