import { createClient } from '@supabase/supabase-js';
import { AppState, Platform } from 'react-native';

import { sessionStorage } from '@/lib/sessionStorage';

const url = process.env.EXPO_PUBLIC_SUPABASE_URL;
const publishableKey = process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

// Null until the .env file is filled in; the app shows a setup screen in that case.
export const supabase =
  url && publishableKey
    ? createClient(url, publishableKey, {
        auth: {
          storage: sessionStorage,
          autoRefreshToken: true,
          persistSession: true,
          detectSessionInUrl: false,
        },
      })
    : null;

if (supabase && Platform.OS !== 'web') {
  AppState.addEventListener('change', (state) => {
    if (state === 'active') {
      supabase.auth.startAutoRefresh();
    } else {
      supabase.auth.stopAutoRefresh();
    }
  });
}
