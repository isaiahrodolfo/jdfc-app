import { getProfile } from "@/api/supabase/profile/getProfile";
import PersonInfoCard from "@/components/cards/PersonInfoCard";
import { useTheme } from "@/contexts/ThemeContext";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
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
      <Image
        style={[styles.avatarImage, { backgroundColor: theme.secondary }]}
        source={{ uri: profile.avatar_link ?? "" }}
      />
      <Text
        style={{
          fontFamily: fonts.family,
          fontSize: fonts.sizes.h3,
          color: theme.text,
          fontWeight: "bold",
        }}
      >
        {profile.full_name}
      </Text>
      <PersonInfoCard
        birthday={profile.birthday ?? ""}
        facebookLink={profile.facebook_link ?? ""}
        instagramLink={profile.instagram_link ?? ""}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: (128 + 196) / 2,
    gap: 36,
  },
  avatarImage: {
    width: 196,
    height: 196,
    borderRadius: 196 / 2,
  },
});
