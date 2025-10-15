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
        relative w-full h-[calc(100vh-4rem)]
        flex flex-col lg:flex-row
        items-center justify-center
        px-8 sm:px-12 lg:px-20
        gap-8 lg:gap-0           /* spacing when stacked on mobile */
        overflow-hidden
      "
    >
      {/* LEFT BLOCK */}
      <motion.div
        variants={leftVariants}
        initial="hidden"
        animate="show"
        className="
          flex-1 flex flex-col justify-center items-start text-left
          mt-4 lg:mt-0            /* small top margin on mobile */
          mb-4 lg:mb-0
        "
        style={{ fontFamily: "Poppins, system-ui, sans-serif" }}
      >
        <p className="uppercase tracking-[10px] text-sm text-orange-500/80 mb-2">
          <span className="text-gray-100">Chroma</span>3D
        </p>
        <h1
          className="text-4xl sm:text-6xl leading-tight"
          style={{ fontFamily: "'StardusterLasital', system-ui, sans-serif" }}
        >
          where&nbsp;<span className="text-orange-500">ideas</span>
          <br />
          take&nbsp;<span className="text-white">shape.</span>
        </h1>
        <p className="mt-5 text-white/80 max-w-lg text-sm">
          Turning imagination into precision-crafted reality.
          From rapid prototypes to showpiece products, we bring your concepts
          to life, layer by layer, with the perfect blend of art and engineering.
        </p>
        <div className="mt-7 flex gap-3">
          <a
            href="#services"
            className="rounded-xl border border-orange-500/25 px-4 py-2 text-orange-500 hover:text-white hover:border-white transition"
          >
            Explore Services
          </a>
          <a
            href="#products"
            className="rounded-xl border border-white/10 bg-transparent px-4 py-2 text-white/80 hover:text-orange-500 transition-colors"
          >
            View Products →
          </a>
        </div>
      </motion.div>

      {/* CENTER MODEL VIEWER */}
      <ModelViewer />

      {/* RIGHT BLOCK */}
      <motion.div
        variants={rightVariants}
        initial="hidden"
        animate="show"
        className="
          flex-1 flex flex-col justify-center items-start lg:items-end
          text-left lg:text-right
          mt-4 lg:mt-0            /* small top margin on mobile */
        "
        style={{ fontFamily: "Poppins, system-ui, sans-serif" }}
      >
        <h2 className="text-xl sm:text-2xl text-white/90">
          Built for dreamers, designers, and doers.
        </h2>
        <p className="mt-3 text-white/70 max-w-md text-sm">
          From a single concept to full-scale production, Chroma3D delivers
          precision, consistency, and speed, because every layer matters.
        </p>
        <div className="mt-6">
          <a
            href="#contact"
            className="inline-block rounded-xl border border-white/15 px-4 py-2 text-white/90 hover:text-orange-500 hover:bg-white/15 transition"
          >
            Get a Quote
          </a>
        </div>
      </motion.div>
    </section>
  );
}
