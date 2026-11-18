import { ThemeProvider } from "@/contexts/ThemeContext";
import AuthProvider from "@/providers/auth-provider";
import SermonsPageProvider from "@/providers/sermons-page-provider";
import { YouVersionProvider } from "@youversion/platform-react-hooks";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ToastivaProvider } from "toastiva";
import Auth from "../components/pages/Auth";
import { supabase } from "../lib/supabase";

function getYouVersionAppKey(): string {
  const appKey = process.env.EXPO_PUBLIC_YOUVERSION_APP_KEY;
  if (!appKey) {
    throw new Error(
      "Missing EXPO_PUBLIC_YOUVERSION_APP_KEY. Add it to your local Expo environment.",
    );
  }
  return appKey;
}

export default function RootLayout() {
  const youVersionAppKey = getYouVersionAppKey();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserId(session?.user.id ?? null);
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
              <YouVersionProvider appKey={youVersionAppKey}>
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
                        name="devotional/[odbUrl]"
                        options={{ headerShown: false }}
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
              </YouVersionProvider>
            </AuthProvider>
          </ThemeProvider>
        </ToastivaProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
