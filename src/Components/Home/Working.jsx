// src/Components/Home/Working_LadderWithImage.jsx
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const steps = [
  { title: "Concept", text: "Understand idea and define goals." },
  { title: "Design", text: "Create precise 3D CAD models." },
  { title: "Prototype", text: "Print, test, and refine design." },
  { title: "Print", text: "Produce final parts with precision." },
  { title: "Deliver", text: "Inspect, package, and dispatch safely." },
];

export default function Working() {
  const [active, setActive] = useState(0);
  const controls = useAnimation();
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);

  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setActive((a) => (a + 1) % steps.length), 4500);
    return () => clearInterval(id);
  }, [inView]);

  return (
    <section
      ref={ref}
      className="relative flex flex-col md:flex-row min-h-[92vh] items-center justify-center overflow-hidden bg-black text-neutral-200 px-8"
    >
      {/* === Ambient Orange Hollows === */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={controls}
        variants={{
          visible: { opacity: 1, scale: 1, transition: { duration: 1.5 } },
        }}
        className="pointer-events-none absolute top-20 left-24 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={controls}
        variants={{
          visible: { opacity: 1, scale: 1, transition: { duration: 1.8, delay: 0.2 } },
        }}
        className="pointer-events-none absolute bottom-32 right-32 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl"
      />

      {/* === Left Panel === */}
      <motion.div
        initial={{ opacity: 0, x: -80 }}
        animate={controls}
        variants={{
          visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 1, ease: "easeOut" },
          },
        }}
        className="relative w-full md:w-1/2 flex flex-col items-start justify-center mb-10 md:mb-0 z-20"
      >
        <div className="mb-2 text-[15px] tracking-[0.3em] text-orange-500/80">
          OUR PROCESS
        </div>
        <h2
          className="text-4xl md:text-5xl font-semibold text-white"
          style={{ fontFamily: "StardusterLasital, Poppins, sans-serif" }}
        >
          The <span className="text-orange-500">Working Ladder</span>
        </h2>
        <p className="mt-4 text-sm md:text-base text-neutral-400 max-w-md">
          A simple, precise, and reliable workflow, turning your ideas into flawless 3D creations.
        </p>
      </motion.div>

      {/* === Right Section (Background shifted to far right) === */}
      <motion.div
        initial={{ opacity: 0, x: 80 }}
        animate={controls}
        variants={{
          visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 1, ease: "easeOut", delay: 0.3 },
          },
        }}
        className="relative w-full md:w-1/2 flex items-center justify-start md:justify-end h-[500px] md:h-[600px]"
      >
        {/* Background Image — anchored to far right */}
        <img
          src="/working_bg.svg"
          alt="Working process background"
          className="absolute right-0 top-0 w-[110%] h-full object-cover object-right"
          style={{
            borderRadius: "0",
            minHeight: "100%",
            transform: "translateX(5%)",
          }}
        />

        {/* Ladder Flow - Shifted left for balance */}
        <div className="relative z-10 flex flex-col items-start justify-center w-[75%] md:w-[65%] translate-x-[-5%] space-y-6">
          {steps.map((s, i) => (
            <motion.div
              key={i}
              className={`relative w-full rounded-xl border backdrop-blur-md px-6 py-4 shadow-[0_0_30px_rgba(0,0,0,0.6)]
                ${
                  active === i
                    ? "border-orange-500/60 bg-white/10"
                    : "border-neutral-800/40 bg-white/5"
                }`}
              initial={{ opacity: 0, y: 40 }}
              animate={controls}
              variants={{
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, delay: 0.5 + i * 0.15 },
                },
              }}
            >
              {active === i && (
                <motion.div
                  className="absolute inset-0 rounded-xl bg-orange-500/10"
                  animate={{ opacity: [0.3, 0.7, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}

              <div className="relative z-10">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-[12px] h-[12px] rounded-full ${
                      active === i
                        ? "bg-orange-500 shadow-[0_0_12px_rgba(249,115,22,0.8)]"
                        : "bg-neutral-700"
                    }`}
                  />
                  <h3
                    className={`font-semibold ${
                      active === i ? "text-orange-400" : "text-neutral-300"
                    }`}
                  >
                    {s.title}
                  </h3>
                </div>
                <p className="mt-2 text-xs md:text-sm text-neutral-300 leading-snug">
                  {s.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
