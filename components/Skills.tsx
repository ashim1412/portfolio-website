"use client";

import { motion } from "framer-motion";

const skillGroups = [
  {
    title: "Growth & Marketing Analytics",
    color: "#ff5b3a",
    tags: [
      "Customer Segmentation",
      "Cohort Analysis",
      "A/B Testing & Experimentation",
      "Funnel Analysis",
      "Retention Modeling",
      "LTV / CAC",
      "Lifecycle Analytics",
      "RFM Analysis",
      "Marketing Performance",
      "CRM Analytics",
    ],
  },
  {
    title: "Data Analysis & Modeling",
    color: "#2f6bff",
    tags: [
      "SQL (CTEs, window functions)",
      "Python (Pandas, NumPy, Scikit-learn)",
      "Time Series Forecasting",
      "Regression",
      "Churn Prediction",
      "Credit Risk Scoring",
      "Feature Engineering",
    ],
  },
  {
    title: "BI & Visualization",
    color: "#7c4dff",
    tags: [
      "Tableau",
      "Power BI",
      "Looker",
      "Metabase",
      "Looker Studio",
      "Google Analytics 4",
      "Google Tag Manager",
    ],
  },
  {
    title: "Domain Expertise",
    color: "#12b981",
    tags: [
      "Fintech & Credit Risk",
      "E-commerce & Marketplace Analytics",
      "Marketing Analytics",
      "CRM & Lifecycle",
      "KPI Strategy & Dashboard Design",
      "Cross-functional Leadership",
    ],
  },
  {
    title: "Data Infrastructure",
    color: "#ffb020",
    tags: [
      "dbt",
      "Snowflake",
      "BigQuery",
      "Apache Airflow",
      "DuckDB",
      "PySpark",
      "Git / GitHub Actions",
      "SSIS",
    ],
  },
];

export function Skills() {
  return (
    <section
      id="skills"
      className="scroll-mt-20 bg-white border-y border-ink/10 px-5 sm:px-8 py-16 lg:py-28"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-accent-violet mb-4">
            // Skills &amp; Expertise
          </p>
          <h2
            className="font-display font-bold tracking-[-0.02em] text-ink"
            style={{ fontSize: "clamp(32px, 4.5vw, 56px)" }}
          >
            Tools I work with every day.
          </h2>
        </div>

        <div className="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(300px,1fr))]">
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1], delay: (i % 3) * 0.08 }}
              style={{ ["--c" as string]: group.color }}
              className="rounded-[20px] border border-ink/10 bg-white p-6 shadow-[0_1px_3px_rgba(22,21,29,0.04)] transition-all duration-200 hover:-translate-y-1 hover:[border-color:var(--c)]"
            >
              <div className="flex items-center gap-2.5 mb-5">
                <span
                  className="w-3 h-3 rounded-[4px]"
                  style={{ backgroundColor: group.color }}
                />
                <h3 className="font-display font-semibold text-[17px] tracking-[-0.01em] text-ink">
                  {group.title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {group.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[12px] px-3 py-1.5 rounded-full border"
                    style={{ borderColor: `${group.color}4d`, color: group.color }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
