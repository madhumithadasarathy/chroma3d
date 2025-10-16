import { motion } from "framer-motion";
import ModelViewer from "./ModelViewer.jsx";

const leftVariants = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const rightVariants = {
  hidden: { opacity: 0, x: -40 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut", delay: 0.2 },
  },
};

export default function Hero() {
  return (
    <section
      className="
        relative w-full min-h-[calc(100vh-4rem)]
        flex flex-col lg:flex-row
        items-center justify-center
        px-6 sm:px-10 lg:px-20
        overflow-hidden
        gap-4 sm:gap-6 lg:gap-0
        will-change-transform
        text-white
        bg-[#0a0a0b]
      "
      style={{ transform: "translateZ(0)" }}
    >
      {/* === BACKGROUND (push behind with -z-10) === */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.05] [background:repeating-linear-gradient(90deg,transparent_0_20px,rgba(255,255,255,0.06)_21px,transparent_22px)]" />

      {/* Localized circular grey light only around model */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(25%_25%_at_50%_55%,rgba(40,40,40,0.6)_0%,rgba(10,10,11,1)_80%)]" />

      {/* Ambient orange accents */}
      <div className="pointer-events-none absolute -left-24 top-20 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl -z-10" />
      <div className="pointer-events-none absolute -right-24 bottom-16 h-56 w-56 rounded-full bg-orange-500/10 blur-3xl -z-10" />

      {/* === LEFT CONTENT === */}
      <motion.div
        variants={leftVariants}
        initial="hidden"
        animate="show"
        className="
          flex-1 flex flex-col justify-center
          items-start text-left
          lg:mb-0
          h-full
          relative z-10
        "
        style={{ fontFamily: "Poppins, system-ui, sans-serif" }}
      >
        <div className="flex flex-col justify-center h-full lg:h-auto">
          <p className="uppercase tracking-[8px] text-xs sm:text-sm text-orange-500/80 mb-1 sm:mb-2">
            <span className="text-gray-100">Chroma</span>3D
          </p>

          <h1
            className="text-3xl sm:text-5xl leading-snug sm:leading-tight"
            style={{ fontFamily: "'StardusterLasital', system-ui, sans-serif" }}
          >
            where&nbsp;<span className="text-orange-500">ideas</span>
            <br />
            take&nbsp;<span className="text-white">shape.</span>
          </h1>

          <p className="mt-3 sm:mt-4 text-white/80 max-w-md text-xs sm:text-sm">
            Turning imagination into precision-crafted reality. From rapid
            prototypes to showpiece products, we bring your concepts to life —
            layer by layer — with the perfect blend of art and engineering.
          </p>

          <div className="mt-5 sm:mt-6 flex gap-2 sm:gap-3">
            <a
              href="#services"
              className="rounded-xl border border-orange-500/25 px-3 sm:px-4 py-1.5 sm:py-2 text-orange-500 hover:text-white hover:border-white transition text-xs sm:text-sm"
            >
              Explore Services
            </a>
            <a
              href="#products"
              className="rounded-xl border border-white/10 bg-transparent px-3 sm:px-4 py-1.5 sm:py-2 text-white/80 hover:text-orange-500 transition-colors text-xs sm:text-sm"
            >
              View Products →
            </a>
          </div>
        </div>
      </motion.div>

      {/* === CENTER MODEL VIEWER (slightly larger) === */}
      <div className="my-2 sm:my-3 lg:my-0 flex justify-center relative z-10">
        {/* Dark vignette + focused glow */}
        <div
          aria-hidden
          className="
            pointer-events-none absolute inset-0 z-0
            flex items-center justify-center
          "
        >
          <div
            className="
              h-80 w-80 sm:h-[22rem] sm:w-[22rem]
              rounded-full
              bg-[radial-gradient(circle,rgba(50,50,50,0.7)_0%,rgba(0,0,0,1)_85%)]
              blur-2xl
              -z-10
            "
          />
        </div>

        {/* Orange base glow merging into Vision */}
        <div
          aria-hidden
          className="
            pointer-events-none absolute left-1/2 bottom-[-6px] z-0
            h-12 w-60 -translate-x-1/2
            rounded-full bg-orange-500/22 blur-2xl
          "
        />

        {/* Actual model on top */}
        <div className="relative z-10 scale-[1.15] sm:scale-[1.2] md:scale-[1.25]">
          <ModelViewer />
        </div>
      </div>

      {/* === RIGHT CONTENT === */}
      <motion.div
        variants={rightVariants}
        initial="hidden"
        animate="show"
        className="
          flex-1 flex flex-col justify-center
          items-start lg:items-end text-left lg:text-right
          h-full
          relative z-10
        "
        style={{ fontFamily: "Poppins, system-ui, sans-serif" }}
      >
        <div className="flex flex-col justify-center h-full lg:h-auto">
          <h2 className="text-lg sm:text-xl text-white/90">
            Built for{" "}
            <span className="text-orange-500 font-semibold">
              dreamers, designers, and doers.
            </span>
          </h2>

          <p className="mt-2 sm:mt-3 text-white/70 max-w-md text-xs sm:text-sm leading-relaxed">
            From a single concept to full-scale production, Chroma3D delivers
            precision, consistency, and speed — because every layer matters.
          </p>

          <div className="mt-4 sm:mt-5">
            <a
              href="#contact"
              className="inline-block rounded-xl border border-white/15 px-3 sm:px-4 py-1.5 sm:py-2 text-white/90 hover:text-orange-500 hover:bg-white/15 transition text-xs sm:text-sm"
            >
              Get a Quote
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
