import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/providers/ThemeProvider';
import type { ReactNode } from 'react';

interface CutoutButtonProps {
  children: ReactNode;
  icon?: ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  size?: number;
}

export function CutoutButton({ children, icon, onClick, href, className, size = 52 }: CutoutButtonProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const Tag = (href ? 'a' : 'button') as 'a' | 'button';

  const glass = isDark
    ? {
        background: 'linear-gradient(180deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.04) 100%)',
        backdropFilter: 'blur(32px) saturate(200%) brightness(1.15)',
        WebkitBackdropFilter: 'blur(32px) saturate(200%) brightness(1.15)',
        border: '1px solid rgba(255,255,255,0.16)',
        boxShadow: [
          'inset 0 1.5px 0 rgba(255,255,255,0.22)',
          'inset 0 -1px 0 rgba(0,0,0,0.25)',
          '0 4px 24px rgba(0,0,0,0.40)',
          '0 1px 4px rgba(0,0,0,0.22)',
        ].join(', '),
        color: 'rgba(255,255,255,0.88)',
      }
    : {
        background: 'linear-gradient(180deg, #1a3566 0%, #0d1b38 100%)',
        border: '1px solid rgba(13,27,56,0.4)',
        boxShadow: [
          'inset 0 1.5px 0 rgba(255,255,255,0.14)',
          'inset 0 -1px 0 rgba(0,0,0,0.25)',
          '0 4px 20px rgba(13,27,56,0.3)',
          '0 1px 3px rgba(13,27,56,0.2)',
        ].join(', '),
        color: 'rgba(255,255,255,0.95)',
      };

  const iconBg    = isDark ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.15)';
  const iconColor = isDark ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.85)';
  const iconSize  = Math.round(size * 0.28);

  const fillColor      = isDark ? 'rgba(255,255,255,0.95)' : 'rgba(10,22,48,0.97)';
  const fillText       = isDark ? 'rgba(6,6,10,0.9)'      : 'rgba(255,255,255,0.98)';
  const iconColorHover = isDark ? 'rgba(6,6,10,0.85)'     : 'rgba(255,255,255,0.95)';

  const [hovered, setHovered] = useState(false);

  return (
    <Tag
      {...(href ? { href } : {})}
      {...(!href ? { type: 'button' as const } : {})}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        'group relative inline-flex items-center justify-center gap-2.5 rounded-full cursor-pointer select-none overflow-hidden',
        'transition-transform duration-[300ms] ease-out',
        'hover:scale-[1.02] active:scale-[0.97]',
        className,
      )}
      style={{
        height:       size,
        paddingLeft:  size * 0.55,
        paddingRight: size * 0.45,
        fontFamily:   'Satoshi, sans-serif',
        fontSize:     Math.round(size * 0.285),
        fontWeight:   600,
        letterSpacing: '0.01em',
        ...glass,
      }}
    >
      <span
        aria-hidden
        className="absolute inset-0 translate-x-full group-hover:translate-x-0 transition-transform duration-[480ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{ background: fillColor, borderRadius: 'inherit' }}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 pointer-events-none z-10"
        style={{
          height: '52%',
          background: isDark
            ? 'linear-gradient(180deg, rgba(255,255,255,0.10) 0%, transparent 100%)'
            : 'linear-gradient(180deg, rgba(255,255,255,0.25) 0%, transparent 100%)',
          borderRadius: 'inherit',
        }}
      />
      <span
        className="relative z-10 whitespace-nowrap"
        style={{
          transition: 'color 480ms cubic-bezier(0.4,0,0.2,1)',
          color: hovered ? fillText : undefined,
        }}
      >
        {children}
      </span>
      <div
        className="relative z-10 flex items-center justify-center rounded-full shrink-0 overflow-hidden"
        style={{
          width:     size * 0.58,
          height:    size * 0.58,
          background: iconBg,
          boxShadow: isDark
            ? 'inset 0 1px 0 rgba(255,255,255,0.1), inset 0 -1px 0 rgba(0,0,0,0.2)'
            : 'inset 0 1px 0 rgba(255,255,255,0.6), inset 0 -1px 0 rgba(0,0,0,0.06)',
        }}
      >
        <span
          aria-hidden
          className="absolute inset-0 translate-x-full group-hover:translate-x-0 transition-transform duration-[480ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
          style={{ background: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.2)', borderRadius: 'inherit' }}
        />
        <span className="relative z-10">
          {icon ?? (
            <ArrowUpRight
              size={iconSize}
              strokeWidth={2.5}
              style={{
                color: hovered ? iconColorHover : iconColor,
                transition: 'color 480ms cubic-bezier(0.4,0,0.2,1)',
              }}
            />
          )}
        </span>
      </div>
    </Tag>
  );
}
