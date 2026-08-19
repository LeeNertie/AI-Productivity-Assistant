import { createFileRoute } from "@tanstack/react-router";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useEffect, useMemo, useRef, useState } from "react";
import { Send, Bot, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";

import { ResponsibleAiNote } from "@/components/tool-shell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "AI Workplace Chatbot | Aria Workspace" },
      {
        name: "description",
        content:
          "Chat with Aria, an AI workplace assistant for drafting, planning, prioritising and answering work questions.",
      },
      { property: "og:title", content: "AI Workplace Chatbot | Aria Workspace" },
      {
        property: "og:description",
        content: "An interactive AI assistant for everyday workplace tasks.",
      },
    ],
  }),
  component: ChatPage,
});

const SUGGESTIONS = [
  "Help me say no to a meeting request politely",
  "Turn these bullet points into a status update for my manager",
  "What should I prioritise when everything is urgent?",
  "Draft an agenda for a 30-minute project kickoff",
];

function ChatPage() {
  const transport = useMemo(() => new DefaultChatTransport({ api: "/api/chat" }), []);
  const { messages, sendMessage, status } = useChat({
    transport,
    onError: (error) => toast.error(error.message || "The assistant is unavailable right now."),
  });
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  const isLoading = status === "submitted" || status === "streaming";

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, status]);

  const send = (text: string) => {
    if (!text.trim() || isLoading) return;
    void sendMessage({ text: text.trim() });
    setInput("");
  };

  return (
    <div className="mx-auto flex h-full w-full max-w-4xl flex-col gap-4 px-4 py-6 sm:px-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">AI Workplace Chatbot</h1>
        <p className="text-sm text-muted-foreground">
          Aria keeps the full conversation in context — ask follow-ups freely.
        </p>
      </header>

      <Card className="flex min-h-[52vh] flex-1 flex-col gap-4 overflow-y-auto p-4 shadow-soft">
        {messages.length === 0 && (
          <div className="m-auto max-w-lg space-y-4 text-center">
            <span className="gradient-primary mx-auto flex size-12 items-center justify-center rounded-2xl text-primary-foreground">
              <Bot className="size-6" />
            </span>
            <p className="text-sm text-muted-foreground">
              Start with one of these, or type your own question.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {SUGGESTIONS.map((item) => (
                <Button key={item} variant="outline" size="sm" onClick={() => send(item)}>
                  {item}
                </Button>
              ))}
            </div>
          </div>
        )}

        {messages.map((message) => {
          const text = message.parts
            .map((part) => (part.type === "text" ? part.text : ""))
            .join("");
          const isUser = message.role === "user";
          return (
            <div key={message.id} className={`flex gap-3 ${isUser ? "flex-row-reverse" : ""}`}>
              <span
                className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${
                  isUser ? "bg-secondary text-secondary-foreground" : "gradient-primary text-primary-foreground"
                }`}
              >
                {isUser ? <User className="size-4" /> : <Bot className="size-4" />}
              </span>
              <div
                className={`max-w-[80%] rounded-xl px-4 py-3 text-sm leading-relaxed ${
                  isUser
                    ? "bg-secondary text-secondary-foreground"
                    : "border border-border bg-card text-card-foreground"
                } [&_h2]:mt-3 [&_h2]:font-semibold [&_li]:ml-4 [&_li]:list-disc [&_p]:mb-2 [&_p:last-child]:mb-0 [&_strong]:font-semibold`}
              >
                <ReactMarkdown>{text}</ReactMarkdown>
              </div>
            </div>
          );
        })}

        {isLoading && <p className="text-sm text-muted-foreground">Aria is typing…</p>}
        <div ref={endRef} />
      </Card>

      <div className="flex items-end gap-2">
        <Textarea
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              send(input);
            }
          }}
          placeholder="Ask Aria about drafting, planning or prioritising…"
          className="min-h-[60px] resize-none"
        />
        <Button onClick={() => send(input)} disabled={isLoading} size="icon" className="size-11">
          <Send />
        </Button>
      </div>

      <ResponsibleAiNote />
    </div>
  );
}
