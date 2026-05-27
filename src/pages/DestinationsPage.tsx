import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { CTABanner } from '@/components/CTABanner';
import { SEOHead } from '@/components/SEOHead';

const fadeUp = {
  initial:    { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport:   { once: false, margin: '-60px' },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
};

type Region = 'All' | 'Africa' | 'Europe' | 'Middle East' | 'Americas';

const DESTINATIONS = [
  { name: 'Rome',         country: 'Italy',          region: 'Europe' as Region,       subtitleKey: 'rome_subtitle',      bodyKey: 'rome_body',        tags: ['Culture', 'History', 'Food'],          gradient: 'linear-gradient(135deg, #c41e3a 0%, #8b1a2e 100%)' },
  { name: 'Serengeti',    country: 'Tanzania',        region: 'Africa' as Region,       subtitleKey: 'serengeti_subtitle', bodyKey: 'serengeti_body',   tags: ['Wildlife', 'Adventure', 'Nature'],     gradient: 'linear-gradient(135deg, #d97706 0%, #92400e 100%)' },
  { name: 'Greek Islands', country: 'Greece',         region: 'Europe' as Region,       subtitleKey: 'greek_subtitle',     bodyKey: 'greek_body',       tags: ['Romance', 'Beach', 'Culture'],         gradient: 'linear-gradient(135deg, #0369a1 0%, #075985 100%)' },
  { name: 'Dubai',        country: 'UAE',             region: 'Middle East' as Region,  subtitleKey: 'dubai_subtitle',     bodyKey: 'dubai_body',       tags: ['Luxury', 'Architecture', 'Shopping'], gradient: 'linear-gradient(135deg, #b45309 0%, #78350f 100%)' },
  { name: 'London',       country: 'United Kingdom',  region: 'Europe' as Region,       subtitleKey: 'london_subtitle',    bodyKey: 'london_body',      tags: ['Urban', 'Culture', 'History'],         gradient: 'linear-gradient(135deg, #1e3a5f 0%, #0f1f3d 100%)' },
  { name: 'New York',     country: 'United States',   region: 'Americas' as Region,     subtitleKey: 'new_york_subtitle',  bodyKey: 'new_york_body',    tags: ['Urban', 'Culture', 'Food'],            gradient: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)' },
  { name: 'Cartagena',    country: 'Colombia',        region: 'Americas' as Region,     subtitleKey: 'colombia_subtitle',  bodyKey: 'colombia_body',    tags: ['History', 'Beach', 'Culture'],         gradient: 'linear-gradient(135deg, #6d28d9 0%, #4c1d95 100%)' },
  { name: 'Buenos Aires', country: 'Argentina',       region: 'Americas' as Region,     subtitleKey: 'colombia_subtitle',  bodyKey: 'colombia_body',    tags: ['Food', 'Dance', 'Architecture'],       gradient: 'linear-gradient(135deg, #0f766e 0%, #065f46 100%)' },
];

const REGION_KEYS: { value: Region; key: string }[] = [
  { value: 'All',         key: 'filter_all' },
  { value: 'Africa',      key: 'filter_africa' },
  { value: 'Europe',      key: 'filter_europe' },
  { value: 'Middle East', key: 'filter_middle_east' },
  { value: 'Americas',    key: 'filter_americas' },
];

const TIPS = [
  { icon: '🛂', title: 'Passport Renewal', body: 'Renew at least 6 months before your travel date.' },
  { icon: '💳', title: 'Notify Your Bank',  body: 'Inform your bank before travelling internationally.' },
  { icon: '🧳', title: 'Pack Light',        body: 'Pack 30% less than you think you need.' },
  { icon: '📄', title: 'Print Bookings',    body: 'Always carry printed copies of all key documents.' },
];

export default function DestinationsPage() {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState<Region>('All');

  const filtered = DESTINATIONS.filter((d) => {
    const matchRegion = region === 'All' || d.region === region;
    const matchSearch = search === '' ||
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.country.toLowerCase().includes(search.toLowerCase());
    return matchRegion && matchSearch;
  });

  return (
    <div>
      <SEOHead
        title="Destinations — Next Route Travels"
        description="Every destination we feature is one we know intimately — Rome, Serengeti, Dubai, London and more, with curated guides to help you travel smarter."
        canonicalPath="/destinations"
      />
      {/* ── HERO ── */}
      <section className="relative min-h-[60vh] flex items-center bg-[#0d1b38] overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-blue-400/08 blur-[100px] pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-36 pb-20 w-full">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-white/60" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                {t('destinations_page.eyebrow')}
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white mb-6" style={{ fontFamily: 'Clash Display, sans-serif' }}>
              {t('destinations_page.heading')}
            </h1>
            <p className="text-xl text-white/45 max-w-xl mx-auto mb-10" style={{ fontFamily: 'Satoshi, sans-serif' }}>
              {t('destinations_page.sub')}
            </p>

            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
              <input
                type="text"
                placeholder={t('destinations_page.search_placeholder')}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-14 rounded-full border border-white/15 bg-white/5 pl-11 pr-6 text-sm text-white placeholder:text-white/30 backdrop-blur-sm outline-none focus:border-blue-400/50 transition-colors"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FEATURED DESTINATION ── */}
      <section className="py-16 px-6 bg-[#f5f8fc]">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp}>
            <Link to="/destinations" className="group block">
              <div className="relative rounded-3xl overflow-hidden h-80 md:h-96"
                style={{ background: 'linear-gradient(135deg, #d97706 0%, #92400e 50%, #78350f 100%)' }}>
                <div className="absolute inset-0 bg-black/30" />
                <div aria-hidden className="absolute inset-0 opacity-[0.06]"
                  style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
                <div className="relative z-10 h-full flex flex-col justify-end p-10">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/15 text-white backdrop-blur-sm" style={{ fontFamily: 'Satoshi, sans-serif' }}>Featured</span>
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/30 text-amber-200 backdrop-blur-sm" style={{ fontFamily: 'Satoshi, sans-serif' }}>Africa</span>
                      </div>
                      <p className="text-white/60 text-sm font-semibold mb-1" style={{ fontFamily: 'Satoshi, sans-serif' }}>Tanzania, Africa</p>
                      <h2 className="text-4xl md:text-5xl font-black text-white" style={{ fontFamily: 'Clash Display, sans-serif' }}>Serengeti</h2>
                      <p className="mt-2 text-white/70 text-lg" style={{ fontFamily: 'Satoshi, sans-serif' }}>{t('destinations_page.serengeti_subtitle')}</p>
                    </div>
                    <div className="shrink-0 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center border border-white/20 group-hover:bg-white/20 transition-colors duration-300">
                      <ArrowRight className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {['Wildlife', 'Adventure', 'Nature', 'Safari'].map((tag) => (
                      <span key={tag} className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white/70 backdrop-blur-sm" style={{ fontFamily: 'Satoshi, sans-serif' }}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── DESTINATIONS GRID ── */}
      <section className="pb-28 px-6 bg-[#f5f8fc]">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="flex flex-wrap gap-2 mb-10">
            {REGION_KEYS.map(({ value, key }) => (
              <button
                key={value} type="button" onClick={() => setRegion(value)}
                className="px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer"
                style={{
                  fontFamily: 'Satoshi, sans-serif',
                  background: region === value ? '#1a2f5a' : 'transparent',
                  color: region === value ? '#fff' : 'inherit',
                  border: region === value ? '1px solid transparent' : '1px solid rgba(26,47,90,0.2)',
                }}
              >
                {t(`destinations_page.${key}`)}
              </button>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((dest) => (
                <motion.div key={dest.name} layout
                  initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}>
                  <Link to="/destinations" className="group block h-full">
                    <div className="h-full rounded-2xl overflow-hidden border border-slate-100 hover:border-blue-200 hover:shadow-xl transition-all duration-500 hover:-translate-y-1 bg-white">
                      <div className="h-40 relative" style={{ background: dest.gradient }}>
                        <div className="absolute inset-0 bg-black/20" />
                        <div className="absolute top-4 right-4">
                          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-white/15 text-white backdrop-blur-sm" style={{ fontFamily: 'Satoshi, sans-serif' }}>{dest.region}</span>
                        </div>
                        <div className="absolute bottom-4 left-5 flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-white/60" />
                          <p className="text-white/60 text-xs font-semibold" style={{ fontFamily: 'Satoshi, sans-serif' }}>{dest.country}</p>
                        </div>
                        <div className="absolute bottom-4 left-5 top-auto">
                          <p className="text-white text-2xl font-black mt-5" style={{ fontFamily: 'Clash Display, sans-serif' }}>{dest.name}</p>
                        </div>
                      </div>
                      <div className="p-6">
                        <p className="text-blue-600 text-xs font-bold mb-2" style={{ fontFamily: 'Satoshi, sans-serif' }}>{t(`destinations_page.${dest.subtitleKey}`)}</p>
                        <p className="text-sm text-slate-500 leading-relaxed mb-4" style={{ fontFamily: 'Satoshi, sans-serif' }}>{t(`destinations_page.${dest.bodyKey}`)}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {dest.tags.map((tag) => (
                            <span key={tag} className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-500" style={{ fontFamily: 'Satoshi, sans-serif' }}>{tag}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-slate-400 text-lg" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                {t('destinations_page.no_results')} "{search}"
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── TRAVEL TIPS ── */}
      <section className="py-24 px-6 bg-[#0d1b38]">
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-14" {...fadeUp}>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white" style={{ fontFamily: 'Clash Display, sans-serif' }}>
              Smart Traveller Tips
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TIPS.map(({ icon, title, body }, i) => (
              <motion.div key={title} {...fadeUp} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
                className="p-7 rounded-2xl border border-white/08 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/15 transition-all duration-500">
                <div className="text-3xl mb-5">{icon}</div>
                <h3 className="text-base font-black text-white mb-3" style={{ fontFamily: 'Clash Display, sans-serif' }}>{title}</h3>
                <p className="text-sm text-white/40 leading-relaxed" style={{ fontFamily: 'Satoshi, sans-serif' }}>{body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </div>
  );
}
