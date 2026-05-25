interface LogoProps {
  variant?: 'default' | 'white'
  size?: 'sm' | 'md' | 'lg'
}

export function Logo({ variant = 'default', size = 'md' }: LogoProps) {
  const isWhite = variant === 'white'

  const navy      = isWhite ? '#ffffff'              : '#1a2f5a'
  const blue      = isWhite ? '#a8cce8'              : '#4a90d9'
  const blueLight = isWhite ? 'rgba(255,255,255,0.6)': '#7ab5e0'
  const subColor  = isWhite ? 'rgba(255,255,255,0.55)': 'rgba(26,47,90,0.45)'

  const cfg = {
    sm: { w: 32,  h: 31,  fontSize: 12, subSize: 6.5, gap: 7  },
    md: { w: 46,  h: 44,  fontSize: 16, subSize: 7.5, gap: 10 },
    lg: { w: 62,  h: 59,  fontSize: 21, subSize: 9.5, gap: 13 },
  }[size]

  return (
    <div className="flex items-center" style={{ gap: cfg.gap }}>

      {/* ── Icon mark ─────────────────────────────────────────── */}
      <svg
        width={cfg.w}
        height={cfg.h}
        viewBox="0 0 148 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/*
          Location-pin with ring cutout.
          Outer teardrop + inner circle → evenodd = ring at top, solid tail.
        */}
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          fill={navy}
          d="
            M 55 4
            C 29 4  8 25  8 51
            C  8 80 55 122 55 122
            C 55 122 102 80 102 51
            C 102 25  81 4  55 4 Z

            M 55 23
            C 42 23  31 34  31 47
            C 31 61  42 72  55 72
            C 68 72  79 61  79 47
            C 79 34  68 23  55 23 Z
          "
        />

        {/*
          Primary swoosh — wide sky-blue ribbon sweeping
          from lower-left of pin to upper-right toward the airplane.
        */}
        <path
          fill={blue}
          d="
            M 124 9
            C 108 17  89 29  70 42
            C 53 54  36 65  27 78
            L 31 84
            C 42 72  59 61  76 49
            C 95 36 114 24 126 16
            Z
          "
        />

        {/*
          Secondary swoosh — thinner parallel arc below the primary,
          giving the double-curve speed-line effect.
        */}
        <path
          fill={blueLight}
          opacity="0.9"
          d="
            M 115 24
            C 99 33  80 45  61 58
            C 44 70  28 81  19 94
            L 23 98
            C 34 86  50 75  67 63
            C 86 50 105 38 117 30
            Z
          "
        />

        {/*
          Airplane silhouette — dark navy, pointing upper-right.
          Drawn pointing north (up), rotated 45° CW to face northeast.
          Centered at (124, 11) in viewBox coords.
        */}
        <g transform="translate(124,11) rotate(45)">
          {/* Fuselage — cigar shape */}
          <path
            fill={navy}
            d="
              M 0 -15
              C -2.5 -15  -3 -9  -3 0
              C -3  9  -2  13  -1.5 16
              L  1.5 16
              C  2  13   3  9   3  0
              C  3 -9   2.5 -15  0 -15 Z
            "
          />
          {/* Main swept wings */}
          <path
            fill={navy}
            d="M -3 -1  L -17  7  L -15  10  L -3  5  L 3  5  L 15  10  L 17  7  L 3 -1 Z"
          />
          {/* Horizontal tail stabilizers */}
          <path
            fill={navy}
            d="M -2 10  L -8 15  L -7 17  L -2 13  L 2 13  L 7 17  L 8 15  L 2 10 Z"
          />
        </g>
      </svg>

      {/* ── Wordmark ───────────────────────────────────────────── */}
      <div className="flex flex-col" style={{ lineHeight: 1 }}>

        {/* NEXT · ROUTE */}
        <div className="flex items-baseline" style={{ gap: 5 }}>
          <span
            style={{
              fontFamily: "'Clash Display', sans-serif",
              fontWeight: 700,
              fontSize: cfg.fontSize,
              letterSpacing: '0.06em',
              color: navy,
              textTransform: 'uppercase',
            }}
          >
            NEXT
          </span>
          <span
            style={{
              fontFamily: "'Clash Display', sans-serif",
              fontWeight: 700,
              fontSize: cfg.fontSize,
              letterSpacing: '0.06em',
              color: blue,
              textTransform: 'uppercase',
            }}
          >
            ROUTE
          </span>
        </div>

        {/* — TRAVELS — */}
        <div className="flex items-center mt-[5px]" style={{ gap: 5 }}>
          <div style={{ height: 1, width: 14, backgroundColor: subColor }} />
          <span
            style={{
              fontFamily: "'Satoshi', sans-serif",
              fontWeight: 500,
              fontSize: cfg.subSize,
              letterSpacing: '0.28em',
              color: subColor,
              textTransform: 'uppercase',
            }}
          >
            TRAVELS
          </span>
          <div style={{ height: 1, width: 14, backgroundColor: subColor }} />
        </div>

      </div>
    </div>
  )
}
