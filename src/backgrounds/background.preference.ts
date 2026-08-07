import { DEFAULT_BACKGROUND_ID, type BackgroundId } from "./background.types";

const STORAGE_KEY = "jotar-os.background";

export const readBackgroundPreference = (): BackgroundId => {
  if (typeof window === "undefined") return DEFAULT_BACKGROUND_ID;
  return window.localStorage.getItem(STORAGE_KEY) || DEFAULT_BACKGROUND_ID;
};

export const saveBackgroundPreference = (backgroundId: BackgroundId) => {
  if (typeof window !== "undefined") window.localStorage.setItem(STORAGE_KEY, backgroundId);
};
