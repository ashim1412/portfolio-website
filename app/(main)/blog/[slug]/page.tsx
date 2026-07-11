import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowLeft, Clock } from "lucide-react";
import { getAllPosts, getPostBySlug } from "@/lib/blog";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <article className="relative py-32 px-6 min-h-screen">
      <div className="relative z-10 max-w-3xl mx-auto">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-muted hover:text-foreground text-sm mb-8 transition-colors"
        >
          <ArrowLeft size={15} />
          Back to blog
        </Link>

        <div className="flex flex-wrap items-center gap-2 mb-4 text-xs text-muted">
          <span>{formatDate(post.date)}</span>
          <span>·</span>
          <span className="inline-flex items-center gap-1">
            <Clock size={12} />
            {post.readingTime}
          </span>
        </div>

        <h1 className="text-4xl font-bold text-foreground mb-8 leading-tight">
          {post.title}
        </h1>

        <div className="mdx-content">
          <MDXRemote source={post.content} />
        </div>
      </div>
    </article>
  );
}
