// src/Components/Services/Services.jsx
import { motion } from "framer-motion";
import {
  CloudUpload,
  Layers,
  PackageSearch,
  Cpu,
  Leaf,
  ShieldCheck,
  Timer,
  Truck,
  MessageSquare,
  Download,
} from "lucide-react";

const BG = () => (
  <>
    {/* grain */}
    <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.05] [background:repeating-linear-gradient(90deg,transparent_0_20px,rgba(255,255,255,0.06)_21px,transparent_22px)]" />
    {/* matte gray->black */}
    <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(55%_45%_at_50%_45%,rgba(5,5,6,0.95)_0%,rgba(10,10,11,1)_60%,#000_100%)]" />
    {/* orange hollows */}
    <div className="pointer-events-none absolute -left-24 top-20 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl -z-10" />
    <div className="pointer-events-none absolute -right-24 bottom-16 h-56 w-56 rounded-full bg-orange-500/10 blur-3xl -z-10" />
  </>
);

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const materials = [
  { name: "PLA", desc: "General purpose • many colors • great detail" },
  { name: "ABS", desc: "Tough • heat resistant • post-process friendly" },
  { name: "PETG", desc: "Impact + chemical resistance • functional" },
  { name: "TPU (Flexible)", desc: "Elastomer • flexible parts • grips" },
  { name: "Resin (SLA/DLP)", desc: "Ultra-fine detail • smooth surface" },
  { name: "Nylon / PA", desc: "High strength • wear resistant" },
];

const infill = ["10%", "20%", "30%", "40%", "50%", "60%", "70%", "80%", "90%", "100%"];

const qualities = [
  { label: "0.20 mm", tag: "Standard" },
  { label: "0.15 mm", tag: "Medium" },
  { label: "0.10 mm", tag: "High" },
  { label: "0.05 mm", tag: "Ultra" },
];

export default function Services() {
  return (
    <section className="relative text-white">
      <BG />

      {/* Header */}
      <div className="relative mx-auto w-[min(92vw,1100px)] pt-20 pb-8 text-center">
        <div className="inline-flex items-center gap-3 text-[11px] tracking-[0.3em] text-orange-500/80">
          <span className="h-[1px] w-8 bg-orange-500/60" />
          SERVICES
          <span className="h-[1px] w-8 bg-orange-500/60" />
        </div>
        <h1
          className="mt-2 text-4xl md:text-5xl font-semibold"
          style={{ fontFamily: "StardusterLasital, Poppins, sans-serif" }}
        >
          Online 3D Printing
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-neutral-400">
          Instant-ready workflow, engineered quality, and rapid turnarounds — tailored for prototypes and production runs.
        </p>
      </div>

      {/* ===== BENTO: FIRST SECTION (upload + quick picks) ===== */}
      <div className="relative mx-auto w-[min(92vw,1100px)] pb-10">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="
            grid gap-4 md:gap-6
            grid-cols-1
            sm:grid-cols-6
          "
        >
          {/* A — Upload Tile (hero) */}
          <motion.label
            variants={item}
            className="
              group relative sm:col-span-4 rounded-2xl
              border border-white/12 bg-black/40 backdrop-blur
              overflow-hidden cursor-pointer p-6 md:p-8
              ring-0 focus-within:ring-2 focus-within:ring-orange-500/50
              transition
            "
          >
            {/* subtle sweep */}
            <span className="pointer-events-none absolute -inset-x-10 top-0 h-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-700" />
            <div className="flex items-start gap-4">
              <div className="grid place-items-center h-11 w-11 rounded-xl bg-orange-500/15 ring-1 ring-orange-500/30">
                <CloudUpload className="h-5 w-5 text-orange-400" />
              </div>
              <div>
                <div className="text-left">
                  <h3 className="text-xl md:text-2xl font-semibold">Upload 3D Model</h3>
                  <p className="mt-1 text-sm text-neutral-400">
                    .stl, .step, .3mf, .obj — drag & drop or click to choose your file.
                  </p>
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-2 text-[11px] text-neutral-300">
                  <span className="rounded-md border border-white/10 px-2 py-1 bg-white/5">FDM • SLA</span>
                  <span className="rounded-md border border-white/10 px-2 py-1 bg-white/5">Proto & Production</span>
                  <span className="rounded-md border border-white/10 px-2 py-1 bg-white/5">DFM Review</span>
                </div>
              </div>
            </div>
            <input type="file" accept=".stl,.step,.3mf,.obj" className="hidden" />
            {/* bottom glow */}
            <div className="pointer-events-none absolute inset-x-10 -bottom-4 h-10 rounded-full bg-orange-500/20 blur-2xl" />
          </motion.label>

          {/* B — Quality Quick Picks */}
          <motion.div
            variants={item}
            className="sm:col-span-2 rounded-2xl border border-white/12 bg-black/40 backdrop-blur p-6 md:p-7"
          >
            <div className="flex items-center gap-3">
              <div className="grid place-items-center h-10 w-10 rounded-xl bg-white/5 ring-1 ring-white/10">
                <Layers className="h-5 w-5 text-orange-400" />
              </div>
              <div>
                <h4 className="font-semibold">Layer Heights</h4>
                <p className="text-xs text-neutral-400">Pick your finish</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {qualities.map((q) => (
                <div
                  key={q.label}
                  className="rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm flex items-center justify-between"
                >
                  <span>{q.label}</span>
                  <span className="text-[11px] text-neutral-400">{q.tag}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* C — Materials Preview (scroll) */}
          <motion.div
            variants={item}
            className="sm:col-span-3 rounded-2xl border border-white/12 bg-black/40 backdrop-blur p-6 md:p-7"
          >
            <div className="flex items-center gap-3">
              <div className="grid place-items-center h-10 w-10 rounded-xl bg-white/5 ring-1 ring-white/10">
                <PackageSearch className="h-5 w-5 text-orange-400" />
              </div>
              <div>
                <h4 className="font-semibold">Materials</h4>
                <p className="text-xs text-neutral-400">Form + function</p>
              </div>
            </div>
            <div className="mt-4 max-h-40 overflow-y-auto pr-1 space-y-3">
              {materials.map((m) => (
                <div key={m.name} className="flex items-start gap-2">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.8)]" />
                  <div>
                    <div className="text-sm font-medium">{m.name}</div>
                    <div className="text-xs text-neutral-400">{m.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* D — Infill Chips */}
          <motion.div
            variants={item}
            className="sm:col-span-3 rounded-2xl border border-white/12 bg-black/40 backdrop-blur p-6 md:p-7"
          >
            <div className="flex items-center gap-3">
              <div className="grid place-items-center h-10 w-10 rounded-xl bg-white/5 ring-1 ring-white/10">
                <Cpu className="h-5 w-5 text-orange-400" />
              </div>
              <div>
                <h4 className="font-semibold">Infill Density</h4>
                <p className="text-xs text-neutral-400">Strength vs. weight</p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {infill.map((d) => (
                <span
                  key={d}
                  className="rounded-md border border-white/10 bg-black/30 px-3 py-1.5 text-sm text-neutral-300"
                >
                  {d}
                </span>
              ))}
            </div>
          </motion.div>

          {/* E — Assurances */}
          <motion.div
            variants={item}
            className="sm:col-span-2 rounded-2xl border border-white/12 bg-black/40 backdrop-blur p-6 md:p-7"
          >
            <h4 className="font-semibold mb-3">Assurance</h4>
            <ul className="space-y-3 text-sm text-neutral-300">
              <li className="flex items-center gap-2">
                <ShieldCheck className="h-4.5 w-4.5 text-orange-400" />
                QA & DFM review
              </li>
              <li className="flex items-center gap-2">
                <Timer className="h-4.5 w-4.5 text-orange-400" />
                Fast turnaround
              </li>
              <li className="flex items-center gap-2">
                <Truck className="h-4.5 w-4.5 text-orange-400" />
                Pan-India shipping
              </li>
              <li className="flex items-center gap-2">
                <Leaf className="h-4.5 w-4.5 text-orange-400" />
                Sustainable options
              </li>
            </ul>
          </motion.div>

          {/* F — Quote CTA */}
          <motion.div
            variants={item}
            className="sm:col-span-4 rounded-2xl border border-orange-500/20 bg-orange-500/10 p-6 md:p-7"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="grid place-items-center h-10 w-10 rounded-xl bg-orange-500/15 ring-1 ring-orange-500/30">
                  <MessageSquare className="h-5 w-5 text-orange-400" />
                </div>
                <div>
                  <h4 className="font-semibold">Need a detailed quote?</h4>
                  <p className="text-xs text-orange-200/80">
                    Share files, material, quality, color & quantity. We’ll confirm DFM and quote.
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <a
                  href="mailto:hello@chroma3d.in?subject=Chroma3D%20Quote%20Request"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-transparent px-4 py-2 text-white/90 hover:text-orange-500 hover:bg-white/10 transition"
                >
                  <MessageSquare className="h-5 w-5" /> Email Us
                </a>
                <a
                  href="/Chroma3D_Printing_Guide.pdf"
                  className="inline-flex items-center gap-2 rounded-xl border border-orange-500/30 bg-orange-500/10 px-4 py-2 text-orange-400 hover:text-white hover:border-white/30 transition"
                >
                  <Download className="h-5 w-5" /> Design Guide (PDF)
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* ===== DETAILED SECTIONS (retain your exact content) ===== */}

      {/* Layer Heights & Quality (full) */}
      <div className="relative mx-auto w-[min(92vw,1100px)] py-10">
        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <motion.h2 variants={item} className="text-xl font-semibold mb-3">
            Layer Heights & Quality
          </motion.h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {qualities.map((q) => (
              <motion.div
                key={q.label}
                variants={item}
                className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur p-4 text-center"
              >
                <Layers className="mx-auto mb-2 h-5 w-5 text-orange-500" />
                <div className="text-lg font-medium">{q.label}</div>
                <div className="text-xs text-neutral-400">{q.tag}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Materials (full) */}
      <div className="relative mx-auto w-[min(92vw,1100px)] py-10">
        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <motion.h2 variants={item} className="text-xl font-semibold mb-3">
            Materials
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {materials.map((m) => (
              <motion.div
                key={m.name}
                variants={item}
                whileHover={{ y: -4 }}
                className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur p-5"
              >
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-orange-500 shadow-[0_0_12px_rgba(249,115,22,0.8)]" />
                  <h3 className="font-medium">{m.name}</h3>
                </div>
                <p className="mt-2 text-sm text-neutral-400">{m.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Infill (full) */}
      <div className="relative mx-auto w-[min(92vw,1100px)] py-10">
        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <motion.h2 variants={item} className="text-xl font-semibold mb-3">
            Infill Density
          </motion.h2>
          <motion.div variants={item} className="flex flex-wrap gap-2">
            {infill.map((d) => (
              <span
                key={d}
                className="rounded-lg border border-white/10 bg-black/40 px-3 py-1 text-sm text-neutral-300"
              >
                {d}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Quote (unchanged but matches styling) */}
      <div id="quote" className="relative mx-auto w-[min(92vw,1100px)] pb-20">
        <div className="rounded-2xl border border-white/10 bg-black/40 p-6 md:p-8 text-center">
          <h3
            className="text-2xl md:text-3xl font-semibold"
            style={{ fontFamily: "StardusterLasital, Poppins, sans-serif" }}
          >
            Ready to Print?
          </h3>
          <p className="mx-auto mt-2 max-w-2xl text-neutral-400">
            Share your files, material, quality, color, and quantity. We'll confirm DFM and quote.
          </p>
          <div className="mt-5 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="mailto:hello@chroma3d.in?subject=Chroma3D%20Quote%20Request"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-transparent px-4 py-2 text-white/90 hover:text-orange-500 hover:bg-white/10 transition"
            >
              <MessageSquare className="h-5 w-5" /> Email Us
            </a>
            <a
              href="/Chroma3D_Printing_Guide.pdf"
              className="inline-flex items-center gap-2 rounded-xl border border-orange-500/30 bg-orange-500/10 px-4 py-2 text-orange-400 hover:text-white hover:border-white/30 transition"
            >
              <Download className="h-5 w-5" /> Design Guide (PDF)
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
