export type ThemePreference = "system" | "light" | "dark";
export type ResolvedTheme = "light" | "dark";

const STORAGE_KEY = "theme";

const systemMedia = () => window.matchMedia("(prefers-color-scheme: dark)");

export const getSystemTheme = (): ResolvedTheme =>
  typeof window !== "undefined" && systemMedia().matches ? "dark" : "light";

export const getStoredPreference = (): ThemePreference => {
  if (typeof window === "undefined") return "system";

  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "light" || stored === "dark" || stored === "system") return stored;

  return "system";
};

export const resolveTheme = (preference: ThemePreference): ResolvedTheme =>
  preference === "system" ? getSystemTheme() : preference;

export const applyResolvedTheme = (theme: ResolvedTheme) => {
  document.documentElement.classList.toggle("dark", theme === "dark");
};

export const persistPreference = (preference: ThemePreference) => {
  localStorage.setItem(STORAGE_KEY, preference);
};

export const applyInitialTheme = () => {
  applyResolvedTheme(resolveTheme(getStoredPreference()));
};

/** Подписка на смену системной темы. Возвращает функцию отписки. */
export const watchSystemTheme = (onChange: (theme: ResolvedTheme) => void) => {
  const media = systemMedia();
  const handler = (event: MediaQueryListEvent) => onChange(event.matches ? "dark" : "light");

  media.addEventListener("change", handler);
  return () => media.removeEventListener("change", handler);
};
