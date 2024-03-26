import { supabase } from "@/lib/supabase/supabase";

export async function signInWithEmail({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const {
    error,
    data: { session },
  } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  if (error) throw new Error(error.message);
  return session;
}

export async function signUpWithEmail({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const {
    data: { session },
    error,
  } = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  if (error) throw new Error(error.message);
  return session;
}
