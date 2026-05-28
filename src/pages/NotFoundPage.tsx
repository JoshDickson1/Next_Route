import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import GradientBarsBackground from '@/components/ui/gradient-bars-background'

const SPRING = { type: 'spring' as const, stiffness: 400, damping: 32 }

function ease(delay = 0) {
  return {
    initial:    { opacity: 0, y: 32 },
    animate:    { opacity: 1, y: 0  },
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const, delay },
  }
}

export default function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <GradientBarsBackground
      numBars={22}
      gradientFrom="rgba(23, 37, 84, 0.95)"
      gradientTo="transparent"
      animationDuration={2.8}
      backgroundColor="#020912"
    >
      {/* Dot-grid texture */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(circle, #a8cce8 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Radial glow */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 65% 50% at 50% 55%, rgba(74,144,217,0.12) 0%, transparent 70%)',
        }}
      />

      {/* Floating orbs */}
      <motion.div
        aria-hidden
        className="absolute rounded-full pointer-events-none"
        style={{ width: 500, height: 500, top: '-12%', left: '-14%', background: 'radial-gradient(circle, rgba(26,53,102,0.5) 0%, transparent 70%)' }}
        animate={{ y: [0, -22, 0], x: [0, 14, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden
        className="absolute rounded-full pointer-events-none"
        style={{ width: 380, height: 380, bottom: '-10%', right: '-10%', background: 'radial-gradient(circle, rgba(74,144,217,0.1) 0%, transparent 70%)' }}
        animate={{ y: [0, 18, 0], x: [0, -12, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">

        {/* 404 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.75, y: 24 }}
          animate={{ opacity: 1, scale: 1,    y: 0  }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative select-none"
        >
          <span
            className="block font-black leading-none"
            style={{
              fontFamily: 'Clash Display, sans-serif',
              fontSize: 'clamp(110px, 22vw, 210px)',
              letterSpacing: '-0.04em',
              background: 'linear-gradient(135deg, #ffffff 0%, #a8cce8 50%, #4a90d9 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 70px rgba(74,144,217,0.22))',
            }}
          >
            404
          </span>
          {/* Ghost offset */}
          <span
            aria-hidden
            className="absolute inset-0 block font-black leading-none pointer-events-none"
            style={{
              fontFamily: 'Clash Display, sans-serif',
              fontSize: 'clamp(110px, 22vw, 210px)',
              letterSpacing: '-0.04em',
              color: 'transparent',
              WebkitTextStroke: '1px rgba(168,204,232,0.07)',
              transform: 'translate(3px, 4px)',
            }}
          >
            404
          </span>
        </motion.div>

        {/* Divider */}
        <motion.div
          className="w-14 h-px my-6"
          style={{ background: 'linear-gradient(90deg, transparent, #a8cce8, transparent)' }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.28 }}
        />

        {/* Heading */}
        <motion.h1
          className="text-white font-black tracking-tight leading-[1.05]"
          style={{ fontFamily: 'Clash Display, sans-serif', fontSize: 'clamp(26px, 4.5vw, 50px)' }}
          {...ease(0.36)}
        >
          Route Not Found
        </motion.h1>

        {/* Sub */}
        <motion.p
          className="mt-4 max-w-[340px] leading-relaxed"
          style={{ fontFamily: 'Satoshi, sans-serif', fontSize: 15, color: 'rgba(168,204,232,0.52)' }}
          {...ease(0.48)}
        >
          Looks like this page took a wrong turn. Let's get you back on the right route.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="mt-10 flex flex-col sm:flex-row items-center gap-3"
          {...ease(0.6)}
        >
          {/* Back */}
          <motion.button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full cursor-pointer"
            style={{
              fontFamily: 'Satoshi, sans-serif',
              fontSize: 14,
              fontWeight: 600,
              color: 'rgba(168,204,232,0.85)',
              border: '1px solid rgba(168,204,232,0.16)',
              background: 'rgba(168,204,232,0.06)',
              backdropFilter: 'blur(12px)',
            }}
            variants={{ rest: { y: 0 }, hover: { y: -2 } }}
            initial="rest"
            whileHover="hover"
            whileTap={{ scale: 0.96 }}
            transition={SPRING}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
            Go Back
          </motion.button>

          {/* Home */}
          <motion.button
            type="button"
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2.5 pl-5 pr-1.5 py-1.5 rounded-full cursor-pointer"
            style={{
              fontFamily: 'Satoshi, sans-serif',
              fontSize: 14,
              fontWeight: 600,
              background: '#ffffff',
              color: '#0d1b38',
              boxShadow: '0 8px 28px -6px rgba(255,255,255,0.18)',
            }}
            variants={{ rest: { y: 0 }, hover: { y: -2 } }}
            initial="rest"
            whileHover="hover"
            whileTap={{ scale: 0.96 }}
            transition={SPRING}
          >
            Take Me Home
            <motion.span
              className="flex items-center justify-center w-8 h-8 rounded-full bg-[#0d1b38] text-white shrink-0"
              variants={{ rest: { x: 0 }, hover: { x: 2 } }}
              transition={SPRING}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6"/>
              </svg>
            </motion.span>
          </motion.button>
        </motion.div>

        {/* Eyebrow */}
        <motion.p
          className="mt-14 text-[10px] font-bold tracking-[0.32em] uppercase"
          style={{ fontFamily: 'Satoshi, sans-serif', color: 'rgba(255,255,255,0.12)' }}
          {...ease(0.72)}
        >
          Next Route Travels
        </motion.p>
      </div>
    </GradientBarsBackground>
  )
}
