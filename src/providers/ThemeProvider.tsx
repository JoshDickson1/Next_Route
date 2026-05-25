import { createContext, useContext, useEffect } from 'react';
// import { useState } from 'react'; // unused while light-only mode is active

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextValue {
  theme: Theme;
  resolvedTheme: 'light' | 'dark';
  setTheme: (t: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // const [theme, setThemeState] = useState<Theme>(
  //   () => (localStorage.getItem('theme') as Theme) ?? 'system'
  // );

  // const resolvedTheme: 'light' | 'dark' =
  //   theme === 'system'
  //     ? window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  //     : theme;

  const theme: Theme = 'light';
  const resolvedTheme: 'light' | 'dark' = 'light';

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add('light');
  }, []);

  // const setTheme = (t: Theme) => {
  //   localStorage.setItem('theme', t);
  //   setThemeState(t);
  // };
  const setTheme = (_t: Theme) => {};

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be inside ThemeProvider');
  return ctx;
}
