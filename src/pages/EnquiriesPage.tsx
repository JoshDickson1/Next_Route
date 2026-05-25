import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import * as Accordion from '@radix-ui/react-accordion';
import { Mail, Phone, MapPin, Clock, ChevronDown, CheckCircle } from 'lucide-react';
import { InstagramIcon, XIcon, FacebookIcon } from '@/components/SocialIcons';

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
  {
    q: 'How do I book a trip with Next Route Travels?',
    a: 'Fill out our enquiry form above or contact us directly via email or phone. We\'ll get back to you within a few hours with available options and a plan tailored to your needs.',
  },
  {
    q: 'Do you handle visa applications?',
    a: 'We provide guidance, documentation checklists, and referrals to trusted visa processing partners. While we don\'t process visas directly, we make the process significantly easier.',
  },
  {
    q: 'How far in advance should I book?',
    a: 'We recommend booking international flights at least 6–8 weeks in advance, and road charters 2 weeks ahead. Expedition packages require 4–6 weeks for full planning.',
  },
  {
    q: 'Can you arrange group travel?',
    a: 'Absolutely. Group bookings are one of our specialties — from church tours and student trips to corporate retreats. We coordinate logistics for groups of any size.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept bank transfers (NGN and USD), mobile payments, and international cards. Payment plans may be available for expedition packages upon request.',
  },
  {
    q: 'What if I need to cancel or change my booking?',
    a: 'Cancellation and change policies depend on the service and timing. We\'ll walk you through applicable terms at booking. We always aim for flexible solutions for our travelers.',
  },
];

function EnquiryForm() {
  const [submitted, setSubmitted] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = () => {
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center justify-center text-center py-20 space-y-5"
      >
        <div className="w-16 h-16 rounded-full bg-green-50 dark:bg-green-950 flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-green-500" />
        </div>
        <h3 className="text-2xl font-black text-[#1a2f5a] dark:text-foreground" style={{ fontFamily: 'Clash Display, sans-serif' }}>
          Enquiry Received!
        </h3>
        <p className="text-slate-500 dark:text-muted-foreground max-w-sm" style={{ fontFamily: 'Satoshi, sans-serif' }}>
          We'll be in touch within 24 hours with a personalised plan for your journey.
        </p>
      </motion.div>
    );
  }

  const fieldClass = (hasError: boolean) =>
    `w-full h-12 rounded-xl border px-4 text-sm bg-white dark:bg-input text-[#1a2f5a] dark:text-foreground placeholder:text-slate-400 dark:placeholder:text-muted-foreground outline-none transition-colors focus:ring-2 focus:ring-blue-500/30 ${
      hasError
        ? 'border-red-400 focus:border-red-500'
        : 'border-slate-200 dark:border-border focus:border-blue-400 dark:focus:border-blue-500'
    }`;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-bold tracking-wide text-slate-500 dark:text-muted-foreground mb-1.5 uppercase" style={{ fontFamily: 'Satoshi, sans-serif' }}>Full Name *</label>
          <input {...register('fullName')} placeholder="John Okafor" className={fieldClass(!!errors.fullName)} style={{ fontFamily: 'Satoshi, sans-serif' }} />
          {errors.fullName && <p className="mt-1 text-xs text-red-500" style={{ fontFamily: 'Satoshi, sans-serif' }}>{errors.fullName.message}</p>}
        </div>
        <div>
          <label className="block text-xs font-bold tracking-wide text-slate-500 dark:text-muted-foreground mb-1.5 uppercase" style={{ fontFamily: 'Satoshi, sans-serif' }}>Email Address *</label>
          <input {...register('email')} type="email" placeholder="you@example.com" className={fieldClass(!!errors.email)} style={{ fontFamily: 'Satoshi, sans-serif' }} />
          {errors.email && <p className="mt-1 text-xs text-red-500" style={{ fontFamily: 'Satoshi, sans-serif' }}>{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-bold tracking-wide text-slate-500 dark:text-muted-foreground mb-1.5 uppercase" style={{ fontFamily: 'Satoshi, sans-serif' }}>Phone Number *</label>
          <input {...register('phone')} type="tel" placeholder="+234 801 234 5678" className={fieldClass(!!errors.phone)} style={{ fontFamily: 'Satoshi, sans-serif' }} />
          {errors.phone && <p className="mt-1 text-xs text-red-500" style={{ fontFamily: 'Satoshi, sans-serif' }}>{errors.phone.message}</p>}
        </div>
        <div>
          <label className="block text-xs font-bold tracking-wide text-slate-500 dark:text-muted-foreground mb-1.5 uppercase" style={{ fontFamily: 'Satoshi, sans-serif' }}>Service Type *</label>
          <select
            {...register('serviceType')}
            className={`${fieldClass(!!errors.serviceType)} cursor-pointer`}
            style={{ fontFamily: 'Satoshi, sans-serif' }}
            defaultValue=""
          >
            <option value="" disabled>Select a service...</option>
            <option value="flights">International Flights</option>
            <option value="road">Road Travel</option>
            <option value="expedition">Expedition Package</option>
            <option value="general">General Enquiry</option>
          </select>
          {errors.serviceType && <p className="mt-1 text-xs text-red-500" style={{ fontFamily: 'Satoshi, sans-serif' }}>{errors.serviceType.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold tracking-wide text-slate-500 dark:text-muted-foreground mb-1.5 uppercase" style={{ fontFamily: 'Satoshi, sans-serif' }}>Destination / Route *</label>
        <input {...register('destination')} placeholder="e.g. Lagos → London" className={fieldClass(!!errors.destination)} style={{ fontFamily: 'Satoshi, sans-serif' }} />
        {errors.destination && <p className="mt-1 text-xs text-red-500" style={{ fontFamily: 'Satoshi, sans-serif' }}>{errors.destination.message}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-bold tracking-wide text-slate-500 dark:text-muted-foreground mb-1.5 uppercase" style={{ fontFamily: 'Satoshi, sans-serif' }}>Preferred Date *</label>
          <input {...register('preferredDate')} type="date" className={fieldClass(!!errors.preferredDate)} style={{ fontFamily: 'Satoshi, sans-serif' }} />
          {errors.preferredDate && <p className="mt-1 text-xs text-red-500" style={{ fontFamily: 'Satoshi, sans-serif' }}>{errors.preferredDate.message}</p>}
        </div>
        <div>
          <label className="block text-xs font-bold tracking-wide text-slate-500 dark:text-muted-foreground mb-1.5 uppercase" style={{ fontFamily: 'Satoshi, sans-serif' }}>Number of Travellers *</label>
          <input {...register('travellers')} type="number" min={1} placeholder="2" className={fieldClass(!!errors.travellers)} style={{ fontFamily: 'Satoshi, sans-serif' }} />
          {errors.travellers && <p className="mt-1 text-xs text-red-500" style={{ fontFamily: 'Satoshi, sans-serif' }}>{errors.travellers.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold tracking-wide text-slate-500 dark:text-muted-foreground mb-1.5 uppercase" style={{ fontFamily: 'Satoshi, sans-serif' }}>Message / Additional Details</label>
        <textarea
          {...register('message')}
          rows={4}
          placeholder="Anything else we should know? Special requirements, budget range, preferences..."
          className="w-full rounded-xl border border-slate-200 dark:border-border px-4 py-3 text-sm bg-white dark:bg-input text-[#1a2f5a] dark:text-foreground placeholder:text-slate-400 dark:placeholder:text-muted-foreground outline-none transition-colors focus:border-blue-400 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 resize-none"
          style={{ fontFamily: 'Satoshi, sans-serif' }}
        />
      </div>

      <button
        type="submit"
        className="w-full h-14 rounded-xl text-sm font-bold text-white transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] hover:shadow-xl"
        style={{
          fontFamily: 'Satoshi, sans-serif',
          background: 'linear-gradient(135deg, #1a3566 0%, #0d1b38 100%)',
          boxShadow: '0 4px 20px rgba(13,27,56,0.25)',
        }}
      >
        Send My Enquiry →
      </button>
    </form>
  );
}

export default function EnquiriesPage() {
  return (
    <div>
      {/* ── SECTION 1: HERO ── */}
      <section className="relative min-h-[45vh] flex items-center bg-[#0d1b38] overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-blue-600/10 blur-[100px] pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-36 pb-16 w-full">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-white/60" style={{ fontFamily: 'Satoshi, sans-serif' }}>Get In Touch</span>
            </div>
            <h1
              className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white mb-5"
              style={{ fontFamily: 'Clash Display, sans-serif' }}
            >
              Let's Plan<br />Your Trip.
            </h1>
            <p className="text-xl text-white/45 max-w-xl" style={{ fontFamily: 'Satoshi, sans-serif' }}>
              Fill out the form below or reach out directly — we'll get back to you within a few hours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 2: FORM + CONTACT ── */}
      <section className="py-24 px-6 bg-[#f5f8fc] dark:bg-background">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12">

          {/* Form */}
          <motion.div {...fadeUp} className="bg-white dark:bg-card rounded-2xl p-8 md:p-10 border border-slate-100 dark:border-border">
            <h2
              className="text-2xl font-black text-[#1a2f5a] dark:text-foreground mb-8"
              style={{ fontFamily: 'Clash Display, sans-serif' }}
            >
              Send Us an Enquiry
            </h2>
            <EnquiryForm />
          </motion.div>

          {/* Contact card */}
          <motion.div {...fadeUp} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.15 }} className="space-y-5">
            <div className="bg-white dark:bg-card rounded-2xl p-8 border border-slate-100 dark:border-border shadow-sm">
              <h3 className="text-xl font-black text-[#1a2f5a] dark:text-foreground mb-2" style={{ fontFamily: 'Clash Display, sans-serif' }}>
                Or Reach Us Directly
              </h3>
              <p className="text-sm text-slate-500 dark:text-muted-foreground mb-7" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                We're available 6 days a week and respond fast.
              </p>

              <div className="space-y-5">
                {[
                  { Icon: Mail, label: 'Email', value: 'hello@nextroutetravels.com' },
                  { Icon: Phone, label: 'Phone', value: '+234 801 234 5678\n+234 901 234 5678' },
                  { Icon: MapPin, label: 'Address', value: '15 Airport Road, Ikeja, Lagos, Nigeria' },
                  { Icon: Clock, label: 'Hours', value: 'Mon–Sat 8am–8pm · Sun 10am–4pm' },
                ].map(({ Icon, label, value }) => (
                  <div key={label} className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold tracking-widest uppercase text-slate-400 dark:text-muted-foreground mb-0.5" style={{ fontFamily: 'Satoshi, sans-serif' }}>{label}</p>
                      <p className="text-sm text-slate-600 dark:text-foreground/80 whitespace-pre-line" style={{ fontFamily: 'Satoshi, sans-serif' }}>{value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <a
                href="https://wa.me/2348012345678"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 w-full flex items-center justify-center gap-2 h-12 rounded-xl text-sm font-bold text-white transition-all duration-300 hover:scale-[1.01] hover:shadow-lg"
                style={{
                  fontFamily: 'Satoshi, sans-serif',
                  background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
                  boxShadow: '0 4px 16px rgba(22,163,74,0.25)',
                }}
              >
                Chat on WhatsApp
              </a>

              <div className="mt-6 flex items-center gap-2">
                {[
                  { Icon: InstagramIcon, href: 'https://instagram.com', label: 'Instagram' },
                  { Icon: XIcon,         href: 'https://twitter.com',   label: 'X (Twitter)' },
                  { Icon: FacebookIcon,  href: 'https://facebook.com',  label: 'Facebook' },
                ].map(({ Icon, href, label }) => (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex items-center justify-center w-9 h-9 rounded-xl border border-slate-200 dark:border-border text-slate-500 dark:text-muted-foreground hover:text-foreground hover:border-slate-300 dark:hover:border-border/80 transition-colors duration-200"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick routes teaser */}
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

      {/* ── SECTION 3: FAQ ── */}
      <section className="py-24 px-6 bg-white dark:bg-background">
        <div className="max-w-3xl mx-auto">
          <motion.div className="text-center mb-12" {...fadeUp}>
            <h2
              className="text-4xl md:text-5xl font-black tracking-tight text-[#1a2f5a] dark:text-foreground"
              style={{ fontFamily: 'Clash Display, sans-serif' }}
            >
              Frequently Asked Questions
            </h2>
          </motion.div>

          <motion.div {...fadeUp} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}>
            <Accordion.Root type="single" collapsible className="space-y-3">
              {FAQS.map(({ q, a }, i) => (
                <Accordion.Item
                  key={i}
                  value={`item-${i}`}
                  className="rounded-xl border border-slate-100 dark:border-border bg-white dark:bg-card overflow-hidden"
                >
                  <Accordion.Trigger
                    className="group flex items-center justify-between w-full px-6 py-5 text-left cursor-pointer"
                    style={{ fontFamily: 'Satoshi, sans-serif' }}
                  >
                    <span className="text-sm font-semibold text-[#1a2f5a] dark:text-foreground pr-4">{q}</span>
                    <ChevronDown
                      className="w-4 h-4 text-slate-400 shrink-0 transition-transform duration-300 group-data-[state=open]:rotate-180"
                    />
                  </Accordion.Trigger>
                  <Accordion.Content className="overflow-hidden data-[state=open]:animate-[accordion-down_0.2s_ease] data-[state=closed]:animate-[accordion-up_0.2s_ease]">
                    <p className="px-6 pb-5 text-sm text-slate-500 dark:text-muted-foreground leading-relaxed" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                      {a}
                    </p>
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
