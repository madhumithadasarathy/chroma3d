// src/Components/Home/Statement.jsx
import { motion } from "framer-motion";

export default function Statement() {
  return (
    <section
      id="statement"
      className="relative flex min-h-[72vh] items-center justify-center overflow-hidden text-white bg-[#0a0a0b]"
      style={{ transform: "translateZ(0)" }}
    >
      {/* === Background (same treatment as Hero/Vision) === */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.05] [background:repeating-linear-gradient(90deg,transparent_0_20px,rgba(255,255,255,0.06)_21px,transparent_22px)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(55%_45%_at_50%_45%,rgba(5,5,6,0.95)_0%,rgba(10,10,11,1)_60%,#000_100%)]" />
      <div className="pointer-events-none absolute -left-24 top-20 -z-10 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-16 -z-10 h-56 w-56 rounded-full bg-orange-500/10 blur-3xl" />

      {/* === Content === */}
      <div className="relative z-10 mx-auto w-[min(92vw,900px)] text-center">
        {/* Small kicker */}
        <div className="mb-3 inline-flex items-center gap-3 text-[11px] tracking-[0.3em] text-orange-500/80">
          <span className="h-[1px] w-8 bg-orange-500/60" />
          STATEMENT
          <span className="h-[1px] w-8 bg-orange-500/60" />
        </div>

        {/* Headline with Starduster for title only */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-3xl md:text-5xl font-semibold leading-tight"
          style={{ fontFamily: "StardusterLasital, Poppins, sans-serif" }}
        >
          We don’t just <span className="text-orange-500">print</span>.
        </motion.h2>

        {/* Scan-line shimmer under headline */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          className="relative mx-auto mt-3 h-[2px] w-36 origin-left bg-gradient-to-r from-transparent via-orange-500/70 to-transparent"
        />

        {/* Body lines (staggered) */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10% 0px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
          }}
          className="mx-auto mt-6 max-w-3xl space-y-3 text-sm md:text-base text-neutral-300"
        >
          {[
            "We prototype ambition, sculpt precision, and engineer stories in plastic, metal, and light.",
            "Every curve speaks intent — every layer holds purpose.",
            "This is creation, calibrated.",
          ].map((line, i) => (
            <motion.p
              key={i}
              variants={{
                hidden: { opacity: 0, y: 8 },
                show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
              }}
            >
              {line}
            </motion.p>
          ))}
        </motion.div>

        {/* Soft base glow behind text (subtle, like other sections) */}
        <div className="pointer-events-none mx-auto mt-8 h-10 w-64 rounded-full bg-orange-500/15 blur-2xl" />
      </div>
    </section>
  );
}
