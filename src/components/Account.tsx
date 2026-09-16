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
  const [website, setWebsite] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const styles = appStyles;

  useEffect(() => {
    if (userId) getProfile();
  }, [userId]);

  async function getProfile() {
    try {
      setLoading(true);

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`website, avatar_url`)
        .eq("id", userId)
        .single();
      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
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
    website,
    avatar_url,
  }: {
    website: string;
    avatar_url: string;
  }) {
    try {
      setLoading(true);

      const updates = {
        id: userId,
        website,
        avatar_url,
        updated_at: new Date(),
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
        <Text style={styles.label}>Website</Text>
        <TextInput
          value={website || ""}
          onChangeText={(text) => setWebsite(text)}
          style={styles.input}
        />
      </View>

      <View style={[styles.verticallySpaced, styles.mt20]}>
        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={() => updateProfile({ website, avatar_url: avatarUrl })}
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
