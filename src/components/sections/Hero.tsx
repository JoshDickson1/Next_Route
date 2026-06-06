import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { PlaneTakeoff } from 'lucide-react';

// ── Destination data ──────────────────────────────────────────────────────────

interface Destination {
  name: string;
  country: string;
  code: string;
  region: string;
  coords: string;
  season: string;
  accent: string;
  blurb: string;
  silhouette: SilhouetteId;
  photo?: { src: string; objectPos?: string };
}

const DESTINATIONS: Destination[] = [
  {
    name: 'Rome', country: 'Italy', code: 'FCO', region: 'Europe',
    coords: '41.90°N · 12.49°E', season: 'Best · Apr–Jun',
    accent: '#f1c290',
    blurb: 'Cobblestones, espresso bars, and 2,500 years of stories under the same sun.',
    silhouette: 'rome',
    photo: { src: '/assets/rome.png', objectPos: 'center bottom' },
  },
  {
    name: 'Serengeti', country: 'Tanzania', code: 'JRO', region: 'Africa',
    coords: '02.33°S · 34.83°E', season: 'Migration · Jul–Oct',
    accent: '#f0c060',
    blurb: 'Endless plains, dust at sunset, and the loudest silence you will ever hear.',
    silhouette: 'serengeti',
    photo: { src: '/assets/Serengeti.jpeg', objectPos: 'center bottom' },
  },
  {
    name: 'Santorini', country: 'Greece', code: 'JTR', region: 'Europe',
    coords: '36.39°N · 25.46°E', season: 'Best · May–Sep',
    accent: '#a8cce8',
    blurb: 'White cubes spilling down the caldera, and a sea so blue it looks invented.',
    silhouette: 'santorini',
    photo: { src: '/assets/greece.jpeg', objectPos: 'center bottom' },
  },
  {
    name: 'Dubai', country: 'UAE', code: 'DXB', region: 'Middle East',
    coords: '25.27°N · 55.30°E', season: 'Best · Nov–Mar',
    accent: '#f5d27a',
    blurb: 'Glass spires above golden dunes–luxury that still smells of cardamom and sand.',
    silhouette: 'dubai',
    photo: { src: '/assets/dubai.png', objectPos: 'center bottom' },
  },
  {
    name: 'London', country: 'United Kingdom', code: 'LHR', region: 'Europe',
    coords: '51.47°N · 00.45°W', season: 'Best · May–Sep',
    accent: '#cdd9e6',
    blurb: 'Rainy afternoons that smell like tea, and a skyline carved from old stone.',
    silhouette: 'london',
    photo: { src: '/assets/london-bridge.png', objectPos: 'center 60%' },
  },
  {
    name: 'Accra', country: 'Ghana', code: 'ACC', region: 'Africa',
    coords: '05.55°N · 00.20°W', season: 'Best · Nov–Mar',
    accent: '#86e2cf',
    blurb: 'Coastal warmth, brass-band Sundays, and a city that hums in highlife.',
    silhouette: 'accra',
    photo: { src: '/assets/accra.jpeg', objectPos: 'center bottom' },
  },
];

const CYCLE_MS = 7000;

// ── Silhouettes ───────────────────────────────────────────────────────────────

type SilhouetteId = 'rome' | 'serengeti' | 'santorini' | 'dubai' | 'london' | 'accra';

function Silhouette({ id, className = '' }: { id: SilhouetteId; className?: string }) {
  const back  = { fill: 'rgba(0,0,0,0.18)' };
  const mid   = { fill: 'rgba(0,0,0,0.42)' };
  const fore  = { fill: 'rgba(0,0,0,0.78)' };
  const dark  = { fill: 'rgba(0,0,0,0.92)' };

  const scenes: Record<SilhouetteId, React.ReactNode> = {
    rome: (
      <g>
        <g {...back}>
          <rect x="120" y="380" width="180" height="140"/>
          <rect x="60"  y="420" width="80"  height="100"/>
          <rect x="1340" y="400" width="120" height="120"/>
          <rect x="1480" y="430" width="90" height="90"/>
        </g>
        <g {...mid}>
          <rect x="200" y="350" width="240" height="170"/>
          <path d="M225 460 L225 400 Q245 380 265 400 L265 460 Z" fill="rgba(255,255,255,0.10)"/>
          <path d="M295 460 L295 400 Q315 380 335 400 L335 460 Z" fill="rgba(255,255,255,0.10)"/>
          <path d="M365 460 L365 400 Q385 380 405 400 L405 460 Z" fill="rgba(255,255,255,0.10)"/>
          <rect x="200" y="345" width="240" height="14"/>
          <rect x="200" y="340" width="14" height="180"/>
          <rect x="426" y="340" width="14" height="180"/>
        </g>
        <g {...fore}>
          <path d="M500 520 L500 370 Q500 220 800 200 Q1100 220 1100 370 L1100 520 Z"/>
        </g>
        <g fill="rgba(255,255,255,0.10)">
          {Array.from({length: 14}).map((_, i) => <rect key={`r1-${i}`} x={525 + i * 41} y={420} width={26} height={50} rx={13}/>)}
          {Array.from({length: 14}).map((_, i) => <rect key={`r2-${i}`} x={525 + i * 41} y={355} width={26} height={45} rx={13}/>)}
          {Array.from({length: 14}).map((_, i) => <rect key={`r3-${i}`} x={525 + i * 41} y={295} width={26} height={40} rx={13}/>)}
          {Array.from({length: 14}).map((_, i) => <rect key={`r4-${i}`} x={535 + i * 41} y={245} width={14} height={28}/>)}
        </g>
        <rect x="0" y="510" width="1600" height="10" {...fore}/>
      </g>
    ),
    serengeti: (
      <g>
        <g {...back}>
          <path d="M0 470 L200 410 L420 460 L640 400 L900 450 L1180 390 L1440 440 L1600 410 L1600 520 L0 520 Z"/>
        </g>
        <g {...mid}>
          <rect x="1240" y="440" width="3" height="70"/>
          <ellipse cx="1241" cy="436" rx="40" ry="6"/>
          <rect x="160" y="450" width="2" height="60"/>
          <ellipse cx="161" cy="446" rx="28" ry="4"/>
        </g>
        <g {...fore}>
          <g transform="translate(1380,440)">
            <rect x="0" y="-50" width="6" height="50"/>
            <rect x="0" y="-58" width="22" height="6"/>
            <rect x="20" y="-72" width="4" height="18"/>
            <rect x="-30" y="-30" width="34" height="3"/>
            <rect x="-30" y="-30" width="3" height="32"/>
          </g>
          <g transform="translate(1050,488)">
            <ellipse cx="0" cy="0" rx="30" ry="14"/>
            <rect x="-22" y="-2" width="6" height="18"/>
            <rect x="-10" y="-2" width="6" height="18"/>
            <rect x="8" y="-2" width="6" height="18"/>
            <rect x="20" y="-2" width="6" height="18"/>
            <path d="M-32 -8 Q-44 -4 -40 8"/>
          </g>
          <g transform="translate(1110,492)">
            <ellipse cx="0" cy="0" rx="22" ry="10"/>
            <rect x="-16" y="-1" width="5" height="13"/>
            <rect x="-6" y="-1" width="5" height="13"/>
            <rect x="4" y="-1" width="5" height="13"/>
            <rect x="14" y="-1" width="5" height="13"/>
          </g>
        </g>
        <g {...dark}>
          <rect x="630" y="330" width="8" height="190"/>
          <path d="M610 340 Q620 320 634 322 L634 350 Z"/>
          <path d="M634 330 Q660 320 680 332 L634 348 Z"/>
          <ellipse cx="634" cy="310" rx="200" ry="20"/>
          <ellipse cx="634" cy="295" rx="170" ry="14"/>
          <ellipse cx="634" cy="282" rx="130" ry="9"/>
        </g>
        <rect x="0" y="514" width="1600" height="6" {...dark}/>
      </g>
    ),
    santorini: (
      <g>
        <g {...back}>
          <path d="M0 470 L300 440 L640 460 L900 430 L1240 450 L1600 425 L1600 520 L0 520 Z"/>
          <g transform="translate(1380,460)" fill="rgba(0,0,0,0.30)">
            <path d="M0 0 L14 -22 L14 0 Z"/>
            <path d="M-6 2 L26 2 L20 8 L0 8 Z"/>
            <rect x="13" y="-22" width="1.5" height="22"/>
          </g>
        </g>
        <g {...mid}>
          <path d="M0 360 L120 340 L240 320 L400 290 L580 270 L760 250 L940 280 L1140 300 L1340 340 L1500 360 L1600 380 L1600 520 L0 520 Z"/>
        </g>
        <g fill="rgba(255,255,255,0.92)">
          <rect x="280" y="270" width="80" height="40"/><rect x="300" y="252" width="50" height="22"/>
          <rect x="240" y="290" width="60" height="30"/><rect x="360" y="280" width="50" height="40"/>
          <rect x="500" y="240" width="100" height="38"/><rect x="520" y="220" width="60" height="24"/>
          <rect x="460" y="262" width="50" height="28"/><rect x="600" y="252" width="60" height="40"/>
          <rect x="800" y="230" width="120" height="42"/><rect x="820" y="208" width="80" height="26"/>
          <rect x="930" y="248" width="60" height="36"/><rect x="770" y="252" width="40" height="30"/>
          <rect x="1080" y="270" width="110" height="40"/><rect x="1100" y="252" width="70" height="22"/>
          <rect x="1200" y="290" width="60" height="30"/>
          <rect x="1300" y="310" width="80" height="34"/><rect x="1320" y="294" width="50" height="20"/>
        </g>
        <g fill="rgba(74,144,217,0.95)">
          <path d="M338 252 Q355 222 372 252 L372 270 L338 270 Z"/>
          <path d="M548 220 Q575 188 602 220 L602 244 L548 244 Z"/>
          <path d="M848 208 Q885 170 920 208 L920 234 L848 234 Z"/>
          <path d="M1118 252 Q1140 224 1162 252 L1162 270 L1118 270 Z"/>
        </g>
        <g fill="rgba(255,255,255,0.96)">
          <rect x="884" y="160" width="3" height="14"/><rect x="879" y="166" width="13" height="3"/>
          <rect x="582" y="180" width="2.5" height="10"/>
          <rect x="700" y="200" width="14" height="50"/>
          <path d="M698 196 L716 196 L707 184 Z"/>
        </g>
        <rect x="0" y="514" width="1600" height="6" {...dark}/>
      </g>
    ),
    dubai: (
      <g>
        <mask id="crescent">
          <rect width="1600" height="520" fill="white"/>
          <circle cx="1394" cy="92" r="28" fill="black"/>
        </mask>
        <circle cx="1380" cy="100" r="32" fill="rgba(255,255,255,0.32)" mask="url(#crescent)"/>
        <g {...back}>
          <rect x="0"   y="380" width="80" height="140"/><rect x="90" y="350" width="60" height="170"/>
          <rect x="160" y="370" width="50" height="150"/>
          <rect x="1480" y="370" width="60" height="150"/><rect x="1550" y="350" width="50" height="170"/>
        </g>
        <g {...mid}>
          <rect x="220" y="330" width="80" height="190"/><rect x="310" y="300" width="60" height="220"/>
          <path d="M380 520 L380 310 L410 290 L440 310 L440 520 Z"/>
          <rect x="1200" y="320" width="70" height="200"/><rect x="1280" y="290" width="80" height="230"/>
          <rect x="1380" y="320" width="60" height="200"/>
          <path d="M1100 520 L1100 360 Q1140 240 1180 360 L1180 520 Z"/>
        </g>
        <g {...fore}>
          <path d="M788 80 L812 80 L820 520 L780 520 Z"/>
          <path d="M770 520 L770 150 L788 150 L788 520 Z"/><path d="M812 520 L812 150 L830 150 L830 520 Z"/>
          <path d="M752 520 L752 220 L770 220 L770 520 Z"/><path d="M830 520 L830 220 L848 220 L848 520 Z"/>
          <path d="M730 520 L730 280 L752 280 L752 520 Z"/><path d="M848 520 L848 280 L870 280 L870 520 Z"/>
          <path d="M710 520 L710 340 L730 340 L730 520 Z"/><path d="M870 520 L870 340 L890 340 L890 520 Z"/>
        </g>
        <rect x="797" y="40" width="6" height="44" {...dark}/>
        <circle cx="800" cy="36" r="3" fill="rgba(255,255,255,0.7)"/>
        <g fill="rgba(255,255,255,0.22)">
          {Array.from({length: 22}).map((_, i) => <rect key={i} x="788" y={120 + i * 17} width="24" height="2"/>)}
        </g>
        <rect x="0" y="514" width="1600" height="6" {...dark}/>
      </g>
    ),
    london: (
      <g>
        <g {...back}>
          <rect x="60" y="370" width="50" height="150"/><rect x="120" y="350" width="60" height="170"/>
          <rect x="190" y="380" width="44" height="140"/>
          <rect x="1440" y="380" width="50" height="140"/><rect x="1500" y="350" width="60" height="170"/>
        </g>
        <g {...mid}>
          <circle cx="240" cy="290" r="130" fill="none" stroke="rgba(0,0,0,0.42)" strokeWidth="6"/>
          {Array.from({length: 16}).map((_, i) => {
            const a = (i * Math.PI * 2) / 16;
            return <line key={i} x1={240} y1={290} x2={240 + Math.cos(a) * 130} y2={290 + Math.sin(a) * 130} stroke="rgba(0,0,0,0.25)" strokeWidth="2"/>;
          })}
          <path d="M210 290 L240 520 L270 290 Z"/>
          <rect x="500" y="370" width="500" height="150"/>
          {Array.from({length: 9}).map((_, i) => {
            const x = 520 + i * 56;
            return <g key={i}><rect x={x} y={340} width={28} height={32}/><path d={`M${x} 340 L${x+14} 320 L${x+28} 340 Z`}/></g>;
          })}
        </g>
        <g {...fore}>
          <rect x="1050" y="160" width="58" height="360"/>
          <rect x="1042" y="200" width="74" height="60"/>
          <circle cx="1079" cy="230" r="22" fill="rgba(255,255,255,0.92)"/>
          <line x1="1079" y1="230" x2="1079" y2="214" stroke="rgba(0,0,0,0.85)" strokeWidth="2.5"/>
          <line x1="1079" y1="230" x2="1090" y2="230" stroke="rgba(0,0,0,0.85)" strokeWidth="2.5"/>
          <rect x="1042" y="260" width="74" height="14"/>
          <path d="M1050 160 L1079 100 L1108 160 Z"/>
          <rect x="1076" y="80" width="6" height="22"/>
          <circle cx="1079" cy="76" r="4" fill="rgba(255,255,255,0.7)"/>
        </g>
        <g {...mid}>
          <rect x="1230" y="280" width="44" height="240"/><rect x="1340" y="280" width="44" height="240"/>
          <rect x="1224" y="270" width="56" height="14"/><rect x="1334" y="270" width="56" height="14"/>
          <path d="M1224 270 L1252 240 L1280 270 Z"/><path d="M1334 270 L1362 240 L1390 270 Z"/>
          <rect x="1274" y="290" width="66" height="6"/><rect x="1274" y="380" width="66" height="6"/>
        </g>
        <rect x="0" y="514" width="1600" height="6" {...dark}/>
      </g>
    ),
    accra: (
      <g>
        <rect x="0" y="490" width="1600" height="20" fill="rgba(0,0,0,0.22)"/>
        <g {...back}>
          <g transform="translate(1340,488)">
            <path d="M0 0 L16 -28 L16 0 Z"/>
            <path d="M-10 2 L36 2 L28 10 L0 10 Z"/>
            <rect x="14.5" y="-30" width="2" height="30"/>
          </g>
          <rect x="80" y="400" width="60" height="120"/><rect x="150" y="380" width="50" height="140"/>
          <rect x="210" y="410" width="40" height="110"/>
          <rect x="1440" y="400" width="50" height="120"/><rect x="1500" y="380" width="60" height="140"/>
        </g>
        <g {...fore}>
          <path d="M540 520 L540 360 Q800 200 1060 360 L1060 520 L1000 520 L1000 380 Q800 270 600 380 L600 520 Z"/>
          <rect x="500" y="500" width="600" height="20"/><rect x="470" y="510" width="660" height="10"/>
          <g transform="translate(800,210)" fill="rgba(0,0,0,0.95)">
            <path d="M0 -30 L8 -10 L30 -10 L13 4 L20 26 L0 14 L-20 26 L-13 4 L-30 -10 L-8 -10 Z"/>
          </g>
          <rect x="797" y="230" width="6" height="130"/>
        </g>
        <g {...dark}>
          <rect x="220" y="300" width="6" height="220"/>
          <path d="M223 300 Q170 270 130 290 Q175 286 218 305 Z"/>
          <path d="M223 300 Q276 270 316 290 Q271 286 228 305 Z"/>
          <path d="M223 300 Q200 250 160 230 Q210 254 224 305 Z"/>
          <path d="M223 300 Q246 250 286 230 Q236 254 222 305 Z"/>
          <path d="M223 300 Q205 240 185 200 Q220 244 226 305 Z"/>
          <rect x="1340" y="320" width="6" height="200"/>
          <path d="M1343 320 Q1290 290 1250 310 Q1295 306 1338 325 Z"/>
          <path d="M1343 320 Q1396 290 1436 310 Q1391 306 1348 325 Z"/>
          <path d="M1343 320 Q1320 270 1280 250 Q1330 274 1344 325 Z"/>
          <path d="M1343 320 Q1366 270 1406 250 Q1356 274 1342 325 Z"/>
        </g>
        <rect x="0" y="514" width="1600" height="6" {...dark}/>
      </g>
    ),
  };

  return (
    <svg viewBox="0 0 1600 520" preserveAspectRatio="xMidYEnd meet" className={className} aria-hidden="true">
      {scenes[id]}
    </svg>
  );
}

// ── Journey start CTA (replaces booking panel) ───────────────────────────────

const SPRING = { type: 'spring' as const, stiffness: 400, damping: 32 };

const SERVICES = [
  {
    id: 'flight' as const,
    labelKey: 'hero.flight_label',
    noteKey: 'hero.flight_note',
    icon: <PlaneTakeoff size={18} strokeWidth={1.8} />,
  },
  {
    id: 'road' as const,
    labelKey: 'hero.road_label',
    noteKey: 'hero.road_note',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M5 17V11l2-5h10l2 5v6M5 17h14M5 17v2M19 17v2"/>
        <circle cx="8" cy="17" r="1.5"/><circle cx="16" cy="17" r="1.5"/>
      </svg>
    ),
  },
  {
    id: 'expedition' as const,
    labelKey: 'hero.expedition_label',
    noteKey: 'hero.expedition_note',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="9"/>
        <path d="M12 2a14.5 14.5 0 0 0 0 20M12 2a14.5 14.5 0 0 1 0 20M2 12h20"/>
      </svg>
    ),
  },
];

function JourneyStartCTA() {
  const { t } = useTranslation();
  const [active, setActive] = useState<'flight' | 'road' | 'expedition'>('flight');

  return (
    <div className="relative z-20 -mt-[210px] sm:-mt-[200px] pb-24 px-4 sm:px-8">
      <div className="mx-auto max-w-[1180px]">

        <motion.div
          className="bg-white rounded-[24px] shadow-[0_30px_80px_-20px_rgba(13,27,56,.45)] p-5 sm:p-7 border border-black/[0.04]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        >
          <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-black/[0.06]">
            <div>
              <p className="text-[10.5px] tracking-[0.28em] uppercase text-[#6b7a8d] mb-0.5" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                {t('hero.cta_label')}
              </p>
              <p className="text-[17px] font-bold text-[#0d1b38]" style={{ fontFamily: 'Clash Display, sans-serif' }}>
                {t('hero.cta_how')}
              </p>
            </div>
            <span className="text-[11px] tracking-[0.2em] uppercase text-[#6b7a8d] crosshair hidden sm:inline" style={{ fontFamily: 'Satoshi, sans-serif' }}>
              {t('hero.cta_confirmation')}
            </span>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-3">
            {SERVICES.map((s) => (
              <motion.button
                key={s.id}
                type="button"
                onClick={() => setActive(s.id)}
                className="relative flex flex-col items-center gap-2 p-4 sm:p-5 rounded-2xl border cursor-pointer overflow-hidden"
                style={{ borderColor: active === s.id ? 'transparent' : 'rgba(0,0,0,0.06)' }}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.97 }}
                transition={SPRING}
              >
                {active === s.id && (
                  <motion.div
                    layoutId="journey-service-pill"
                    className="absolute inset-0 rounded-2xl bg-[#0d1b38]"
                    transition={SPRING}
                  />
                )}
                <span className={`relative z-10 ${active === s.id ? 'text-white' : 'text-[#1a2f5a]'}`}>
                  {s.icon}
                </span>
                <span
                  className={`relative z-10 text-[13px] font-semibold ${active === s.id ? 'text-white' : 'text-[#1a2f5a]'}`}
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                >
                  {t(s.labelKey)}
                </span>
                <span
                  className={`relative z-10 text-[11px] hidden sm:block ${active === s.id ? 'text-white/55' : 'text-[#6b7a8d]'}`}
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                >
                  {t(s.noteKey)}
                </span>
              </motion.button>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-4 justify-between">
            <div className="flex items-center gap-2 text-[12px] text-[#6b7a8d]" style={{ fontFamily: 'Satoshi, sans-serif' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"/>
              {t('hero.cta_no_booking')}
            </div>
            <Link to="/enquiries">
              <motion.span
                className="inline-flex items-center gap-3 pl-5 pr-1 py-1 rounded-full bg-[#0d1b38] text-white shadow-[0_12px_30px_-6px_rgba(13,27,56,.45)] cursor-pointer"
                variants={{ rest: { y: 0 }, hover: { y: -1 } }}
                initial="rest"
                whileHover="hover"
                whileTap={{ scale: 0.97 }}
                transition={SPRING}
              >
                <span className="text-[13.5px] font-medium" style={{ fontFamily: 'Satoshi, sans-serif' }}>{t('hero.cta_send')}</span>
                <motion.span
                  className="w-9 h-9 rounded-full bg-white text-[#0d1b38] flex items-center justify-center"
                  variants={{ rest: { x: 0 }, hover: { x: 3 } }}
                  transition={SPRING}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M13 6l6 6-6 6"/>
                  </svg>
                </motion.span>
              </motion.span>
            </Link>
          </div>
        </motion.div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-[12px] text-[#6b7a8d]" style={{ fontFamily: 'Satoshi, sans-serif' }}>
          <div className="flex items-center gap-5">
            <span className="inline-flex items-center gap-1.5">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z"/></svg>
              {t('hero.cta_iata')}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
              {t('hero.cta_support')}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 2v20M5 9l7-7 7 7M5 15l7 7 7-7"/></svg>
              {t('hero.cta_price')}
            </span>
          </div>
          <a className="underline underline-offset-4 hover:text-[#1a2f5a] cursor-pointer" href="/enquiries">
            {t('hero.cta_whatsapp')}
          </a>
        </div>
      </div>
    </div>
  );
}


// ── Hero ──────────────────────────────────────────────────────────────────────

export function Hero() {
  const { t } = useTranslation();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const fillRefs = useRef<(HTMLDivElement | null)[]>([]);
  const elapsedRef = useRef(0); // ms elapsed–persists across pause/resume

  const jumpTo = (i: number) => {
    elapsedRef.current = 0;
    setIndex(i);
  };

  useEffect(() => {
    // Sync all bars: past = 100%, future = 0%, current = where we left off
    fillRefs.current.forEach((el, i) => {
      if (!el) return;
      if (i < index) el.style.width = '100%';
      else if (i > index) el.style.width = '0%';
      else el.style.width = `${(elapsedRef.current / CYCLE_MS) * 100}%`;
    });

    if (paused) return;

    // Resume from where we paused
    const start = performance.now() - elapsedRef.current;
    let raf: number;
    const tick = (now: number) => {
      const elapsed = now - start;
      const p = Math.min(1, elapsed / CYCLE_MS);
      elapsedRef.current = elapsed;
      const el = fillRefs.current[index];
      if (el) el.style.width = `${p * 100}%`;
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        elapsedRef.current = 0;
        setIndex(i => (i + 1) % DESTINATIONS.length);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [index, paused]);

  const active = DESTINATIONS[index]!;

  return (
    <>
      <section className="relative w-full min-h-[100svh] overflow-hidden bg-white">
        {/* Background layers */}
        <div className="absolute inset-0">
          {DESTINATIONS.map((d, i) => (
            <div key={d.name} className={'bg-layer ' + (i === index ? 'is-active' : '')} aria-hidden={i !== index}>
              {/* White base */}
              <div className="absolute inset-0 bg-white"/>
              {d.photo && (
                <>
                  <img
                    src={d.photo.src}
                    alt=""
                    className={'absolute inset-0 w-full h-full object-cover pointer-events-none ' + (i === index ? 'kenburns-layer' : '')}
                    style={{ objectPosition: d.photo.objectPos ?? 'center' }}
                    loading={i === 0 ? 'eager' : 'lazy'}
                  />
                  {/* Dark overlay for text legibility */}
                  <div className="absolute inset-0 bg-black/65 pointer-events-none"/>
                </>
              )}
              {!d.photo && (
                <div className="absolute inset-x-0 bottom-0 h-[72%] flex items-end justify-center pointer-events-none">
                  <div
                    className={'w-full max-w-[1700px] ' + (i === index ? 'kenburns-layer' : '')}
                    style={{ filter: 'drop-shadow(0 16px 32px rgba(0,0,0,0.4))' }}
                  >
                    <Silhouette id={d.silhouette} className="w-full h-auto"/>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Top glass vignette */}
          <div
            className="absolute inset-x-0 top-0 h-36 pointer-events-none"
            style={{
              backdropFilter: 'blur(12px) saturate(150%)',
              WebkitBackdropFilter: 'blur(12px) saturate(150%)',
              background: 'linear-gradient(180deg, rgba(13,27,56,.40) 0%, rgba(13,27,56,.10) 55%, transparent 100%)',
              maskImage: 'linear-gradient(180deg, black 0%, black 45%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(180deg, black 0%, black 45%, transparent 100%)',
            }}
          />
          {/* Bottom glass vignette */}
          <div
            className="absolute inset-x-0 bottom-0 h-48 pointer-events-none"
            style={{
              backdropFilter: 'blur(14px) saturate(150%)',
              WebkitBackdropFilter: 'blur(14px) saturate(150%)',
              background: 'linear-gradient(0deg, rgba(13,27,56,.55) 0%, rgba(13,27,56,.15) 55%, transparent 100%)',
              maskImage: 'linear-gradient(0deg, black 0%, black 40%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(0deg, black 0%, black 40%, transparent 100%)',
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-[1280px] px-6 sm:px-8 pt-32 pb-[280px] sm:pb-[260px]">

          {/* Eyebrow */}
          <div className="reveal-mask">
            <div className="reveal-line reveal-1 flex items-center gap-3 text-[11.5px] tracking-[0.32em] uppercase text-white/70">
              <span className="w-1.5 h-1.5 rounded-full bg-[#a8cce8] pulse-dot"/>
              <span>{t('hero.eyebrow')}</span>
              <span className="hidden sm:inline crosshair text-white/40 normal-case tracking-[0.05em] ml-2">
                {active.coords}
              </span>
            </div>
          </div>

          {/* Headline */}
          <h1 className="mt-7 sm:mt-9 font-display text-white leading-[0.92] tracking-tight">
            <div className="reveal-mask block">
              <span className="reveal-line reveal-2 text-[44px] sm:text-[68px] md:text-[84px] font-light text-white/95">
                Where will you go
              </span>
            </div>
            <div className="block mt-1 sm:mt-2 leading-[0.9]">
              <span className="reveal-mask">
                <span className="reveal-line reveal-3 text-[64px] sm:text-[110px] md:text-[148px] font-semibold dest-glow">
                  <span key={active.name + index} className="word-swap inline-block" style={{ color: active.accent }}>
                    {active.name}
                  </span>
                </span>
              </span>
              <span className="reveal-mask">
                <span className="reveal-line reveal-3 text-[64px] sm:text-[110px] md:text-[148px] font-semibold text-white/95">.</span>
              </span>
            </div>
          </h1>

          {/* Blurb */}
          <div className="mt-7 sm:mt-8 max-w-[560px]">
            <p className="text-[15.5px] sm:text-[17px] leading-relaxed text-white/75 font-light"
               style={{ opacity: 0, animation: 'fadeInBlurb 800ms cubic-bezier(.22,1,.36,1) forwards', animationDelay: '0.75s' }}>
              <span key={active.name + 'blurb' + index} className="swap-fade inline-block">{active.blurb}</span>
            </p>
          </div>

          {/* CTAs */}
          <div className="mt-7" style={{ opacity: 0, animation: 'fadeInBlurb 800ms cubic-bezier(.22,1,.36,1) forwards', animationDelay: '0.95s' }}>
            <div className="flex flex-wrap items-center gap-4">
              <a href="destinations" className="group inline-flex items-center gap-3 text-[14px] text-white font-medium whitespace-nowrap">
                {t('hero.explore')}
                <span className="w-9 h-9 rounded-full border border-white/35 flex items-center justify-center group-hover:bg-white group-hover:text-[#0d1b38] transition">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                </span>
              </a>
              <button type="button" onClick={() => setPaused(p => !p)}
                className="inline-flex items-center gap-2 text-[12px] text-white/70 hover:text-white transition px-3 py-2 rounded-full liquid-pill whitespace-nowrap cursor-pointer">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="9"/><path d="M10 8.5l6 3.5-6 3.5z" fill="currentColor"/></svg>
                {paused ? t('hero.resume') : t('hero.pause')}
              </button>
            </div>
          </div>

          {/* Right meta column */}
          <div className="absolute right-6 sm:right-8 top-32 hidden md:flex flex-col items-end gap-3 text-right">
            <div key={'pill' + index} className="liquid-pill rounded-full pl-2 pr-4 py-1.5 inline-flex items-center gap-2 swap-fade">
              <span className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 0 1 9.5 9 2.5 2.5 0 0 1 12 6.5 2.5 2.5 0 0 1 14.5 9 2.5 2.5 0 0 1 12 11.5z"/>
                </svg>
              </span>
              <div className="leading-tight whitespace-nowrap">
                <div className="text-[12px] font-medium text-white whitespace-nowrap">{active.name}, {active.country}</div>
                <div className="text-[9.5px] tracking-[0.2em] uppercase text-white/55 whitespace-nowrap">{active.code} · {active.region}</div>
              </div>
            </div>
            <div key={'season' + index} className="swap-fade text-[10.5px] tracking-[0.2em] uppercase text-white/55 crosshair whitespace-nowrap">
              {active.season}
            </div>
          </div>

          {/* Progress bar */}
          <div className="absolute left-6 right-6 sm:left-8 sm:right-8 bottom-[230px] sm:bottom-[210px] flex items-center gap-4 text-white/65 text-[11px] tracking-[0.2em] uppercase">
            <span className="crosshair text-white/45">{String(index + 1).padStart(2, '0')} / {String(DESTINATIONS.length).padStart(2, '0')}</span>
            <div className="flex-1 flex items-center gap-1">
              {DESTINATIONS.map((d, i) => (
                <button key={d.name} type="button" onClick={() => jumpTo(i)}
                  className="flex-1 progress-bar rounded-full overflow-hidden cursor-pointer"
                  aria-label={`Go to ${d.name}`}>
                  <div
                    ref={el => { fillRefs.current[i] = el; }}
                    className="progress-fill"
                    style={{ width: i < index ? '100%' : '0%' }}
                  />
                </button>
              ))}
            </div>
            <span className="crosshair text-white/45 hidden sm:inline">{active.code}</span>
          </div>
        </div>

        {/* Side rail */}
        <div className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-10 hidden xl:block">
          <div className="liquid-glass rounded-2xl p-2 w-[60px]">
            {DESTINATIONS.map((d, i) => (
              <button key={d.name} type="button" onClick={() => jumpTo(i)} title={d.name}
                className={'w-full aspect-square my-0.5 rounded-xl flex items-center justify-center text-[10px] font-medium transition cursor-pointer ' +
                  (i === index ? 'text-white' : 'text-white/60 hover:text-white')}
                style={i === index ? { background: 'rgba(255,255,255,.12)' } : {}}>
                {d.code}
              </button>
            ))}
          </div>
        </div>

      </section>

      <JourneyStartCTA />
    </>
  );
}
