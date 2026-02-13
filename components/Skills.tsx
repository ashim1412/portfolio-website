"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTheme } from "next-themes";
import {
  Code2, Database, BarChart2, Brain, Settings, Zap, Globe, Heart,
  GitBranch, PieChart, BarChart, Workflow, Layers,
  MessageSquare, FlaskConical, TrendingUp, CreditCard,
  ShoppingCart, Layout, Target, Star, Clock, Users,
} from "lucide-react";

// ── Skill group data ──────────────────────────────────────────────────────────
const skillGroups = [
  {
    heading: "Programming & Data",
    color: "blue",
    icon: Code2,
    skills: [
      { label: "Python (Pandas, NumPy, Scikit-learn)", icon: Code2 },
      { label: "SQL (CTEs, Window Functions, Query Optimization)", icon: Database },
      { label: "PySpark", icon: Layers },
      { label: "DuckDB", icon: Database },
    ],
  },
  {
    heading: "Data Engineering & Modeling",
    color: "purple",
    icon: GitBranch,
    skills: [
      { label: "dbt", icon: Workflow },
      { label: "ELT Pipelines", icon: GitBranch },
      { label: "Apache Airflow", icon: Settings },
      { label: "Data Modeling (Star Schema)", icon: Layers },
      { label: "Data Quality & Testing", icon: FlaskConical },
      { label: "Git / GitHub", icon: GitBranch },
    ],
  },
  {
    heading: "BI & Analytics Tools",
    color: "cyan",
    icon: PieChart,
    skills: [
      { label: "Power BI", icon: PieChart },
      { label: "Tableau", icon: BarChart },
      { label: "Looker", icon: BarChart2 },
      { label: "Metabase", icon: BarChart2 },
      { label: "Google Analytics 4", icon: TrendingUp },
      { label: "Google Tag Manager", icon: Target },
    ],
  },
  {
    heading: "Advanced Analytics & ML",
    color: "emerald",
    icon: Brain,
    skills: [
      { label: "Machine Learning", icon: Brain },
      { label: "Time Series Forecasting", icon: TrendingUp },
      { label: "A/B Testing & Experimentation", icon: FlaskConical },
      { label: "Feature Engineering", icon: Settings },
      { label: "Churn Prediction", icon: Users },
      { label: "Credit Risk Scoring", icon: CreditCard },
    ],
  },
  {
    heading: "Methodologies & Tools",
    color: "orange",
    icon: Settings,
    skills: [
      { label: "Agile (Scrum)", icon: Workflow },
      { label: "Jira", icon: Settings },
      { label: "Experimentation Frameworks", icon: FlaskConical },
      { label: "KPI-driven Analytics", icon: Target },
      { label: "Notion", icon: Layout },
    ],
  },
  {
    heading: "Automation & Workflow",
    color: "yellow",
    icon: Zap,
    skills: [
      { label: "Zapier", icon: Zap },
      { label: "n8n", icon: Workflow },
    ],
  },
  {
    heading: "Domain Expertise",
    color: "indigo",
    icon: Globe,
    skills: [
      { label: "Fintech & Credit Risk", icon: CreditCard },
      { label: "E-commerce & Sales Analytics", icon: ShoppingCart },
      { label: "Dashboard Design", icon: Layout },
      { label: "KPI Tracking", icon: Target },
      { label: "Cross-functional Leadership", icon: Users },
      { label: "Customer Experience", icon: Star },
    ],
  },
  {
    heading: "Soft Skills",
    color: "pink",
    icon: Heart,
    skills: [
      { label: "Communication", icon: MessageSquare },
      { label: "Stakeholder Management", icon: Users },
      { label: "Teamwork", icon: Users },
      { label: "Problem-Solving", icon: Brain },
      { label: "Adaptability", icon: Zap },
      { label: "Time Management", icon: Clock },
    ],
  },
];

// ── Color maps ─────────────────────────────────────────────────────────────────
const pillColors: Record<string, string> = {
  blue:    "bg-blue-500/10 text-blue-400 border-blue-500/20 hover:bg-blue-500/20 hover:border-blue-400/50",
  purple:  "bg-purple-500/10 text-purple-400 border-purple-500/20 hover:bg-purple-500/20 hover:border-purple-400/50",
  cyan:    "bg-cyan-500/10 text-cyan-400 border-cyan-500/20 hover:bg-cyan-500/20 hover:border-cyan-400/50",
  emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20 hover:border-emerald-400/50",
  orange:  "bg-orange-500/10 text-orange-400 border-orange-500/20 hover:bg-orange-500/20 hover:border-orange-400/50",
  yellow:  "bg-yellow-500/10 text-yellow-400 border-yellow-500/20 hover:bg-yellow-500/20 hover:border-yellow-400/50",
  indigo:  "bg-indigo-500/10 text-indigo-400 border-indigo-500/20 hover:bg-indigo-500/20 hover:border-indigo-400/50",
  pink:    "bg-pink-500/10 text-pink-400 border-pink-500/20 hover:bg-pink-500/20 hover:border-pink-400/50",
};

const headingColors: Record<string, string> = {
  blue: "text-blue-400",   purple: "text-purple-400", cyan: "text-cyan-400",
  emerald: "text-emerald-400", orange: "text-orange-400", yellow: "text-yellow-400",
  indigo: "text-indigo-400", pink: "text-pink-400",
};

export function Skills() {
  const sectionRef = useRef(null);
  const isInView   = useInView(sectionRef, { once: true, margin: "-80px" });
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme !== "light";

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-20 px-6 overflow-hidden"
      style={{
        background: isDark
          ? "linear-gradient(135deg, #050a12 0%, #0a0a1a 35%, #0d0a28 65%, #080e1e 100%)"
          : "linear-gradient(135deg, #f0f9ff 0%, #dbeafe 35%, #ede9fe 65%, #e0f2fe 100%)",
      }}
    >
      {/* Ambient orbs */}
      <div className="absolute pointer-events-none" style={{ top: "20%", left: "-5%", width: 280, height: 280, borderRadius: "50%", background: isDark ? "radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%)" : "radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)" }} />
      <div className="absolute pointer-events-none" style={{ bottom: "10%", right: "-3%", width: 300, height: 300, borderRadius: "50%", background: isDark ? "radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)" : "radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)" }} />
      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl font-bold text-foreground mb-3">
            Skills &amp; Expertise
          </h2>
          <p className="text-muted text-lg">
            Tools and technologies I work with every day
          </p>
        </motion.div>

        {/* Skill groups grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillGroups.map((group, gi) => {
            const HeadingIcon = group.icon;
            return (
              <motion.div
                key={group.heading}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: gi * 0.07 }}
                className="rounded-2xl border border-border bg-secondary p-6"
              >
                {/* Group heading */}
                <div className="flex items-center gap-2 mb-5">
                  <HeadingIcon size={15} className={headingColors[group.color]} />
                  <p className={`text-xs font-bold uppercase tracking-widest ${headingColors[group.color]}`}>
                    {group.heading}
                  </p>
                </div>

                {/* Pills */}
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => {
                    const Icon = skill.icon;
                    return (
                      <span
                        key={skill.label}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 cursor-default hover:scale-105 ${pillColors[group.color]}`}
                      >
                        <Icon size={11} />
                        {skill.label}
                      </span>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
