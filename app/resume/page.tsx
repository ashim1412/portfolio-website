"use client";

import { motion } from "framer-motion";
import { Download, MapPin, Mail, Globe, Phone, Github, Linkedin } from "lucide-react";
import { getYearsOfExperience } from "@/lib/experience";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (d: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.45, delay: d, ease: "easeOut" },
  }),
};

// ── Resume Data (from PDF) ────────────────────────────────────────────────────

const experience = [
  {
    company: "Extensodata (F1Soft International)",
    role: "Business Insight Analyst – Lead",
    period: "April 2025 – Present",
    location: "Pulchowk, Lalitpur",
    bullets: [
      "Led a team of 3 analysts in delivering consulting projects, translating client business challenges into data strategies and ensuring on-time delivery of strategic insights to stakeholders.",
      "Developed a micro-loan eligibility system using SQL and Python to analyse customer transactional behaviour and identify qualified borrowers; deployed as a marketing acquisition tool, improving loan approval rates and driving 20% growth in new customer acquisition.",
      "Designed hypothesis-driven analyses on borrower behaviour, loan products, and risk dynamics; identified strategic patterns and delivered recommendations with adoption by product and credit teams, improving approval accuracy and default prediction.",
    ],
  },
  {
    company: "Growthzilla",
    role: "Marketing Analyst",
    period: "June 2024 – March 2025",
    location: "CA, United States",
    bullets: [
      "Built customer cohorts using Python (RFM, clustering) and SQL, identifying high-value and churn-risk segments; targeted campaigns lifted conversion rate by 18% and reduced customer acquisition cost by 12%.",
      "Generated insights on customer acquisition and retention that informed marketing strategy; recommendations improved campaign efficiency and contributed to revenue growth.",
      "Conducted A/B testing and hypothesis-driven analysis on marketing initiatives; validated optimisation opportunities, improving email engagement by 20%.",
    ],
  },
  {
    company: "Daraz Kaymu Pvt. Ltd.",
    role: "Senior Business Intelligence Analyst",
    period: "February 2021 – March 2024",
    location: "Kathmandu, Nepal",
    bullets: [
      "Owned 15+ core dashboards tracking marketplace KPIs (GMV, seller health, logistics, retention) used by 50+ stakeholders across multiple departments, replacing manual spreadsheets and saving 10+ hours/week in reporting.",
      "Developed time series forecasting models for key marketplace metrics (GMV, new sellers, retention rate), achieving 30% higher forecast accuracy and enabling data-driven target-setting and resource allocation across departments.",
      "Developed customer and seller segmentation strategy (SQL + Python RFM analysis), identifying high-value and at-risk cohorts; targeted CRM campaigns reduced churn by 50% and achieved 90% MoM retention rate.",
      "Owned seller acquisition analytics program, achieving 75% MoM seller growth by building risk scoring models, quality prediction, and compliance monitoring dashboards that improved seller quality by 65%.",
    ],
  },
  {
    company: "Impetus Inc.",
    role: "Jr. Data Engineer",
    period: "October 2020 – February 2021",
    location: "Lalitpur, Nepal",
    bullets: [
      "Developed SSIS ETL pipelines integrating multiple data sources (databases, APIs, flat files) into a central warehouse; implemented data cleaning and validation workflows (SQL), ensuring data quality standards for downstream dashboards and analyses.",
      "Identified and resolved data integrity issues during system migration using SQL validation logic; optimised migration workflows and achieved reliable data transfer with zero data loss, supporting seamless transition to production warehouse.",
    ],
  },
  {
    company: "Delta Creation",
    role: "Data Analyst",
    period: "March 2019 – March 2020",
    location: "Kathmandu, Nepal",
    bullets: [
      "Built data collection systems and quality processes for business metrics across various channels, establishing validation standards and improving data reliability.",
      "Partnered with cross-functional teams to deliver analytics solutions (dashboards, reports), enabling performance measurement and operational optimisation across finance, ops, and marketing.",
    ],
  },
  {
    company: "Janaki Technology Pvt. Ltd. (Khalti and Sparrow SMS)",
    role: "Digital Marketing Officer",
    period: "Jan 2017 – Nov 2018",
    location: "Lalitpur, Nepal",
    bullets: [
      "Established Google Analytics tracking across digital channels (website, social, email); designed and deployed analytical dashboards using Looker (Google Data Studio) to monitor campaign performance, user engagement, and traffic trends.",
      "Managed 5 social media channels and campaigns for Khalti and Sparrow SMS, driving engagement rate improvements through data-driven content optimisation and audience targeting.",
      "Optimised website and blog SEO strategy, improving organic search visibility by 10% and increasing organic traffic by 20%, contributing to 5% lead generation uplift.",
    ],
  },
];

const skills = [
  {
    category: "Technical",
    items:
      "Python (Pandas, NumPy, Scikit-learn), SQL (Advanced: CTEs, window functions, optimisation), dbt, Git/GitHub, PySpark, DuckDB, Jupyter, Zapier, Airflow for data orchestration",
  },
  {
    category: "Data & Analytics",
    items:
      "Databricks, BigQuery, Looker, Power BI, Tableau, Microsoft Fabric, Metabase, Google Analytics 4, ETL, data modelling (star schema, dimensional design)",
  },
  {
    category: "Machine Learning & Experimentation",
    items:
      "Time series forecasting, Regression, A/B testing, hypothesis testing, segmentation, clustering, feature engineering, churn prediction, credit risk scoring",
  },
  {
    category: "Domain Expertise",
    items:
      "Fintech & credit risk (default prediction, borrower behaviour), E-Commerce (GMV, LTV/CAC, conversion funnels, retention), dashboard design, KPI tracking, cross-functional leadership",
  },
];

const education = [
  {
    institution: "Tribhuvan University",
    degree: "B.Sc. Computer Science and Information Technology",
    period: "Graduated 2016",
    location: "Kathmandu, Nepal",
  },
];

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ResumePage() {
  return (
    <main className="min-h-screen bg-background pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <motion.div
          variants={fadeUp} initial="hidden" animate="visible" custom={0}
          className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6"
        >
          <div>
            <h1 className="text-4xl font-bold text-foreground tracking-tight">Ashim Shrestha</h1>
            <p className="text-accent font-medium mt-1 text-base">
              Senior BI &amp; Analytics Analyst
            </p>
          </div>
          <a
            href="/Ashim-Shrestha.pdf"
            download="Ashim-Shrestha-Resume.pdf"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent hover:bg-accent-hover text-white text-sm font-semibold transition-all duration-200 hover:scale-105 self-start sm:self-auto shrink-0"
          >
            <Download size={14} />
            Download PDF
          </a>
        </motion.div>

        {/* Contact bar */}
        <motion.div
          variants={fadeUp} initial="hidden" animate="visible" custom={0.05}
          className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted mb-6"
        >
          <span className="inline-flex items-center gap-1.5">
            <MapPin size={12} /> Kathmandu, Nepal
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Phone size={12} /> +977-9846854424
          </span>
          <a href="mailto:ashimstha1412@gmail.com" className="inline-flex items-center gap-1.5 hover:text-accent transition-colors">
            <Mail size={12} /> ashimstha1412@gmail.com
          </a>
          <a href="https://ashim-shrestha.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-accent transition-colors">
            <Globe size={12} /> ashim-shrestha.com
          </a>
          <a href="https://linkedin.com/in/ashim-shrestha" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-accent transition-colors">
            <Linkedin size={12} /> linkedin.com/in/ashim-shrestha
          </a>
          <a href="https://github.com/ashim1412" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-accent transition-colors">
            <Github size={12} /> github.com/ashim1412
          </a>
        </motion.div>

        <div className="h-px bg-border mb-7" />

        {/* Summary */}
        <motion.section variants={fadeUp} initial="hidden" animate="visible" custom={0.08} className="mb-8">
          <SectionHeading title="Summary" />
          <p className="text-foreground/80 leading-relaxed text-sm">
            Senior BI &amp; Analytics Analyst with {getYearsOfExperience()} years across fintech, e-commerce, and marketing.
            Design end-to-end analytics solutions: dashboards, forecasting, experimentation, and deployed
            data products. Lead teams and mentor analysts. Comfortable working remotely with international teams.
          </p>
        </motion.section>

        {/* Experience */}
        <motion.section variants={fadeUp} initial="hidden" animate="visible" custom={0.12} className="mb-8">
          <SectionHeading title="Experience" />
          <div className="space-y-7">
            {experience.map((job, i) => (
              <div key={i} className="relative pl-4 border-l-2 border-accent/25">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-0.5 mb-2">
                  <div>
                    <h3 className="font-bold text-foreground text-sm leading-tight">{job.role}</h3>
                    <p className="text-accent text-sm font-semibold">{job.company}</p>
                  </div>
                  <div className="text-left sm:text-right shrink-0">
                    <p className="text-muted text-xs">{job.period}</p>
                    <p className="text-muted text-xs flex sm:justify-end items-center gap-1">
                      <MapPin size={9} /> {job.location}
                    </p>
                  </div>
                </div>
                <ul className="space-y-1">
                  {job.bullets.map((b, j) => (
                    <li key={j} className="text-xs text-foreground/80 leading-relaxed flex gap-2">
                      <span className="text-accent/70 shrink-0 mt-0.5">▸</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Skills */}
        <motion.section variants={fadeUp} initial="hidden" animate="visible" custom={0.16} className="mb-8">
          <SectionHeading title="Skills" />
          <div className="space-y-2">
            {skills.map((s) => (
              <div key={s.category} className="flex gap-3 text-sm">
                <span className="font-semibold text-foreground shrink-0 w-52 text-xs pt-0.5">{s.category}</span>
                <span className="text-foreground/75 text-xs leading-relaxed">{s.items}</span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Education */}
        <motion.section variants={fadeUp} initial="hidden" animate="visible" custom={0.2}>
          <SectionHeading title="Education" />
          {education.map((e, i) => (
            <div key={i} className="flex flex-col sm:flex-row sm:justify-between gap-0.5">
              <div>
                <h3 className="font-bold text-foreground text-sm">{e.degree}</h3>
                <p className="text-accent text-sm">{e.institution}</p>
              </div>
              <div className="text-left sm:text-right shrink-0">
                <p className="text-muted text-xs">{e.period}</p>
                <p className="text-muted text-xs">{e.location}</p>
              </div>
            </div>
          ))}
        </motion.section>

      </div>
    </main>
  );
}

function SectionHeading({ title }: { title: string }) {
  return (
    <div className="mb-4">
      <h2 className="text-[10px] font-bold uppercase tracking-[0.15em] text-accent mb-2">{title}</h2>
      <div className="h-px bg-border" />
    </div>
  );
}
