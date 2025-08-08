import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL !,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY !,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            res.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  // This will refresh the session if needed and set cookies
  await supabase.auth.getUser();

  return res;
}

export const config = {
  matcher: ["/dashboard/:path*"], // run on dashboard routes
};
