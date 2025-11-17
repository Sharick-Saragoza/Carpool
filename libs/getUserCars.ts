import { getSupabaseClient } from '@/context/supabase';

export async function getUserCars(userId: string) {
    const supabase = getSupabaseClient();


    const { data, error } = await supabase
        .from('cars')
        .select('*')
        .eq('user_id', userId)
        .limit(1)
        .maybeSingle();

    if (error) throw error;

    if (!data) {
        return null;
    }

    return data;
}