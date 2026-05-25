import { useRef } from 'react';
import { useTheme } from '@/providers/ThemeProvider';

const THEME_BG: Record<'dark' | 'light', string> = {
  dark:  'hsl(0, 0%, 4%)',
  light: 'hsl(0, 0%, 100%)',
};

function applyThemeClass(theme: 'dark' | 'light') {
  document.documentElement.classList.remove('light', 'dark');
  document.documentElement.classList.add(theme);
}

function removeAfterPaint(el: HTMLStyleElement) {
  requestAnimationFrame(() => requestAnimationFrame(() => el.remove()));
}

export function useThemeTransition() {
  const { resolvedTheme, setTheme } = useTheme();
  const buttonRef    = useRef<HTMLButtonElement>(null);
  const isAnimating  = useRef(false);
  const expandNext   = useRef(true);

  const triggerTransition = () => {
    if (isAnimating.current || !buttonRef.current) return;

    const nextTheme    = resolvedTheme === 'dark' ? 'light' : 'dark';
    const shouldExpand = expandNext.current;

    const rect   = buttonRef.current.getBoundingClientRect();
    const x      = rect.left + rect.width  / 2;
    const y      = rect.top  + rect.height / 2;
    const radius = Math.hypot(
      Math.max(x, window.innerWidth  - x),
      Math.max(y, window.innerHeight - y),
    );

    const noTransition = document.createElement('style');
    noTransition.textContent = `
      *, *::before, *::after {
        transition: none !important;
        animation-duration: 0ms !important;
      }
    `;
    document.head.appendChild(noTransition);

    isAnimating.current = true;

    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed;
      inset: 0;
      z-index: 9999;
      pointer-events: none;
      background: ${shouldExpand ? THEME_BG[nextTheme] : THEME_BG[resolvedTheme]};
      clip-path: circle(${shouldExpand ? 0 : radius}px at ${x}px ${y}px);
    `;
    document.body.appendChild(overlay);
    overlay.getBoundingClientRect();

    if (!shouldExpand) {
      applyThemeClass(nextTheme);
      setTheme(nextTheme);
    }

    const keyframes = shouldExpand
      ? [{ clipPath: `circle(0px at ${x}px ${y}px)` }, { clipPath: `circle(${radius}px at ${x}px ${y}px)` }]
      : [{ clipPath: `circle(${radius}px at ${x}px ${y}px)` }, { clipPath: `circle(0px at ${x}px ${y}px)` }];

    const animation = overlay.animate(keyframes, {
      duration: 600,
      easing:   'cubic-bezier(0.4, 0, 0.2, 1)',
      fill:     'forwards',
    });

    const cleanup = () => {
      overlay.remove();
      document.body.getBoundingClientRect();
      removeAfterPaint(noTransition);
      expandNext.current  = !expandNext.current;
      isAnimating.current = false;
    };

    animation.onfinish = () => {
      if (shouldExpand) {
        applyThemeClass(nextTheme);
        setTheme(nextTheme);
      }
      cleanup();
    };

    animation.oncancel = () => {
      if (shouldExpand) {
        applyThemeClass(nextTheme);
        setTheme(nextTheme);
      }
      cleanup();
    };
  };

  return { triggerTransition, buttonRef, resolvedTheme };
}
