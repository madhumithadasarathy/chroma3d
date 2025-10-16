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
      "
    >
      {/* LEFT BLOCK */}
      <motion.div
        variants={leftVariants}
        initial="hidden"
        animate="show"
        className="
          flex-1 flex flex-col justify-center
          items-start text-left
          lg:mb-0
          h-full
        "
        style={{
          fontFamily: "Poppins, system-ui, sans-serif",
        }}
      >
        <div className="flex flex-col justify-center h-full lg:h-auto">
          <p className="uppercase tracking-[8px] text-xs sm:text-sm text-orange-500/80 mb-1 sm:mb-2">
            <span className="text-gray-100">Chroma</span>3D
          </p>

          <h1
            className="text-3xl sm:text-5xl leading-snug sm:leading-tight"
            style={{
              fontFamily: "'StardusterLasital', system-ui, sans-serif",
            }}
          >
            where&nbsp;<span className="text-orange-500">ideas</span>
            <br />
            take&nbsp;<span className="text-white">shape.</span>
          </h1>

          <p className="mt-3 sm:mt-4 text-white/80 max-w-md text-xs sm:text-sm">
            Turning imagination into precision-crafted reality.
            From rapid prototypes to showpiece products, we bring your concepts
            to life — layer by layer — with the perfect blend of art and engineering.
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

      {/* CENTER MODEL VIEWER */}
      <div className="my-2 sm:my-3 lg:my-0 flex justify-center">
        <ModelViewer />
      </div>

      {/* RIGHT BLOCK */}
      <motion.div
        variants={rightVariants}
        initial="hidden"
        animate="show"
        className="
          flex-1 flex flex-col justify-center
          items-start lg:items-end text-left lg:text-right
          h-full
        "
        style={{
          fontFamily: "Poppins, system-ui, sans-serif",
        }}
      >
        <div className="flex flex-col justify-center h-full lg:h-auto">
          <h2 className="text-lg sm:text-xl text-white/90">
            Built for dreamers, designers, and doers.
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
