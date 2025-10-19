import { motion } from "framer-motion";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";

export default function Footer() {
  return (
    <footer className="relative bg-black text-neutral-300 py-12 px-8 overflow-hidden">
      {/* === Orange glows === */}
      <div className="pointer-events-none absolute top-10 left-16 h-48 w-48 rounded-full bg-orange-500/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 right-16 h-56 w-56 rounded-full bg-orange-500/10 blur-3xl" />

      {/* === Grid Layout === */}
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {/* --- Column 1: Logo + tagline --- */}
        <div>
          <h2
            className="text-3xl font-semibold text-white tracking-wide"
            style={{ fontFamily: "StardusterLasital, Poppins, sans-serif" }}
          >
            Chroma<span className="text-orange-500">3D</span>
          </h2>
          <p className="mt-3 text-sm text-neutral-400 max-w-xs leading-relaxed">
            Transforming imagination into precision-crafted reality —
            where art meets engineering.
          </p>
        </div>

        {/* --- Column 2: Quick links --- */}
        <div className="flex flex-col sm:items-center lg:items-start">
          <h3 className="text-orange-500/90 font-semibold mb-3 tracking-wider">
            QUICK LINKS
          </h3>
          <ul className="space-y-2 text-sm">
            {[
              { name: "Home", href: "#home" },
              { name: "Vision", href: "#vision" },
              { name: "Why Us", href: "#why-us" },
              { name: "Working", href: "#working" },
              { name: "Contact", href: "#contact" },
            ].map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="hover:text-orange-500 transition-colors duration-200"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* --- Column 3: Socials --- */}
        <div className="flex flex-col sm:items-end lg:items-end">
          <h3 className="text-orange-500/90 font-semibold mb-3 tracking-wider">
            CONNECT WITH US
          </h3>
          <div className="flex gap-4">
            <motion.a
              href="https://www.instagram.com/YOUR_INSTAGRAM_LINK"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15 }}
              className="text-white hover:text-orange-500 transition"
            >
              <InstagramIcon fontSize="medium" />
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.15 }}
              className="text-white hover:text-orange-500 transition"
            >
              <LinkedInIcon fontSize="medium" />
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.15 }}
              className="text-white hover:text-orange-500 transition"
            >
              <TwitterIcon fontSize="medium" />
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.15 }}
              className="text-white hover:text-orange-500 transition"
            >
              <YouTubeIcon fontSize="medium" />
            </motion.a>
          </div>
        </div>
      </div>

      {/* --- Divider & Bottom Note --- */}
      <div className="relative z-10 mt-10 border-t border-white/10 pt-6 text-center text-xs text-neutral-500">
        © {new Date().getFullYear()} <span className="text-orange-500">Chroma3D</span>. 
        All rights reserved.
      </div>
    </footer>
  );
}
