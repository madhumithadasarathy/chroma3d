import { motion } from "framer-motion";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

export default function Footer() {
  // WhatsApp link with auto message
  const whatsappNumber = "919342972807"; // replace with your number (no '+' sign)
  const message = encodeURIComponent("Hi, I have a query about Chroma3D!");
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <footer className="relative bg-black text-neutral-300 py-12 px-8 overflow-hidden">
      {/* === Top Gradient Line === */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-black via-orange-600 to-black" />

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
            Transforming imagination into precision-crafted reality,
            where art meets engineering.
          </p>
        </div>

        {/* --- Column 2: Contact Details --- */}
        <div className="flex flex-col sm:items-center lg:items-start">
          <h3 className="text-orange-500/90 font-semibold mb-3 tracking-wider">
            CONTACT
          </h3>
          <div className="space-y-2 text-sm leading-relaxed text-neutral-300">
            <p className="font-medium text-white">Chroma3D</p>
            <p className="hover:text-orange-500 transition-colors">
              <a href="tel:+919342972807">+91 93429 72807</a>
            </p>
            <p className="max-w-xs">
              C23, 1st Floor RE Classic Apartments, 68, Baroda 3rd Street, <br />
              West Mambalam, Chennai – 600033
            </p>
          </div>
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
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15 }}
              className="text-white hover:text-orange-500 transition"
            >
              <WhatsAppIcon fontSize="medium" />
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
