import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--background) / <alpha-value>)",
        secondary: "rgb(var(--secondary) / <alpha-value>)",
        card: "rgb(var(--card) / <alpha-value>)",
        "accent-hover": "rgb(var(--accent-hover) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        border: "rgb(var(--border) / <alpha-value>)",
        // Homepage redesign palette. `accent.DEFAULT` preserves the legacy
        // `bg-accent`/`text-accent` used by the /resume route; the named
        // accents (accent-blue, accent-coral, …) are the new design system.
        accent: {
          DEFAULT: "rgb(var(--accent) / <alpha-value>)",
          blue: "#2f6bff",
          violet: "#7c4dff",
          coral: "#ff5b3a",
          emerald: "#12b981",
          amber: "#ffb020",
        },
        paper: "#f7f4ee",
        ink: "#16151d",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        wiggle: "wiggle 0.5s ease-in-out",
        float: "float 6s ease-in-out infinite",
        blob: "blob 10s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-14px) rotate(4deg)" },
        },
        blob: {
          "0%, 100%": { borderRadius: "60% 40% 55% 45% / 55% 45% 60% 40%" },
          "50%": { borderRadius: "45% 55% 40% 60% / 40% 60% 45% 55%" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
