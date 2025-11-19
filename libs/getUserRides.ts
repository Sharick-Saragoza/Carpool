import { getSupabaseClient } from "@/context/supabase";

export async function getUserRides(userId: string) {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from('rides')
    .select(`
      *,
      driver:driver_id (
        avatar_url,
        full_name
      )
    `)
    .eq('driver_id', userId);

  if (error) throw error;
  return data;
}