"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const reveal = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.2, 0.7, 0.2, 1] } },
};

export function About() {
  return (
    <section
      id="about"
      className="scroll-mt-20 px-5 sm:px-8 py-16 lg:py-28"
    >
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-16 items-center">
        {/* Photo with offset gradient card */}
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="flex justify-center lg:justify-start"
        >
          <div className="relative w-full max-w-[320px]">
            <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-[22px] bg-gradient-to-br from-accent-blue to-accent-violet" />
            <div className="relative rounded-[22px] overflow-hidden border border-ink/10 bg-white">
              <Image
                src="/headshot.jpg"
                alt="Ashim Shrestha"
                width={400}
                height={460}
                className="w-full h-auto object-cover"
                sizes="320px"
                priority
              />
            </div>
          </div>
        </motion.div>

        {/* Copy */}
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-accent-coral mb-4">
            // About Me
          </p>
          <h2
            className="font-display font-bold tracking-[-0.02em] text-ink leading-[1.05] mb-6"
            style={{ fontSize: "clamp(32px, 4.5vw, 56px)" }}
          >
            Data rigor meets business strategy.
          </h2>

          <div className="space-y-5 text-[16px] leading-[1.6] text-ink/70 max-w-2xl">
            <p>
              I&apos;m a growth and customer analytics professional with 8+ years of
              experience helping businesses understand their customers, improve
              retention, and make smarter acquisition decisions.
            </p>
            <p>
              Across fintech, e-commerce, and marketing, I&apos;ve built the analytics
              that power growth — from segmentation models that reduced churn by{" "}
              <strong className="font-semibold text-accent-emerald">50%</strong> to
              experimentation frameworks that lifted conversion{" "}
              <strong className="font-semibold text-accent-coral">18%</strong> and cut
              customer acquisition costs{" "}
              <strong className="font-semibold text-accent-blue">12%</strong>. At Daraz,
              I led analytics for a marketplace platform serving 50+ stakeholders.
            </p>
            <p>
              My work sits at the intersection of data rigor and business strategy.
              I&apos;m equally comfortable running a cohort retention analysis, designing
              an A/B test, or presenting findings to senior leadership.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
