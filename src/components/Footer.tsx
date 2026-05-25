import { Link } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';
import { Send } from 'lucide-react';
import { InstagramIcon, XIcon, FacebookIcon } from '@/components/SocialIcons';
import { motion, useInView } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { useTheme } from '@/providers/ThemeProvider';
import { Logo } from '@/components/Logo';

const NAV_COLS = [
  {
    heading: 'Explore',
    links: [
      { to: '/',             label: 'Home' },
      { to: '/services',     label: 'Services' },
      { to: '/destinations', label: 'Destinations' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { to: '/our-story',  label: 'Our Story' },
      { to: '/enquiries',  label: 'Enquiries' },
    ],
  },
  {
    heading: 'Services',
    links: [
      { to: '/services', label: 'Flights' },
      { to: '/services', label: 'Road Travel' },
      { to: '/services', label: 'Expeditions' },
    ],
  },
  {
    heading: 'Destinations',
    links: [
      { to: '/destinations', label: 'Rome' },
      { to: '/destinations', label: 'Serengeti' },
      { to: '/destinations', label: 'Greek Islands' },
    ],
  },
];

const SOCIAL = [
  { href: 'https://instagram.com', label: 'Instagram',   Icon: InstagramIcon },
  { href: 'https://twitter.com',   label: 'X (Twitter)', Icon: XIcon },
  { href: 'https://facebook.com',  label: 'Facebook',    Icon: FacebookIcon },
];

const CHAR_WIDTH_RATIO = 6.1;

function NextRouteWordmark() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [fontSize, setFontSize] = useState(0);

  useEffect(() => {
    function measure() {
      if (!wrapperRef.current) return;
      const w = wrapperRef.current.offsetWidth;
      setFontSize(w / CHAR_WIDTH_RATIO);
    }
    document.fonts.ready.then(measure);
    const ro = new ResizeObserver(measure);
    if (wrapperRef.current) ro.observe(wrapperRef.current);
    return () => ro.disconnect();
  }, []);

  const visibleHeight = fontSize * 0.52;

  return (
    <div
      ref={wrapperRef}
      className="relative w-full overflow-hidden select-none pointer-events-none"
      style={{ height: fontSize > 0 ? visibleHeight : 80 }}
      aria-hidden
    >
      {fontSize > 0 && (
        <p
          className="absolute top-0 left-0 font-black whitespace-nowrap"
          style={{
            fontFamily: 'Clash Display, sans-serif',
            fontSize,
            lineHeight: 1,
            letterSpacing: '-0.02em',
            color: 'hsl(var(--foreground) / 0.07)',
          }}
        >
          NEXT ROUTE
        </p>
      )}
    </div>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const [email, setEmail] = useState('');
  const [sent, setSent]   = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: false, margin: '-60px' });

  const fade = (delay = 0) => ({
    initial:    { opacity: 0, y: 28 },
    animate:    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 },
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const, delay },
  });

  const handleSend = () => {
    if (email) { setSent(true); setEmail(''); }
  };

  return (
    <footer className="mt-24 px-4 sm:px-6 pb-0">
      <div ref={cardRef} className="max-w-5xl mx-auto rounded-3xl border border-border/50 bg-card overflow-hidden">

        <div className="px-8 pt-10 pb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_auto_auto_auto_auto] gap-10">
          <motion.div className="space-y-5" {...fade(0)}>
            <Link to="/">
              <Logo variant={isDark ? 'white' : 'default'} size="md" />
            </Link>

            <p
              className="text-sm text-muted-foreground max-w-[240px] leading-relaxed"
              style={{ fontFamily: 'Satoshi, sans-serif' }}
            >
              Next Route Travels — Reliable Journeys Across Nigeria & Beyond.
            </p>

            <div className="flex items-center gap-0.5">
              {SOCIAL.map(({ href, label, Icon }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex items-center justify-center w-9 h-9 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent transition-colors ease-in duration-[600ms]"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </motion.div>

          <div className="col-span-1 sm:col-span-2 lg:contents">
            <div className="flex flex-wrap gap-x-0 gap-y-8 sm:contents">
              {NAV_COLS.map(({ heading, links }, colIdx) => (
                <motion.div
                  key={heading}
                  className="w-1/2 sm:w-auto space-y-4"
                  {...fade(0.1 + colIdx * 0.08)}
                >
                  <p
                    className="text-[11px] font-bold tracking-[0.2em] text-muted-foreground uppercase"
                    style={{ fontFamily: 'Satoshi, sans-serif' }}
                  >
                    {heading}
                  </p>
                  <ul className="space-y-3">
                    {links.map((link) => (
                      <li key={link.label}>
                        <Link
                          to={link.to}
                          className="text-sm text-muted-foreground hover:text-foreground transition-colors ease-in duration-[600ms]"
                          style={{ fontFamily: 'Satoshi, sans-serif' }}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="mx-8 border-t border-border/40" />

        <motion.div
          className="px-8 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          {...fade(0.18)}
        >
          <p
            className="text-[11px] text-muted-foreground/60"
            style={{ fontFamily: 'Satoshi, sans-serif' }}
          >
            {sent
              ? '✓ You\'re on the list. Safe travels!'
              : `© ${year} Next Route Travels. Made with ❤️ in Lagos, Nigeria.`}
          </p>

          <div
            className="relative flex items-center w-full sm:w-[280px] rounded-full overflow-hidden"
            style={{
              background: isDark ? '#000' : '#fff',
              border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.1)',
              height: 52,
            }}
          >
            <Input
              type="email"
              placeholder="Join our travel newsletter..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className={`h-full flex-1 border-0 bg-transparent text-sm focus-visible:ring-0 focus-visible:ring-offset-0 pl-5 pr-14 ${
                isDark ? 'text-white/80 placeholder:text-white/25' : 'text-black/70 placeholder:text-black/30'
              }`}
              style={{ fontFamily: 'Satoshi, sans-serif' }}
            />
            <motion.button
              type="button"
              onClick={handleSend}
              whileHover="hover"
              className={`absolute right-1.5 flex items-center justify-center rounded-full shrink-0 cursor-pointer overflow-hidden ${
                isDark ? 'bg-white' : 'bg-black'
              }`}
              style={{ width: 38, height: 38 }}
              aria-label="Subscribe"
            >
              <motion.span
                variants={{ hover: { x: 14, y: -14, opacity: 0, transition: { duration: 0.18, ease: 'easeIn' } } }}
                animate={{ x: [0, 1.5, 0], y: [0, -1.5, 0] }}
                transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 2.5, ease: 'easeInOut' }}
                className="absolute flex items-center justify-center"
              >
                <Send size={15} strokeWidth={2} className={isDark ? 'text-black' : 'text-white'} />
              </motion.span>
              <motion.span
                variants={{ hover: { x: ['-100%', '0%'], y: ['100%', '0%'], opacity: [0, 1], transition: { duration: 0.22, ease: 'easeOut', delay: 0.18 } } }}
                initial={{ x: '-100%', y: '100%', opacity: 0 }}
                className="absolute flex items-center justify-center"
              >
                <Send size={15} strokeWidth={2} className={isDark ? 'text-black' : 'text-white'} />
              </motion.span>
            </motion.button>
          </div>
        </motion.div>

        <motion.div className="-ml-[20px]" {...fade(0.28)}>
          <NextRouteWordmark />
        </motion.div>

      </div>
      <div className="h-8" />
    </footer>
  );
}
