import { motion } from 'framer-motion';
import { useThemeTransition } from '@/hooks/useThemeTransition';

function ContrastIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <clipPath id="left-half">  <rect x="0"  y="0" width="12" height="24" /> </clipPath>
        <clipPath id="right-half"> <rect x="12" y="0" width="12" height="24" /> </clipPath>
      </defs>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <circle cx="12" cy="12" r="10" fill="currentColor" clipPath="url(#left-half)" />
      <circle cx="12" cy="12" r="4.5" fill="hsl(var(--background))" clipPath="url(#left-half)" />
      <circle cx="12" cy="12" r="4.5" fill="currentColor" clipPath="url(#right-half)" />
    </svg>
  );
}

export function ThemeToggle() {
  const { triggerTransition, buttonRef, resolvedTheme } = useThemeTransition();
  const isDark = resolvedTheme === 'dark';

  return (
    <button
      ref={buttonRef}
      onClick={triggerTransition}
      aria-label="Toggle theme"
      className="flex items-center justify-center w-8 h-8 rounded-full text-muted-foreground hover:text-foreground hover:bg-accent transition-colors ease-in duration-[600ms] cursor-pointer"
    >
      <motion.div
        animate={{ rotate: isDark ? 0 : 180 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        style={{ display: 'flex' }}
      >
        <ContrastIcon size={20} />
      </motion.div>
    </button>
  );
}
