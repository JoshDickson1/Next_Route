/* ─── PageTransition ──────────────────────────────────────────────────────────
   Wrapper for per-page enter/exit animations.
   Currently a passthrough — add motion when ready.
   ─────────────────────────────────────────────────────────────────────────── */

import { ReactNode } from 'react'

export function PageTransition({ children }: { children: ReactNode }) {
  return <>{children}</>
}
