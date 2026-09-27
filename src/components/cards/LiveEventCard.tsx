import { useTheme } from "@/contexts/ThemeContext";
import { StyleSheet, Text, View } from "react-native";
import ButtonSmall from "../buttons/ButtonSmall";

import NotesIcon from "@/assets/icons/NotesIndigo3.svg";
import PlayIcon from "@/assets/icons/PlayIndigo3.svg";

type LiveEventCardProps = {
  title: string;
  subtitle: string;
};

export default function LiveEventCard({ title, subtitle }: LiveEventCardProps) {
  const { theme, fonts } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.topHalf}>
        <View
          style={[
            styles.liveIconContainer,
            {
              backgroundColor: theme.iconAccentAlt,
            },
          ]}
        >
          <View style={styles.liveIcon}></View>
        </View>
      </View>
      <View
        style={[
          styles.bottomHalf,
          {
            backgroundColor: theme.secondary,
          },
        ]}
      >
        <View style={styles.textColumn}>
          <Text
            style={{
              fontFamily: fonts.family,
              fontSize: fonts.sizes.h4,
              fontWeight: "bold",
              color: theme.text,
            }}
          >
            {title}
          </Text>
          {subtitle && (
            <Text
              style={{
                fontFamily: fonts.family,
                fontSize: fonts.sizes.h6,
                fontStyle: "italic",
                color: theme.text,
              }}
            >
              {subtitle}
            </Text>
          )}
        </View>
        <View style={styles.buttonsContainer}>
          <ButtonSmall text={"Watch"} icon={PlayIcon} />
          <ButtonSmall text={"Notes"} icon={NotesIcon} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 330, // testing
  },
  topHalf: {
    width: "100%",
    height: 190, // testing
    borderTopLeftRadius: 4,
    borderTopRightRadius: 8,

    backgroundColor: "#d1d1d1", // testing
  },
  liveIconContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    top: 0,
    right: 0,
    width: 42,
    height: 42,
    borderBottomLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  liveIcon: {
    width: 16,
    height: 16,
    backgroundColor: "#DB3737", // TODO: dynamically set color based on theme
    borderRadius: "50%",
  },
  bottomHalf: {
    padding: 16,
    gap: 12,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  textColumn: {
    gap: 4,
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: 12,
  },
});
