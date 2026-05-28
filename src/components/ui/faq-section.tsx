"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

export interface FaqItem {
  q: string;
  a: string;
}

interface FaqSectionProps {
  items:    FaqItem[];
  image?:   string;
  eyebrow?: string;
  heading?: string;
  sub?:     string;
}

// ── Single accordion row ──────────────────────────────────────────────────────

function AccordionItem({
  item, index, isOpen, onToggle,
}: {
  item:     FaqItem;
  index:    number;
  isOpen:   boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "200px 0px -20px 0px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: index * 0.045 }}
      className="rounded-2xl overflow-hidden"
      style={{
        border:     isOpen ? "1px solid rgba(74,144,217,0.28)" : "1px solid rgba(13,27,56,0.08)",
        background: isOpen ? "rgba(74,144,217,0.04)"           : "#fff",
        transition: "border-color 0.3s ease, background 0.3s ease",
        boxShadow:  isOpen ? "0 4px 20px -4px rgba(74,144,217,0.12)" : "none",
      }}
    >
      {/* Header row */}
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer"
      >
        <span
          className="text-[15px] font-bold leading-snug"
          style={{ fontFamily: "Satoshi, sans-serif", color: "#0d1b38" }}
        >
          {item.q}
        </span>

        <motion.div
          className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center"
          animate={{
            background: isOpen ? "#4a90d9" : "rgba(13,27,56,0.07)",
          }}
          transition={{ duration: 0.25 }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isOpen ? (
              <motion.span key="minus" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }} transition={{ duration: 0.18 }}>
                <Minus className="w-3.5 h-3.5 text-white" />
              </motion.span>
            ) : (
              <motion.span key="plus" initial={{ opacity: 0, rotate: 90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: -90 }} transition={{ duration: 0.18 }}>
                <Plus className="w-3.5 h-3.5" style={{ color: "#0d1b38" }} />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </button>

      {/* Expanding answer */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p
              className="px-6 pb-6 text-sm leading-[1.85]"
              style={{ fontFamily: "Satoshi, sans-serif", color: "rgba(13,27,56,0.52)" }}
            >
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Eyebrow pill (reused in both layouts) ─────────────────────────────────────

function Eyebrow({ label }: { label: string }) {
  return (
    <div
      className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5"
      style={{ background: "rgba(74,144,217,0.1)", border: "1px solid rgba(74,144,217,0.22)" }}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-[#4a90d9]" />
      <span
        className="text-[11px] font-black uppercase tracking-[0.2em] text-[#4a90d9]"
        style={{ fontFamily: "Satoshi, sans-serif" }}
      >
        {label}
      </span>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────

export function FaqSection({
  items,
  image,
  eyebrow = "FAQ",
  heading = "Frequently Asked Questions",
  sub,
}: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  // ── Split layout (image + accordion) ──────────────────────────────────────
  if (image) {
    return (
      <div className="flex flex-col lg:flex-row items-start gap-10 xl:gap-16">

        {/* Left: image card */}
        <motion.div
          className="w-full lg:w-[380px] shrink-0"
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: "200px 0px -60px 0px" }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="relative rounded-3xl overflow-hidden"
            style={{
              aspectRatio: "3/4",
              boxShadow: "0 24px 72px -12px rgba(13,27,56,0.22)",
            }}
          >
            <img
              src={image}
              alt="FAQ illustration"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              style={{ objectPosition: "center 35%" }}
            />
            {/* Gradient overlays */}
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to top, rgba(13,27,56,0.88) 0%, rgba(13,27,56,0.3) 50%, transparent 75%)" }}
            />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to right, rgba(74,144,217,0.25) 0%, transparent 60%)" }}
            />

            {/* Bottom label */}
            <div className="absolute bottom-0 left-0 right-0 p-7">
              <div
                className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 mb-4"
                style={{ background: "rgba(74,144,217,0.2)", border: "1px solid rgba(74,144,217,0.3)", backdropFilter: "blur(8px)" }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-300" style={{ fontFamily: "Satoshi, sans-serif" }}>
                  Support
                </span>
              </div>
              <p className="text-white font-black text-2xl leading-[1.1]" style={{ fontFamily: "Clash Display, sans-serif" }}>
                We're here<br />to help.
              </p>
              <p className="text-white/45 text-xs mt-2" style={{ fontFamily: "Satoshi, sans-serif" }}>
                Answering within a few hours, 6 days a week.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Right: accordion */}
        <motion.div
          className="flex-1 min-w-0"
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: "200px 0px -60px 0px" }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
        >
          <Eyebrow label={eyebrow} />
          <h2
            className="text-3xl md:text-4xl font-black tracking-tight leading-[0.95] mb-3"
            style={{ fontFamily: "Clash Display, sans-serif", color: "#0d1b38" }}
          >
            {heading}
          </h2>
          {sub && (
            <p
              className="text-sm leading-[1.75] mb-8 max-w-lg"
              style={{ fontFamily: "Satoshi, sans-serif", color: "rgba(13,27,56,0.48)" }}
            >
              {sub}
            </p>
          )}

          <div className="space-y-2.5">
            {items.map((item, i) => (
              <AccordionItem
                key={i}
                item={item}
                index={i}
                isOpen={openIndex === i}
                onToggle={() => toggle(i)}
              />
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  // ── Centered layout (no image) ─────────────────────────────────────────────
  return (
    <div className="max-w-2xl mx-auto text-center">
      <Eyebrow label={eyebrow} />
      <h2
        className="text-3xl md:text-4xl font-black tracking-tight leading-[0.95] mb-3"
        style={{ fontFamily: "Clash Display, sans-serif", color: "#0d1b38" }}
      >
        {heading}
      </h2>
      {sub && (
        <p
          className="text-sm leading-[1.75] mb-10"
          style={{ fontFamily: "Satoshi, sans-serif", color: "rgba(13,27,56,0.48)" }}
        >
          {sub}
        </p>
      )}
      <div className="space-y-2.5 text-left mt-8">
        {items.map((item, i) => (
          <AccordionItem
            key={i}
            item={item}
            index={i}
            isOpen={openIndex === i}
            onToggle={() => toggle(i)}
          />
        ))}
      </div>
    </div>
  );
}
