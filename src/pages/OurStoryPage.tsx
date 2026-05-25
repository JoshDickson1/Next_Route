import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Zap, Heart, Compass } from 'lucide-react';
import { CTABanner } from '@/components/CTABanner';

const fadeUp = {
  initial:    { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport:   { once: false, margin: '-60px' },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
};

const VALUES = [
  {
    Icon: Zap,
    name: 'Reliability',
    body: 'We eliminate the stress of travel planning by offering clear, accessible, and structured insights. No vague timelines, no runaround. Just dependable, honest guidance you can plan around.',
  },
  {
    Icon: Shield,
    name: 'Safety',
    body: 'Every journey we coordinate is planned with safety at the center — vetted partners, verified routes, and responsible travel practices for every single trip we touch.',
  },
  {
    Icon: Heart,
    name: 'Passion for Exploration',
    body: "We are driven by a genuine love for discovery. Whether it's Lagos to London or Colombia to Patagonia, we pour that passion into every trip, every guide, every route we plan.",
  },
];

export default function OurStoryPage() {
  return (
    <div>
      {/* ── SECTION 1: HERO ── */}
      <section className="relative min-h-[75vh] flex items-center bg-[#0d1b38] overflow-hidden">
        <div className="absolute top-1/4 -right-32 w-[500px] h-[500px] rounded-full bg-blue-600/12 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-blue-400/08 blur-[100px] pointer-events-none" />
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-36 pb-20 w-full">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-white/60" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                Our Story
              </span>
            </div>
            <h1
              className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white mb-6 max-w-4xl"
              style={{ fontFamily: 'Clash Display, sans-serif' }}
            >
              We Started Because<br />Travel Shouldn't Be
              <em
                className="not-italic"
                style={{
                  background: 'linear-gradient(135deg, #60a5fa 0%, #38bdf8 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              > This Hard.</em>
            </h1>
            <p className="text-xl text-white/45 max-w-2xl leading-relaxed" style={{ fontFamily: 'Satoshi, sans-serif' }}>
              Born out of frustration and fueled by passion — Next Route Travels exists because
              every Nigerian deserves to see the world, without the headache.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 2: THE MISSION ── */}
      <section className="py-28 px-6 bg-[#f5f8fc] dark:bg-background">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeUp}>
            <div
              className="rounded-2xl p-10 border border-blue-100 dark:border-blue-950"
              style={{ background: 'linear-gradient(135deg, #0d1b38 0%, #1a2f5a 100%)' }}
            >
              <Compass className="w-8 h-8 text-blue-400 mb-6" />
              <blockquote
                className="text-2xl md:text-3xl font-black leading-snug text-white"
                style={{ fontFamily: 'Clash Display, sans-serif' }}
              >
                "Travel should feel like freedom, not paperwork."
              </blockquote>
              <div className="mt-8 pt-8 border-t border-white/10">
                <p className="text-white/40 text-sm leading-relaxed" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                  From the streets of Lagos to the skylines of New York, we believe every journey
                  should be the beginning of something extraordinary.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div {...fadeUp} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.15 }} className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-navy/10 dark:border-white/10 bg-white dark:bg-white/5 px-4 py-1.5">
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-navy/60 dark:text-white/50" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                The Mission
              </span>
            </div>
            <h2
              className="text-4xl md:text-5xl font-black tracking-tight text-[#1a2f5a] dark:text-foreground"
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
              <p>
                Driven by reliability, safety, and a passion for exploration, we are here to guide your path every
                step of the way.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 3: VALUES ── */}
      <section className="py-28 px-6 bg-[#0d1b38]">
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-16" {...fadeUp}>
            <h2
              className="text-4xl md:text-5xl font-black tracking-tight text-white"
              style={{ fontFamily: 'Clash Display, sans-serif' }}
            >
              What We Stand For
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VALUES.map(({ Icon, name, body }, i) => (
              <motion.div
                key={name}
                {...fadeUp}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: i * 0.12 }}
                className="p-8 rounded-2xl border border-white/08 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/15 transition-all duration-500"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-900/50 flex items-center justify-center mb-6">
                  <Icon className="w-5 h-5 text-blue-300" />
                </div>
                <h3
                  className="text-xl font-black text-white mb-4"
                  style={{ fontFamily: 'Clash Display, sans-serif' }}
                >
                  {name}
                </h3>
                <p className="text-white/45 leading-relaxed text-sm" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                  {body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 4: WHAT WE DO ── */}
      <section className="py-28 px-6 bg-[#f5f8fc] dark:bg-background">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeUp} className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-navy/10 dark:border-white/10 bg-white dark:bg-white/5 px-4 py-1.5">
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-navy/60 dark:text-white/50" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                What We Do
              </span>
            </div>
            <h2
              className="text-4xl md:text-5xl font-black tracking-tight text-[#1a2f5a] dark:text-foreground"
              style={{ fontFamily: 'Clash Display, sans-serif' }}
            >
              A Premier Travel Platform
            </h2>
            <div className="space-y-4 text-slate-500 dark:text-muted-foreground leading-loose text-lg" style={{ fontFamily: 'Satoshi, sans-serif' }}>
              <p>
                Next Route Travels is a premier travel information and messaging platform dedicated to providing
                reliable journeys across Nigeria and beyond by connecting people, cultures, and destinations
                through seamless air travel, cross-border road adventures, and curated international expeditions.
              </p>
              <p>
                Our mission is to eliminate the stress of travel planning by offering clear, accessible, and structured
                insights, whether you are looking for international flights connecting Nigeria to major global hubs,
                safe and comfortable inter-state express services and private charters across West Africa, or specialized
                SUV overland expeditions through the spectacular landscapes of North and South America.
              </p>
              <p>
                Beyond regional transit and global connectivity, the platform serves as a comprehensive travel companion
                featuring curated destination guides and local insights for iconic locations like Rome, the Serengeti,
                and the Greek Islands, helping travelers understand cultural nuances, find ideal accommodations, and
                discover hidden gems before they even pack their bags.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 5: BRAND CLOSE ── */}
      <section className="py-24 px-6 bg-[#f5f8fc] dark:bg-background">
        <motion.div {...fadeUp} className="max-w-3xl mx-auto text-center space-y-8">
          <p
            className="text-3xl md:text-4xl font-black text-[#1a2f5a] dark:text-foreground leading-snug"
            style={{ fontFamily: 'Clash Display, sans-serif' }}
          >
            "We're not just a travel platform. We're the reason you finally said yes to that trip."
          </p>
          <Link
            to="/enquiries"
            className="group inline-flex items-center gap-2.5 rounded-full px-8 py-4 text-sm font-bold text-white transition-all duration-300 hover:scale-[1.02]"
            style={{
              fontFamily: 'Satoshi, sans-serif',
              background: 'linear-gradient(135deg, #1a3566 0%, #0d1b38 100%)',
              boxShadow: '0 8px 32px rgba(13,27,56,0.3)',
            }}
          >
            Start Planning Your Trip
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </motion.div>
      </section>

      <CTABanner />
    </div>
  );
}
