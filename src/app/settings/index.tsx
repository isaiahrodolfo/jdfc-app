import ButtonBig from "@/components/buttons/ButtonBig";
import LessonCategoryCard from "@/components/miscellaneous/LessonCategoryCard";
import { getFamilyAdminStatus } from "@/api/supabase/profile/getFamilyAdminStatus";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuthContext } from "@/hooks/use-auth-context";
import { supabase } from "@/lib/supabase";
import Feather from "@react-native-vector-icons/feather";
import { router, Stack } from "expo-router";
import { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { toastiva } from "toastiva";

export default function Settings() {
  const { user } = useAuthContext();
  const { fonts, theme } = useTheme();
  const [familyAdminStatus, setFamilyAdminStatus] = useState<{
    userId: string;
    isAdmin: boolean;
  } | null>(null);
  const isFamilyAdmin =
    familyAdminStatus?.userId === user?.id &&
    familyAdminStatus?.isAdmin === true;

  useEffect(() => {
    let isActive = true;

    async function loadFamilyAdminStatus() {
      if (!user?.id) return;

      try {
        const isAdmin = await getFamilyAdminStatus(user.id);
        if (isActive) {
          setFamilyAdminStatus({
            userId: user.id,
            isAdmin,
          });
        }
      } catch (error) {
        console.error("Error loading family admin status:", error);
        if (isActive) {
          setFamilyAdminStatus({ userId: user.id, isAdmin: false });
          toastiva.error("Failed to load family admin status");
        }
      }
    }

    void loadFamilyAdminStatus();

    return () => {
      isActive = false;
    };
  }, [user?.id]);

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
          {isFamilyAdmin && (
            <LessonCategoryCard
              color={theme.accentGrayAlt}
              titleHeading={"Edit Family Profiles"}
              onPress={handleEditFamilyPress}
            />
          )}
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
