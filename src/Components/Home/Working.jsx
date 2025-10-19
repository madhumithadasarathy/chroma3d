// src/Components/Home/Working_LadderWithImage.jsx
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const steps = [
  { title: "Concept", text: "The spark of creativity — where imagination begins." },
  { title: "Design", text: "Translating ideas into precise digital blueprints." },
  { title: "Prototype", text: "Testing and refining until it fits perfectly." },
  { title: "Print", text: "Fusing innovation and material, layer by layer." },
  { title: "Deliver", text: "Your concept brought to life with craftsmanship." },
];

export default function Working() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % steps.length), 4500);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative flex flex-col md:flex-row min-h-[92vh] items-center justify-center bg-[#0a0a0b] text-neutral-200 overflow-hidden px-8">
      {/* Background */}
      <div className="absolute inset-0 opacity-[0.05] [background:repeating-linear-gradient(90deg,transparent_0_20px,rgba(255,255,255,0.06)_21px,transparent_22px)]" />
      <div className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-20 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" />

      {/* Left Panel */}
      <div className="relative w-full md:w-1/2 flex flex-col items-start justify-center mb-10 md:mb-0 z-10">
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
          Every step in our process builds on the last — rising steadily toward
          a flawless creation. From concept to final print, we climb this ladder
          of imagination together.
        </p>
      </div>

      {/* Right Half with Image and Ladder Overlay */}
      <div className="relative w-full md:w-1/2 flex items-center justify-center h-[500px] md:h-[600px]">
        {/* Background Image */}
        <img
          src="/working_bg.jpg"
          alt="Working process background"
          className="absolute inset-0 w-full h-full object-cover rounded-xl opacity-30 md:opacity-40"
        />

        {/* Ladder Overlay */}
        <div className="relative flex flex-col items-start justify-center w-[80%]">
          {/* Vertical glowing line */}
          <motion.div
            className="absolute left-3 top-0 w-[2px] bg-gradient-to-b from-transparent via-orange-500/50 to-transparent"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ height: "85%" }}
          />

          {steps.map((s, i) => (
            <motion.div
              key={i}
              className="relative flex items-start mb-8 pl-6"
              initial={{ opacity: 0, x: -30 }}
              animate={{
                opacity: active >= i ? 1 : 0.3,
                x: active === i ? 0 : -10,
              }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              {/* Step node */}
              <div
                className={`absolute left-0 top-[6px] w-[10px] h-[10px] rounded-full ${
                  active === i
                    ? "bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.6)]"
                    : "bg-neutral-700"
                }`}
              />
              <div>
                <h3
                  className={`font-semibold ${
                    active === i ? "text-orange-400" : "text-neutral-400"
                  }`}
                >
                  {s.title}
                </h3>
                <p className="text-xs md:text-sm text-neutral-300 max-w-sm mt-1">
                  {s.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
