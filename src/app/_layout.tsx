import "../global.css";

import * as React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "@/stores/auth";
import { Theme, ThemeProvider } from "@react-navigation/native";
import { SplashScreen, Stack, useRouter } from "expo-router";
import { Platform, TouchableOpacity } from "react-native";
import { NAV_THEME } from "@/lib/constants";
import { useColorScheme } from "@/hooks/useColorScheme";
import { supabase } from "@/lib/supabase/supabase";
            import { PortalHost } from "@/components/primitives/portal";

import { StatusBar } from "expo-status-bar";
import NetInfo from "@react-native-community/netinfo";
import {
  onlineManager,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import Icon from "@/components/icon";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";


onlineManager.setEventListener((setOnline) => {
  return NetInfo.addEventListener((state) => {
    setOnline(!!state.isConnected);
  });
});

const LIGHT_THEME: Theme = {
  dark: false,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  dark: true,
  colors: NAV_THEME.dark,
};
export const queryClient = new QueryClient();

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// Prevent the splash screen from auto-hiding before getting the color scheme.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter();
  const { colorScheme, setColorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);
  const setSession = useAuth((state) => state.setSession);

  React.useEffect(() => {
    (async () => {
      const theme = await AsyncStorage.getItem("theme");
      if (Platform.OS === "web") {
        // Adds the background color to the html element to prevent white background on overscroll.
        document.documentElement.classList.add("bg-background");
      }
      if (!theme) {
        AsyncStorage.setItem("theme", colorScheme);
        setIsColorSchemeLoaded(true);
        return;
      }
      const colorTheme = theme === "dark" ? "dark" : "light";
      if (colorTheme !== colorScheme) {
        setColorScheme(colorTheme);

        setIsColorSchemeLoaded(true);
        return;
      }
      setIsColorSchemeLoaded(true);
    })().finally(() => {
      SplashScreen.hideAsync();
    });
  }, []);

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.navigate("/auth/");
      }
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  if (!isColorSchemeLoaded) {
    return null;
  }

  return (
    <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
      <QueryClientProvider client={queryClient}>
        <GestureHandlerRootView>
          <BottomSheetModalProvider>
            <StatusBar style={isDarkColorScheme ? "light" : "dark"} />
            <Stack>
              <Stack.Screen
                name="index"
                options={{
                  headerTitle: "Home",
                  headerBackButtonMenuEnabled: false,
                  headerRight(props) {
                    return (
                      <TouchableOpacity
                        onPress={() => router.push("/settings/")}
                      >
                        <Icon name="Settings" size={20} />
                      </TouchableOpacity>
                    );
                  },
                }}
              />
              <Stack.Screen
                name="onboarding/index"
                options={{
                  headerTitle: "Onboarding",
                  headerBackButtonMenuEnabled: false,
                  headerBackVisible: false,
                  gestureEnabled: false,
                }}
              />
              <Stack.Screen
                name="auth/index"
                options={{
                  headerTitle: "Sign In",
                  headerBackButtonMenuEnabled: false,
                  headerBackVisible: false,
                  gestureEnabled: false,
                }}
              />
              <Stack.Screen
                name="settings/index"
                options={{
                  headerTitle: "Settings",
                  headerLeft: () => (
                    <TouchableOpacity onPress={router.back}>
                      <Icon name="ChevronLeft" size={24} />
                    </TouchableOpacity>
                  ),
                }}
              />
              <Stack.Screen
                name="new-todo/index"
                options={{
                  headerTitle: "New Todo",
                  headerLeft: () => (
                    <TouchableOpacity onPress={router.back}>
                      <Icon name="ChevronLeft" size={24} />
                    </TouchableOpacity>
                  ),
                }}
              />
            </Stack>
            <PortalHost />
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
