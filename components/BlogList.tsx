"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import type { PostSummary } from "@/lib/blog";

// Cycles the site's 5-accent palette per tag — inline style, not dynamic
// Tailwind class strings, so this survives Tailwind's JIT content scan
// (matches the convention already established in components/Skills.tsx).
const TAG_COLORS = ["#2f6bff", "#7c4dff", "#ff5b3a", "#12b981", "#ffb020"];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function BlogCard({ post, index }: { post: PostSummary; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1], delay: (index % 3) * 0.08 }}
    >
      <Link
        href={`/blog/${post.slug}`}
        className="group flex flex-col h-full rounded-[22px] border border-ink/10 bg-white p-6 transition-all duration-200 hover:-translate-y-1.5 hover:border-ink/25 hover:shadow-[0_30px_50px_-30px_rgba(22,21,29,0.4)]"
      >
        <div className="flex flex-wrap items-center gap-2 mb-3 font-mono text-[12px] uppercase tracking-[0.04em] text-ink/40">
          <span>{formatDate(post.date)}</span>
          <span aria-hidden>·</span>
          <span className="inline-flex items-center gap-1">
            <Clock size={12} />
            {post.readingTime}
          </span>
        </div>

        <h3 className="font-display font-semibold text-[21px] tracking-[-0.01em] text-ink mb-2 group-hover:text-accent-amber transition-colors">
          {post.title}
        </h3>

        <p className="text-[15px] leading-[1.55] text-ink/60 mb-6 flex-1 line-clamp-3">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, ti) => {
              const color = TAG_COLORS[ti % TAG_COLORS.length];
              return (
                <span
                  key={tag}
                  className="font-mono text-[11px] px-2.5 py-1 rounded-full border"
                  style={{ borderColor: `${color}4d`, color }}
                >
                  {tag}
                </span>
              );
            })}
          </div>
          <span
            className="text-ink/40 group-hover:text-ink group-hover:translate-x-1 transition-all shrink-0"
            aria-hidden
          >
            →
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

export function BlogList({ posts }: { posts: PostSummary[] }) {
  return (
    <div className="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(320px,1fr))]">
      {posts.map((post, i) => (
        <BlogCard key={post.slug} post={post} index={i} />
      ))}
    </div>
  );
}
