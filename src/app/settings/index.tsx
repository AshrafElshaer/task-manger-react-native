import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Text } from "@/components/ui/text";
import { useColorScheme } from "@/hooks/useColorScheme";
import React from "react";
import { View } from "react-native";

export default function SettingPage() {
  const { isDarkColorScheme, toggleColorScheme } = useColorScheme();
  return (
    <View className="flex flex-1 px-2 py-6">
      <View className="flex-row items-center justify-between gap-2">
        <Label nativeID="airplane-mode" onPress={toggleColorScheme}>
          Dark Mode {isDarkColorScheme ? "( On )" : "( Off )"}
        </Label>
        <Switch
          className=""
          checked={isDarkColorScheme}
          onCheckedChange={toggleColorScheme}
          nativeID="airplane-mode"
        />
      </View>
    </View>
  );
}
