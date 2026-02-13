"use client";

import { useEffect, useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github, Code, Loader2 } from "lucide-react";
import Image from "next/image";
import type { GitHubRepo } from "@/lib/github";
import { daysAgo, fetchReadme } from "@/lib/github";

const LANG_EMOJI: Record<string, string> = {
  Python: "🐍",
  JavaScript: "⚡",
  TypeScript: "⚡",
  SQL: "🗄️",
};

interface ProjectModalProps {
  repo: GitHubRepo | null;
  onClose: () => void;
}

const GITHUB_OWNER = "ashim1412";

export function ProjectModal({ repo, onClose }: ProjectModalProps) {
  const [readme, setReadme] = useState<string>("");
  const [readmeLoading, setReadmeLoading] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (!repo) return;
    document.body.style.overflow = "hidden";
    setReadme("");
    setImgError(false);
    setReadmeLoading(true);
    fetchReadme(GITHUB_OWNER, repo.name).then((text) => {
      setReadme(text);
      setReadmeLoading(false);
    });
    return () => { document.body.style.overflow = ""; };
  }, [repo]);

  return (
    <AnimatePresence>
      {repo && (
        <>
          {/* Overlay */}
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal card */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-border bg-secondary shadow-2xl pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 rounded-full text-muted hover:text-foreground hover:bg-border transition-colors"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>

              <div className="p-8">
                {/* Header */}
                <div className="flex items-start gap-4 mb-4">
                  <span className="text-4xl leading-none">
                    {LANG_EMOJI[repo.language ?? ""] ?? "📁"}
                  </span>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-1 capitalize">
                      {repo.name.replace(/-/g, " ")}
                    </h2>
                    <p className="text-muted text-sm flex items-center gap-2 flex-wrap">
                      {repo.language && (
                        <span className="inline-flex items-center gap-1">
                          <Code size={13} />
                          {repo.language}
                        </span>
                      )}
                      <span>Updated {daysAgo(repo.updated_at)}</span>
                    </p>
                  </div>
                </div>

                {/* Description */}
                {repo.description && (
                  <p className="text-foreground/80 leading-relaxed mb-5 text-sm">
                    {repo.description}
                  </p>
                )}

                {/* Topics */}
                {repo.topics.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-5">
                    {repo.topics.map((topic) => (
                      <span
                        key={topic}
                        className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/15 text-blue-400 border border-blue-500/20"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                )}

                {/* Project image from assets/image.png */}
                {!imgError && (
                  <div className="relative w-full rounded-xl overflow-hidden border border-border mb-6">
                    <Image
                      src={`https://raw.githubusercontent.com/${GITHUB_OWNER}/${repo.name}/HEAD/assets/image.png`}
                      alt={`${repo.name} preview`}
                      width={800}
                      height={450}
                      className="w-full h-auto object-cover"
                      onError={() => setImgError(true)}
                      unoptimized
                    />
                  </div>
                )}

                {/* README */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-muted uppercase tracking-widest mb-3">
                    README
                  </h3>
                  {readmeLoading ? (
                    <div className="flex items-center gap-2 text-muted text-sm py-4">
                      <Loader2 size={14} className="animate-spin" />
                      Loading README…
                    </div>
                  ) : readme ? (
                    <div className="rounded-xl border border-border bg-background p-4 max-h-80 overflow-y-auto">
                      <pre className="text-xs text-foreground/80 font-mono whitespace-pre-wrap leading-relaxed">
                        {readme}
                      </pre>
                    </div>
                  ) : (
                    <p className="text-muted text-sm italic">No README available.</p>
                  )}
                </div>

                {/* Action buttons */}
                <div className="flex flex-wrap gap-3">
                  {repo.homepage && (
                    <a
                      href={repo.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-500 hover:bg-blue-400 text-white text-sm font-semibold transition-all duration-200 hover:scale-105"
                    >
                      <ExternalLink size={15} />
                      View Live Demo
                    </a>
                  )}
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border hover:border-foreground/40 text-foreground text-sm font-semibold transition-all duration-200 hover:scale-105"
                  >
                    <Github size={15} />
                    GitHub Repo
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
