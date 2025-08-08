"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Home() {
  const [rows, setRows] = useState<any[] | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const { data, error } = await supabase
          .from("test")
          .select("*")
          .throwOnError();
        setRows(data);
      } catch (e: any) {
        console.error("Supabase error:", {
          message: e?.message,
          code: e?.code,
          details: e?.details,
          hint: e?.hint,
        });
        setErr(e?.message ?? "Unknown error");
      }
    })();
  }, []);

  return (
    <main className="p-6">
      <h1>Supabase Test</h1>
      {err && <p className="text-red-600 mt-2">Error: {err}</p>}
      <pre className="mt-4 bg-black/5 p-3 rounded">
        {JSON.stringify(rows, null, 2)}
      </pre>
    </main>
  );
}
