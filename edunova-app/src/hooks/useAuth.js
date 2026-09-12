import { useCallback, useState } from "react";
import { supabase, isSupabaseConfigured } from "../lib/supabase";

// Same pattern as useMessages: works today on a mock (accepts any
// non-empty input, simulates a short delay), and automatically switches
// to real Supabase Auth once .env has real credentials — no screen
// changes needed either way.
export function useAuth() {
  const [loading, setLoading] = useState(false);

  const signIn = useCallback(async ({ email, password }) => {
    setLoading(true);
    if (!isSupabaseConfigured()) {
      await new Promise((r) => setTimeout(r, 400));
      setLoading(false);
      if (!email || !password) {
        return { error: "Ingresa tu correo y contraseña." };
      }
      return { error: null };
    }
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    return { error: error?.message ?? null };
  }, []);

  const signUp = useCallback(async ({ name, email, password, role }) => {
    setLoading(true);
    if (!isSupabaseConfigured()) {
      await new Promise((r) => setTimeout(r, 400));
      setLoading(false);
      if (!name || !email || !password) {
        return { error: "Completa todos los campos." };
      }
      return { error: null };
    }
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name, role } },
    });
    setLoading(false);
    return { error: error?.message ?? null };
  }, []);

  const signOut = useCallback(async () => {
    if (isSupabaseConfigured()) {
      await supabase.auth.signOut();
    }
  }, []);

  return { signIn, signUp, signOut, loading };
}
