import { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Map, MapArc, MapMarker, MarkerContent, MarkerLabel } from '@/components/ui/map';

// ── Data ──────────────────────────────────────────────────────────────────────

const HUB = { name: 'Lagos', lng: 3.3792, lat: 6.5244 };

const LOCATIONS = [
  { name: 'London',    city: 'London',    lng: -0.1276,  lat: 51.5074,  type: 'Flight',      region: 'Europe'      },
  { name: 'Dubai',     city: 'Dubai',     lng: 55.2708,  lat: 25.2048,  type: 'Flight',      region: 'Middle East' },
  { name: 'New York',  city: 'New York',  lng: -74.006,  lat: 40.7128,  type: 'Flight',      region: 'Americas'    },
  { name: 'Nairobi',   city: 'Nairobi',   lng: 36.8219,  lat: -1.2921,  type: 'Expedition',  region: 'Africa'      },
  { name: 'Rome',      city: 'Rome',      lng: 12.4964,  lat: 41.9028,  type: 'Flight',      region: 'Europe'      },
  { name: 'Accra',     city: 'Accra',     lng: -0.2057,  lat: 5.5600,   type: 'Road Travel', region: 'Africa'      },
  { name: 'São Paulo', city: 'São Paulo', lng: -46.6333, lat: -23.5505, type: 'Flight',      region: 'Americas'    },
  { name: 'Singapore', city: 'Singapore', lng: 103.8198, lat: 1.3521,   type: 'Flight',      region: 'Asia'        },
];

const EXTRA_DOTS = [
  { name: 'Paris',     lng: 2.3522,   lat: 48.8566  },
  { name: 'Cape Town', lng: 18.4241,  lat: -33.9249 },
  { name: 'Tokyo',     lng: 139.6917, lat: 35.6895  },
  { name: 'Istanbul',  lng: 28.9784,  lat: 41.0082  },
];

const ARCS = LOCATIONS.map((loc) => ({
  id: loc.name,
  from: [HUB.lng, HUB.lat] as [number, number],
  to:   [loc.lng, loc.lat]  as [number, number],
}));

const STATS = [
  { value: 12, suffix: '+', labelKey: 'locations_globe.cities'     },
  { value: 8,  suffix: '+', labelKey: 'locations_globe.countries'  },
  { value: 3,  suffix: '',  labelKey: 'locations_globe.continents' },
];

const TYPE_COLORS: Record<string, string> = {
  'Flight':      'text-[#a8cce8]',
  'Road Travel': 'text-emerald-400',
  'Expedition':  'text-amber-400',
};

const TYPE_KEYS: Record<string, string> = {
  'Flight':      'locations_globe.flight',
  'Road Travel': 'locations_globe.road_travel',
  'Expedition':  'locations_globe.expedition',
};

const REGION_KEYS: Record<string, string> = {
  'Europe':      'locations_globe.europe',
  'Middle East': 'locations_globe.middle_east',
  'Americas':    'locations_globe.americas',
  'Africa':      'locations_globe.africa',
  'Asia':        'locations_globe.asia',
};

// Triple-duplicate so the loop is seamless (we animate -33.333%)
const TICKER_ITEMS = [...LOCATIONS, ...LOCATIONS, ...LOCATIONS];

// ── Scroll-triggered fade-up helper ──────────────────────────────────────────

function fadeUp(delay = 0) {
  return {
    initial:     { opacity: 0, y: 36 },
    whileInView: { opacity: 1, y: 0  },
    viewport:    { once: false, margin: '-80px' } as const,
    transition:  { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const, delay },
  };
}

// ── Count-up stat ─────────────────────────────────────────────────────────────

function CountUp({ to, suffix }: { to: number; suffix: string }) {
  const ref     = useRef<HTMLSpanElement>(null);
  const inView  = useInView(ref, { once: false, margin: '-80px' });
  const mv      = useMotionValue(0);
  const spring  = useSpring(mv, { stiffness: 60, damping: 20 });
  const [val, setVal] = useState(0);

  useEffect(() => { mv.set(inView ? to : 0); }, [inView, mv, to]);
  useEffect(() => spring.on('change', (v) => setVal(Math.round(v))), [spring]);

  return <span ref={ref}>{val}{suffix}</span>;
}

// ── Globe ─────────────────────────────────────────────────────────────────────

function GlobeMap() {
  return (
    <div className="h-[460px] md:h-[960px] w-full">
      <Map
        center={[HUB.lng, HUB.lat]}
        zoom={1.4}
        projection={{ type: 'globe' }}
        theme="light"
        interactive
        scrollZoom={false}
        doubleClickZoom
        attributionControl={false}
      >
        {/* Route arcs */}
        <MapArc
          data={ARCS}
          paint={{
            'line-color':     '#3b82f6',
            'line-width':     1.5,
            'line-dasharray': [2, 2],
            'line-opacity':   0.7,
          }}
          interactive={false}
        />

        {/* Hub — Lagos: gold pulse dot */}
        <MapMarker longitude={HUB.lng} latitude={HUB.lat}>
          <MarkerContent>
            <div
              className="size-3.5 rounded-full border-2 border-white"
              style={{
                background: '#f5d27a',
                boxShadow: '0 0 0 4px rgba(245,210,122,0.3), 0 0 10px 2px rgba(245,210,122,0.4)',
              }}
            />
            <MarkerLabel position="top" className="text-[#1a2f5a] text-[10px] font-bold tracking-wide">
              {HUB.name}
            </MarkerLabel>
          </MarkerContent>
        </MapMarker>

        {/* Destination markers */}
        {LOCATIONS.map((loc) => (
          <MapMarker key={loc.name} longitude={loc.lng} latitude={loc.lat}>
            <MarkerContent>
              <div
                className="size-2 rounded-full border-2 border-white"
                style={{ background: '#3b82f6' }}
              />
              <MarkerLabel position="top" className="text-[#1a2f5a] text-[9px] font-medium">
                {loc.city}
              </MarkerLabel>
            </MarkerContent>
          </MapMarker>
        ))}

        {/* Ambient dots */}
        {EXTRA_DOTS.map((d) => (
          <MapMarker key={d.name} longitude={d.lng} latitude={d.lat}>
            <MarkerContent>
              <div className="size-1.5 rounded-full bg-white/15" />
            </MarkerContent>
          </MapMarker>
        ))}
      </Map>
    </div>
  );
}

// ── Single ticker row ─────────────────────────────────────────────────────────

function TickerRow({ loc }: { loc: typeof LOCATIONS[0] }) {
  const { t } = useTranslation();
  return (
    <motion.div
      className="group flex items-center justify-between py-3 px-1 border-b border-white/[0.07] select-none"
      whileHover={{ x: 6 }}
      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
    >
      <div className="flex items-center gap-2.5">
        <motion.svg
          width="12" height="12" viewBox="0 0 24 24"
          fill="none" stroke="#a8cce8" strokeWidth="2.5"
          className="shrink-0"
          whileHover={{ x: 2, y: -2 }}
          transition={{ type: 'spring', stiffness: 420, damping: 32 }}
        >
          <path d="M7 17L17 7M17 7H7M17 7v10"/>
        </motion.svg>
        <span
          className="text-[14px] font-semibold text-white/85 group-hover:text-white transition-colors duration-150"
          style={{ fontFamily: 'Satoshi, sans-serif' }}
        >
          {loc.name}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <span
          className={`text-[11px] font-semibold tabular-nums ${TYPE_COLORS[loc.type] ?? 'text-white/40'}`}
          style={{ fontFamily: 'Satoshi, sans-serif' }}
        >
          {t(TYPE_KEYS[loc.type] ?? loc.type)}
        </span>
        <span
          className="text-[11px] text-white/25"
          style={{ fontFamily: 'Satoshi, sans-serif' }}
        >
          {t(REGION_KEYS[loc.region] ?? loc.region)}
        </span>
      </div>
    </motion.div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────

export function LocationsGlobe() {
  const { t } = useTranslation();
  const [tickerPaused, setTickerPaused] = useState(false);

  return (
    <section className="relative py-20 sm:py-28 px-4 sm:px-8 bg-[#0d1b38] overflow-hidden">

      {/* Radial glow — desktop only */}
      <div
        aria-hidden
        className="pointer-events-none hidden lg:block absolute -left-32 top-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(26,53,102,0.7) 0%, transparent 68%)' }}
      />

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* ── Left: Globe ── */}
          <motion.div
            className="w-full lg:w-[52%] shrink-0"
            initial={{ opacity: 0, scale: 0.86, x: -32 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: false, margin: '-80px' }}
            transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="rounded-2xl overflow-hidden">
              <GlobeMap />
            </div>
          </motion.div>

          {/* ── Right: Content ── */}
          <div className="w-full lg:w-[45%] flex flex-col gap-8">

            {/* Eyebrow label */}
            <motion.p
              className="text-[10px] font-bold tracking-[0.32em] uppercase text-white/35"
              style={{ fontFamily: 'Satoshi, sans-serif' }}
              {...fadeUp(0.08)}
            >
              {t('locations_globe.label')}
            </motion.p>

            {/* Heading + body */}
            <div className="-mt-4">
              <motion.h2
                className="text-[2.6rem] sm:text-[3.4rem] font-black leading-[0.98] tracking-tight text-white"
                style={{ fontFamily: 'Clash Display, sans-serif' }}
                {...fadeUp(0.16)}
              >
                {t('locations_globe.heading')}
                <span className="text-[#a8cce8]">.</span>
              </motion.h2>
              <motion.p
                className="mt-4 text-[15px] text-white/45 leading-relaxed max-w-sm"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
                {...fadeUp(0.24)}
              >
                {t('locations_globe.body')}
              </motion.p>
            </div>

            {/* Infinite upward ticker */}
            <motion.div
              className="relative h-[232px] overflow-hidden rounded-xl"
              style={{ maskImage: 'linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)' }}
              {...fadeUp(0.32)}
            >
              <div
                className="ticker-track"
                style={{ animationPlayState: tickerPaused ? 'paused' : 'running' }}
                onMouseEnter={() => setTickerPaused(true)}
                onMouseLeave={() => setTickerPaused(false)}
              >
                {TICKER_ITEMS.map((loc, i) => (
                  <TickerRow key={`${loc.name}-${i}`} loc={loc} />
                ))}
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div className="flex items-start justify-center lg:justify-start pt-2" {...fadeUp(0.42)}>
              {STATS.map((stat, i) => (
                <div key={stat.labelKey} className="flex items-stretch">
                  <div className="flex flex-col items-center lg:items-start gap-1.5 px-7 first:pl-0 lg:first:pl-0">
                    <span
                      className="text-[2.2rem] font-black text-white leading-none tabular-nums"
                      style={{ fontFamily: 'Clash Display, sans-serif' }}
                    >
                      <CountUp to={stat.value} suffix={stat.suffix} />
                    </span>
                    <span
                      className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/35"
                      style={{ fontFamily: 'Satoshi, sans-serif' }}
                    >
                      {t(stat.labelKey)}
                    </span>
                  </div>
                  {i < STATS.length - 1 && (
                    <div className="w-px self-stretch bg-white/10" />
                  )}
                </div>
              ))}
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
