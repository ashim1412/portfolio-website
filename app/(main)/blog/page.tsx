import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import { BlogList } from "@/components/BlogList";

export const metadata: Metadata = {
  title: "Blog | Ashim Shrestha",
  description: "Notes on growth analytics, experimentation, and data.",
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <section className="px-5 sm:px-8 pt-32 lg:pt-40 pb-16 lg:pb-28">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-accent-amber mb-4">
            // Blog
          </p>
          <h1
            className="font-display font-bold tracking-[-0.02em] text-ink leading-[1.05] mb-4"
            style={{ fontSize: "clamp(32px, 4.5vw, 56px)" }}
          >
            Notes on growth, analytics, and data.
          </h1>
          <p className="text-[16px] leading-[1.6] text-ink/60 max-w-xl mx-auto">
            Cohort analysis, experimentation, and the occasional messy SQL query —
            written up when there&apos;s something worth saying.
          </p>
        </div>

        {posts.length === 0 ? (
          <p className="text-center text-ink/50 py-16">No posts yet. Check back soon.</p>
        ) : (
          <BlogList posts={posts} />
        )}
      </div>
    </section>
  );
}
