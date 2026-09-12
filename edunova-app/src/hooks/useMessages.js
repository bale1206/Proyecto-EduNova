import { useCallback, useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "../lib/supabase";
import { MOCK_MESSAGES } from "../data/messages";

// Screens call useMessages(role) and get back { messages, loading, error,
// reload, sendMessage } no matter what's actually powering the data.
//
// Right now, with no Supabase project set up, it reads MOCK_MESSAGES.
// Once .env has real Supabase credentials AND a `messages` table exists
// with matching column names, this same hook automatically switches to
// real queries — nothing in HomeScreen/MessagesScreen/ComposeScreen needs
// to change.
export function useMessages(role) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);

    if (!isSupabaseConfigured()) {
      setMessages(MOCK_MESSAGES[role] ?? []);
      setLoading(false);
      return;
    }

    const { data, error: queryError } = await supabase
      .from("messages")
      .select("*")
      .eq("recipient_role", role)
      .order("created_at", { ascending: false });

    if (queryError) setError(queryError.message);
    else setMessages(data ?? []);
    setLoading(false);
  }, [role]);

  useEffect(() => {
    load();
  }, [load]);

  const sendMessage = useCallback(
    async (payload) => {
      if (!isSupabaseConfigured()) {
        // No backend yet — just log what would have been sent.
        console.log("[mock] message that would be sent:", {
          recipient_role: role,
          ...payload,
        });
        return { data: payload, error: null };
      }
      return supabase
        .from("messages")
        .insert({ recipient_role: role, ...payload })
        .select()
        .single();
    },
    [role]
  );

  return { messages, loading, error, reload: load, sendMessage };
}
