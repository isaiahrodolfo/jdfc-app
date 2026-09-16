// import { Stack } from "expo-router";

// export default function RootLayout() {
//   return (
//     <Stack>
//       {/* The main tab group */}
//       <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//       {/* Individual screens outside the tab structure */}
//       <Stack.Screen name="sermons" options={{ headerShown: true }} />
//       <Stack.Screen name="devotion" options={{ headerShown: true }} />
//       <Stack.Screen name="auth" options={{ headerShown: true }} />
//     </Stack>
//   );
// }

import { useEffect, useState } from "react";
import { View } from "react-native";
import Account from "../components/Account";
import Auth from "../components/Auth";
import { supabase } from "../lib/supabase";

export default function App() {
  const [userId, setUserId] = useState<string | null>(null);
  const [email, setEmail] = useState<string | undefined>(undefined);

  useEffect(() => {
    supabase.auth.getClaims().then(({ data, error }) => {
      if (error) {
        console.error(error);
        return;
      }

      if (data?.claims) {
        setUserId(data.claims.sub);
        setEmail(data.claims.email);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, _session) => {
      const { data, error } = await supabase.auth.getClaims();

      if (error) {
        console.error(error);
        return;
      }

      if (data?.claims) {
        setUserId(data.claims.sub);
        setEmail(data.claims.email);
      } else {
        setUserId(null);
        setEmail(undefined);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <View>
      {userId ? (
        <Account key={userId} userId={userId} email={email} />
      ) : (
        <Auth />
      )}
    </View>
  );
}
