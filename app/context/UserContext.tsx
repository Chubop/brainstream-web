// UserContext.tsx
import React, { createContext, useState, useEffect, FC, ReactNode } from 'react';
import { createSupabaseFrontendClient } from '../auth/supabase';

interface UserProviderProps {
    children: ReactNode;
}

export const UserContext = createContext<string | null>(null);

export const UserProvider: FC<UserProviderProps> = ({ children }) => {
    const [userId, setUserId] = useState<string | null>(null);
    const supabaseClient = createSupabaseFrontendClient();

    useEffect(() => {
        const loadSession = async () => {
        try {
            const { data } = await supabaseClient.auth.getSession();
            if (data.session?.user?.id) {
            setUserId(data.session.user.id);
            }
        } catch (error) {
            console.error('Error fetching session:', error);
        }
        };

        loadSession();
    }, [supabaseClient]);
    return <UserContext.Provider value={userId}>{children}</UserContext.Provider>;
};