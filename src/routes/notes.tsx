import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { ListChecks } from "lucide-react";
import { toast } from "sonner";

import { summarizeNotes } from "@/lib/ai.functions";
import { ToolShell } from "@/components/tool-shell";
import { AiOutput } from "@/components/ai-output";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/notes")({
  head: () => ({
    meta: [
      { title: "Meeting Notes Summarizer | Aria Workspace" },
      {
        name: "description",
        content:
          "Turn long meeting notes or transcripts into a summary, decisions, owners, action items and deadlines.",
      },
      { property: "og:title", content: "Meeting Notes Summarizer | Aria Workspace" },
      {
        property: "og:description",
        content: "Extract decisions, action items and deadlines from raw meeting notes.",
      },
    ],
  }),
  component: NotesPage,
});

const SAMPLE = `Standup 14 Aug. Thabo says onboarding redesign is 70% done, blocked on copy from marketing.
Lerato will send final copy Thursday. We agreed to postpone the pricing page test to next sprint.
Support tickets up 18% after the release - Sipho to investigate by Monday and report back.
Decision: ship the redesign behind a feature flag on 22 Aug.`;

function NotesPage() {
  const run = useServerFn(summarizeNotes);
  const [meetingTitle, setMeetingTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!notes.trim()) {
      toast.error("Paste your meeting notes first.");
      return;
    }
    setLoading(true);
    try {
      const result = await run({ data: { notes, meetingTitle } });
      setOutput(result.text);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not summarise the notes.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolShell
      title="Meeting Notes Summarizer"
      description="Paste raw notes or a transcript. Aria returns a concise summary plus decisions, owners, action items and deadlines."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0">
            <CardTitle className="text-base">Notes</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => setNotes(SAMPLE)}>
              Load sample
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Meeting title</Label>
              <Input
                id="title"
                value={meetingTitle}
                onChange={(event) => setMeetingTitle(event.target.value)}
                placeholder="Weekly product standup"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Raw notes or transcript</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                placeholder="Paste everything — bullet points, chat log or transcript."
                className="min-h-[320px]"
              />
            </div>
            <Button onClick={submit} disabled={loading} className="w-full">
              <ListChecks />
              {loading ? "Summarising…" : "Summarise notes"}
            </Button>
          </CardContent>
        </Card>

        <AiOutput
          value={output}
          onChange={setOutput}
          loading={loading}
          title="Summary & action items"
          filename="meeting-summary.md"
          emptyHint="Your summary, decisions and action items will appear here."
        />
      </div>
    </ToolShell>
  );
}
