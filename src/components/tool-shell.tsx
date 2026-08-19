import type { ReactNode } from "react";
import { ShieldCheck } from "lucide-react";

export function ToolShell({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 px-4 py-6 sm:px-6 lg:py-8">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h1>
        <p className="max-w-3xl text-sm text-muted-foreground">{description}</p>
      </header>
      {children}
      <ResponsibleAiNote />
    </div>
  );
}

export function ResponsibleAiNote() {
  return (
    <div className="flex gap-3 rounded-xl border border-border bg-accent/40 p-4 text-xs leading-relaxed text-accent-foreground">
      <ShieldCheck className="mt-0.5 size-4 shrink-0" />
      <p>
        <span className="font-semibold">Responsible AI:</span> outputs are AI-generated and may be
        inaccurate or incomplete. Review and edit every draft before it is sent, shared or acted on.
        Do not paste confidential customer data, credentials or personal information, and keep a
        human accountable for all final decisions.
      </p>
    </div>
  );
}
