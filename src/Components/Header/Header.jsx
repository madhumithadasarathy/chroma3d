import { useState } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { motion } from "framer-motion";

const NAV = [
  { href: "#services", label: "Services" },
  { href: "#products", label: "Products" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <header className="sticky top-0 z-50">
      {/* thin top divider */}
      <div className="h-px w-full bg-white/10"></div>

      {/* glass bar with black→orange→black gradient line at bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="
          relative border-b border-white/10 bg-white/5 backdrop-blur-md
          after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0
          after:h-[2px] after:bg-gradient-to-r
          after:from-black after:via-orange-500 after:to-black
        "
      >
        {/* full-width row with 10px horizontal margin */}
        <div className="h-16 w-full flex items-center justify-between px-[10px]">
          {/* Left: Logo */}
          <a href="#" className="inline-flex items-center gap-2">
            <img
              src="/headerlogo.svg"
              alt="Chroma3D"
              className="h-9 sm:h-10 w-auto"
              draggable="false"
            />
          </a>

          {/* Right: Nav (visible from sm and up) */}
          <nav className="hidden sm:flex items-center gap-8 text-sm text-white/80">
            {NAV.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="hover:text-white transition"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              className="rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-white/90 hover:bg-white/15 transition"
            >
              Get Quote
            </a>
          </nav>

          {/* Phone: hamburger only (< sm) */}
          <div className="sm:hidden">
            <IconButton
              aria-label="Open menu"
              aria-controls={open ? "mobile-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleMenuOpen}
              size="small"
              sx={{
                color: "white",
                backgroundColor: "rgba(255,255,255,0.08)",
                borderRadius: "12px",
                "&:hover": { backgroundColor: "rgba(255,255,255,0.14)" },
              }}
            >
              <MenuIcon fontSize="small" />
            </IconButton>

            <Menu
              id="mobile-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              PaperProps={{
                sx: {
                  mt: 1,
                  borderRadius: 2,
                  bgcolor: "rgba(20,20,22,0.9)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "white",
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem
                onClick={handleMenuClose}
                sx={{ justifyContent: "flex-end", py: 0.5 }}
              >
                <CloseRoundedIcon fontSize="small" />
              </MenuItem>

              {NAV.map((item) => (
                <MenuItem
                  key={item.label}
                  onClick={handleMenuClose}
                  sx={{ "& a": { width: "100%" } }}
                >
                  <a href={item.href} className="w-full py-1.5">
                    {item.label}
                  </a>
                </MenuItem>
              ))}

              <MenuItem onClick={handleMenuClose}>
                <a
                  href="#contact"
                  className="w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-center"
                >
                  Get Quote
                </a>
              </MenuItem>
            </Menu>
          </div>
        </div>
      </motion.div>
    </header>
  );
}
