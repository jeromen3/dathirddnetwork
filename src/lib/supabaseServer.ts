// src/lib/supabaseServer.ts
import { cookies } from "next/headers";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

export async function supabaseServer() {
  const cookieStore = await cookies(); // <-- await!

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL !,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY !,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options as CookieOptions);
            });
          } catch {
            // In RSC this may throw; it's fine to ignore.
          }
        },
      },
    }
  );
}
