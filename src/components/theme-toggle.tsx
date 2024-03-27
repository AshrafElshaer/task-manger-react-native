import { useColorScheme } from "@/hooks/useColorScheme";
import { Moon, Sun } from "lucide-react-native";
import React from "react";
import { Pressable, Text, View } from "react-native";
import Icon from "./icon";

export default function ThemeToggle() {
  const { toggleColorScheme, isDarkColorScheme } = useColorScheme();
  return (
    <View>
      <Pressable onPress={() => toggleColorScheme()}>
        <Text>{isDarkColorScheme ? "Light" : "Dark"}</Text>
        {isDarkColorScheme ? (
          <Icon name="Moon" size={16} />
        ) : (
          <Icon name="Sun" size={16} />
        )}
      </Pressable>
    </View>
  );
}
