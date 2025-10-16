import { motion } from "framer-motion";
import { Cog, Palette, Rocket, Leaf, Handshake } from "lucide-react";

const FEATURES = [
  {
    title: "Industry-grade Precision",
    desc: "Every layer engineered for sub-millimeter accuracy.",
    icon: Cog,
  },
  {
    title: "Design × Engineering",
    desc: "A seamless union of creativity and computation.",
    icon: Palette,
  },
  {
    title: "Rapid Prototyping",
    desc: "From concept to model in record turnaround times.",
    icon: Rocket,
  },
  {
    title: "Sustainable Materials",
    desc: "Eco-friendly filaments and optimized print paths.",
    icon: Leaf,
  },
  {
    title: "Dedicated Collaboration",
    desc: "From file prep to final polish — guided at every step.",
    icon: Handshake,
  },
];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function WhyUs() {
  return (
    <section
      id="whyus"
      className="relative flex min-h-[92vh] items-center justify-center overflow-hidden text-white"
    >
      {/* Background (same as Hero & Vision) */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.05] [background:repeating-linear-gradient(90deg,transparent_0_20px,rgba(255,255,255,0.05)_21px,transparent_22px)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_45%_at_50%_45%,rgba(5,5,6,0.95)_0%,rgba(10,10,11,1)_60%,#000_100%)]" />
      <div className="pointer-events-none absolute -left-24 top-20 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-16 h-56 w-56 rounded-full bg-orange-500/10 blur-3xl" />

      {/* Content */}
      <div className="relative z-10 w-[min(90vw,1100px)] text-center">
        <h2
          className="text-4xl md:text-5xl font-semibold mb-2"
          style={{ fontFamily: "StardusterLasital, Poppins, sans-serif" }}
        >
          Why Choose <span className="text-orange-500">Chroma3D</span>
        </h2>
        <p className="text-neutral-400 text-sm md:text-base mb-10">
          A fusion of precision, imagination, and sustainable engineering — designed to redefine creation.
        </p>

        {/* Bento Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
        >
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            const span =
              i === 0
                ? "lg:col-span-2"
                : i === 3
                ? "lg:row-span-2"
                : "lg:col-span-1";
            return (
              <motion.div
                key={i}
                variants={item}
                whileHover={{
                  y: -6,
                  boxShadow: "0 0 20px rgba(249,115,22,0.25)",
                }}
                className={`relative rounded-2xl border border-orange-500/20 bg-black/40 backdrop-blur-md p-6 md:p-8 ${span} transition`}
              >
                <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-orange-500/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
                <Icon className="h-7 w-7 text-orange-500 mb-4" />
                <h3 className="text-lg md:text-xl font-medium text-white mb-2">
                  {f.title}
                </h3>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  {f.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
