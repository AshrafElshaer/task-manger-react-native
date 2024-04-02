import { supabase } from "@/lib/supabase/supabase";
import { Database } from "./types";
import { useAuth } from "@/stores/auth";
import { generateUUID } from "@/lib/utils";

type Task = Database["public"]["Tables"]["tasks"]["Row"];
export async function createNewTask(task: Omit<Task, "id" | "user_id">) {
  const { session: { user } } = useAuth.getState();

  const { error, data: [newTask] } = await supabase.from("tasks").insert({
    date: task.date,
    text: task.text,
    start_time: task.start_time,
    end_time: task.end_time,
    id: generateUUID(),
    user_id: user.id,
  }).select();

  if (error) {
    throw new Error(error.message);
  }

  return newTask;
}
export async function getAllTasks() {
  const { session: { user } } = useAuth.getState();

  const { error, data: tasks } = await supabase.from("tasks").select().eq("user_id", user.id);

  if (error) {
    throw new Error(error.message);
  }

  return tasks;
}
