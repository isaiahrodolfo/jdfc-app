import Input from "@/components/miscellaneous/Input";
import WheelDatePicker from "@/components/miscellaneous/WheelDatePicker";
import { useTabs } from "@/contexts/TabsContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuthContext } from "@/hooks/use-auth-context";
import { supabase } from "@/lib/supabase";
import { useState } from "react";
import {
  Alert,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Profile() {
  const { user, isLoading } = useAuthContext();
  const { theme, fonts } = useTheme();
  const { refreshPage } = useTabs();

  const [loading, setLoading] = useState(true);
  const [fullName, setFullName] = useState("");
  const [birthday, setBirthday] = useState(new Date());
  const [facebookLink, setFacebookLink] = useState("");
  const [instagramLink, setInstagramLink] = useState("");
  const [avatarLink, setAvatarLink] = useState("");

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);

    try {
      await refreshPage();
    } finally {
      setRefreshing(false);
    }
  };

  async function getProfile() {
    try {
      setLoading(true);

      let { data, error, status } = await supabase
        .from("profiles")
        .select(
          `full_name, birthday, facebook_link, instagram_link, avatar_link`,
        )
        .eq("id", user.id)
        .single();
      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setFullName(data.full_name ?? "");
        setBirthday(
          data.birthday ? (new Date(data.birthday) ?? "") : new Date(),
        );
        setAvatarLink(data.avatar_link ?? "");
        setFacebookLink(data.facebook_link ?? "");
        setInstagramLink(data.instagram_link ?? "");
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({
    avatarLink,
    facebookLink,
    instagramLink,
  }: {
    avatarLink: string;
    facebookLink: string;
    instagramLink: string;
  }) {
    try {
      setLoading(true);

      const updatedAt = new Date().toISOString();

      const updates = {
        id: user.id,
        avatar_link: avatarLink,
        facebook_link: facebookLink,
        instagram_link: instagramLink,
        updated_at: updatedAt,
      };

      let { error } = await supabase.from("profiles").upsert(updates);

      if (error) {
        throw error;
      }
    } catch (error: any) {
      Alert.alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading profile...</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Please sign in.</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.primary }}
      contentContainerStyle={{
        flexGrow: 1,
        paddingTop: 96,
        paddingBottom: 96,
        paddingHorizontal: 40,
      }}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={theme.iconPrimary}
        />
      }
    >
      <View style={styles.container}>
        <Text
          style={[
            styles.h1,
            {
              fontFamily: fonts.family,
              fontSize: fonts.sizes.h1,
              color: theme.textH1,
            },
          ]}
        >
          Profile
        </Text>
        {/* Account Details */}
        <Text
          style={[
            styles.h2,
            {
              fontFamily: fonts.family,
              fontSize: fonts.sizes.h2,
              color: theme.textH2,
            },
          ]}
        >
          Account Details
        </Text>
        <View style={styles.fieldsContainer}>
          {/* Full Name */}
          <View style={styles.field}>
            <Text
              style={{
                fontFamily: fonts.family,
                fontSize: fonts.sizes.h3,
                fontWeight: "bold",
                color: theme.textAlt,
              }}
            >
              Full Name
            </Text>
            <Input
              value={fullName}
              placeholderText="Full Name"
              autoComplete="name"
              textColor={theme.textAlt}
              placeholderTextColor={theme.textAlt}
              borderColor={theme.textAlt}
              onChangeText={(text) => setFullName(text)}
            />
          </View>
          {/* Birthday */}
          <View style={styles.field}>
            <Text
              style={{
                fontFamily: fonts.family,
                fontSize: fonts.sizes.h3,
                fontWeight: "bold",
                color: theme.textAlt,
              }}
            >
              Birthday
            </Text>
            <WheelDatePicker
              initialDate={birthday}
              onChooseDatePress={(date) => setBirthday(date)}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { gap: 20 },
  fieldsContainer: { gap: 16 },
  field: { gap: 12 },
  h1: {
    fontWeight: "bold",
    textTransform: "uppercase",
    paddingBottom: 24,
  },
  h2: {
    fontWeight: "bold",
    textTransform: "uppercase",
    paddingTop: 0,
  },
});
