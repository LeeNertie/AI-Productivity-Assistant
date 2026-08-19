import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Copy, Check, Pencil, Eye, Download } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function AiOutput({
  value,
  onChange,
  title = "AI draft",
  filename = "ai-output.md",
  emptyHint,
  loading,
}: {
  value: string;
  onChange: (next: string) => void;
  title?: string;
  filename?: string;
  emptyHint: string;
  loading?: boolean;
}) {
  const [editing, setEditing] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 1600);
    return () => clearTimeout(timer);
  }, [copied]);

  const copy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    toast.success("Copied to clipboard");
  };

  const download = () => {
    const blob = new Blob([value], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = filename;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="h-full shadow-soft">
      <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0">
        <CardTitle className="text-base">{title}</CardTitle>
        {value && !loading && (
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={() => setEditing((prev) => !prev)}>
              {editing ? <Eye /> : <Pencil />}
              {editing ? "Preview" : "Edit"}
            </Button>
            <Button variant="outline" size="sm" onClick={copy}>
              {copied ? <Check /> : <Copy />}
              Copy
            </Button>
            <Button variant="outline" size="sm" onClick={download}>
              <Download />
              Save
            </Button>
          </div>
        )}
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-3">
            {[0, 1, 2, 3, 4].map((row) => (
              <div
                key={row}
                className="h-4 animate-pulse rounded bg-muted"
                style={{ width: `${90 - row * 12}%` }}
              />
            ))}
            <p className="pt-2 text-sm text-muted-foreground">Aria is thinking…</p>
          </div>
        ) : !value ? (
          <p className="text-sm text-muted-foreground">{emptyHint}</p>
        ) : editing ? (
          <Textarea
            value={value}
            onChange={(event) => onChange(event.target.value)}
            className="min-h-[420px] font-mono text-sm"
          />
        ) : (
          <div className="markdown-body space-y-3 text-sm leading-relaxed [&_h2]:mt-5 [&_h2]:text-base [&_h2]:font-semibold [&_li]:ml-4 [&_li]:list-disc [&_strong]:font-semibold [&_table]:w-full [&_table]:border-collapse [&_td]:border [&_td]:border-border [&_td]:p-2 [&_th]:border [&_th]:border-border [&_th]:bg-muted [&_th]:p-2 [&_th]:text-left">
            <ReactMarkdown>{value}</ReactMarkdown>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
