import type { Language } from "../../i18n/LanguageContext";
import type { NexoMood } from "./types";

export type AboutModule = "identity" | "timeline" | "values" | "facts";
export type NexoContextMessage = { text: string; mood: NexoMood };

export const aboutNexoMessages: Record<Language, Record<AboutModule, NexoContextMessage>> = {
  es: {
    identity: { text: "Hola. Este es el perfil principal del sistema.", mood: "happy" },
    timeline: { text: "Aquí comenzó toda la historia.", mood: "thinking" },
    values: { text: "Estas son las reglas con las que desarrolla.", mood: "happy" },
    facts: { text: "Hay información que pocos conocen.", mood: "surprised" },
  },
  en: {
    identity: { text: "Hello. This is the system's main profile.", mood: "happy" },
    timeline: { text: "This is where the whole story began.", mood: "thinking" },
    values: { text: "These are the principles behind the way he builds.", mood: "happy" },
    facts: { text: "There is information that few people know.", mood: "surprised" },
  },
};

export const announceNexoContext = (message: NexoContextMessage) => {
  window.dispatchEvent(new CustomEvent<NexoContextMessage>("nexo:context", { detail: message }));
};
