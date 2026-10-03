import { getNotes } from "@/api/supabase/notes/getNotes";
import { saveNotes } from "@/api/supabase/notes/saveNotes";
import PreviewTitleCard from "@/components/cards/PreviewTitleCard";
import { dateFormatter } from "@/components/helpers/dateFormatter";
import NoteEditor, {
  type NoteEditorHandle,
} from "@/components/miscellaneous/NoteEditor";
import { useTabs } from "@/contexts/TabsContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuthContext } from "@/hooks/use-auth-context";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
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

  const [isTakingNotes, setIsTakingNotes] = useState<boolean>(false);
  const [notesHtml, setNotesHtml] = useState("");
  const [editorHeight, setEditorHeight] = useState(300);
  const [editorAvailableHeight, setEditorAvailableHeight] = useState(0);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const devotional =
    devotionals.find((devotional) => devotional.dateKey === dateKey) ?? null;

  const scrollY = useRef(new Animated.Value(0)).current;
  const noteEditorRef = useRef<NoteEditorHandle>(null);

  useEffect(() => {
    const showSubscription = Keyboard.addListener(
      "keyboardDidShow",
      (event) => {
        setKeyboardHeight(event.endCoordinates.height);
      },
    );

    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardHeight(0);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  useEffect(() => {
    if (!user || !link) return;

    let isActive = true;
    getNotes(user.id, link.toString(), "devotional")
      .then((html) => {
        if (isActive) setNotesHtml(html);
      })
      .catch((error: unknown) => {
        console.error("Error loading devotional notes:", error);
      });

    return () => {
      isActive = false;
    };
  }, [link, user]);

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

  const handleTakeNotesPress = () => {
    if (isTakingNotes) {
      void noteEditorRef.current?.saveAndClose().catch((error: unknown) => {
        console.error("Error saving devotional notes:", error);
      });
    } else {
      setIsTakingNotes(true);
    }
  };

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
    <View style={[styles.container, { backgroundColor: theme.secondary }]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.contentContainer,
          isTakingNotes && { paddingBottom: editorHeight + keyboardHeight + 4 },
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
      >
        <View style={styles.imageContainer}>
          <Image source={{ uri: devotional.imageUrl }} style={styles.image} />
        </View>

        <PreviewTitleCard
          title={devotional.title.toString() || "No Title"}
          category={dateFormatter("date").format(date)}
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
        {/* Take Notes Button */}
        <Pressable
          style={[styles.button, { backgroundColor: theme.iconPrimary }]}
          onPress={handleTakeNotesPress}
        >
          <Text
            style={{
              fontFamily: fonts.family,
              fontSize: fonts.sizes.h4,
              color: theme.iconAccent,
              textTransform: "uppercase",
              fontWeight: "bold",
              // TODO: Add notes icon
            }}
          >
            {isTakingNotes ? "Save Notes" : "Take Notes"}
          </Text>
        </Pressable>
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
          <View style={{ gap: 24, marginBottom: 8 }}>
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
          <View style={{ gap: 8, marginBottom: 8 }}>
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
      </ScrollView>

      {isTakingNotes && (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={0}
          style={styles.noteEditorOverlay}
          pointerEvents="box-none"
        >
          <View
            style={styles.noteEditorOverlayContent}
            pointerEvents="box-none"
            onLayout={(event) => {
              setEditorAvailableHeight(event.nativeEvent.layout.height);
            }}
          >
            <NoteEditor
              ref={noteEditorRef}
              initialContent={notesHtml}
              onSaveNotes={async (html) => {
                setNotesHtml(html);
                if (!user) {
                  throw new Error(
                    "Cannot save devotional notes without a user.",
                  );
                }
                await saveNotes(
                  user,
                  html,
                  link.toString(),
                  "devotional",
                  devotional.title,
                  devotional.dateKey,
                );
              }}
              onClose={() => setIsTakingNotes(false)}
              height={editorHeight}
              maxHeight={editorAvailableHeight * 0.8}
              onHeightChange={setEditorHeight}
              keyboardAvoiding={false}
              showDoneButton={false}
              backgroundColor={theme.primary}
              accentColor={theme.iconSecondary}
              borderColor={theme.iconAccent}
              textColor={theme.text}
              fontFamily={fonts.family}
            />
          </View>
        </KeyboardAvoidingView>
      )}
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
    marginBottom: 8,
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

  button: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    gap: 12,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },

  noteEditorOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
    elevation: 100,
  },

  noteEditorOverlayContent: {
    flex: 1,
    justifyContent: "flex-end",
  },
});
