# Next Route Travels — Claude Code Standards

## Design Skills (always active)
Always use /ui-ux-pro-max and /taste skills for any UI work.
Use /emil-design-eng for animations, transitions, and micro-interactions.
Use Magic MCP to source components before building from scratch.
Use Playwright MCP to screenshot localhost:5176 and verify visual changes after edits.

## Design System

**Typography**
- Headings: `Clash Display` (font-black, tight tracking, leading-[0.98])
- Body / UI: `Satoshi` (font-medium or font-semibold for labels)
- Always set fontFamily inline via `style={{ fontFamily: 'Clash Display, sans-serif' }}` or `'Satoshi, sans-serif'`

**Brand Palette**
- Navy dark (primary bg):   `#0d1b38`
- Navy mid:                 `#1a2f5a`
- Navy light:               `#243a6e`
- Blue accent:              `#4a90d9`
- Blue light:               `#a8cce8`
- Blue pale:                `#e8f2fb`
- Off-white:                `#f5f8fc`
- Gold (hub marker):        `#f5d27a`

**Motion (Framer Motion)**
- Standard spring: `{ type: 'spring', stiffness: 400, damping: 32 }`
- Scroll reveal ease: `[0.22, 1, 0.36, 1]` at duration 0.65–0.95s
- `viewport: { once: false, margin: '-80px' }` for scroll-repeat animations
- Variant propagation for hover: parent `whileHover="hover"` → child reads same variant

**Glass / surface styles**
- Dark glass: `bg-[rgba(13,27,56,0.92)]` + `backdropFilter: blur(80px) saturate(200%)`
- Light glass: `bg-[rgba(255,255,255,0.20)]` + same backdrop
- Liquid glass: use `.liquid-glass` utility class (defined in index.css)

**Component patterns**
- Buttons: flat pill — label left, white circle + arrow right, spring hover `y: -1` / arrow `x: 2`
- Cards: `rounded-2xl` or `rounded-3xl`, `border border-white/[0.08]`
- Section spacing: `py-20 sm:py-28 px-4 sm:px-8`
- Max width container: `max-w-7xl mx-auto`

## Stack
- Vite + React 19 + TypeScript + Tailwind CSS v4
- Framer Motion v12
- react-i18next (6 locales: en, ar, sw, it, el, es) — always wrap new strings in `t()`
- React Router v7 (BrowserRouter, lazy pages)
- Lenis smooth scroll — use `getLenis()?.scrollTo()` for programmatic scroll
- MapLibre GL via custom `Map` component (theme: `"light"` for brand globe)
- Radix UI primitives + shadcn/ui components in `src/components/ui/`

## Key files
- `src/index.css` — all global CSS, keyframes, utility classes
- `src/components/sections/` — page sections (Hero, LocationsGlobe, etc.)
- `src/components/Navbar.tsx` — fixed pill navbar, scroll-triggered bg change at 110vh
- `src/components/LoadingScreen.tsx` — cinematic intro sequence
- `public/locales/` — i18n translation files
- `public/assets/` — logo.png, plane image (one.png), destination images

## Conventions
- No comments unless the WHY is non-obvious
- No new files unless required — prefer editing existing components
- Tailwind for layout/spacing, inline `style` for brand colors and font-family
- `whileInView` with `once: false` for all scroll animations (repeat on scroll back)
- Stats/numbers use `CountUp` component with spring animation
