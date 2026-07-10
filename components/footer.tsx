"use client";

import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import { motion } from "framer-motion";
import { personalInfo } from "@/data/portfolio";
import { useTheme } from "next-themes";

export function Footer() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme !== "light";

  return (
    <footer
      className="border-t border-border"
      style={{
        background: isDark
          ? "linear-gradient(135deg, #080e1e 0%, #0a0a1a 100%)"
          : "linear-gradient(135deg, #dbeafe 0%, #e0f2fe 100%)",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col items-center md:items-start gap-1">
            <p className="text-muted text-sm">
              © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
            </p>
            <p className="text-muted text-xs">
              Built with Next.js + Tailwind + ❤️
            </p>
          </div>

          <div className="flex items-center gap-4">
            <motion.a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: -8 }}
              className="text-muted hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <Github size={18} />
            </motion.a>
            <motion.a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 8 }}
              className="text-muted hover:text-foreground transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </motion.a>
            <motion.a
              href={`mailto:${personalInfo.email}`}
              whileHover={{ scale: 1.2, rotate: -8 }}
              className="text-muted hover:text-foreground transition-colors"
              aria-label="Email"
            >
              <Mail size={18} />
            </motion.a>

            <motion.a
              href="#"
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.9 }}
              className="ml-2 flex items-center justify-center w-9 h-9 rounded-full border border-border text-muted hover:text-accent hover:border-accent/50 transition-colors"
              aria-label="Back to top"
            >
              <ArrowUp size={16} />
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  );
}
