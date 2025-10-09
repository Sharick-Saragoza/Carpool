import { supabase } from '@/context/supabase';
import { Session } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

const createMockSession = (): Session => ({
    access_token: 'mock-token',
    token_type: 'bearer',
    expires_in: 3600,
    expires_at: Math.floor(Date.now() / 1000) + 3600,
    refresh_token: 'mock-refresh-token',
    user: {
        id: '1',
        app_metadata: {},
        user_metadata: {
            full_name: 'Development User',
            email: 'dev@example.com',
            phone: '+1234567890',
        },
        aud: 'authenticated',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        email: 'dev@example.com',
        phone: '+1234567890',
        confirmed_at: new Date().toISOString(),
        last_sign_in_at: new Date().toISOString(),
        role: 'authenticated',
        identities: [],
    },
});

export function useAuth() {
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const devMode = process.env.EXPO_PUBLIC_DEV_MODE === 'true';

        if (devMode) {
            setSession(createMockSession());
            setLoading(false);
        } else {
            supabase.auth.getSession().then(({ data: { session } }) => {
                setSession(session);
                setLoading(false);
            });

            const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
                setSession(session);
                setLoading(false);
            });

            return () => subscription.unsubscribe();
        }
    }, []);

    return { session, loading };
}