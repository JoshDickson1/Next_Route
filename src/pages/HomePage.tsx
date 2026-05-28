import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight, Globe, Map, Compass, Navigation,
  Shield, BookOpen, Plane,
} from 'lucide-react';
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

const SPRING = { type: 'spring' as const, stiffness: 400, damping: 30 };

const fadeUp = {
  initial:     { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: false, margin: '200px 0px -60px 0px' },
  transition:  { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
};

// ── Shared eyebrow pill ───────────────────────────────────────────────────────
function Eyebrow({ label, dark = false }: { label: string; dark?: boolean }) {
  return (
    <div
      className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5"
      style={{
        background: dark ? 'rgba(74,144,217,0.12)' : 'rgba(74,144,217,0.1)',
        border: '1px solid rgba(74,144,217,0.25)',
      }}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-[#4a90d9]" />
      <span
        className="text-[11px] font-black uppercase tracking-[0.22em] text-[#4a90d9]"
        style={{ fontFamily: 'Satoshi, sans-serif' }}
      >
        {label}
      </span>
    </div>
  );
}

// ── SVG concave wave bridge between sections ──────────────────────────────────
function WaveBridge({ from, to }: { from: string; to: string }) {
  return (
    <div style={{ background: to, marginTop: -1, lineHeight: 0 }}>
      <svg
        viewBox="0 0 1440 72"
        preserveAspectRatio="none"
        style={{ display: 'block', width: '100%', height: 72 }}
      >
        <path d="M0,0 C360,72 1080,72 1440,0 L1440,0 L0,0 Z" fill={from} />
      </svg>
    </div>
  );
}

// ── Destination image card ────────────────────────────────────────────────────
function DestCard({
  name, region, subtitleKey, bodyKey, image, delay = 0,
}: {
  name: string; region: string; subtitleKey: string; bodyKey: string; image: string; delay?: number;
}) {
  const { t } = useTranslation();
  return (
    <motion.div
      className="group relative overflow-hidden rounded-3xl h-full"
      style={{ boxShadow: '0 12px 48px -8px rgba(0,0,0,0.5)' }}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: '200px 0px -60px 0px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
      whileHover={{ y: -6 }}
    >
      <Link to="/destinations" className="block h-full" style={{ minHeight: 240 }}>
        <motion.div
          className="absolute inset-0 bg-cover bg-center will-change-transform"
          style={{ backgroundImage: `url(${image})` }}
          whileHover={{ scale: 1.07 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(13,27,56,0.96) 0%, rgba(13,27,56,0.45) 50%, transparent 80%)' }}
        />
        <div className="relative h-full flex flex-col justify-end p-6 md:p-8">
          <p
            className="text-[10px] font-black uppercase tracking-[0.28em] text-white/50 mb-1"
            style={{ fontFamily: 'Satoshi, sans-serif' }}
          >{region}</p>
          <h3
            className="text-3xl font-black text-white leading-none mb-2"
            style={{ fontFamily: 'Clash Display, sans-serif' }}
          >{name}</h3>
          <p
            className="text-[#a8cce8] text-xs font-semibold mb-2"
            style={{ fontFamily: 'Satoshi, sans-serif' }}
          >{t(`home_destinations.${subtitleKey}`)}</p>
          <p
            className="text-white/40 text-sm leading-relaxed max-w-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 mb-3"
            style={{ fontFamily: 'Satoshi, sans-serif' }}
          >{t(`home_destinations.${bodyKey}`)}</p>
          <div
            className="flex items-center gap-1.5 text-[#a8cce8] text-sm font-semibold"
            style={{ fontFamily: 'Satoshi, sans-serif' }}
          >
            {t('home_destinations.read_guide')}
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
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

      <Hero />

      {/* ════════════════════════════════════════════════════════════════
          SECTION 2 — WHAT WE DO   (light bg)
      ════════════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 px-4 sm:px-8 bg-[#f5f8fc]">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <motion.div className="text-center mb-14" {...fadeUp}>
            <Eyebrow label={t('home_services.eyebrow')} />
            <h2
              className="text-4xl sm:text-[3.5rem] font-black tracking-tight leading-[0.95] text-[#0d1b38]"
              style={{ fontFamily: 'Clash Display, sans-serif' }}
            >
              {t('home_services.heading')}
            </h2>
          </motion.div>

          {/* Bento grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

            {/* ── Card 1: Flights — dark navy, tall ── */}
            <motion.div
              className="lg:col-span-7 rounded-[28px] relative overflow-hidden flex flex-col"
              style={{ background: '#0d1b38', minHeight: 400 }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: '200px 0px -60px 0px' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
            >
              {/* Ghost number */}
              <span
                className="absolute -top-4 right-4 text-[10rem] font-black text-white/[0.035] leading-none select-none pointer-events-none"
                style={{ fontFamily: 'Clash Display, sans-serif' }}
              >01</span>

              {/* Glow orb */}
              <div
                className="absolute -top-10 -left-10 w-64 h-64 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(74,144,217,0.18) 0%, transparent 70%)' }}
              />

              <div className="relative p-8 lg:p-10 flex flex-col flex-1">
                <div className="flex-1">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-7"
                    style={{ background: 'rgba(74,144,217,0.12)', border: '1px solid rgba(74,144,217,0.22)' }}
                  >
                    <Plane className="w-6 h-6 text-[#4a90d9]" />
                  </div>
                  <h3
                    className="text-2xl lg:text-3xl font-black text-white leading-tight mb-3"
                    style={{ fontFamily: 'Clash Display, sans-serif' }}
                  >
                    {t('home_services.flights_title')}
                  </h3>
                  <p
                    className="text-white/40 text-sm leading-relaxed max-w-sm"
                    style={{ fontFamily: 'Satoshi, sans-serif' }}
                  >
                    {t('home_services.flights_body')}
                  </p>
                </div>

                {/* Route pills */}
                <div className="mt-8">
                  <div className="flex flex-wrap gap-2 mb-7">
                    {['Lagos → London', 'Lagos → Dubai', 'Abuja → New York', 'Lagos → Toronto'].map((r) => (
                      <span
                        key={r}
                        className="text-[11px] font-semibold px-3 py-1.5 rounded-full text-[#a8cce8]"
                        style={{
                          background: 'rgba(168,204,232,0.08)',
                          border: '1px solid rgba(168,204,232,0.14)',
                          fontFamily: 'Satoshi, sans-serif',
                        }}
                      >{r}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-5">
                    <div>
                      <p
                        className="text-3xl font-black text-white leading-none"
                        style={{ fontFamily: 'Clash Display, sans-serif' }}
                      >120<span className="text-[#4a90d9]">+</span></p>
                      <p
                        className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/25 mt-1"
                        style={{ fontFamily: 'Satoshi, sans-serif' }}
                      >Routes</p>
                    </div>
                    <div className="w-px h-10 bg-white/10" />
                    <Link
                      to="/services"
                      className="flex items-center gap-2 text-[#a8cce8] text-sm font-semibold hover:text-white transition-colors"
                      style={{ fontFamily: 'Satoshi, sans-serif' }}
                    >
                      {t('home_services.learn_more')}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ── Card 2: Road Travel — white ── */}
            <motion.div
              className="lg:col-span-5 rounded-[28px] bg-white overflow-hidden relative flex flex-col"
              style={{ border: '1px solid rgba(13,27,56,0.08)', minHeight: 400 }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: '200px 0px -60px 0px' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              whileHover={{ y: -6 }}
            >
              {/* Ghost number */}
              <span
                className="absolute -top-4 right-4 text-[10rem] font-black text-[#0d1b38]/[0.04] leading-none select-none pointer-events-none"
                style={{ fontFamily: 'Clash Display, sans-serif' }}
              >02</span>

              {/* Accent top bar */}
              <div
                className="absolute top-0 left-0 right-0 h-[3px] rounded-t-[28px]"
                style={{ background: 'linear-gradient(90deg, #4a90d9 0%, #a8cce8 100%)' }}
              />

              {/* Concave accent shape */}
              <div
                className="absolute top-[3px] left-0 right-0 h-20 rounded-b-[60%]"
                style={{ background: 'linear-gradient(180deg, rgba(74,144,217,0.05) 0%, transparent 100%)' }}
              />

              <div className="relative p-8 flex flex-col flex-1">
                <div className="flex-1">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-7"
                    style={{ background: 'rgba(74,144,217,0.08)', border: '1px solid rgba(74,144,217,0.18)' }}
                  >
                    <Map className="w-6 h-6 text-[#4a90d9]" />
                  </div>
                  <h3
                    className="text-2xl font-black text-[#0d1b38] leading-tight mb-3"
                    style={{ fontFamily: 'Clash Display, sans-serif' }}
                  >
                    {t('home_services.road_title')}
                  </h3>
                  <p
                    className="text-[#0d1b38]/45 text-sm leading-relaxed"
                    style={{ fontFamily: 'Satoshi, sans-serif' }}
                  >
                    {t('home_services.road_body')}
                  </p>
                </div>

                <div className="mt-6">
                  {['Vetted vehicles & licensed drivers', 'Real-time GPS tracking', 'Lagos · Accra · Abuja + more'].map((f) => (
                    <div key={f} className="flex items-center gap-3 py-3 border-b border-[#0d1b38]/[0.06] last:border-0">
                      <div
                        className="w-5 h-5 rounded-full shrink-0 flex items-center justify-center"
                        style={{ background: 'rgba(74,144,217,0.1)' }}
                      >
                        <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                          <path d="M1 3l2 2 4-4" stroke="#4a90d9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <span
                        className="text-[13px] font-semibold text-[#0d1b38]/65"
                        style={{ fontFamily: 'Satoshi, sans-serif' }}
                      >{f}</span>
                    </div>
                  ))}
                  <Link
                    to="/services"
                    className="mt-5 inline-flex items-center gap-2 text-[#4a90d9] text-sm font-semibold hover:gap-3 transition-all duration-200"
                    style={{ fontFamily: 'Satoshi, sans-serif' }}
                  >
                    {t('home_services.learn_more')}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* ── Card 3: Expeditions — full-width horizontal ── */}
            <motion.div
              className="lg:col-span-12 rounded-[28px] overflow-hidden relative"
              style={{ background: 'linear-gradient(135deg, #1a3560 0%, #0d1b38 100%)', minHeight: 180 }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: '200px 0px -60px 0px' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              whileHover={{ y: -4 }}
            >
              {/* Ghost number */}
              <span
                className="absolute top-1/2 -translate-y-1/2 right-8 text-[160px] font-black text-white/[0.03] leading-none select-none pointer-events-none"
                style={{ fontFamily: 'Clash Display, sans-serif' }}
              >03</span>

              {/* Glow */}
              <div
                className="absolute -right-16 top-1/2 -translate-y-1/2 w-72 h-72 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(74,144,217,0.12) 0%, transparent 70%)' }}
              />

              <div className="relative p-8 lg:p-10 flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-12">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(74,144,217,0.12)', border: '1px solid rgba(74,144,217,0.22)' }}
                >
                  <Compass className="w-6 h-6 text-[#4a90d9]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3
                    className="text-2xl lg:text-3xl font-black text-white leading-tight mb-2"
                    style={{ fontFamily: 'Clash Display, sans-serif' }}
                  >
                    {t('home_services.latam_title')}
                  </h3>
                  <p
                    className="text-white/40 text-sm leading-relaxed max-w-xl"
                    style={{ fontFamily: 'Satoshi, sans-serif' }}
                  >
                    {t('home_services.latam_body')}
                  </p>
                </div>
                <div className="flex items-center gap-5 shrink-0">
                  <div>
                    <p
                      className="text-3xl font-black text-white leading-none"
                      style={{ fontFamily: 'Clash Display, sans-serif' }}
                    >8<span className="text-[#4a90d9]">+</span></p>
                    <p
                      className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/25 mt-1"
                      style={{ fontFamily: 'Satoshi, sans-serif' }}
                    >Countries</p>
                  </div>
                  <div className="w-px h-10 bg-white/10" />
                  <Link to="/services">
                    <motion.div
                      className="inline-flex items-center gap-2.5 pl-5 pr-2 py-2 rounded-full bg-white"
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.97 }}
                      transition={SPRING}
                    >
                      <span
                        className="text-[13px] font-bold text-[#0d1b38]"
                        style={{ fontFamily: 'Satoshi, sans-serif' }}
                      >{t('home_services.learn_more')}</span>
                      <span className="w-8 h-8 rounded-full bg-[#0d1b38] flex items-center justify-center">
                        <ArrowRight className="w-3.5 h-3.5 text-white" />
                      </span>
                    </motion.div>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Concave wave: light → dark (globe) */}
      <WaveBridge from="#f5f8fc" to="#0d1b38" />

      {/* ── Globe ── */}
      <LocationsGlobe />

      {/* ════════════════════════════════════════════════════════════════
          SECTION 3 — DESTINATION GUIDES   (dark bg)
      ════════════════════════════════════════════════════════════════ */}
      <section className="relative py-20 sm:py-28 px-4 sm:px-8 bg-[#0d1b38] overflow-hidden">

        {/* Giant background text */}
        <div
          className="absolute top-10 left-0 right-0 flex justify-center pointer-events-none overflow-hidden"
          aria-hidden
        >
          <span
            className="text-[clamp(80px,12vw,160px)] font-black text-white/[0.025] uppercase whitespace-nowrap select-none tracking-widest"
            style={{ fontFamily: 'Clash Display, sans-serif' }}
          >DESTINATIONS</span>
        </div>

        <div className="max-w-7xl mx-auto relative">

          {/* Header */}
          <motion.div className="text-center mb-14" {...fadeUp}>
            <Eyebrow label="Destination Guides" dark />
            <h2
              className="text-4xl sm:text-[3.5rem] font-black tracking-tight leading-[0.95] text-white"
              style={{ fontFamily: 'Clash Display, sans-serif' }}
            >
              {t('home_destinations.heading')}
            </h2>
            <p
              className="mt-4 text-white/40 text-base max-w-xl mx-auto"
              style={{ fontFamily: 'Satoshi, sans-serif' }}
            >
              {t('home_destinations.sub')}
            </p>
          </motion.div>

          {/* Asymmetric image grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4" style={{ minHeight: 560 }}>
            <div className="lg:col-span-7 min-h-[360px] lg:min-h-0">
              <DestCard
                name="Rome"
                region="Italy, Europe"
                subtitleKey="rome_subtitle"
                bodyKey="rome_body"
                image="https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=900&auto=format&fit=crop&q=85"
              />
            </div>
            <div className="lg:col-span-5 grid grid-rows-2 gap-4">
              <div className="min-h-[220px]">
                <DestCard
                  name="Serengeti"
                  region="Tanzania, Africa"
                  subtitleKey="serengeti_subtitle"
                  bodyKey="serengeti_body"
                  image="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=700&auto=format&fit=crop&q=85"
                  delay={0.1}
                />
              </div>
              <div className="min-h-[220px]">
                <DestCard
                  name="Greek Islands"
                  region="Greece, Europe"
                  subtitleKey="greek_subtitle"
                  bodyKey="greek_body"
                  image="https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=700&auto=format&fit=crop&q=85"
                  delay={0.18}
                />
              </div>
            </div>
          </div>

          {/* View all */}
          <motion.div
            className="text-center mt-10"
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.28 }}
          >
            <Link to="/destinations">
              <motion.div
                className="inline-flex items-center gap-2.5 pl-5 pr-2 py-2 rounded-full"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}
                whileHover={{ background: 'rgba(255,255,255,0.10)', borderColor: 'rgba(255,255,255,0.22)' }}
                transition={{ duration: 0.2 }}
              >
                <span
                  className="text-sm font-semibold text-white"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                >{t('home_destinations.view_all')}</span>
                <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                  <ArrowRight className="w-3.5 h-3.5 text-[#0d1b38]" />
                </span>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Concave wave: dark → light (mission) */}
      <WaveBridge from="#0d1b38" to="#f5f8fc" />

      {/* ════════════════════════════════════════════════════════════════
          SECTION 4 — OUR MISSION   (light bg)
      ════════════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 px-4 sm:px-8 bg-[#f5f8fc]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left: quote + stats card */}
          <motion.div className="lg:col-span-5" {...fadeUp}>
            <div className="rounded-[28px] overflow-hidden" style={{ background: '#0d1b38' }}>

              {/* Quote area */}
              <div className="p-8 lg:p-10 relative overflow-hidden">
                {/* Glow */}
                <div
                  className="absolute -top-8 -right-8 w-40 h-40 rounded-full pointer-events-none"
                  style={{ background: 'radial-gradient(circle, rgba(74,144,217,0.15) 0%, transparent 70%)' }}
                />
                {/* Decorative quote mark */}
                <div
                  className="text-[100px] leading-[0.8] text-[#4a90d9]/20 font-black select-none -mb-4"
                  style={{ fontFamily: 'Clash Display, sans-serif' }}
                >"</div>
                <blockquote
                  className="text-xl lg:text-2xl font-black leading-snug text-white mb-5"
                  style={{ fontFamily: 'Clash Display, sans-serif' }}
                >
                  {t('our_story_page.mission_quote')}
                </blockquote>
                <p
                  className="text-white/30 text-sm"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                >— Next Route Travels</p>
              </div>

              {/* Stats row */}
              <div
                className="grid grid-cols-3 divide-x"
                style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
              >
                {[
                  { val: '12+', label: 'Years' },
                  { val: '50+', label: 'Countries' },
                  { val: '4.9★', label: 'Rating' },
                ].map(({ val, label }) => (
                  <div key={label} className="py-6 text-center" style={{ borderRight: '1px solid rgba(255,255,255,0.08)' }}>
                    <p
                      className="text-xl font-black text-white leading-none"
                      style={{ fontFamily: 'Clash Display, sans-serif' }}
                    >{val}</p>
                    <p
                      className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mt-1.5"
                      style={{ fontFamily: 'Satoshi, sans-serif' }}
                    >{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: mission text */}
          <motion.div
            className="lg:col-span-7 lg:pl-8 pt-1"
            {...fadeUp}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          >
            <Eyebrow label={t('home_about.eyebrow')} />
            <h2
              className="text-3xl sm:text-4xl lg:text-[2.9rem] font-black tracking-tight leading-[0.95] text-[#0d1b38] mb-6"
              style={{ fontFamily: 'Clash Display, sans-serif' }}
            >
              {t('home_about.heading')}
            </h2>
            <div className="space-y-4 mb-8">
              <p
                className="text-[#0d1b38]/55 text-[15px] leading-relaxed"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >{t('home_about.body1')}</p>
              <p
                className="text-[#0d1b38]/55 text-[15px] leading-relaxed"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >{t('home_about.body2')}</p>
            </div>

            {/* Values row */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { label: 'Integrity', icon: '🤝' },
                { label: 'Discovery', icon: '🌍' },
                { label: 'Excellence', icon: '✦' },
              ].map(({ label, icon }) => (
                <div
                  key={label}
                  className="rounded-2xl p-4 text-center"
                  style={{ background: 'rgba(74,144,217,0.07)', border: '1px solid rgba(74,144,217,0.15)' }}
                >
                  <div className="text-xl mb-1">{icon}</div>
                  <p
                    className="text-[12px] font-bold text-[#0d1b38]/70 uppercase tracking-[0.15em]"
                    style={{ fontFamily: 'Satoshi, sans-serif' }}
                  >{label}</p>
                </div>
              ))}
            </div>

            <Link to="/our-story">
              <motion.div
                className="inline-flex items-center gap-2.5 pl-5 pr-2 py-2 rounded-full bg-[#0d1b38]"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.97 }}
                transition={SPRING}
              >
                <span
                  className="text-[13px] font-bold text-white"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                >{t('home_about.cta')}</span>
                <span className="w-8 h-8 rounded-full bg-[#4a90d9] flex items-center justify-center">
                  <ArrowRight className="w-3.5 h-3.5 text-white" />
                </span>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Concave wave: light → dark (features) */}
      <WaveBridge from="#f5f8fc" to="#0d1b38" />

      {/* ════════════════════════════════════════════════════════════════
          SECTION 5 — WHAT NEXT ROUTE DOES FOR YOU   (dark bg)
      ════════════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 px-4 sm:px-8 bg-[#0d1b38]">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <motion.div className="text-center mb-14" {...fadeUp}>
            <Eyebrow label="Why Choose Us" dark />
            <h2
              className="text-4xl sm:text-[3.5rem] font-black tracking-tight leading-[0.95] text-white"
              style={{ fontFamily: 'Clash Display, sans-serif' }}
            >
              {t('home_features.heading')}
            </h2>
          </motion.div>

          {/* 2×2 asymmetric bento */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

            {/* ── Card 1: Navigation — large left ── */}
            <motion.div
              className="lg:col-span-7 rounded-[28px] relative overflow-hidden p-8 lg:p-10"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                minHeight: 320,
              }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: '200px 0px -60px 0px' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ borderColor: 'rgba(74,144,217,0.3)', background: 'rgba(74,144,217,0.05)' }}
            >
              <div
                className="absolute bottom-0 right-0 w-56 h-56 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(74,144,217,0.1) 0%, transparent 70%)' }}
              />
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                style={{ background: 'rgba(74,144,217,0.12)', border: '1px solid rgba(74,144,217,0.22)' }}
              >
                <Navigation className="w-6 h-6 text-[#4a90d9]" />
              </div>
              <h3
                className="text-xl lg:text-2xl font-black text-white mb-3"
                style={{ fontFamily: 'Clash Display, sans-serif' }}
              >
                {t('home_features.nav_title')}
              </h3>
              <p
                className="text-white/40 text-sm leading-relaxed max-w-sm"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >
                {t('home_features.nav_body')}
              </p>

              {/* Route dot visualisation */}
              <div className="mt-8 flex items-end gap-3">
                {['Lagos', 'London', 'Dubai', 'New York'].map((city, i, arr) => (
                  <div key={city} className="flex items-center gap-3">
                    <div className="flex flex-col items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#4a90d9]" style={{ boxShadow: '0 0 8px rgba(74,144,217,0.6)' }} />
                      <p
                        className="text-[10px] font-bold text-white/30 uppercase tracking-wide"
                        style={{ fontFamily: 'Satoshi, sans-serif' }}
                      >{city}</p>
                    </div>
                    {i < arr.length - 1 && (
                      <div className="w-8 sm:w-12 h-px bg-[#4a90d9]/25 mb-4 shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* ── Card 2: Regional Expertise — white ── */}
            <motion.div
              className="lg:col-span-5 rounded-[28px] bg-white overflow-hidden relative p-8"
              style={{ border: '1px solid rgba(13,27,56,0.08)', minHeight: 320 }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: '200px 0px -60px 0px' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              whileHover={{ y: -6 }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-[3px] rounded-t-[28px]"
                style={{ background: 'linear-gradient(90deg, #4a90d9 0%, #a8cce8 100%)' }}
              />
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                style={{ background: 'rgba(74,144,217,0.08)', border: '1px solid rgba(74,144,217,0.18)' }}
              >
                <Shield className="w-6 h-6 text-[#4a90d9]" />
              </div>
              <h3
                className="text-xl font-black text-[#0d1b38] mb-3"
                style={{ fontFamily: 'Clash Display, sans-serif' }}
              >
                {t('home_features.regional_title')}
              </h3>
              <p
                className="text-[#0d1b38]/45 text-sm leading-relaxed"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >
                {t('home_features.regional_body')}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {['West Africa', 'Europe', 'Americas', 'Middle East'].map((r) => (
                  <span
                    key={r}
                    className="text-[11px] font-semibold px-3 py-1.5 rounded-full text-[#4a90d9]"
                    style={{
                      background: 'rgba(74,144,217,0.08)',
                      border: '1px solid rgba(74,144,217,0.18)',
                      fontFamily: 'Satoshi, sans-serif',
                    }}
                  >{r}</span>
                ))}
              </div>
            </motion.div>

            {/* ── Card 3: Adventure ── */}
            <motion.div
              className="lg:col-span-5 rounded-[28px] overflow-hidden relative p-8"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                minHeight: 260,
              }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: '200px 0px -60px 0px' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
              whileHover={{ borderColor: 'rgba(74,144,217,0.28)', background: 'rgba(74,144,217,0.05)' }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                style={{ background: 'rgba(74,144,217,0.12)', border: '1px solid rgba(74,144,217,0.22)' }}
              >
                <Compass className="w-6 h-6 text-[#4a90d9]" />
              </div>
              <h3
                className="text-xl font-black text-white mb-3"
                style={{ fontFamily: 'Clash Display, sans-serif' }}
              >
                {t('home_features.adventure_title')}
              </h3>
              <p
                className="text-white/40 text-sm leading-relaxed"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >
                {t('home_features.adventure_body')}
              </p>

              {/* Mini expedition tags */}
              <div className="mt-6 flex flex-col gap-2">
                {['Colombia → Ecuador', 'Patagonia Circuit', 'Peru Sacred Valley'].map((e) => (
                  <div
                    key={e}
                    className="flex items-center gap-2.5 text-[12px] font-semibold text-white/50"
                    style={{ fontFamily: 'Satoshi, sans-serif' }}
                  >
                    <span className="w-1 h-1 rounded-full bg-[#4a90d9]/60 shrink-0" />
                    {e}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* ── Card 4: Cultural Depth — large right ── */}
            <motion.div
              className="lg:col-span-7 rounded-[28px] overflow-hidden relative p-8 lg:p-10"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                minHeight: 260,
              }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: '200px 0px -60px 0px' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              whileHover={{ borderColor: 'rgba(74,144,217,0.28)', background: 'rgba(74,144,217,0.05)' }}
            >
              {/* Decorative large quote */}
              <div
                className="absolute top-4 right-8 text-[80px] leading-none text-white/[0.04] font-black select-none pointer-events-none"
                style={{ fontFamily: 'Clash Display, sans-serif' }}
              >"</div>
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                style={{ background: 'rgba(74,144,217,0.12)', border: '1px solid rgba(74,144,217,0.22)' }}
              >
                <BookOpen className="w-6 h-6 text-[#4a90d9]" />
              </div>
              <h3
                className="text-xl lg:text-2xl font-black text-white mb-3"
                style={{ fontFamily: 'Clash Display, sans-serif' }}
              >
                {t('home_features.cultural_title')}
              </h3>
              <p
                className="text-white/40 text-sm leading-relaxed max-w-lg"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >
                {t('home_features.cultural_body')}
              </p>

              {/* Pull quote */}
              <div
                className="mt-7 pl-4"
                style={{ borderLeft: '2px solid rgba(74,144,217,0.35)' }}
              >
                <p
                  className="text-sm font-semibold text-white/40 italic leading-relaxed"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                >
                  "Every journey is a story waiting to be written."
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <CTABanner />
    </div>
  );
}
