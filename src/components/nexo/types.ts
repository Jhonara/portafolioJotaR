export type NexoMood = "idle" | "happy" | "thinking" | "typing" | "surprised" | "waving" | "sleepy" | "celebrating";
export type NexoMessage = { id: string; role: "user" | "nexo"; text: string };
export type NexoIntent = { answer: string; mood: NexoMood; open?: "about" | "projects" | "skills" | "experience" | "contact" | "terminal" };
