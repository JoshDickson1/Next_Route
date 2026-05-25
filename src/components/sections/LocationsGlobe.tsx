import { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Map, MapArc, MapMarker, MarkerContent, MarkerLabel } from '@/components/ui/map';

// ── Data ──────────────────────────────────────────────────────────────────────

const HUB = { name: 'Lagos', lng: 3.3792, lat: 6.5244 };

const LOCATIONS = [
  { name: 'London',       city: 'London',        lng: -0.1276,   lat: 51.5074,  type: 'Flight',      region: 'Europe'       },
  { name: 'Dubai',        city: 'Dubai',          lng: 55.2708,   lat: 25.2048,  type: 'Flight',      region: 'Middle East'  },
  { name: 'New York',     city: 'New York',       lng: -74.006,   lat: 40.7128,  type: 'Flight',      region: 'Americas'     },
  { name: 'Nairobi',      city: 'Nairobi',        lng: 36.8219,   lat: -1.2921,  type: 'Expedition',  region: 'Africa'       },
  { name: 'Rome',         city: 'Rome',           lng: 12.4964,   lat: 41.9028,  type: 'Flight',      region: 'Europe'       },
  { name: 'Accra',        city: 'Accra',          lng: -0.2057,   lat: 5.5600,   type: 'Road Travel', region: 'Africa'       },
  { name: 'São Paulo',    city: 'São Paulo',      lng: -46.6333,  lat: -23.5505, type: 'Flight',      region: 'Americas'     },
  { name: 'Singapore',    city: 'Singapore',      lng: 103.8198,  lat: 1.3521,   type: 'Flight',      region: 'Asia'         },
];

const EXTRA_DOTS = [
  { name: 'Paris',     lng: 2.3522,    lat: 48.8566  },
  { name: 'Cape Town', lng: 18.4241,   lat: -33.9249 },
  { name: 'Tokyo',     lng: 139.6917,  lat: 35.6895  },
  { name: 'Istanbul',  lng: 28.9784,   lat: 41.0082  },
];

const ARCS = LOCATIONS.map((loc) => ({
  id: loc.name,
  from: [HUB.lng, HUB.lat] as [number, number],
  to:   [loc.lng, loc.lat]  as [number, number],
}));

const STATS = [
  { value: 12, suffix: '+', label: 'Cities'      },
  { value: 8,  suffix: '+', label: 'Countries'   },
  { value: 3,  suffix: '',  label: 'Continents'  },
];

const TYPE_COLORS: Record<string, string> = {
  'Flight':      'text-blue-500',
  'Road Travel': 'text-emerald-500',
  'Expedition':  'text-amber-500',
};

// ── Count-up stat ─────────────────────────────────────────────────────────────

function CountUp({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: false, margin: '-80px' });
  const mv     = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 60, damping: 20 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (isInView) mv.set(to);
  }, [isInView, mv, to]);

  useEffect(() => {
    return spring.on('change', (v) => setDisplay(Math.round(v)));
  }, [spring]);

  return (
    <span ref={ref}>
      {display}{suffix}
    </span>
  );
}

// ── Globe map ─────────────────────────────────────────────────────────────────

function GlobeMap() {
  return (
    <div className="md:h-[780px] h-[310px] w-full">
      <Map
        center={[HUB.lng, HUB.lat]}
        zoom={1.4}
        projection={{ type: 'globe' }}
        interactive
        scrollZoom={false}
        doubleClickZoom
        attributionControl={false}
      >
        <MapArc
          data={ARCS}
          paint={{
            'line-color': '#3b82f6',
            'line-width': 1.5,
            'line-dasharray': [2, 2],
          }}
          interactive={false}
        />

        {/* Hub marker — Lagos */}
        <MapMarker longitude={HUB.lng} latitude={HUB.lat}>
          <MarkerContent>
            <div className="size-3 rounded-full border-2 border-white bg-blue-500 shadow-md" />
            <MarkerLabel
              position="top"
              className="bg-background/80 rounded-sm px-1.5 py-0.5 text-[11px] font-semibold backdrop-blur"
            >
              {HUB.name}
            </MarkerLabel>
          </MarkerContent>
        </MapMarker>

        {/* Destination markers */}
        {LOCATIONS.map((loc) => (
          <MapMarker key={loc.name} longitude={loc.lng} latitude={loc.lat}>
            <MarkerContent>
              <div className="size-2 rounded-full border-2 border-white bg-emerald-500 shadow" />
              <MarkerLabel position="top">{loc.city}</MarkerLabel>
            </MarkerContent>
          </MapMarker>
        ))}

        {/* Extra ambient dots */}
        {EXTRA_DOTS.map((d) => (
          <MapMarker key={d.name} longitude={d.lng} latitude={d.lat}>
            <MarkerContent>
              <div className="size-1.5 rounded-full bg-muted-foreground/40" />
            </MarkerContent>
          </MapMarker>
        ))}
      </Map>
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────

export function LocationsGlobe() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView   = useInView(sectionRef, { once: false, margin: '-100px' });

  return (
    <section
      ref={sectionRef}
      className="relative py-20 sm:py-28 px-4 sm:px-8 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* ── Left: Globe ── */}
          <motion.div
            className="w-[95%] lg:w-[55%] shrink-0"
            initial={{ opacity: 0, x: -40, scale: 0.92 }}
            animate={isInView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: -40, scale: 0.92 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="rounded-2xl overflow-hidden">
              <GlobeMap />
            </div>
          </motion.div>

          {/* ── Right: Content ── */}
          <motion.div
            className="w-[90%] lg:w-[45%] md:-ml-10 -ml-0 flex flex-col gap-8"
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
          >
            {/* Label */}
            <motion.p
              className="text-[10px] font-bold tracking-[0.3em] uppercase text-muted-foreground/60"
              style={{ fontFamily: 'Satoshi, sans-serif' }}
              initial={{ y: 28 }}
              animate={isInView ? { y: 0 } : { y: 28 }}
              transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.22 }}
            >
              Our routes
            </motion.p>

            {/* Heading */}
            <div className="-mt-4">
              <motion.h2
                className="text-[2.8rem] sm:text-[3.5rem] font-black leading-[1.0] tracking-tight text-foreground"
                style={{ fontFamily: 'Clash Display, sans-serif' }}
                initial={{ y: 36 }}
                animate={isInView ? { y: 0 } : { y: 36 }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.32 }}
              >
                Where we fly &amp; drive
                <span className="text-blue-600">.</span>
              </motion.h2>
              <motion.p
                className="mt-4 text-base text-muted-foreground leading-relaxed max-w-sm"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
                initial={{ y: 28 }}
                animate={isInView ? { y: 0 } : { y: 28 }}
                transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.42 }}
              >
                From our hub in Lagos, we connect travellers to iconic destinations
                across Africa, Europe, the Middle East, and beyond.
              </motion.p>
            </div>

            {/* Destinations list */}
            <ul className="flex flex-col max-h-[260px] w-full md:w-[85%] overflow-y-auto gap-1">
              {LOCATIONS.map((loc, i) => (
                <motion.li
                  key={loc.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ duration: 0.4, delay: isInView ? 0.3 + i * 0.06 : 0 }}
                >
                  <div className="group flex items-center justify-between py-2.5 cursor-default">
                    <div className="flex items-center gap-2.5">
                      <ArrowUpRight
                        className="h-3.5 w-3.5 text-blue-600 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                      <span
                        className="text-[15px] font-semibold text-foreground transition-transform duration-300 group-hover:translate-x-1"
                        style={{ fontFamily: 'Satoshi, sans-serif', display: 'inline-block' }}
                      >
                        {loc.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[11px] font-semibold tabular-nums ${TYPE_COLORS[loc.type] ?? 'text-muted-foreground/60'}`}
                        style={{ fontFamily: 'Satoshi, sans-serif' }}
                      >
                        {loc.type}
                      </span>
                      <span
                        className="text-[11px] text-muted-foreground/40"
                        style={{ fontFamily: 'Satoshi, sans-serif' }}
                      >
                        {loc.region}
                      </span>
                    </div>
                  </div>
                  {i < LOCATIONS.length - 1 && (
                    <div className="h-px bg-border/40" />
                  )}
                </motion.li>
              ))}
            </ul>

            {/* Stats */}
            <div className="flex items-start">
              {STATS.map((stat, i) => (
                <div key={stat.label} className="flex items-stretch">
                  <div className="flex flex-col gap-1 px-6 first:pl-0">
                    <span
                      className="text-3xl sm:text-4xl font-black text-foreground leading-none"
                      style={{ fontFamily: 'Clash Display, sans-serif' }}
                    >
                      <CountUp to={stat.value} suffix={stat.suffix} />
                    </span>
                    <span
                      className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60"
                      style={{ fontFamily: 'Satoshi, sans-serif' }}
                    >
                      {stat.label}
                    </span>
                  </div>
                  {i < STATS.length - 1 && (
                    <div className="w-px self-stretch bg-border mx-0" />
                  )}
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
