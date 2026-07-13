import Link from "next/link";
import { BlogList } from "@/components/BlogList";
import type { PostSummary } from "@/lib/blog";

export function FeaturedPosts({ posts }: { posts: PostSummary[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="bg-white border-y border-ink/10 px-5 sm:px-8 py-16 lg:py-28">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-12">
          <div>
            <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-accent-amber mb-4">
              // From the Blog
            </p>
            <h2
              className="font-display font-bold tracking-[-0.02em] text-ink leading-[1.05]"
              style={{ fontSize: "clamp(32px, 4.5vw, 56px)" }}
            >
              Notes on growth and analytics.
            </h2>
          </div>
          <Link
            href="/blog"
            className="font-mono text-[13px] uppercase tracking-[0.04em] text-accent-amber underline underline-offset-4 decoration-accent-amber/40 hover:decoration-accent-amber transition-colors"
          >
            Read the blog →
          </Link>
        </div>

        <BlogList posts={posts} />
      </div>
    </section>
  );
}
