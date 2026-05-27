import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import * as Accordion from '@radix-ui/react-accordion';
import { Mail, Phone, MapPin, Clock, ChevronDown, CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { InstagramIcon, XIcon, FacebookIcon } from '@/components/SocialIcons';
import { SEOHead } from '@/components/SEOHead';

const fadeUp = {
  initial:    { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport:   { once: false, margin: '-60px' },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
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
  { q: 'How do I book a trip with Next Route Travels?', a: "Fill out our enquiry form above or contact us directly via email or phone. We'll get back to you within a few hours with available options and a plan tailored to your needs." },
  { q: 'Do you handle visa applications?', a: "We provide guidance, documentation checklists, and referrals to trusted visa processing partners. While we don't process visas directly, we make the process significantly easier." },
  { q: 'How far in advance should I book?', a: 'We recommend booking international flights at least 6–8 weeks in advance, and road charters 2 weeks ahead. Expedition packages require 4–6 weeks for full planning.' },
  { q: 'Can you arrange group travel?', a: 'Absolutely. Group bookings are one of our specialties — from church tours and student trips to corporate retreats. We coordinate logistics for groups of any size.' },
  { q: 'What payment methods do you accept?', a: 'We accept bank transfers (NGN and USD), mobile payments, and international cards. Payment plans may be available for expedition packages upon request.' },
  { q: 'What if I need to cancel or change my booking?', a: "Cancellation and change policies depend on the service and timing. We'll walk you through applicable terms at booking. We always aim for flexible solutions for our travelers." },
];

function EnquiryForm() {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });
  const onSubmit: SubmitHandler<FormData> = () => setSubmitted(true);

  const fieldClass = (hasError: boolean) =>
    `w-full h-12 rounded-xl border px-4 text-sm bg-white text-[#1a2f5a] placeholder:text-slate-400 outline-none transition-colors focus:ring-2 focus:ring-blue-500/30 ${
      hasError ? 'border-red-400 focus:border-red-500' : 'border-slate-200 focus:border-blue-400'
    }`;

  if (submitted) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center justify-center text-center py-20 space-y-5">
        <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-green-500" />
        </div>
        <h3 className="text-2xl font-black text-[#1a2f5a]" style={{ fontFamily: 'Clash Display, sans-serif' }}>
          {t('enquiries_page.form_success_heading')}
        </h3>
        <p className="text-slate-500 max-w-sm" style={{ fontFamily: 'Satoshi, sans-serif' }}>
          {t('enquiries_page.form_success_body')}
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="text-sm font-semibold text-blue-600 hover:underline cursor-pointer"
          style={{ fontFamily: 'Satoshi, sans-serif' }}
        >
          {t('enquiries_page.form_success_new')}
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-bold tracking-wide text-slate-500 mb-1.5 uppercase" style={{ fontFamily: 'Satoshi, sans-serif' }}>{t('enquiries_page.form_name')} *</label>
          <input {...register('fullName')} placeholder={t('enquiries_page.form_name_placeholder')} className={fieldClass(!!errors.fullName)} style={{ fontFamily: 'Satoshi, sans-serif' }} />
          {errors.fullName && <p className="mt-1 text-xs text-red-500" style={{ fontFamily: 'Satoshi, sans-serif' }}>{errors.fullName.message}</p>}
        </div>
        <div>
          <label className="block text-xs font-bold tracking-wide text-slate-500 mb-1.5 uppercase" style={{ fontFamily: 'Satoshi, sans-serif' }}>{t('enquiries_page.form_email')} *</label>
          <input {...register('email')} type="email" placeholder={t('enquiries_page.form_email_placeholder')} className={fieldClass(!!errors.email)} style={{ fontFamily: 'Satoshi, sans-serif' }} />
          {errors.email && <p className="mt-1 text-xs text-red-500" style={{ fontFamily: 'Satoshi, sans-serif' }}>{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-bold tracking-wide text-slate-500 mb-1.5 uppercase" style={{ fontFamily: 'Satoshi, sans-serif' }}>{t('enquiries_page.form_phone')} *</label>
          <input {...register('phone')} type="tel" placeholder={t('enquiries_page.form_phone_placeholder')} className={fieldClass(!!errors.phone)} style={{ fontFamily: 'Satoshi, sans-serif' }} />
          {errors.phone && <p className="mt-1 text-xs text-red-500" style={{ fontFamily: 'Satoshi, sans-serif' }}>{errors.phone.message}</p>}
        </div>
        <div>
          <label className="block text-xs font-bold tracking-wide text-slate-500 mb-1.5 uppercase" style={{ fontFamily: 'Satoshi, sans-serif' }}>{t('enquiries_page.form_service')} *</label>
          <select {...register('serviceType')} defaultValue="" className={`${fieldClass(!!errors.serviceType)} cursor-pointer`} style={{ fontFamily: 'Satoshi, sans-serif' }}>
            <option value="" disabled>{t('enquiries_page.form_service_placeholder')}</option>
            <option value="flights">{t('enquiries_page.form_service_flight')}</option>
            <option value="road">{t('enquiries_page.form_service_road')}</option>
            <option value="expedition">{t('enquiries_page.form_service_latam')}</option>
            <option value="general">{t('enquiries_page.form_service_other')}</option>
          </select>
          {errors.serviceType && <p className="mt-1 text-xs text-red-500" style={{ fontFamily: 'Satoshi, sans-serif' }}>{errors.serviceType.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold tracking-wide text-slate-500 mb-1.5 uppercase" style={{ fontFamily: 'Satoshi, sans-serif' }}>{t('enquiries_page.form_destination')} *</label>
        <input {...register('destination')} placeholder={t('enquiries_page.form_destination_placeholder')} className={fieldClass(!!errors.destination)} style={{ fontFamily: 'Satoshi, sans-serif' }} />
        {errors.destination && <p className="mt-1 text-xs text-red-500" style={{ fontFamily: 'Satoshi, sans-serif' }}>{errors.destination.message}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-bold tracking-wide text-slate-500 mb-1.5 uppercase" style={{ fontFamily: 'Satoshi, sans-serif' }}>{t('enquiries_page.form_date')} *</label>
          <input {...register('preferredDate')} type="date" className={fieldClass(!!errors.preferredDate)} style={{ fontFamily: 'Satoshi, sans-serif' }} />
          {errors.preferredDate && <p className="mt-1 text-xs text-red-500" style={{ fontFamily: 'Satoshi, sans-serif' }}>{errors.preferredDate.message}</p>}
        </div>
        <div>
          <label className="block text-xs font-bold tracking-wide text-slate-500 mb-1.5 uppercase" style={{ fontFamily: 'Satoshi, sans-serif' }}>{t('enquiries_page.form_passengers')} *</label>
          <input {...register('travellers')} type="number" min={1} placeholder={t('enquiries_page.form_passengers_placeholder')} className={fieldClass(!!errors.travellers)} style={{ fontFamily: 'Satoshi, sans-serif' }} />
          {errors.travellers && <p className="mt-1 text-xs text-red-500" style={{ fontFamily: 'Satoshi, sans-serif' }}>{errors.travellers.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold tracking-wide text-slate-500 mb-1.5 uppercase" style={{ fontFamily: 'Satoshi, sans-serif' }}>{t('enquiries_page.form_message')}</label>
        <textarea {...register('message')} rows={4} placeholder={t('enquiries_page.form_message_placeholder')}
          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm bg-white text-[#1a2f5a] placeholder:text-slate-400 outline-none transition-colors focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30 resize-none"
          style={{ fontFamily: 'Satoshi, sans-serif' }} />
      </div>

      <button type="submit"
        className="w-full h-14 rounded-xl text-sm font-bold text-white transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] hover:shadow-xl"
        style={{ fontFamily: 'Satoshi, sans-serif', background: 'linear-gradient(135deg, #1a3566 0%, #0d1b38 100%)', boxShadow: '0 4px 20px rgba(13,27,56,0.25)' }}>
        {t('enquiries_page.form_submit')} →
      </button>
    </form>
  );
}

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
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-36 pb-16 w-full">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-white/60" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                {t('enquiries_page.eyebrow')}
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white mb-5" style={{ fontFamily: 'Clash Display, sans-serif' }}>
              {t('enquiries_page.heading')}
            </h1>
            <p className="text-xl text-white/45 max-w-xl" style={{ fontFamily: 'Satoshi, sans-serif' }}>
              {t('enquiries_page.sub')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── FORM + CONTACT ── */}
      <section className="py-24 px-6 bg-[#f5f8fc]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12">
          <motion.div {...fadeUp} className="bg-white rounded-2xl p-8 md:p-10 border border-slate-100">
            <h2 className="text-2xl font-black text-[#1a2f5a] mb-8" style={{ fontFamily: 'Clash Display, sans-serif' }}>
              {t('enquiries_page.heading')}
            </h2>
            <EnquiryForm />
          </motion.div>

          <motion.div {...fadeUp} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.15 }} className="space-y-5">
            <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
              <h3 className="text-xl font-black text-[#1a2f5a] mb-2" style={{ fontFamily: 'Clash Display, sans-serif' }}>
                {t('enquiries_page.contact_heading')}
              </h3>
              <p className="text-sm text-slate-500 mb-7" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                We're available 6 days a week and respond fast.
              </p>

              <div className="space-y-5">
                {[
                  { Icon: Mail,   label: t('enquiries_page.contact_email_label'),    value: t('enquiries_page.contact_email') },
                  { Icon: Phone,  label: t('enquiries_page.contact_phone_label'),    value: t('enquiries_page.contact_phone') },
                  { Icon: MapPin, label: t('enquiries_page.contact_location_label'), value: t('enquiries_page.contact_location') },
                  { Icon: Clock,  label: t('enquiries_page.contact_hours_label'),    value: t('enquiries_page.contact_hours') },
                ].map(({ Icon, label, value }) => (
                  <div key={label} className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold tracking-widest uppercase text-slate-400 mb-0.5" style={{ fontFamily: 'Satoshi, sans-serif' }}>{label}</p>
                      <p className="text-sm text-slate-600 whitespace-pre-line" style={{ fontFamily: 'Satoshi, sans-serif' }}>{value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <a href="https://wa.me/2348012345678" target="_blank" rel="noopener noreferrer"
                className="mt-8 w-full flex items-center justify-center gap-2 h-12 rounded-xl text-sm font-bold text-white transition-all duration-300 hover:scale-[1.01] hover:shadow-lg"
                style={{ fontFamily: 'Satoshi, sans-serif', background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)', boxShadow: '0 4px 16px rgba(22,163,74,0.25)' }}>
                Chat on WhatsApp
              </a>

              <div className="mt-6 flex items-center gap-2">
                {[
                  { Icon: InstagramIcon, href: 'https://instagram.com', label: 'Instagram' },
                  { Icon: XIcon,         href: 'https://twitter.com',   label: 'X (Twitter)' },
                  { Icon: FacebookIcon,  href: 'https://facebook.com',  label: 'Facebook' },
                ].map(({ Icon, href, label }) => (
                  <a key={href} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                    className="flex items-center justify-center w-9 h-9 rounded-xl border border-slate-200 text-slate-500 hover:text-foreground hover:border-slate-300 transition-colors duration-200">
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            <div className="bg-[#0d1b38] rounded-2xl p-6">
              <p className="text-[11px] font-bold tracking-widest uppercase text-white/40 mb-4" style={{ fontFamily: 'Satoshi, sans-serif' }}>Popular Routes</p>
              <div className="space-y-2">
                {['Lagos → London', 'Lagos → Dubai', 'Abuja → New York', 'Lagos → Accra'].map((r) => (
                  <div key={r} className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                    <span className="text-sm text-white/55" style={{ fontFamily: 'Satoshi, sans-serif' }}>{r}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <motion.div className="text-center mb-12" {...fadeUp}>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-[#1a2f5a]" style={{ fontFamily: 'Clash Display, sans-serif' }}>
              Frequently Asked Questions
            </h2>
          </motion.div>

          <motion.div {...fadeUp} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}>
            <Accordion.Root type="single" collapsible className="space-y-3">
              {FAQS.map(({ q, a }, i) => (
                <Accordion.Item key={i} value={`item-${i}`} className="rounded-xl border border-slate-100 bg-white overflow-hidden">
                  <Accordion.Trigger className="group flex items-center justify-between w-full px-6 py-5 text-left cursor-pointer" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                    <span className="text-sm font-semibold text-[#1a2f5a] pr-4">{q}</span>
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                  </Accordion.Trigger>
                  <Accordion.Content className="overflow-hidden data-[state=open]:animate-[accordion-down_0.2s_ease] data-[state=closed]:animate-[accordion-up_0.2s_ease]">
                    <p className="px-6 pb-5 text-sm text-slate-500 leading-relaxed" style={{ fontFamily: 'Satoshi, sans-serif' }}>{a}</p>
                  </Accordion.Content>
                </Accordion.Item>
              ))}
            </Accordion.Root>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
