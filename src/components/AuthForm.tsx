"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AuthForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const sendMagicLink = async () => {
    setLoading(true);
    setErrorMsg(null);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        // adjust to your deployed URL later
        emailRedirectTo: typeof window !== "undefined" ? window.location.origin + "/dashboard" : undefined,
      },
    });
    setLoading(false);
    if (error) setErrorMsg(error.message);
    else setSent(true);
  };

  return (
    <div className="max-w-sm mx-auto w-full space-y-4">
      <h1 className="text-2xl font-bold">Sign in</h1>
      {sent ? (
        <p className="text-sm text-muted-foreground">
          Check your email for a magic link.
        </p>
      ) : (
        <>
          <input
            className="w-full rounded border px-3 py-2"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errorMsg && <p className="text-sm text-red-600">{errorMsg}</p>}
          <button
            onClick={sendMagicLink}
            disabled={loading || !email}
            className="w-full rounded bg-black text-white py-2 disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send magic link"}
          </button>
        </>
      )}
    </div>
  );
}
