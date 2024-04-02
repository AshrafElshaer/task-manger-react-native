import React, { useState } from "react";

import { Text } from "@/components/ui/text";

import { useAuth } from "@/stores/auth";

import { useRouter } from "expo-router";
import { View } from "react-native";

import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getAllTasks } from "@/db/todos";

export default function Page() {
  const session = useAuth((state) => state.session);
  const router = useRouter();
  const { data: tasks, isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: getAllTasks,
  });

  return (
    <View className="flex flex-1 bg-background px-4">
      <Header />

      <Button variant="secondary" onPress={() => router.push("/new-todo/")}>
        <Text>Add Todo</Text>
      </Button>

      <View className="flex-1">
        {isLoading ? (
          <Text>Loading...</Text>
        ) : (
          tasks.map((task) => (
            <View key={task.id} className="bg-card p-4 rounded-lg my-2">
              <Text>{task.text}</Text>
            </View>
          ))
        )}
      </View>
    </View>
  );
}
function Header() {
  const { session } = useAuth();

  return (
    <View className=" py-8 flex items-start  justify-start gap-2">
      {session ? (
        <Text className="text-3xl font-semibold">
          Hello {session.user?.user_metadata.full_name.split(" ")[0]},
        </Text>
      ) : null}

      <Text>Hope you having a nice day</Text>
    </View>
  );
}
