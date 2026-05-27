import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

const LANGUAGES = [
  { code: 'en', label: 'EN', flag: '🇳🇬', name: 'English'   },
  { code: 'ar', label: 'AR', flag: '🇦🇪', name: 'العربية'   },
  { code: 'sw', label: 'SW', flag: '🇹🇿', name: 'Kiswahili' },
  { code: 'it', label: 'IT', flag: '🇮🇹', name: 'Italiano'  },
  { code: 'el', label: 'EL', flag: '🇬🇷', name: 'Ελληνικά' },
  { code: 'es', label: 'ES', flag: '🇪🇸', name: 'Español'   },
] as const;

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const current = LANGUAGES.find((l) => l.code === i18n.language?.slice(0, 2)) ?? LANGUAGES[0];
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  function select(code: string) {
    i18n.changeLanguage(code);
    setOpen(false);
  }

  const others = LANGUAGES.filter((l) => l.code !== current.code);

  return (
    <div ref={ref} className="relative">

      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 rounded-full px-2.5 py-1.5 cursor-pointer select-none transition-all duration-200"
        style={{
          fontFamily: 'Satoshi, sans-serif',
          fontSize: 11,
          fontWeight: 700,
          background: open ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)',
          color: '#fff',
          border: '1px solid rgba(255,255,255,0.18)',
          lineHeight: 1,
        }}
      >
        <span style={{ fontSize: 16, lineHeight: 1 }}>{current.flag}</span>
        <span>{current.label}</span>
      </button>

      {/* Downward popover */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: -8 }}
            animate={{ opacity: 1, scale: 1,    y: 0  }}
            exit={{   opacity: 0, scale: 0.88, y: -8  }}
            transition={{ type: 'spring', stiffness: 420, damping: 26 }}
            className="absolute top-[calc(100%+8px)] right-0 z-50 flex flex-col gap-0.5 p-1.5 rounded-2xl mt-5 min-w-[160px]"
            style={{
              background: 'rgba(10,20,46,0.92)',
              backdropFilter: 'blur(24px)',
              border: '1px solid rgba(255,255,255,0.12)',
              boxShadow: '0 16px 40px rgba(0,0,0,0.4), 0 0 0 0.5px rgba(255,255,255,0.06)',
              transformOrigin: 'top right',
            }}
          >
            {others.map((lang, i) => (
              <motion.button
                key={lang.code}
                type="button"
                onClick={() => select(lang.code)}
                initial={{ opacity: 0, x: 6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ type: 'spring', stiffness: 380, damping: 28, delay: i * 0.035 }}
                className="flex items-center gap-2.5 w-full rounded-xl px-3 py-2 cursor-pointer text-left transition-colors duration-150 hover:bg-white/10"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >
                <span style={{ fontSize: 18, lineHeight: 1 }}>{lang.flag}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.9)' }}>{lang.label}</span>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginLeft: 'auto' }}>{lang.name}</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
