import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { useTheme } from "@/contexts/ThemeContext";
import DividingLine from "./DividingLine";

import {
  getProfileNames,
  ProfileSearchResult,
} from "@/api/supabase/profile/getProfileNames";
import { Lucide } from "@react-native-vector-icons/lucide";
import { useEffect, useState } from "react";

type UserNamesDropdownSmallProps = {
  selectedProfile: ProfileSearchResult | undefined;
  isEditable?: boolean;
  onProfileSelect: (profile: ProfileSearchResult) => void;
};

export default function UserNamesDropdownSmall({
  selectedProfile,
  isEditable = true,
  onProfileSelect,
}: UserNamesDropdownSmallProps) {
  const nonEditableOpacity = 0.7;
  const { theme, fonts } = useTheme();

  const [isOpen, setIsOpen] = useState(false);
  const [nameQuery, setNameQuery] = useState("");
  const [profiles, setProfiles] = useState<ProfileSearchResult[]>([]);

  // Fetch matching profiles whenever the search query changes
  useEffect(() => {
    let isActive = true;

    async function fetchProfiles() {
      try {
        const data = await getProfileNames(nameQuery);

        if (isActive) {
          setProfiles(data);
        }
      } catch (error) {
        console.error("Error fetching profiles:", error);
      }
    }

    fetchProfiles();

    return () => {
      isActive = false;
    };
  }, [nameQuery]);

  // Close dropdown and reset search
  function closeDropdown() {
    setIsOpen(false);
    setNameQuery("");
  }

  // Select a profile
  function handleProfileSelect(profile: ProfileSearchResult) {
    onProfileSelect(profile);
    closeDropdown();
  }

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.accentGray,
          borderColor: theme.primary,
          borderWidth: 1,
          opacity: isEditable ? 1 : nonEditableOpacity,
        },
      ]}
    >
      {isOpen ? (
        <>
          {/* Search input */}
          <View style={styles.firstItemContainer}>
            <TextInput
              style={[
                styles.item,
                {
                  fontFamily: fonts.family,
                  fontSize: fonts.sizes.h6,
                  color: theme.text,
                },
              ]}
              onChangeText={setNameQuery}
              value={nameQuery}
              editable={isEditable}
              placeholder="Search names..."
              placeholderTextColor={theme.text + "80"}
              autoCapitalize="none"
            />

            <Pressable
              style={styles.arrow}
              onPress={closeDropdown}
              disabled={!isEditable}
            >
              <Lucide
                name="chevron-up"
                color={theme.iconAccentAlt}
                size={fonts.sizes.h5}
              />
            </Pressable>
          </View>

          <DividingLine color={theme.accentGraySecondary} />

          {/* Search results */}
          <ScrollView keyboardShouldPersistTaps="handled" nestedScrollEnabled>
            {profiles.length > 0 ? (
              profiles.map((profile) => (
                <Pressable
                  key={profile.userId}
                  onPress={() => handleProfileSelect(profile)}
                  disabled={!isEditable}
                >
                  <Text
                    style={[
                      styles.item,
                      {
                        fontFamily: fonts.family,
                        fontSize: fonts.sizes.h6,
                        color: theme.text,
                      },
                    ]}
                  >
                    {profile.name}
                  </Text>

                  <DividingLine color={theme.accentGraySecondary} />
                </Pressable>
              ))
            ) : (
              <Text
                style={[
                  styles.item,
                  {
                    fontFamily: fonts.family,
                    fontSize: fonts.sizes.h6,
                    color: theme.text,
                    opacity: nonEditableOpacity,
                  },
                ]}
              >
                No profiles found
              </Text>
            )}
          </ScrollView>
        </>
      ) : (
        <Pressable
          onPress={() => setIsOpen(true)}
          disabled={!isEditable}
          style={styles.firstItemContainer}
        >
          <Text
            style={[
              styles.item,
              {
                fontFamily: fonts.family,
                fontSize: fonts.sizes.h6,
                color: theme.text,
              },
            ]}
          >
            {selectedProfile?.name ?? "No name selected"}
          </Text>

          <View style={[styles.arrow, { opacity: isEditable ? 1 : 0 }]}>
            <Lucide
              name="chevron-down"
              color={theme.iconAccentAlt}
              size={fonts.sizes.h5}
            />
          </View>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  firstItemContainer: {
    gap: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 36,
  },
  item: {
    paddingVertical: 8,
  },
  arrow: {
    position: "absolute",
    right: 8,
  },
});
