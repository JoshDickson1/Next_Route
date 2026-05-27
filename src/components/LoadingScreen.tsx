import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import planeImg from '@/assets/one.png'

type Phase = 'enter' | 'fly' | 'clouds' | 'wipe'

// ── SVG cloud shapes ──────────────────────────────────────────────────────────

function CloudA() {
  return (
    <svg viewBox="0 0 320 130" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', display: 'block' }}>
      <ellipse cx="160" cy="98"  rx="152" ry="40"  fill="white" />
      <ellipse cx="92"  cy="62"  rx="72"  ry="56"  fill="white" />
      <ellipse cx="185" cy="55"  rx="78"  ry="60"  fill="white" />
      <ellipse cx="264" cy="76"  rx="56"  ry="46"  fill="white" />
      <ellipse cx="40"  cy="80"  rx="48"  ry="38"  fill="white" />
      <ellipse cx="310" cy="95"  rx="36"  ry="28"  fill="white" />
    </svg>
  )
}
function CloudB() {
  return (
    <svg viewBox="0 0 280 110" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', display: 'block' }}>
      <ellipse cx="140" cy="82"  rx="132" ry="35"  fill="white" />
      <ellipse cx="70"  cy="50"  rx="60"  ry="48"  fill="white" />
      <ellipse cx="155" cy="44"  rx="65"  ry="52"  fill="white" />
      <ellipse cx="228" cy="62"  rx="52"  ry="42"  fill="white" />
      <ellipse cx="20"  cy="72"  rx="38"  ry="30"  fill="white" />
    </svg>
  )
}
function CloudC() {
  return (
    <svg viewBox="0 0 380 100" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', display: 'block' }}>
      <ellipse cx="190" cy="78"  rx="180" ry="30"  fill="white" />
      <ellipse cx="100" cy="52"  rx="80"  ry="46"  fill="white" />
      <ellipse cx="210" cy="46"  rx="88"  ry="50"  fill="white" />
      <ellipse cx="320" cy="62"  rx="65"  ry="40"  fill="white" />
      <ellipse cx="30"  cy="68"  rx="42"  ry="32"  fill="white" />
      <ellipse cx="360" cy="80"  rx="34"  ry="24"  fill="white" />
    </svg>
  )
}

const SHAPES = { a: CloudA, b: CloudB, c: CloudC }

// ── Cloud definitions ─────────────────────────────────────────────────────────
// blur: px — creates depth (front: soft, back: very soft)

const CLOUD_DEFS = [
  // front row — most opaque, gentle blur
  { left: '-5%',  w: '38%', bot: -5,  op: 0.95, blur: 3,  fx:  11, fy: 4, dur: 5.6, dl: 0.0, s: 'a' },
  { left: '24%',  w: '46%', bot: -8,  op: 0.92, blur: 2,  fx:  -9, fy: 3, dur: 6.3, dl: 0.4, s: 'c' },
  { left: '58%',  w: '40%', bot: -4,  op: 0.90, blur: 4,  fx:  13, fy: 5, dur: 5.1, dl: 0.2, s: 'a' },
  { left: '88%',  w: '32%', bot: -6,  op: 0.88, blur: 3,  fx: -10, fy: 4, dur: 6.9, dl: 0.7, s: 'b' },
  { left: '-12%', w: '30%', bot: -10, op: 0.85, blur: 4,  fx:   8, fy: 3, dur: 5.9, dl: 0.5, s: 'c' },
  // mid row — moderate blur
  { left: '-7%',  w: '32%', bot: 60,  op: 0.72, blur: 7,  fx:  -8, fy: 3, dur: 7.1, dl: 0.9, s: 'b' },
  { left: '13%',  w: '40%', bot: 54,  op: 0.68, blur: 6,  fx:  10, fy: 4, dur: 6.0, dl: 0.3, s: 'a' },
  { left: '42%',  w: '34%', bot: 64,  op: 0.74, blur: 7,  fx: -12, fy: 3, dur: 5.8, dl: 0.6, s: 'c' },
  { left: '68%',  w: '44%', bot: 50,  op: 0.66, blur: 6,  fx:   9, fy: 5, dur: 7.4, dl: 0.1, s: 'a' },
  { left: '100%', w: '26%', bot: 58,  op: 0.60, blur: 8,  fx:  -7, fy: 3, dur: 6.5, dl: 1.1, s: 'b' },
  { left: '30%',  w: '28%', bot: 74,  op: 0.63, blur: 7,  fx:  11, fy: 4, dur: 6.8, dl: 0.4, s: 'c' },
  { left: '-2%',  w: '22%', bot: 68,  op: 0.58, blur: 8,  fx:  -9, fy: 3, dur: 7.8, dl: 0.8, s: 'a' },
  // back row — high blur, wispy
  { left: '-4%',  w: '28%', bot: 118, op: 0.42, blur: 11, fx:   6, fy: 3, dur: 8.2, dl: 0.5, s: 'b' },
  { left: '17%',  w: '36%', bot: 112, op: 0.38, blur: 13, fx:  -8, fy: 4, dur: 7.6, dl: 0.8, s: 'c' },
  { left: '43%',  w: '32%', bot: 122, op: 0.45, blur: 10, fx:  10, fy: 2, dur: 6.8, dl: 0.2, s: 'a' },
  { left: '67%',  w: '38%', bot: 110, op: 0.40, blur: 12, fx:  -6, fy: 3, dur: 8.8, dl: 0.6, s: 'b' },
  { left: '93%',  w: '24%', bot: 120, op: 0.35, blur: 14, fx:   8, fy: 4, dur: 7.2, dl: 1.3, s: 'c' },
  { left: '5%',   w: '30%', bot: 134, op: 0.30, blur: 15, fx:  -5, fy: 3, dur: 9.0, dl: 0.7, s: 'a' },
  { left: '54%',  w: '26%', bot: 128, op: 0.32, blur: 13, fx:   7, fy: 2, dur: 8.4, dl: 1.0, s: 'b' },
] as const

// Ghost peek clouds visible while plane is on screen
const PEEK_DEFS = [
  { left: '-5%',  w: '42%', bot: -55, op: 0.13, blur: 18, fx:  8, fy: 2, dur: 7.0, dl: 0.0, s: 'c' },
  { left: '27%',  w: '50%', bot: -65, op: 0.10, blur: 22, fx: -7, fy: 2, dur: 8.5, dl: 0.5, s: 'a' },
  { left: '62%',  w: '40%', bot: -50, op: 0.12, blur: 16, fx:  9, fy: 3, dur: 6.5, dl: 0.2, s: 'b' },
  { left: '88%',  w: '34%', bot: -60, op: 0.09, blur: 24, fx: -6, fy: 2, dur: 9.0, dl: 0.8, s: 'c' },
] as const

function CloudItem({ def }: { def: typeof CLOUD_DEFS[number] | typeof PEEK_DEFS[number] }) {
  const Shape = SHAPES[def.s as keyof typeof SHAPES]
  return (
    <motion.div
      className="absolute"
      style={{
        left:    def.left,
        bottom:  def.bot,
        width:   def.w,
        height:  130,
        opacity: def.op,
        filter:  `blur(${def.blur}px)`,
      }}
      animate={{ x: [0, def.fx, 0], y: [0, -def.fy, 0] }}
      transition={{ duration: def.dur, repeat: Infinity, ease: 'easeInOut', delay: def.dl }}
    >
      <Shape />
    </motion.div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<Phase>('enter')

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase('fly'),    1400),
      setTimeout(() => setPhase('clouds'), 1500),
      setTimeout(() => setPhase('wipe'),   2050),
      setTimeout(onDone,                   3200),
    ]
    return () => timers.forEach(clearTimeout)
  }, [onDone])

  const textGone    = phase !== 'enter'
  const planeFlying = phase === 'fly' || phase === 'clouds' || phase === 'wipe'

  return (
    <motion.div
      className="fixed inset-0 z-[200] overflow-hidden"
      style={{ background: 'linear-gradient(175deg, #020912 0%, #07142a 40%, #0a1c3e 70%, #050f22 100%)' }}
      animate={{ y: phase === 'wipe' ? '-102%' : '0%' }}
      transition={{ duration: 1.15, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* Dot-grid texture */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #a8cce8 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Glow behind plane */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 55% 45% at 50% 62%, rgba(74,144,217,0.16) 0%, transparent 70%)',
        }}
      />

      {/* ── Ghost cloud peek (always visible, even while plane shows) ── */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ height: '30%' }}>
        {PEEK_DEFS.map((d, i) => <CloudItem key={i} def={d} />)}
        {/* soft bottom glow */}
        <div
          className="absolute bottom-0 left-0 right-0 h-16"
          style={{ background: 'linear-gradient(to top, rgba(200,220,255,0.08) 0%, transparent 100%)' }}
        />
      </div>

      {/* ── Logo + tagline ── */}
      <motion.div
        className="absolute top-0 left-0 right-0 flex flex-col items-center pt-[16vh]"
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: textGone ? 0 : 1, y: textGone ? -14 : 0 }}
        transition={{ duration: textGone ? 0.36 : 0.75, ease: [0.22, 1, 0.36, 1], delay: textGone ? 0 : 0.16 }}
      >
        <img
          src="/assets/logo.png"
          alt="Next Route Travels"
          className="h-10 w-auto mb-4"
          style={{ filter: 'brightness(0) invert(1)' }}
        />
        <p
          className="text-white text-[1.65rem] sm:text-[2.1rem] font-black tracking-tight leading-none"
          style={{ fontFamily: 'Clash Display, sans-serif' }}
        >
          Next Route Travels
        </p>
        <p
          className="mt-2.5 text-[#a8cce8]/50 text-[11px] tracking-[0.32em] uppercase"
          style={{ fontFamily: 'Satoshi, sans-serif' }}
        >
          Your journey begins here
        </p>
      </motion.div>

      {/* ── Plane ── */}
      <motion.div
        className="absolute left-0 right-0 flex justify-center"
        style={{ top: '50%' }}
        initial={{ y: 520, opacity: 0 }}
        animate={
          planeFlying
            ? { y: -1800, opacity: [1, 1, 0.4, 0], transition: { duration: 0.92, ease: [0.55, 0, 1, 0.45] } }
            : { y: 0, opacity: 1, transition: { delay: 0.5, duration: 1.2, ease: [0.22, 1, 0.36, 1] } }
        }
      >
        <img
          src={planeImg}
          alt=""
          aria-hidden
          style={{
            width: 360,
            filter: 'drop-shadow(0 24px 52px rgba(168,204,232,0.3)) drop-shadow(0 6px 16px rgba(0,0,0,0.5))',
            objectFit: 'contain',
          }}
        />
      </motion.div>

      {/* ── Full cloud layer (appears when plane flies off) ── */}
      <AnimatePresence>
        {(phase === 'clouds' || phase === 'wipe') && (
          <motion.div
            key="clouds"
            className="absolute bottom-0 left-0 right-0 pointer-events-none"
            style={{ height: '60%' }}
            initial={{ y: 220 }}
            animate={{ y: 0 }}
            exit={{ y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {CLOUD_DEFS.map((d, i) => <CloudItem key={i} def={d} />)}

            {/* Fog band across the top edge of the cloud layer */}
            <div
              className="absolute top-0 left-0 right-0 h-20 pointer-events-none"
              style={{ background: 'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.12) 100%)', filter: 'blur(8px)' }}
            />
            {/* Solid fog base at the very bottom */}
            <div
              className="absolute bottom-0 left-0 right-0 h-28"
              style={{ background: 'linear-gradient(to top, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0.1) 70%, transparent 100%)' }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
