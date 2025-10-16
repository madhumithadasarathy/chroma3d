import { useState } from "react";
import { NavLink } from "react-router-dom";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { motion } from "framer-motion";

const NAV = [
  { to: "/services", label: "Services" },
  { to: "/products", label: "Products" },
  { to: "/contact", label: "Contact" },
];

export default function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <header className="sticky top-0 z-50">
      {/* Thin top divider */}
      <div className="h-px w-full bg-white/10" />

      {/* Glassy nav bar with gradient underline */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="
          relative border-b border-white/10 bg-white/5 backdrop-blur-md
          after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0
          after:h-[1px] after:bg-gradient-to-r
          after:from-black after:via-orange-500 after:to-black
        "
      >
        <div className="h-16 w-full flex items-center justify-between px-[10px]">
          {/* Logo + brand */}
          <NavLink to="/" className="inline-flex items-center gap-3">
            <img
              src="/headerlogo.svg"
              alt="Chroma3D"
              className="h-9 sm:h-10 w-auto"
              draggable="false"
            />
            <span
              className="whitespace-nowrap leading-none text-[26px] sm:text-[30px]"
              style={{
                fontFamily: "'StardusterLasital', system-ui, sans-serif",
                lineHeight: "1",
              }}
            >
              <span className="text-white">chroma</span>
              <span className="text-orange-500">3D</span>
            </span>
          </NavLink>

          {/* Desktop Nav */}
          <nav className="hidden sm:flex items-center gap-8 text-sm text-white/80">
            {NAV.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                className={({ isActive }) =>
                  `transition-colors duration-300 ${
                    isActive ? "text-orange-500" : "hover:text-orange-500"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}

            <NavLink
              to="/get-quote"
              className={({ isActive }) =>
                `rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-white/90 transition-colors duration-300 ${
                  isActive
                    ? "text-orange-500"
                    : "hover:text-orange-500 hover:bg-white/15"
                }`
              }
            >
              Get Quote
            </NavLink>
          </nav>

          {/* Mobile Nav (hamburger) */}
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
                <MenuItem key={item.label} onClick={handleMenuClose}>
                  <NavLink
                    to={item.to}
                    className="w-full py-1.5 text-center transition-colors duration-300 hover:text-orange-500"
                  >
                    {item.label}
                  </NavLink>
                </MenuItem>
              ))}

              <MenuItem onClick={handleMenuClose}>
                <NavLink
                  to="/get-quote"
                  className="w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-center transition-colors duration-300 hover:text-orange-500"
                >
                  Get Quote
                </NavLink>
              </MenuItem>
            </Menu>
          </div>
        </div>
      </motion.div>
    </header>
  );
}
