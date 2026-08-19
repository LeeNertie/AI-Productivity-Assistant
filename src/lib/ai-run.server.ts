import { streamText } from "ai";
import { createLovableAiGatewayProvider } from "./ai-gateway.server";
import { MODEL_ID } from "./ai-prompts";

export async function runPrompt({ system, prompt }: { system: string; prompt: string }) {
  const key = process.env["LOVABLE_API_KEY"];
  if (!key) throw new Error("AI is not configured (missing LOVABLE_API_KEY).");

  const gateway = createLovableAiGatewayProvider(key);
  const result = streamText({
    model: gateway(MODEL_ID),
    system,
    prompt,
  });

  const text = await result.text;
  return { text };
}
