import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';

import { supabase } from '@/lib/supabase';

export type AuthStatus = 'loading' | 'not-configured' | 'error' | 'needs-username' | 'ready';

type AuthContextValue = {
  status: AuthStatus;
  username: string | null;
  retry: () => void;
  saveUsername: (name: string) => Promise<boolean>;
  deleteAccount: () => Promise<boolean>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<AuthStatus>(supabase ? 'loading' : 'not-configured');
  const [userId, setUserId] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  // Restores the saved account, or silently creates an anonymous one on first launch.
  const bootstrap = useCallback(async () => {
    if (!supabase) return;
    setStatus('loading');
    try {
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) throw sessionError;

      let user = sessionData.session?.user ?? null;
      if (!user) {
        const { data, error } = await supabase.auth.signInAnonymously();
        if (error) throw error;
        user = data.user;
      }
      if (!user) throw new Error('No user after anonymous sign-in');

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('username')
        .eq('id', user.id)
        .maybeSingle();
      if (profileError) throw profileError;

      setUserId(user.id);
      setUsername(profile?.username ?? null);
      setStatus(profile ? 'ready' : 'needs-username');
    } catch (error) {
      console.warn('Sign-in failed', error);
      setStatus('error');
    }
  }, []);

  useEffect(() => {
    bootstrap();
  }, [bootstrap]);

  const saveUsername = useCallback(
    async (name: string) => {
      if (!supabase || !userId) return false;
      const { error } = await supabase.from('profiles').upsert({ id: userId, username: name });
      if (error) {
        console.warn('Saving username failed', error);
        return false;
      }
      setUsername(name);
      setStatus('ready');
      return true;
    },
    [userId],
  );

  const deleteAccount = useCallback(async () => {
    if (!supabase) return false;
    const { error } = await supabase.rpc('delete_my_account');
    if (error) {
      console.warn('Deleting account failed', error);
      return false;
    }
    // The server account is gone; clear this device, then start fresh like a new install.
    await supabase.auth.signOut({ scope: 'local' });
    setUserId(null);
    setUsername(null);
    await bootstrap();
    return true;
  }, [bootstrap]);

  return (
    <AuthContext.Provider value={{ status, username, retry: bootstrap, saveUsername, deleteAccount }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error('useAuth must be used inside AuthProvider');
  return value;
}
