"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, animate } from "framer-motion";
import { Folder, Star, GitCommit } from "lucide-react";
import {
  fetchUserStats,
  fetchLanguageStats,
  type UserStats,
  type LanguageStat,
} from "@/lib/github";

const GITHUB_USERNAME = "ashim1412";

// ── Language config ────────────────────────────────────────────────────────────
const LANG_CONFIG: Record<
  string,
  { color: string; bg: string; emoji: string }
> = {
  Python:     { color: "#3b82f6", bg: "bg-blue-500",   emoji: "🐍" },
  JavaScript: { color: "#fbbf24", bg: "bg-yellow-400", emoji: "⚡" },
  TypeScript: { color: "#60a5fa", bg: "bg-blue-400",   emoji: "🔷" },
  SQL:        { color: "#10b981", bg: "bg-emerald-500", emoji: "🗄️" },
};
function langConfig(name: string) {
  return LANG_CONFIG[name] ?? { color: "#6b7280", bg: "bg-gray-500", emoji: "📦" };
}

// ── Animated counter ───────────────────────────────────────────────────────────
function CountUp({
  to,
  suffix = "",
  duration = 1.8,
  triggered,
}: {
  to: number;
  suffix?: string;
  duration?: number;
  triggered: boolean;
}) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!triggered) return;
    const controls = animate(0, to, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [triggered, to, duration]);

  return (
    <span>
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}

// ── Skeleton pieces ────────────────────────────────────────────────────────────
function StatCardSkeleton() {
  return (
    <div className="animate-pulse rounded-xl border border-white/8 bg-[#1a1a1a] p-8 flex flex-col items-center gap-4">
      <div className="w-12 h-12 rounded-full bg-white/10" />
      <div className="h-10 w-24 rounded bg-white/10" />
      <div className="h-4 w-32 rounded bg-white/8" />
    </div>
  );
}

function LangBarSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      {[80, 55, 40, 25, 15].map((w, i) => (
        <div key={i} className="flex items-center gap-4">
          <div className="w-24 h-4 rounded bg-white/10" />
          <div className="flex-1 h-3 rounded-full bg-white/8">
            <div className={`h-full rounded-full bg-white/10`} style={{ width: `${w}%` }} />
          </div>
          <div className="w-10 h-4 rounded bg-white/10" />
        </div>
      ))}
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────
export function Stats() {
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [langStats, setLangStats] = useState<LanguageStat[]>([]);
  const [userStatus, setUserStatus] = useState<"loading" | "success" | "error">("loading");
  const [langStatus, setLangStatus] = useState<"loading" | "success" | "error">("loading");

  const sectionRef = useRef(null);
  const barsRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const barsInView = useInView(barsRef, { once: true, margin: "-60px" });

  useEffect(() => {
    fetchUserStats(GITHUB_USERNAME)
      .then((d) => { setUserStats(d); setUserStatus("success"); })
      .catch(() => setUserStatus("error"));

    fetchLanguageStats(GITHUB_USERNAME)
      .then((d) => { setLangStats(d); setLangStatus("success"); })
      .catch(() => setLangStatus("error"));
  }, []);

  // Fallback numbers shown on API error
  const FALLBACK: UserStats = { public_repos: 20, followers: 10, total_stars: 50 };
  const stats = userStats ?? (userStatus === "error" ? FALLBACK : null);

  const statCards = [
    {
      icon: Folder,
      value: stats?.public_repos ?? 0,
      label: "Total Repositories",
      suffix: "",
    },
    {
      icon: Star,
      value: stats?.total_stars ?? 0,
      label: "Stars Earned",
      suffix: "",
    },
    {
      icon: GitCommit,
      value: 1000,
      label: "Contributions This Year",
      suffix: "+",
    },
  ];

  return (
    <section
      id="stats"
      ref={sectionRef}
      className="py-20 px-6 bg-background"
    >
      <div className="max-w-7xl mx-auto">

        {/* ── Header ── */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-white text-center mb-16"
        >
          By The Numbers
        </motion.h2>

        {/* ── Stat cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {userStatus === "loading"
            ? [0, 1, 2].map((i) => <StatCardSkeleton key={i} />)
            : statCards.map(({ icon: Icon, value, label, suffix }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  className="group flex flex-col items-center text-center rounded-xl border border-white/8 bg-[#1a1a1a] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-[0_8px_30px_rgba(59,130,246,0.12)] backdrop-blur-sm"
                >
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-full bg-blue-500/15 border border-blue-500/20 flex items-center justify-center mb-5 group-hover:bg-blue-500/25 transition-colors">
                    <Icon size={22} className="text-blue-400" />
                  </div>

                  {/* Animated number */}
                  <p className="text-5xl font-bold text-blue-400 mb-2 tabular-nums">
                    <CountUp
                      to={value}
                      suffix={suffix}
                      triggered={isInView && userStatus !== "loading"}
                    />
                  </p>

                  {/* Label */}
                  <p className="text-gray-400 text-sm font-medium">{label}</p>

                  {/* Error note */}
                  {userStatus === "error" && (
                    <p className="text-xs text-gray-600 mt-2">(estimated)</p>
                  )}
                </motion.div>
              ))}
        </div>

        {/* ── Language section ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="text-3xl font-bold text-white text-center mb-10">
            Most Used Languages
          </h3>

          {langStatus === "loading" && <LangBarSkeleton />}

          {langStatus === "error" && (
            <p className="text-center text-gray-500 text-sm">
              Language stats unavailable.
            </p>
          )}

          {langStatus === "success" && langStats.length > 0 && (
            <>
              {/* ── Horizontal bar chart ── */}
              <div ref={barsRef} className="max-w-2xl mx-auto space-y-5 mb-12">
                {langStats.map(({ language, percentage }, i) => {
                  const { color, emoji } = langConfig(language);
                  return (
                    <motion.div
                      key={language}
                      initial={{ opacity: 0, x: -20 }}
                      animate={barsInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="flex items-center gap-4"
                    >
                      {/* Label */}
                      <div className="w-28 flex items-center gap-2 shrink-0">
                        <span className="text-base leading-none">{emoji}</span>
                        <span className="text-sm text-gray-300 font-medium truncate">
                          {language}
                        </span>
                      </div>

                      {/* Bar track */}
                      <div className="flex-1 h-3 rounded-full bg-white/8 overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: color }}
                          initial={{ width: "0%" }}
                          animate={
                            barsInView ? { width: `${percentage}%` } : {}
                          }
                          transition={{
                            duration: 1.2,
                            delay: i * 0.12,
                            ease: [0.25, 0.46, 0.45, 0.94],
                          }}
                        />
                      </div>

                      {/* Percentage */}
                      <span className="w-10 text-right text-sm text-gray-400 tabular-nums">
                        {percentage}%
                      </span>
                    </motion.div>
                  );
                })}
              </div>

              {/* ── Language cards grid ── */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {langStats.map(({ language, percentage }, i) => {
                  const { color, bg, emoji } = langConfig(language);
                  // Circumference of r=20 circle for progress ring
                  const r = 20;
                  const circ = 2 * Math.PI * r;
                  const dash = (percentage / 100) * circ;

                  return (
                    <motion.div
                      key={language}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={barsInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.4, delay: 0.6 + i * 0.08 }}
                      className="group flex flex-col items-center rounded-xl border border-white/8 bg-[#1a1a1a] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-[0_4px_20px_rgba(59,130,246,0.1)]"
                    >
                      {/* Circular progress */}
                      <div className="relative mb-3">
                        <svg width="56" height="56" className="-rotate-90">
                          <circle
                            cx="28" cy="28" r={r}
                            fill="none"
                            stroke="rgba(255,255,255,0.08)"
                            strokeWidth="4"
                          />
                          <motion.circle
                            cx="28" cy="28" r={r}
                            fill="none"
                            stroke={color}
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeDasharray={circ}
                            initial={{ strokeDashoffset: circ }}
                            animate={
                              barsInView
                                ? { strokeDashoffset: circ - dash }
                                : {}
                            }
                            transition={{
                              duration: 1.4,
                              delay: 0.6 + i * 0.12,
                              ease: "easeOut",
                            }}
                          />
                        </svg>
                        {/* Emoji in centre */}
                        <span className="absolute inset-0 flex items-center justify-center text-lg leading-none rotate-90">
                          {emoji}
                        </span>
                      </div>

                      <p className="text-sm font-semibold text-white mb-0.5">
                        {language}
                      </p>
                      <p className="text-xs text-gray-500 tabular-nums">
                        {percentage}%
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
