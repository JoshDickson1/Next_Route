import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '@/components/common/LanguageSwitcher';
import { cn } from '@/lib/utils';

const SPRING = { type: 'spring' as const, stiffness: 400, damping: 32 };

const NAV_LINK_KEYS = [
  { to: '/',             key: 'home',         end: true  },
  { to: '/services',     key: 'services'               },
  { to: '/destinations', key: 'destinations'            },
  { to: '/our-story',    key: 'our_story'               },
  { to: '/reviews',      key: 'reviews'                 },
];

function GridIcon({ size = 16 }: { size?: number }) {
  const gap  = 2.5;
  const cell = (size - gap * 2) / 3;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="currentColor">
      {[0, 1, 2].flatMap((r) =>
        [0, 1, 2].map((c) => (
          <rect key={`${r}-${c}`} x={c * (cell + gap)} y={r * (cell + gap)} width={cell} height={cell} rx="1" />
        ))
      )}
    </svg>
  );
}

export function Navbar() {
  const { t } = useTranslation();

  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 1.1);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const mobileMenuStyle: React.CSSProperties = {
    background: 'rgba(13, 27, 56, 0.92)',
    backdropFilter: 'blur(80px) saturate(200%)',
    WebkitBackdropFilter: 'blur(80px) saturate(200%)',
    border: '1px solid rgba(255,255,255,0.1)',
    boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
    transition: 'none',
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none px-4">
        <motion.div
          animate={{
            paddingTop:  scrolled ? 10 : 14,
            paddingBottom: scrolled ? 10 : 14,
            background:  scrolled ? 'rgba(13,27,56,0.92)' : 'rgba(255,255,255,0.20)',
            borderColor: scrolled ? 'rgba(255,255,255,0.10)' : 'rgba(255,255,255,0.50)',
            boxShadow:   scrolled ? '0 20px 60px rgba(0,0,0,0.4)' : '0 0px 0px rgba(0,0,0,0)',
          }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="pointer-events-auto border mt-4 flex items-center justify-between gap-2 px-5 rounded-full w-[calc(100vw-48px)] md:w-auto"
          style={{
            backdropFilter: 'blur(80px) saturate(200%)',
            WebkitBackdropFilter: 'blur(80px) saturate(200%)',
          }}
        >
          <Link to="/" className="shrink-0">
            <img
              src="/assets/logo.png"
              alt="Next Route Travels"
              className="h-9 w-auto object-contain"
              style={{ mixBlendMode: 'screen' }}
            />
          </Link>

          <div
            className="hidden md:block w-px h-5 mx-2 shrink-0"
            style={{ background: 'rgba(255,255,255,0.15)' }}
          />

          <nav className="hidden md:flex items-center gap-0.5">
            {NAV_LINK_KEYS.map(({ to, key, end }) => (
              <NavLink key={to} to={to} end={end}>
                {({ isActive }) => (
                  <div className="relative px-3 py-1.5">
                    {isActive && (
                      <motion.div
                        layoutId="nav-active-pill"
                        className="absolute inset-0 rounded-full bg-white"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span
                      className={cn(
                        'relative z-10 text-[13px] font-semibold whitespace-nowrap',
                        isActive ? 'text-[#0d1b38]' : 'text-white/60 hover:text-white'
                      )}
                      style={{ fontFamily: 'Satoshi, sans-serif', transition: 'color 0ms' }}
                    >
                      {t(`nav.${key}`)}
                    </span>
                  </div>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2 ml-2">
            {/* <ThemeToggle /> */}

            <div className="block">
              <LanguageSwitcher  />
            </div>

            {/* Desktop book button — flat hero-style pill */}
            <div className="hidden sm:block shrink-0">
              <Link to="/enquiries">
                <motion.span
                  className={`inline-flex items-center gap-2.5 pl-4 pr-1 py-1 rounded-full cursor-pointer transition-colors duration-300 ${
                    scrolled
                      ? 'bg-white text-[#0d1b38] shadow-[0_8px_24px_-6px_rgba(255,255,255,.25)]'
                      : 'bg-[#0d1b38] text-white shadow-[0_8px_24px_-6px_rgba(13,27,56,.5)]'
                  }`}
                  variants={{ rest: { y: 0 }, hover: { y: -1 } }}
                  initial="rest"
                  whileHover="hover"
                  whileTap={{ scale: 0.97 }}
                  transition={SPRING}
                >
                  <span
                    className="text-[13px] font-semibold whitespace-nowrap"
                    style={{ fontFamily: 'Satoshi, sans-serif' }}
                  >
                    {t('nav.book')}
                  </span>
                  <motion.span
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300 ${
                      scrolled ? 'bg-[#0d1b38] text-white' : 'bg-white text-[#0d1b38]'
                    }`}
                    variants={{ rest: { x: 0 }, hover: { x: 2 } }}
                    transition={SPRING}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M13 6l6 6-6 6"/>
                    </svg>
                  </motion.span>
                </motion.span>
              </Link>
            </div>

            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
              className="md:hidden flex items-center justify-center w-8 h-8 rounded-full text-white/60 hover:text-white cursor-pointer"
              style={{ transition: 'color 150ms ease-in' }}
            >
              {mobileOpen ? <X size={16} /> : <GridIcon size={15} />}
            </button>
          </div>
        </motion.div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 z-40"
              style={{ background: 'rgba(0,0,0,0.2)', backdropFilter: 'blur(4px)' }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              key="menu"
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className="fixed top-[76px] mt-4 left-4 right-4 z-[60] rounded-2xl p-3"
              style={mobileMenuStyle}
            >
              <nav className="flex flex-col gap-1">
                {NAV_LINK_KEYS.map(({ to, key, end }) => (
                  <NavLink key={to} to={to} end={end} onClick={() => setMobileOpen(false)}>
                    {({ isActive }) => (
                      <div
                        className={cn(
                          'px-4 py-3 rounded-xl text-[15px] font-semibold',
                          isActive
                            ? 'bg-white text-[#0d1b38]'
                            : 'text-white/60 hover:text-white hover:bg-white/10'
                        )}
                        style={{ fontFamily: 'Satoshi, sans-serif', transition: 'background 150ms, color 150ms' }}
                      >
                        {t(`nav.${key}`)}
                      </div>
                    )}
                  </NavLink>
                ))}
                {/* Mobile book button — always on dark bg, use white pill */}
                <Link to="/enquiries" onClick={() => setMobileOpen(false)}>
                  <motion.div
                    className="mt-1 flex items-center gap-3 pl-5 pr-1 py-1 rounded-full bg-white text-[#0d1b38] w-max cursor-pointer"
                    variants={{ rest: { y: 0 }, hover: { y: -1 } }}
                    initial="rest"
                    whileHover="hover"
                    whileTap={{ scale: 0.97 }}
                    transition={SPRING}
                  >
                    <span
                      className="flex-1 text-[15px] font-bold"
                      style={{ fontFamily: 'Satoshi, sans-serif' }}
                    >
                      {t('nav.book')}
                    </span>
                    <motion.span
                      className="w-9 h-9 rounded-full bg-[#0d1b38] text-white flex items-center justify-center shrink-0"
                      variants={{ rest: { x: 0 }, hover: { x: 2 } }}
                      transition={SPRING}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M13 6l6 6-6 6"/>
                      </svg>
                    </motion.span>
                  </motion.div>
                </Link>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
