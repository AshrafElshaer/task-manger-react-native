import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Text } from "@/components/ui/text";
import { updateUserFullName } from "@/db/user";
import { supabase } from "@/lib/supabase/supabase";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { Loader } from "lucide-react-native";
import { useEffect, useState } from "react";
import { View, TouchableWithoutFeedback, Keyboard, Alert } from "react-native";

export default function OnboardingPage() {
  const [fullName, setFullName] = useState("");

  const router = useRouter();
  const updateUserFullNameMutaion = useMutation({
    mutationFn: updateUserFullName,
    onSuccess() {
      router.navigate("/");
    },
    onError(error, variables, context) {
      Alert.alert(error.message);
    },
  });

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
          onPress={() => updateUserFullNameMutaion.mutate({ fullName })}
          className="flex-row gap-4"
          disabled={updateUserFullNameMutaion.isPending || !fullName}
        >
          {updateUserFullNameMutaion.isPending ? (
            <View className="animate-spin text-primary-foreground">
              <Loader color={"white"} size={16} />
            </View>
          ) : null}

          <Text>Get Started</Text>
        </Button>
      </View>
    </TouchableWithoutFeedback>
  );
}
