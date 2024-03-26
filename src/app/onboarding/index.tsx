import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Text } from "@/components/ui/text";
import { supabase } from "@/lib/supabase/supabase";
import { useRouter } from "expo-router";
import { Loader } from "lucide-react-native";
import { useEffect, useState } from "react";
import { View, TouchableWithoutFeedback, Keyboard, Alert } from "react-native";

export default function OnboardingPage() {
  const [fullName, setFullName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleOnboarding() {
    if (!fullName) {
      return Alert.alert("Please enter your full name");
    }
    setIsLoading(true);
    const { error } = await supabase.auth.updateUser({
      data: {
        full_name: fullName,
      },
    });
    setIsLoading(false);
    if (error) {
      return Alert.alert(error.message);
    }

    router.navigate("/");
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex flex-1 p-2 pt-12 gap-4 ">
        <Text className="text-3xl text-foreground text-center">
          Welcome Onboard
        </Text>
        <Text className="text-xl text-muted-foreground text-center">
          We will need some information to get started
        </Text>
        <View className="gap-4 items-start">
          <Label
            nativeID="name"
            className="text-lg text-foreground text-center"
          >
            What's your full name?
          </Label>
          <Input
            nativeID="name"
            className="text-lg text-foreground w-full"
            placeholder="John Doe"
            value={fullName}
            onChangeText={setFullName}
            autoCapitalize="words"
          />
        </View>
        <Button
          onPress={handleOnboarding}
          className="flex-row gap-4"
          disabled={isLoading}
        >
          {isLoading ? (
            <View className="animate-spin text-primary-foreground">
              <Loader  color={"white"} size={16} />
            </View>
          ) : null}

          <Text>Get Started</Text>
        </Button>
      </View>
    </TouchableWithoutFeedback>
  );
}
