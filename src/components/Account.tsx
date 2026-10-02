import { useEffect, useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { supabase } from "../lib/supabase";
// import Avatar from "./Avatar";
import { appStyles } from "../styles/styles";

// ...

export default function Account({
  userId,
  email,
}: {
  userId: string;
  email?: string;
}) {
  const [loading, setLoading] = useState(true);
  const [facebookLink, setFacebookLink] = useState("");
  const [instagramLink, setInstagramLink] = useState("");
  const [avatarLink, setAvatarLink] = useState("");
  const styles = appStyles;

  useEffect(() => {
    if (userId) getProfile();
  }, [userId]);

  async function getProfile() {
    try {
      setLoading(true);

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`facebook_link, instagram_link, avatar_link`)
        .eq("id", userId)
        .single();
      if (error && status !== 406) {
        throw error;
      }

      if (
        data &&
        data.facebook_link &&
        data.instagram_link &&
        data?.avatar_link
      ) {
        setFacebookLink(data.facebook_link);
        setInstagramLink(data.instagram_link);
        setAvatarLink(data.avatar_link);
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

      const updates = {
        id: userId,
        avatar_link: avatarLink,
        facebook_link: facebookLink,
        instagram_link: instagramLink,
        updated_at: new Date().toISOString(),
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

  return (
    <View style={styles.container}>
      <View>
        {/* ... */}

        <Text style={styles.label}>Email</Text>
        <TextInput
          value={email ?? ""}
          editable={false}
          selectTextOnFocus={false}
          style={[styles.input, styles.inputDisabled]}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Text style={styles.label}>Facebook</Text>
        <TextInput
          value={facebookLink || ""}
          onChangeText={(text) => setFacebookLink(text)}
          style={styles.input}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Text style={styles.label}>Instagram</Text>
        <TextInput
          value={instagramLink || ""}
          onChangeText={(text) => setInstagramLink(text)}
          style={styles.input}
        />
      </View>

      <View style={[styles.verticallySpaced, styles.mt20]}>
        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={() =>
            updateProfile({
              facebookLink,
              instagramLink,
              avatarLink,
            })
          }
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Loading ..." : "Update"}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.verticallySpaced}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => supabase.auth.signOut()}
        >
          <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
