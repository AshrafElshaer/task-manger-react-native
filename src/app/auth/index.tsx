import React from "react";
import { useRouter } from "expo-router";
import * as z from "zod";

import { useForm, Controller, type SubmitErrorHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";

import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";

import { Alert, View } from "react-native";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Label } from "@/components/ui/label";
import { signInWithEmail, signUpWithEmail } from "@/db/auth";

const initState = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters",
  }),
});

type FormValues = z.infer<typeof initState>;

export default function Auth() {
  const router = useRouter();
  const signInMutation = useMutation({
    mutationFn: signInWithEmail,
    onSuccess() {
      router.navigate("/");
      resetForm();
    },
    onError(error, variables, context) {
      Alert.alert(error.message);
    },
  });
  const signUpMutation = useMutation({
    mutationFn: signUpWithEmail,
    onSuccess() {
      router.navigate("/onboarding/");
      resetForm();
    },
    onError(error, variables, context) {
      Alert.alert(error.message);
    },
  });
  const {
    handleSubmit,
    control,
    reset: resetForm,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(initState),
  });

  function onSubmit(data: FormValues, mode: "signIn" | "signUp") {
    const { email, password } = data;
    if (mode === "signIn") {
      signInMutation.mutate({ email, password });
    } else {
      signUpMutation.mutate({ email, password });
    }
  }
  const onError: SubmitErrorHandler<FormValues> = (errors, e) => {
    return console.log(errors);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : null}
      className={"flex flex-1 p-2"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    >
      <ScrollView className="flex flex-1">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View>
            <Text className="text-3xl font-bold text-primary dark:text-foreground text-center pt-12 pb-4">
              Task Master
            </Text>
            <Text className="text-xl font-bold text-muted-foreground text-center pb-12">
              Management App
            </Text>
            <View className="py-2  gap-2">
              <Label nativeID="" className="mb-2">
                Email Address
              </Label>

              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    onBlur={onBlur}
                    onChangeText={(value) => onChange(value)}
                    value={value}
                    placeholder="email@address.com"
                    autoCapitalize={"none"}
                    className={cn(errors.email && "border-destructive")}
                    keyboardType="email-address"
                  />
                )}
                name="email"
                rules={{ required: true }}
              />
              {errors && errors.email && (
                <Text className="text-destructive">
                  {errors.email.message.toString()}
                </Text>
              )}
            </View>
            <View className="py-2 gap-2">
              <Label nativeID="" className="mb-2">
                Password
              </Label>

              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    onBlur={onBlur}
                    onChangeText={(value) => onChange(value)}
                    value={value}
                    placeholder="Password"
                    autoCapitalize={"none"}
                    secureTextEntry={true}
                    className={cn(errors.password && "border-destructive")}
                  />
                )}
                name="password"
                rules={{ required: true }}
              />
              {errors && errors.password && (
                <Text className="text-destructive">
                  {errors.password.message.toString()}
                </Text>
              )}
            </View>
            <View className="py-2 mt-4">
              <Button
                disabled={signInMutation.isPending || signUpMutation.isPending}
                onPress={handleSubmit(
                  (data) => onSubmit(data, "signIn"),
                  onError
                )}
              >
                <Text>Sign in</Text>
              </Button>
            </View>
            <View className="py-2 mt-4">
              <Button
                disabled={signInMutation.isPending || signUpMutation.isPending}
                onPress={handleSubmit(
                  (data) => onSubmit(data, "signUp"),
                  onError
                )}
                variant="outline"
              >
                <Text>Sign up</Text>
              </Button>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
