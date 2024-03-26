import React from "react";
import SignoutButton from "@/components/signout-button";
import ThemeToggle from "@/components/theme-toggle";

import { Text } from "@/components/ui/text";

import { useAuth } from "@/stores/auth";

import { Link } from "expo-router";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { supabase } from "@/lib/supabase/supabase";

export default function Page() {
  const session = useAuth((state) => state.session);
 

  return (
    <View className="flex flex-1 bg-background">
      <Header />
      {session && (
        <Text className="test-foreground text-center text-lg font-medium">
          Welcome {session.user?.user_metadata.full_name}
        </Text>
      )}
      <Content />
      <Footer />
    </View>
  );
}

function Content() {
  return (
    <View className="flex-1">
      <View className="py-12 md:py-24 lg:py-32 xl:py-48">
        <View className="px-4 md:px-6">
          <View className="flex flex-col items-center gap-4 text-center">
            <Text
              role="heading"
              className="text-3xl text-foreground text-center native:text-5xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl"
            >
              Welcome to Project ACME
            </Text>
            <Text className="mx-auto max-w-[700px] text-lg text-center text-gray-500 md:text-xl dark:text-gray-400">
              Discover and collaborate on amce. Explore our services now.
            </Text>

            <View className="gap-4">
              <Link
                suppressHighlighting
                className="flex h-9 items-center justify-center overflow-hidden rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-medium  web:shadow ios:shadow transition-colors  "
                href="/"
              >
                Explore
              </Link>
              <Link
                suppressHighlighting
                className="flex h-9 items-center justify-center overflow-hidden rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-medium  web:shadow ios:shadow transition-colors  "
                href="/onboarding/"
              >
                onboarding
              </Link>
              <SignoutButton />
              <ThemeToggle />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

function Header() {
  const { top } = useSafeAreaInsets();

  return (
    <View>
      <View className="px-4 lg:px-6 h-14 flex items-center flex-row justify-between ">
        <Link className="font-bold flex-1 items-center justify-center" href="/">
          ACME
        </Link>
        <View className="flex flex-row gap-4 sm:gap-6">
          <Link href="/">About</Link>
          <Link
            className="text-md font-medium hover:underline web:underline-offset-4"
            href="/"
          >
            Product
          </Link>
          <Link
            className="text-md font-medium hover:underline web:underline-offset-4"
            href="/"
          >
            Pricing
          </Link>
        </View>
      </View>
    </View>
  );
}

function Footer() {
  const { bottom } = useSafeAreaInsets();
  return (
    <View
      className="flex shrink-0 bg-gray-100 native:hidden"
      style={{ paddingBottom: bottom }}
    >
      <View className="py-6 flex-1 items-start px-4 md:px-6 ">
        <Text className={"text-center text-gray-700"}>
          © {new Date().getFullYear()} Me
        </Text>
      </View>
    </View>
  );
}
