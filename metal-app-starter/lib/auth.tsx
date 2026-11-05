import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';

import type { GenreSelection } from '@/lib/catalog';
import { supabase } from '@/lib/supabase';

export type AuthStatus =
  | 'loading'
  | 'not-configured'
  | 'error'
  | 'needs-username'
  | 'needs-city'
  | 'needs-genres'
  | 'ready';

type AuthContextValue = {
  status: AuthStatus;
  username: string | null;
  homeCityId: string | null;
  genreSelections: GenreSelection[];
  retry: () => void;
  saveUsername: (name: string) => Promise<boolean>;
  saveHomeCity: (cityId: string) => Promise<boolean>;
  saveGenres: (selections: GenreSelection[]) => Promise<boolean>;
  deleteAccount: () => Promise<boolean>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

// The first onboarding step still missing decides which screen appears.
function nextStatus(username: string | null, homeCityId: string | null, genreCount: number): AuthStatus {
  if (!username) return 'needs-username';
  if (!homeCityId) return 'needs-city';
  if (genreCount === 0) return 'needs-genres';
  return 'ready';
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<AuthStatus>(supabase ? 'loading' : 'not-configured');
  const [userId, setUserId] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [homeCityId, setHomeCityId] = useState<string | null>(null);
  const [genreSelections, setGenreSelections] = useState<GenreSelection[]>([]);

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
        .select('username, home_city_id')
        .eq('id', user.id)
        .maybeSingle();
      if (profileError) throw profileError;

      const { data: genreRows, error: genreError } = await supabase
        .from('user_genres')
        .select('genre_id, subgenre_ids')
        .eq('user_id', user.id)
        .order('rank');
      if (genreError) throw genreError;

      const selections = (genreRows ?? []).map((row) => ({
        genreId: row.genre_id as string,
        subgenreIds: row.subgenre_ids as string[] | null,
      }));
      const name = profile?.username ?? null;
      const cityId = profile?.home_city_id ?? null;

      setUserId(user.id);
      setUsername(name);
      setHomeCityId(cityId);
      setGenreSelections(selections);
      setStatus(nextStatus(name, cityId, selections.length));
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
      setStatus(nextStatus(name, homeCityId, genreSelections.length));
      return true;
    },
    [userId, homeCityId, genreSelections],
  );

  const saveHomeCity = useCallback(
    async (cityId: string) => {
      if (!supabase || !userId) return false;
      const { error } = await supabase.from('profiles').update({ home_city_id: cityId }).eq('id', userId);
      if (error) {
        console.warn('Saving home city failed', error);
        return false;
      }
      setHomeCityId(cityId);
      setStatus(nextStatus(username, cityId, genreSelections.length));
      return true;
    },
    [userId, username, genreSelections],
  );

  const saveGenres = useCallback(
    async (selections: GenreSelection[]) => {
      if (!supabase) return false;
      const { error } = await supabase.rpc('save_my_genres', {
        selections: selections.map((s) => ({ genre_id: s.genreId, subgenre_ids: s.subgenreIds })),
      });
      if (error) {
        console.warn('Saving genres failed', error);
        return false;
      }
      setGenreSelections(selections);
      setStatus(nextStatus(username, homeCityId, selections.length));
      return true;
    },
    [username, homeCityId],
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
    setHomeCityId(null);
    setGenreSelections([]);
    await bootstrap();
    return true;
  }, [bootstrap]);

  return (
    <AuthContext.Provider
      value={{
        status,
        username,
        homeCityId,
        genreSelections,
        retry: bootstrap,
        saveUsername,
        saveHomeCity,
        saveGenres,
        deleteAccount,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error('useAuth must be used inside AuthProvider');
  return value;
}
