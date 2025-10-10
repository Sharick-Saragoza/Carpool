import { getSupabaseClient } from '@/context/supabase';

export async function saveCarData({
    userId,
    carId,
    brand,
    model,
    seats,
    color,
}: {
    userId: string;
    carId?: string;
    brand: string;
    model: string;
    seats: number;
    color: string;
}): Promise<string> {
    const supabase = getSupabaseClient();

    if (carId) {
        const { error } = await supabase
            .from('cars')
            .update({ brand, model, seats, color, updated_at: new Date().toISOString() })
            .eq('id', carId);
        if (error) throw error;
        return carId;
    }

    const { data, error } = await supabase
        .from('cars')
        .insert([{ user_id: userId, brand, model, seats, color }])
        .select()
        .single();

    if (error) throw error;
    return data.id;
}