import { useColorScheme } from "@/hooks/useColorScheme";
import { Moon, Sun } from "lucide-react-native";
import React from "react";
import { Pressable, Text, View } from "react-native";

export default function ThemeToggle() {
  const { toggleColorScheme, isDarkColorScheme } = useColorScheme();
  return (
    <View>
      <Pressable onPress={() => toggleColorScheme()}>
        <Text>{isDarkColorScheme ? "Light" : "Dark"}</Text>
        {isDarkColorScheme ? <Moon /> : <Sun />}
      </Pressable>
    </View>
  );
}
