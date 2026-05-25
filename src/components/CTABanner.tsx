import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import planeImg from '@/assets/plane.jpeg';

interface CTABannerProps {
  heading1?: string;
  heading2?: string;
  headingAccent?: string;
  sub?: string;
}

export function CTABanner({
  heading1 = 'Your Next Adventure',
  heading2 = 'Starts',
  headingAccent = 'Here.',
  sub = "Tell us where you want to go — we'll take care of everything else.",
}: CTABannerProps) {
  return (
    <div className="px-4 lg:px-16 mt-15 md:my-24 max-w-6xl mx-auto">
      <motion.div
        className="relative rounded-3xl flex flex-col lg:flex-row lg:items-stretch overflow-hidden lg:overflow-visible"
        style={{
          background: 'linear-gradient(135deg, #eef2ff 0%, #f8faff 55%, #eff6ff 100%)',
        }}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: '-100px' }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Left: content */}
        <div className="relative z-10 flex flex-col justify-center lg:w-[55%] px-7 lg:px-16 py-10 lg:py-14">

          <h2
            className="font-bold tracking-tight leading-[1.1]"
            style={{ fontFamily: 'Clash Display, sans-serif' }}
          >
            <motion.span
              className="block text-3xl lg:text-5xl text-gray-900"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {heading1}
            </motion.span>
            <motion.span
              className="block text-3xl lg:text-5xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <span className="text-gray-900">{heading2} </span>
              <span className="bg-gradient-to-br from-blue-600 to-blue-900 bg-clip-text text-transparent">
                {headingAccent}
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
            {sub}
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
              className="justify-center px-8 text-white inline-flex items-center rounded-full select-none hover:scale-[1.02] active:scale-[0.97] transition-transform duration-200"
              style={{
                height:     52,
                fontFamily: 'Satoshi, sans-serif',
                fontSize:   15,
                fontWeight: 600,
                background: 'linear-gradient(135deg, #1a3566 0%, #0d1b38 100%)',
                boxShadow:  '0 8px 24px rgba(13,27,56,0.25)',
              }}
            >
              Book a Trip
            </Link>

            <Link
              to="/services"
              className="flex items-center gap-1.5 text-sm font-medium group text-gray-400 hover:text-gray-700 transition-colors duration-200"
              style={{ fontFamily: 'Satoshi, sans-serif' }}
            >
              <span>Explore Services</span>
              <ArrowUpRight
                size={13}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
              />
            </Link>
          </motion.div>

        </div>

        {/* Right: plane image — overflows card top/right on desktop */}
        <div className="lg:w-[45%] flex items-center justify-center overflow-hidden lg:overflow-visible">
          <motion.img
            src={planeImg}
            alt="Aircraft"
            className="w-full max-w-sm lg:max-w-none object-contain lg:scale-125 lg:-translate-y-10 lg:translate-x-6"
            style={{ display: 'block' }}
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity }}
          />
        </div>

      </motion.div>
    </div>
  );
}
