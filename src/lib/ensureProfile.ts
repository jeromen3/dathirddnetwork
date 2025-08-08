// src/lib/ensureProfile.ts
import { SupabaseClient } from "@supabase/supabase-js";

export async function ensureProfile(supabase: SupabaseClient) {
  const { data: { user }, error: userErr } = await supabase.auth.getUser();
  if (userErr || !user) return;

  const full_name = (user.user_metadata as any)?.full_name ?? null;
  const avatar_url = (user.user_metadata as any)?.avatar_url ?? null;

  // upsert will no-op if it already exists
  await supabase
    .from("profiles")
    .upsert(
      { user_id: user.id, full_name, avatar_url },
      { onConflict: "user_id", ignoreDuplicates: true }
    );
}
