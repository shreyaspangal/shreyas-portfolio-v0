import type { Project } from "@/data/projects";
import { CardGlow } from "@/components/card-glow";
import { LoopVideo } from "@/components/loop-video";
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
        <span className="block p-2">
          <span className="block overflow-hidden rounded-[11px] border border-white/8">
            <LoopVideo
              src={project.video}
              label={`${project.title} in action`}
              className="transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            />
          </span>
        </span>
        <span className="block px-4.5 pt-2 pb-5">
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
