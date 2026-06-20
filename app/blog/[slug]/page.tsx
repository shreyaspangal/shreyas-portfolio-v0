import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { mdxComponents } from "@/components/mdx-components";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
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
