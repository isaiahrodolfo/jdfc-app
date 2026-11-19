import { getFamilyMembers } from "@/api/supabase/profile/getFamilyMembers";
import LessonCategoryCard from "@/components/miscellaneous/LessonCategoryCard";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuthContext } from "@/hooks/use-auth-context";
import { router, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Database } from "../../../database.types";

// Define explicit TypeScript types extracted from the Supabase Schema
type Profile = Database["public"]["Tables"]["profiles"]["Row"];

export default function FamilyMembersList() {
  const { user } = useAuthContext();
  const { fonts, theme } = useTheme();

  const [familyProfiles, setFamilyProfiles] = useState<Profile[] | null>(null);

  useEffect(() => {
    getFamilyMembers(user.id).then((data) => setFamilyProfiles(data));
  });

  const handleFamilyMemberPress = (userId: string) => {
    router.push({
      pathname: "/settings/[userId]",
      params: {
        userId: userId,
      },
    });
  };

  return (
    <ScrollView
      style={[styles.scrollView, { backgroundColor: theme.primary }]}
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
          Edit Family Members
        </Text>
        {familyProfiles?.map(
          (profile) =>
            profile.id !== user.id && (
              <LessonCategoryCard
                key={profile.id}
                color={null}
                titleHeading={profile.full_name ?? ""}
                onPress={() => handleFamilyMemberPress(profile.id)}
              />
            ),
        )}
      </View>
    </ScrollView>
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
