import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import planeImg from '@/assets/one.png';

export function CTABanner() {
  const { t } = useTranslation();

  return (
    <div className="px-4 lg:px-16 mt-15 md:my-24 max-w-6xl mx-auto">
      <motion.div
        className="relative rounded-3xl flex flex-col lg:flex-row lg:items-stretch overflow-hidden lg:overflow-visible"
        style={{ background: 'linear-gradient(135deg, #eef2ff 0%, #f8faff 55%, #eff6ff 100%)' }}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: '-100px' }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Left: content */}
        <div className="relative z-10 flex flex-col justify-center lg:w-[55%] px-7 lg:px-16 py-10 lg:py-14">

          <h2 className="font-bold tracking-tight leading-[1.1]" style={{ fontFamily: 'Clash Display, sans-serif' }}>
            <motion.span
              className="block text-3xl lg:text-5xl text-gray-900"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {t('cta_banner.heading1')}
            </motion.span>
            <motion.span
              className="block text-3xl lg:text-5xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <span className="text-gray-900">{t('cta_banner.heading2')} </span>
              <span className="bg-gradient-to-br from-blue-600 to-blue-900 bg-clip-text text-transparent">
                {t('cta_banner.accent')}
              </span>
            </motion.span>
          </h2>

          <motion.p
            className="mt-4 mb-10 text-sm lg:text-base leading-relaxed text-gray-500"
            style={{ fontFamily: 'Satoshi, sans-serif' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {t('cta_banner.sub')}
          </motion.p>

          <motion.div
            className="flex flex-row items-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, delay: 0.55 }}
          >
            <Link
              to="/enquiries"
              className="justify-between gap-4 px-4 text-white inline-flex items-center rounded-full select-none hover:scale-[1.02] active:scale-[0.97] transition-transform duration-500"
              style={{
                height: 52, fontFamily: 'Satoshi, sans-serif', fontSize: 15, fontWeight: 600,
                background: 'linear-gradient(135deg, #1a3566 0%, #0d1b38 100%)',
                boxShadow: '0 8px 24px rgba(13,27,56,0.25)',
              }}
            >
              <span>{t('cta_banner.book')}</span>
              <span className="bg-white rounded-full p-2 text-slate-800"><ArrowUpRight size={15} /></span>
            </Link>

            <Link
              to="/services"
              className="flex flex-col items-center gap-1.5 text-md font-bold group hover:cursor-pointer hover:text-slate-500 text-gray-700 transition-colors duration-200"
              style={{ fontFamily: 'Satoshi, sans-serif' }}
            >
              <span>{t('cta_banner.explore')}</span>
              <hr className="w-full h-0.5 bg-gray-300 -mt-2 hover:bg-gray-500" />
            </Link>
          </motion.div>
        </div>

        {/* Right: plane + trail */}
        <div className="lg:w-[45%] bg-gradient-to-br from-blue-950 via-slate-800 to-blue-900 flex items-center justify-center overflow-hidden py-6 lg:py-0 rounded-r-4xl">
          <div className="absolute top-3 right-3 bg-white h-10 w-10 rounded-[50%]" />
          <motion.div
            className="relative w-[200px] lg:w-[260px]"
            animate={{
              y:       [260, 0, 0, -13, 0, -13, 0, -13, 0, -360],
              opacity: [0,   1, 1,   1, 1,   1, 1,   1, 1,    0],
            }}
            transition={{
              duration:    3.4,
              times:       [0, 0.16, 0.24, 0.34, 0.44, 0.54, 0.64, 0.72, 0.80, 1],
              ease:        ['easeOut','linear','easeOut','easeIn','easeOut','easeIn','easeOut','easeIn','easeIn'] as const,
              repeat:      Infinity,
              repeatDelay: 0.3,
            }}
          >
            {/* ── Trails — BEFORE img so they render behind the plane ── */}
            {([
              // [leftPct, widthPx, heightPx, opacity, blurPx, rotateDeg]
              // left engine cluster (~30% from left)
              ['27%', 2, 115, 0.32, 0.5,  4],
              ['30%', 3, 140, 0.38, 0,    0],
              ['33%', 2, 115, 0.32, 0.5, -4],
              // left wingtip (~12%)
              ['12%', 1,  85, 0.18, 1,    6],
              // right engine cluster (~68% from left)
              ['65%', 2, 115, 0.32, 0.5,  4],
              ['68%', 3, 140, 0.38, 0,    0],
              ['71%', 2, 115, 0.32, 0.5, -4],
              // right wingtip (~88%)
              ['87%', 1,  85, 0.18, 1,   -6],
            ] as const).map(([left, w, h, op, blur, rot], i) => (
              <div
                key={i}
                className="absolute pointer-events-none"
                style={{
                  left, top: '50%',
                  width: w, height: h,
                  background: `linear-gradient(to bottom, rgba(255,255,255,${op}) 0%, rgba(210,228,255,${op * 0.4}) 55%, transparent 100%)`,
                  filter: `blur(${blur}px)`,
                  transform: `rotate(${rot}deg)`,
                  transformOrigin: 'top center',
                }}
              />
            ))}

            <img
              src={planeImg}
              alt="Aircraft"
              className="w-full object-contain relative"
              style={{ display: 'block', filter: 'drop-shadow(0 16px 28px rgba(13,27,56,0.16)) drop-shadow(0 3px 6px rgba(13,27,56,0.09))' }}
            />
          </motion.div>
        </div>

      </motion.div>
    </div>
  );
}
