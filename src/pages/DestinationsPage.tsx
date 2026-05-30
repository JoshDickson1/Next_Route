import { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight, X, FileText, CreditCard, Luggage, BookMarked, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { SEOHead } from '@/components/SEOHead';
import { DestinationCard } from '@/components/ui/card-21';

type Region = 'All' | 'Africa' | 'Europe' | 'Middle East' | 'Americas';

const DESTINATIONS = [
  { slug: 'rome',          name: 'Rome',          country: 'Italy',          region: 'Europe'      as Region, tags: ['Culture', 'History', 'Food'],         flag: '🇮🇹', stats: '340+ Hotels · 18 Packages', imageUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&auto=format&fit=crop&q=80',  themeColor: '0 60% 30%',   lat: 41.9028,   lng: 12.4964   },
  { slug: 'serengeti',     name: 'Serengeti',     country: 'Tanzania',       region: 'Africa'      as Region, tags: ['Wildlife', 'Adventure', 'Nature'],    flag: '🇹🇿', stats: '85 Lodges · 12 Safaris',    imageUrl: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&auto=format&fit=crop&q=80', themeColor: '35 70% 30%',  lat: -4.9000,   lng: 34.8000   },
  { slug: 'greek-islands', name: 'Greek Islands', country: 'Greece',         region: 'Europe'      as Region, tags: ['Romance', 'Beach', 'Culture'],        flag: '🇬🇷', stats: '210+ Villas · 24 Packages', imageUrl: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&auto=format&fit=crop&q=80', themeColor: '200 70% 28%', lat: 37.0000,   lng: 25.0000   },
  { slug: 'dubai',         name: 'Dubai',         country: 'UAE',            region: 'Middle East' as Region, tags: ['Luxury', 'Architecture', 'Shopping'], flag: '🇦🇪', stats: '520+ Hotels · 32 Packages', imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&auto=format&fit=crop&q=80', themeColor: '38 55% 28%',  lat: 25.2048,   lng: 55.2708   },
  { slug: 'london',        name: 'London',        country: 'United Kingdom', region: 'Europe'      as Region, tags: ['Urban', 'Culture', 'History'],        flag: '🇬🇧', stats: '890+ Hotels · 28 Packages', imageUrl: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&auto=format&fit=crop&q=80', themeColor: '215 55% 20%', lat: 51.5074,   lng: -0.1276   },
  { slug: 'new-york',      name: 'New York',      country: 'United States',  region: 'Americas'    as Region, tags: ['Urban', 'Culture', 'Food'],           flag: '🇺🇸', stats: '740+ Hotels · 22 Packages', imageUrl: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&auto=format&fit=crop&q=80', themeColor: '240 50% 22%', lat: 40.7128,   lng: -74.0060  },
  { slug: 'cartagena',     name: 'Cartagena',     country: 'Colombia',       region: 'Americas'    as Region, tags: ['History', 'Beach', 'Culture'],        flag: '🇨🇴', stats: '120+ Hotels · 15 Packages', imageUrl: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800&auto=format&fit=crop&q=80', themeColor: '270 60% 28%', lat: 10.3910,   lng: -75.4794  },
  { slug: 'buenos-aires',  name: 'Buenos Aires',  country: 'Argentina',      region: 'Americas'    as Region, tags: ['Food', 'Dance', 'Architecture'],      flag: '🇦🇷', stats: '180+ Hotels · 16 Packages', imageUrl: 'https://images.unsplash.com/photo-1589909202802-8f4aadce1849?w=800&auto=format&fit=crop&q=80', themeColor: '168 60% 22%', lat: -34.6037,  lng: -58.3816  },
];

const REGION_KEYS: { value: Region; key: string }[] = [
  { value: 'All',         key: 'filter_all' },
  { value: 'Africa',      key: 'filter_africa' },
  { value: 'Europe',      key: 'filter_europe' },
  { value: 'Middle East', key: 'filter_middle_east' },
  { value: 'Americas',    key: 'filter_americas' },
];

const KEYWORD_TAGS = ['Wildlife', 'Beach', 'Luxury', 'History', 'Culture', 'Food', 'Urban', 'Adventure'];

const TIPS = [
  { Icon: FileText,   title: 'Passport Renewal', body: 'Renew at least 6 months before your travel date.',    accent: '#60a5fa', bg: 'rgba(96,165,250,0.12)'  },
  { Icon: CreditCard, title: 'Notify Your Bank',  body: 'Inform your bank before travelling internationally.', accent: '#34d399', bg: 'rgba(52,211,153,0.12)'  },
  { Icon: Luggage,    title: 'Pack Light',        body: 'Pack 30% less than you think you need.',              accent: '#fbbf24', bg: 'rgba(251,191,36,0.12)'  },
  { Icon: BookMarked, title: 'Print Bookings',    body: 'Always carry printed copies of all key documents.',   accent: '#f87171', bg: 'rgba(248,113,113,0.12)' },
];

// ── Featured Carousel ─────────────────────────────────────────────────────────

function FeaturedCarousel() {
  const [current, setCurrent]   = useState(0);
  const [direction, setDirection] = useState(1);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = useCallback((idx: number, dir: number) => {
    setDirection(dir);
    setCurrent(idx);
  }, []);

  const next = useCallback(() => {
    setCurrent((c) => {
      const n = (c + 1) % DESTINATIONS.length;
      setDirection(1);
      return n;
    });
  }, []);

  const prev = useCallback(() => {
    setCurrent((c) => {
      const n = (c - 1 + DESTINATIONS.length) % DESTINATIONS.length;
      setDirection(-1);
      return n;
    });
  }, []);

  useEffect(() => {
    intervalRef.current = setInterval(next, 5000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [next]);

  const resetTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(next, 5000);
  };

  const dest = DESTINATIONS[current];

  return (
    <div className="relative rounded-3xl overflow-hidden h-80 md:h-[440px] select-none"
      style={{ boxShadow: `0 8px 60px -12px hsl(${dest.themeColor} / 0.5)`, transition: 'box-shadow 0.8s ease' }}>

      {/* Slides */}
      <AnimatePresence custom={direction} mode="sync">
        <motion.div
          key={dest.slug}
          custom={direction}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          {/* Hero image */}
          <img
            src={dest.imageUrl}
            alt={dest.name}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: 'center 35%' }}
          />
          {/* Gradient overlays */}
          <div className="absolute inset-0"
            style={{ background: `linear-gradient(to right, hsl(${dest.themeColor} / 0.9) 0%, hsl(${dest.themeColor} / 0.55) 45%, transparent 72%)` }} />
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 55%)' }} />

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col justify-between p-8 md:p-10">
            {/* Top badges */}
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/15 text-white backdrop-blur-sm" style={{ fontFamily: 'Satoshi, sans-serif' }}>Featured</span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm"
                style={{ background: `hsl(${dest.themeColor} / 0.45)`, color: 'rgba(255,255,255,0.9)', border: '1px solid rgba(255,255,255,0.15)', fontFamily: 'Satoshi, sans-serif' }}>
                {dest.region}
              </span>
            </div>

            {/* Bottom content */}
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-white/55 text-sm font-semibold mb-1" style={{ fontFamily: 'Satoshi, sans-serif' }}>{dest.country}</p>
                <h2 className="text-5xl md:text-7xl font-black text-white leading-[0.9] mb-2" style={{ fontFamily: 'Clash Display, sans-serif' }}>
                  {dest.name}
                </h2>
                <p className="text-white/50 text-sm mb-4" style={{ fontFamily: 'Satoshi, sans-serif' }}>{dest.stats}</p>
                <div className="flex flex-wrap gap-2">
                  {dest.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white/70 backdrop-blur-sm border border-white/10" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA arrow */}
              <Link to={`/destinations/${dest.slug}`} className="shrink-0">
                <motion.div
                  className="w-14 h-14 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.3)', backdropFilter: 'blur(10px)' }}
                  whileHover={{ scale: 1.1, background: 'rgba(255,255,255,0.22)' }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                >
                  <ArrowRight className="w-5 h-5 text-white" />
                </motion.div>
              </Link>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Prev / Next arrows */}
      <button
        onClick={() => { prev(); resetTimer(); }}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer"
        style={{ background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)', color: '#fff' }}
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={() => { next(); resetTimer(); }}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer"
        style={{ background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)', color: '#fff' }}
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5">
        {DESTINATIONS.map((_, i) => (
          <button
            key={i}
            onClick={() => { go(i, i > current ? 1 : -1); resetTimer(); }}
            className="rounded-full transition-all duration-400 cursor-pointer"
            style={{
              width:   i === current ? 20 : 6,
              height:  6,
              background: i === current ? '#fff' : 'rgba(255,255,255,0.35)',
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function DestinationsPage() {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState<Region>('All');

  const filtered = DESTINATIONS.filter((d) => {
    const matchRegion = region === 'All' || d.region === region;
    const q = search.toLowerCase();
    const matchSearch = q === '' ||
      d.name.toLowerCase().includes(q) ||
      d.country.toLowerCase().includes(q) ||
      d.tags.some((tag) => tag.toLowerCase().includes(q));
    return matchRegion && matchSearch;
  });

  const handleKeyword = (kw: string) => {
    setSearch((prev) => (prev.toLowerCase() === kw.toLowerCase() ? '' : kw));
    setRegion('All');
  };

  return (
    <div>
      <SEOHead
        title="Destinations — Next Route Travels"
        description="Every destination we feature is one we know intimately — Rome, Serengeti, Dubai, London and more, with curated guides to help you travel smarter."
        canonicalPath="/destinations"
      />

      {/* ── HERO ── */}
      <section className="relative bg-[#0d1b38] overflow-hidden pt-[72px] pb-20 flex flex-col items-center justify-center min-h-[82vh]">

        {/* Atmospheric glows */}
        <div className="absolute top-1/3 -right-48 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(74,144,217,0.11) 0%, transparent 65%)' }} />
        <div className="absolute bottom-0 -left-24 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(36,58,110,0.55) 0%, transparent 70%)' }} />

        {/* Subtle dot grid */}
        <div aria-hidden className="absolute inset-0 pointer-events-none opacity-[0.022]"
          style={{ backgroundImage: 'radial-gradient(rgba(168,204,232,0.9) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

        {/* Floating destination tags — decorative */}
        {[
          { name: 'Rome',         flag: '🇮🇹', top: '22%', left:  '7%',  delay: 0    },
          { name: 'Serengeti',    flag: '🇹🇿', top: '55%', left:  '4%',  delay: 0.6  },
          { name: 'Dubai',        flag: '🇦🇪', top: '18%', right: '6%',  delay: 1.1  },
          { name: 'London',       flag: '🇬🇧', top: '42%', right: '5%',  delay: 0.3  },
          { name: 'New York',     flag: '🇺🇸', top: '68%', right: '8%',  delay: 0.9  },
          { name: 'Cartagena',    flag: '🇨🇴', top: '75%', left:  '6%',  delay: 1.4  },
          { name: 'Buenos Aires', flag: '🇦🇷', top: '32%', left:  '14%', delay: 0.5  },
          { name: 'Greek Islands',flag: '🇬🇷', top: '58%', right: '13%', delay: 1.7  },
        ].map((tag, i) => (
          <motion.div
            key={tag.name}
            className="absolute hidden lg:inline-flex items-center gap-2 rounded-full px-3 py-1.5 select-none pointer-events-none"
            style={{
              top: tag.top,
              left: (tag as { left?: string }).left,
              right: (tag as { right?: string }).right,
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              backdropFilter: 'blur(8px)',
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: [0, 0.65, 0.65, 0], y: [10, 0, 0, -6] }}
            transition={{ duration: 5, delay: tag.delay, repeat: Infinity, repeatDelay: 2 + i * 0.4, ease: 'easeInOut' }}
          >
            <span className="text-sm">{tag.flag}</span>
            <span className="text-[12px] font-semibold text-white/70" style={{ fontFamily: 'Satoshi, sans-serif' }}>{tag.name}</span>
          </motion.div>
        ))}

        <div className="relative z-10 w-full max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="w-full"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 mb-4 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-white/60" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                {t('destinations_page.eyebrow')}
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white mb-3 leading-[0.95]" style={{ fontFamily: 'Clash Display, sans-serif' }}>
              {t('destinations_page.heading')}
            </h1>
            <p className="text-base text-white/40 max-w-md mx-auto mb-8" style={{ fontFamily: 'Satoshi, sans-serif' }}>
              {t('destinations_page.sub')}
            </p>

            {/* Search bar */}
            <div className="relative w-full rounded-2xl overflow-hidden"
              style={{ background: 'rgba(13,27,56,0.75)', border: '1px solid rgba(168,204,232,0.18)', backdropFilter: 'blur(20px)', boxShadow: '0 8px 40px rgba(0,0,0,0.35)' }}>
              <div className="flex items-center px-4 gap-3">
                <Search className="w-4 h-4 text-white/35 shrink-0" />
                <input
                  type="text"
                  placeholder={t('destinations_page.search_placeholder')}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex-1 h-14 bg-transparent text-sm text-white placeholder:text-white/30 outline-none"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                />
                <AnimatePresence>
                  {search && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
                      type="button" onClick={() => setSearch('')}
                      className="w-6 h-6 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors shrink-0"
                    >
                      <X className="w-3 h-3 text-white/60" />
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
              <div className="flex items-center gap-2 px-4 pb-3 flex-wrap">
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/25 shrink-0" style={{ fontFamily: 'Satoshi, sans-serif' }}>Popular:</span>
                {KEYWORD_TAGS.map((kw) => {
                  const active = search.toLowerCase() === kw.toLowerCase();
                  return (
                    <motion.button
                      key={kw} type="button" onClick={() => handleKeyword(kw)}
                      whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                      className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold transition-all duration-200 cursor-pointer"
                      style={{ fontFamily: 'Satoshi, sans-serif', background: active ? '#4a90d9' : 'rgba(255,255,255,0.07)', color: active ? '#fff' : 'rgba(255,255,255,0.45)', border: active ? '1px solid #4a90d9' : '1px solid rgba(255,255,255,0.12)' }}
                    >
                      {kw}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FEATURED CAROUSEL ── */}
      <section className="py-10 px-6 bg-[#f5f8fc]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '200px 0px -60px 0px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <FeaturedCarousel />
          </motion.div>
        </div>
      </section>

      {/* ── DESTINATIONS GRID ── */}
      <section className="pb-28 bg-[#f5f8fc]">

        {/* Sticky filter tabs */}
        <div
          className="sticky z-30 px-6 py-4"
          style={{
            top: 72,
            background: 'rgba(245,248,252,0.88)',
            backdropFilter: 'blur(20px) saturate(180%)',
            borderBottom: '1px solid rgba(13,27,56,0.06)',
          }}
        >
          <div className="max-w-7xl mx-auto flex flex-wrap gap-2">
            {REGION_KEYS.map(({ value, key }) => (
              <motion.button
                key={value}
                type="button"
                onClick={() => setRegion(value)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                className="px-5 py-2 rounded-full text-sm font-semibold cursor-pointer"
                style={{
                  fontFamily: 'Satoshi, sans-serif',
                  background: region === value ? '#1a2f5a' : 'transparent',
                  color:      region === value ? '#fff'    : 'rgba(13,27,56,0.55)',
                  border:     region === value ? '1px solid transparent' : '1px solid rgba(26,47,90,0.18)',
                  transition: 'background 0.2s, color 0.2s, border-color 0.2s',
                }}
              >
                {t(`destinations_page.${key}`)}
              </motion.button>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((dest, i) => (
                <motion.div
                  key={dest.name}
                  layout
                  className="h-[420px]"
                  initial={{ opacity: 0, y: 36, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.93, y: 20 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: false, margin: '200px 0px -40px 0px' }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: (i % 3) * 0.07 }}
                >
                  <DestinationCard
                    imageUrl={dest.imageUrl}
                    location={dest.name}
                    flag={dest.flag}
                    stats={dest.stats}
                    href={`/destinations/${dest.slug}`}
                    themeColor={dest.themeColor}
                    className="h-full"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <p className="text-slate-400 text-lg mb-4" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                {t('destinations_page.no_results')} "{search}"
              </p>
              <button
                type="button" onClick={() => { setSearch(''); setRegion('All'); }}
                className="px-5 py-2 rounded-full text-sm font-semibold text-white transition-colors"
                style={{ background: '#1a2f5a', fontFamily: 'Satoshi, sans-serif' }}
              >
                Clear filters
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* ── TRAVEL TIPS ── */}
      <section className="py-24 px-6 bg-[#0d1b38]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '200px 0px -60px 0px' }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white" style={{ fontFamily: 'Clash Display, sans-serif' }}>
              Smart Traveller Tips
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TIPS.map(({ Icon, title, body, accent, bg }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: '200px 0px -40px 0px' }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
                className="relative p-7 rounded-2xl overflow-hidden transition-all duration-500"
                style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${accent}28` }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.06)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.03)'; }}
              >
                <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${accent}60, transparent)` }} />
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: bg }}>
                  <Icon className="w-5 h-5" style={{ color: accent }} />
                </div>
                <h3 className="text-base font-black text-white mb-3" style={{ fontFamily: 'Clash Display, sans-serif' }}>{title}</h3>
                <p className="text-sm text-white/40 leading-relaxed" style={{ fontFamily: 'Satoshi, sans-serif' }}>{body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
