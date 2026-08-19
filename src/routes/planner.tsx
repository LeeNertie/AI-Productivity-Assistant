import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { CalendarClock } from "lucide-react";
import { toast } from "sonner";

import { planTasks } from "@/lib/ai.functions";
import { ToolShell } from "@/components/tool-shell";
import { AiOutput } from "@/components/ai-output";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/planner")({
  head: () => ({
    meta: [
      { title: "AI Task Planner | Aria Workspace" },
      {
        name: "description",
        content:
          "Turn a messy task list into a prioritised, time-blocked daily or weekly schedule with realistic buffers.",
      },
      { property: "og:title", content: "AI Task Planner | Aria Workspace" },
      {
        property: "og:description",
        content: "Prioritise tasks and generate a realistic daily or weekly schedule.",
      },
    ],
  }),
  component: PlannerPage,
});

const HORIZONS = ["Today", "Tomorrow", "This week", "Next week"];

function PlannerPage() {
  const run = useServerFn(planTasks);
  const [tasks, setTasks] = useState("");
  const [priorities, setPriorities] = useState("");
  const [horizon, setHorizon] = useState<string>("Today");
  const [hours, setHours] = useState("8");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!tasks.trim()) {
      toast.error("Add at least one task.");
      return;
    }
    setLoading(true);
    try {
      const result = await run({ data: { tasks, horizon, hours, priorities } });
      setOutput(result.text);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not build the plan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolShell
      title="AI Task Planner"
      description="Dump every task you are juggling. Aria ranks them by urgency and impact, then builds a time-blocked schedule that fits your real capacity."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-base">Your workload</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="tasks">Tasks (one per line, add deadlines if known)</Label>
              <Textarea
                id="tasks"
                value={tasks}
                onChange={(event) => setTasks(event.target.value)}
                placeholder={"Finish Q3 report - due Thursday\nInterview 2 candidates\nReply to client escalation\nPrep board slides"}
                className="min-h-[220px]"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Planning horizon</Label>
                <Select value={horizon} onValueChange={setHorizon}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {HORIZONS.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="hours">Available hours per day</Label>
                <Input
                  id="hours"
                  value={hours}
                  onChange={(event) => setHours(event.target.value)}
                  inputMode="numeric"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="priorities">Constraints & priorities</Label>
              <Textarea
                id="priorities"
                value={priorities}
                onChange={(event) => setPriorities(event.target.value)}
                placeholder="Standup 09:00, no meetings after 15:00, client work comes first."
                className="min-h-20"
              />
            </div>
            <Button onClick={submit} disabled={loading} className="w-full">
              <CalendarClock />
              {loading ? "Planning…" : "Build my schedule"}
            </Button>
          </CardContent>
        </Card>

        <AiOutput
          value={output}
          onChange={setOutput}
          loading={loading}
          title="Prioritised plan"
          filename="task-plan.md"
          emptyHint="Your prioritised task list and time-blocked schedule will appear here."
        />
      </div>
    </ToolShell>
  );
}
