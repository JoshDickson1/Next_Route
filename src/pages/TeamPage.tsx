import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plane, MapPin, BookOpen, Users, Globe, Award } from 'lucide-react';
import { InstagramIcon, XIcon } from '@/components/SocialIcons';
import { useTranslation } from 'react-i18next';

function LinkedInIcon({ size = 16, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill={color} width={size} height={size}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}
import { SEOHead } from '@/components/SEOHead';

// ── Data ──────────────────────────────────────────────────────────────────────

interface TeamMember {
  name: string;
  role: string;
  location: string;
  bio: string;
  photo: string;
  accent: string;
  socials: { Icon: React.ComponentType<{ size?: number; color?: string }>; href: string }[];
}

const FEATURED: TeamMember = {
  name:     'Adebayo Okonkwo',
  role:     'CEO & Founder',
  location: 'Lagos, Nigeria',
  bio:      'Adebayo founded Next Route Travels after a decade of frustration navigating travel as a Nigerian — expensive, opaque, and full of unnecessary stress. A former aviation consultant, he built Next Route to be the agency he always wished existed: one that treats African travellers with the same precision and care as anyone else in the world. Today he oversees strategy, partnerships, and the vision that every route is an opportunity to change someone\'s life.',
  photo:    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=85',
  accent:   '#60a5fa',
  socials:  [
    { Icon: LinkedInIcon, href: '#' },
    { Icon: XIcon,        href: '#' },
  ],
};

const TEAM: TeamMember[] = [
  {
    name:     'Chioma Adeleke',
    role:     'Head of Operations',
    location: 'Lagos, Nigeria',
    bio:      '8 years streamlining travel operations. Chioma makes sure every itinerary runs without a single hitch.',
    photo:    'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=600&auto=format&fit=crop&q=85',
    accent:   '#34d399',
    socials:  [{ Icon: LinkedInIcon, href: '#' }, { Icon: InstagramIcon, href: '#' }],
  },
  {
    name:     'Emeka Nwosu',
    role:     'Senior Flight Specialist',
    location: 'Abuja, Nigeria',
    bio:      'Knows every route from Lagos to the world. Emeka finds the best connections before you even ask.',
    photo:    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=85',
    accent:   '#fbbf24',
    socials:  [{ Icon: LinkedInIcon, href: '#' }, { Icon: XIcon, href: '#' }],
  },
  {
    name:     'Fatima Hassan',
    role:     'West Africa Road Expert',
    location: 'Kano, Nigeria',
    bio:      'Has driven every major West African corridor. Fatima designs our road travel routes with safety at the core.',
    photo:    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=85',
    accent:   '#f472b6',
    socials:  [{ Icon: LinkedInIcon, href: '#' }, { Icon: InstagramIcon, href: '#' }],
  },
  {
    name:     'Ibrahim Yusuf',
    role:     'Latin America Expeditions',
    location: 'Lagos, Nigeria',
    bio:      'Fluent in Spanish, passionate about the Americas. Ibrahim leads every overland expedition we run.',
    photo:    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&auto=format&fit=crop&q=85',
    accent:   '#a78bfa',
    socials:  [{ Icon: LinkedInIcon, href: '#' }, { Icon: XIcon, href: '#' }],
  },
];

const STATS = [
  { value: '12+', labelKey: 'team_page.stat_years',       Icon: Award  },
  { value: '30+', labelKey: 'team_page.stat_countries',   Icon: Globe  },
  { value: '1.2K+', labelKey: 'team_page.stat_clients',  Icon: Users  },
  { value: '6',   labelKey: 'team_page.stat_specialists', Icon: MapPin },
];

const VALUES = [
  { Icon: Plane,    titleKey: 'team_page.val1_title', bodyKey: 'team_page.val1_body', accent: '#60a5fa', bg: 'rgba(96,165,250,0.1)'  },
  { Icon: MapPin,   titleKey: 'team_page.val2_title', bodyKey: 'team_page.val2_body', accent: '#34d399', bg: 'rgba(52,211,153,0.1)'  },
  { Icon: BookOpen, titleKey: 'team_page.val3_title', bodyKey: 'team_page.val3_body', accent: '#fbbf24', bg: 'rgba(251,191,36,0.1)'  },
];

// ── Subcomponents ─────────────────────────────────────────────────────────────

const fadeUp = {
  initial:     { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0  },
  viewport:    { once: false, margin: '-60px' },
  transition:  { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
};

function TeamCard({ member, index }: { member: TeamMember; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="relative rounded-3xl overflow-hidden cursor-pointer group"
      style={{ height: 440 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: '-40px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
    >
      {/* Photo */}
      <motion.img
        src={member.photo}
        alt={member.name}
        className="absolute inset-0 w-full h-full object-cover object-top"
        animate={{ scale: hovered ? 1.07 : 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Always-on gradient */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to top, rgba(13,27,56,0.97) 0%, rgba(13,27,56,0.5) 45%, transparent 75%)' }}
      />

      {/* Top shimmer on hover */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ background: `linear-gradient(90deg, transparent, ${member.accent}, transparent)` }}
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        {/* Role badge */}
        <motion.span
          className="self-start px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.12em] mb-3"
          style={{ background: `${member.accent}20`, color: member.accent, border: `1px solid ${member.accent}30`, fontFamily: 'Satoshi, sans-serif' }}
          animate={{ y: hovered ? 0 : 4 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {member.role}
        </motion.span>

        {/* Name */}
        <h3 className="text-[22px] font-black text-white leading-tight" style={{ fontFamily: 'Clash Display, sans-serif' }}>
          {member.name}
        </h3>

        <p className="text-xs text-white/35 mt-0.5 mb-0" style={{ fontFamily: 'Satoshi, sans-serif' }}>{member.location}</p>

        {/* Bio slides up on hover */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              key="bio"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <p className="text-sm text-white/55 leading-relaxed mt-3 mb-4" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                {member.bio}
              </p>
              <div className="flex gap-2">
                {member.socials.map(({ Icon, href }, i) => (
                  <a
                    key={i} href={href} target="_blank" rel="noopener noreferrer"
                    className="w-8 h-8 flex items-center justify-center rounded-xl transition-colors duration-200"
                    style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)' }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Icon size={16} color="currentColor" />
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function TeamPage() {
  const { t } = useTranslation();

  return (
    <div className="bg-[#0d1b38] min-h-screen">
      <SEOHead
        title="Our Team — Next Route Travels"
        description="Meet the people behind Next Route Travels — a passionate Lagos-based team dedicated to making world-class travel accessible for every African traveller."
        canonicalPath="/team"
      />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-[#0d1b38] pt-36 pb-20 px-6">
        <div className="absolute top-0 right-0 w-[700px] h-[500px] rounded-full bg-blue-600/8 blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[400px] rounded-full bg-blue-400/5 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 mb-6 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-white/60" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                {t('team_page.eyebrow')}
              </span>
            </div>

            <h1
              className="text-5xl md:text-7xl font-black tracking-tight text-white leading-[0.93] mb-5"
              style={{ fontFamily: 'Clash Display, sans-serif' }}
            >
              {t('team_page.heading_line1')}<br />
              <em className="not-italic" style={{ background: 'linear-gradient(135deg, #60a5fa, #38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                {t('team_page.heading_accent')}
              </em>
            </h1>

            <p className="text-lg text-white/40 max-w-xl mx-auto" style={{ fontFamily: 'Satoshi, sans-serif' }}>
              {t('team_page.sub')}
            </p>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-px overflow-hidden rounded-2xl max-w-3xl mx-auto"
            style={{ background: 'rgba(168,204,232,0.1)', border: '1px solid rgba(168,204,232,0.12)' }}
          >
            {STATS.map(({ value, labelKey, Icon }, i) => (
              <div key={i} className="flex flex-col items-center py-7 px-4 gap-1" style={{ background: 'rgba(13,27,56,0.7)' }}>
                <Icon className="w-4 h-4 mb-1" style={{ color: 'rgba(96,165,250,0.6)' }} />
                <span className="text-3xl font-black text-white" style={{ fontFamily: 'Clash Display, sans-serif' }}>{value}</span>
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/30" style={{ fontFamily: 'Satoshi, sans-serif' }}>{t(labelKey)}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FEATURED — CEO ── */}
      <section className="px-6 pb-10 bg-[#0d1b38]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            {...fadeUp}
            className="rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-[420px_1fr]"
            style={{ border: '1px solid rgba(168,204,232,0.1)' }}
          >
            {/* Photo */}
            <div className="relative h-72 lg:h-auto overflow-hidden">
              <img
                src={FEATURED.photo}
                alt={FEATURED.name}
                className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
              />
              <div
                className="absolute inset-0 pointer-events-none hidden lg:block"
                style={{ background: 'linear-gradient(to right, transparent 50%, rgba(13,27,56,0.95))' }}
              />
              <div
                className="absolute inset-0 pointer-events-none lg:hidden"
                style={{ background: 'linear-gradient(to top, rgba(13,27,56,0.95) 0%, transparent 60%)' }}
              />
            </div>

            {/* Bio */}
            <div className="p-8 md:p-12 flex flex-col justify-center" style={{ background: 'rgba(255,255,255,0.025)' }}>
              <span
                className="self-start px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.15em] mb-6"
                style={{ background: `${FEATURED.accent}15`, color: FEATURED.accent, border: `1px solid ${FEATURED.accent}30`, fontFamily: 'Satoshi, sans-serif' }}
              >
                {t('team_page.featured_badge')}
              </span>

              <h2 className="text-4xl md:text-5xl font-black text-white leading-[0.95] mb-2" style={{ fontFamily: 'Clash Display, sans-serif' }}>
                {FEATURED.name}
              </h2>
              <p className="text-sm text-white/40 mb-6" style={{ fontFamily: 'Satoshi, sans-serif' }}>{FEATURED.location}</p>

              <p className="text-base text-white/55 leading-relaxed mb-8 max-w-lg" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                {FEATURED.bio}
              </p>

              <div className="flex items-center gap-3">
                {FEATURED.socials.map(({ Icon, href }, i) => (
                  <a
                    key={i} href={href} target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-300 hover:scale-110"
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)' }}
                  >
                    <Icon size={16} color="currentColor" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── TEAM GRID — white ── */}
      <section className="py-20 px-6 bg-[#f5f8fc]">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="mb-12">
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-4"
              style={{ background: 'rgba(13,27,56,0.06)', border: '1px solid rgba(13,27,56,0.1)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#60a5fa]" />
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase" style={{ color: 'rgba(13,27,56,0.5)', fontFamily: 'Satoshi, sans-serif' }}>
                {t('team_page.grid_eyebrow')}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight" style={{ fontFamily: 'Clash Display, sans-serif', color: '#0d1b38' }}>
              {t('team_page.grid_heading')}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {TEAM.map((member, i) => (
              <TeamCard key={member.name} member={member} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW WE WORK — dark ── */}
      <section className="py-24 px-6 bg-[#0d1b38]">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-14">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 mb-5 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-white/60" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                {t('team_page.values_eyebrow')}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight" style={{ fontFamily: 'Clash Display, sans-serif' }}>
              {t('team_page.values_heading')}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VALUES.map(({ Icon, titleKey, bodyKey, accent, bg }, i) => (
              <motion.div
                key={titleKey}
                {...fadeUp}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
                className="relative p-8 rounded-3xl overflow-hidden transition-all duration-500"
                style={{ background: 'rgba(255,255,255,0.025)', border: `1px solid ${accent}20` }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.05)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.025)'; }}
              >
                <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${accent}60, transparent)` }} />
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6" style={{ background: bg }}>
                  <Icon className="w-5 h-5" style={{ color: accent }} />
                </div>
                <h3 className="text-xl font-black text-white mb-3" style={{ fontFamily: 'Clash Display, sans-serif' }}>
                  {t(titleKey)}
                </h3>
                <p className="text-sm text-white/45 leading-relaxed" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                  {t(bodyKey)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-6 py-20 bg-[#0d1b38]">
        <div className="max-w-3xl mx-auto">
          <motion.div
            {...fadeUp}
            className="relative rounded-3xl overflow-hidden px-8 py-14 text-center"
            style={{ background: 'linear-gradient(135deg, #1a3566 0%, #0d2348 50%, #0d1b38 100%)', border: '1px solid rgba(96,165,250,0.15)' }}
          >
            <div
              className="absolute inset-0 opacity-[0.04] pointer-events-none"
              aria-hidden
              style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '24px 24px' }}
            />
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(96,165,250,0.5), transparent)' }} />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-3" style={{ fontFamily: 'Clash Display, sans-serif' }}>
                {t('team_page.cta_heading')}
              </h2>
              <p className="text-white/50 mb-8 max-w-sm mx-auto" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                {t('team_page.cta_sub')}
              </p>
              <Link to="/enquiries">
                <motion.span
                  className="inline-flex items-center gap-3 pl-6 pr-2 py-2 rounded-full cursor-pointer bg-white text-[#0d1b38]"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                >
                  <span className="text-sm font-bold" style={{ fontFamily: 'Satoshi, sans-serif' }}>{t('team_page.cta_button')}</span>
                  <span className="w-9 h-9 rounded-full bg-[#0d1b38] text-white flex items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                  </span>
                </motion.span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
