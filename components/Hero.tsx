"use client";

import { motion } from "framer-motion";
import { ArrowDown, Github, Download } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState, useMemo } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

function StarField() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const stars = useMemo(
    () =>
      Array.from({ length: 120 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2.5 + 0.5,
        duration: Math.random() * 5 + 3,
        delay: Math.random() * 6,
        opacity: Math.random() * 0.6 + 0.2,
      })),
    []
  );

  if (!mounted) return null;
  const isDark = theme !== "light";

  return (
    <>
      {stars.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            background: isDark ? "white" : "rgba(15,23,42,0.7)",
            animation: `twinkle ${s.duration}s ${s.delay}s ease-in-out infinite`,
          }}
        />
      ))}
    </>
  );
}

export function Hero() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = !mounted || theme !== "light";

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 animate-gradient-shift transition-all duration-700"
        style={{
          backgroundImage: isDark
            ? "linear-gradient(135deg, #0a1318 0%, #0f1923 30%, #0d2420 60%, #0f1923 100%)"
            : "linear-gradient(135deg, #dbeafe 0%, #ede9fe 40%, #e0f2fe 70%, #f0f9ff 100%)",
        }}
      />

      {/* Subtle overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: isDark
            ? "radial-gradient(ellipse at 50% 50%, rgba(0,212,170,0.08) 0%, transparent 70%)"
            : "radial-gradient(ellipse at 50% 50%, rgba(99,102,241,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Starry background */}
      <StarField />

      {/* Floating orbs */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 400,
          height: 400,
          left: "10%",
          top: "15%",
          background: isDark
            ? "radial-gradient(circle, rgba(0,212,170,0.06) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 300,
          height: 300,
          right: "8%",
          bottom: "20%",
          background: isDark
            ? "radial-gradient(circle, rgba(0,184,150,0.06) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Heading */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.2}
          className="text-6xl sm:text-7xl lg:text-8xl font-bold mb-4 tracking-tight leading-none"
          style={{ color: isDark ? "#ffffff" : "#0f172a" }}
        >
          Ashim Shrestha
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.4}
          className="text-2xl sm:text-3xl font-light mb-5 tracking-wide"
          style={{ color: isDark ? "#00d4aa" : "#0d9488" }}
        >
          Data Analyst &amp; Growth Analytics Professional
        </motion.p>

        {/* Tagline */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.6}
          className="text-lg max-w-xl mx-auto leading-relaxed mb-12"
          style={{ color: isDark ? "rgba(255,255,255,0.50)" : "rgba(15,23,42,0.60)" }}
        >
          I help businesses grow by turning customer data into acquisition strategies,
          retention improvements, and revenue-driving decisions across fintech,
          e-commerce, and marketing.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.8}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-accent hover:bg-accent-hover text-white font-semibold text-sm tracking-wide transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-[rgba(0,212,170,0.3)]"
          >
            View Projects
          </a>

          <a
            href="https://github.com/ashim1412"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold text-sm tracking-wide transition-all duration-200 hover:scale-105"
            style={{
              border: isDark ? "1px solid rgba(255,255,255,0.30)" : "1px solid rgba(15,23,42,0.25)",
              color: isDark ? "white" : "#0f172a",
            }}
          >
            <Github size={16} />
            GitHub
          </a>

          <a
            href="/Ashim-Shrestha.pdf"
            download="Ashim-Shrestha-Resume.pdf"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold text-sm tracking-wide transition-all duration-200 hover:scale-105"
            style={{
              border: isDark ? "1px solid rgba(255,255,255,0.30)" : "1px solid rgba(15,23,42,0.25)",
              color: isDark ? "white" : "#0f172a",
            }}
          >
            <Download size={16} />
            Download Resume
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        aria-label="Scroll down"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 transition-colors"
        style={{ color: isDark ? "rgba(255,255,255,0.35)" : "rgba(15,23,42,0.40)" }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={26} />
        </motion.div>
      </motion.a>
    </section>
  );
}
