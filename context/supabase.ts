import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Platform } from 'react-native';
import 'react-native-get-random-values';

let _supabase: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient | null {
    const devMode = process.env.EXPO_PUBLIC_DEV_MODE === 'true';

    if (devMode) {
        console.log('[DEV MODE] Supabase client skipped');
        return null;
    }

    if (_supabase) return _supabase;

    const supabaseUrl = 'https://bsrearsgsuxczojykypr.supabase.co';
    const supabasePublishableKey = process.env.EXPO_PUBLIC_DB_ANON_KEY;

    if (!supabasePublishableKey) {
        throw new Error('Missing Supabase public key');
    }

    _supabase = createClient(supabaseUrl, supabasePublishableKey, {
        auth: {
            storage: Platform.OS === 'web' ? window.localStorage : AsyncStorage,
            autoRefreshToken: true,
            persistSession: true,
            detectSessionInUrl: false,
        },
    });

    return _supabase;
}