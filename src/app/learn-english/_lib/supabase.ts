import { createClient } from "@supabase/supabase-js";

// NEXT_PUBLIC_* değerleri build sırasında bundle'a gömülür (static export).
// Anon key public olacak şekilde tasarlanmıştır; güvenlik sınırı RLS'tir.
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
