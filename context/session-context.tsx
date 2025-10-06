import type { Session } from '@supabase/supabase-js';
import { createContext, useContext } from 'react';

type SessionContextType = {
    session: Session;
};

export const sessionContext = createContext<SessionContextType | null>(null);

export function useSession() {
    const ctx = useContext(sessionContext);
    if (!ctx) {
        throw new Error('useSession must be inside a SessionProvider');
    }
    return ctx.session;
}