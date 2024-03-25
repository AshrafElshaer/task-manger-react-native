import React from "react";
import { useRouter } from "expo-router";
import { supabase } from "@/lib/supabase/supabase";
import { Button, buttonTextVariants } from "./ui/button";
import { Text } from "./ui/text";

export default function SignoutButton() {
  const router = useRouter();
  function signOut() {
    supabase.auth.signOut().then(() => {
      router.navigate("/auth/");
    });
  }
  return (
    <Button variant="destructive" onPress={signOut} size="sm">
      <Text
        className={buttonTextVariants({ variant: "destructive", size: "sm" })}
      >
        Sign Out
      </Text>
    </Button>
  );
}
