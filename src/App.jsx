import { motion } from "framer-motion";

export default function App() {
  return (
    <main className="min-h-screen">
      {/* Glassmorphic header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-white/5 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="font-semibold tracking-wider text-lg">Chroma3D</div>
          <nav className="flex gap-6 text-sm text-white/80">
            <a href="#" className="hover:text-white">Home</a>
            <a href="#" className="hover:text-white">Services</a>
            <a href="#" className="hover:text-white">Gallery</a>
            <a href="#" className="hover:text-white">Pricing</a>
            <a href="#" className="hover:text-white">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="mx-auto max-w-6xl px-4 py-24">
        <motion.h1
          className="text-4xl md:text-6xl font-bold tracking-tight"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Futuristic 3D Printing, <span className="text-white/70">Made Real</span>
        </motion.h1>

        <motion.p
          className="mt-6 max-w-2xl text-white/70"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          High-precision prints, rapid turnaround, and sleek design — powered by Bambu Lab X1C.
        </motion.p>

        <motion.div
          className="mt-12 p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xs"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="text-white/80">
            This is your glassmorphic content area.
          </div>
        </motion.div>
      </section>
    </main>
  );
}
