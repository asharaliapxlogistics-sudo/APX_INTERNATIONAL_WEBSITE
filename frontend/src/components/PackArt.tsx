import type { ReactNode } from 'react'

/*
 * Flat isometric illustrations for the packaging guide.
 * Every scene shares one 240×180 viewBox and one box geometry; overlays for each face are drawn in
 * that face's unit square (0..1 × 0..1) and mapped onto the face with an affine matrix.
 */

const C = {
  top: '#f0c38c',
  left: '#d39556',
  right: '#bb7c3e',
  edge: '#8a5a2b',
  inside: '#7a4f25',
  navy: '#030168',
  red: '#f2111a',
  tape: '#fffaf0',
}

const TOP = 'matrix(65 -30 65 30 55 70)'
const RIGHT = 'matrix(65 -30 0 60 120 100)'
const LEFT = 'matrix(65 30 0 60 55 70)'

function Shadow() {
  return <ellipse cx="120" cy="166" rx="78" ry="10" fill="#02012a" opacity="0.12" />
}

function Box({ top, right, left, open = false, children }: { top?: ReactNode; right?: ReactNode; left?: ReactNode; open?: boolean; children?: ReactNode }) {
  return (
    <g strokeLinejoin="round">
      <Shadow />
      {open && <polygon points="55,70 120,40 185,70 120,100" fill={C.inside} />}
      {children}
      <polygon points="55,70 120,100 120,160 55,130" fill={C.left} stroke={C.edge} strokeWidth="1.5" />
      <polygon points="120,100 185,70 185,130 120,160" fill={C.right} stroke={C.edge} strokeWidth="1.5" />
      {!open && <polygon points="55,70 120,40 185,70 120,100" fill={C.top} stroke={C.edge} strokeWidth="1.5" />}
      {top && <g transform={TOP}>{top}</g>}
      {right && <g transform={RIGHT}>{right}</g>}
      {left && <g transform={LEFT}>{left}</g>}
    </g>
  )
}

function Check({ x, y, ok = true }: { x: number; y: number; ok?: boolean }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r="13" fill={ok ? '#10b981' : C.red} />
      {ok ? (
        <path d="M-5.5 0.5 L-1.5 4.5 L6 -4" stroke="#fff" strokeWidth="2.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <path d="M-4.5 -4.5 L4.5 4.5 M4.5 -4.5 L-4.5 4.5" stroke="#fff" strokeWidth="2.8" strokeLinecap="round" />
      )}
    </g>
  )
}

/** 1 — A new, sturdy, double-wall box */
export function ArtSturdyBox() {
  return (
    <svg viewBox="0 0 240 180" className="h-full w-full">
      <Box top={<rect x="0" y="0.44" width="1" height="0.12" fill={C.tape} opacity="0.9" />} />
      {/* corrugation callout */}
      <line x1="170" y1="95" x2="196" y2="62" stroke={C.navy} strokeWidth="1.5" strokeDasharray="3 3" />
      <circle cx="205" cy="45" r="27" fill="#fff" stroke={C.navy} strokeWidth="2" />
      <clipPath id="corr-clip">
        <circle cx="205" cy="45" r="25" />
      </clipPath>
      <g clipPath="url(#corr-clip)">
        <rect x="178" y="30" width="54" height="5" fill={C.right} />
        <path d="M178 40 q4.5 -6 9 0 t9 0 t9 0 t9 0 t9 0 t9 0" stroke={C.left} strokeWidth="2.5" fill="none" />
        <rect x="178" y="43" width="54" height="3.5" fill={C.right} />
        <path d="M178 52 q4.5 -6 9 0 t9 0 t9 0 t9 0 t9 0 t9 0" stroke={C.left} strokeWidth="2.5" fill="none" />
        <rect x="178" y="55" width="54" height="5" fill={C.right} />
      </g>
      <Check x={32} y={122} />
    </svg>
  )
}

/** 2 — Wrap each item individually in bubble wrap */
export function ArtWrapItem() {
  return (
    <svg viewBox="0 0 240 180" className="h-full w-full">
      <defs>
        <pattern id="bubbles" width="10" height="10" patternUnits="userSpaceOnUse">
          <circle cx="5" cy="5" r="3.2" fill="#ffffff" fillOpacity="0.55" stroke="#93c5fd" strokeWidth="0.8" />
        </pattern>
      </defs>
      <Shadow />
      {/* vase */}
      <path d="M105 40 h30 v10 c0 8 18 18 18 45 c0 30 -12 55 -33 62 c-21 -7 -33 -32 -33 -62 c0 -27 18 -37 18 -45 z" fill={C.navy} />
      <path d="M112 70 c-6 10 -8 22 -6 36" stroke="#fff" strokeOpacity="0.35" strokeWidth="4" strokeLinecap="round" fill="none" />
      {/* bubble wrap layer */}
      <rect x="72" y="58" width="96" height="100" rx="26" fill="#dbeafe" fillOpacity="0.55" />
      <rect x="72" y="58" width="96" height="100" rx="26" fill="url(#bubbles)" stroke="#60a5fa" strokeWidth="1.5" />
      {/* tape */}
      <rect x="70" y="100" width="100" height="12" fill={C.tape} opacity="0.95" />
      <Check x={190} y={45} />
      <g fontFamily="inherit" fontWeight="700" fontSize="11" fill={C.navy}>
        <text x="20" y="40">2+ layers</text>
      </g>
      <path d="M45 46 q10 18 28 22" stroke={C.navy} strokeWidth="1.5" fill="none" strokeDasharray="3 3" />
    </svg>
  )
}

/** 3 — Fill every gap so nothing moves */
export function ArtCushion() {
  const paper = [
    [78, 66], [92, 58], [108, 52], [134, 52], [150, 58], [164, 66], [86, 78], [158, 78], [102, 86], [140, 86], [120, 92],
  ]
  return (
    <svg viewBox="0 0 240 180" className="h-full w-full">
      <Box open>
        {/* item */}
        <polygon points="104,60 120,52 136,60 120,68" fill={C.red} />
        <polygon points="104,60 120,68 120,78 104,70" fill="#b80d14" />
        <polygon points="120,68 136,60 136,70 120,78" fill="#8f0a10" />
        {/* crumpled paper / foam */}
        {paper.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i % 2 ? 7 : 8.5} fill="#f8f3ea" stroke="#d6cbb8" strokeWidth="1.2" />
        ))}
      </Box>
      {/* open flaps */}
      <polygon points="55,70 120,40 104,14 39,44" fill={C.top} stroke={C.edge} strokeWidth="1.5" strokeLinejoin="round" />
      <polygon points="120,40 185,70 201,44 136,14" fill={C.top} stroke={C.edge} strokeWidth="1.5" strokeLinejoin="round" />
      {/* 5 cm marker */}
      <g fontWeight="800" fontSize="11" fill={C.red}>
        <rect x="186" y="96" width="44" height="20" rx="10" fill={C.red} />
        <text x="208" y="110" textAnchor="middle" fill="#fff">5 cm</text>
      </g>
      <Check x={30} y={110} />
    </svg>
  )
}

/** 4 — Seal every seam with the H-taping method */
export function ArtHTape() {
  const tape = (
    <g fill={C.tape} stroke="#c9a77a" strokeWidth="0.008">
      <rect x="0.1" y="0" width="0.13" height="1" />
      <rect x="0.77" y="0" width="0.13" height="1" />
      <rect x="0.1" y="0.43" width="0.8" height="0.14" />
    </g>
  )
  return (
    <svg viewBox="0 0 240 180" className="h-full w-full">
      <Box
        top={
          <>
            <line x1="0" y1="0.5" x2="1" y2="0.5" stroke={C.edge} strokeWidth="0.012" />
            {tape}
          </>
        }
        right={<rect x="0.46" y="0" width="0.08" height="0.22" fill={C.tape} opacity="0.95" />}
      />
      <g fontWeight="800" fontSize="22" fill={C.red}>
        <text x="200" y="52" textAnchor="middle">H</text>
      </g>
      <circle cx="200" cy="45" r="18" fill="none" stroke={C.red} strokeWidth="2.5" />
      <Check x={32} y={122} />
    </svg>
  )
}

/** 5 — One clear label on the top, old labels removed */
export function ArtLabel() {
  const bars = [0, 0.04, 0.07, 0.13, 0.16, 0.22, 0.25, 0.28, 0.34, 0.39, 0.42, 0.48, 0.52]
  return (
    <svg viewBox="0 0 240 180" className="h-full w-full">
      <Box
        top={
          <g>
            <rect x="0.18" y="0.2" width="0.64" height="0.6" fill="#fff" stroke={C.navy} strokeWidth="0.015" />
            <rect x="0.18" y="0.2" width="0.64" height="0.12" fill={C.navy} />
            {[0.4, 0.48, 0.56].map((y) => (
              <rect key={y} x="0.24" y={y} width={y === 0.56 ? 0.3 : 0.5} height="0.035" fill="#94a3b8" />
            ))}
            {bars.map((b) => (
              <rect key={b} x={0.24 + b * 0.95} y="0.65" width={b % 0.08 < 0.03 ? 0.02 : 0.012} height="0.1" fill={C.navy} />
            ))}
          </g>
        }
        right={
          <g fill={C.navy}>
            {/* "this side up" arrows */}
            <path d="M0.3 0.55 L0.38 0.3 L0.46 0.55 L0.41 0.55 L0.41 0.7 L0.35 0.7 L0.35 0.55 Z" />
            <path d="M0.55 0.55 L0.63 0.3 L0.71 0.55 L0.66 0.55 L0.66 0.7 L0.6 0.7 L0.6 0.55 Z" />
          </g>
        }
      />
      <Check x={204} y={40} />
    </svg>
  )
}

/** 6 — Measure and weigh: L × W × H */
export function ArtMeasure() {
  return (
    <svg viewBox="0 0 240 180" className="h-full w-full">
      <Box />
      <g stroke={C.red} strokeWidth="2" fill={C.red}>
        {/* L along front-left edge */}
        <line x1="47" y1="138" x2="112" y2="168" />
        {/* W along front-right edge */}
        <line x1="128" y1="168" x2="193" y2="138" />
        {/* H on right edge */}
        <line x1="196" y1="72" x2="196" y2="128" />
      </g>
      {[
        ['L', 66, 160],
        ['W', 174, 160],
        ['H', 214, 104],
      ].map(([t, x, y]) => (
        <g key={t as string}>
          <rect x={(x as number) - 11} y={(y as number) - 11} width="22" height="22" rx="11" fill={C.red} />
          <text x={x as number} y={(y as number) + 4.5} textAnchor="middle" fontWeight="800" fontSize="13" fill="#fff">{t}</text>
        </g>
      ))}
      {/* scale */}
      <g transform="translate(166 10)">
        <rect width="56" height="30" rx="8" fill={C.navy} />
        <rect x="6" y="6" width="44" height="14" rx="3" fill="#0f172a" />
        <text x="28" y="17" textAnchor="middle" fontSize="10" fontWeight="700" fill="#4ade80" fontFamily="monospace">4.25kg</text>
      </g>
    </svg>
  )
}

/** Hero — taped, labelled box ready to ship */
export function ArtHero() {
  return (
    <svg viewBox="0 0 240 180" className="h-full w-full overflow-visible">
      <Box
        top={
          <g>
            <rect x="0" y="0.44" width="1" height="0.12" fill={C.tape} opacity="0.95" />
            <rect x="0" y="0" width="0.1" height="1" fill={C.tape} opacity="0.95" />
            <rect x="0.9" y="0" width="0.1" height="1" fill={C.tape} opacity="0.95" />
            <rect x="0.2" y="0.6" width="0.45" height="0.3" fill="#fff" />
            <rect x="0.2" y="0.6" width="0.45" height="0.07" fill={C.red} />
          </g>
        }
        right={
          <g>
            <rect x="0.15" y="0.3" width="0.7" height="0.36" rx="0.04" fill={C.navy} />
            <text x="0.5" y="0.55" textAnchor="middle" fontSize="0.18" fontWeight="800" fill="#fff">APX</text>
          </g>
        }
      />
    </svg>
  )
}

/** Prohibited items — a box with a "not allowed" sign and hazard labels */
export function ArtProhibited() {
  return (
    <svg viewBox="0 0 240 180" className="h-full w-full overflow-visible">
      <Box
        top={<rect x="0" y="0.44" width="1" height="0.12" fill={C.tape} opacity="0.95" />}
        right={
          <g>
            {/* flammable diamond */}
            <polygon points="0.5,0.18 0.78,0.48 0.5,0.78 0.22,0.48" fill={C.red} stroke="#fff" strokeWidth="0.02" />
            <path d="M0.5 0.32 C0.6 0.42 0.6 0.5 0.55 0.6 C0.55 0.52 0.5 0.5 0.47 0.46 C0.45 0.55 0.4 0.56 0.42 0.62 C0.36 0.55 0.4 0.42 0.5 0.32 Z" fill="#fff" />
          </g>
        }
        left={
          <g>
            {/* battery hazard label */}
            <rect x="0.22" y="0.3" width="0.56" height="0.36" rx="0.03" fill="#fff" />
            <rect x="0.3" y="0.4" width="0.32" height="0.16" rx="0.02" fill="none" stroke={C.navy} strokeWidth="0.03" />
            <rect x="0.62" y="0.45" width="0.04" height="0.06" fill={C.navy} />
            <rect x="0.33" y="0.43" width="0.12" height="0.1" fill={C.red} />
          </g>
        }
      />
      {/* no-entry sign */}
      <g transform="translate(178 46)">
        <circle r="34" fill="#fff" />
        <circle r="28" fill="none" stroke={C.red} strokeWidth="8" />
        <line x1="-19.8" y1="-19.8" x2="19.8" y2="19.8" stroke={C.red} strokeWidth="8" strokeLinecap="round" />
      </g>
    </svg>
  )
}
