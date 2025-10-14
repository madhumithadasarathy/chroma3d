import { motion } from "framer-motion";

const leftVariants = {
  hidden: { opacity: 0, x: -30 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const rightVariants = {
  hidden: { opacity: 0, x: -30 }, // per your request, also left -> right
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut", delay: 0.1 } },
};

export default function Hero() {
  return (
    <section className="w-full py-12 sm:py-16">
      {/* three-column layout: left | center gap | right */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6 px-[10px]">
        {/* LEFT: Intro (Poppins, title in Starduster) */}
        <motion.div
          variants={leftVariants}
          initial="hidden"
          animate="show"
          className="flex flex-col justify-center"
          style={{ fontFamily: "Poppins, system-ui, sans-serif" }}
        >
          {/* Creative entry title (Starduster) */}
          <h1
            className="text-4xl sm:text-5xl leading-tight"
            style={{ fontFamily: "'StardusterLasital', system-ui, sans-serif" }}
          >
            shape&nbsp;<span className="text-orange-500">tomorrow</span>
          </h1>

          {/* Supporting copy (Poppins) */}
          <p className="mt-4 text-white/80 max-w-prose">
            Precision 3D printing for prototypes, products, and presentation-ready pieces.
            Clean lines, tight tolerances, premium finishes—built for speed and polish.
          </p>

          <div className="mt-6 flex gap-3">
            <a
              href="#services"
              className="rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-white/90 hover:bg-white/15 transition"
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

        {/* CENTER: Placeholder gap for image / 3D model */}
        <div className="min-h-[200px] lg:min-h-[360px] flex items-center justify-center">
          <div className="w-full h-full rounded-2xl border border-dashed border-white/15 bg-white/5/0">
            {/* Intentionally empty: place your image/canvas/model here later */}
          </div>
        </div>

        {/* RIGHT: Detail block (slides in left -> right) */}
        <motion.div
          variants={rightVariants}
          initial="hidden"
          animate="show"
          className="flex flex-col justify-center lg:items-end"
        >
          <div className="max-w-prose lg:text-right">
            <h2 className="text-xl font-medium text-white/90">Rapid. Reliable. Refined.</h2>
            <p className="mt-3 text-white/70">
              Multi-material support, fast turnarounds, and consistent quality.
              Ideal for TEDx mementos, medical models, and custom merch.
            </p>
            <div className="mt-6">
              <a
                href="#contact"
                className="inline-block rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-white/90 hover:text-orange-500 hover:bg-white/15 transition"
              >
                Get a Quote
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
