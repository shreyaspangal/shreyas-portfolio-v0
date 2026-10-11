import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects, getProjectBySlug } from "@/data/projects";
import { PopIn } from "@/components/pop-in";
import { Reveal } from "@/components/reveal";
import { DottedSeparator } from "@/components/decorations";
import { SocialIcon } from "@/components/icons";
import { TrackedAnchor } from "@/components/tracked-link";
import { ProjectReview } from "@/components/project-review";
import { LoopVideo } from "@/components/loop-video";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: `${project.title} — Shreyas Pangal`,
    description: project.evidenceDetail,
    openGraph: { title: project.title, description: project.evidenceDetail },
    twitter: { card: "summary", title: project.title, description: project.evidenceDetail },
  };
}

const linkClass =
  "inline-flex items-center gap-1.5 text-fg underline decoration-accent decoration-dotted underline-offset-3 transition-colors hover:text-accent";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <main className="mx-auto max-w-content px-5 pt-12 pb-16">
      <a href="/#projects" className="font-mono text-xs text-muted hover:text-accent">
        ← back
      </a>

      <header className="mt-6 flex flex-col gap-3.5">
        <PopIn delay={0}>
          <div className="rounded-[20px] border border-hairline p-1.25">
            <div className="overflow-hidden rounded-2xl border border-white/8">
              <LoopVideo src={project.video} label={`${project.title} in action`} />
            </div>
          </div>
        </PopIn>
        <PopIn delay={0.07}>
          <h1 className="text-2xl font-semibold tracking-tight">{project.title}</h1>
          <p className="mt-1 font-mono text-xs text-faint">
            {project.role} · {project.period}
          </p>
        </PopIn>
        <PopIn delay={0.14}>
          <p className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[15px]">
            <TrackedAnchor
              href={project.preview}
              target="_blank"
              rel="noopener noreferrer"
              event="project_link_clicked"
              properties={{ slug: project.slug, link: "preview" }}
              className={linkClass}
            >
              Preview ↗
            </TrackedAnchor>
            {project.github && (
              <>
                <span className="text-faint" aria-hidden>
                  ·
                </span>
                <TrackedAnchor
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  event="project_link_clicked"
                  properties={{ slug: project.slug, link: "github" }}
                  className={linkClass}
                >
                  <SocialIcon chip="github" className="size-[0.85em] opacity-80" />
                  GitHub ↗
                </TrackedAnchor>
              </>
            )}
          </p>
        </PopIn>
      </header>

      <PopIn delay={0.22}>
        <div className="mt-7 space-y-4 text-[16px] leading-relaxed">
          {project.brief.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </PopIn>

      <DottedSeparator />

      <Reveal>
        <ProjectReview slug={project.slug} title={project.title} />
      </Reveal>
    </main>
  );
}
