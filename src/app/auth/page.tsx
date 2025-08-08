"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import AuthForm from "@/components/AuthForm";

// Optional: prevents static prerender quirks on this page
export const dynamic = "force-dynamic";

function AuthContent() {
  const sp = useSearchParams();
  const reason = sp.get("reason");

  return (
    <div className="space-y-6">
      {reason === "required" && (
        <div className="rounded-md border p-3 text-sm">
          Please sign in to access your dashboard.
        </div>
      )}

      <section className="space-y-2">
        <h1 className="text-2xl font-semibold">Sign in</h1>
        <p className="text-sm text-muted-foreground">
          Use your email to receive a magic link.
        </p>
      </section>

      <AuthForm />
    </div>
  );
}

export default function AuthPage() {
  return (
    <main className="container mx-auto max-w-md py-12">
      <Suspense fallback={<div className="text-sm text-muted-foreground">Loading…</div>}>
        <AuthContent />
      </Suspense>
    </main>
  );
}
