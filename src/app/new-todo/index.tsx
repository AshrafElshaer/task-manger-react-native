import {
  Button,
  Input,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  Text,
} from "@/components/ui";
import { Calendar } from "@/components/ui/calendar";
import { createNewTask } from "@/db/todos";
import { useColorScheme } from "@/hooks/useColorScheme";
import { NAV_THEME } from "@/lib/constants";
import { useMutation } from "@tanstack/react-query";

import React, { useState } from "react";
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { queryClient } from "../_layout";
import { useRouter } from "expo-router";

const dayHours = Array.from({ length: 24 }, (_, i) => {
  // return hours in 12 hour format and the value in 24 hour format
  const hour = i % 12 || 12;
  const ampm = i < 12 ? "AM" : "PM";
  return {
    label: `${hour}:00 ${ampm}`,
    value: `${i < 10 ? "0" : ""}${i}:00`,
  };
});

export default function NewTodoPage() {
  const router = useRouter();
  const { isDarkColorScheme } = useColorScheme();
  const [newTodo, setNewTodo] = useState("");
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState<{
    label: string;
    value: string;
  }>(null);
  const [endTime, setEndTime] = useState<{
    label: string;
    value: string;
  }>(null);

  const newTodoMutation = useMutation({
    mutationFn: createNewTask,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
      router.back();
    },
    onError: (error) => {
      console.error(error);
    },
  });

  function handleCreateTodo() {
    newTodoMutation.mutate({
      text: newTodo,
      date: date.toISOString().split("T")[0],
      start_time: startTime.value,
      end_time: endTime.value,
    });
  }

  return (
    <KeyboardAvoidingView behavior="padding" className="flex flex-1 gap-2">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="p-4 flex-1 gap-6">
          <Input
            placeholder="Type a todo"
            value={newTodo}
            onChangeText={setNewTodo}
          />
          <View className="flex-row flex gap-2">
            <Select
              value={startTime ?? undefined}
              onValueChange={(value) => setStartTime(value)}
              className="flex-1"
            >
              <SelectTrigger className="w-full">
                <SelectValue
                  className="text-foreground text-sm native:text-lg"
                  placeholder="Start At"
                />
              </SelectTrigger>
              <SelectContent className="w-full h-60" side="bottom">
                <ScrollView>
                  <SelectGroup>
                    <SelectLabel>Start Time</SelectLabel>
                    {dayHours.map((hour) => (
                      <SelectItem
                        key={hour.value}
                        value={hour.value}
                        label={hour.label}
                      >
                        {hour.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </ScrollView>
              </SelectContent>
            </Select>
            <Select
              value={endTime ?? undefined}
              onValueChange={(value) => setEndTime(value)}
              className="flex-1"
            >
              <SelectTrigger className="w-full" disabled={!startTime}>
                <SelectValue
                  className="text-foreground text-sm native:text-lg"
                  placeholder="Ends At"
                />
              </SelectTrigger>
              <SelectContent className="w-full h-60" side="bottom">
                <ScrollView>
                  <SelectGroup>
                    <SelectLabel>End Time</SelectLabel>
                    {dayHours
                      .filter(
                        (time) =>
                          !startTime ||
                          parseInt(time.value.split(":")[0]) >
                            parseInt(startTime.value.split(":")[0])
                      )
                      .map((hour) => (
                        <SelectItem
                          key={hour.value}
                          value={hour.value}
                          label={hour.label}
                          disabled={
                            startTime &&
                            parseInt(hour.value) <=
                              parseInt(startTime.value.split(":")[0])
                          }
                        >
                          {hour.label}
                        </SelectItem>
                      ))}
                  </SelectGroup>
                </ScrollView>
              </SelectContent>
            </Select>
          </View>

          <Calendar
            date={date.toString()}
            onDayPress={(day) => {
              setDate(new Date(day.dateString));
            }}
            markingType="multi-dot"
            markedDates={{
              [date.toISOString().split("T")[0]]: {
                selected: true,
                selectedColor: isDarkColorScheme
                  ? NAV_THEME.dark.primary
                  : NAV_THEME.light.primary,
              },
            }}
          />

          <Button onPress={handleCreateTodo}>
            <Text>Save Changes</Text>
          </Button>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
