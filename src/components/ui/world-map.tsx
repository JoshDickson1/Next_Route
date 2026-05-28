import { useRef, useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
// @ts-expect-error no bundled types
import DottedMap from "dotted-map"

interface MapDot {
  start: { lat: number; lng: number; label?: string }
  end:   { lat: number; lng: number; label?: string }
}

interface WorldMapProps {
  dots?:              MapDot[]
  lineColor?:         string
  dark?:              boolean
  showLabels?:        boolean
  animationDuration?: number
  loop?:              boolean
}

export function WorldMap({
  dots              = [],
  lineColor         = "#4a90d9",
  dark              = true,
  showLabels        = true,
  animationDuration = 2,
  loop              = true,
}: WorldMapProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null)

  const map = useMemo(() => new DottedMap({ height: 100, grid: "diagonal" }), [])

  const svgMap = useMemo(
    () =>
      map.getSVG({
        radius:          0.22,
        color:           dark ? "#a8cce814" : "#1a2f5a22",
        shape:           "circle",
        backgroundColor: dark ? "#0d1b38" : "#f5f8fc",
      }),
    [map, dark],
  )

  const projectPoint = (lat: number, lng: number) => ({
    x: (lng + 180) * (800 / 360),
    y: (90 - lat)  * (400 / 180),
  })

  const createCurvedPath = (
    start: { x: number; y: number },
    end:   { x: number; y: number },
  ) => {
    const midX = (start.x + end.x) / 2
    const midY = Math.min(start.y, end.y) - 60
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`
  }

  const staggerDelay       = 0.35
  const totalAnimationTime = dots.length * staggerDelay + animationDuration
  const pauseTime          = 1.5
  const fullCycleDuration  = totalAnimationTime + pauseTime

  return (
    <div
      className="w-full aspect-[2/1] relative font-sans overflow-hidden"
      style={{ background: dark ? "#0d1b38" : "#f5f8fc" }}
    >
      {/* Dotted world map raster */}
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className="h-full w-full pointer-events-none select-none object-cover"
        style={{
          maskImage: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.8) 12%, rgba(0,0,0,0.8) 88%, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.8) 12%, rgba(0,0,0,0.8) 88%, transparent)",
        }}
        alt="world map"
        draggable={false}
      />

      {/* SVG overlay for paths + markers */}
      <svg
        ref={svgRef}
        viewBox="0 0 800 400"
        className="w-full h-full absolute inset-0 pointer-events-auto select-none"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="white"     stopOpacity="0" />
            <stop offset="5%"   stopColor={lineColor} stopOpacity="1" />
            <stop offset="95%"  stopColor={lineColor} stopOpacity="1" />
            <stop offset="100%" stopColor="white"     stopOpacity="0" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Animated route paths */}
        {dots.map((dot, i) => {
          const startPt = projectPoint(dot.start.lat, dot.start.lng)
          const endPt   = projectPoint(dot.end.lat,   dot.end.lng)
          const pathD   = createCurvedPath(startPt, endPt)

          const startTime = (i * staggerDelay) / fullCycleDuration
          const endTime   = (i * staggerDelay + animationDuration) / fullCycleDuration
          const resetTime = totalAnimationTime / fullCycleDuration

          return (
            <g key={`path-${i}`}>
              <motion.path
                d={pathD}
                fill="none"
                stroke="url(#path-gradient)"
                strokeWidth="1.2"
                initial={{ pathLength: 0 }}
                animate={loop ? { pathLength: [0, 0, 1, 1, 0] } : { pathLength: 1 }}
                transition={
                  loop
                    ? { duration: fullCycleDuration, times: [0, startTime, endTime, resetTime, 1], ease: "easeInOut", repeat: Infinity }
                    : { duration: animationDuration, delay: i * staggerDelay, ease: "easeInOut" }
                }
              />
              {loop && (
                <motion.circle
                  r="3.5"
                  fill={lineColor}
                  filter="url(#glow)"
                  initial={{ offsetDistance: "0%", opacity: 0 }}
                  animate={{ offsetDistance: [null, "0%", "100%", "100%", "100%"], opacity: [0, 0, 1, 0, 0] }}
                  transition={{ duration: fullCycleDuration, times: [0, startTime, endTime, resetTime, 1], ease: "easeInOut", repeat: Infinity }}
                  style={{ offsetPath: `path('${pathD}')` }}
                />
              )}
            </g>
          )
        })}

        {/* Marker dots + pulse rings */}
        {dots.map((dot, i) => {
          const startPt = projectPoint(dot.start.lat, dot.start.lng)
          const endPt   = projectPoint(dot.end.lat,   dot.end.lng)

          return (
            <g key={`markers-${i}`}>
              {/* Start dot */}
              <motion.g
                onHoverStart={() => setHoveredLocation(dot.start.label ?? "")}
                onHoverEnd={() => setHoveredLocation(null)}
                className="cursor-pointer"
                whileHover={{ scale: 1.3 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <circle cx={startPt.x} cy={startPt.y} r="3" fill={lineColor} filter="url(#glow)" />
                <circle cx={startPt.x} cy={startPt.y} r="3" fill={lineColor} opacity="0.4">
                  <animate attributeName="r"       from="3" to="10" dur="2.2s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.5" to="0" dur="2.2s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
                </circle>
              </motion.g>

              {/* End dot */}
              <motion.g
                onHoverStart={() => setHoveredLocation(dot.end.label ?? "")}
                onHoverEnd={() => setHoveredLocation(null)}
                className="cursor-pointer"
                whileHover={{ scale: 1.3 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <circle cx={endPt.x} cy={endPt.y} r="3" fill={lineColor} filter="url(#glow)" />
                <circle cx={endPt.x} cy={endPt.y} r="3" fill={lineColor} opacity="0.4">
                  <animate attributeName="r"       from="3" to="10" dur="2.2s" begin={`${i * 0.3 + 0.6}s`} repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.5" to="0" dur="2.2s" begin={`${i * 0.3 + 0.6}s`} repeatCount="indefinite" />
                </circle>
              </motion.g>

              {/* Labels */}
              {showLabels && dot.start.label && (
                <motion.foreignObject
                  x={startPt.x - 44} y={startPt.y - 34} width="88" height="24"
                  initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 * i + 0.2, duration: 0.5 }}
                  className="pointer-events-none overflow-visible"
                >
                  <div
                    style={{
                      background: "rgba(13,27,56,0.88)",
                      border: "1px solid rgba(168,204,232,0.25)",
                      borderRadius: 5,
                      padding: "2px 7px",
                      color: "rgba(168,204,232,0.9)",
                      fontFamily: "Satoshi, sans-serif",
                      fontSize: "9px",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      whiteSpace: "nowrap",
                      textAlign: "center",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    {dot.start.label}
                  </div>
                </motion.foreignObject>
              )}
              {showLabels && dot.end.label && (
                <motion.foreignObject
                  x={endPt.x - 44} y={endPt.y - 34} width="88" height="24"
                  initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 * i + 0.5, duration: 0.5 }}
                  className="pointer-events-none overflow-visible"
                >
                  <div
                    style={{
                      background: "rgba(13,27,56,0.88)",
                      border: "1px solid rgba(168,204,232,0.25)",
                      borderRadius: 5,
                      padding: "2px 7px",
                      color: "rgba(168,204,232,0.9)",
                      fontFamily: "Satoshi, sans-serif",
                      fontSize: "9px",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      whiteSpace: "nowrap",
                      textAlign: "center",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    {dot.end.label}
                  </div>
                </motion.foreignObject>
              )}
            </g>
          )
        })}
      </svg>

      {/* Hover tooltip (mobile) */}
      <AnimatePresence>
        {hoveredLocation && (
          <motion.div
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
            className="absolute bottom-4 left-4 px-3 py-1.5 rounded-lg text-xs font-semibold sm:hidden"
            style={{
              background: "rgba(13,27,56,0.9)",
              border: "1px solid rgba(168,204,232,0.2)",
              color: "rgba(168,204,232,0.9)",
              fontFamily: "Satoshi, sans-serif",
              backdropFilter: "blur(8px)",
            }}
          >
            {hoveredLocation}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
