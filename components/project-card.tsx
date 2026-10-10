import type { Project } from "@/data/projects";
import { ProjectIcon } from "@/components/icons";
import { CardGlow } from "@/components/card-glow";
import { TrackedLink } from "@/components/tracked-link";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <TrackedLink
      href={`/projects/${project.slug}`}
      event="work_item_clicked"
      properties={{ title: project.title, slug: project.slug, role: project.role }}
      className="group block rounded-[20px] border border-hairline p-1.25 transition-colors duration-250 hover:border-white/15"
    >
      <CardGlow className="h-full rounded-2xl border border-white/8 bg-surface">
        <span className="flex h-36 items-center justify-center">
          <ProjectIcon
            chip={project.chip}
            className="size-11 text-fg transition-transform duration-250 ease-out group-hover:scale-105"
          />
        </span>
        <span className="block px-4.5 pb-5">
          <span className="block text-[16px] font-medium tracking-tight text-fg transition-colors group-hover:text-accent">
            {project.title}
          </span>
          <span className="mt-0.5 block text-[15px] leading-snug text-muted">
            {project.evidenceDetail}
          </span>
        </span>
      </CardGlow>
    </TrackedLink>
  );
}
