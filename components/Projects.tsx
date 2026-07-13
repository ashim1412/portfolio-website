"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { RefreshCw } from "lucide-react";
import { fetchRepos, daysAgo, type GitHubRepo } from "@/lib/github";
import { personalInfo } from "@/data/portfolio";

const GITHUB_USERNAME = "ashim1412";
const PAGE_SIZE = 6;

// Color-block header gradients + matching metric colors, cycled per card so the
// grid stays on-palette regardless of how many repos come back.
const GRADIENTS = [
  "linear-gradient(135deg, #12b981, #2f6bff)",
  "linear-gradient(135deg, #ff5b3a, #ffb020)",
  "linear-gradient(135deg, #7c4dff, #2f6bff)",
  "linear-gradient(135deg, #2f6bff, #7c4dff)",
  "linear-gradient(135deg, #ffb020, #ff5b3a)",
];
const METRIC_COLORS = ["#12b981", "#ff5b3a", "#7c4dff", "#2f6bff", "#ffb020"];

const STRIPES =
  "repeating-linear-gradient(45deg, rgba(255,255,255,0.1) 0, rgba(255,255,255,0.1) 1px, transparent 1px, transparent 11px)";

function humanize(name: string) {
  return name.replace(/[-_]/g, " ");
}

function SkeletonCard() {
  return (
    <div className="rounded-[22px] border border-ink/10 bg-white overflow-hidden animate-pulse">
      <div className="h-[168px] bg-ink/[0.06]" />
      <div className="p-6">
        <div className="h-5 w-2/3 rounded bg-ink/10 mb-3" />
        <div className="h-3 w-full rounded bg-ink/[0.06] mb-2" />
        <div className="h-3 w-4/5 rounded bg-ink/[0.06] mb-8" />
        <div className="h-4 w-24 rounded bg-ink/10" />
      </div>
    </div>
  );
}

function ProjectCard({ repo, index }: { repo: GitHubRepo; index: number }) {
  const gradient = GRADIENTS[index % GRADIENTS.length];
  const metricColor = METRIC_COLORS[index % METRIC_COLORS.length];
  const tag = repo.language ?? repo.topics[0] ?? "Repository";

  return (
    <motion.a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1], delay: (index % PAGE_SIZE) * 0.08 }}
      className="group flex flex-col rounded-[22px] border border-ink/10 bg-white overflow-hidden transition-all duration-200 hover:-translate-y-1.5 hover:border-ink/25 hover:shadow-[0_30px_50px_-30px_rgba(22,21,29,0.4)]"
    >
      {/* Color-block header */}
      <div className="relative h-[168px]" style={{ backgroundImage: gradient }}>
        <div className="absolute inset-0" style={{ backgroundImage: STRIPES }} />
        <span className="absolute top-4 left-4 font-mono text-[11px] uppercase tracking-[0.08em] text-white px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-sm">
          {tag}
        </span>
        {repo.stargazers_count > 0 && (
          <span className="absolute top-4 right-4 font-mono text-[11px] text-white px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-sm">
            ★ {repo.stargazers_count}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-6">
        <h3 className="font-display font-semibold text-[21px] tracking-[-0.01em] text-ink mb-2 capitalize">
          {humanize(repo.name)}
        </h3>
        <p className="text-[15px] leading-[1.55] text-ink/60 mb-6 flex-1 line-clamp-2">
          {repo.description ?? "No description provided."}
        </p>
        <div className="flex items-center justify-between">
          <span
            className="font-mono text-[13px] font-semibold tracking-[0.02em]"
            style={{ color: metricColor }}
          >
            {repo.language ?? `Updated ${daysAgo(repo.updated_at)}`}
          </span>
          <span
            className="text-ink/40 group-hover:text-ink group-hover:translate-x-1 transition-all"
            aria-hidden
          >
            →
          </span>
        </div>
      </div>
    </motion.a>
  );
}

export function Projects() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const load = async () => {
    setStatus("loading");
    try {
      const data = await fetchRepos(GITHUB_USERNAME);
      setRepos(data);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const visible = repos.slice(0, visibleCount);
  const hasMore = visibleCount < repos.length;

  return (
    <section id="projects" className="scroll-mt-20 px-5 sm:px-8 py-16 lg:py-28">
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
              Portfolio
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

        {/* Loading */}
        {status === "loading" && (
          <div className="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(320px,1fr))]">
            {Array.from({ length: 3 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* Error */}
        {status === "error" && (
          <div className="flex flex-col items-center justify-center py-16 gap-4 rounded-[22px] border border-ink/10 bg-white">
            <p className="text-ink/60 text-center">
              Couldn&apos;t load projects from GitHub right now.
            </p>
            <button
              onClick={load}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-ink/15 hover:border-ink text-ink font-mono text-[13px] uppercase tracking-[0.04em] transition-colors"
            >
              <RefreshCw size={14} />
              Retry
            </button>
          </div>
        )}

        {/* Grid */}
        {status === "success" &&
          (repos.length === 0 ? (
            <p className="text-center text-ink/50 py-16">No projects found.</p>
          ) : (
            <>
              <div className="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(320px,1fr))]">
                {visible.map((repo, i) => (
                  <ProjectCard key={repo.name} repo={repo} index={i} />
                ))}
              </div>

              {hasMore && (
                <div className="flex justify-center mt-10">
                  <button
                    onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                    className="inline-flex items-center px-7 py-3 rounded-full border border-ink/15 hover:border-ink text-ink font-mono text-[13px] uppercase tracking-[0.04em] transition-colors"
                  >
                    Load More ({repos.length - visibleCount} more)
                  </button>
                </div>
              )}
            </>
          ))}
      </div>
    </section>
  );
}
