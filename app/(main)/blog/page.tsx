import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { BlogList } from "@/components/BlogList";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes on growth analytics, experimentation, and data.",
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <section className="relative py-32 px-6 min-h-screen">
      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-foreground mb-3">
            <span className="squiggle-underline font-display">Blog</span>
          </h1>
          <p className="text-muted text-lg">
            Notes on growth analytics, experimentation, and data
          </p>
        </div>

        {posts.length === 0 ? (
          <p className="text-center text-muted py-16">
            No posts yet.{" "}
            <Link href="/admin" className="text-accent hover:underline">
              Write the first one
            </Link>
            .
          </p>
        ) : (
          <BlogList posts={posts} />
        )}
      </div>
    </section>
  );
}
