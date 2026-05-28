import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Mail, Phone, MapPin, Clock, CheckCircle, ArrowRight, MessageCircle } from 'lucide-react';
import { FaqSection } from '@/components/ui/faq-section';
import { useTranslation } from 'react-i18next';
import { InstagramIcon, XIcon, FacebookIcon } from '@/components/SocialIcons';
import { SEOHead } from '@/components/SEOHead';

const fadeUp = {
  initial:     { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0  },
  viewport:    { once: false, margin: '-60px' },
  transition:  { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
};

const schema = z.object({
  fullName:      z.string().min(1, 'Full name is required'),
  email:         z.string().email('Enter a valid email address'),
  phone:         z.string().min(6, 'Phone number is required'),
  serviceType:   z.string().min(1, 'Please select a service'),
  destination:   z.string().min(1, 'Destination or route is required'),
  preferredDate: z.string().min(1, 'Preferred date is required'),
  travellers:    z.string().min(1, 'At least 1 traveller required'),
  message:       z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const FAQS = [
  { q: 'How do I book a trip with Next Route Travels?',  a: "Fill out our enquiry form above or contact us directly via email or phone. We'll get back to you within a few hours with available options and a plan tailored to your needs." },
  { q: 'Do you handle visa applications?',               a: "We provide guidance, documentation checklists, and referrals to trusted visa processing partners. While we don't process visas directly, we make the process significantly easier." },
  { q: 'How far in advance should I book?',              a: 'We recommend booking international flights at least 6–8 weeks in advance, and road charters 2 weeks ahead. Expedition packages require 4–6 weeks for full planning.' },
  { q: 'Can you arrange group travel?',                  a: 'Absolutely. Group bookings are one of our specialties — from church tours and student trips to corporate retreats. We coordinate logistics for groups of any size.' },
  { q: 'What payment methods do you accept?',            a: 'We accept bank transfers (NGN and USD), mobile payments, and international cards. Payment plans may be available for expedition packages upon request.' },
  { q: 'What if I need to cancel or change my booking?', a: "Cancellation and change policies depend on the service and timing. We'll walk you through applicable terms at booking. We always aim for flexible solutions for our travelers." },
];

const POPULAR_ROUTES = ['Lagos → London', 'Lagos → Dubai', 'Abuja → New York', 'Lagos → Accra'];

// ── Input helpers ─────────────────────────────────────────────────────────────

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-black uppercase tracking-[0.18em] mb-2"
      style={{ fontFamily: 'Satoshi, sans-serif', color: 'rgba(13,27,56,0.38)' }}>
      {children}
    </p>
  );
}

function FieldWrap({ error, children }: { error?: string; children: React.ReactNode }) {
  return (
    <div>
      {children}
      {error && (
        <p className="mt-1.5 text-[11px] text-red-500 font-semibold" style={{ fontFamily: 'Satoshi, sans-serif' }}>{error}</p>
      )}
    </div>
  );
}

const inputBase =
  'w-full h-13 rounded-2xl border px-4 text-sm text-[#0d1b38] placeholder:text-[rgba(13,27,56,0.3)] outline-none transition-all duration-200 bg-[#f5f8fc]';
const inputNormal = `${inputBase} border-[rgba(13,27,56,0.1)] focus:border-[#4a90d9] focus:bg-white focus:ring-2 focus:ring-[rgba(74,144,217,0.15)]`;
const inputError  = `${inputBase} border-red-400 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-200`;

// ── Success state ─────────────────────────────────────────────────────────────

function SuccessState({ onReset, t }: { onReset: () => void; t: (k: string) => string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center justify-center text-center py-16 space-y-5"
    >
      <div className="w-16 h-16 rounded-full flex items-center justify-center"
        style={{ background: 'rgba(52,211,153,0.12)', border: '1px solid rgba(52,211,153,0.3)' }}>
        <CheckCircle className="w-7 h-7 text-emerald-500" />
      </div>
      <div>
        <h3 className="text-2xl font-black text-[#0d1b38] mb-2" style={{ fontFamily: 'Clash Display, sans-serif' }}>
          {t('enquiries_page.form_success_heading')}
        </h3>
        <p className="text-sm text-[rgba(13,27,56,0.5)] max-w-xs mx-auto" style={{ fontFamily: 'Satoshi, sans-serif' }}>
          {t('enquiries_page.form_success_body')}
        </p>
      </div>
      <button type="button" onClick={onReset}
        className="text-sm font-bold text-[#4a90d9] hover:underline cursor-pointer"
        style={{ fontFamily: 'Satoshi, sans-serif' }}>
        {t('enquiries_page.form_success_new')}
      </button>
    </motion.div>
  );
}

// ── Enquiry Form ──────────────────────────────────────────────────────────────

function EnquiryForm() {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });
  const onSubmit: SubmitHandler<FormData> = () => setSubmitted(true);

  if (submitted) return <SuccessState onReset={() => setSubmitted(false)} t={t} />;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FieldWrap error={errors.fullName?.message}>
          <Label>{t('enquiries_page.form_name')} *</Label>
          <input {...register('fullName')} placeholder={t('enquiries_page.form_name_placeholder')}
            className={errors.fullName ? inputError : inputNormal}
            style={{ fontFamily: 'Satoshi, sans-serif', height: 52 }} />
        </FieldWrap>
        <FieldWrap error={errors.email?.message}>
          <Label>{t('enquiries_page.form_email')} *</Label>
          <input {...register('email')} type="email" placeholder={t('enquiries_page.form_email_placeholder')}
            className={errors.email ? inputError : inputNormal}
            style={{ fontFamily: 'Satoshi, sans-serif', height: 52 }} />
        </FieldWrap>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FieldWrap error={errors.phone?.message}>
          <Label>{t('enquiries_page.form_phone')} *</Label>
          <input {...register('phone')} type="tel" placeholder={t('enquiries_page.form_phone_placeholder')}
            className={errors.phone ? inputError : inputNormal}
            style={{ fontFamily: 'Satoshi, sans-serif', height: 52 }} />
        </FieldWrap>
        <FieldWrap error={errors.serviceType?.message}>
          <Label>{t('enquiries_page.form_service')} *</Label>
          <select {...register('serviceType')} defaultValue=""
            className={`${errors.serviceType ? inputError : inputNormal} cursor-pointer`}
            style={{ fontFamily: 'Satoshi, sans-serif', height: 52 }}>
            <option value="" disabled>{t('enquiries_page.form_service_placeholder')}</option>
            <option value="flights">{t('enquiries_page.form_service_flight')}</option>
            <option value="road">{t('enquiries_page.form_service_road')}</option>
            <option value="expedition">{t('enquiries_page.form_service_latam')}</option>
            <option value="general">{t('enquiries_page.form_service_other')}</option>
          </select>
        </FieldWrap>
      </div>

      <FieldWrap error={errors.destination?.message}>
        <Label>{t('enquiries_page.form_destination')} *</Label>
        <input {...register('destination')} placeholder={t('enquiries_page.form_destination_placeholder')}
          className={errors.destination ? inputError : inputNormal}
          style={{ fontFamily: 'Satoshi, sans-serif', height: 52 }} />
      </FieldWrap>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FieldWrap error={errors.preferredDate?.message}>
          <Label>{t('enquiries_page.form_date')} *</Label>
          <input {...register('preferredDate')} type="date"
            className={errors.preferredDate ? inputError : inputNormal}
            style={{ fontFamily: 'Satoshi, sans-serif', height: 52 }} />
        </FieldWrap>
        <FieldWrap error={errors.travellers?.message}>
          <Label>{t('enquiries_page.form_passengers')} *</Label>
          <input {...register('travellers')} type="number" min={1}
            placeholder={t('enquiries_page.form_passengers_placeholder')}
            className={errors.travellers ? inputError : inputNormal}
            style={{ fontFamily: 'Satoshi, sans-serif', height: 52 }} />
        </FieldWrap>
      </div>

      <FieldWrap>
        <Label>{t('enquiries_page.form_message')}</Label>
        <textarea {...register('message')} rows={4}
          placeholder={t('enquiries_page.form_message_placeholder')}
          className="w-full rounded-2xl border border-[rgba(13,27,56,0.1)] px-4 py-3.5 text-sm text-[#0d1b38] placeholder:text-[rgba(13,27,56,0.3)] bg-[#f5f8fc] outline-none transition-all duration-200 focus:border-[#4a90d9] focus:bg-white focus:ring-2 focus:ring-[rgba(74,144,217,0.15)] resize-none"
          style={{ fontFamily: 'Satoshi, sans-serif' }} />
      </FieldWrap>

      {/* Submit */}
      <motion.button
        type="submit"
        className="w-full flex items-center justify-between pl-7 pr-2.5 py-2.5 rounded-full cursor-pointer"
        style={{ background: 'linear-gradient(135deg, #1a3566 0%, #0d1b38 100%)', boxShadow: '0 8px 32px -8px rgba(13,27,56,0.45)' }}
        whileHover={{ scale: 1.015 }}
        whileTap={{ scale: 0.985 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      >
        <span className="text-sm font-bold text-white" style={{ fontFamily: 'Satoshi, sans-serif' }}>
          {t('enquiries_page.form_submit')}
        </span>
        <span className="w-11 h-11 rounded-full bg-white/15 flex items-center justify-center shrink-0">
          <ArrowRight className="w-4 h-4 text-white" />
        </span>
      </motion.button>
    </form>
  );
}

// ── Contact item row ──────────────────────────────────────────────────────────

function ContactRow({ Icon, label, value, accent }: {
  Icon:   React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  label:  string;
  value:  string;
  accent: string;
}) {
  return (
    <div className="flex items-center gap-4 py-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
      <div className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0"
        style={{ background: `${accent}18`, border: `1px solid ${accent}30` }}>
        <Icon className="w-4 h-4" style={{ color: accent }} />
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-black uppercase tracking-[0.18em] mb-0.5"
          style={{ fontFamily: 'Satoshi, sans-serif', color: 'rgba(255,255,255,0.3)' }}>{label}</p>
        <p className="text-sm font-semibold text-white whitespace-pre-line leading-snug"
          style={{ fontFamily: 'Satoshi, sans-serif' }}>{value}</p>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function EnquiriesPage() {
  const { t } = useTranslation();

  return (
    <div>
      <SEOHead
        title="Contact Us — Next Route Travels"
        description="Get in touch with Next Route Travels to start planning your journey. Flights, road trips, and expeditions — we handle every route."
        canonicalPath="/enquiries"
      />

      {/* ── HERO ── */}
      <section className="relative min-h-[45vh] flex items-center bg-[#0d1b38] overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-blue-600/10 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-blue-400/6 blur-[80px] pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-36 pb-16 w-full">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 mb-6 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-white/60" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                {t('enquiries_page.eyebrow')}
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white mb-5 leading-[0.93]" style={{ fontFamily: 'Clash Display, sans-serif' }}>
              {t('enquiries_page.heading')}
            </h1>
            <p className="text-xl text-white/45 max-w-xl" style={{ fontFamily: 'Satoshi, sans-serif' }}>
              {t('enquiries_page.sub')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          FORM + CONTACT
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 px-6 bg-[#f5f8fc]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">

          {/* ── Form card ── */}
          <motion.div
            {...fadeUp}
            className="rounded-3xl overflow-hidden"
            style={{ boxShadow: '0 8px 48px -12px rgba(13,27,56,0.14)' }}
          >
            {/* Dark header */}
            <div className="relative px-8 md:px-10 pt-10 pb-9 bg-[#0d1b38] overflow-hidden">
              {/* Decorative glow */}
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
                style={{ background: 'rgba(74,144,217,0.12)', filter: 'blur(80px)', transform: 'translate(30%,-30%)' }} />
              {/* Dot pattern */}
              <div className="absolute inset-0 opacity-[0.035] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '22px 22px' }} />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5"
                  style={{ background: 'rgba(74,144,217,0.15)', border: '1px solid rgba(74,144,217,0.3)' }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  <span className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-300"
                    style={{ fontFamily: 'Satoshi, sans-serif' }}>New Enquiry</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-white leading-[0.95] mb-2"
                  style={{ fontFamily: 'Clash Display, sans-serif' }}>
                  {t('enquiries_page.heading')}
                </h2>
                <p className="text-sm text-white/40" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                  We respond within a few hours. No commitment required.
                </p>
              </div>
            </div>

            {/* White form body */}
            <div className="bg-white px-8 md:px-10 py-9">
              <EnquiryForm />
            </div>
          </motion.div>

          {/* ── Contact panel ── */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
            className="rounded-3xl overflow-hidden flex flex-col"
            style={{ background: '#0d1b38', boxShadow: '0 8px 48px -12px rgba(13,27,56,0.3)' }}
          >
            {/* Panel header */}
            <div className="px-7 py-7" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
              <h3 className="text-xl font-black text-white mb-1" style={{ fontFamily: 'Clash Display, sans-serif' }}>
                {t('enquiries_page.contact_heading')}
              </h3>
              <p className="text-xs text-white/35" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                Available 6 days a week — we respond fast.
              </p>
            </div>

            {/* Contact rows */}
            <div className="px-7 flex-1">
              {[
                { Icon: Mail,   label: t('enquiries_page.contact_email_label'),    value: t('enquiries_page.contact_email'),    accent: '#60a5fa' },
                { Icon: Phone,  label: t('enquiries_page.contact_phone_label'),    value: t('enquiries_page.contact_phone'),    accent: '#34d399' },
                { Icon: MapPin, label: t('enquiries_page.contact_location_label'), value: t('enquiries_page.contact_location'), accent: '#fbbf24' },
                { Icon: Clock,  label: t('enquiries_page.contact_hours_label'),    value: t('enquiries_page.contact_hours'),    accent: '#a78bfa' },
              ].map(({ Icon, label, value, accent }) => (
                <ContactRow key={label} Icon={Icon} label={label} value={value} accent={accent} />
              ))}
            </div>

            {/* WhatsApp CTA */}
            <div className="px-7 py-6" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
              <motion.a
                href="https://wa.me/2348012345678"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between w-full pl-5 pr-2 py-2 rounded-full cursor-pointer"
                style={{ background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)', boxShadow: '0 8px 24px -6px rgba(22,163,74,0.4)' }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 28 }}
              >
                <div className="flex items-center gap-2.5">
                  <MessageCircle className="w-4 h-4 text-white" />
                  <span className="text-sm font-bold text-white" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                    Chat on WhatsApp
                  </span>
                </div>
                <span className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                  <ArrowRight className="w-3.5 h-3.5 text-white" />
                </span>
              </motion.a>

              {/* Social icons */}
              <div className="flex items-center gap-2 mt-5">
                {[
                  { Icon: InstagramIcon, href: 'https://instagram.com', label: 'Instagram' },
                  { Icon: XIcon,         href: 'https://twitter.com',   label: 'X (Twitter)' },
                  { Icon: FacebookIcon,  href: 'https://facebook.com',  label: 'Facebook' },
                ].map(({ Icon, href, label }) => (
                  <a key={href} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                    className="flex items-center justify-center w-9 h-9 rounded-xl transition-colors duration-200"
                    style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)' }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.12)'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.07)'; }}
                  >
                    <Icon size={15} color="currentColor" />
                  </a>
                ))}
              </div>
            </div>

            {/* Popular routes */}
            <div className="px-7 py-6" style={{ borderTop: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.025)' }}>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-4"
                style={{ fontFamily: 'Satoshi, sans-serif' }}>Popular Routes</p>
              <div className="flex flex-wrap gap-2">
                {POPULAR_ROUTES.map((r) => (
                  <span key={r}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold"
                    style={{ fontFamily: 'Satoshi, sans-serif', background: 'rgba(74,144,217,0.12)', color: '#93c5fd', border: '1px solid rgba(74,144,217,0.22)' }}>
                    <span className="w-1 h-1 rounded-full bg-current opacity-60" />
                    {r}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 px-6 bg-[#f5f8fc]">
        <div className="max-w-7xl mx-auto">
          <FaqSection
            items={FAQS.map(({ q, a }) => ({ q, a }))}
            image="https://images.unsplash.com/photo-1516426122078-c23e76319801?w=700&auto=format&fit=crop&q=85"
            eyebrow="FAQ"
            heading="Questions about your trip?"
            sub="Everything you need to know before you book — answered clearly, without jargon."
          />
        </div>
      </section>
    </div>
  );
}
