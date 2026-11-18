import ButtonBig from "@/components/buttons/ButtonBig";
import Input from "@/components/miscellaneous/Input";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuthContext } from "@/hooks/use-auth-context";
import { supabase } from "@/lib/supabase";
import DateTimePicker from "@react-native-community/datetimepicker";

import Feather from "@react-native-vector-icons/feather";
import FontAwesome from "@react-native-vector-icons/fontawesome";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { toastiva } from "toastiva";

export default function EditProfilePage() {
  const { user } = useAuthContext();
  const { userId } = useLocalSearchParams();
  const { theme, fonts } = useTheme();

  const [isSaveProfileLoading, setIsSaveProfileLoading] = useState(true);
  const [fullName, setFullName] = useState("");
  const [birthday, setBirthday] = useState(new Date());
  const [facebookLink, setFacebookLink] = useState("");
  const [instagramLink, setInstagramLink] = useState("");
  const [avatarLink, setAvatarLink] = useState("");

  useEffect(() => {
    getProfile();
  }, [userId]);

  async function getProfile() {
    try {
      setIsSaveProfileLoading(true);

      let { data, error, status } = await supabase
        .from("profiles")
        .select(
          `full_name, birthday, facebook_link, instagram_link, avatar_link`,
        )
        .eq("id", userId?.toString() ?? "")
        .single();
      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setFullName(data.full_name ?? "");
        setAvatarLink(data.avatar_link ?? "");
        setFacebookLink(data.facebook_link ?? "");
        setInstagramLink(data.instagram_link ?? "");

        if (data.birthday) {
          const [year, month, day] = data.birthday.split("-").map(Number);
          setBirthday(new Date(year, month - 1, day));
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setIsSaveProfileLoading(false);
    }
  }

  async function updateProfile() {
    try {
      setIsSaveProfileLoading(true);

      const updatedAt = new Date().toISOString();

      const birthdayString = [
        birthday.getFullYear(),
        String(birthday.getMonth() + 1).padStart(2, "0"),
        String(birthday.getDate()).padStart(2, "0"),
      ].join("-");

      const updates = {
        id: userId?.toString() ?? "",
        full_name: fullName,
        avatar_link: avatarLink,
        facebook_link: facebookLink,
        instagram_link: instagramLink,
        updated_at: updatedAt,
        birthday: birthdayString,
      };

      let { error } = await supabase.from("profiles").upsert(updates);

      if (error) {
        throw error;
      }
    } catch (error: any) {
      Alert.alert(error.message);
    } finally {
      setIsSaveProfileLoading(false);
    }
  }

  async function logOut() {
    const { error } = await supabase.auth.signOut({ scope: "local" });

    if (error) {
      toastiva.error("Failed to log out");
    }
  }

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
              styles.h1,
              {
                fontFamily: fonts.family,
                fontSize: fonts.sizes.h1,
                color: theme.textH1,
              },
            ]}
          >
            {user.id === userId ? "Your Profile" : `${fullName}'s Profile`}
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
                  fontSize: fonts.sizes.h4,
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
                fontFamily={fonts.family}
                textColor={theme.textAlt}
                placeholderTextColor={theme.iconSecondary}
                borderColor={theme.textAlt}
                onChangeText={(text) => setFullName(text)}
              />
            </View>
            {/* Birthday */}
            <View style={styles.field}>
              <Text
                style={{
                  fontFamily: fonts.family,
                  fontSize: fonts.sizes.h4,
                  fontWeight: "bold",
                  color: theme.textAlt,
                }}
              >
                Birthday
              </Text>
              <DateTimePicker
                mode="date"
                value={birthday}
                onValueChange={(_, selectedDate) => {
                  if (selectedDate) {
                    setBirthday(selectedDate);
                  }
                }}
              />
            </View>
            {/* Facebook Link */}
            <View style={styles.field}>
              <Text
                style={{
                  fontFamily: fonts.family,
                  fontSize: fonts.sizes.h4,
                  fontWeight: "bold",
                  color: theme.textAlt,
                }}
              >
                Facebook Link
              </Text>
              <Input
                value={facebookLink}
                placeholderText="facebook.com/your-profile"
                autoComplete="off"
                fontFamily={fonts.family}
                textColor={theme.textAlt}
                placeholderTextColor={theme.iconSecondary}
                borderColor={theme.textAlt}
                onChangeText={(text) => setFacebookLink(text)}
              />
            </View>
            {/* Instagram Link */}
            <View style={styles.field}>
              <Text
                style={{
                  fontFamily: fonts.family,
                  fontSize: fonts.sizes.h4,
                  fontWeight: "bold",
                  color: theme.textAlt,
                }}
              >
                Instagram Link
              </Text>
              <Input
                value={instagramLink}
                placeholderText="instagram.com/your-profile"
                autoComplete="off"
                fontFamily={fonts.family}
                textColor={theme.textAlt}
                placeholderTextColor={theme.iconSecondary}
                borderColor={theme.textAlt}
                onChangeText={(text) => setInstagramLink(text)}
              />
            </View>
          </View>
          <ButtonBig
            icon={
              <FontAwesome
                name="save"
                color={theme.iconAccent}
                size={fonts.sizes.h4}
              />
            }
            text={isSaveProfileLoading ? "Loading..." : "Save Edits"}
            textColor={isSaveProfileLoading ? theme.textAlt : theme.textAccent}
            backgroundColor={
              isSaveProfileLoading ? theme.secondary : theme.iconSecondary
            }
            onButtonPress={updateProfile}
          />
          {user.id === userId && (
            <ButtonBig
              icon={
                <Feather
                  name="log-out"
                  color={theme.iconSecondary}
                  size={fonts.sizes.h4}
                />
              }
              text={"Log Out"}
              textColor={theme.iconSecondary}
              backgroundColor={theme.secondary}
              onButtonPress={logOut}
            />
          )}
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
  fieldsContainer: { gap: 16, paddingRight: 24 },
  field: { gap: 8 },
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
