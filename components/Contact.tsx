"use client";

import { motion } from "framer-motion";
import { Linkedin, Github, FileText } from "lucide-react";
import { personalInfo } from "@/data/portfolio";

const linkCards = [
  {
    label: "LinkedIn",
    sub: "Connect with me",
    href: personalInfo.linkedin,
    icon: Linkedin,
    color: "#2f6bff",
    external: true,
  },
  {
    label: "GitHub",
    sub: "@ashim1412",
    href: personalInfo.github,
    icon: Github,
    color: "#12b981",
    external: true,
  },
  {
    label: "Resume",
    sub: "Download PDF",
    href: "/Ashim-Shrestha.pdf",
    icon: FileText,
    color: "#ffb020",
    external: false,
  },
];

export function Contact() {
  return (
    <section
      id="contact"
      className="scroll-mt-20 bg-ink text-paper px-5 sm:px-8 py-20 lg:py-28"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-accent-emerald mb-4">
            // Let&apos;s Connect
          </p>
          <h2
            className="font-display font-bold tracking-[-0.02em] leading-[1.05] mb-6 max-w-3xl"
            style={{ fontSize: "clamp(32px, 4.5vw, 56px)" }}
          >
            Want better data behind your{" "}
            <span className="text-accent-coral">growth?</span>
          </h2>
          <p className="text-[17px] leading-[1.6] text-paper/60 mb-10 max-w-xl">
            Whether it&apos;s acquisition, retention, or marketing performance — if there&apos;s
            a decision hiding in your data, let&apos;s find it.
          </p>

          {/* Headline mailto */}
          <a
            href={`mailto:${personalInfo.email}`}
            className="inline-block font-display font-semibold tracking-[-0.02em] text-paper underline underline-offset-[6px] decoration-paper/30 hover:decoration-accent-amber transition-colors"
            style={{ fontSize: "clamp(24px, 4vw, 40px)" }}
          >
            {personalInfo.email}
          </a>

          {/* Link cards */}
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {linkCards.map((card) => {
              const Icon = card.icon;
              return (
                <a
                  key={card.label}
                  href={card.href}
                  {...(card.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : { download: "Ashim-Shrestha-Resume.pdf" })}
                  style={{ ["--c" as string]: card.color }}
                  className="group relative overflow-hidden flex items-center gap-4 rounded-[18px] border border-paper/12 p-5 transition-colors duration-200 hover:[border-color:var(--c)]"
                >
                  <span
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    style={{ backgroundColor: `${card.color}1f` }}
                  />
                  <span
                    className="relative flex items-center justify-center w-10 h-10 rounded-full border border-paper/15"
                    style={{ color: card.color }}
                  >
                    <Icon size={18} />
                  </span>
                  <span className="relative">
                    <span className="block font-display font-semibold text-[16px] text-paper">
                      {card.label}
                    </span>
                    <span className="block font-mono text-[12px] text-paper/50 mt-0.5">
                      {card.sub}
                    </span>
                  </span>
                </a>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
