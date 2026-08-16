'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextValue {
  theme: Theme;
  resolvedTheme: 'light' | 'dark';
  setTheme: (t: Theme) => void;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'system',
  resolvedTheme: 'light',
  setTheme: () => {},
  toggle: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

const STORAGE_KEY = 'wl-theme';

/**
 * Dark mode is opt-in, never inherited from the OS.
 *
 * Following prefers-color-scheme shipped dark styling to visitors who never
 * asked for it, and any surface still carrying a hardcoded light background
 * rendered near-white text on near-white paint — unreadable. Until every
 * surface is token-driven, an unset preference resolves to light.
 */
function resolveTheme(theme: Theme): 'light' | 'dark' {
  return theme === 'dark' ? 'dark' : 'light';
}

function applyTheme(theme: Theme) {
  const html = document.documentElement;
  html.setAttribute('data-theme', resolveTheme(theme));
  if (theme === 'system') {
    localStorage.removeItem(STORAGE_KEY);
  } else {
    localStorage.setItem(STORAGE_KEY, theme);
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('system');
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

  // Initialize from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
    const initial = stored === 'light' || stored === 'dark' ? stored : 'system';
    setThemeState(initial);
    const resolved = resolveTheme(initial);
    setResolvedTheme(resolved);
    // Hydration may reconcile attributes added by the blocking head script.
    // Re-assert the resolved theme once React owns the document.
    document.documentElement.setAttribute('data-theme', resolved);
  }, []);

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    setResolvedTheme(resolveTheme(t));
    applyTheme(t);
  }, []);

  const toggle = useCallback(() => {
    setThemeState(prev => {
      const next = resolveTheme(prev) === 'dark' ? 'light' : 'dark';
      setResolvedTheme(next);
      applyTheme(next);
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, toggle, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
