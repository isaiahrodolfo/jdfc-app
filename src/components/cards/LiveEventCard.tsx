import { Icons } from "@/constants/theme";
import { useTheme } from "@/contexts/ThemeContext";
import { StyleSheet, View } from "react-native";
import ButtonSmall from "../buttons/ButtonSmall";

type LiveEventCardProps = {
  title: string;
  subtitle: string;
  iconName: "play" | "notes";
};

export default function LiveEventCard({
  title,
  subtitle,
  iconName,
}: LiveEventCardProps) {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.topHalf}>
        <View
          style={[
            styles.liveIconContainer,
            {
              backgroundColor: theme.accentAlt,
            },
          ]}
        >
          <View style={styles.liveIcon}></View>
        </View>
      </View>
      <View style={styles.bottomHalf}>
        <View style={styles.textColumn}></View>
        <View style={styles.buttonsContainer}></View>
        <ButtonSmall text={iconName} iconUri={Icons.accent[iconName]} />
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
  },
  liveIconContainer: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  liveIcon: {
    backgroundColor: "#DB3737", // TODO: dynamically set color based on theme
  },
  bottomHalf: {
    padding: 16,
    gap: 12,
  },
  textColumn: {
    gap: 4,
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: 12,
  },
});
