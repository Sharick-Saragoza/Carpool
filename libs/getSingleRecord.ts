import { getSupabaseClient } from '@/context/supabase';

export async function getSingleRecord<T>(
    table: string,
    userId: string,
    matchField: string = 'id',
): Promise<T | null> {
    const supabase = getSupabaseClient();

    try {
        const { data, error, status } = await supabase
            .from(table)
            .select('*')
            .eq(matchField, userId)
            .single();

        if (error && status !== 406) throw error;

        return data as T | null;
    } catch (error) {
        if (error instanceof Error) throw error;
        return null;
    }
}