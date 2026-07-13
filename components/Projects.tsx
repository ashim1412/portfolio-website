"use client";

import { motion } from "framer-motion";
import { personalInfo } from "@/data/portfolio";

const projects = [
  {
    title: "Churn Early-Warning Model",
    tag: "Fintech · Retention",
    description:
      "A propensity model flagging at-risk customers weeks before churn, wired into lifecycle campaigns.",
    metric: "churn −50%",
    metricColor: "#12b981",
    gradient: "linear-gradient(135deg, #12b981, #2f6bff)",
  },
  {
    title: "Experimentation Framework",
    tag: "Growth · A/B Testing",
    description:
      "An end-to-end A/B testing framework standardizing experiment design, analysis, and rollout decisions.",
    metric: "conversion +18%",
    metricColor: "#ff5b3a",
    gradient: "linear-gradient(135deg, #ff5b3a, #ffb020)",
  },
  {
    title: "Marketplace KPI Warehouse",
    tag: "E-commerce · BI",
    description:
      "A unified KPI warehouse consolidating marketplace metrics for 50+ product, marketing, and credit stakeholders.",
    metric: "CAC −12%",
    metricColor: "#7c4dff",
    gradient: "linear-gradient(135deg, #7c4dff, #2f6bff)",
  },
];

const STRIPES =
  "repeating-linear-gradient(45deg, rgba(255,255,255,0.1) 0, rgba(255,255,255,0.1) 1px, transparent 1px, transparent 11px)";

export function Projects() {
  return (
    <section
      id="projects"
      className="scroll-mt-20 px-5 sm:px-8 py-16 lg:py-28"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header row */}
        <div className="flex flex-wrap items-end justify-between gap-4 mb-12">
          <div>
            <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-accent-blue mb-4">
              // Featured Projects
            </p>
            <h2
              className="font-display font-bold tracking-[-0.02em] text-ink"
              style={{ fontSize: "clamp(32px, 4.5vw, 56px)" }}
            >
              Data-driven solutions
            </h2>
          </div>
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[13px] uppercase tracking-[0.04em] text-accent-coral underline underline-offset-4 decoration-accent-coral/40 hover:decoration-accent-coral transition-colors"
          >
            See all on GitHub →
          </a>
        </div>

        {/* Cards */}
        <div className="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(320px,1fr))]">
          {projects.map((project, i) => (
            <motion.a
              key={project.title}
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1], delay: i * 0.1 }}
              className="group flex flex-col rounded-[22px] border border-ink/10 bg-white overflow-hidden transition-all duration-200 hover:-translate-y-1.5 hover:border-ink/25 hover:shadow-[0_30px_50px_-30px_rgba(22,21,29,0.4)]"
            >
              {/* Color-block header */}
              <div
                className="relative h-[168px]"
                style={{ backgroundImage: project.gradient }}
              >
                <div className="absolute inset-0" style={{ backgroundImage: STRIPES }} />
                <span className="absolute top-4 left-4 font-mono text-[11px] uppercase tracking-[0.08em] text-white px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-sm">
                  {project.tag}
                </span>
              </div>

              {/* Body */}
              <div className="flex flex-col flex-1 p-6">
                <h3 className="font-display font-semibold text-[21px] tracking-[-0.01em] text-ink mb-2">
                  {project.title}
                </h3>
                <p className="text-[15px] leading-[1.55] text-ink/60 mb-6 flex-1">
                  {project.description}
                </p>
                <div className="flex items-center justify-between">
                  <span
                    className="font-mono text-[13px] font-semibold tracking-[0.02em]"
                    style={{ color: project.metricColor }}
                  >
                    {project.metric}
                  </span>
                  <span className="text-ink/40 group-hover:text-ink group-hover:translate-x-1 transition-all" aria-hidden>
                    →
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
