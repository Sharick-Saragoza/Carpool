import { supabase } from '@/context/supabase';
import { Session } from '@supabase/supabase-js';

export async function updateRecord<T extends Record<string, unknown>>({
    session,
    table,
    data,
    matchField = 'id',
    matchValue,
}: {
    session: Session;
    table: string;
    data: T;
    matchField?: string;
    matchValue?: string;
}): Promise<void> {
    if (!session?.user) throw new Error('No user on the session!');

    try {
        const targetMatchValue = matchValue || session.user.id;

        console.log(data);

        const { error } = await supabase
            .from(table)
            .upsert({
                ...data,
                updated_at: new Date(),
            })
            .eq(matchField, targetMatchValue);

        if (error) throw error;
    } catch (error) {
        console.error(`Error updating ${table}:`, error);
        throw error;
    }
}