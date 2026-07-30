import type { Language } from "../../i18n/LanguageContext";
import { knowledgeSummary } from "./knowledge";
import type { NexoMessage } from "./types";

const endpoint = import.meta.env.VITE_NEXO_AI_ENDPOINT as string | undefined;

export const askNexoAI = async (messages: NexoMessage[], language: Language) => {
  if (!endpoint) return null;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages: messages.slice(-12), language, knowledge: knowledgeSummary }),
  });
  if (!response.ok) throw new Error("Nexo AI unavailable");
  const data = await response.json() as { answer?: string };
  return data.answer?.trim() || null;
};
