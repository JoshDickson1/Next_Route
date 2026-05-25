import { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
// import { ThemeToggle } from '@/components/common/ThemeToggle';
import { CutoutButton } from '@/components/ui/CutoutButton';
import { Logo } from '@/components/Logo';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { to: '/',             label: 'Home',         end: true },
  { to: '/services',     label: 'Services' },
  { to: '/destinations', label: 'Destinations' },
  { to: '/our-story',    label: 'Our Story' },
  { to: '/enquiries',    label: 'Enquiries' },
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
  const navigate = useNavigate();

  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navStyle: React.CSSProperties = {
    background: 'rgba(13, 27, 56, 0.55)',
    backdropFilter: 'blur(80px) saturate(220%) brightness(0.9)',
    WebkitBackdropFilter: 'blur(80px) saturate(220%) brightness(0.9)',
    borderTop: '1px solid rgba(255,255,255,0.14)',
    borderLeft: '1px solid rgba(255,255,255,0.08)',
    borderRight: '1px solid rgba(255,255,255,0.08)',
    borderBottom: '1px solid rgba(255,255,255,0.04)',
    boxShadow: '0 4px 24px rgba(0,0,0,0.25)',
    transition: 'none',
  };

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
          animate={{ paddingTop: scrolled ? 10 : 14, paddingBottom: scrolled ? 10 : 14 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="pointer-events-auto mt-4 flex items-center justify-between gap-2 px-5 rounded-full w-[calc(100vw-48px)] md:w-auto"
          style={navStyle}
        >
          <Link to="/" className="shrink-0">
            <Logo variant="white" size="sm" />
          </Link>

          <div
            className="hidden md:block w-px h-5 mx-2 shrink-0"
            style={{ background: 'rgba(255,255,255,0.15)' }}
          />

          <nav className="hidden md:flex items-center gap-0.5">
            {NAV_LINKS.map(({ to, label, end }) => (
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
                      {label}
                    </span>
                  </div>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-1.5 ml-2">
            {/* <ThemeToggle /> */}

            <div className="hidden sm:block shrink-0 ml-1">
              <CutoutButton size={40} onClick={() => navigate('/enquiries')}>
                Book a Trip
              </CutoutButton>
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
                {NAV_LINKS.map(({ to, label, end }) => (
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
                        {label}
                      </div>
                    )}
                  </NavLink>
                ))}
                <Link
                  to="/enquiries"
                  onClick={() => setMobileOpen(false)}
                  className="mt-1 flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl text-white text-[15px] font-bold"
                  style={{ fontFamily: 'Satoshi, sans-serif', background: 'linear-gradient(135deg, #1a3566 0%, #0d1b38 100%)' }}
                >
                  Book a Trip
                </Link>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
