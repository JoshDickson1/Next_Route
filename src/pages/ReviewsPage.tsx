import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Send, X, MessageSquarePlus, Quote, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// import { CTABanner } from '@/components/CTABanner';
import { SEOHead } from '@/components/SEOHead';

// ── Types ─────────────────────────────────────────────────────────────────────

interface Testimonial {
  name: string;
  title: string;
  destination: string;
  quote: string;
  avatarSrc: string;
  rating: number;
  date: string;
  tagKey: string;
}

// ── Data ──────────────────────────────────────────────────────────────────────

const STATS_KEYS = [
  { value: '4.9', labelKey: 'reviews_page.stat_rating' },
  { value: '340+', labelKey: 'reviews_page.stat_reviews' },
  { value: '98%', labelKey: 'reviews_page.stat_recommend' },
];

const TESTIMONIALS: Testimonial[] = [
  {
    name:        'Adaeze Okonkwo',
    title:       'Lagos · Business Traveller',
    destination: 'London, UK',
    quote:       'Next Route handled every detail of my London trip flawlessly. From the visa documentation to the hotel — I didn\'t have to think about a single thing. Absolutely world-class service.',
    avatarSrc:   'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&auto=format&fit=crop&q=80',
    rating:      5.0,
    date:        'April 2025',
    tagKey:      'tag_flight',
  },
  {
    name:        'Chukwuemeka Bello',
    title:       'Abuja · Family Holiday',
    destination: 'Dubai, UAE',
    quote:       'Took the whole family to Dubai. The kids loved every moment and my wife still talks about the Burj Khalifa dinner they arranged. Could not have done it without the Next Route team.',
    avatarSrc:   'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    rating:      5.0,
    date:        'March 2025',
    tagKey:      'tag_package',
  },
  {
    name:        'Ngozi Eze',
    title:       'Port Harcourt · Honeymoon',
    destination: 'Greek Islands, Greece',
    quote:       'My husband and I did our honeymoon in Santorini. Next Route put together a bespoke itinerary that felt personal — not like something copy-pasted from a brochure. Magical.',
    avatarSrc:   'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=200&auto=format&fit=crop&q=80',
    rating:      5.0,
    date:        'February 2025',
    tagKey:      'tag_romance',
  },
  {
    name:        'Tunde Fashola',
    title:       'Lagos · Solo Explorer',
    destination: 'Serengeti, Tanzania',
    quote:       'I\'ve done three safaris in my life and this was by far the most organised. The lodge selection was phenomenal and the overland routing felt genuinely adventurous — not touristy.',
    avatarSrc:   'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    rating:      4.9,
    date:        'January 2025',
    tagKey:      'tag_safari',
  },
  {
    name:        'Sade Williams',
    title:       'Ibadan · Girls\' Trip',
    destination: 'Rome, Italy',
    quote:       'Seven of us went to Rome and Not a single complaint from anyone. The private tour guide Next Route organised for the Vatican was the highlight. We\'ve already booked our next trip.',
    avatarSrc:   'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
    rating:      4.8,
    date:        'December 2024',
    tagKey:      'tag_group',
  },
  {
    name:        'Emeka Okafor',
    title:       'Enugu · Corporate Retreat',
    destination: 'New York, USA',
    quote:       'We sent 14 executives to New York for a week. The logistics were seamless — airport pickups, hotel blocks, dinner reservations, the lot. Next Route is now our company\'s default travel partner.',
    avatarSrc:   'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80',
    rating:      4.9,
    date:        'November 2024',
    tagKey:      'tag_corporate',
  },
];

const TAG_COLORS: Record<string, { bg: string; text: string }> = {
  tag_flight:    { bg: 'rgba(96,165,250,0.15)',  text: '#60a5fa' },
  tag_package:   { bg: 'rgba(251,191,36,0.15)',  text: '#fbbf24' },
  tag_romance:   { bg: 'rgba(244,114,182,0.15)', text: '#f472b6' },
  tag_safari:    { bg: 'rgba(52,211,153,0.15)',  text: '#34d399' },
  tag_group:     { bg: 'rgba(167,139,250,0.15)', text: '#a78bfa' },
  tag_corporate: { bg: 'rgba(248,113,113,0.15)', text: '#f87171' },
};

// ── Star Rating Input ─────────────────────────────────────────────────────────

function StarRating({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          className="transition-transform duration-100 hover:scale-110 cursor-pointer"
        >
          <Star
            className="w-6 h-6 transition-colors duration-150"
            style={{
              fill:   (hover || value) >= star ? '#fbbf24' : 'transparent',
              color:  (hover || value) >= star ? '#fbbf24' : 'rgba(255,255,255,0.2)',
              strokeWidth: 1.5,
            }}
          />
        </button>
      ))}
    </div>
  );
}

// ── Review Form ───────────────────────────────────────────────────────────────

function ReviewForm({ onClose, isDrawer = false }: { onClose?: () => void; isDrawer?: boolean }) {
  const { t } = useTranslation();
  const [rating, setRating]       = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm]           = useState({ name: '', destination: '', review: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating || !form.name || !form.review) return;
    setSubmitted(true);
  };

  const inputBase: React.CSSProperties = {
    background:    'rgba(255,255,255,0.05)',
    border:        '1px solid rgba(168,204,232,0.15)',
    borderRadius:  10,
    padding:       '12px 14px',
    color:         '#fff',
    fontFamily:    'Satoshi, sans-serif',
    fontSize:      14,
    outline:       'none',
    width:         '100%',
    transition:    'border-color 0.2s',
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center gap-5 py-16 text-center px-6"
      >
        <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: 'rgba(52,211,153,0.15)' }}>
          <CheckCircle2 className="w-8 h-8" style={{ color: '#34d399' }} />
        </div>
        <div>
          <p className="text-xl font-black text-white mb-2" style={{ fontFamily: 'Clash Display, sans-serif' }}>
            {t('reviews_page.form_success_heading', { name: form.name.split(' ')[0] })}
          </p>
          <p className="text-sm text-white/45" style={{ fontFamily: 'Satoshi, sans-serif' }}>
            {t('reviews_page.form_success_body')}
          </p>
        </div>
        {isDrawer && onClose && (
          <button
            type="button" onClick={onClose}
            className="mt-2 px-6 py-2.5 rounded-full text-sm font-semibold text-white cursor-pointer"
            style={{ background: '#1a2f5a', fontFamily: 'Satoshi, sans-serif' }}
          >
            {t('reviews_page.form_close')}
          </button>
        )}
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-6">
      {isDrawer && (
        <div className="flex items-center justify-between mb-1">
          <p className="text-lg font-black text-white" style={{ fontFamily: 'Clash Display, sans-serif' }}>
            {t('reviews_page.form_heading')}
          </p>
          {onClose && (
            <button type="button" onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/8 hover:bg-white/15 transition-colors cursor-pointer">
              <X className="w-4 h-4 text-white/60" />
            </button>
          )}
        </div>
      )}

      {/* Rating */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-[0.15em] text-white/40 mb-2" style={{ fontFamily: 'Satoshi, sans-serif' }}>
          {t('reviews_page.form_rating_label')}
        </label>
        <StarRating value={rating} onChange={setRating} />
      </div>

      {/* Name */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-[0.15em] text-white/40 mb-2" style={{ fontFamily: 'Satoshi, sans-serif' }}>
          {t('reviews_page.form_name_label')}
        </label>
        <input
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder={t('reviews_page.form_name_placeholder')}
          style={inputBase}
          onFocus={(e) => (e.target.style.borderColor = 'rgba(74,144,217,0.5)')}
          onBlur={(e)  => (e.target.style.borderColor = 'rgba(168,204,232,0.15)')}
        />
      </div>

      {/* Destination */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-[0.15em] text-white/40 mb-2" style={{ fontFamily: 'Satoshi, sans-serif' }}>
          {t('reviews_page.form_destination_label')}
        </label>
        <input
          value={form.destination}
          onChange={(e) => setForm({ ...form, destination: e.target.value })}
          placeholder={t('reviews_page.form_destination_placeholder')}
          style={inputBase}
          onFocus={(e) => (e.target.style.borderColor = 'rgba(74,144,217,0.5)')}
          onBlur={(e)  => (e.target.style.borderColor = 'rgba(168,204,232,0.15)')}
        />
      </div>

      {/* Review */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-[0.15em] text-white/40 mb-2" style={{ fontFamily: 'Satoshi, sans-serif' }}>
          {t('reviews_page.form_review_label')}
        </label>
        <textarea
          required
          rows={5}
          value={form.review}
          onChange={(e) => setForm({ ...form, review: e.target.value })}
          placeholder={t('reviews_page.form_review_placeholder')}
          style={{ ...inputBase, resize: 'none' }}
          onFocus={(e) => (e.target.style.borderColor = 'rgba(74,144,217,0.5)')}
          onBlur={(e)  => (e.target.style.borderColor = 'rgba(168,204,232,0.15)')}
        />
      </div>

      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        disabled={!rating || !form.name || !form.review}
        className="flex items-center justify-center gap-2.5 h-12 rounded-xl font-semibold text-sm transition-opacity cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        style={{
          background:  'linear-gradient(135deg, #1a3566, #0d1b38)',
          border:      '1px solid rgba(74,144,217,0.3)',
          color:       '#fff',
          fontFamily:  'Satoshi, sans-serif',
          boxShadow:   '0 4px 20px rgba(13,27,56,0.6)',
        }}
      >
        <Send className="w-4 h-4" />
        {t('reviews_page.form_submit')}
      </motion.button>
    </form>
  );
}

// ── Testimonial Card ──────────────────────────────────────────────────────────

function TestimonialCard({ testimonial, index }: { testimonial: Testimonial; index: number }) {
  const { t } = useTranslation();
  const tagStyle = TAG_COLORS[testimonial.tagKey] ?? { bg: 'rgba(255,255,255,0.1)', text: 'rgba(255,255,255,0.6)' };

  return (
    <motion.div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: '200px 0px -40px 0px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.06 }}
        className="relative rounded-2xl overflow-hidden"
        style={{
          background:  'rgba(255,255,255,0.035)',
          border:      '1px solid rgba(168,204,232,0.1)',
          backdropFilter: 'blur(12px)',
        }}
      >
        {/* Top shimmer line */}
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(168,204,232,0.2), transparent)' }} />

        <div className="p-7">
          {/* Header row */}
          <div className="flex items-start justify-between mb-5">
            <div className="flex items-center gap-3.5">
              <img
                src={testimonial.avatarSrc}
                alt={testimonial.name}
                className="w-12 h-12 rounded-xl object-cover"
                style={{ border: '1px solid rgba(168,204,232,0.15)' }}
              />
              <div>
                <p className="font-black text-white text-[15px]" style={{ fontFamily: 'Clash Display, sans-serif' }}>{testimonial.name}</p>
                <p className="text-xs text-white/40 mt-0.5" style={{ fontFamily: 'Satoshi, sans-serif' }}>{testimonial.title}</p>
              </div>
            </div>
            <span
              className="shrink-0 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.1em]"
              style={{ background: tagStyle.bg, color: tagStyle.text, fontFamily: 'Satoshi, sans-serif' }}
            >
              {t(`reviews_page.${testimonial.tagKey}`)}
            </span>
          </div>

          {/* Stars + rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-3.5 h-3.5"
                  style={{
                    fill:  s <= Math.floor(testimonial.rating) ? '#fbbf24' : 'transparent',
                    color: s <= Math.floor(testimonial.rating) ? '#fbbf24' : 'rgba(255,255,255,0.15)',
                    strokeWidth: 1.5,
                  }}
                />
              ))}
            </div>
            <span className="text-xs font-bold text-white/50" style={{ fontFamily: 'Satoshi, sans-serif' }}>{testimonial.rating.toFixed(1)}</span>
            <span className="text-white/15 text-xs">·</span>
            <span className="text-xs text-white/30" style={{ fontFamily: 'Satoshi, sans-serif' }}>{testimonial.destination}</span>
          </div>

          {/* Quote */}
          <div className="relative">
            <Quote className="absolute -top-1 -left-0.5 w-5 h-5 text-white/8" style={{ fill: 'currentColor' }} />
            <p className="text-[14px] text-white/55 leading-relaxed pl-4" style={{ fontFamily: 'Satoshi, sans-serif' }}>
              {testimonial.quote}
            </p>
          </div>

          {/* Date */}
          <p className="text-[10px] text-white/20 mt-4 font-semibold tracking-wide uppercase" style={{ fontFamily: 'Satoshi, sans-serif' }}>{testimonial.date}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Mobile Drawer ─────────────────────────────────────────────────────────────

function MobileDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="drawer-backdrop"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50"
            style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }}
            onClick={onClose}
          />
          {/* Sheet sliding up */}
          <motion.div
            key="drawer-sheet"
            initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 340, damping: 32 }}
            className="fixed bottom-0 left-0 right-0 z-50 rounded-t-3xl overflow-hidden"
            style={{
              background:     'rgba(10,22,48,0.97)',
              border:         '1px solid rgba(168,204,232,0.12)',
              borderBottom:   'none',
              maxHeight:      '90dvh',
              overflowY:      'auto',
            }}
          >
            {/* Drag handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-white/20" />
            </div>
            <ReviewForm onClose={onClose} isDrawer />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

const fadeUp = {
  initial:     { opacity: 0, y: 36 },
  whileInView: { opacity: 1, y: 0  },
  viewport:    { once: false, margin: '200px 0px -60px 0px' },
  transition:  { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
};

export default function ReviewsPage() {
  const { t } = useTranslation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showBtn, setShowBtn] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      const distFromBottom = document.documentElement.scrollHeight - window.scrollY - window.innerHeight;
      setShowBtn(distFromBottom > 120);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="bg-[#0d1b38] min-h-screen">
      <SEOHead
        title="Reviews — Next Route Travels"
        description="Read what hundreds of travellers say about Next Route Travels. Real experiences, real destinations, rated 4.9 out of 5."
        canonicalPath="/reviews"
      />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-[#0d1b38]">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-blue-600/8 blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-blue-400/06 blur-[100px] pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-36 pb-20 w-full text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 mb-6 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-white/60" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                {t('reviews_page.eyebrow')}
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white mb-5 leading-[0.95]" style={{ fontFamily: 'Clash Display, sans-serif' }}>
              {t('reviews_page.heading_line1')}<br />
              <em className="not-italic" style={{ background: 'linear-gradient(135deg, #60a5fa, #38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                {t('reviews_page.heading_accent')}
              </em>
            </h1>
            <p className="text-lg text-white/40 max-w-lg mx-auto mb-12" style={{ fontFamily: 'Satoshi, sans-serif' }}>
              {t('reviews_page.sub')}
            </p>

            {/* Stats row */}
            <div className="inline-flex items-stretch gap-0 rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(168,204,232,0.12)', background: 'rgba(255,255,255,0.03)' }}>
              {STATS_KEYS.map((s, i) => (
                <div key={s.labelKey} className="flex items-stretch">
                  <div className="flex flex-col items-center justify-center px-8 py-5 gap-0.5">
                    <span className="text-3xl font-black text-white" style={{ fontFamily: 'Clash Display, sans-serif' }}>{s.value}</span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/30" style={{ fontFamily: 'Satoshi, sans-serif' }}>{t(s.labelKey)}</span>
                  </div>
                  {i < STATS_KEYS.length - 1 && <div className="w-px self-stretch" style={{ background: 'rgba(168,204,232,0.1)' }} />}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── MAIN: Stacking cards + Form ── */}
      <section className="px-6 pb-28 bg-[#0d1b38]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10 lg:gap-16 items-start">

            {/* Left: testimonial cards */}
            <div className="flex flex-col gap-4">
              {TESTIMONIALS.map((testimonial, i) => (
                <TestimonialCard key={testimonial.name} testimonial={testimonial} index={i} />
              ))}
            </div>

            {/* Right: review form — desktop sticky, hidden on mobile */}
            <div className="hidden lg:block lg:sticky lg:top-24">
              <motion.div {...fadeUp}
                className="rounded-2xl overflow-hidden"
                style={{
                  background:     'rgba(255,255,255,0.03)',
                  border:         '1px solid rgba(168,204,232,0.12)',
                  backdropFilter: 'blur(16px)',
                }}
              >
                <div className="px-6 pt-6 pb-2 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'rgba(74,144,217,0.15)' }}>
                    <MessageSquarePlus className="w-4 h-4" style={{ color: '#4a90d9' }} />
                  </div>
                  <div>
                    <p className="text-base font-black text-white" style={{ fontFamily: 'Clash Display, sans-serif' }}>
                      {t('reviews_page.form_heading')}
                    </p>
                    <p className="text-[11px] text-white/35" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                      {t('reviews_page.form_sub')}
                    </p>
                  </div>
                </div>
                <ReviewForm />
              </motion.div>

              {/* CTA to enquire */}
              <motion.div {...fadeUp} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.15 }} className="mt-5">
                <Link to="/enquiries"
                  className="flex items-center justify-between px-5 py-4 rounded-2xl group cursor-pointer transition-all duration-300"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(168,204,232,0.1)' }}
                >
                  <div>
                    <p className="text-sm font-black text-white" style={{ fontFamily: 'Clash Display, sans-serif' }}>
                      {t('reviews_page.cta_heading')}
                    </p>
                    <p className="text-xs text-white/35" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                      {t('reviews_page.cta_sub')}
                    </p>
                  </div>
                  <div className="w-9 h-9 rounded-full flex items-center justify-center transition-colors" style={{ background: '#1a2f5a' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                  </div>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mobile floating button ── */}
      <div className="lg:hidden">
        <AnimatePresence>
        {showBtn && <motion.button
          type="button"
          onClick={() => setDrawerOpen(true)}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.25 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 pl-4 pr-2 py-2 rounded-full shadow-2xl cursor-pointer"
          style={{
            background:  'linear-gradient(135deg, #1a3566, #0d1b38)',
            border:      '1px solid rgba(74,144,217,0.35)',
            boxShadow:   '0 8px 32px rgba(13,27,56,0.7)',
            color:       '#fff',
            fontFamily:  'Satoshi, sans-serif',
            fontSize:    13,
            fontWeight:  600,
          }}
        >
          <MessageSquarePlus className="w-4 h-4" />
          <span>{t('reviews_page.mobile_btn')}</span>
          <span className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.1)' }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </span>
        </motion.button>}
      </AnimatePresence>

        <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      </div>

      {/* <CTABanner /> */}
    </div>
  );
}
