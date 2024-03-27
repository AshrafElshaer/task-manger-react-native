import { useState } from "react";
import { updateUserFullName } from "@/db/user";
import { useRouter } from "expo-router";
import { useMutation } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Text } from "@/components/ui/text";

import { View, TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import Icon from "@/components/icon";

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
              <Icon name="Loader" size={16} />
            </View>
          ) : null}

          <Text>Get Started</Text>
        </Button>
      </View>
    </TouchableWithoutFeedback>
  );
}
