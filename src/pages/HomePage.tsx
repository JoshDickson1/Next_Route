import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Globe, Map, Compass, Navigation, Star, Shield, Zap, BookOpen } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { CTABanner } from '@/components/CTABanner';
import { LocationsGlobe } from '@/components/sections/LocationsGlobe';
import { Hero } from '@/components/sections/Hero';
import { SEOHead } from '@/components/SEOHead';

const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'TravelAgency',
  name: 'Next Route Travels',
  description: 'From Lagos to London, Serengeti to New York — seamless air travel, West African road trips, and curated international expeditions.',
  url: 'https://nextroutetravels.com',
  logo: 'https://nextroutetravels.com/fav.png',
  address: { '@type': 'PostalAddress', addressLocality: 'Lagos', addressCountry: 'NG' },
  areaServed: ['Nigeria', 'Ghana', 'West Africa', 'Europe', 'Americas', 'Middle East'],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Travel Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'International Flights' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'West African Road Travel' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Latin America Expeditions' } },
    ],
  },
};

const fadeUp = {
  initial:    { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport:   { once: false, margin: '-60px' },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
};

const SERVICE_KEYS = [
  { Icon: Globe,   titleKey: 'flights_title', bodyKey: 'flights_body' },
  { Icon: Map,     titleKey: 'road_title',    bodyKey: 'road_body' },
  { Icon: Compass, titleKey: 'latam_title',   bodyKey: 'latam_body' },
];

const DEST_CARDS = [
  { name: 'Rome',         region: 'Italy, Europe',    subtitleKey: 'rome_subtitle',      bodyKey: 'rome_body',      gradient: 'linear-gradient(135deg, #c41e3a 0%, #8b1a2e 100%)' },
  { name: 'Serengeti',    region: 'Tanzania, Africa', subtitleKey: 'serengeti_subtitle', bodyKey: 'serengeti_body', gradient: 'linear-gradient(135deg, #d97706 0%, #92400e 100%)' },
  { name: 'Greek Islands', region: 'Greece, Europe',  subtitleKey: 'greek_subtitle',     bodyKey: 'greek_body',     gradient: 'linear-gradient(135deg, #0369a1 0%, #075985 100%)' },
];

const FEATURE_KEYS = [
  { Icon: Navigation, titleKey: 'nav_title',       bodyKey: 'nav_body' },
  { Icon: Shield,     titleKey: 'regional_title',  bodyKey: 'regional_body' },
  { Icon: Compass,    titleKey: 'adventure_title', bodyKey: 'adventure_body' },
  { Icon: BookOpen,   titleKey: 'cultural_title',  bodyKey: 'cultural_body' },
];

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <div>
      <SEOHead
        title="Next Route Travels — We Plan the Route. You Enjoy the Journey."
        description="From Lagos to London, Serengeti to New York — seamless air travel, West African road trips, and curated international expeditions."
        canonicalPath="/"
        jsonLd={JSON_LD}
      />
      {/* ──── HERO ─── */}
      <Hero />

      {/* ── SECTION 2: CORE SERVICES ── */}
      <section className="py-28 px-6 bg-[#f5f8fc]">
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-16" {...fadeUp}>
            <div className="inline-flex items-center gap-2 rounded-full border border-navy/10 bg-white px-4 py-1.5 mb-6">
              <Zap className="h-3.5 w-3.5 text-blue-500" />
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-navy/60" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                {t('home_services.eyebrow')}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-[#1a2f5a]" style={{ fontFamily: 'Clash Display, sans-serif' }}>
              {t('home_services.heading')}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SERVICE_KEYS.map(({ Icon, titleKey, bodyKey }, i) => (
              <motion.div
                key={titleKey}
                {...fadeUp}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link to="/services" className="group block h-full">
                  <div className="h-full p-8 rounded-2xl bg-white border border-slate-100 hover:border-blue-200 hover:shadow-xl transition-[border-color,box-shadow] duration-300">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-6 group-hover:bg-blue-100 transition-colors duration-200">
                      <Icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-[#1a2f5a]" style={{ fontFamily: 'Clash Display, sans-serif' }}>
                      {t(`home_services.${titleKey}`)}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                      {t(`home_services.${bodyKey}`)}
                    </p>
                    <div className="mt-6 flex items-center gap-1 text-blue-600 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                      {t('home_services.learn_more')} <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LOCATIONS GLOBE ── */}
      <LocationsGlobe />

      {/* ── SECTION 3: DESTINATION GUIDES ── */}
      <section className="py-28 px-6 bg-[#0d1b38]">
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-16" {...fadeUp}>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-4" style={{ fontFamily: 'Clash Display, sans-serif' }}>
              {t('home_destinations.heading')}
            </h2>
            <p className="text-white/45 max-w-xl mx-auto text-lg" style={{ fontFamily: 'Satoshi, sans-serif' }}>
              {t('home_destinations.sub')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DEST_CARDS.map(({ name, region, subtitleKey, bodyKey, gradient }, i) => (
              <motion.div
                key={name}
                {...fadeUp}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link to="/destinations" className="group block h-full">
                  <div className="h-full rounded-2xl overflow-hidden border border-white/08 hover:border-white/15 transition-[border-color,box-shadow] duration-300 hover:shadow-2xl">
                    <div className="h-36 relative" style={{ background: gradient }}>
                      <div className="absolute inset-0 bg-black/20" />
                      <div className="absolute bottom-4 left-5">
                        <p className="text-white/60 text-[11px] font-semibold tracking-widest uppercase" style={{ fontFamily: 'Satoshi, sans-serif' }}>{region}</p>
                        <p className="text-white text-xl font-black" style={{ fontFamily: 'Clash Display, sans-serif' }}>{name}</p>
                      </div>
                    </div>
                    <div className="p-6 bg-[#0f2244]">
                      <p className="text-blue-300 text-sm font-semibold mb-2" style={{ fontFamily: 'Satoshi, sans-serif' }}>{t(`home_destinations.${subtitleKey}`)}</p>
                      <p className="text-white/50 text-sm leading-relaxed" style={{ fontFamily: 'Satoshi, sans-serif' }}>{t(`home_destinations.${bodyKey}`)}</p>
                      <div className="mt-5 flex items-center gap-1 text-blue-400 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                        {t('home_destinations.read_guide')} <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div className="text-center mt-10" {...fadeUp} transition={{ duration: 0.5, delay: 0.3 }}>
            <Link
              to="/destinations"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white/70 hover:text-white hover:bg-white/10 hover:border-white/25 transition-all duration-200 backdrop-blur-sm"
              style={{ fontFamily: 'Satoshi, sans-serif' }}
            >
              {t('home_destinations.view_all')} <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 4: ABOUT / MISSION ── */}
      <section className="py-28 px-6 bg-[#f5f8fc]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeUp}>
            <div className="rounded-2xl p-10 border border-blue-100" style={{ background: 'linear-gradient(135deg, #1a2f5a 0%, #0d1b38 100%)' }}>
              <Star className="w-8 h-8 text-blue-400 mb-6" />
              <blockquote className="text-2xl md:text-3xl font-black leading-snug text-white" style={{ fontFamily: 'Clash Display, sans-serif' }}>
                "{t('our_story_page.mission_quote')}"
              </blockquote>
              <p className="mt-6 text-white/40 text-sm" style={{ fontFamily: 'Satoshi, sans-serif' }}>— Next Route Travels</p>
            </div>
          </motion.div>

          <motion.div {...fadeUp} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}>
            <div className="inline-flex items-center gap-2 rounded-full border border-navy/10 bg-white px-4 py-1.5 mb-6">
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-navy/60" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                {t('home_about.eyebrow')}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-[#1a2f5a] mb-6" style={{ fontFamily: 'Clash Display, sans-serif' }}>
              {t('home_about.heading')}
            </h2>
            <div className="space-y-4 text-slate-500 leading-relaxed" style={{ fontFamily: 'Satoshi, sans-serif' }}>
              <p>{t('home_about.body1')}</p>
              <p>{t('home_about.body2')}</p>
            </div>
            <Link
              to="/our-story"
              className="mt-8 group inline-flex items-center gap-2 text-blue-600 font-semibold text-sm hover:gap-3 transition-all duration-200"
              style={{ fontFamily: 'Satoshi, sans-serif' }}
            >
              {t('home_about.cta')} <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 5: HOW WE HELP ── */}
      <section className="py-28 px-6 bg-[#0d1b38]">
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-16" {...fadeUp}>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white" style={{ fontFamily: 'Clash Display, sans-serif' }}>
              {t('home_features.heading')}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURE_KEYS.map(({ Icon, titleKey, bodyKey }, i) => (
              <motion.div
                key={titleKey}
                {...fadeUp}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
                className="p-7 rounded-2xl border border-white/08 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/15 transition-all duration-500 group"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-900/50 flex items-center justify-center mb-5 group-hover:bg-blue-800/60 transition-colors duration-300">
                  <Icon className="w-5 h-5 text-blue-300" />
                </div>
                <h3 className="text-base font-bold text-white mb-3" style={{ fontFamily: 'Clash Display, sans-serif' }}>
                  {t(`home_features.${titleKey}`)}
                </h3>
                <p className="text-sm text-white/40 leading-relaxed" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                  {t(`home_features.${bodyKey}`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 6: CTA BANNER ── */}
      <CTABanner />
    </div>
  );
}
