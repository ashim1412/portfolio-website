"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTheme } from "next-themes";
import { getYearsOfExperience } from "@/lib/experience";

const sectionVariants = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export function About() {
  const sectionRef = useRef(null);
  const isInView   = useInView(sectionRef, { once: true, margin: "-80px" });
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme !== "light";
  const yearsExp = getYearsOfExperience();

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-20 px-6 overflow-hidden"
      style={{
        background: isDark
          ? "linear-gradient(135deg, #0a0a1a 0%, #0d0a28 40%, #080e1e 70%, #0a0a1a 100%)"
          : "linear-gradient(135deg, #e0f2fe 0%, #ede9fe 40%, #dbeafe 70%, #f0f9ff 100%)",
      }}
    >
      {/* Ambient orbs */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-80px", right: "10%",
          width: 320, height: 320,
          borderRadius: "50%",
          background: isDark
            ? "radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "-60px", left: "5%",
          width: 240, height: 240,
          borderRadius: "50%",
          background: isDark
            ? "radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%)",
        }}
      />
      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Heading */}
        <motion.h2
          variants={sectionVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-4xl font-bold text-foreground text-center mb-12"
        >
          About Me
        </motion.h2>

        {/* Two-column layout */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col lg:flex-row gap-10 items-start"
        >
          {/* ── Left: profile photo ── */}
          <div className="flex-shrink-0 flex justify-center lg:justify-start">
            <div className="relative w-64 rounded-2xl overflow-hidden border border-blue-500/30 shadow-[0_0_40px_rgba(59,130,246,0.15)]">
              <Image
                src="/headshot.jpg"
                alt="Ashim Shrestha"
                width={400}
                height={500}
                className="w-full h-auto object-cover"
                sizes="256px"
                priority
              />
            </div>
          </div>

          {/* ── Right: bio ── */}
          <div className="space-y-4 text-foreground/80 leading-relaxed text-base">
            <p>
              I&apos;m a Senior BI &amp; Analytics professional with {yearsExp} years of
              experience turning data into actionable business insights.
              Currently leading analytics consulting projects at Extensodata
              (F1Soft International), I specialize in designing end-to-end
              analytics solutions—from dashboards and forecasting models to
              deployed data products that drive real business impact.
            </p>
            <p>
              My journey spans fintech, e-commerce, and marketing analytics,
              where I&apos;ve built everything from customer segmentation systems
              that reduced churn by 50% to time series forecasting models
              achieving 30% higher accuracy. At Daraz, I owned 15+ core
              dashboards used by 50+ stakeholders, and developed a
              micro-loan eligibility system that drove 20% growth in customer
              acquisition.
            </p>
            <p>
              I thrive on solving complex business problems through
              hypothesis-driven analysis, A/B testing, and machine learning.
              Whether it&apos;s optimizing marketing campaigns, predicting credit
              risk, or building predictive models, I believe the best
              analytics solutions are those that are both technically sound
              and immediately actionable for business teams.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
