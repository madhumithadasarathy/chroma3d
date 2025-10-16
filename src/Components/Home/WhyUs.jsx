import { useMemo } from "react";
import { Cog, Palette, Rocket, Leaf, Handshake } from "lucide-react";

/**
 * WhyUs.jsx — Center-aligned, bright yantra with fixed layout
 * - Yantra is centered, smaller, and brighter
 * - Nodes align symmetrically around it
 * - No scrolling required
 */

const FEATURES = [
  {
    title: "Industry-grade precision",
    desc: "Tight tolerances, tuned slicer profiles, and metrology-aware QA.",
    Icon: Cog,
  },
  {
    title: "Design × Engineering",
    desc: "CAD-first, print-aware geometry balancing aesthetics and strength.",
    Icon: Palette,
  },
  {
    title: "Fast turnaround",
    desc: "Parallel queues and optimized workflows for rapid delivery.",
    Icon: Rocket,
  },
  {
    title: "Eco-friendly materials",
    desc: "Bio-based and recycled filaments, sustainable post-processing.",
    Icon: Leaf,
  },
  {
    title: "Personalized support",
    desc: "One-to-one guidance from concept to completion.",
    Icon: Handshake,
  },
];

// 5 evenly spaced angles (degrees), starting at top (-90°)
const ANGLES = [-90, -90 + 72, -90 + 144, -90 + 216, -90 + 288];

// Convert polar coordinates to CSS %
function polarToPercent(angleDeg, radiusPct) {
  const rad = (angleDeg * Math.PI) / 180;
  const xPct = 50 + Math.cos(rad) * radiusPct;
  const yPct = 50 + Math.sin(rad) * radiusPct;
  return { left: `${xPct}%`, top: `${yPct}%` };
}

export default function WhyUs() {
  const ringPct = 33; // balanced spacing around yantra
  const positions = useMemo(
    () => ANGLES.map((a) => polarToPercent(a, ringPct)),
    [ringPct]
  );

  return (
    <section
      id="whyus"
      className="relative flex min-h-[88vh] flex-col items-center justify-center overflow-hidden bg-[#0a0a0b] text-neutral-200"
    >
      {/* Brighter Yantra background */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        aria-hidden
      >
        <img
          src="/yantra.svg"
          alt=""
          className="w-[400px] md:w-[480px] opacity-25 brightness-150 select-none pointer-events-none"
        />
      </div>

      {/* Matte overlay for soft blending */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]" aria-hidden />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-6 text-center">
        {/* Heading */}
        <div className="mb-3 inline-flex items-center gap-3 text-[11px] tracking-[0.3em] text-orange-500/80">
          <span className="h-[1px] w-8 bg-orange-500/60" /> WHY US{" "}
          <span className="h-[1px] w-8 bg-orange-500/60" />
        </div>

        <h2 className="text-3xl font-semibold text-white md:text-5xl">
          Yantra Framework
        </h2>

        <p className="mx-auto mt-2 max-w-2xl text-sm text-neutral-400 md:text-base">
          The harmony of design, engineering, and precision — fused with purpose.
        </p>

        {/* Fixed layout stage for aligned positions */}
        <div
          className="relative mx-auto mt-8"
          style={{
            width: "min(86vw, 600px)",
            height: "min(70vh, 600px)",
          }}
        >
          {FEATURES.map(({ title, desc, Icon }, i) => (
            <div
              key={title}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={positions[i]}
            >
              <FeaturePill title={title} desc={desc} Icon={Icon} angle={ANGLES[i]} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturePill({ title, desc, Icon, angle }) {
  const isLeft = Math.cos((angle * Math.PI) / 180) < -0.1;
  const isRight = Math.cos((angle * Math.PI) / 180) > 0.1;
  const alignClass = isLeft
    ? "items-end text-right"
    : isRight
    ? "items-start text-left"
    : "items-center text-center";
  const offset =
    isLeft ? "-translate-x-3" : isRight ? "translate-x-3" : "translate-y-3";

  return (
    <div
      className={`flex w-[210px] max-w-[44vw] flex-col ${alignClass} ${offset}`}
    >
      <div className="grid h-9 w-9 place-items-center rounded-md bg-neutral-950/70 ring-1 ring-neutral-800/70">
        <Icon className="h-4.5 w-4.5 text-orange-500" />
      </div>
      <h3 className="mt-2 text-sm font-semibold text-white">{title}</h3>
      <p className="mt-1 text-xs leading-relaxed text-neutral-400">{desc}</p>
    </div>
  );
}
