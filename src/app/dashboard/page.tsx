"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import DashboardTabs from "@/components/DashboardTabs";

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        router.push("/auth?reason=required");
      } else {
        setLoading(false);
      }
    });
  }, [router]);

  if (loading) {
    return <div className="p-6">Loading dashboard...</div>;
  }

  return (
    <main className="container mx-auto py-8">
      <h1 className="mb-4 text-2xl font-semibold">Dashboard</h1>
      <DashboardTabs />
    </main>
  );
}
