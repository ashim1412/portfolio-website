"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

// Each slide is a mini analytics widget for a real result from the About
// section, color-matched to that section's stat callouts.
type Slide = {
  file: string;
  stat: string;
  label: string;
  color: string;
  viz: "churn" | "conversion" | "cac";
};

const SLIDES: Slide[] = [
  { file: "churn_model.sql", stat: "−50%", label: "Customer churn rate", color: "#12b981", viz: "churn" },
  { file: "ab_test.sql", stat: "+18%", label: "A/B test conversion lift", color: "#ff5b3a", viz: "conversion" },
  { file: "acquisition.sql", stat: "−12%", label: "Customer acquisition cost", color: "#2f6bff", viz: "cac" },
];

// ── Per-slide visualizations ──
function Viz({ kind, color }: { kind: Slide["viz"]; color: string }) {
  if (kind === "churn") {
    // Downward area chart — churn declining month over month.
    return (
      <svg viewBox="0 0 300 130" preserveAspectRatio="none" className="w-full h-[130px]">
        <defs>
          <linearGradient id="churnFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.35" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0,32 L60,44 L120,58 L180,64 L240,78 L300,84 L300,130 L0,130 Z"
          fill="url(#churnFill)"
        />
        <polyline
          points="0,32 60,44 120,58 180,64 240,78 300,84"
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (kind === "conversion") {
    // Control vs. variant comparison — variant wins.
    const bars = [
      { label: "Control", h: 60, muted: true },
      { label: "Variant", h: 92, muted: false },
    ];
    return (
      <div className="h-[130px] flex items-end justify-center gap-10 px-2">
        {bars.map((b) => (
          <div key={b.label} className="flex flex-col items-center gap-2 w-20 h-full justify-end">
            <div
              className="w-full rounded-t-[6px]"
              style={{
                height: `${b.h}%`,
                backgroundColor: b.muted ? "rgba(247,244,238,0.15)" : color,
              }}
            />
            <span className="font-mono text-[11px] text-paper/45">{b.label}</span>
          </div>
        ))}
      </div>
    );
  }

  // cac: descending quarterly bars.
  const bars = [100, 90, 82, 74];
  return (
    <div>
      <div className="h-[110px] flex items-end gap-3">
        {bars.map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-[5px]"
            style={{ height: `${h}%`, backgroundColor: color, opacity: 1 - i * 0.14 }}
          />
        ))}
      </div>
      <div className="flex justify-between mt-2 font-mono text-[11px] text-paper/35 tracking-[0.04em]">
        <span>Q1</span>
        <span>Q2</span>
        <span>Q3</span>
        <span>Q4</span>
      </div>
    </div>
  );
}

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 48 : -48, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -48 : 48, opacity: 0 }),
};

function DashboardCard() {
  const [[index, dir], setState] = useState<[number, number]>([0, 1]);
  const [paused, setPaused] = useState(false);

  const paginate = (step: number) =>
    setState(([i]) => [(i + step + SLIDES.length) % SLIDES.length, step]);
  const goTo = (target: number) =>
    setState(([i]) => [target, target >= i ? 1 : -1]);

  // Auto-advance, paused on hover / drag.
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => paginate(1), 4500);
    return () => clearInterval(id);
  }, [paused, index]);

  const slide = SLIDES[index];

  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1], delay: 0.15 }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative rounded-[22px] bg-ink p-6 sm:p-7 text-paper shadow-[0_30px_60px_-30px_rgba(22,21,29,0.5)]"
    >
      <div className="relative min-h-[300px] overflow-hidden">
        <AnimatePresence custom={dir} mode="wait">
          <motion.div
            key={index}
            custom={dir}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) paginate(1);
              else if (info.offset.x > 60) paginate(-1);
            }}
            className="cursor-grab active:cursor-grabbing"
          >
            {/* Window chrome */}
            <div className="flex items-center gap-3 mb-7">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-accent-coral" />
                <span className="w-3 h-3 rounded-full bg-accent-amber" />
                <span className="w-3 h-3 rounded-full bg-accent-emerald" />
              </div>
              <span className="font-mono text-[12px] text-paper/45 tracking-[0.02em]">
                {slide.file}
              </span>
            </div>

            {/* Headline stat */}
            <div className="mb-6">
              <div
                className="font-display font-bold text-[44px] leading-none tracking-[-0.03em]"
                style={{ color: slide.color }}
              >
                {slide.stat}
              </div>
              <div className="font-mono text-[12px] uppercase tracking-[0.08em] text-paper/50 mt-2">
                {slide.label}
              </div>
            </div>

            {/* Visualization */}
            <Viz kind={slide.viz} color={slide.color} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide indicators */}
      <div className="flex items-center gap-2 mt-6">
        {SLIDES.map((s, i) => (
          <button
            key={s.file}
            onClick={() => goTo(i)}
            aria-label={`Show ${s.label}`}
            className="h-1.5 rounded-full transition-all duration-300"
            style={{
              width: i === index ? 22 : 6,
              backgroundColor: i === index ? s.color : "rgba(247,244,238,0.25)",
            }}
          />
        ))}
      </div>

      {/* Floating experience chip */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
        className="absolute -top-4 -right-3 sm:-right-4 flex items-center gap-2 rounded-full bg-accent-amber px-4 py-2 shadow-[0_12px_24px_-8px_rgba(255,176,32,0.6)]"
      >
        <span className="font-mono text-[13px] font-semibold text-ink tracking-[0.02em]">
          8+ yrs
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
