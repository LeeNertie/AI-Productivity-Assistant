import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { runPrompt } from "./ai-run.server";
import { emailPrompt, summaryPrompt, plannerPrompt, researchPrompt } from "./ai-prompts";

export const generateEmail = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) =>
    z
      .object({
        purpose: z.string().min(1),
        recipient: z.string().default(""),
        tone: z.string().default("Professional"),
        length: z.string().default("Medium"),
        keyPoints: z.string().default(""),
      })
      .parse(input),
  )
  .handler(async ({ data }) => runPrompt(emailPrompt(data)));

export const summarizeNotes = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) =>
    z
      .object({
        notes: z.string().min(1),
        meetingTitle: z.string().default(""),
      })
      .parse(input),
  )
  .handler(async ({ data }) => runPrompt(summaryPrompt(data)));

export const planTasks = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) =>
    z
      .object({
        tasks: z.string().min(1),
        horizon: z.string().default("Today"),
        hours: z.string().default("8"),
        priorities: z.string().default(""),
      })
      .parse(input),
  )
  .handler(async ({ data }) => runPrompt(plannerPrompt(data)));

export const researchTopic = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) =>
    z
      .object({
        topic: z.string().min(1),
        audience: z.string().default(""),
        depth: z.string().default("Standard brief"),
      })
      .parse(input),
  )
  .handler(async ({ data }) => runPrompt(researchPrompt(data)));
