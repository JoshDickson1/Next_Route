import * as React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface DestinationCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imageUrl: string;
  location: string;
  flag: string;
  stats: string;
  href: string;
  themeColor: string;
}

const DestinationCard = React.forwardRef<HTMLDivElement, DestinationCardProps>(
  ({ className, imageUrl, location, flag, stats, href, themeColor, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        style={{ "--theme-color": themeColor } as React.CSSProperties}
        className={cn("group w-full h-full", className)}
        whileHover={{ scale: 1.025, y: -4 }}
        transition={{ type: 'spring', stiffness: 260, damping: 18 }}
        {...(props as React.ComponentPropsWithoutRef<typeof motion.div>)}
      >
        <Link
          to={href}
          className="relative block w-full h-full rounded-2xl overflow-hidden"
          aria-label={`Explore ${location}`}
          style={{
            boxShadow: `0 4px 28px -8px hsl(var(--theme-color) / 0.35)`,
          }}
        >
          {/* Background image with spring zoom */}
          <motion.div
            className="absolute inset-0 bg-cover bg-center will-change-transform"
            style={{ backgroundImage: `url(${imageUrl})` }}
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          />

          {/* Glow bloom on hover */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            style={{ boxShadow: `inset 0 0 60px hsl(var(--theme-color) / 0.3)` }}
          />

          {/* Themed gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to top, hsl(var(--theme-color) / 0.95) 0%, hsl(var(--theme-color) / 0.58) 38%, transparent 68%)`,
            }}
          />

          {/* Content */}
          <div className="relative flex flex-col justify-end h-full p-6 text-white">
            <motion.div
              initial={{ y: 4, opacity: 0.85 }}
              whileHover={{ y: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 320, damping: 22 }}
            >
              <h3 className="font-black tracking-tight leading-none" style={{ fontFamily: 'Clash Display, sans-serif', fontSize: 'clamp(24px, 3vw, 32px)' }}>
                {location} <span className="text-2xl ml-1">{flag}</span>
              </h3>
              <p className="text-sm text-white/70 mt-1.5 font-medium" style={{ fontFamily: 'Satoshi, sans-serif' }}>{stats}</p>
            </motion.div>

            {/* CTA bar */}
            <motion.div
              className="mt-5 flex items-center justify-between backdrop-blur-md rounded-xl px-4 py-3"
              initial={{ background: `hsl(var(--theme-color) / 0.22)` }}
              whileHover={{ background: `hsl(var(--theme-color) / 0.38)` }}
              transition={{ duration: 0.25 }}
              style={{ border: `1px solid hsl(var(--theme-color) / 0.35)` }}
            >
              <span className="text-sm font-semibold tracking-wide" style={{ fontFamily: 'Satoshi, sans-serif' }}>
                Explore Now
              </span>
              {/* Bordered arrow circle */}
              <motion.div
                className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                style={{ border: '1.5px solid rgba(255,255,255,0.45)', background: 'rgba(255,255,255,0.1)' }}
                whileHover={{ background: 'rgba(255,255,255,0.22)', borderColor: 'rgba(255,255,255,0.7)' }}
                transition={{ duration: 0.2 }}
              >
                <ArrowRight className="h-3.5 w-3.5" />
              </motion.div>
            </motion.div>
          </div>
        </Link>
      </motion.div>
    );
  }
);
DestinationCard.displayName = "DestinationCard";

export { DestinationCard };
