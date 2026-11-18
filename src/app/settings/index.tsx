import LessonCategoryCard from "@/components/miscellaneous/LessonCategoryCard";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuthContext } from "@/hooks/use-auth-context";
import { router, Stack } from "expo-router";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Settings() {
  const { user } = useAuthContext();
  const { fonts, theme } = useTheme();

  const handleEditProfilePress = () => {
    router.push({
      pathname: "/settings/[userId]",
      params: {
        userId: user.id,
      },
    });
  };

  const handleEditFamilyPress = () => {
    router.push({
      pathname: "/settings/familyMembersList",
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={0}
      style={[styles.keyboardContainer, { backgroundColor: theme.primary }]}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <Stack.Screen
            options={{
              headerTitle: "",
              headerShown: true,
              headerBackButtonDisplayMode: "minimal", // Circle back button
              headerTransparent: true,
            }}
          />
          <Text
            style={[
              styles.h2,
              {
                fontFamily: fonts.family,
                fontSize: fonts.sizes.h2,
                color: theme.textAlt,
              },
            ]}
          >
            Settings
          </Text>
          <LessonCategoryCard
            color={theme.accentGrayAlt}
            titleHeading={"Edit Your Profile"}
            onPress={handleEditProfilePress}
          />
          <LessonCategoryCard
            color={theme.accentGrayAlt}
            titleHeading={"Edit Family Profiles"}
            onPress={handleEditFamilyPress}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    paddingTop: 96,
    paddingBottom: 24,
    paddingHorizontal: 40,
  },
  container: { paddingBottom: 96, gap: 20, top: 64 },
  h2: {
    fontWeight: "bold",
    textTransform: "uppercase",
    paddingBottom: 24,
  },
});
