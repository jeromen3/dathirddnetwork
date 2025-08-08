"use client";
import AuthForm from "@/components/AuthForm";
import { useSearchParams } from "next/navigation";

export default function AuthPage() {
  const searchParams = useSearchParams();
  const reason = searchParams.get("reason");

  return (
    <main className="container mx-auto max-w-md py-12 space-y-6">
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
    </main>
  );
}
