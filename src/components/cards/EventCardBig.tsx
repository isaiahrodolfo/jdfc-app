import { useTheme } from "@/contexts/ThemeContext";
import { Alert, Linking, StyleSheet, Text, View } from "react-native";
import ButtonSmall from "../buttons/ButtonSmall";

import { FontAwesome6 } from "@react-native-vector-icons/fontawesome6";
import { Lucide } from "@react-native-vector-icons/lucide";

type EventCardBigProps = {
  title: string;
  subtitle: string;
  livestreamLink: string | null;
};

export default function EventCardBig({
  title,
  subtitle,
  livestreamLink,
}: EventCardBigProps) {
  const { theme, fonts } = useTheme();

  const handleWatchButtonPress = async () => {
    // Open the livestream link in a web browser
    if (!livestreamLink) return;

    // Check if the device has a supported app installed to handle the URL
    const supported = await Linking.canOpenURL(livestreamLink);

    if (supported) {
      // Open the link in the default external browser / window
      await Linking.openURL(livestreamLink);
    } else {
      Alert.alert(`Don't know how to open this URL: ${livestreamLink}`);
    }
  };

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
          {livestreamLink && (
            <ButtonSmall
              text={"Watch"}
              icon={
                <FontAwesome6
                  name="play"
                  color={theme.iconAccent}
                  size={18}
                  iconStyle="solid"
                />
              }
              onPress={handleWatchButtonPress}
            />
          )}
          <ButtonSmall
            text={"Notes"}
            icon={
              <Lucide name="notebook-pen" color={theme.iconAccent} size={18} />
            }
            onPress={() => {}}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
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
    borderRadius: 8,
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
