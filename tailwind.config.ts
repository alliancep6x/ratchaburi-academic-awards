import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        midnight: "#061126",
        royal: "#0b1f4d",
        sapphire: "#102f73",
        gold: "#d7aa42",
        "gold-light": "#f7df9b",
        platinum: "#e8edf5",
        bronze: "#b8783c"
      },
      boxShadow: {
        glow: "0 0 34px rgba(215, 170, 66, 0.28)",
        glass: "0 20px 60px rgba(0, 0, 0, 0.28)"
      },
      fontFamily: {
        thai: ["var(--font-prompt)", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
