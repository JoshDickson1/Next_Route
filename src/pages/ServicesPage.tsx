import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Globe, Map, Compass } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { CTABanner } from '@/components/CTABanner';
import { SEOHead } from '@/components/SEOHead';

const fadeUp = {
  initial:    { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport:   { once: false, margin: '-60px' },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
};

const FLIGHT_ROUTES = ['Lagos → London', 'Lagos → Dubai', 'Abuja → New York', 'Lagos → Toronto', 'Abuja → Atlanta'];
const ROAD_ROUTES   = ['Lagos → Abuja', 'Lagos → Accra', 'Abuja → Kano', 'Lagos → Cotonou', 'Port Harcourt → Enugu'];

const ROAD_FEATURE_KEYS = ['road_feature1', 'road_feature2', 'road_feature3', 'road_feature4'];

const EXPEDITIONS = [
  { title: 'Colombia → Ecuador Overland',  duration: '14 days', desc: 'Cross the Andes from Medellín to Quito, passing cloud forests, volcano corridors, and colonial towns.', includes: 'SUV, guide, accommodation, meals' },
  { title: 'Patagonia SUV Circuit, Argentina', duration: '10 days', desc: 'Drive the legendary Ruta 40, camp under the stars, and trek Torres del Paine.', includes: 'SUV, guide, camping gear, permits' },
  { title: 'Peru Sacred Valley & Amazon Loop', duration: '12 days', desc: 'Machu Picchu by road, then descend into the Amazon for a once-in-a-lifetime contrast.', includes: '4x4, bilingual guide, flights to Cusco' },
  { title: 'Mexico City → Panama Overland',  duration: '21 days', desc: 'The ultimate Central American road epic — six countries, ancient ruins, and Pacific coastlines.', includes: 'Convoy SUV, support team, hotels, ferry' },
];

function RouteTags({ routes }: { routes: string[] }) {
  return (
    <div className="flex flex-wrap gap-2 mt-6">
      {routes.map((r) => (
        <span key={r} className="px-3 py-1 rounded-full text-xs font-semibold border"
          style={{ fontFamily: 'Satoshi, sans-serif', borderColor: 'rgba(74,144,217,0.3)', color: '#4a90d9', background: 'rgba(74,144,217,0.08)' }}>
          {r}
        </span>
      ))}
    </div>
  );
}

export default function ServicesPage() {
  const { t } = useTranslation();

  return (
    <div>
      <SEOHead
        title="Travel Services — Next Route Travels"
        description="From international flights to cross-continent road expeditions — we cover every route, every mode, every adventure."
        canonicalPath="/services"
      />
      {/* ── HERO ── */}
      <section className="relative min-h-[70vh] flex items-center bg-[#0d1b38] overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-blue-400/08 blur-[100px] pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-36 pb-20 w-full">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-white/60" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                {t('services_page.eyebrow')}
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white mb-6" style={{ fontFamily: 'Clash Display, sans-serif' }}>
              {t('services_page.heading')}
            </h1>
            <p className="text-xl text-white/45 max-w-2xl leading-relaxed" style={{ fontFamily: 'Satoshi, sans-serif' }}>
              {t('services_page.sub')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 2: FLIGHTS ── */}
      <section className="py-28 px-6 bg-[#f5f8fc]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <motion.div {...fadeUp}>
            <div className="rounded-2xl overflow-hidden aspect-[4/3] flex items-center justify-center relative"
              style={{ background: 'linear-gradient(135deg, #0d1b38 0%, #1a2f5a 50%, #243a6e 100%)' }}>
              <div className="absolute inset-0 flex items-center justify-center">
                <Globe className="w-32 h-32 text-blue-400/20" strokeWidth={0.8} />
              </div>
              <div className="relative z-10 text-center px-8">
                <p className="text-white/30 text-sm tracking-widest uppercase mb-3" style={{ fontFamily: 'Satoshi, sans-serif' }}>International</p>
                <p className="text-white text-4xl font-black" style={{ fontFamily: 'Clash Display, sans-serif' }}>Flights</p>
                <div className="mt-6 flex flex-col gap-2">
                  {FLIGHT_ROUTES.slice(0, 3).map((r) => (
                    <div key={r} className="flex items-center justify-center gap-2 text-white/50 text-sm" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />{r}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div {...fadeUp} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.15 }} className="space-y-6">
            <p className="text-blue-600 text-sm font-bold tracking-widest uppercase" style={{ fontFamily: 'Satoshi, sans-serif' }}>
              {t('services_page.flights_eyebrow')}
            </p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-[#1a2f5a]" style={{ fontFamily: 'Clash Display, sans-serif' }}>
              {t('services_page.flights_heading')}
            </h2>
            <div className="space-y-4 text-slate-500 leading-relaxed text-lg" style={{ fontFamily: 'Satoshi, sans-serif' }}>
              <p>{t('services_page.flights_body1')}</p>
              <p>{t('services_page.flights_body2')}</p>
            </div>

            <div>
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-slate-400 mb-3" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                {t('services_page.popular_routes')}
              </p>
              <RouteTags routes={FLIGHT_ROUTES} />
            </div>

            <Link to="/enquiries"
              className="mt-4 group inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:scale-[1.02]"
              style={{ fontFamily: 'Satoshi, sans-serif', background: 'linear-gradient(135deg, #1a3566 0%, #0d1b38 100%)', boxShadow: '0 8px 24px rgba(13,27,56,0.25)' }}>
              {t('services_page.enquire_trip')} <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 3: ROAD TRAVEL ── */}
      <section className="py-28 px-6 bg-[#0d1b38]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <motion.div {...fadeUp} className="space-y-6">
            <p className="text-blue-400 text-sm font-bold tracking-widest uppercase" style={{ fontFamily: 'Satoshi, sans-serif' }}>
              {t('services_page.road_eyebrow')}
            </p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white" style={{ fontFamily: 'Clash Display, sans-serif' }}>
              {t('services_page.road_heading')}
            </h2>
            <div className="space-y-4 text-white/50 leading-relaxed text-lg" style={{ fontFamily: 'Satoshi, sans-serif' }}>
              <p>{t('services_page.road_body1')}</p>
              <p>{t('services_page.road_body2')}</p>
            </div>

            <RouteTags routes={ROAD_ROUTES} />

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ROAD_FEATURE_KEYS.map((key) => (
                <div key={key} className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-blue-400 shrink-0" />
                  <span className="text-sm text-white/55" style={{ fontFamily: 'Satoshi, sans-serif' }}>{t(`services_page.${key}`)}</span>
                </div>
              ))}
            </div>

            <Link to="/enquiries"
              className="mt-4 group inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:scale-[1.02]"
              style={{ fontFamily: 'Satoshi, sans-serif', background: 'linear-gradient(135deg, #1a3566 0%, #0d1b38 100%)', boxShadow: '0 8px 24px rgba(13,27,56,0.25)' }}>
              {t('services_page.enquire_trip')} <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>

          <motion.div {...fadeUp} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}>
            <div className="rounded-2xl overflow-hidden aspect-[4/3] flex items-center justify-center relative"
              style={{ background: 'linear-gradient(135deg, #0f2244 0%, #162d55 50%, #1a3566 100%)' }}>
              <div className="absolute inset-0 flex items-center justify-center opacity-10">
                <Map className="w-48 h-48 text-blue-300" strokeWidth={0.5} />
              </div>
              <div className="relative z-10 text-center px-8">
                <p className="text-white/30 text-sm tracking-widest uppercase mb-3" style={{ fontFamily: 'Satoshi, sans-serif' }}>West Africa</p>
                <p className="text-white text-4xl font-black" style={{ fontFamily: 'Clash Display, sans-serif' }}>Road Travel</p>
                <div className="mt-6 flex flex-col gap-2">
                  {ROAD_ROUTES.slice(0, 3).map((r) => (
                    <div key={r} className="flex items-center justify-center gap-2 text-white/50 text-sm" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />{r}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 4: LATIN AMERICA EXPEDITIONS ── */}
      <section className="py-28 px-6 bg-[#f5f8fc]">
        <div className="max-w-7xl mx-auto">
          <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-14" {...fadeUp}>
            <div className="space-y-6">
              <p className="text-blue-600 text-sm font-bold tracking-widest uppercase" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                {t('services_page.latam_eyebrow')}
              </p>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight text-[#1a2f5a]" style={{ fontFamily: 'Clash Display, sans-serif' }}>
                {t('services_page.latam_heading')}
              </h2>
              <div className="space-y-4 text-slate-500 leading-relaxed text-lg" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                <p>{t('services_page.latam_body1')}</p>
                <p>{t('services_page.latam_body2')}</p>
              </div>
              <Link to="/enquiries"
                className="inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:scale-[1.02]"
                style={{ fontFamily: 'Satoshi, sans-serif', background: 'linear-gradient(135deg, #1a3566 0%, #0d1b38 100%)', boxShadow: '0 8px 24px rgba(13,27,56,0.25)' }}>
                {t('services_page.enquire_trip')}
              </Link>
            </div>
            <div className="rounded-2xl overflow-hidden aspect-[4/3] flex items-center justify-center relative"
              style={{ background: 'linear-gradient(135deg, #064e3b 0%, #065f46 50%, #047857 100%)' }}>
              <div className="absolute inset-0 opacity-10 flex items-center justify-center">
                <Compass className="w-48 h-48 text-emerald-300" strokeWidth={0.5} />
              </div>
              <div className="relative z-10 text-center px-8">
                <p className="text-emerald-300/60 text-sm tracking-widest uppercase mb-3" style={{ fontFamily: 'Satoshi, sans-serif' }}>North & South America</p>
                <p className="text-white text-3xl font-black" style={{ fontFamily: 'Clash Display, sans-serif' }}>Overland Expeditions</p>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {EXPEDITIONS.map((pkg, i) => (
              <motion.div key={pkg.title} {...fadeUp} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
                className="p-7 rounded-2xl bg-white border border-slate-100 hover:border-blue-200 hover:shadow-lg transition-all duration-400 group">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold text-[#1a2f5a]" style={{ fontFamily: 'Clash Display, sans-serif' }}>{pkg.title}</h3>
                  <span className="shrink-0 ml-3 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-600" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                    {pkg.duration}
                  </span>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed mb-3" style={{ fontFamily: 'Satoshi, sans-serif' }}>{pkg.desc}</p>
                <p className="text-xs text-slate-400" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                  <span className="font-semibold">{t('services_page.includes')}:</span> {pkg.includes}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </div>
  );
}
