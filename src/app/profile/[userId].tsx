import { getProfile } from "@/api/supabase/profile/getProfile";
import { useTheme } from "@/contexts/ThemeContext";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Database } from "../../../database.types";

// Define explicit TypeScript types extracted from the Supabase Schema
type Profile = Database["public"]["Tables"]["profiles"]["Row"];

export default function ProfilePreviewPage() {
  const { userId } = useLocalSearchParams();
  const { theme, fonts } = useTheme();

  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    if (!userId) {
      setProfile(null);
      return;
    }

    const fetchProfile = async () => {
      const profileData = await getProfile(userId.toString());
      setProfile(profileData);
    };

    fetchProfile();
  }, [userId]);

  if (!profile) {
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

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.primary,
        },
      ]}
    >
      <Text>ProfilePreviewPage</Text>
      <Text>{profile.full_name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 128,
  },
});
