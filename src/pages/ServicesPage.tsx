import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight, Plane, MapPin, Compass, Clock, Shield,
  Users, Star, CheckCircle, ChevronRight,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { CTABanner } from '@/components/CTABanner';
import { SEOHead } from '@/components/SEOHead';

// ── Images ────────────────────────────────────────────────────────────────────
const IMG_HERO    = 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1400&auto=format&fit=crop&q=80';
const IMG_FLIGHTS = 'https://images.unsplash.com/photo-1569629743817-70d8db6c323b?w=900&auto=format&fit=crop&q=80';
const IMG_ROAD    = 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=900&auto=format&fit=crop&q=80';
const IMG_RAIL    = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&auto=format&fit=crop&q=80';

// ── Data ──────────────────────────────────────────────────────────────────────
const FLIGHT_ROUTES = ['Lagos → Abuja', 'Lagos → Port Harcourt', 'Lagos → London', 'Lagos → Dubai', 'Abuja → New York', 'Lagos → Toronto'];
const ROAD_ROUTES   = ['Lagos → Abuja', 'Lagos → Accra', 'Abuja → Kano', 'Lagos → Cotonou', 'Port Harcourt → Enugu'];

const ROAD_FEATURES = [
  { Icon: Shield,  title: 'Vetted vehicles',       body: 'Every vehicle inspected before departure.' },
  { Icon: Users,   title: 'Experienced drivers',   body: 'Licensed, route-familiar professionals.' },
  { Icon: Clock,   title: 'Real-time tracking',    body: 'Live location shared with your contacts.' },
  { Icon: Star,    title: '4.9-star rated',         body: 'Consistently top-rated by our travellers.' },
];

const RAIL_ROUTES = [
  {
    title:    'London → Paris (Eurostar)',
    duration: '2h 15m',
    desc:     'The iconic Channel Tunnel route connecting two of Europe\'s greatest capitals under the sea — faster than flying once you factor in airports.',
    includes: 'Standard · Business Premier · Wi-Fi · City-centre arrival',
    image:    'https://images.unsplash.com/photo-1474487548417-781cb6d646b3?w=500&auto=format&fit=crop&q=75',
    accent:   '#60a5fa',
  },
  {
    title:    'Paris → Amsterdam (Thalys)',
    duration: '3h 20m',
    desc:     'Glide through Belgium and into the Netherlands on one of Europe\'s most scenic high-speed corridors — with city-centre to city-centre convenience.',
    includes: 'Comfort 1 & 2 · Onboard dining · No airport queues',
    image:    'https://images.unsplash.com/photo-1559825481-12a05cc00344?w=500&auto=format&fit=crop&q=75',
    accent:   '#34d399',
  },
  {
    title:    'Beijing → Shanghai (CR400AF)',
    duration: '4h 30m',
    desc:     'China\'s crown jewel of high-speed rail — the world\'s busiest HSR corridor, running at 350 km/h across 1,318 km of precision-engineered track.',
    includes: '2nd class · 1st class · Business · Dining car',
    image:    'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=500&auto=format&fit=crop&q=75',
    accent:   '#fbbf24',
  },
  {
    title:    'Tokyo → Osaka (Shinkansen)',
    duration: '2h 25m',
    desc:     'Japan\'s legendary bullet train — the blueprint for every HSR network in the world. Punctual to the second, immaculate, and unmissable.',
    includes: 'Ordinary · Green car · Gran Class · JR Pass eligible',
    image:    'https://images.unsplash.com/photo-1555993539-1732b0258235?w=500&auto=format&fit=crop&q=75',
    accent:   '#f87171',
  },
];

const HERO_SERVICES = [
  { Icon: Plane,   label: 'International Flights',     sub: '120+ routes from Lagos & Abuja' },
  { Icon: MapPin,  label: 'West Africa Road Travel',   sub: 'Vetted fleets, real-time tracking' },
  { Icon: Compass, label: 'Rail Transport',             sub: 'Europe & Asia high-speed routes' },
];

// ── Animations ────────────────────────────────────────────────────────────────
const fadeUp = {
  initial:     { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0  },
  viewport:    { once: false, margin: '200px 0px -60px 0px' },
  transition:  { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
};

// ── Sub-components ────────────────────────────────────────────────────────────

function RoutePill({ label }: { label: string }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold"
      style={{ fontFamily: 'Satoshi, sans-serif', background: 'rgba(74,144,217,0.1)', color: '#4a90d9', border: '1px solid rgba(74,144,217,0.22)' }}
    >
      <span className="w-1 h-1 rounded-full bg-current opacity-60" />
      {label}
    </span>
  );
}

function SectionEyebrow({ label, dark = false }: { label: string; dark?: boolean }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5"
      style={{
        background: dark ? 'rgba(255,255,255,0.08)' : 'rgba(74,144,217,0.1)',
        border:     dark ? '1px solid rgba(255,255,255,0.15)' : '1px solid rgba(74,144,217,0.25)',
      }}>
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: dark ? '#60a5fa' : '#4a90d9' }} />
      <span className="text-[11px] font-black uppercase tracking-[0.2em]"
        style={{ fontFamily: 'Satoshi, sans-serif', color: dark ? 'rgba(255,255,255,0.6)' : '#4a90d9' }}>
        {label}
      </span>
    </div>
  );
}

function EnquireButton({ dark = false, label }: { dark?: boolean; label: string }) {
  return (
    <Link to="/enquiries">
      <motion.span
        className="inline-flex items-center gap-3 pl-6 pr-2 py-2 rounded-full cursor-pointer"
        style={{
          background:  dark ? '#fff'      : '#0d1b38',
          color:       dark ? '#0d1b38'   : '#fff',
          fontFamily: 'Satoshi, sans-serif',
        }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 400, damping: 32 }}
      >
        <span className="text-sm font-bold">{label}</span>
        <span
          className="w-9 h-9 rounded-full flex items-center justify-center"
          style={{ background: dark ? '#0d1b38' : 'rgba(255,255,255,0.15)' }}
        >
          <ArrowRight className="w-4 h-4" style={{ color: dark ? '#fff' : '#fff' }} />
        </span>
      </motion.span>
    </Link>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function ServicesPage() {
  const { t } = useTranslation();

  return (
    <div className="bg-[#f5f8fc]">
      <SEOHead
        title="Travel Services — Next Route Travels"
        description="From international flights to cross-continent road expeditions — we cover every route, every mode, every adventure."
        canonicalPath="/services"
      />

      {/* ══════════════════════════════════════════════════════════════════════
          HERO — full-bleed airplane wing photo
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[92vh] flex flex-col justify-end overflow-hidden">

        {/* Background photo */}
        <div className="absolute inset-0">
          <img src={IMG_HERO} alt="Airplane wing above clouds" className="w-full h-full object-cover" style={{ objectPosition: 'center 60%' }} fetchPriority="high" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(13,27,56,0.55) 0%, rgba(13,27,56,0.3) 35%, rgba(13,27,56,0.72) 70%, #0d1b38 100%)' }} />
        </div>

        {/* Hero content */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 pt-40 pb-0">
          <motion.div
            initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-1.5 mb-6 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-white/60" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                {t('services_page.eyebrow')}
              </span>
            </div>
            <h1
              className="text-6xl md:text-7xl lg:text-[5.5rem] font-black tracking-tight text-white leading-[0.93] mb-6"
              style={{ fontFamily: 'Clash Display, sans-serif' }}
            >
              {t('services_page.heading')}
            </h1>
            <p className="text-lg text-white/50 max-w-xl leading-relaxed" style={{ fontFamily: 'Satoshi, sans-serif' }}>
              {t('services_page.sub')}
            </p>
          </motion.div>

          {/* Three service tabs — sit on the fold */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.22 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-px overflow-hidden rounded-t-2xl"
            style={{ background: 'rgba(255,255,255,0.06)' }}
          >
            {HERO_SERVICES.map(({ Icon, label, sub }, i) => (
              <div
                key={label}
                className="flex items-center gap-4 px-6 py-5 backdrop-blur-md transition-colors duration-300 hover:bg-white/10 cursor-default"
                style={{ background: 'rgba(13,27,56,0.55)', borderTop: '1px solid rgba(255,255,255,0.1)' }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(74,144,217,0.2)', border: '1px solid rgba(74,144,217,0.3)' }}>
                  <Icon className="w-4.5 h-4.5" style={{ color: '#60a5fa' }} />
                </div>
                <div>
                  <p className="text-sm font-black text-white leading-tight" style={{ fontFamily: 'Clash Display, sans-serif' }}>{label}</p>
                  <p className="text-[11px] text-white/40 mt-0.5" style={{ fontFamily: 'Satoshi, sans-serif' }}>{sub}</p>
                </div>
                {i < HERO_SERVICES.length - 1 && (
                  <ChevronRight className="ml-auto w-4 h-4 text-white/20 hidden md:block" />
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          INTERNATIONAL FLIGHTS — white
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-28 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 xl:gap-20 items-center">

          {/* Image panel */}
          <motion.div {...fadeUp} className="relative">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3]"
              style={{ boxShadow: '0 24px 80px -16px rgba(13,27,56,0.2)' }}>
              <img src={IMG_FLIGHTS} alt="Aircraft at dusk" className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" loading="lazy" style={{ willChange: 'transform' }} />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(13,27,56,0.6) 0%, transparent 55%)' }} />
            </div>

            {/* Floating stat card */}
            <motion.div
              className="absolute -bottom-5 -right-5 md:right-6 rounded-2xl p-4 min-w-[170px]"
              style={{ background: '#0d1b38', border: '1px solid rgba(168,204,232,0.15)', boxShadow: '0 16px 48px -8px rgba(13,27,56,0.5)' }}
              initial={{ opacity: 0, y: 16, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'rgba(74,144,217,0.2)' }}>
                  <Plane className="w-3.5 h-3.5 text-blue-400" />
                </div>
                <span className="text-white/50 text-[10px] font-bold uppercase tracking-[0.15em]" style={{ fontFamily: 'Satoshi, sans-serif' }}>Routes</span>
              </div>
              <p className="text-3xl font-black text-white leading-none" style={{ fontFamily: 'Clash Display, sans-serif' }}>120+</p>
              <p className="text-white/35 text-xs mt-1" style={{ fontFamily: 'Satoshi, sans-serif' }}>International destinations</p>
            </motion.div>

            {/* Decorative ring */}
            <div className="absolute -top-4 -left-4 w-20 h-20 rounded-full pointer-events-none"
              style={{ border: '1px solid rgba(74,144,217,0.2)', background: 'rgba(74,144,217,0.04)' }} />
          </motion.div>

          {/* Text panel */}
          <motion.div {...fadeUp} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }} className="space-y-6">
            <SectionEyebrow label={t('services_page.flights_eyebrow')} />
            <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-[0.95]"
              style={{ fontFamily: 'Clash Display, sans-serif', color: '#0d1b38' }}>
              {t('services_page.flights_heading')}
            </h2>
            <div className="space-y-4 leading-[1.8]" style={{ fontFamily: 'Satoshi, sans-serif', color: 'rgba(13,27,56,0.52)', fontSize: '1.0625rem' }}>
              <p>{t('services_page.flights_body1')}</p>
              <p>{t('services_page.flights_body2')}</p>
            </div>

            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-3" style={{ fontFamily: 'Satoshi, sans-serif', color: 'rgba(13,27,56,0.3)' }}>
                {t('services_page.popular_routes')}
              </p>
              <div className="flex flex-wrap gap-2">
                {FLIGHT_ROUTES.map((r) => <RoutePill key={r} label={r} />)}
              </div>
            </div>

            <EnquireButton label={t('services_page.enquire_trip')} />
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          WEST AFRICA ROAD TRAVEL — dark navy
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-28 px-6 bg-[#0d1b38] relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full pointer-events-none -translate-y-1/2"
          style={{ background: 'rgba(74,144,217,0.07)', filter: 'blur(100px)' }} />

        <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 xl:gap-20 items-center">

          {/* Text panel */}
          <motion.div {...fadeUp} className="space-y-6 order-2 lg:order-1">
            <SectionEyebrow label={t('services_page.road_eyebrow')} dark />
            <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-[0.95] text-white"
              style={{ fontFamily: 'Clash Display, sans-serif' }}>
              {t('services_page.road_heading')}
            </h2>
            <div className="space-y-4 leading-[1.8]" style={{ fontFamily: 'Satoshi, sans-serif', color: 'rgba(255,255,255,0.48)', fontSize: '1.0625rem' }}>
              <p>{t('services_page.road_body1')}</p>
              <p>{t('services_page.road_body2')}</p>
            </div>

            {/* Route pills — white-ish on dark */}
            <div className="flex flex-wrap gap-2">
              {ROAD_ROUTES.map((r) => (
                <span key={r}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold"
                  style={{ fontFamily: 'Satoshi, sans-serif', background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <span className="w-1 h-1 rounded-full bg-blue-400" />
                  {r}
                </span>
              ))}
            </div>

            {/* Feature grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {ROAD_FEATURES.map(({ Icon, title, body }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, margin: '200px 0px -30px 0px' }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.07 }}
                  className="flex items-start gap-3 p-4 rounded-2xl"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
                >
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: 'rgba(74,144,217,0.15)' }}>
                    <Icon className="w-3.5 h-3.5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm font-black text-white leading-tight" style={{ fontFamily: 'Clash Display, sans-serif' }}>{title}</p>
                    <p className="text-[12px] text-white/35 mt-0.5 leading-snug" style={{ fontFamily: 'Satoshi, sans-serif' }}>{body}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <EnquireButton dark label={t('services_page.enquire_trip')} />
          </motion.div>

          {/* Image panel */}
          <motion.div {...fadeUp} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
            className="relative order-1 lg:order-2">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3]"
              style={{ boxShadow: '0 24px 80px -16px rgba(0,0,0,0.5)' }}>
              <img src={IMG_ROAD} alt="Open road through mountains" className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" loading="lazy" style={{ willChange: 'transform' }} />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(13,27,56,0.5) 0%, transparent 55%)' }} />

              {/* Inline label */}
              <div className="absolute bottom-5 left-5 right-5">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
                  style={{ background: 'rgba(13,27,56,0.75)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.12)' }}>
                  <MapPin className="w-3.5 h-3.5 text-blue-400" />
                  <span className="text-white text-xs font-bold" style={{ fontFamily: 'Satoshi, sans-serif' }}>West Africa · 5 countries covered</span>
                </div>
              </div>
            </div>

            {/* Floating check card */}
            <motion.div
              className="absolute -top-5 -right-4 md:right-6 rounded-2xl p-4"
              style={{ background: 'rgba(52,211,153,0.12)', border: '1px solid rgba(52,211,153,0.25)', backdropFilter: 'blur(12px)' }}
              initial={{ opacity: 0, y: -12, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-300 text-xs font-bold" style={{ fontFamily: 'Satoshi, sans-serif' }}>4.9★ driver rating</span>
              </div>
              <p className="text-white/40 text-[11px] mt-1" style={{ fontFamily: 'Satoshi, sans-serif' }}>Verified by 1,200+ clients</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          RAIL TRANSPORT — white
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-28 px-6 bg-white">
        <div className="max-w-7xl mx-auto">

          {/* Intro split */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 xl:gap-20 items-center mb-20">
            <motion.div {...fadeUp} className="space-y-6">
              <SectionEyebrow label={t('services_page.latam_eyebrow')} />
              <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-[0.95]"
                style={{ fontFamily: 'Clash Display, sans-serif', color: '#0d1b38' }}>
                {t('services_page.latam_heading')}
              </h2>
              <div className="space-y-4 leading-[1.8]" style={{ fontFamily: 'Satoshi, sans-serif', color: 'rgba(13,27,56,0.52)', fontSize: '1.0625rem' }}>
                <p>{t('services_page.latam_body1')}</p>
                <p>{t('services_page.latam_body2')}</p>
              </div>
              <EnquireButton label={t('services_page.enquire_trip')} />
            </motion.div>

            <motion.div {...fadeUp} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.12 }} className="relative">
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3]"
                style={{ boxShadow: '0 24px 80px -16px rgba(13,27,56,0.18)' }}>
                <img src={IMG_RAIL} alt="High-speed rail" className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" loading="lazy" style={{ willChange: 'transform' }} />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(13,27,56,0.55) 0%, transparent 55%)' }} />
                <div className="absolute bottom-5 left-5">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full"
                    style={{ background: 'rgba(13,27,56,0.7)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.12)' }}>
                    <Compass className="w-3.5 h-3.5 text-blue-400" />
                    <span className="text-white text-xs font-bold" style={{ fontFamily: 'Satoshi, sans-serif' }}>40+ rail routes</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Rail route cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {RAIL_ROUTES.map((exp, i) => (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: '200px 0px -40px 0px' }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
                className="group relative rounded-3xl overflow-hidden"
                style={{ border: '1px solid rgba(13,27,56,0.07)', boxShadow: '0 4px 24px -6px rgba(13,27,56,0.08)' }}
              >
                {/* Image strip */}
                <div className="relative h-44 overflow-hidden">
                  <img src={exp.image} alt={exp.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-107"
                    style={{ objectPosition: 'center 40%', willChange: 'transform' }}
                    loading="lazy" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 30%, rgba(13,27,56,0.75) 100%)' }} />

                  {/* Duration badge */}
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1.5 rounded-full text-xs font-black"
                      style={{ fontFamily: 'Satoshi, sans-serif', background: exp.accent, color: '#0d1b38' }}>
                      {exp.duration}
                    </span>
                  </div>

                  {/* Title on image */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-lg font-black text-white leading-tight" style={{ fontFamily: 'Clash Display, sans-serif' }}>
                      {exp.title}
                    </h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 bg-white">
                  <p className="text-sm leading-relaxed mb-4" style={{ fontFamily: 'Satoshi, sans-serif', color: 'rgba(13,27,56,0.55)' }}>
                    {exp.desc}
                  </p>

                  {/* Includes chips */}
                  <div className="flex flex-wrap gap-1.5">
                    {exp.includes.split(' · ').map((item) => (
                      <span key={item}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold"
                        style={{ fontFamily: 'Satoshi, sans-serif', background: `${exp.accent}12`, color: exp.accent, border: `1px solid ${exp.accent}22` }}>
                        <CheckCircle className="w-3 h-3" />
                        {item}
                      </span>
                    ))}
                  </div>

                  {/* Enquire link */}
                  <Link to="/enquiries"
                    className="inline-flex items-center gap-1.5 mt-5 text-sm font-bold transition-colors duration-200"
                    style={{ fontFamily: 'Satoshi, sans-serif', color: exp.accent }}>
                    Enquire about this route
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </div>
  );
}
