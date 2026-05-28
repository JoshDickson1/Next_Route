import { Link } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';
import { Send } from 'lucide-react';
import { InstagramIcon, XIcon, FacebookIcon } from '@/components/SocialIcons';
import { motion, useInView } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { useTranslation } from 'react-i18next';

const NAV_COLS = [
  {
    headingKey: 'footer.explore_col',
    links: [
      { to: '/',             labelKey: 'nav.home' },
      { to: '/services',     labelKey: 'nav.services' },
      { to: '/destinations', labelKey: 'nav.destinations' },
    ],
  },
  {
    headingKey: 'footer.company_col',
    links: [
      { to: '/our-story',  labelKey: 'nav.our_story' },
      { to: '/team',       labelKey: 'nav.team'      },
      { to: '/reviews',    labelKey: 'nav.reviews'   },
      { to: '/enquiries',  labelKey: 'nav.enquiries' },
    ],
  },
  {
    headingKey: 'footer.services_col',
    links: [
      { to: '/services', labelKey: 'footer.flights' },
      { to: '/services', labelKey: 'footer.road_travel_link' },
      { to: '/services', labelKey: 'footer.expeditions' },
    ],
  },
  {
    headingKey: 'footer.destinations_col',
    links: [
      { to: '/destinations', labelKey: 'footer.rome' },
      { to: '/destinations', labelKey: 'footer.serengeti' },
      { to: '/destinations', labelKey: 'footer.greek_islands' },
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
          className="absolute -top-5 left-0 font-black whitespace-nowrap"
          style={{
            fontFamily: 'Clash Display, sans-serif',
            fontSize,
            lineHeight: 1,
            letterSpacing: '-0.02em',
            color: 'rgba(255,255,255,0.05)',
          }}
        >
          NEXT ROUTE
        </p>
      )}
    </div>
  );
}

export function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();
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
      <div
        ref={cardRef}
        className="max-w-5xl mx-auto rounded-3xl overflow-hidden"
        style={{
          background: 'linear-gradient(160deg, #0d1b38 0%, #112248 60%, #0d1b38 100%)',
          border: '1px solid rgba(255,255,255,0.08)',
        }}
      >

        <div className="px-8 pt-10 pb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_auto_auto_auto_auto] gap-10">
          <motion.div className="space-y-6" {...fade(0)}>
            <Link to="/" className="block -ml-9">
              <img
                src="/assets/logo.png"
                alt="Next Route Travels"
                className="h-12 w-auto object-contain"
                style={{ mixBlendMode: 'screen' }}
              />
            </Link>

            <p
              className="text-sm max-w-[240px] leading-relaxed"
              style={{ fontFamily: 'Satoshi, sans-serif', color: 'rgba(255,255,255,0.5)' }}
            >
              {t('footer.tagline')}
            </p>

            <div className="flex items-center gap-2">
              {SOCIAL.map(({ href, label, Icon }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex items-center justify-center w-9 h-9 rounded-xl text-white/60 hover:text-white transition-colors ease-in duration-[400ms]"
                  style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </motion.div>

          <div className="col-span-1 sm:col-span-2 lg:contents">
            <div className="flex flex-wrap gap-x-0 gap-y-8 sm:contents">
              {NAV_COLS.map(({ headingKey, links }, colIdx) => (
                <motion.div
                  key={headingKey}
                  className="w-1/2 sm:w-auto space-y-4"
                  {...fade(0.1 + colIdx * 0.08)}
                >
                  <p
                    className="text-[12px] font-extrabold tracking-[0.2em] uppercase"
                    style={{ fontFamily: 'Satoshi, sans-serif', color: 'rgba(255,255,255,0.9)' }}
                  >
                    {t(headingKey)}
                  </p>
                  <ul className="space-y-3">
                    {links.map((link) => (
                      <li key={link.labelKey}>
                        <Link
                          to={link.to}
                          className="text-sm hover:text-white transition-colors ease-in duration-[400ms]"
                          style={{ fontFamily: 'Satoshi, sans-serif', color: 'rgba(255,255,255,0.45)' }}
                        >
                          {t(link.labelKey)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="mx-8" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }} />

        <motion.div
          className="px-8 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          {...fade(0.18)}
        >
          <p
            className="text-[12px]"
            style={{ fontFamily: 'Satoshi, sans-serif', color: 'rgba(255,255,255,0.3)' }}
          >
            {sent
              ? t('footer.newsletter_success')
              : t('footer.copyright', { year })}{' '}
            <span style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>BiTech.</span>
          </p>

          <div
            className="relative flex items-center w-full sm:w-[280px] rounded-full overflow-hidden"
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.12)',
              height: 52,
            }}
          >
            <Input
              type="email"
              placeholder={t('footer.newsletter_placeholder')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="h-full flex-1 border-0 bg-transparent text-sm focus-visible:ring-0 focus-visible:ring-offset-0 pl-5 pr-14 text-white/75 placeholder:text-white/25"
              style={{ fontFamily: 'Satoshi, sans-serif' }}
            />
            <motion.button
              type="button"
              onClick={handleSend}
              whileHover="hover"
              className="absolute right-1.5 flex items-center justify-center rounded-full shrink-0 cursor-pointer overflow-hidden bg-white"
              style={{ width: 38, height: 38 }}
              aria-label="Subscribe"
            >
              <motion.span
                variants={{ hover: { x: 14, y: -14, opacity: 0, transition: { duration: 0.18, ease: 'easeIn' } } }}
                animate={{ x: [0, 1.5, 0], y: [0, -1.5, 0] }}
                transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 2.5, ease: 'easeInOut' }}
                className="absolute flex items-center justify-center"
              >
                <Send size={15} strokeWidth={2} className="text-[#0d1b38]" />
              </motion.span>
              <motion.span
                variants={{ hover: { x: ['-100%', '0%'], y: ['100%', '0%'], opacity: [0, 1], transition: { duration: 0.22, ease: 'easeOut', delay: 0.18 } } }}
                initial={{ x: '-100%', y: '100%', opacity: 0 }}
                className="absolute flex items-center justify-center"
              >
                <Send size={15} strokeWidth={2} className="text-[#0d1b38]" />
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
