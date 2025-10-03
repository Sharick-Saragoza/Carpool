import Account from '@/components/accounts';
import { supabase } from '@/utils/supabase';
import { Session } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { View } from 'react-native';

export default function App() {
    const [session, setSession] = useState<Session | null>(null);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });
    }, []);

    return (
        <View>
            {session ? (
                <Account key={session.user.id} session={session} />
            ) : (
                <View>
                    Please log in
                </View>
            )}
        </View>
    );
}