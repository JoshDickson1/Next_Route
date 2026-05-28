import { useEffect, useRef, useCallback } from "react"
import createGlobe from "cobe"

interface Marker {
  id: string
  location: [number, number]  // [lat, lng]
  label: string
}

interface Arc {
  id: string
  from: [number, number]   // [lat, lng]
  to: [number, number]     // [lat, lng]
  label?: string
}

interface GlobeProps {
  markers?: Marker[]
  arcs?: Arc[]
  className?: string
  markerColor?: [number, number, number]
  baseColor?: [number, number, number]
  arcColor?: [number, number, number]
  glowColor?: [number, number, number]
  dark?: number
  mapBrightness?: number
  markerSize?: number
  markerElevation?: number
  arcWidth?: number
  arcHeight?: number
  speed?: number
  theta?: number
  diffuse?: number
  mapSamples?: number
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function projectPoint(lat: number, lng: number, phi: number, theta: number, width: number) {
  const la = (lat * Math.PI) / 180
  const lo = (lng * Math.PI) / 180
  const loEff = lo - phi
  const x    = Math.cos(la) * Math.sin(loEff)
  const yPre = Math.sin(la)
  const zPre = Math.cos(la) * Math.cos(loEff)
  const y    = yPre * Math.cos(theta) - zPre * Math.sin(theta)
  const z    = yPre * Math.sin(theta) + zPre * Math.cos(theta)
  return { x: (0.5 + x * 0.5) * width, y: (0.5 - y * 0.5) * width, z }
}

function slerpLatLng(
  lat1: number, lng1: number,
  lat2: number, lng2: number,
  t: number,
): [number, number] {
  const φ1 = (lat1 * Math.PI) / 180, λ1 = (lng1 * Math.PI) / 180
  const φ2 = (lat2 * Math.PI) / 180, λ2 = (lng2 * Math.PI) / 180
  const x1 = Math.cos(φ1) * Math.cos(λ1), y1 = Math.cos(φ1) * Math.sin(λ1), z1 = Math.sin(φ1)
  const x2 = Math.cos(φ2) * Math.cos(λ2), y2 = Math.cos(φ2) * Math.sin(λ2), z2 = Math.sin(φ2)
  const dot   = Math.min(1, Math.max(-1, x1*x2 + y1*y2 + z1*z2))
  const omega = Math.acos(dot)
  let xi, yi, zi
  if (Math.abs(omega) < 1e-4) {
    xi = x1; yi = y1; zi = z1
  } else {
    const s  = Math.sin(omega)
    const w1 = Math.sin((1 - t) * omega) / s
    const w2 = Math.sin(t * omega) / s
    xi = w1 * x1 + w2 * x2
    yi = w1 * y1 + w2 * y2
    zi = w1 * z1 + w2 * z2
  }
  return [
    (Math.atan2(zi, Math.sqrt(xi * xi + yi * yi)) * 180) / Math.PI,
    (Math.atan2(yi, xi) * 180) / Math.PI,
  ]
}

// ── Component ─────────────────────────────────────────────────────────────────

export function Globe({
  markers = [],
  arcs = [],
  className = "",
  markerColor = [0.3, 0.45, 0.85],
  baseColor   = [1, 1, 1],
  arcColor    = [0.3, 0.45, 0.85],
  glowColor   = [0.94, 0.93, 0.91],
  dark           = 0,
  mapBrightness  = 10,
  markerSize     = 0.025,
  markerElevation = 0.01,
  arcWidth  = 0.5,
  arcHeight = 0.25,
  speed     = 0.003,
  theta     = 0.2,
  diffuse   = 1.5,
  mapSamples = 16000,
}: GlobeProps) {
  const canvasRef        = useRef<HTMLCanvasElement>(null)
  const svgRef           = useRef<SVGSVGElement>(null)
  const svgPathsRef      = useRef<Map<string, SVGPathElement>>(new Map())
  const pointerInteracting = useRef<{ x: number; y: number } | null>(null)
  const lastPointer      = useRef<{ x: number; y: number; t: number } | null>(null)
  const dragOffset       = useRef({ phi: 0, theta: 0 })
  const velocity         = useRef({ phi: 0, theta: 0 })
  const phiOffsetRef     = useRef(0)
  const thetaOffsetRef   = useRef(0)
  const isPausedRef      = useRef(false)
  const currentPhiRef    = useRef(0)
  const currentThetaRef  = useRef(theta)

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    pointerInteracting.current = { x: e.clientX, y: e.clientY }
    if (canvasRef.current) canvasRef.current.style.cursor = "grabbing"
    isPausedRef.current = true
  }, [])

  const handlePointerMove = useCallback((e: PointerEvent) => {
    if (pointerInteracting.current !== null) {
      const dx = e.clientX - pointerInteracting.current.x
      const dy = e.clientY - pointerInteracting.current.y
      dragOffset.current = { phi: dx / 300, theta: dy / 1000 }
      const now = Date.now()
      if (lastPointer.current) {
        const dt = Math.max(now - lastPointer.current.t, 1)
        const mv = 0.15
        velocity.current = {
          phi:   Math.max(-mv, Math.min(mv, ((e.clientX - lastPointer.current.x) / dt) * 0.3)),
          theta: Math.max(-mv, Math.min(mv, ((e.clientY - lastPointer.current.y) / dt) * 0.08)),
        }
      }
      lastPointer.current = { x: e.clientX, y: e.clientY, t: now }
    }
  }, [])

  const handlePointerUp = useCallback(() => {
    if (pointerInteracting.current !== null) {
      phiOffsetRef.current   += dragOffset.current.phi
      thetaOffsetRef.current += dragOffset.current.theta
      dragOffset.current = { phi: 0, theta: 0 }
      lastPointer.current = null
    }
    pointerInteracting.current = null
    if (canvasRef.current) canvasRef.current.style.cursor = "grab"
    isPausedRef.current = false
  }, [])

  useEffect(() => {
    window.addEventListener("pointermove", handlePointerMove, { passive: true })
    window.addEventListener("pointerup",   handlePointerUp,   { passive: true })
    return () => {
      window.removeEventListener("pointermove", handlePointerMove)
      window.removeEventListener("pointerup",   handlePointerUp)
    }
  }, [handlePointerMove, handlePointerUp])

  useEffect(() => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current
    let globe: ReturnType<typeof createGlobe> | null = null
    let animationId: number
    let phi = 0

    function updateSvgArcs(width: number) {
      const curPhi   = currentPhiRef.current
      const curTheta = currentThetaRef.current
      arcs.forEach((arc) => {
        const el = svgPathsRef.current.get(arc.id)
        if (!el) return
        const N = 96
        let d = "", pen = false
        for (let i = 0; i <= N; i++) {
          const t = i / N
          const [lat, lng] = slerpLatLng(arc.from[0], arc.from[1], arc.to[0], arc.to[1], t)
          const { x, y, z } = projectPoint(lat, lng, curPhi, curTheta, width)
          if (z > 0.01) {
            d  += pen ? ` L${x.toFixed(1)} ${y.toFixed(1)}` : `M${x.toFixed(1)} ${y.toFixed(1)}`
            pen = true
          } else {
            pen = false
          }
        }
        el.setAttribute("d", d)
      })
    }

    function init() {
      const width = canvas.offsetWidth
      if (width === 0 || globe) return

      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      globe = createGlobe(canvas, {
        devicePixelRatio: dpr,
        width,
        height: width,
        phi: 0,
        theta,
        dark,
        diffuse,
        mapSamples,
        mapBrightness,
        baseColor,
        markerColor,
        glowColor,
        markerElevation,
        markers: markers.map((m) => ({ location: m.location, size: markerSize, id: m.id })),
        arcs: [],      // native arcs disabled — SVG overlay handles rendering
        arcColor,
        arcWidth,
        arcHeight,
        opacity: 0.7,
      })

      function animate() {
        if (!isPausedRef.current) {
          phi += speed
          if (Math.abs(velocity.current.phi) > 0.0001 || Math.abs(velocity.current.theta) > 0.0001) {
            phiOffsetRef.current   += velocity.current.phi
            thetaOffsetRef.current += velocity.current.theta
            velocity.current.phi   *= 0.95
            velocity.current.theta *= 0.95
          }
          const tMin = -0.4, tMax = 0.4
          if      (thetaOffsetRef.current < tMin) thetaOffsetRef.current += (tMin - thetaOffsetRef.current) * 0.1
          else if (thetaOffsetRef.current > tMax) thetaOffsetRef.current += (tMax - thetaOffsetRef.current) * 0.1
        }

        const totalPhi   = phi + phiOffsetRef.current + dragOffset.current.phi
        const totalTheta = theta + thetaOffsetRef.current + dragOffset.current.theta
        currentPhiRef.current   = totalPhi
        currentThetaRef.current = totalTheta

        globe!.update({
          phi: totalPhi, theta: totalTheta,
          dark, mapBrightness, markerColor, baseColor, arcColor, markerElevation,
          markers: markers.map((m) => ({ location: m.location, size: markerSize, id: m.id })),
          arcs: [],
        })

        updateSvgArcs(width)
        animationId = requestAnimationFrame(animate)
      }
      animate()
      setTimeout(() => canvas && (canvas.style.opacity = "1"))
    }

    if (canvas.offsetWidth > 0) {
      init()
    } else {
      const ro = new ResizeObserver((entries) => {
        if (entries[0]?.contentRect.width > 0) { ro.disconnect(); init() }
      })
      ro.observe(canvas)
    }

    return () => {
      if (animationId) cancelAnimationFrame(animationId)
      if (globe) globe.destroy()
    }
  }, [markers, arcs, markerColor, baseColor, arcColor, glowColor, dark, mapBrightness, markerSize, markerElevation, arcWidth, arcHeight, speed, theta, diffuse, mapSamples])

  return (
    <div className={`relative aspect-square select-none ${className}`}>
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        style={{
          width: "100%", height: "100%",
          cursor: "grab", opacity: 0,
          transition: "opacity 1.2s ease",
          borderRadius: "50%", touchAction: "none",
        }}
      />

      {/* SVG dashed arc overlay */}
      <svg
        ref={svgRef}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", overflow: "visible" }}
      >
        {arcs.map((arc) => (
          <path
            key={arc.id}
            ref={(el) => {
              if (el) svgPathsRef.current.set(arc.id, el)
              else svgPathsRef.current.delete(arc.id)
            }}
            fill="none"
            stroke="rgba(168,204,232,0.45)"
            strokeWidth="0.75"
            strokeDasharray="3 6"
            strokeLinecap="round"
          />
        ))}
      </svg>

      {/* Marker labels via CSS Anchor Positioning — cobe sets anchor-name + --cobe-visible-{id} */}
      {markers.map((m) => (
        <div
          key={m.id}
          style={{
            position: "absolute",
            // @ts-expect-error CSS Anchor Positioning — set natively by cobe on the canvas
            positionAnchor: `--cobe-${m.id}`,
            bottom: "anchor(top)",
            left: "anchor(center)",
            translate: "-50% 0",
            marginBottom: 10,
            padding: "3px 8px",
            background: "rgba(13,27,56,0.90)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(168,204,232,0.22)",
            borderRadius: 6,
            color: "rgba(168,204,232,0.95)",
            fontFamily: "Satoshi, sans-serif",
            fontSize: "0.6rem",
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase" as const,
            whiteSpace: "nowrap" as const,
            pointerEvents: "none" as const,
            boxShadow: "0 2px 12px rgba(0,0,0,0.35)",
            opacity: `var(--cobe-visible-${m.id}, 0)`,
            filter: `blur(calc((1 - var(--cobe-visible-${m.id}, 0)) * 6px))`,
            transition: "opacity 0.5s ease, filter 0.5s ease",
          }}
        >
          {m.label}
          <span
            style={{
              position: "absolute",
              top: "100%", left: "50%",
              transform: "translate3d(-50%, -1px, 0)",
              border: "4px solid transparent",
              borderTopColor: "rgba(168,204,232,0.22)",
            }}
          />
        </div>
      ))}
    </div>
  )
}
