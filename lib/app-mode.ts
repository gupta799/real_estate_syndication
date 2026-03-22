import { AppMode } from "@/lib/types";

export function getAppMode(): AppMode {
  const supabaseEnabled = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );

  return {
    supabaseEnabled,
    label: supabaseEnabled ? "live" : "demo",
  };
}

