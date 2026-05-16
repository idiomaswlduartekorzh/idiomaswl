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

function getSystemPreference(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme: Theme) {
  const resolved = theme === 'system' ? getSystemPreference() : theme;
  const html = document.documentElement;
  html.setAttribute('data-theme', resolved);
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
    const resolved = initial === 'system' ? getSystemPreference() : initial;
    setResolvedTheme(resolved);

    // Listen for OS preference changes when in system mode
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => {
      if (initial === 'system') {
        const r = mq.matches ? 'dark' : 'light';
        setResolvedTheme(r);
        document.documentElement.setAttribute('data-theme', r);
      }
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    const resolved = t === 'system' ? getSystemPreference() : t;
    setResolvedTheme(resolved);
    applyTheme(t);
  }, []);

  const toggle = useCallback(() => {
    setThemeState(prev => {
      const next = prev === 'dark' || (prev === 'system' && getSystemPreference() === 'dark')
        ? 'light'
        : 'dark';
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
