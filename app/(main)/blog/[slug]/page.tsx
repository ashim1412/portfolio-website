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
  return { title: `${post.title} | Ashim Shrestha`, description: post.excerpt };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <article className="px-5 sm:px-8 pt-32 lg:pt-40 pb-16 lg:pb-28">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 font-mono text-[13px] uppercase tracking-[0.04em] text-ink/50 hover:text-ink mb-10 transition-colors"
        >
          <ArrowLeft size={14} />
          Back to blog
        </Link>

        <div className="flex flex-wrap items-center gap-2 mb-4 font-mono text-[12px] uppercase tracking-[0.04em] text-ink/40">
          <span>{formatDate(post.date)}</span>
          <span aria-hidden>·</span>
          <span className="inline-flex items-center gap-1">
            <Clock size={12} />
            {post.readingTime}
          </span>
        </div>

        <h1
          className="font-display font-bold tracking-[-0.02em] text-ink leading-[1.1] mb-10"
          style={{ fontSize: "clamp(28px, 4vw, 44px)" }}
        >
          {post.title}
        </h1>

        <div className="mdx-content">
          <MDXRemote source={post.content} />
        </div>
      </div>
    </article>
  );
}
