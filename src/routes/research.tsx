import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Search } from "lucide-react";
import { toast } from "sonner";

import { researchTopic } from "@/lib/ai.functions";
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

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "AI Research Assistant | Aria Workspace" },
      {
        name: "description",
        content:
          "Summarise a topic or pasted article into an executive summary, insights, risks and recommended next steps.",
      },
      { property: "og:title", content: "AI Research Assistant | Aria Workspace" },
      {
        property: "og:description",
        content: "Executive summaries, insights and next steps for any workplace topic.",
      },
    ],
  }),
  component: ResearchPage,
});

const DEPTHS = ["Quick scan", "Standard brief", "Deep dive"];

function ResearchPage() {
  const run = useServerFn(researchTopic);
  const [topic, setTopic] = useState("");
  const [audience, setAudience] = useState("");
  const [depth, setDepth] = useState<string>("Standard brief");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!topic.trim()) {
      toast.error("Enter a topic or paste an article.");
      return;
    }
    setLoading(true);
    try {
      const result = await run({ data: { topic, audience, depth } });
      setOutput(result.text);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not complete the research.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolShell
      title="AI Research Assistant"
      description="Paste an article or name a topic. Aria returns an executive summary, key insights, risks and next steps — plus a list of claims you should verify."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-base">Research request</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="topic">Topic or pasted article</Label>
              <Textarea
                id="topic"
                value={topic}
                onChange={(event) => setTopic(event.target.value)}
                placeholder="How should a 40-person services firm adopt AI note-taking tools responsibly?"
                className="min-h-[260px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="audience">Audience</Label>
              <Input
                id="audience"
                value={audience}
                onChange={(event) => setAudience(event.target.value)}
                placeholder="Exec team, non-technical"
              />
            </div>
            <div className="space-y-2">
              <Label>Depth</Label>
              <Select value={depth} onValueChange={setDepth}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {DEPTHS.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={submit} disabled={loading} className="w-full">
              <Search />
              {loading ? "Researching…" : "Generate research brief"}
            </Button>
          </CardContent>
        </Card>

        <AiOutput
          value={output}
          onChange={setOutput}
          loading={loading}
          title="Research brief"
          filename="research-brief.md"
          emptyHint="Your executive summary, insights and recommendations will appear here."
        />
      </div>
    </ToolShell>
  );
}
