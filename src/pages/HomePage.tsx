import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Globe, Map, Compass, Navigation, Star, Shield, Zap, BookOpen } from 'lucide-react';
import { CTABanner } from '@/components/CTABanner';
import { LocationsGlobe } from '@/components/sections/LocationsGlobe';

const fadeUp = {
  initial:    { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport:   { once: false, margin: '-60px' },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
};

const SERVICES = [
  {
    Icon: Globe,
    title: 'Flights',
    body: 'Connecting Nigeria to major international hubs. Whether you are traveling for business, study, or leisure, we bridge the gap between Nigeria and the rest of the world with reliable flight options and seamless booking coordination.',
  },
  {
    Icon: Map,
    title: 'Road Travel',
    body: 'Inter-state express services and private charters across West Africa. Experience safe, comfortable, and reliable regional transit. From interstate commuting within Nigeria to private cross-border charters, we keep you moving smoothly.',
  },
  {
    Icon: Compass,
    title: 'Latin America Expeditions',
    body: 'Specialized SUV and road travel connecting North & South America. Discover tailored, rugged, and breathtaking overland journeys across spectacular Latin American landscapes with experienced guides and specialized vehicles.',
  },
];

const DESTINATIONS = [
  {
    name: 'Rome',
    region: 'Italy, Europe',
    subtitle: 'Ancient History Meets Modern Charm',
    body: 'Discover the eternal city. From navigating historic cobblestone streets to finding the most authentic local culinary secrets, our Rome guide offers essential insights for African travelers exploring Italy.',
    gradient: 'linear-gradient(135deg, #c41e3a 0%, #8b1a2e 100%)',
  },
  {
    name: 'Serengeti',
    region: 'Tanzania, Africa',
    subtitle: 'The Ultimate African Wildlife Experience',
    body: 'Witness nature in its rawest form. Our Serengeti guide prepares you for unforgettable safari expeditions, tracking the great migration, and respecting the local ecosystem.',
    gradient: 'linear-gradient(135deg, #d97706 0%, #92400e 100%)',
  },
  {
    name: 'Greek Islands',
    region: 'Greece, Europe',
    subtitle: 'Sun, Sea, and Timeless Architecture',
    body: 'Escape to the breathtaking Mediterranean coast. Learn the best ways to island-hop across Greece, discover hidden beaches, and find the perfect coastal accommodations.',
    gradient: 'linear-gradient(135deg, #0369a1 0%, #075985 100%)',
  },
];

const FEATURES = [
  {
    Icon: Navigation,
    title: 'Navigating Global Routes',
    body: 'We provide up-to-date transit insights, helping travelers from Nigeria understand international flight connections, layovers, and travel requirements without the confusion.',
  },
  {
    Icon: Shield,
    title: 'Regional Connectivity',
    body: 'We champion West African unity by detailing safe, structured road travel paths, offering a trusted resource for regional commerce, family visits, and tourism.',
  },
  {
    Icon: Compass,
    title: 'Curated Adventure Planning',
    body: 'For those looking to step far outside their comfort zone — like exploring Latin America by road — we provide the specialized knowledge, vehicle insights, and structural blueprints needed.',
  },
  {
    Icon: BookOpen,
    title: 'Local Cultural Insights',
    body: 'We believe in respectful, informed travel. Our destination guides ensure that before you even pack your bags, you understand the local culture, accommodation landscapes, and hidden gems.',
  },
];

export default function HomePage() {
  return (
    <div>
      {/* ── SECTION 1: HERO ── */}
      <section className="relative min-h-screen flex items-center bg-[#0d1b38] overflow-hidden">
        {/* Background orbs */}
        <div className="absolute top-1/4 -left-32 w-[600px] h-[600px] rounded-full bg-blue-600/15 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] rounded-full bg-blue-400/10 blur-[100px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-[#1d4ed8]/08 blur-[150px] pointer-events-none" />

        {/* Grid pattern */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-36 pb-24 text-center w-full">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center mb-8"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              <span
                className="text-[11px] font-semibold tracking-[0.2em] uppercase text-white/60"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >
                Lagos · London · New York · Dubai
              </span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
            className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[1.02] tracking-tight mb-8"
            style={{
              fontFamily: 'Clash Display, sans-serif',
              background: 'linear-gradient(135deg, #ffffff 0%, #dbeafe 40%, #93c5fd 70%, #60a5fa 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Reliable Journeys<br />Across Nigeria &<br />
            <em
              className="not-italic"
              style={{
                background: 'linear-gradient(135deg, #60a5fa 0%, #38bdf8 50%, #a5f3fc 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Beyond
            </em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.16 }}
            className="text-lg md:text-xl text-white/45 max-w-2xl mx-auto leading-relaxed mb-12"
            style={{ fontFamily: 'Satoshi, sans-serif' }}
          >
            Connecting people, cultures, and destinations through seamless air travel,
            cross-border road adventures, and curated international expeditions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.24 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/services"
              className="group inline-flex items-center gap-2.5 rounded-full px-8 py-4 text-sm font-bold text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              style={{
                fontFamily: 'Satoshi, sans-serif',
                background: 'linear-gradient(135deg, #1a3566 0%, #0d1b38 100%)',
                boxShadow: '0 0 0 1px rgba(13,27,56,0.3), 0 8px 32px rgba(13,27,56,0.3)',
              }}
            >
              Explore Our Services
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="/our-story"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-8 py-4 text-sm font-semibold text-white/70 backdrop-blur-sm transition-all duration-200 hover:bg-white/10 hover:text-white hover:border-white/25"
              style={{ fontFamily: 'Satoshi, sans-serif' }}
            >
              Our Story
            </Link>
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <motion.div
              animate={{ scaleY: [0, 1, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="w-[1px] h-12 bg-white/20"
            />
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 2: CORE SERVICES ── */}
      <section className="py-28 px-6 bg-[#f5f8fc] dark:bg-background">
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-16" {...fadeUp}>
            <div className="inline-flex items-center gap-2 rounded-full border border-navy/10 dark:border-white/10 bg-white dark:bg-white/5 px-4 py-1.5 mb-6">
              <Zap className="h-3.5 w-3.5 text-blue-500" />
              <span
                className="text-[11px] font-bold tracking-[0.2em] uppercase text-navy/60 dark:text-white/50"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >
                What We Do
              </span>
            </div>
            <h2
              className="text-4xl md:text-5xl font-black tracking-tight text-[#1a2f5a] dark:text-foreground"
              style={{ fontFamily: 'Clash Display, sans-serif' }}
            >
              Every Route, Handled.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SERVICES.map(({ Icon, title, body }, i) => (
              <motion.div
                key={title}
                {...fadeUp}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
              >
                <Link to="/services" className="group block h-full">
                  <div className="h-full p-8 rounded-2xl bg-white dark:bg-card border border-slate-100 dark:border-border hover:border-blue-200 dark:hover:border-blue-900 hover:shadow-xl dark:hover:shadow-black/40 transition-all duration-500 hover:-translate-y-1">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950 flex items-center justify-center mb-6 group-hover:bg-blue-100 dark:group-hover:bg-blue-900 transition-colors duration-300">
                      <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3
                      className="text-xl font-bold mb-3 text-[#1a2f5a] dark:text-foreground"
                      style={{ fontFamily: 'Clash Display, sans-serif' }}
                    >
                      {title}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-muted-foreground leading-relaxed" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                      {body}
                    </p>
                    <div className="mt-6 flex items-center gap-1 text-blue-600 dark:text-blue-400 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                      Learn more <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LOCATIONS GLOBE ── */}
      <LocationsGlobe />

      {/* ── SECTION 3: DESTINATION GUIDES ── */}
      <section className="py-28 px-6 bg-[#0d1b38]">
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-16" {...fadeUp}>
            <h2
              className="text-4xl md:text-5xl font-black tracking-tight text-white mb-4"
              style={{ fontFamily: 'Clash Display, sans-serif' }}
            >
              Destination Guides &<br />Local Insights
            </h2>
            <p className="text-white/45 max-w-xl mx-auto text-lg" style={{ fontFamily: 'Satoshi, sans-serif' }}>
              Travel like a local, no matter where you land. Explore our curated insights
              to prepare for your next big journey.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DESTINATIONS.map(({ name, region, subtitle, body, gradient }, i) => (
              <motion.div
                key={name}
                {...fadeUp}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
              >
                <Link to="/destinations" className="group block h-full">
                  <div className="h-full rounded-2xl overflow-hidden border border-white/08 hover:border-white/15 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl">
                    <div className="h-36 relative" style={{ background: gradient }}>
                      <div className="absolute inset-0 bg-black/20" />
                      <div className="absolute bottom-4 left-5">
                        <p className="text-white/60 text-[11px] font-semibold tracking-widest uppercase" style={{ fontFamily: 'Satoshi, sans-serif' }}>{region}</p>
                        <p className="text-white text-xl font-black" style={{ fontFamily: 'Clash Display, sans-serif' }}>{name}</p>
                      </div>
                    </div>
                    <div className="p-6 bg-[#0f2244]">
                      <p className="text-blue-300 text-sm font-semibold mb-2" style={{ fontFamily: 'Satoshi, sans-serif' }}>{subtitle}</p>
                      <p className="text-white/50 text-sm leading-relaxed" style={{ fontFamily: 'Satoshi, sans-serif' }}>{body}</p>
                      <div className="mt-5 flex items-center gap-1 text-blue-400 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                        Read guide <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div className="text-center mt-10" {...fadeUp} transition={{ duration: 0.5, delay: 0.3 }}>
            <Link
              to="/destinations"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white/70 hover:text-white hover:bg-white/10 hover:border-white/25 transition-all duration-200 backdrop-blur-sm"
              style={{ fontFamily: 'Satoshi, sans-serif' }}
            >
              View All Destinations <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 4: ABOUT / MISSION ── */}
      <section className="py-28 px-6 bg-[#f5f8fc] dark:bg-background">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeUp}>
            <div
              className="rounded-2xl p-10 border border-blue-100 dark:border-blue-950"
              style={{ background: 'linear-gradient(135deg, #1a2f5a 0%, #0d1b38 100%)' }}
            >
              <Star className="w-8 h-8 text-blue-400 mb-6" />
              <blockquote
                className="text-2xl md:text-3xl font-black leading-snug text-white"
                style={{ fontFamily: 'Clash Display, sans-serif' }}
              >
                "Travel should feel like freedom, not paperwork."
              </blockquote>
              <p className="mt-6 text-white/40 text-sm" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                — Next Route Travels
              </p>
            </div>
          </motion.div>

          <motion.div {...fadeUp} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}>
            <div className="inline-flex items-center gap-2 rounded-full border border-navy/10 dark:border-white/10 bg-white dark:bg-white/5 px-4 py-1.5 mb-6">
              <span
                className="text-[11px] font-bold tracking-[0.2em] uppercase text-navy/60 dark:text-white/50"
                style={{ fontFamily: 'Satoshi, sans-serif' }}
              >
                Our Mission
              </span>
            </div>
            <h2
              className="text-4xl md:text-5xl font-black tracking-tight text-[#1a2f5a] dark:text-foreground mb-6"
              style={{ fontFamily: 'Clash Display, sans-serif' }}
            >
              The Message Behind Next Route Travels
            </h2>
            <div className="space-y-4 text-slate-500 dark:text-muted-foreground leading-relaxed" style={{ fontFamily: 'Satoshi, sans-serif' }}>
              <p>
                At Next Route Travels, we believe that travel is more than just moving from one geographical
                point to another — it is about bridging worlds, expanding horizons, and creating unforgettable stories.
              </p>
              <p>
                Our mission is to eliminate the stress of travel planning by offering clear, reliable, and accessible
                information for both regional commutes and massive international expeditions. We don't just connect roads
                and flight paths; we connect people to their next great opportunity.
              </p>
            </div>
            <Link
              to="/our-story"
              className="mt-8 group inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold text-sm hover:gap-3 transition-all duration-200"
              style={{ fontFamily: 'Satoshi, sans-serif' }}
            >
              Read Our Story <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 5: HOW WE HELP ── */}
      <section className="py-28 px-6 bg-[#0d1b38]">
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-16" {...fadeUp}>
            <h2
              className="text-4xl md:text-5xl font-black tracking-tight text-white"
              style={{ fontFamily: 'Clash Display, sans-serif' }}
            >
              What Next Route Travels<br />Does For You
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map(({ Icon, title, body }, i) => (
              <motion.div
                key={title}
                {...fadeUp}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
                className="p-7 rounded-2xl border border-white/08 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/15 transition-all duration-500 group"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-900/50 flex items-center justify-center mb-5 group-hover:bg-blue-800/60 transition-colors duration-300">
                  <Icon className="w-5 h-5 text-blue-300" />
                </div>
                <h3
                  className="text-base font-bold text-white mb-3"
                  style={{ fontFamily: 'Clash Display, sans-serif' }}
                >
                  {title}
                </h3>
                <p className="text-sm text-white/40 leading-relaxed" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                  {body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 6: CTA BANNER ── */}
      <CTABanner />
    </div>
  );
}
