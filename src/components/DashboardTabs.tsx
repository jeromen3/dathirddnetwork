"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Check, Square, Zap, PlugZap, BarChart } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// --- Demo data (replace with Supabase later) ---
const initialAutomations = [
  { id: "auto-1", name: "Gmail → Notion log", active: true },
  { id: "auto-2", name: "RSS → Discord digest", active: false },
  { id: "auto-3", name: "Stripe → Supabase customers", active: true },
];

const analyticsData = [
  { day: "Mon", runs: 3 },
  { day: "Tue", runs: 5 },
  { day: "Wed", runs: 2 },
  { day: "Thu", runs: 8 },
  { day: "Fri", runs: 4 },
  { day: "Sat", runs: 6 },
  { day: "Sun", runs: 7 },
];

const integrations = [
  { id: "notion", label: "Notion" },
  { id: "gmail", label: "Gmail" },
  { id: "discord", label: "Discord" },
  { id: "stripe", label: "Stripe" },
];

export default function DashboardTabs() {
  const [automations, setAutomations] = useState(initialAutomations);

  const toggleAutomation = (id: string) =>
    setAutomations((prev) =>
      prev.map((a) => (a.id === id ? { ...a, active: !a.active } : a))
    );

  return (
    <div className="space-y-4">
      <Tabs defaultValue="automations" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="automations" className="gap-2">
            <Zap className="h-4 w-4" /> Automations
          </TabsTrigger>
          <TabsTrigger value="analytics" className="gap-2">
            <BarChart className="h-4 w-4" /> Analytics
          </TabsTrigger>
          <TabsTrigger value="integrations" className="gap-2">
            <PlugZap className="h-4 w-4" /> Integrations
          </TabsTrigger>
        </TabsList>

        {/* Automations */}
        <TabsContent value="automations" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Your automations</span>
                <Button size="sm">New automation</Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {automations.map((a) => (
                <div
                  key={a.id}
                  className="flex items-center justify-between rounded-xl border p-3"
                >
                  <div className="flex items-center gap-3">
                    {a.active ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Square className="h-4 w-4" />
                    )}
                    <div className="flex flex-col">
                      <span className="font-medium">{a.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {a.active ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={a.active ? "default" : "secondary"}>
                      {a.active ? "On" : "Off"}
                    </Badge>
                    <Switch
                      checked={a.active}
                      onCheckedChange={() => toggleAutomation(a.id)}
                      aria-label={`Toggle ${a.name}`}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics */}
        <TabsContent value="analytics" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Runs this week</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={analyticsData} margin={{ top: 8, right: 8, left: 8, bottom: 8 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Line type="monotone" dataKey="runs" strokeWidth={2} dot />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integrations */}
        <TabsContent value="integrations" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Connect a service</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {integrations.map((i) => (
                  <Button key={i.id} variant="outline" className="justify-start">
                    <PlugZap className="mr-2 h-4 w-4" /> {i.label}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
