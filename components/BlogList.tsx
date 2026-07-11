"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import type { PostSummary } from "@/lib/blog";

const TAG_COLORS = [
  "bg-blue-500/15 text-blue-400 border-blue-500/20",
  "bg-purple-500/15 text-purple-400 border-purple-500/20",
  "bg-cyan-500/15 text-cyan-400 border-cyan-500/20",
  "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
];

function tagColor(index: number) {
  return TAG_COLORS[index % TAG_COLORS.length];
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function BlogList({ posts }: { posts: PostSummary[] }) {
  return (
    <div className="flex flex-col gap-5">
      {posts.map((post, i) => (
        <motion.div
          key={post.slug}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: i * 0.08 }}
          whileHover={{ y: -4, rotate: i % 2 === 0 ? -0.5 : 0.5 }}
        >
          <Link
            href={`/blog/${post.slug}`}
            className="group block rounded-xl border border-border bg-secondary p-6 transition-colors hover:border-blue-500/30 hover:shadow-[0_8px_30px_rgba(59,130,246,0.12)]"
          >
            <div className="flex flex-wrap items-center gap-2 mb-3 text-xs text-muted">
              <span>{formatDate(post.date)}</span>
              <span>·</span>
              <span className="inline-flex items-center gap-1">
                <Clock size={12} />
                {post.readingTime}
              </span>
            </div>

            <h2 className="text-xl font-bold text-foreground mb-2 group-hover:text-blue-400 transition-colors">
              {post.title}
            </h2>

            <p className="text-muted text-sm leading-relaxed mb-4">
              {post.excerpt}
            </p>

            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, ti) => (
                  <span
                    key={tag}
                    className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${tagColor(ti)}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
