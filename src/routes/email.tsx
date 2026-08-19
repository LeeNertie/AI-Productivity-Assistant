import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Wand2 } from "lucide-react";
import { toast } from "sonner";

import { generateEmail } from "@/lib/ai.functions";
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

export const Route = createFileRoute("/email")({
  head: () => ({
    meta: [
      { title: "Smart Email Generator | Aria Workspace" },
      {
        name: "description",
        content:
          "Generate professional workplace emails in formal, friendly or persuasive tones, then edit and copy the draft.",
      },
      { property: "og:title", content: "Smart Email Generator | Aria Workspace" },
      {
        property: "og:description",
        content: "AI-drafted business emails with tone, length and key-point control.",
      },
    ],
  }),
  component: EmailPage,
});

const TONES = ["Formal", "Friendly", "Persuasive", "Apologetic", "Assertive", "Appreciative"];
const LENGTHS = ["Short (under 80 words)", "Medium", "Detailed"];

function EmailPage() {
  const run = useServerFn(generateEmail);
  const [purpose, setPurpose] = useState("");
  const [recipient, setRecipient] = useState("");
  const [keyPoints, setKeyPoints] = useState("");
  const [tone, setTone] = useState(TONES[0]);
  const [length, setLength] = useState(LENGTHS[1]);
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!purpose.trim()) {
      toast.error("Describe what the email is about first.");
      return;
    }
    setLoading(true);
    try {
      const result = await run({ data: { purpose, recipient, tone, length, keyPoints } });
      setOutput(result.text);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not generate the email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolShell
      title="Smart Email Generator"
      description="Describe the situation and Aria drafts a structured, on-tone business email you can edit before sending."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-base">Brief</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="purpose">What is the email about?</Label>
              <Textarea
                id="purpose"
                value={purpose}
                onChange={(event) => setPurpose(event.target.value)}
                placeholder="Ask the vendor for an updated quote and confirm the delivery date."
                className="min-h-24"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="recipient">Recipient / audience</Label>
              <Input
                id="recipient"
                value={recipient}
                onChange={(event) => setRecipient(event.target.value)}
                placeholder="Procurement manager at a supplier"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Tone</Label>
                <Select value={tone} onValueChange={setTone}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {TONES.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Length</Label>
                <Select value={length} onValueChange={setLength}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {LENGTHS.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="points">Key points (one per line)</Label>
              <Textarea
                id="points"
                value={keyPoints}
                onChange={(event) => setKeyPoints(event.target.value)}
                placeholder={"Order #4821\nNeed pricing by Friday\nBudget cap R45 000"}
                className="min-h-24"
              />
            </div>
            <Button onClick={submit} disabled={loading} className="w-full">
              <Wand2 />
              {loading ? "Drafting…" : "Generate email"}
            </Button>
          </CardContent>
        </Card>

        <AiOutput
          value={output}
          onChange={setOutput}
          loading={loading}
          title="Email draft"
          filename="email-draft.md"
          emptyHint="Your generated email will appear here, ready to edit and copy."
        />
      </div>
    </ToolShell>
  );
}
