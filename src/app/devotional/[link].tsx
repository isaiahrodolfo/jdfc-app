import PreviewTitleCard from "@/components/cards/PreviewTitleCard";
import { useTabs } from "@/contexts/TabsContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuthContext } from "@/hooks/use-auth-context";
import { useLocalSearchParams } from "expo-router";
import { useRef } from "react";
import {
  Animated,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

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

  console.log(devotional.content.replace(/\n/g, "\\n").replace(/\t/g, "\\t"));

  return (
    <View style={[styles.container, { backgroundColor: theme.secondary }]}>
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
          backgroundColor={"primary"}
        />
        {/* Verse */}
        <View
          style={[
            styles.textContainer,
            {
              backgroundColor: theme.primary,
            },
          ]}
        >
          <Text
            style={{
              fontFamily: fonts.family,
              fontSize: fonts.sizes.h4,
              color: theme.text,
              fontStyle: "italic",
            }}
          >
            {devotional.verse}
          </Text>
        </View>
        {/* Today's Scripture */}
        <View
          style={[
            styles.textContainer,
            {
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: theme.primary,
            },
          ]}
        >
          <Text
            style={{
              fontFamily: fonts.family,
              fontSize: fonts.sizes.h5,
              color: theme.iconSecondary,
              textTransform: "uppercase",
            }}
          >
            Today's Scripture
          </Text>
          <Pressable
            style={[
              styles.passageLinkButton,
              {
                backgroundColor: theme.iconAccent,
              },
            ]}
          >
            <Text
              style={{
                fontFamily: fonts.family,
                fontSize: fonts.sizes.h6,
                color: theme.iconPrimary,
                textDecorationLine: "underline",
              }}
            >
              {devotional.passageReference}
            </Text>
          </Pressable>
        </View>
        {/* Read */}
        <View
          style={[
            styles.textContainer,
            {
              backgroundColor: theme.primary,
            },
          ]}
        >
          <Text
            style={{
              fontFamily: fonts.family,
              fontSize: fonts.sizes.h4,
              color: theme.text,
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
          >
            Read
          </Text>
          {devotional.content
            .replace(/\n\t\t/g, " ")
            .replace(/\n\t/g, " ")
            .replace(/\n/g, "-----------")
            .split("-----------")
            .map((paragraph, index) => (
              <Text
                key={index}
                style={[
                  styles.paragraph,
                  {
                    fontFamily: fonts.family,
                    fontSize: fonts.sizes.h5,
                    color: theme.text,
                  },
                ]}
              >
                {paragraph.replace(/\n/g, " ").trim()}
              </Text>
            ))}
        </View>
        {/* Reflect & Pray */}
        <View
          style={[
            styles.textContainer,
            {
              backgroundColor: theme.primary,
            },
          ]}
        >
          <Text
            style={{
              fontFamily: fonts.family,
              fontSize: fonts.sizes.h4,
              color: theme.text,
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
          >
            Reflect & Pray
          </Text>
          <View style={{ gap: 10 }}>
            <Text
              style={{
                fontFamily: fonts.family,
                fontSize: fonts.sizes.h5,
                color: theme.text,
                fontWeight: "bold",
              }}
            >
              {devotional.response.replace(/\s+/g, " ").trim()}
            </Text>
            <Text
              style={{
                fontFamily: fonts.family,
                fontSize: fonts.sizes.h5,
                color: theme.text,
                fontStyle: "italic",
              }}
            >
              {devotional.thought.replace(/\s+/g, " ").trim()}
            </Text>
          </View>
        </View>
        {/* Insight */}
        <View
          style={[
            styles.textContainer,
            {
              backgroundColor: theme.primary,
            },
          ]}
        >
          <Text
            style={{
              fontFamily: fonts.family,
              fontSize: fonts.sizes.h4,
              color: theme.text,
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
          >
            Insight
          </Text>
          <View style={{ gap: 10 }}>
            <Text
              style={{
                fontFamily: fonts.family,
                fontSize: fonts.sizes.h5,
                color: theme.text,
              }}
            >
              {devotional.insights
                .replace(/\s+/g, " ")
                .replace(/&ldquo;/g, "'")
                .replace(/&rsquo;/g, "'")
                .replace(/&rdquo;/g, "'")
                .trim()}
            </Text>
          </View>
        </View>
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
    gap: 2,
  },

  paragraph: {
    marginBottom: 16,
  },

  textContainer: {
    gap: 16,
    padding: 24,
    borderRadius: 8,
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

  passageLinkButton: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    padding: 8,
  },
});
