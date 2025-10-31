// src/Components/Services/Services.jsx
import { motion } from "framer-motion";
import {
  Layers,
  MessageSquare,
  Download,
} from "lucide-react";
import UploadPreview from "./UploadPreview.jsx";

const BG = () => (
  <>
    <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.05] [background:repeating-linear-gradient(90deg,transparent_0_20px,rgba(255,255,255,0.06)_21px,transparent_22px)]" />
    <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(55%_45%_at_50%_45%,rgba(5,5,6,0.95)_0%,rgba(10,10,11,1)_60%,#000_100%)]" />
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
    <section id="services" className="relative text-white">
      <BG />

      {/* ====== 1) Upload + Preview (Bento hero) ====== */}
      <UploadPreview />

      {/* ====== 2) Layer Heights & Quality ====== */}
      <div className="relative mx-auto w-[min(92vw,1100px)] py-12">
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

      {/* ====== 3) Materials ====== */}
      <div className="relative mx-auto w-[min(92vw,1100px)] py-12">
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

      {/* ====== 4) Infill Density ====== */}
      <div className="relative mx-auto w-[min(92vw,1100px)] py-12">
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

      {/* ====== 5) Quote CTA ====== */}
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
