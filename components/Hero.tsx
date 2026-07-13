"use client";

import { motion } from "framer-motion";
import { personalInfo } from "@/data/portfolio";

// Highlighter-style phrase: a gradient filling only the bottom third of the
// text, so it reads like a marker swipe. Wraps cleanly across line breaks.
function Highlight({
  children,
  color,
}: {
  children: React.ReactNode;
  color: string;
}) {
  return (
    <span
      className="px-0.5"
      style={{
        backgroundImage: `linear-gradient(to top, ${color} 34%, transparent 34%)`,
        boxDecorationBreak: "clone",
        WebkitBoxDecorationBreak: "clone",
      }}
    >
      {children}
    </span>
  );
}

// 7 quarterly-growth bars whose color ramps blue → violet → emerald → coral
// as they climb.
const BARS = [
  { h: 38, c: "#2f6bff" },
  { h: 50, c: "#2f6bff" },
  { h: 46, c: "#7c4dff" },
  { h: 64, c: "#7c4dff" },
  { h: 72, c: "#12b981" },
  { h: 86, c: "#12b981" },
  { h: 100, c: "#ff5b3a" },
];

function DashboardCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1], delay: 0.15 }}
      className="relative rounded-[22px] bg-ink p-6 sm:p-7 text-paper shadow-[0_30px_60px_-30px_rgba(22,21,29,0.5)]"
    >
      {/* Window chrome */}
      <div className="flex items-center gap-3 mb-7">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-accent-coral" />
          <span className="w-3 h-3 rounded-full bg-accent-amber" />
          <span className="w-3 h-3 rounded-full bg-accent-emerald" />
        </div>
        <span className="font-mono text-[12px] text-paper/45 tracking-[0.02em]">
          revenue_growth.sql
        </span>
      </div>

      {/* Headline stat */}
      <div className="mb-7">
        <div className="font-display font-bold text-[44px] leading-none tracking-[-0.03em] text-accent-emerald">
          +42%
        </div>
        <div className="font-mono text-[12px] uppercase tracking-[0.08em] text-paper/50 mt-2">
          YoY revenue lift
        </div>
      </div>

      {/* Bar chart */}
      <div className="h-[140px] flex items-end gap-2.5">
        {BARS.map((bar, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-t-[5px] origin-bottom"
            style={{ height: `${bar.h}%`, backgroundColor: bar.c }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{
              duration: 0.6,
              ease: [0.2, 0.7, 0.2, 1],
              delay: 0.4 + i * 0.1,
            }}
          />
        ))}
      </div>

      {/* Axis */}
      <div className="flex justify-between mt-3 font-mono text-[11px] text-paper/35 tracking-[0.04em]">
        <span>Q1</span>
        <span>Q2</span>
        <span>Q3</span>
        <span>Q4</span>
      </div>

      {/* Floating churn chip */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
        className="absolute -top-4 -right-3 sm:-right-4 flex items-center gap-2 rounded-full bg-accent-amber px-4 py-2 shadow-[0_12px_24px_-8px_rgba(255,176,32,0.6)]"
      >
        <span className="font-mono text-[13px] font-semibold text-ink tracking-[0.02em]">
          churn −50%
        </span>
      </motion.div>
    </motion.div>
  );
}

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden px-5 sm:px-8 pt-28 pb-16 lg:pt-36 lg:pb-24"
    >
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-12 items-center">
        {/* Left */}
        <div>
          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-ink/12 bg-white mb-8">
            <motion.span
              className="w-2 h-2 rounded-full bg-accent-emerald"
              animate={{ opacity: [1, 0.25, 1] }}
              transition={{ duration: 1.8, ease: "easeInOut", repeat: Infinity }}
            />
            <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink/70">
              Data Analyst · Growth Analytics
            </span>
          </div>

          {/* Headline */}
          <h1
            className="font-display font-bold leading-[0.92] tracking-[-0.035em] text-ink"
            style={{ fontSize: "clamp(48px, 8vw, 104px)" }}
          >
            Ashim
            <br />
            <span className="text-accent-blue">Shrestha</span>
            <span className="text-accent-coral">.</span>
          </h1>

          {/* Intro */}
          <p className="mt-7 max-w-xl text-[17px] leading-[1.6] text-ink/70">
            I help businesses grow by turning customer data into{" "}
            <Highlight color="rgba(255,214,0,0.45)">smarter acquisition</Highlight>,{" "}
            <Highlight color="rgba(18,185,129,0.35)">stronger retention</Highlight>, and{" "}
            <Highlight color="rgba(255,91,58,0.32)">revenue-driving decisions</Highlight>{" "}
            across fintech, e-commerce, and marketing.
          </p>

          {/* Buttons */}
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-ink hover:bg-accent-coral text-paper font-mono text-[13px] uppercase tracking-[0.04em] transition-colors duration-200"
            >
              View Projects <span aria-hidden>→</span>
            </a>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-ink/15 hover:border-ink text-ink font-mono text-[13px] uppercase tracking-[0.04em] transition-colors duration-200"
            >
              GitHub
            </a>
            <a
              href="/Ashim-Shrestha.pdf"
              download="Ashim-Shrestha-Resume.pdf"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-ink/15 hover:border-ink text-ink font-mono text-[13px] uppercase tracking-[0.04em] transition-colors duration-200"
            >
              Download Resume
            </a>
          </div>
        </div>

        {/* Right */}
        <DashboardCard />
      </div>
    </section>
  );
}
