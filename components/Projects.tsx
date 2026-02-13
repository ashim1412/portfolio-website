"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { ExternalLink, Github, RefreshCw } from "lucide-react";
import { fetchRepos, daysAgo, type GitHubRepo } from "@/lib/github";
import { ProjectModal } from "./ProjectModal";

const PAGE_SIZE = 6;
const GITHUB_USERNAME = "ashim1412";

const LANG_EMOJI: Record<string, string> = {
  Python: "🐍",
  JavaScript: "⚡",
  TypeScript: "⚡",
  SQL: "🗄️",
};

const TAG_COLORS = [
  "bg-blue-500/15 text-blue-400 border-blue-500/20",
  "bg-purple-500/15 text-purple-400 border-purple-500/20",
  "bg-cyan-500/15 text-cyan-400 border-cyan-500/20",
  "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
];

function tagColor(index: number) {
  return TAG_COLORS[index % TAG_COLORS.length];
}

// ── Skeleton card ──────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="rounded-xl border border-border bg-secondary p-6 animate-pulse">
      <div className="h-8 w-8 rounded-full bg-border mb-4" />
      <div className="h-5 w-2/3 rounded bg-border mb-3" />
      <div className="h-3 w-full rounded bg-border/60 mb-2" />
      <div className="h-3 w-4/5 rounded bg-border/60 mb-6" />
      <div className="flex gap-2 mb-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-5 w-16 rounded-full bg-border/60" />
        ))}
      </div>
      <div className="flex gap-2">
        <div className="h-9 w-28 rounded-full bg-border/60" />
        <div className="h-9 w-24 rounded-full bg-border/60" />
      </div>
    </div>
  );
}

// ── Project card ───────────────────────────────────────────────────────────────
interface CardProps {
  repo: GitHubRepo;
  index: number;
  onOpenModal: (repo: GitHubRepo) => void;
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
  }),
};

function ProjectCard({ repo, index, onOpenModal }: CardProps) {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      custom={index}
      className="group flex flex-col rounded-xl border border-border bg-secondary p-6 transition-all duration-300 hover:border-blue-500/30 hover:shadow-[0_8px_30px_rgba(59,130,246,0.12)] hover:-translate-y-1"
    >
      {/* Language emoji */}
      <span className="text-3xl mb-4 leading-none select-none">
        {LANG_EMOJI[repo.language ?? ""] ?? "📁"}
      </span>

      {/* Title */}
      <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-blue-400 transition-colors capitalize">
        {repo.name.replace(/-/g, " ")}
      </h3>

      {/* Description */}
      <p className="text-muted text-sm leading-relaxed line-clamp-2 mb-4 flex-1">
        {repo.description ?? "No description provided."}
      </p>

      {/* Topics */}
      {repo.topics.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {repo.topics.slice(0, 4).map((topic, i) => (
            <span
              key={topic}
              className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${tagColor(i)}`}
            >
              {topic}
            </span>
          ))}
          {repo.topics.length > 4 && (
            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium border border-border text-muted">
              +{repo.topics.length - 4}
            </span>
          )}
        </div>
      )}

      {/* Updated timestamp */}
      <p className="text-xs text-muted mb-5">Updated {daysAgo(repo.updated_at)}</p>

      {/* Buttons */}
      <div className="flex gap-2 mt-auto">
        <button
          onClick={() => onOpenModal(repo)}
          className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-blue-500 hover:bg-blue-400 text-white text-xs font-semibold transition-all duration-200 hover:scale-105"
        >
          View Details
        </button>
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-border hover:border-foreground/40 text-muted text-xs font-semibold transition-all duration-200 hover:scale-105 hover:text-foreground"
        >
          <Github size={13} />
          GitHub
        </a>
        {repo.homepage && (
          <a
            href={repo.homepage}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-3 py-2 rounded-full border border-border hover:border-blue-500/50 text-muted transition-all duration-200 hover:scale-105 hover:text-blue-400"
            aria-label="Live demo"
          >
            <ExternalLink size={13} />
          </a>
        )}
      </div>
    </motion.div>
  );
}

// ── Main section ──────────────────────────────────────────────────────────────
export function Projects() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [selectedRepo, setSelectedRepo] = useState<GitHubRepo | null>(null);
  const closeModal = useCallback(() => setSelectedRepo(null), []);

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme !== "light";

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

  useEffect(() => { load(); }, []);

  const visible = repos.slice(0, visibleCount);
  const hasMore = visibleCount < repos.length;

  return (
    <>
      <section
        id="projects"
        ref={sectionRef}
        className="relative py-20 px-6 overflow-hidden"
        style={{
          background: isDark
            ? "linear-gradient(135deg, #0a0a1a 0%, #0a1628 40%, #0f0728 70%, #0a0a1a 100%)"
            : "linear-gradient(135deg, #dbeafe 0%, #e0f2fe 40%, #ede9fe 70%, #f0f9ff 100%)",
        }}
      >
        {/* Ambient orbs */}
        <div className="absolute pointer-events-none" style={{ top: "-60px", right: "15%", width: 350, height: 350, borderRadius: "50%", background: isDark ? "radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)" : "radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%)" }} />
        <div className="absolute pointer-events-none" style={{ bottom: "-40px", left: "10%", width: 260, height: 260, borderRadius: "50%", background: isDark ? "radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 70%)" : "radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)" }} />
        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-foreground mb-3">
              Featured Projects
            </h2>
            <p className="text-lg text-muted">
              Data-driven solutions and analytics projects
            </p>
          </motion.div>

          {/* Loading */}
          {status === "loading" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: PAGE_SIZE }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          )}

          {/* Error */}
          {status === "error" && (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <p className="text-muted text-center">
                Could not load projects from GitHub.
              </p>
              <button
                onClick={load}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-border hover:border-blue-500/50 text-muted hover:text-blue-400 text-sm font-medium transition-all duration-200"
              >
                <RefreshCw size={15} />
                Retry
              </button>
            </div>
          )}

          {/* Grid */}
          {status === "success" && (
            <>
              {repos.length === 0 ? (
                <p className="text-center text-muted py-16">No projects found.</p>
              ) : (
                <AnimatePresence mode="wait">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {visible.map((repo, i) => (
                      <ProjectCard
                        key={repo.name}
                        repo={repo}
                        index={i}
                        onOpenModal={setSelectedRepo}
                      />
                    ))}
                  </div>
                </AnimatePresence>
              )}

              {/* Load more */}
              {hasMore && (
                <div className="flex justify-center mt-10">
                  <button
                    onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                    className="px-8 py-3 rounded-full border border-border hover:border-blue-500/50 text-muted hover:text-blue-400 text-sm font-medium transition-all duration-200 hover:scale-105"
                  >
                    Load More Projects ({repos.length - visibleCount} remaining)
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <ProjectModal repo={selectedRepo} onClose={closeModal} />
    </>
  );
}
