// src/Components/Home/Vision.jsx — Fullscreen Hologram Pillar (True Black + Ambient Orange Hollows)
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const ORANGE = "rgba(249, 115, 22, 1)";
const ORANGE_SOFT = "rgba(249, 115, 22, 0.25)";
const WHITE_SOFT = "rgba(255,255,255,0.09)";

export default function Vision() {
  const [mode, setMode] = useState("vision");
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!auto) return;
    const id = setInterval(() => {
      setMode((m) => (m === "vision" ? "mission" : "vision"));
    }, 6500);
    return () => clearInterval(id);
  }, [auto]);

  return (
    <section
      className="
        relative flex flex-col items-center justify-center
        min-h-screen w-full
        overflow-hidden
        bg-black text-neutral-200
      "
    >
      {/* === PURE BLACK BACKGROUND WITH ORANGE HOLLOWS === */}
      <div className="absolute inset-0 bg-black" />

      {/* Ambient orange glows */}
      <div className="pointer-events-none absolute -left-40 top-32 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl" />
      <div className="pointer-events-none absolute right-40 top-1/3 h-[380px] w-[380px] rounded-full bg-orange-500/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 left-1/2 -translate-x-1/2 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl opacity-50" />

      {/* Subtle grain pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04] [background:repeating-linear-gradient(90deg,transparent_0_20px,rgba(255,255,255,0.05)_21px,transparent_22px)]" />

      {/* Header */}
      <div className="absolute top-10 w-full px-6 text-center z-10">
        <div className="mb-2 inline-flex items-center gap-3 text-[15px] tracking-[0.3em] text-orange-500/80">
          <span className="h-[1px] w-8 bg-orange-500/60" /> VISION • MISSION{" "}
          <span className="h-[1px] w-8 bg-orange-500/60" />
        </div>
        <h2
          className="text-4xl font-semibold md:text-5xl text-white"
          style={{ fontFamily: "StardusterLasital, Poppins, sans-serif" }}
        >
          Imagination meets{" "}
          <span className="text-orange-500">Engineering</span>
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-sm text-white md:text-base">
          Defining the intersection of imagination, technology, and precision.
        </p>
      </div>

      {/* Controls */}
      <div className="absolute right-6 top-8 z-20 hidden gap-2 text-xs text-neutral-400 md:flex">
        <button
          onClick={() => setAuto((s) => !s)}
          className={`rounded-md border px-2 py-1 ${
            auto
              ? "border-orange-500/60 text-orange-400"
              : "border-neutral-700 text-neutral-400"
          }`}
        >
          Auto: {auto ? "On" : "Off"}
        </button>
        <button
          onClick={() => setMode("vision")}
          className={`rounded-md px-2 py-1 ${
            mode === "vision"
              ? "bg-orange-500/10 text-orange-400"
              : "text-neutral-400 hover:text-neutral-200"
          }`}
        >
          Vision
        </button>
        <button
          onClick={() => setMode("mission")}
          className={`rounded-md px-2 py-1 ${
            mode === "mission"
              ? "bg-orange-500/10 text-orange-400"
              : "text-neutral-400 hover:text-neutral-200"
          }`}
        >
          Mission
        </button>
      </div>

      {/* === Hologram Stage === */}
      <div className="relative mx-auto mt-24 grid w-[min(92vw,900px)] place-items-center z-10 pb-20">
        {/* Base */}
        <div className="relative h-36 w-[min(84vw,720px)]">
          <div className="absolute inset-x-0 bottom-0 h-8 rounded-full bg-neutral-950 ring-1 ring-neutral-800/70 shadow-[0_30px_120px_rgba(0,0,0,0.6)]" />
          <div className="absolute left-1/2 bottom-6 h-10 w-10 -translate-x-1/2 rounded-full bg-neutral-950 ring-1 ring-neutral-800/70" />
        </div>

        {/* Pillar */}
        <div className="pointer-events-none relative -mt-24 flex h-[min(52vh,520px)] w-[min(70vw,560px)] items-center justify-center">
          <div
            className="absolute h-full w-[2px]"
            style={{
              background: `linear-gradient(to bottom, transparent, ${ORANGE_SOFT}, transparent)`,
              filter: "drop-shadow(0 0 16px rgba(249,115,22,0.45))",
            }}
          />
          <motion.div
            className="absolute h-[60%] w-[60%] rounded-full ring-1"
            style={{ boxShadow: `inset 0 0 0 1px ${WHITE_SOFT}` }}
            animate={{ rotate: 360 }}
            transition={{ duration: 16, ease: "linear", repeat: Infinity }}
          />
          <motion.div
            className="absolute h-[42%] w-[42%] rounded-full"
            style={{
              boxShadow: `inset 0 0 0 1px ${ORANGE_SOFT}`,
              filter: "drop-shadow(0 0 22px rgba(249,115,22,0.35))",
            }}
            animate={{ rotate: -360 }}
            transition={{ duration: 22, ease: "linear", repeat: Infinity }}
          />
          <motion.div
            className="absolute h-[18%] w-[18%] rounded-full"
            style={{
              boxShadow: `0 0 0 1px ${WHITE_SOFT}`,
              background:
                "radial-gradient(circle, rgba(249,115,22,0.25), transparent 60%)",
            }}
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Hologram Card */}
        <AnimatePresence mode="wait">
          {mode === "vision" ? (
            <HoloCard
              key="vision"
              title="Vision"
              lines={[
                "Make high-quality 3D printing accessible, artistic, and impactful.",
                "Transform ideas into precision-crafted realities for everyone.",
              ]}
            />
          ) : (
            <HoloCard
              key="mission"
              title="Mission"
              lines={[
                "Empower creators, designers, and engineers to iterate faster.",
                "Fuse CAD, material science, and craft for reliable, beautiful parts.",
              ]}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function HoloCard({ title, lines }) {
  return (
    <motion.div
      initial={{ y: 18, opacity: 0, scale: 0.98 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      exit={{ y: -18, opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.5, ease: [0.2, 0.65, 0.3, 0.9] }}
      className="relative z-10 -mt-[min(24vh,220px)] w-[min(88vw,780px)]"
    >
      <div className="relative rounded-2xl border border-neutral-800/70 bg-neutral-900/60 p-6 text-center shadow-[0_20px_100px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl md:p-8">
        {/* Light sweep effect */}
        <motion.div
          initial={{ x: "-120%" }}
          animate={{ x: ["-120%", "120%"], opacity: [0, 0.35, 0] }}
          transition={{ duration: 1.6, delay: 0.25, ease: "easeInOut" }}
          className="pointer-events-none absolute -inset-x-10 top-0 h-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        />
        <div className="mb-2 text-[11px] tracking-[0.3em] text-orange-500/90">
          {title.toUpperCase()}
        </div>
        <h3 className="text-2xl font-semibold text-white md:text-4xl">
          {title === "Vision"
            ? "Where imagination meets engineered reality."
            : "Build with intention. Deliver with precision."}
        </h3>
        <div className="mx-auto mt-3 max-w-3xl space-y-2 text-sm leading-relaxed text-neutral-300 md:text-base">
          {lines.map((l, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.2 + i * 0.08 }}
            >
              {l}
            </motion.p>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
