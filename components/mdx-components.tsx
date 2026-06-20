import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  h2: (props) => (
    <h2 className="mt-8 text-lg font-semibold tracking-tight" {...props} />
  ),
  p: (props) => <p className="text-muted" {...props} />,
  a: (props) => (
    <a
      className="text-fg underline decoration-accent decoration-dotted underline-offset-3 hover:text-accent"
      {...props}
    />
  ),
  code: (props) => (
    <code
      className="rounded bg-surface px-1.5 py-0.5 font-mono text-[13px]"
      {...props}
    />
  ),
};
