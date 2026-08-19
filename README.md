# AI Workplace Productivity Assistant (Aria Workspace)

An AI-powered productivity platform that automates everyday workplace tasks in a single dashboard.

## Features

1. **Smart Email Generator** — professional email drafts with tone (formal, friendly, persuasive, apologetic, assertive, appreciative), length and key-point controls.
2. **Meeting Notes Summarizer** — turns raw notes/transcripts into a summary, key decisions, an action-item table (owner / action / deadline), risks and open questions.
3. **AI Task Planner** — prioritises tasks (Eisenhower quadrants) and builds a time-blocked daily/weekly schedule inside your real available hours.
4. **AI Research Assistant** — executive summary, key insights, opportunities/risks, next steps, plus a "verify before use" section.
5. **AI Chatbot (Aria)** — interactive workplace assistant with full conversation context and Markdown answers.

Every output is editable in-app, copyable and downloadable as Markdown.

## Prompt engineering

Structured prompts live in `src/lib/ai-prompts.ts`. Each feature uses a role-based system prompt, a fixed output contract (named Markdown sections/tables) and shared responsible-AI rules: no invented facts (`[TO CONFIRM]` placeholders), professional and unbiased language, no sensitive personal data, always editable output.

## Responsible AI

- A persistent disclaimer appears on every tool page and in the sidebar.
- Users are told to review and edit all AI output before sending or acting on it.
- The research tool explicitly flags claims requiring human verification.
- No user data is stored; requests are processed per session.

## Tools used

- Lovable AI Gateway (Google Gemini 3.7 Flash) via the Vercel AI SDK
- TanStack Start (React 19 + Vite) with file-based routing and server functions
- Tailwind CSS v4 + shadcn/ui components
- ChatGPT / Lovable AI for prompt design and iteration

## Project structure

```
src/routes/          dashboard, /email, /notes, /planner, /research, /chat, api/chat (streaming)
src/lib/ai-prompts   structured prompt templates
src/lib/ai.functions server functions (email, summary, planner, research)
src/components       sidebar, tool shell, AI output viewer/editor
```

## Setup

```bash
bun install
bun run dev
```

The app runs on http://localhost:8080. AI access uses the `LOVABLE_API_KEY` environment variable (managed by Lovable).

## Design

Clean SaaS aesthetic: teal/slate semantic design tokens in `src/styles.css`, collapsible sidebar navigation, fully responsive on mobile and desktop.
