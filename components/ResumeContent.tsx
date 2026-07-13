"use client";

import { motion } from "framer-motion";
import {
  Download,
  MapPin,
  Mail,
  Globe,
  Phone,
  Github,
  Linkedin,
} from "lucide-react";

// ── Data ──────────────────────────────────────────────────────────────────────

const personal = {
  name: "Ashim Shrestha",
  title: "Data Analyst & Analytics Engineer | Growth Analytics",
  location: "Kathmandu, Nepal (Open to Remote, UTC+5:45)",
  phone: "+977-9846854424",
  email: "ashimstha1412@gmail.com",
  website: "ashim-shrestha.com",
  websiteUrl: "https://ashim-shrestha.com",
  linkedin: "linkedin.com/in/ashim-shrestha",
  linkedinUrl: "https://linkedin.com/in/ashim-shrestha",
  github: "github.com/ashim1412",
  githubUrl: "https://github.com/ashim1412",
};

const summary =
  "Data analyst and analytics engineer with 8+ years of experience building end-to-end data pipelines, dimensional models, and reporting systems across fintech, e-commerce, and marketing. Strong hands-on skills in Python and SQL, including query optimisation, automation, and statistical analysis, paired with a track record of turning data into growth outcomes such as 20% acquisition growth, 50% churn reduction, and 18% conversion uplift. Experienced building customer and credit risk segmentation frameworks, dashboards used by 50+ stakeholders, and production-grade pipelines on Snowflake, BigQuery, and dbt. Comfortable working independently across time zones with distributed teams in the US, EU, and APAC.";

interface Job {
  role: string;
  company: string;
  period: string;
  location: string;
  bullets: string[];
}

const experience: Job[] = [
  {
    role: "Business Insight Analyst Lead",
    company: "Extensodata (F1Soft International)",
    period: "Apr 2025 - Present",
    location: "Kathmandu, Nepal",
    bullets: [
      "Led a team of 3 analysts on consulting engagements, scoping data deliverables and driving growth-focused insight projects from discovery through delivery.",
      "Built a micro-loan eligibility scoring system in SQL and Python, deployed as a customer acquisition marketing tool that drove 20% growth in new customer acquisition for a fintech client.",
      "Built transaction categorisation and customer persona pipelines to segment borrowers by spending behaviour and income regularity, feeding targeted acquisition campaigns.",
      "Conducted statistical classification modelling on borrower behaviour and credit risk, improving loan approval accuracy by 15% and strengthening default prediction.",
      "Designed post-disbursement repayment tracking that surfaced early delinquency signals, shaping credit policy and reducing default risk.",
    ],
  },
  {
    role: "Marketing Analyst",
    company: "Growthzilla",
    period: "Jun 2024 - Mar 2025",
    location: "California, USA (Remote)",
    bullets: [
      "Built RFM-based customer cohorts using Python and SQL to identify high-value, at-risk, and dormant segments; targeted campaigns lifted conversion rates by 18% and cut CAC by 12%.",
      "Designed and executed A/B tests on email marketing campaigns (subject lines, send-time, CTA placement), improving open and click-through rates by 20%.",
      "Owned end-to-end customer acquisition and retention reporting, translating weekly performance data into strategy recommendations for leadership.",
      "Developed lifecycle marketing dashboards tracking activation and retention milestones to identify drop-off points and prioritise re-engagement.",
    ],
  },
  {
    role: "Senior Business Intelligence Analyst",
    company: "Daraz (Kaymu Pvt. Ltd.)",
    period: "Feb 2021 - Mar 2024",
    location: "Kathmandu, Nepal",
    bullets: [
      "Built and owned 15+ KPI dashboards tracking GMV, seller health, logistics, and retention for 50+ stakeholders, replacing manual spreadsheet workflows and saving 10+ hours per week.",
      "Developed customer and seller segmentation models (SQL and Python RFM, clustering) that reduced churn by 50% and sustained 90% month-on-month retention.",
      "Built seller acquisition risk scoring and onboarding quality prediction models, contributing to 75% month-on-month seller growth and a 65% improvement in onboarded seller quality.",
      "Designed time-series forecasting models for core marketplace metrics, achieving 30% higher forecast accuracy and enabling data-driven target setting.",
    ],
  },
  {
    role: "Junior Data Engineer",
    company: "Impetus Inc.",
    period: "Oct 2020 - Feb 2021",
    location: "Lalitpur, Nepal",
    bullets: [
      "Built SSIS ETL pipelines integrating databases, APIs, and flat files into a central warehouse, with SQL-based validation workflows ensuring downstream data quality.",
    ],
  },
  {
    role: "Data Analyst",
    company: "Delta Creation",
    period: "Mar 2019 - Mar 2020",
    location: "Kathmandu, Nepal",
    bullets: [
      "Built reporting infrastructure and KPI tracking dashboards for finance, operations, and marketing, enabling performance measurement across teams.",
    ],
  },
  {
    role: "Digital Marketing Officer",
    company: "Janaki Technology (Khalti & Sparrow SMS)",
    period: "Jan 2017 - Nov 2018",
    location: "Lalitpur, Nepal",
    bullets: [
      "Set up Google Analytics tracking and built Looker Studio dashboards to monitor campaign performance and traffic trends.",
      "Drove 20% growth in organic traffic, improved search visibility by 10%, and contributed to a 5% uplift in lead generation through SEO and content strategy.",
    ],
  },
];

const skillGroups = [
  {
    category: "Languages",
    color: "#2f6bff",
    items: ["SQL (CTEs, window functions, query optimisation, stored procedures)", "Python (Pandas, NumPy, Scikit-learn)", "PySpark"],
  },
  {
    category: "Data Engineering",
    color: "#ffb020",
    items: ["dbt (incremental models, tests, Slim CI)", "Snowflake", "BigQuery", "DuckDB", "Apache Airflow", "Databricks", "SSIS", "Git/GitHub Actions"],
  },
  {
    category: "Analytics & Growth",
    color: "#ff5b3a",
    items: ["Customer segmentation (RFM, clustering)", "Cohort analysis", "Funnel analysis", "A/B testing", "Churn prediction", "LTV/CAC modelling", "Credit risk scoring", "Time series forecasting"],
  },
  {
    category: "BI & Visualisation",
    color: "#7c4dff",
    items: ["Power BI", "Tableau", "Looker", "Metabase", "Looker Studio", "Google Analytics 4", "Google Tag Manager"],
  },
  {
    category: "Domains",
    color: "#12b981",
    items: ["Fintech and credit risk", "E-commerce growth", "Marketing and lifecycle analytics", "Loyalty and CRM", "KPI strategy", "Cross-functional team leadership"],
  },
];

interface SelectedProject {
  title: string;
  context: string;
  description: string;
}

const selectedProjects: SelectedProject[] = [
  {
    title: "Customer Transaction Segmentation & Persona Engine",
    context: "Foneloan, Extensodata",
    description:
      "Built a Python and SQL transaction categorisation pipeline using MCC-based mapping to classify spending and construct borrower personas covering spending patterns, income regularity, and financial risk signals, delivered as a reusable scoring framework feeding targeted acquisition campaigns.",
  },
  {
    title: "NBA Shot Analytics (LeBron James)",
    context: "Personal Portfolio",
    description:
      "Full analytics pipeline on NBA shot data: API extraction to Snowflake with medallion architecture, dbt marts covering shot zones, scoring efficiency, and clutch performance, visualised in Tableau with spatial shot charts.",
  },
];

const education = [
  {
    degree: "B.Sc. Computer Science and Information Technology",
    institution: "Tribhuvan University",
    period: "2016",
    location: "Kathmandu, Nepal",
  },
];

// ── Reveal helpers ──────────────────────────────────────────────────────────────

const reveal = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.2, 0.7, 0.2, 1] } },
};

export function ResumeContent() {
  return (
    <section className="px-5 sm:px-8 pt-32 lg:pt-40 pb-16 lg:pb-28">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-6">
            <div>
              <h1
                className="font-display font-bold tracking-[-0.02em] text-ink leading-[1.05]"
                style={{ fontSize: "clamp(32px, 4.5vw, 56px)" }}
              >
                {personal.name}
              </h1>
              <p className="mt-3 text-[16px] leading-[1.6] text-ink/60 max-w-xl">
                {personal.title}
              </p>
            </div>
            <a
              href="/Ashim-Shrestha.pdf"
              download="Ashim-Shrestha-Resume.pdf"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-ink hover:bg-accent-coral text-paper font-mono text-[13px] uppercase tracking-[0.04em] transition-colors duration-200 self-start shrink-0"
            >
              <Download size={14} />
              Download PDF
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2.5 font-mono text-[12px] tracking-[0.02em] text-ink/55 mb-10 pb-10 border-b border-ink/10">
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={13} /> {personal.location}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Phone size={13} /> {personal.phone}
            </span>
            <a
              href={`mailto:${personal.email}`}
              className="inline-flex items-center gap-1.5 hover:text-ink transition-colors duration-200"
            >
              <Mail size={13} /> {personal.email}
            </a>
            <a
              href={personal.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-ink transition-colors duration-200"
            >
              <Globe size={13} /> {personal.website}
            </a>
            <a
              href={personal.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-ink transition-colors duration-200"
            >
              <Linkedin size={13} /> {personal.linkedin}
            </a>
            <a
              href={personal.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-ink transition-colors duration-200"
            >
              <Github size={13} /> {personal.github}
            </a>
          </div>
        </motion.div>

        {/* Summary */}
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-16"
        >
          <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-accent-blue mb-4">
            // Summary
          </p>
          <p className="text-[16px] leading-[1.7] text-ink/70 max-w-3xl">{summary}</p>
        </motion.div>

        {/* Experience */}
        <motion.section
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mb-16"
        >
          <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-accent-blue mb-4">
            // Experience
          </p>
          <h2
            className="font-display font-bold tracking-[-0.02em] text-ink leading-[1.05] mb-10"
            style={{ fontSize: "clamp(28px, 3.5vw, 40px)" }}
          >
            Where I&apos;ve worked.
          </h2>

          <div className="space-y-10">
            {experience.map((job, i) => (
              <motion.div
                key={job.company}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1], delay: (i % 6) * 0.06 }}
                className="relative pl-6 border-l-2 border-accent-blue/25"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-3">
                  <div>
                    <h3 className="font-display font-semibold text-[19px] tracking-[-0.01em] text-ink">
                      {job.role}
                    </h3>
                    <p className="font-mono text-[13px] text-accent-blue mt-0.5">
                      {job.company}
                    </p>
                  </div>
                  <div className="text-left sm:text-right shrink-0 font-mono text-[12px] uppercase tracking-[0.04em] text-ink/40">
                    <p>{job.period}</p>
                    <p className="flex sm:justify-end items-center gap-1 mt-0.5">
                      <MapPin size={11} /> {job.location}
                    </p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {job.bullets.map((b, j) => (
                    <li key={j} className="flex gap-2.5 text-[15px] leading-[1.6] text-ink/70">
                      <span className="text-accent-blue/60 shrink-0 mt-[3px]" aria-hidden>
                        ▸
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Skills */}
        <motion.section
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mb-16"
        >
          <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-accent-violet mb-4">
            // Skills
          </p>
          <h2
            className="font-display font-bold tracking-[-0.02em] text-ink leading-[1.05] mb-10"
            style={{ fontSize: "clamp(28px, 3.5vw, 40px)" }}
          >
            Tools and expertise.
          </h2>

          <div className="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(280px,1fr))]">
            {skillGroups.map((group, i) => (
              <motion.div
                key={group.category}
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
                    {group.category}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((tag) => (
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
        </motion.section>

        {/* Selected Projects */}
        <motion.section
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mb-16"
        >
          <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-accent-coral mb-4">
            // Selected Projects
          </p>
          <h2
            className="font-display font-bold tracking-[-0.02em] text-ink leading-[1.05] mb-10"
            style={{ fontSize: "clamp(28px, 3.5vw, 40px)" }}
          >
            A few things I&apos;ve built.
          </h2>

          <div className="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(280px,1fr))]">
            {selectedProjects.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1], delay: (i % 3) * 0.08 }}
                className="rounded-[20px] border border-ink/10 bg-white p-6 shadow-[0_1px_3px_rgba(22,21,29,0.04)] transition-all duration-200 hover:-translate-y-1 hover:border-accent-coral/40"
              >
                <h3 className="font-display font-semibold text-[17px] tracking-[-0.01em] text-ink mb-1">
                  {project.title}
                </h3>
                <p className="font-mono text-[12px] text-accent-coral mb-3">
                  {project.context}
                </p>
                <p className="text-[14px] leading-[1.6] text-ink/70">
                  {project.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Education */}
        <motion.section
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-accent-amber mb-4">
            // Education
          </p>
          <h2
            className="font-display font-bold tracking-[-0.02em] text-ink leading-[1.05] mb-8"
            style={{ fontSize: "clamp(28px, 3.5vw, 40px)" }}
          >
            Education.
          </h2>

          {education.map((e) => (
            <div
              key={e.institution}
              className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 pl-6 border-l-2 border-accent-amber/25"
            >
              <div>
                <h3 className="font-display font-semibold text-[19px] tracking-[-0.01em] text-ink">
                  {e.degree}
                </h3>
                <p className="font-mono text-[13px] text-accent-amber mt-0.5">
                  {e.institution}
                </p>
              </div>
              <div className="text-left sm:text-right shrink-0 font-mono text-[12px] uppercase tracking-[0.04em] text-ink/40">
                <p>{e.period}</p>
                <p>{e.location}</p>
              </div>
            </div>
          ))}
        </motion.section>
      </div>
    </section>
  );
}
