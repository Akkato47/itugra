import { create } from "zustand";

import { createSelectors } from "@shared/model/createSelectors";

import {
  applyResolvedTheme,
  getStoredPreference,
  persistPreference,
  resolveTheme,
  watchSystemTheme,
  type ResolvedTheme,
  type ThemePreference
} from "../lib/theme";

interface IThemeState {
  preference: ThemePreference;
  resolvedTheme: ResolvedTheme;
  setPreference: (preference: ThemePreference) => void;
}

const initialPreference = getStoredPreference();

const useThemeStoreBase = create<IThemeState>((set) => ({
  preference: initialPreference,
  resolvedTheme: resolveTheme(initialPreference),
  setPreference: (preference) => {
    const resolvedTheme = resolveTheme(preference);

    persistPreference(preference);
    applyResolvedTheme(resolvedTheme);
    set({ preference, resolvedTheme });
  }
}));

// Пока выбран режим "Система" — следим за темой ОС вживую.
watchSystemTheme((systemTheme) => {
  if (useThemeStoreBase.getState().preference !== "system") return;

  applyResolvedTheme(systemTheme);
  useThemeStoreBase.setState({ resolvedTheme: systemTheme });
});

export const useThemeStore = createSelectors(useThemeStoreBase);
