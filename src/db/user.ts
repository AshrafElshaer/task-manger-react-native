import { supabase } from "@/lib/supabase/supabase";

export async function updateUserFullName({
  fullName,
}: {
  fullName: string;
}) {
  const { error, data: { user } } = await supabase.auth.updateUser({
    data: {
      full_name: fullName,
    },
  });
  if (error) throw new Error(error.message);
  return user;
}
