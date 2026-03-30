import { AppMode } from "@/lib/types";
import { getSupabaseEnv } from "@/lib/supabase/env";

export function getAppMode(): AppMode {
  const { url, key } = getSupabaseEnv();
  const supabaseEnabled = Boolean(url && key);

  return {
    supabaseEnabled,
    label: supabaseEnabled ? "live" : "demo",
  };
}
