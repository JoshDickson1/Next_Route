"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

export type GalleryImageItem = {
  id: number | string;
  title: string;
  desc: string;
  url: string;
  span: string;
};

interface BentoGalleryProps {
  imageItems: GalleryImageItem[];
  title: string;
  description: string;
  dark?: boolean;
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { type: 'spring' as const, stiffness: 100, damping: 15 },
  },
};

function ImageModal({ item, onClose }: { item: GalleryImageItem; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
        className="relative w-full max-w-4xl p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={item.url}
          alt={item.title}
          className="h-auto max-h-[90vh] w-full rounded-2xl object-contain"
        />
        <div className="mt-4 text-center">
          <p className="text-white font-black text-xl" style={{ fontFamily: 'Clash Display, sans-serif' }}>{item.title}</p>
          <p className="text-white/50 text-sm mt-1" style={{ fontFamily: 'Satoshi, sans-serif' }}>{item.desc}</p>
        </div>
      </motion.div>
      <button
        onClick={onClose}
        className="absolute right-4 top-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white/80 hover:text-white hover:bg-white/20 transition-all cursor-pointer"
        aria-label="Close"
      >
        <X size={18} />
      </button>
    </motion.div>
  );
}

export default function BentoGallery({ imageItems, title, description, dark = true }: BentoGalleryProps) {
  const [selectedItem, setSelectedItem] = useState<GalleryImageItem | null>(null);
  const [dragConstraint, setDragConstraint] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef      = useRef<HTMLDivElement>(null);
  const targetRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const calc = () => {
      if (gridRef.current && containerRef.current) {
        const gap = containerRef.current.offsetWidth - gridRef.current.scrollWidth - 32;
        setDragConstraint(Math.min(0, gap));
      }
    };
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, [imageItems]);

  const { scrollYProgress } = useScroll({ target: targetRef, offset: ['start end', 'end start'] });
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y       = useTransform(scrollYProgress, [0, 0.2], [30, 0]);

  return (
    <section ref={targetRef} className="relative w-full overflow-hidden py-16 sm:py-24">
      <motion.div style={{ opacity, y }} className="max-w-7xl mx-auto px-6 text-center mb-12">
        <div
          className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5 backdrop-blur-sm"
          style={{
            border: dark ? '1px solid rgba(255,255,255,0.15)' : '1px solid rgba(13,27,56,0.12)',
            background: dark ? 'rgba(255,255,255,0.05)' : 'rgba(13,27,56,0.05)',
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
          <span
            className="text-[11px] font-semibold tracking-[0.2em] uppercase"
            style={{ fontFamily: 'Satoshi, sans-serif', color: dark ? 'rgba(255,255,255,0.5)' : 'rgba(13,27,56,0.5)' }}
          >Gallery</span>
        </div>
        <h2
          className="text-4xl md:text-5xl font-black tracking-tight"
          style={{ fontFamily: 'Clash Display, sans-serif', color: dark ? '#fff' : '#0d1b38' }}
        >{title}</h2>
        <p
          className="mt-4 max-w-xl mx-auto"
          style={{ fontFamily: 'Satoshi, sans-serif', color: dark ? 'rgba(255,255,255,0.4)' : 'rgba(13,27,56,0.5)' }}
        >{description}</p>
      </motion.div>

      <div ref={containerRef} className="relative w-full cursor-grab active:cursor-grabbing">
        <motion.div
          className="w-max"
          drag="x"
          dragConstraints={{ left: dragConstraint, right: 0 }}
          dragElastic={0.05}
        >
          <motion.div
            ref={gridRef}
            className="grid auto-cols-[minmax(15rem,1fr)] grid-flow-col gap-4 px-6 md:px-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
          >
            {imageItems.map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className={cn(
                  'group relative flex h-full min-h-[15rem] w-full min-w-[15rem] cursor-pointer items-end overflow-hidden rounded-2xl p-4',
                  item.span,
                )}
                style={{ border: '1px solid rgba(168,204,232,0.08)' }}
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                onClick={() => setSelectedItem(item)}
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setSelectedItem(item)}
                aria-label={`View ${item.title}`}
              >
                <img
                  src={item.url}
                  alt={item.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative z-10 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <h3 className="text-base font-black text-white" style={{ fontFamily: 'Clash Display, sans-serif' }}>{item.title}</h3>
                  <p className="mt-0.5 text-sm text-white/70" style={{ fontFamily: 'Satoshi, sans-serif' }}>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedItem && <ImageModal item={selectedItem} onClose={() => setSelectedItem(null)} />}
      </AnimatePresence>
    </section>
  );
}
