import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { mdxComponents } from "@/components/mdx-components";
import { BlogViewTracker } from "@/components/blog-view-tracker";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} — Shreyas Pangal`,
    description: post.summary,
    openGraph: { title: post.title, description: post.summary, type: "article" },
    twitter: { card: "summary", title: post.title, description: post.summary },
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <main className="mx-auto max-w-content px-5 pt-12 pb-16">
      <BlogViewTracker slug={post.slug} title={post.title} />
      <a
        href="/#writing"
        className="font-mono text-xs text-muted hover:text-accent"
      >
        ← back
      </a>
      <h1 className="mt-6 text-2xl font-semibold tracking-tight">
        {post.title}
      </h1>
      <p className="mt-2 font-mono text-xs text-faint">{post.date}</p>
      <article className="prose-invert mt-8 space-y-4 text-[16px] leading-relaxed text-fg">
        <MDXRemote source={post.content} components={mdxComponents} />
      </article>
    </main>
  );
}
