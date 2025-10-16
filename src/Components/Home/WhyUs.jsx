import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Cog, Palette, Rocket, Leaf, Handshake } from "lucide-react";

/**
 * WhyUs.jsx — "Yantra Framework"
 * Indianised + Engineering design. Structured, modern, and uncluttered.
 * Theme: matte black (#0a0a0b) with orange-500 accents.
 *
 * Layers
 *  1) YantraGrid — faint SVG mandala/drafting lines (engineering x Indian geometry)
 *  2) HexSpine — ordered node layout with precise connectors
 *  3) InfoSlab — tidy rectangular detail blocks that appear on node click
 */

const FEATURES = [
  { key: "precision", title: "Industry‑grade precision", blurb: "Tight tolerances, tuned slicer profiles, metrology‑aware QA for faithful parts.", Icon: Cog },
  { key: "synergy", title: "Design × Engineering", blurb: "CAD‑first, print‑aware geometry balancing aesthetics and structure.", Icon: Palette },
  { key: "speed", title: "Fast turnaround", blurb: "Parallel queues and streamlined post‑processing hit your demo dates.", Icon: Rocket },
  { key: "eco", title: "Eco‑friendly materials", blurb: "Bio‑based & recycled filaments with waste‑aware slicing strategies.", Icon: Leaf },
  { key: "support", title: "Personalized support", blurb: "One‑to‑one guidance from file to finish. Iterate until it’s just right.", Icon: Handshake },
];

export default function WhyUs() {
  const [active, setActive] = useState(null);
  const prefersReduced = useReducedMotion();

  return (
    <section className="relative min-h-[100dvh] w-full overflow-hidden bg-[#0a0a0b] text-neutral-200">
      {/* Background grain + subtle vignette */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.05] [background:repeating-linear-gradient(90deg,transparent_0_22px,rgba(255,255,255,0.04)_23px,transparent_24px)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_40%_at_50%_0%,rgba(255,115,0,0.06),transparent_60%)]" />

      {/* Header */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 pt-16 md:pt-24">
        <div className="mb-4 inline-flex items-center gap-3 text-[11px] tracking-[0.28em] text-orange-500/80">
          <span className="h-[1px] w-8 bg-orange-500/60" /> WHY US <span className="h-[1px] w-8 bg-orange-500/60" />
        </div>
        <h2 className="text-balance text-4xl font-semibold leading-tight text-white md:text-6xl">
          Yantra Framework
        </h2>
        <p className="mt-3 max-w-2xl text-sm text-neutral-400 md:text-base">
          Balanced like a yantra. Built like CAD. Five nodes — one clear structure.
        </p>
      </div>

      {/* Stage */}
      <div className="relative z-10 mx-auto mt-10 grid max-w-6xl grid-cols-1 px-6 pb-28 md:mt-16">
        <div className="relative mx-auto aspect-square w-full max-w-[860px] select-none">
          {/* 1) Yantra Grid */}
          <YantraGrid prefersReduced={prefersReduced} />

          {/* 2) HexSpine + nodes */}
          <HexSpine active={active} setActive={setActive} />
        </div>
      </div>

      {/* 3) Mobile detail dock (accessibility) */}
      <AnimatePresence>
        {active && (
          <motion.aside
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: prefersReduced ? 0 : 0.25 }}
            className="fixed inset-x-0 bottom-0 z-20 md:hidden"
          >
            <div className="mx-auto mb-4 max-w-lg px-4">
              <div className="rounded-xl border border-neutral-800/70 bg-neutral-900/85 p-4 backdrop-blur">
                <p className="text-sm text-neutral-300">{FEATURES.find((x) => x.key === active)?.blurb}</p>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Ambient accents */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 bottom-10 h-60 w-60 rounded-full bg-orange-500/10 blur-3xl" />
    </section>
  );
}

function YantraGrid({ prefersReduced }) {
  // Concentric circles + rotated triangles + diagonals (subtle engineeering lines)
  const dur = prefersReduced ? 0 : 10;
  return (
    <svg className="absolute inset-0" viewBox="0 0 1000 1000" aria-hidden>
      <g transform="translate(500,500)">
        {/* Circles */}
        {[140, 260, 360].map((r, i) => (
          <motion.circle
            key={r}
            r={r}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1"
            initial={{ opacity: 0.6 }}
            animate={{ opacity: [0.6, 0.85, 0.6] }}
            transition={{ duration: dur + i, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
        {/* Triangles (rotated) */}
        {[0, 45].map((rot, j) => (
          <motion.polygon
            key={rot}
            points={trianglePoints(320)}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1"
            transform={`rotate(${rot})`}
            initial={{ opacity: 0.5 }}
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: dur + j * 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
        {/* Cross diagonals */}
        {[0, 60, 120].map((a) => (
          <line
            key={a}
            x1={-380 * Math.cos((a * Math.PI) / 180)}
            y1={-380 * Math.sin((a * Math.PI) / 180)}
            x2={380 * Math.cos((a * Math.PI) / 180)}
            y2={380 * Math.sin((a * Math.PI) / 180)}
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1"
          />
        ))}
      </g>
    </svg>
  );
}

function trianglePoints(r) {
  const pts = [];
  for (let i = 0; i < 3; i++) {
    const ang = (-90 + i * 120) * (Math.PI / 180);
    const x = Math.cos(ang) * r;
    const y = Math.sin(ang) * r;
    pts.push(`${x},${y}`);
  }
  return pts.join(" ");
}

function HexSpine({ active, setActive }) {
  // Define hex‑like radial positions for five nodes
  const nodes = [
    { key: "precision", x: 0, y: -280 }, // top
    { key: "synergy", x: -240, y: -40 }, // left‑upper
    { key: "speed", x: 240, y: -40 }, // right‑upper
    { key: "eco", x: -200, y: 200 }, // left‑lower
    { key: "support", x: 200, y: 200 }, // right‑lower
  ];

  // Connectors (SVG paths from center/node to node)
  const center = { x: 0, y: 0 };

  return (
    <div className="absolute left-1/2 top-1/2 h-[860px] w-[860px] -translate-x-1/2 -translate-y-1/2">
      <svg className="absolute inset-0" viewBox="0 0 860 860" aria-hidden>
        <g transform="translate(430,430)">
          {/* central hub */}
          <circle r="4" fill="rgba(249,115,22,0.9)" />
          {/* radial connectors */}
          {nodes.map((n) => (
            <path
              key={n.key}
              d={`M ${center.x} ${center.y} L ${n.x} ${n.y}`}
              stroke="rgba(249,115,22,0.35)"
              strokeWidth="1"
              fill="none"
            />
          ))}
        </g>
      </svg>

      {/* nodes + slabs */}
      {nodes.map((n, i) => (
        <NodeWithSlab
          key={n.key}
          node={n}
          index={i}
          active={active}
          setActive={setActive}
        />
      ))}
    </div>
  );
}

function NodeWithSlab({ node, index, active, setActive }) {
  const feat = FEATURES.find((f) => f.key === node.key);
  const isActive = active === node.key;

  // Compute slab position: place outward from node, horizontally if left/right, vertically if top
  let slabStyle = {};
  let align = "left";
  if (node.y < -150) {
    // top node → slab below
    slabStyle = { left: `calc(50% + ${node.x}px)`, top: `calc(50% + ${node.y + 36}px)` };
    align = "center";
  } else if (node.x < 0) {
    // left side → slab left of node
    slabStyle = { left: `calc(50% + ${node.x - 320}px)`, top: `calc(50% + ${node.y - 10}px)` };
    align = "right";
  } else {
    // right side → slab right of node
    slabStyle = { left: `calc(50% + ${node.x + 36}px)`, top: `calc(50% + ${node.y - 10}px)` };
    align = "left";
  }

  return (
    <div className="absolute left-1/2 top-1/2" style={{ transform: `translate(${node.x}px, ${node.y}px)` }}>
      {/* Node */}
      <button
        aria-pressed={isActive}
        onClick={() => setActive(isActive ? null : node.key)}
        className="group grid place-items-center rounded-full p-2"
      >
        <span className="block h-[9px] w-[9px] rounded-full bg-orange-500 shadow-[0_0_12px_rgba(255,115,0,0.7)]" />
      </button>

      {/* Connector tick (short hairline indicating slab direction) */}
      {align === "left" && (
        <span className="absolute left-[14px] top-1/2 h-[1px] w-[18px] -translate-y-1/2 bg-gradient-to-r from-orange-500/80 to-orange-500/0" aria-hidden />
      )}
      {align === "right" && (
        <span className="absolute right-[14px] top-1/2 h-[1px] w-[18px] -translate-y-1/2 bg-gradient-to-l from-orange-500/80 to-orange-500/0" aria-hidden />
      )}

      {/* Info slab */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto absolute z-10"
            style={slabStyle}
          >
            <div
              className={`rounded-xl border border-neutral-800/70 bg-neutral-900/80 px-4 py-3 backdrop-blur-md ${
                align === "center" ? "text-center" : align === "right" ? "text-right" : "text-left"
              }`}
            >
              <div className="flex items-center gap-2">
                <div className="grid h-7 w-7 place-items-center rounded-md bg-neutral-950/70 ring-1 ring-neutral-800/70">
                  <feat.Icon className="h-4 w-4 text-orange-500" />
                </div>
                <h3 className="text-sm font-medium text-neutral-200">{feat.title}</h3>
              </div>
              <div className="mt-2 h-px w-full bg-neutral-800/70" />
              <p className="mt-2 max-w-xs text-xs leading-relaxed text-neutral-400 md:text-sm">{feat.blurb}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
