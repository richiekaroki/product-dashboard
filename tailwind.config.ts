// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // scan everything in src/
  ],
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        "bounce-slow": "bounce 3s infinite",
      },
      colors: {
        accent: "#0a0a0a", // dark backgrounds
        muted: "#737373", // muted gray
        brand: "#404040", // neutral brand color
        "brand-hover": "#262626", // darker hover
      },
    },
  },
  plugins: [],
};

export default config;
