import PreviewTitleCard from "@/components/cards/PreviewTitleCard";
import { useTabs } from "@/contexts/TabsContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuthContext } from "@/hooks/use-auth-context";
import { useLocalSearchParams } from "expo-router";
import { useRef } from "react";
import { Animated, Image, StyleSheet, View } from "react-native";

const IMAGE_HEIGHT = 192;

export default function DevotionPage() {
  const { user } = useAuthContext();
  const { theme, fonts } = useTheme();
  const { link, title, dateKey } = useLocalSearchParams();
  const { devotionals } = useTabs();

  const devotional =
    devotionals.find((devotional) => devotional.dateKey === dateKey) ?? null;

  const scrollY = useRef(new Animated.Value(0)).current;

  if (!devotional) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.primary,
        }}
      />
    );
  }

  const date = new Date(devotional.dateKey);

  /*
   * The ScrollView itself moves the image upward by scrollY.
   *
   * We add this translation back so that:
   *
   * 0px scroll     -> image at 0
   * 100px scroll   -> image at -100
   * 192px scroll   -> image at -192
   * 300px scroll   -> image stays at -192
   *
   * This means the image moves normally until its bottom
   * reaches the top of the screen, then clamps there.
   */
  const imageTranslateY = scrollY.interpolate({
    inputRange: [0, IMAGE_HEIGHT, IMAGE_HEIGHT + 1],
    outputRange: [0, 0, 1],
    extrapolate: "clamp",
  });

  return (
    <View style={[styles.container, { backgroundColor: theme.primary }]}>
      <Animated.ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: scrollY,
                },
              },
            },
          ],
          {
            useNativeDriver: true,
          },
        )}
      >
        <Animated.View
          style={[
            styles.imageContainer,
            {
              transform: [
                {
                  translateY: imageTranslateY,
                },
              ],
            },
          ]}
        >
          <Image source={{ uri: devotional.imageUrl }} style={styles.image} />
        </Animated.View>

        <PreviewTitleCard
          title={devotional.title.toString() || "No Title"}
          category={date.toDateString()}
          subtitle={devotional.author.toString() || "No Author"}
          hasTopAccent={false}
        />
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  scrollView: {
    flex: 1,
  },

  contentContainer: {
    paddingTop: IMAGE_HEIGHT,
  },

  imageContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: IMAGE_HEIGHT,
    zIndex: 1,
  },

  image: {
    width: "100%",
    height: "100%",
  },
});
