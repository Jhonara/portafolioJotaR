import { create } from "zustand";
import { achievements } from "../data/achievements";

type Notice = { id: string; achievementId: string };
type AchievementStore = { unlocked: string[]; notices: Notice[]; unlock: (id: string) => void; dismiss: (id: string) => void };
const storageKey = "jotar-achievements";
const stored = () => { try { return JSON.parse(localStorage.getItem(storageKey) ?? "[]") as string[]; } catch { return []; } };

export const useAchievementsStore = create<AchievementStore>((set, get) => ({
  unlocked: typeof window === "undefined" ? [] : stored(), notices: [],
  unlock: (id) => {
    const achievement = achievements.find((item) => item.id === id);
    if (!achievement || achievement.baseUnlocked || get().unlocked.includes(id)) return;
    const unlocked = [...get().unlocked, id];
    localStorage.setItem(storageKey, JSON.stringify(unlocked));
    const notice = { id: crypto.randomUUID(), achievementId: id };
    set((state) => ({ unlocked, notices: [...state.notices, notice] }));
    try { const audio = new Audio("/sounds/achievement.mp3"); audio.volume = .22; void audio.play().catch(() => undefined); } catch { /* Sound is optional until the file exists. */ }
  },
  dismiss: (id) => set((state) => ({ notices: state.notices.filter((notice) => notice.id !== id) })),
}));
