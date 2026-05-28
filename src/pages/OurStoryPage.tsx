import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Zap, Heart, Plane, MapPin, BookOpen } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { CTABanner } from '@/components/CTABanner';
import { SEOHead } from '@/components/SEOHead';

const SPRING = { type: 'spring' as const, stiffness: 400, damping: 30 };

const fadeUp = {
  initial:     { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: false, margin: '200px 0px -60px 0px' },
  transition:  { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
};

// ── Shared eyebrow ─────────────────────────────────────────────────────────────
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
      >{label}</span>
    </div>
  );
}

// ── Concave wave divider ───────────────────────────────────────────────────────
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

// ── Value card (numbered bento) ────────────────────────────────────────────────
function ValueCard({
  Icon, nameKey, bodyKey, accent, num, delay = 0, wide = false,
}: {
  Icon: React.ComponentType<{ className?: string }>;
  nameKey: string; bodyKey: string;
  accent: string; num: string; delay?: number; wide?: boolean;
}) {
  const { t } = useTranslation();
  return (
    <motion.div
      className={`rounded-[28px] relative overflow-hidden ${wide ? 'lg:col-span-12' : 'lg:col-span-6'}`}
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: `1px solid ${accent}30`,
        minHeight: wide ? 180 : 300,
      }}
      {...fadeUp}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
      whileHover={{ borderColor: `${accent}55`, background: 'rgba(255,255,255,0.06)' }}
    >
      {/* Accent top bar */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: `linear-gradient(90deg, ${accent}80, transparent)` }}
      />
      {/* Ghost number */}
      <span
        className="absolute select-none pointer-events-none font-black leading-none text-white/[0.04]"
        style={{
          fontFamily: 'Clash Display, sans-serif',
          fontSize: wide ? '14rem' : '10rem',
          top: wide ? '50%' : '-0.1em',
          right: '1rem',
          transform: wide ? 'translateY(-50%)' : undefined,
        }}
      >{num}</span>
      {/* Glow */}
      <div
        className="absolute -bottom-6 -left-6 w-40 h-40 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${accent}18 0%, transparent 70%)` }}
      />

      {wide ? (
        /* horizontal layout */
        <div className="relative p-8 lg:p-10 flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-12">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
            style={{ background: `${accent}18`, border: `1px solid ${accent}30` }}
          >
            <span style={{ color: accent }}><Icon className="w-6 h-6" /></span>
          </div>
          <div className="flex-1 min-w-0">
            <h3
              className="text-2xl lg:text-3xl font-black text-white leading-tight mb-2"
              style={{ fontFamily: 'Clash Display, sans-serif' }}
            >{t(`our_story_page.${nameKey}`)}</h3>
            <p
              className="text-white/40 text-sm leading-relaxed max-w-2xl"
              style={{ fontFamily: 'Satoshi, sans-serif' }}
            >{t(`our_story_page.${bodyKey}`)}</p>
          </div>
        </div>
      ) : (
        /* vertical layout */
        <div className="relative p-8 lg:p-10 h-full flex flex-col">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mb-7"
            style={{ background: `${accent}18`, border: `1px solid ${accent}30` }}
          >
            <span style={{ color: accent }}><Icon className="w-6 h-6" /></span>
          </div>
          <h3
            className="text-2xl font-black text-white leading-tight mb-3"
            style={{ fontFamily: 'Clash Display, sans-serif' }}
          >{t(`our_story_page.${nameKey}`)}</h3>
          <p
            className="text-white/40 text-sm leading-relaxed"
            style={{ fontFamily: 'Satoshi, sans-serif' }}
          >{t(`our_story_page.${bodyKey}`)}</p>
        </div>
      )}
    </motion.div>
  );
}

// ── What We Do row ─────────────────────────────────────────────────────────────
function ServiceRow({
  Icon, label, bodyKey, accent, num, reverse = false, delay = 0,
}: {
  Icon: React.ComponentType<{ className?: string }>;
  label: string; bodyKey: string; accent: string;
  num: string; reverse?: boolean; delay?: number;
}) {
  const { t } = useTranslation();
  const card = (
    <motion.div
      className="rounded-[28px] overflow-hidden relative"
      style={{ background: `${accent}0d`, border: `1px solid ${accent}28`, minHeight: 220 }}
      {...fadeUp}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
      whileHover={{ background: `${accent}16` }}
    >
      <span
        className="absolute -top-2 right-4 text-[8rem] font-black leading-none select-none pointer-events-none"
        style={{ fontFamily: 'Clash Display, sans-serif', color: `${accent}10` }}
      >{num}</span>
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: `linear-gradient(90deg, ${accent}70, transparent)` }}
      />
      <div className="relative p-8 lg:p-10 h-full flex flex-col justify-between">
        <div>
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
            style={{ background: `${accent}15`, border: `1px solid ${accent}25` }}
          >
            <span style={{ color: accent }}><Icon className="w-6 h-6" /></span>
          </div>
          <span
            className="text-[11px] font-black uppercase tracking-[0.22em] mb-1 block"
            style={{ color: accent, fontFamily: 'Satoshi, sans-serif' }}
          >{label}</span>
        </div>
        <Link
          to="/services"
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold transition-all duration-200"
          style={{ color: accent, fontFamily: 'Satoshi, sans-serif' }}
        >
          Learn more <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </motion.div>
  );

  const text = (
    <motion.div
      className="flex items-center"
      {...fadeUp}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: delay + 0.1 }}
    >
      <p
        className="text-[#0d1b38]/55 text-[15px] leading-[1.85]"
        style={{ fontFamily: 'Satoshi, sans-serif' }}
      >{t(`our_story_page.${bodyKey}`)}</p>
    </motion.div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
      {reverse ? <>{text}{card}</> : <>{card}{text}</>}
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────
export default function OurStoryPage() {
  const { t } = useTranslation();

  return (
    <div>
      <SEOHead
        title="Our Story — Next Route Travels"
        description="Learn about the people and purpose behind Next Route Travels — a Lagos-based agency built to make world-class travel accessible across Africa and beyond."
        canonicalPath="/our-story"
      />

      {/* ════════════════════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[90vh] flex flex-col justify-center bg-[#0d1b38] overflow-hidden">
        {/* Atmospheric glows */}
        <div
          className="absolute top-1/4 -right-40 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(74,144,217,0.12) 0%, transparent 65%)' }}
        />
        <div
          className="absolute -bottom-20 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(36,58,110,0.6) 0%, transparent 70%)' }}
        />

        {/* Subtle grid */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
            backgroundSize: '72px 72px',
          }}
        />

        {/* Floating decorative dots */}
        {[
          { top: '18%', left: '8%', size: 3, delay: 0 },
          { top: '55%', left: '5%', size: 2, delay: 0.4 },
          { top: '30%', right: '10%', size: 4, delay: 0.8 },
          { top: '70%', right: '8%', size: 2, delay: 1.2 },
        ].map((dot, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#4a90d9] pointer-events-none"
            style={{ width: dot.size, height: dot.size, top: dot.top, left: dot.left, right: (dot as { right?: string }).right }}
            animate={{ y: [0, -8, 0], opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 3.5 + i, repeat: Infinity, ease: 'easeInOut', delay: dot.delay }}
          />
        ))}

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 pt-36 pb-32 w-full">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl"
          >
            <Eyebrow label={t('our_story_page.eyebrow')} dark />

            <h1
              className="text-5xl md:text-6xl lg:text-[5.5rem] font-black tracking-tight leading-[0.92] text-white mb-6"
              style={{ fontFamily: 'Clash Display, sans-serif' }}
            >
              {t('our_story_page.heading')}
              <br />
              <em
                className="not-italic"
                style={{
                  background: 'linear-gradient(135deg, #4a90d9 0%, #a8cce8 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >{t('our_story_page.heading_accent')}</em>
            </h1>

            <p
              className="text-[17px] text-white/45 max-w-2xl leading-[1.75]"
              style={{ fontFamily: 'Satoshi, sans-serif' }}
            >
              {t('our_story_page.sub')}
            </p>
          </motion.div>
        </div>

        {/* Glassmorphism stats strip */}
        <motion.div
          className="relative z-10 mx-4 sm:mx-8 mb-10 max-w-7xl lg:mx-auto"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
        >
          <div
            className="rounded-2xl grid grid-cols-2 sm:grid-cols-4 divide-x"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              backdropFilter: 'blur(24px)',
            }}
          >
            {[
              { val: '12+', label: 'Years Serving' },
              { val: '50+', label: 'Countries Reached' },
              { val: '4.9★', label: 'Client Rating' },
              { val: '1K+', label: 'Trips Planned' },
            ].map(({ val, label }, i) => (
              <div
                key={label}
                className="py-5 px-6 text-center"
                style={{ borderRight: i < 3 ? '1px solid rgba(255,255,255,0.08)' : undefined }}
              >
                <p
                  className="text-2xl font-black text-white leading-none mb-1"
                  style={{ fontFamily: 'Clash Display, sans-serif' }}
                >{val}</p>
                <p
                  className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                >{label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      <WaveBridge from="#0d1b38" to="#f5f8fc" />

      {/* ════════════════════════════════════════════════════════════════
          THE MISSION
      ════════════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 px-4 sm:px-8 bg-[#f5f8fc]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* Left: mission text */}
          <motion.div
            className="lg:col-span-7"
            {...fadeUp}
          >
            <Eyebrow label={t('our_story_page.mission_eyebrow')} />
            <h2
              className="text-4xl sm:text-[3rem] lg:text-[3.4rem] font-black tracking-tight leading-[0.95] text-[#0d1b38] mb-8"
              style={{ fontFamily: 'Clash Display, sans-serif' }}
            >
              {t('our_story_page.mission_heading')}
            </h2>
            <div className="space-y-5">
              {(['mission_body1', 'mission_body2', 'mission_body3'] as const).map((key) => (
                <p
                  key={key}
                  className="text-[#0d1b38]/55 text-[15px] leading-[1.85]"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                >{t(`our_story_page.${key}`)}</p>
              ))}
            </div>

            {/* City chain visual */}
            <div className="mt-10 flex items-center gap-0">
              {['Lagos', 'London', 'Dubai', 'New York'].map((city, i, arr) => (
                <div key={city} className="flex items-center">
                  <div className="flex flex-col items-center gap-1.5">
                    <div
                      className="w-2.5 h-2.5 rounded-full bg-[#4a90d9]"
                      style={{ boxShadow: '0 0 8px rgba(74,144,217,0.5)' }}
                    />
                    <p
                      className="text-[10px] font-black uppercase tracking-widest text-[#0d1b38]/40"
                      style={{ fontFamily: 'Satoshi, sans-serif' }}
                    >{city}</p>
                  </div>
                  {i < arr.length - 1 && (
                    <div className="w-10 sm:w-16 h-px bg-[#4a90d9]/25 mb-4" />
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: quote card */}
          <motion.div
            className="lg:col-span-5"
            {...fadeUp}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          >
            <div className="rounded-[28px] overflow-hidden" style={{ background: '#0d1b38' }}>
              {/* Quote */}
              <div className="p-8 lg:p-10 relative">
                <div
                  className="absolute -top-4 -left-2 pointer-events-none select-none"
                  style={{ background: 'radial-gradient(circle, rgba(74,144,217,0.12) 0%, transparent 70%)', width: 160, height: 160, borderRadius: '50%' }}
                />
                <div
                  className="text-[100px] leading-[0.75] text-[#4a90d9]/20 font-black select-none -mb-3"
                  style={{ fontFamily: 'Clash Display, sans-serif' }}
                >"</div>
                <blockquote
                  className="text-xl lg:text-2xl font-black leading-snug text-white mb-5"
                  style={{ fontFamily: 'Clash Display, sans-serif' }}
                >{t('our_story_page.mission_quote')}</blockquote>
                <p
                  className="text-white/35 text-[13px] leading-relaxed"
                  style={{ fontFamily: 'Satoshi, sans-serif' }}
                >{t('our_story_page.mission_quote_sub')}</p>
              </div>

              {/* Attribution strip */}
              <div
                className="px-8 lg:px-10 py-5 flex items-center gap-3"
                style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(74,144,217,0.15)', border: '1px solid rgba(74,144,217,0.25)' }}
                >
                  <span className="text-[#4a90d9] text-xs font-black" style={{ fontFamily: 'Satoshi, sans-serif' }}>NR</span>
                </div>
                <div>
                  <p className="text-white text-[13px] font-bold" style={{ fontFamily: 'Satoshi, sans-serif' }}>Next Route Travels</p>
                  <p className="text-white/30 text-[11px]" style={{ fontFamily: 'Satoshi, sans-serif' }}>Lagos, Nigeria</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <WaveBridge from="#f5f8fc" to="#0d1b38" />

      {/* ════════════════════════════════════════════════════════════════
          VALUES — numbered bento
      ════════════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 px-4 sm:px-8 bg-[#0d1b38]">
        <div className="max-w-7xl mx-auto">

          <motion.div className="text-center mb-14" {...fadeUp}>
            <Eyebrow label="Our Values" dark />
            <h2
              className="text-4xl sm:text-[3.5rem] font-black tracking-tight leading-[0.95] text-white"
              style={{ fontFamily: 'Clash Display, sans-serif' }}
            >
              {t('our_story_page.values_heading')}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <ValueCard
              Icon={Zap}
              nameKey="value_reliability_name"
              bodyKey="value_reliability_body"
              accent="#60a5fa"
              num="01"
              delay={0}
            />
            <ValueCard
              Icon={Shield}
              nameKey="value_safety_name"
              bodyKey="value_safety_body"
              accent="#34d399"
              num="02"
              delay={0.1}
            />
            <ValueCard
              Icon={Heart}
              nameKey="value_passion_name"
              bodyKey="value_passion_body"
              accent="#f43f5e"
              num="03"
              delay={0.2}
              wide
            />
          </div>
        </div>
      </section>

      <WaveBridge from="#0d1b38" to="#f5f8fc" />

      {/* ════════════════════════════════════════════════════════════════
          WHAT WE DO — alternating editorial rows
      ════════════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 px-4 sm:px-8 bg-[#f5f8fc]">
        <div className="max-w-7xl mx-auto">

          <motion.div className="mb-16" {...fadeUp}>
            <Eyebrow label={t('our_story_page.what_we_do_eyebrow')} />
            <h2
              className="text-4xl sm:text-[3.5rem] font-black tracking-tight leading-[0.95] text-[#0d1b38]"
              style={{ fontFamily: 'Clash Display, sans-serif' }}
            >
              {t('our_story_page.what_we_do_heading')}
            </h2>
          </motion.div>

          <div className="space-y-6">
            <ServiceRow
              Icon={Plane}
              label="Global Air Connections"
              bodyKey="what_we_do_body1"
              accent="#60a5fa"
              num="01"
              delay={0}
            />
            <ServiceRow
              Icon={MapPin}
              label="Cross-Border Road Travel"
              bodyKey="what_we_do_body2"
              accent="#34d399"
              num="02"
              reverse
              delay={0.08}
            />
            <ServiceRow
              Icon={BookOpen}
              label="Destination Intelligence"
              bodyKey="what_we_do_body3"
              accent="#fbbf24"
              num="03"
              delay={0.16}
            />
          </div>
        </div>
      </section>

      <WaveBridge from="#f5f8fc" to="#0d1b38" />

      {/* ════════════════════════════════════════════════════════════════
          BRAND CLOSE — atmospheric dark statement
      ════════════════════════════════════════════════════════════════ */}
      <section className="relative py-28 sm:py-36 px-4 sm:px-8 bg-[#0d1b38] overflow-hidden">
        {/* Atmospheric glow */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          aria-hidden
        >
          <div
            className="w-[700px] h-[700px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(74,144,217,0.08) 0%, transparent 65%)' }}
          />
        </div>

        {/* Subtle grid */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '72px 72px',
          }}
        />

        <motion.div
          className="relative z-10 max-w-4xl mx-auto text-center"
          {...fadeUp}
        >
          {/* Giant decorative quote */}
          <div
            className="text-[clamp(80px,15vw,160px)] leading-[0.7] text-[#4a90d9]/15 font-black select-none mb-2"
            style={{ fontFamily: 'Clash Display, sans-serif' }}
          >"</div>

          <p
            className="text-3xl sm:text-4xl lg:text-[2.8rem] font-black text-white leading-[1.1] tracking-tight mb-10"
            style={{ fontFamily: 'Clash Display, sans-serif' }}
          >
            {t('our_story_page.brand_quote')}
          </p>

          {/* Divider */}
          <div className="flex items-center justify-center gap-4 mb-10">
            <div className="w-12 h-px bg-white/10" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#4a90d9]/50" />
            <div className="w-12 h-px bg-white/10" />
          </div>

          <Link to="/enquiries">
            <motion.div
              className="inline-flex items-center gap-2.5 pl-6 pr-2 py-2 rounded-full bg-white"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={SPRING}
            >
              <span
                className="text-[14px] font-bold text-[#0d1b38]"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >{t('our_story_page.brand_cta')}</span>
              <span className="w-10 h-10 rounded-full bg-[#0d1b38] flex items-center justify-center">
                <ArrowRight className="w-4 h-4 text-white" />
              </span>
            </motion.div>
          </Link>
        </motion.div>
      </section>

      <CTABanner />
    </div>
  );
}
