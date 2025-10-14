/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        base: {
          bg: "#0b0b0c",         // matte black
          card: "rgba(255,255,255,0.06)", // glass effect
          edge: "rgba(255,255,255,0.12)",
        }
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
