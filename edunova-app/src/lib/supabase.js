import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

// --- Fill these in once your Supabase project exists ---
// Easiest way: create a `.env` file (see `.env.example`) with:
//   EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
//   EXPO_PUBLIC_SUPABASE_ANON_KEY=your-public-anon-key
// Expo automatically loads EXPO_PUBLIC_* vars — no extra setup needed.
const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const isSupabaseConfigured = () =>
  Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

// `supabase` is null until the two env vars above are set. Every screen
// checks `isSupabaseConfigured()` before using it (see src/hooks/useMessages.js),
// so the whole app runs fine on mock data in the meantime.
export const supabase = isSupabaseConfigured()
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
      },
    })
  : null;
