// src/constants/Theme.ts
import "@/global.css";
import { Platform } from "react-native";

const COLORS = {
  INDIGO_1: "#081739",
  INDIGO_2: "#172645",
  INDIGO_3: "#24314E",
  INDIGO_4: "#384768",
  INDIGO_5: "#66738F",
  INDIGO_6: "#D2D7E2",
  WHITE: "#FDF9EC",

  YELLOW_1: "#F5D78F",
  YELLOW_2: "#F1C154",
  YELLOW_LIGHT: "#F9EDC8",
  YELLOW_DARK: "#23221B",

  GREEN_1: "#82FF89",
  GREEN_2: "#64E061",
  GREEN_LIGHT: "#DEF9C8",
  GREEN_DARK: "#1B241B",

  BLUE_1: "#83C5E7",
  BLUE_2: "#49B7F1",
  BLUE_LIGHT: "#B1E2FB",
  BLUE_DARK: "#162027",

  PURPLE_1: "#ABAAF0",
  PURPLE_2: "#7573EE",
  PURPLE_LIGHT: "#CAC9F1",
  PURPLE_DARK: "#171A21",

  GRAY_DARK: "#2E3137",
  GRAY_LIGHT: "#A9AFBA",
};

export const Colors = {
  light: {
    primary: COLORS.INDIGO_1,
    primaryAlt: COLORS.INDIGO_2,
    secondary: COLORS.INDIGO_3,
    secondaryAlt: COLORS.INDIGO_4,
    accent: COLORS.YELLOW_2,
    accentAlt: COLORS.YELLOW_1,
    accentGray: COLORS.GRAY_DARK,
    accentGrayAlt: COLORS.GRAY_LIGHT,
    accentOpposite: COLORS.INDIGO_6,
    text: COLORS.WHITE,
    textAlt: COLORS.INDIGO_6,
    textAccent: COLORS.INDIGO_3,
    iconPrimary: COLORS.INDIGO_6,
    iconSecondary: COLORS.INDIGO_5,
    iconAccent: COLORS.INDIGO_3,

    // Yellow
    yellow: COLORS.YELLOW_2,
    yellowShadow: COLORS.YELLOW_DARK,
    yellowPrimaryEnabled: COLORS.YELLOW_2,
    yellowPrimaryDisabled: COLORS.INDIGO_5,
    yellowSecondaryEnabled: COLORS.YELLOW_1,
    yellowSecondaryDisabled: COLORS.YELLOW_LIGHT,

    // Green
    green: COLORS.GREEN_2,
    greenShadow: COLORS.GREEN_DARK,
    greenPrimaryEnabled: COLORS.GREEN_2,
    greenPrimaryDisabled: COLORS.INDIGO_5,
    greenSecondaryEnabled: COLORS.GREEN_1,
    greenSecondaryDisabled: COLORS.GREEN_LIGHT,

    // Blue
    blue: COLORS.BLUE_2,
    blueShadow: COLORS.BLUE_DARK,
    bluePrimaryEnabled: COLORS.BLUE_2,
    bluePrimaryDisabled: COLORS.INDIGO_5,
    blueSecondaryEnabled: COLORS.BLUE_1,
    blueSecondaryDisabled: COLORS.BLUE_LIGHT,

    // Purple
    purple: COLORS.PURPLE_2,
    purpleShadow: COLORS.PURPLE_DARK,
    purplePrimaryEnabled: COLORS.PURPLE_2,
    purplePrimaryDisabled: COLORS.INDIGO_5,
    purpleSecondaryEnabled: COLORS.PURPLE_1,
    purpleSecondaryDisabled: COLORS.PURPLE_LIGHT,
  },
  dark: {
    primary: COLORS.INDIGO_1,
    primaryAlt: COLORS.INDIGO_2,
    secondary: COLORS.INDIGO_3,
    secondaryAlt: COLORS.INDIGO_4,
    accent: COLORS.YELLOW_2,
    accentAlt: COLORS.YELLOW_1,
    accentGray: COLORS.GRAY_DARK,
    accentGrayAlt: COLORS.GRAY_LIGHT,
    accentOpposite: COLORS.INDIGO_6,
    text: COLORS.WHITE,
    textAlt: COLORS.INDIGO_6,
    textAccent: COLORS.INDIGO_3,
    iconPrimary: COLORS.INDIGO_6,
    iconSecondary: COLORS.INDIGO_5,
    iconAccent: COLORS.INDIGO_3,

    // Yellow
    yellow: COLORS.YELLOW_2,
    yellowShadow: COLORS.YELLOW_DARK,
    yellowPrimaryEnabled: COLORS.YELLOW_2,
    yellowPrimaryDisabled: COLORS.INDIGO_5,
    yellowSecondaryEnabled: COLORS.YELLOW_1,
    yellowSecondaryDisabled: COLORS.YELLOW_LIGHT,

    // Green
    green: COLORS.GREEN_2,
    greenShadow: COLORS.GREEN_DARK,
    greenPrimaryEnabled: COLORS.GREEN_2,
    greenPrimaryDisabled: COLORS.INDIGO_5,
    greenSecondaryEnabled: COLORS.GREEN_1,
    greenSecondaryDisabled: COLORS.GREEN_LIGHT,

    // Blue
    blue: COLORS.BLUE_2,
    blueShadow: COLORS.BLUE_DARK,
    bluePrimaryEnabled: COLORS.BLUE_2,
    bluePrimaryDisabled: COLORS.INDIGO_5,
    blueSecondaryEnabled: COLORS.BLUE_1,
    blueSecondaryDisabled: COLORS.BLUE_LIGHT,

    // Purple
    purple: COLORS.PURPLE_2,
    purpleShadow: COLORS.PURPLE_DARK,
    purplePrimaryEnabled: COLORS.PURPLE_2,
    purplePrimaryDisabled: COLORS.INDIGO_5,
    purpleSecondaryEnabled: COLORS.PURPLE_1,
    purpleSecondaryDisabled: COLORS.PURPLE_LIGHT,
  },
} as const;

export type ThemeColor = keyof typeof Colors.light;

export const Fonts = {
  family: Platform.select({
    ios: "Glacial Indifference",
    android: "GlacialIndifference",
    default: "sans-serif",
  }),
  sizes: {
    h1: 40,
    h2: 30,
    h3: 24,
    h4: 20,
    bodyLarge: 18,
    body: 14,
    caption: 12,
    tiny: 10,
  } as const,
};

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
