import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Zap, Heart, Compass } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { CTABanner } from '@/components/CTABanner';
import { SEOHead } from '@/components/SEOHead';

const fadeUp = {
  initial:    { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport:   { once: false, margin: '-60px' },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
};

const VALUE_KEYS = [
  { Icon: Zap,     nameKey: 'value_reliability_name', bodyKey: 'value_reliability_body' },
  { Icon: Shield,  nameKey: 'value_safety_name',      bodyKey: 'value_safety_body' },
  { Icon: Heart,   nameKey: 'value_passion_name',     bodyKey: 'value_passion_body' },
];

export default function OurStoryPage() {
  const { t } = useTranslation();

  return (
    <div>
      <SEOHead
        title="Our Story — Next Route Travels"
        description="Learn about the people and purpose behind Next Route Travels — a Lagos-based agency built to make world-class travel accessible across Africa and beyond."
        canonicalPath="/our-story"
      />
      {/* ── HERO ── */}
      <section className="relative min-h-[75vh] flex items-center bg-[#0d1b38] overflow-hidden">
        <div className="absolute top-1/4 -right-32 w-[500px] h-[500px] rounded-full bg-blue-600/12 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-blue-400/08 blur-[100px] pointer-events-none" />
        <div aria-hidden className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '64px 64px' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-36 pb-20 w-full">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-white/60" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                {t('our_story_page.eyebrow')}
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white mb-6 max-w-4xl" style={{ fontFamily: 'Clash Display, sans-serif' }}>
              {t('our_story_page.heading')}<br />
              <em className="not-italic" style={{ background: 'linear-gradient(135deg, #60a5fa 0%, #38bdf8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                {' '}{t('our_story_page.heading_accent')}
              </em>
            </h1>
            <p className="text-xl text-white/45 max-w-2xl leading-relaxed" style={{ fontFamily: 'Satoshi, sans-serif' }}>
              {t('our_story_page.sub')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── THE MISSION ── */}
      <section className="py-28 px-6 bg-[#f5f8fc]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeUp}>
            <div className="rounded-2xl p-10 border border-blue-100" style={{ background: 'linear-gradient(135deg, #0d1b38 0%, #1a2f5a 100%)' }}>
              <Compass className="w-8 h-8 text-blue-400 mb-6" />
              <blockquote className="text-2xl md:text-3xl font-black leading-snug text-white" style={{ fontFamily: 'Clash Display, sans-serif' }}>
                "{t('our_story_page.mission_quote')}"
              </blockquote>
              <div className="mt-8 pt-8 border-t border-white/10">
                <p className="text-white/40 text-sm leading-relaxed" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                  {t('our_story_page.mission_quote_sub')}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div {...fadeUp} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.15 }} className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-navy/10 bg-white px-4 py-1.5">
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-navy/60" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                {t('our_story_page.mission_eyebrow')}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-[#1a2f5a]" style={{ fontFamily: 'Clash Display, sans-serif' }}>
              {t('our_story_page.mission_heading')}
            </h2>
            <div className="space-y-4 text-slate-500 leading-relaxed" style={{ fontFamily: 'Satoshi, sans-serif' }}>
              <p>{t('our_story_page.mission_body1')}</p>
              <p>{t('our_story_page.mission_body2')}</p>
              <p>{t('our_story_page.mission_body3')}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="py-28 px-6 bg-[#0d1b38]">
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-16" {...fadeUp}>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white" style={{ fontFamily: 'Clash Display, sans-serif' }}>
              {t('our_story_page.values_heading')}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VALUE_KEYS.map(({ Icon, nameKey, bodyKey }, i) => (
              <motion.div key={nameKey} {...fadeUp} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: i * 0.12 }}
                className="p-8 rounded-2xl border border-white/08 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/15 transition-all duration-500">
                <div className="w-12 h-12 rounded-xl bg-blue-900/50 flex items-center justify-center mb-6">
                  <Icon className="w-5 h-5 text-blue-300" />
                </div>
                <h3 className="text-xl font-black text-white mb-4" style={{ fontFamily: 'Clash Display, sans-serif' }}>
                  {t(`our_story_page.${nameKey}`)}
                </h3>
                <p className="text-white/45 leading-relaxed text-sm" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                  {t(`our_story_page.${bodyKey}`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT WE DO ── */}
      <section className="py-28 px-6 bg-[#f5f8fc]">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeUp} className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-navy/10 bg-white px-4 py-1.5">
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-navy/60" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                {t('our_story_page.what_we_do_eyebrow')}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-[#1a2f5a]" style={{ fontFamily: 'Clash Display, sans-serif' }}>
              {t('our_story_page.what_we_do_heading')}
            </h2>
            <div className="space-y-4 text-slate-500 leading-loose text-lg" style={{ fontFamily: 'Satoshi, sans-serif' }}>
              <p>{t('our_story_page.what_we_do_body1')}</p>
              <p>{t('our_story_page.what_we_do_body2')}</p>
              <p>{t('our_story_page.what_we_do_body3')}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── BRAND CLOSE ── */}
      <section className="py-24 px-6 bg-[#f5f8fc]">
        <motion.div {...fadeUp} className="max-w-3xl mx-auto text-center space-y-8">
          <p className="text-3xl md:text-4xl font-black text-[#1a2f5a] leading-snug" style={{ fontFamily: 'Clash Display, sans-serif' }}>
            "{t('our_story_page.brand_quote')}"
          </p>
          <Link to="/enquiries"
            className="group inline-flex items-center gap-2.5 rounded-full px-8 py-4 text-sm font-bold text-white transition-all duration-300 hover:scale-[1.02]"
            style={{ fontFamily: 'Satoshi, sans-serif', background: 'linear-gradient(135deg, #1a3566 0%, #0d1b38 100%)', boxShadow: '0 8px 32px rgba(13,27,56,0.3)' }}>
            {t('our_story_page.brand_cta')}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </motion.div>
      </section>

      <CTABanner />
    </div>
  );
}
