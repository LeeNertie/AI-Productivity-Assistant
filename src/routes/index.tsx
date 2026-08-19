import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Clock, Sparkles, ShieldCheck, Zap } from "lucide-react";

import { navItems } from "@/components/app-sidebar";
import { ResponsibleAiNote } from "@/components/tool-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aria Workspace — AI Workplace Productivity Assistant" },
      {
        name: "description",
        content:
          "One dashboard for AI-powered email drafting, meeting summaries, task planning, research briefs and a workplace chatbot.",
      },
      { property: "og:title", content: "Aria Workspace — AI Workplace Productivity Assistant" },
      {
        property: "og:description",
        content:
          "Automate everyday workplace tasks with five AI tools in a single, responsible-by-design dashboard.",
      },
    ],
  }),
  component: Dashboard,
});

const STATS = [
  { label: "AI tools in one place", value: "5", icon: Sparkles },
  { label: "Typical minutes saved per draft", value: "12", icon: Clock },
  { label: "Outputs fully editable", value: "100%", icon: Zap },
  { label: "Human review required", value: "Always", icon: ShieldCheck },
];

function Dashboard() {
  const tools = navItems.filter((item) => item.url !== "/");

  return (
    <div className="mx-auto w-full max-w-6xl space-y-8 px-4 py-6 sm:px-6 lg:py-8">
      <section className="surface-glow relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">
          AI Workplace Productivity Assistant
        </p>
        <h1 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
          Do the work that matters. Let Aria handle the busywork.
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
          Draft emails, summarise meetings, plan your day, research any topic and chat with an AI
          assistant — all inside one professional dashboard with structured prompts and editable
          output.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link to="/chat">
              Chat with Aria <ArrowRight />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/email">Draft an email</Link>
          </Button>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat) => (
          <Card key={stat.label} className="shadow-soft">
            <CardContent className="flex items-center gap-3 p-5">
              <span className="flex size-10 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                <stat.icon className="size-5" />
              </span>
              <div>
                <p className="text-xl font-semibold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold tracking-tight">Your AI toolkit</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <Link key={tool.url} to={tool.url} className="group">
              <Card className="h-full transition-shadow group-hover:shadow-elevated">
                <CardHeader className="space-y-3">
                  <span className="gradient-primary flex size-10 items-center justify-center rounded-lg text-primary-foreground">
                    <tool.icon className="size-5" />
                  </span>
                  <CardTitle className="text-base">{tool.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{tool.desc}</p>
                  <p className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                    Open tool <ArrowRight className="size-4" />
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <ResponsibleAiNote />
    </div>
  );
}
