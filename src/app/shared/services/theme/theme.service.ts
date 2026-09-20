import { Injectable, signal } from '@angular/core';

export type ThemeMode = 'light' | 'dark' | 'custom';
export type CustomColorKey = 'primary' | 'surface' | 'background' | 'sidebar';

export interface CustomThemeColors {
  readonly primary: string;
  readonly surface: string;
  readonly background: string;
  readonly sidebar: string;
}

const THEME_STORAGE_KEY = 'aran-theme';
const CUSTOM_COLORS_STORAGE_KEY = 'aran-custom-theme-colors';
const DEFAULT_CUSTOM_COLORS: CustomThemeColors = {
  primary: '#8b5cf6',
  surface: '#fffaf5',
  background: '#fff7ed',
  sidebar: '#292524',
};

@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly theme = signal<ThemeMode>(this.readTheme());
  readonly customColors = signal<CustomThemeColors>(this.readCustomColors());

  constructor() {
    this.applyTheme(this.theme());
  }

  setTheme(theme: ThemeMode): void {
    this.theme.set(theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);
    this.applyTheme(theme);
  }

  setCustomColor(key: CustomColorKey, value: string): void {
    const colors = { ...this.customColors(), [key]: value };
    this.customColors.set(colors);
    localStorage.setItem(CUSTOM_COLORS_STORAGE_KEY, JSON.stringify(colors));
    if (this.theme() === 'custom') {
      this.applyCustomColors(colors);
    }
  }

  resetCustomColors(): void {
    this.customColors.set(DEFAULT_CUSTOM_COLORS);
    localStorage.setItem(CUSTOM_COLORS_STORAGE_KEY, JSON.stringify(DEFAULT_CUSTOM_COLORS));
    if (this.theme() === 'custom') {
      this.applyCustomColors(DEFAULT_CUSTOM_COLORS);
    }
  }

  private applyTheme(theme: ThemeMode): void {
    document.documentElement.dataset['theme'] = theme;
    if (theme === 'custom') {
      this.applyCustomColors(this.customColors());
      return;
    }

    for (const key of Object.keys(DEFAULT_CUSTOM_COLORS)) {
      document.documentElement.style.removeProperty(`--app-${key}`);
    }
  }

  private applyCustomColors(colors: CustomThemeColors): void {
    document.documentElement.style.setProperty('--app-primary', colors.primary);
    document.documentElement.style.setProperty('--app-surface', colors.surface);
    document.documentElement.style.setProperty('--app-background', colors.background);
    document.documentElement.style.setProperty('--app-sidebar', colors.sidebar);
  }

  private readTheme(): ThemeMode {
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    return storedTheme === 'dark' || storedTheme === 'custom' ? storedTheme : 'light';
  }

  private readCustomColors(): CustomThemeColors {
    try {
      const storedColors = localStorage.getItem(CUSTOM_COLORS_STORAGE_KEY);
      if (!storedColors) {
        return DEFAULT_CUSTOM_COLORS;
      }
      return { ...DEFAULT_CUSTOM_COLORS, ...JSON.parse(storedColors) } as CustomThemeColors;
    } catch {
      return DEFAULT_CUSTOM_COLORS;
    }
  }
}
