import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Globe, Map, Compass } from 'lucide-react';
import { CTABanner } from '@/components/CTABanner';

const fadeUp = {
  initial:    { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport:   { once: false, margin: '-60px' },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
};

const FLIGHT_ROUTES = ['Lagos → London', 'Lagos → Dubai', 'Abuja → New York', 'Lagos → Toronto', 'Abuja → Atlanta'];
const ROAD_ROUTES   = ['Lagos → Abuja', 'Lagos → Accra', 'Abuja → Kano', 'Lagos → Cotonou', 'Port Harcourt → Enugu'];

const ROAD_FEATURES = [
  'Group bookings for any size',
  'Vetted, professional drivers',
  'Schedule coordination & tracking',
  'Door-to-door routing available',
];

const EXPEDITIONS = [
  {
    title: 'Colombia → Ecuador Overland',
    duration: '14 days',
    desc: 'Cross the Andes from Medellín to Quito, passing cloud forests, volcano corridors, and colonial towns.',
    includes: 'SUV, guide, accommodation, meals',
  },
  {
    title: 'Patagonia SUV Circuit, Argentina',
    duration: '10 days',
    desc: 'Drive the legendary Ruta 40, camp under the stars, and trek Torres del Paine.',
    includes: 'SUV, guide, camping gear, permits',
  },
  {
    title: 'Peru Sacred Valley & Amazon Loop',
    duration: '12 days',
    desc: 'Machu Picchu by road, then descend into the Amazon for a once-in-a-lifetime contrast.',
    includes: '4x4, bilingual guide, flights to Cusco',
  },
  {
    title: 'Mexico City → Panama Overland',
    duration: '21 days',
    desc: 'The ultimate Central American road epic — six countries, ancient ruins, and Pacific coastlines.',
    includes: 'Convoy SUV, support team, hotels, ferry',
  },
];

function RouteTags({ routes }: { routes: string[] }) {
  return (
    <div className="flex flex-wrap gap-2 mt-6">
      {routes.map((r) => (
        <span
          key={r}
          className="px-3 py-1 rounded-full text-xs font-semibold border"
          style={{
            fontFamily: 'Satoshi, sans-serif',
            borderColor: 'rgba(74,144,217,0.3)',
            color: '#4a90d9',
            background: 'rgba(74,144,217,0.08)',
          }}
        >
          {r}
        </span>
      ))}
    </div>
  );
}

export default function ServicesPage() {
  return (
    <div>
      {/* ── HERO ── */}
      <section className="relative min-h-[70vh] flex items-center bg-[#0d1b38] overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-blue-400/08 blur-[100px] pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-36 pb-20 w-full">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-white/60" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                Our Travel Services
              </span>
            </div>
            <h1
              className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white mb-6"
              style={{ fontFamily: 'Clash Display, sans-serif' }}
            >
              Every Journey.<br />Every Route. Handled.
            </h1>
            <p className="text-xl text-white/45 max-w-2xl leading-relaxed" style={{ fontFamily: 'Satoshi, sans-serif' }}>
              Whether you're flying internationally, travelling across West Africa, or embarking on
              a curated expedition — Next Route Travels is your end-to-end travel partner.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 2: FLIGHTS ── */}
      <section className="py-28 px-6 bg-[#f5f8fc] dark:bg-background">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Visual */}
          <motion.div {...fadeUp}>
            <div
              className="rounded-2xl overflow-hidden aspect-[4/3] flex items-center justify-center relative"
              style={{ background: 'linear-gradient(135deg, #0d1b38 0%, #1a2f5a 50%, #243a6e 100%)' }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <Globe className="w-32 h-32 text-blue-400/20" strokeWidth={0.8} />
              </div>
              <div className="relative z-10 text-center px-8">
                <p className="text-white/30 text-sm tracking-widest uppercase mb-3" style={{ fontFamily: 'Satoshi, sans-serif' }}>International</p>
                <p className="text-white text-4xl font-black" style={{ fontFamily: 'Clash Display, sans-serif' }}>Flights</p>
                <div className="mt-6 flex flex-col gap-2">
                  {FLIGHT_ROUTES.slice(0, 3).map((r) => (
                    <div key={r} className="flex items-center justify-center gap-2 text-white/50 text-sm" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                      {r}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div {...fadeUp} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.15 }} className="space-y-6">
            <p className="text-blue-600 dark:text-blue-400 text-sm font-bold tracking-widest uppercase" style={{ fontFamily: 'Satoshi, sans-serif' }}>Service 01</p>
            <h2
              className="text-4xl md:text-5xl font-black tracking-tight text-[#1a2f5a] dark:text-foreground"
              style={{ fontFamily: 'Clash Display, sans-serif' }}
            >
              Flights
            </h2>
            <p className="text-slate-500 dark:text-muted-foreground leading-relaxed text-lg" style={{ fontFamily: 'Satoshi, sans-serif' }}>
              Connecting Nigeria to major international hubs. Whether you are traveling for business, study,
              or leisure, we bridge the gap between Nigeria and the rest of the world with reliable flight options
              and seamless booking coordination.
            </p>

            <RouteTags routes={FLIGHT_ROUTES} />

            {/* How it works */}
            <div className="mt-8 space-y-4">
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-slate-400 dark:text-muted-foreground" style={{ fontFamily: 'Satoshi, sans-serif' }}>How It Works</p>
              {['Tell us your destination', 'We find the best routes & prices', 'You fly. We handle the rest.'].map((step, i) => (
                <div key={step} className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#0d1b38] dark:bg-blue-950 flex items-center justify-center shrink-0">
                    <span className="text-xs font-black text-blue-400" style={{ fontFamily: 'Satoshi, sans-serif' }}>0{i + 1}</span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-muted-foreground" style={{ fontFamily: 'Satoshi, sans-serif' }}>{step}</p>
                </div>
              ))}
            </div>

            <Link
              to="/enquiries"
              className="mt-4 group inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:scale-[1.02]"
              style={{
                fontFamily: 'Satoshi, sans-serif',
                background: 'linear-gradient(135deg, #1a3566 0%, #0d1b38 100%)',
                boxShadow: '0 8px 24px rgba(13,27,56,0.25)',
              }}
            >
              Enquire About Flights <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 3: ROAD TRAVEL ── */}
      <section className="py-28 px-6 bg-[#0d1b38]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Content */}
          <motion.div {...fadeUp} className="space-y-6">
            <p className="text-blue-400 text-sm font-bold tracking-widest uppercase" style={{ fontFamily: 'Satoshi, sans-serif' }}>Service 02</p>
            <h2
              className="text-4xl md:text-5xl font-black tracking-tight text-white"
              style={{ fontFamily: 'Clash Display, sans-serif' }}
            >
              Road Travel
            </h2>
            <p className="text-white/50 leading-relaxed text-lg" style={{ fontFamily: 'Satoshi, sans-serif' }}>
              Inter-state express services and private charters across West Africa. Experience safe, comfortable,
              and reliable regional transit. From interstate commuting within Nigeria to private cross-border
              charters across West Africa, we keep you moving smoothly.
            </p>

            <RouteTags routes={ROAD_ROUTES} />

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ROAD_FEATURES.map((feat) => (
                <div key={feat} className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-blue-400 shrink-0" />
                  <span className="text-sm text-white/55" style={{ fontFamily: 'Satoshi, sans-serif' }}>{feat}</span>
                </div>
              ))}
            </div>

            <Link
              to="/enquiries"
              className="mt-4 group inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:scale-[1.02]"
              style={{
                fontFamily: 'Satoshi, sans-serif',
                background: 'linear-gradient(135deg, #1a3566 0%, #0d1b38 100%)',
                boxShadow: '0 8px 24px rgba(13,27,56,0.25)',
              }}
            >
              Enquire About Road Travel <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>

          {/* Visual */}
          <motion.div {...fadeUp} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}>
            <div
              className="rounded-2xl overflow-hidden aspect-[4/3] flex items-center justify-center relative"
              style={{ background: 'linear-gradient(135deg, #0f2244 0%, #162d55 50%, #1a3566 100%)' }}
            >
              <div className="absolute inset-0 flex items-center justify-center opacity-10">
                <Map className="w-48 h-48 text-blue-300" strokeWidth={0.5} />
              </div>
              <div className="relative z-10 text-center px-8">
                <p className="text-white/30 text-sm tracking-widest uppercase mb-3" style={{ fontFamily: 'Satoshi, sans-serif' }}>West Africa</p>
                <p className="text-white text-4xl font-black" style={{ fontFamily: 'Clash Display, sans-serif' }}>Road Travel</p>
                <div className="mt-6 flex flex-col gap-2">
                  {ROAD_ROUTES.slice(0, 3).map((r) => (
                    <div key={r} className="flex items-center justify-center gap-2 text-white/50 text-sm" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                      {r}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 4: LATIN AMERICA EXPEDITIONS ── */}
      <section className="py-28 px-6 bg-[#f5f8fc] dark:bg-background">
        <div className="max-w-7xl mx-auto">
          <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-14" {...fadeUp}>
            <div className="space-y-6">
              <p className="text-blue-600 dark:text-blue-400 text-sm font-bold tracking-widest uppercase" style={{ fontFamily: 'Satoshi, sans-serif' }}>Service 03</p>
              <h2
                className="text-4xl md:text-5xl font-black tracking-tight text-[#1a2f5a] dark:text-foreground"
                style={{ fontFamily: 'Clash Display, sans-serif' }}
              >
                Latin America Expeditions
              </h2>
              <p className="text-slate-500 dark:text-muted-foreground leading-relaxed text-lg" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                Specialized SUV and road travel connecting North & South America. Discover tailored, rugged,
                and breathtaking overland journeys across spectacular Latin American landscapes with experienced
                guides and specialized vehicles.
              </p>
              <Link
                to="/enquiries"
                className="inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:scale-[1.02]"
                style={{
                  fontFamily: 'Satoshi, sans-serif',
                  background: 'linear-gradient(135deg, #1a3566 0%, #0d1b38 100%)',
                  boxShadow: '0 8px 24px rgba(13,27,56,0.25)',
                }}
              >
                Enquire About Expeditions
              </Link>
            </div>
            <div
              className="rounded-2xl overflow-hidden aspect-[4/3] flex items-center justify-center relative"
              style={{ background: 'linear-gradient(135deg, #064e3b 0%, #065f46 50%, #047857 100%)' }}
            >
              <div className="absolute inset-0 opacity-10 flex items-center justify-center">
                <Compass className="w-48 h-48 text-emerald-300" strokeWidth={0.5} />
              </div>
              <div className="relative z-10 text-center px-8">
                <p className="text-emerald-300/60 text-sm tracking-widest uppercase mb-3" style={{ fontFamily: 'Satoshi, sans-serif' }}>North & South America</p>
                <p className="text-white text-3xl font-black" style={{ fontFamily: 'Clash Display, sans-serif' }}>Overland Expeditions</p>
              </div>
            </div>
          </motion.div>

          {/* Package list */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {EXPEDITIONS.map((pkg, i) => (
              <motion.div
                key={pkg.title}
                {...fadeUp}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
                className="p-7 rounded-2xl bg-white dark:bg-card border border-slate-100 dark:border-border hover:border-blue-200 dark:hover:border-blue-900 hover:shadow-lg dark:hover:shadow-black/30 transition-all duration-400 group"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3
                    className="text-lg font-bold text-[#1a2f5a] dark:text-foreground"
                    style={{ fontFamily: 'Clash Display, sans-serif' }}
                  >
                    {pkg.title}
                  </h3>
                  <span
                    className="shrink-0 ml-3 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400"
                    style={{ fontFamily: 'Satoshi, sans-serif' }}
                  >
                    {pkg.duration}
                  </span>
                </div>
                <p className="text-sm text-slate-500 dark:text-muted-foreground leading-relaxed mb-3" style={{ fontFamily: 'Satoshi, sans-serif' }}>{pkg.desc}</p>
                <p className="text-xs text-slate-400 dark:text-muted-foreground" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                  <span className="font-semibold">Includes:</span> {pkg.includes}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <CTABanner heading1="Ready to Plan" heading2="Your" headingAccent="Trip?" sub="Fill out our enquiry form and we'll come back to you with options within 24 hours." />
    </div>
  );
}
