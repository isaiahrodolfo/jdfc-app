import { ThemeProvider } from "@/contexts/ThemeContext";
import AuthProvider from "@/providers/auth-provider";
import SermonsPageProvider from "@/providers/sermons-page-provider";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ToastivaProvider } from "toastiva";
import Auth from "../components/pages/Auth";
import { supabase } from "../lib/supabase";

export default function RootLayout() {
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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ToastivaProvider>
          <ThemeProvider>
            <AuthProvider>
              <SermonsPageProvider>
                {userId ? (
                  <Stack>
                    {/* The main tab group */}
                    <Stack.Screen
                      name="(tabs)"
                      options={{ headerShown: false }}
                    />
                    {/* Individual screens outside the tab structure */}
                    <Stack.Screen
                      name="sermonTrack"
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="educationTrack"
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="devotional"
                      options={{
                        headerTitle: "",
                        headerShown: true,
                        headerBackButtonDisplayMode: "minimal", // Circle back button
                        headerTransparent: true,
                      }}
                    />
                    <Stack.Screen
                      name="info/[link]"
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="lesson/[lessonId]"
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="profile"
                      options={{
                        headerTitle: "",
                        headerShown: true,
                        headerBackButtonDisplayMode: "minimal", // Circle back button
                        headerTransparent: true,
                      }}
                    />
                    <Stack.Screen
                      name="scheduleEvent"
                      options={{
                        headerTitle: "",
                        headerShown: true,
                        headerBackButtonDisplayMode: "minimal", // Circle back button
                        headerTransparent: true,
                      }}
                    />
                  </Stack>
                ) : (
                  <Auth />
                )}
              </SermonsPageProvider>
            </AuthProvider>
          </ThemeProvider>
        </ToastivaProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
