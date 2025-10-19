// src/Components/Contact/Location.jsx
import { motion } from "framer-motion";
import PlaceIcon from "@mui/icons-material/Place";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import TrainIcon from "@mui/icons-material/Train";
import LocalAirportIcon from "@mui/icons-material/LocalAirport";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";

export default function Location() {
  const mapsUrl =
    "https://www.google.com/maps?q=Chroma3D,+West+Mambalam,+Chennai&ll=&z=15";
  const directionsUrl =
    "https://www.google.com/maps/dir/?api=1&destination=Chroma3D,+West+Mambalam,+Chennai";

  const chipClasses =
    "inline-flex items-center gap-2 rounded-full bg-orange-500/10 border border-orange-600/40 px-3 py-1.5 text-xs font-medium text-orange-300 shadow-sm";

  return (
    <section className="mx-4 my-10 relative text-neutral-200 bg-black">
      {/* Soft orange ambient background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.08]"
        style={{
          background:
            "radial-gradient(600px 200px at 20% 20%, rgba(249,115,22,0.3) 0%, transparent 60%), radial-gradient(600px 200px at 80% 80%, rgba(255,115,22,0.25) 0%, transparent 60%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 rounded-2xl border border-neutral-800 bg-black/60 shadow-[0_0_50px_rgba(249,115,22,0.08)] overflow-hidden backdrop-blur-xl"
      >
        <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
          {/* === Left Section === */}
          <div className="lg:col-span-2">
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="text-neutral-300 leading-relaxed text-sm"
            >
              <div className="uppercase tracking-widest text-orange-500 flex items-center gap-1">
                <PlaceIcon fontSize="small" /> Location
              </div>
              <div className="text-2xl uppercase tracking-widest mb-2 mt-2 text-white font-semibold">
                Reach. Discover. Innovate.
              </div>
              <span className="font-semibold text-orange-400">
                Getting here is effortless!
              </span>{" "}
              Whether by metro, cab, or bike — follow the pin to our creative
              workspace in the heart of Chennai, where innovation meets design.
            </motion.p>

            {/* Travel mode chips */}
            <div className="mt-5 flex flex-wrap gap-2">
              <span className={chipClasses}>
                <TrainIcon fontSize="small" /> Metro / Train
              </span>
              <span className={chipClasses}>
                <DirectionsBusIcon fontSize="small" /> City Buses
              </span>
              <span className={chipClasses}>
                <DirectionsCarIcon fontSize="small" /> Car / Cab
              </span>
              <span className={chipClasses}>
                <TwoWheelerIcon fontSize="small" /> Bike
              </span>
              <span className={chipClasses}>
                <LocalAirportIcon fontSize="small" /> From Airport
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-full bg-orange-600 hover:bg-orange-500 text-white px-5 py-2.5 text-sm font-semibold border border-orange-500 transition-all"
              >
                Open in Google Maps
              </a>
              <a
                href={directionsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-full bg-white/10 text-orange-400 px-5 py-2.5 text-sm font-semibold border border-orange-500/40 hover:bg-orange-500/10 transition-all"
              >
                Get Directions
              </a>
            </div>

            {/* Tips */}
            <ul className="mt-4 space-y-1.5 text-xs text-neutral-400">
              <li>Tip: Save the pin ★ for easy future access.</li>
              <li>Arriving in a group? Drop off at the main entrance.</li>
            </ul>
          </div>

          {/* === Right Section (Map) === */}
          <div className="lg:col-span-3">
            <div className="relative rounded-2xl overflow-hidden border border-neutral-800 shadow-[0_0_30px_rgba(249,115,22,0.1)]">
              <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" />
              <div className="aspect-[16/10] bg-neutral-900">
                <iframe
                  title="Chroma3D Location Map"
                  src="https://www.google.com/maps?q=Chroma3D,+West+Mambalam,+Chennai&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full border-0"
                  allowFullScreen
                />
              </div>

              <div className="px-4 py-3 bg-black/80 border-t border-neutral-800 text-sm text-neutral-300 flex flex-wrap items-center justify-between gap-2">
                <span>
                  Pin set to{" "}
                  <span className="text-orange-400 font-medium">
                    Chroma3D Studio, Chennai
                  </span>
                </span>
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="underline underline-offset-4 hover:text-orange-400"
                >
                  Start navigation →
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
