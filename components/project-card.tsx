"use client";

import posthog from "posthog-js";
import type { Project } from "@/data/projects";
import { Chip } from "@/components/chip";
import { ProjectIcon } from "@/components/icons";
import { CardGlow } from "@/components/card-glow";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <CardGlow className="-mx-3.5 rounded-[13px]">
      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() =>
          posthog.capture("work_item_clicked", {
            title: project.title,
            slug: project.slug,
            role: project.role,
          })
        }
        className="group flex flex-wrap items-start gap-4 rounded-[13px] border border-transparent px-3.5 py-4 transition-colors duration-250 hover:border-white/10 hover:bg-white/3"
      >
        <span className="mt-px shrink-0 max-sm:w-full">
          <Chip variant={project.chip}>
            <ProjectIcon chip={project.chip} />
          </Chip>
        </span>

        <span className="min-w-0 flex-1 basis-52">
          <span className="flex flex-wrap items-center gap-2.5">
            <span className="text-[16px] font-medium tracking-tight text-fg group-hover:text-accent transition-colors">
              {project.title}
            </span>
            <span className="size-0.75 rounded-full bg-faint" />
            <span className="font-mono text-xs text-faint">
              {project.role} · {project.period}
            </span>
          </span>

          <span className="mt-2.5 block border-l-[1.5px] border-accent pl-2.5 font-mono text-[11.5px] leading-snug text-muted group-hover:text-fg transition-colors">
            <b className="font-medium text-accent">{project.evidenceLabel}</b>
            {"  "}
            {project.evidenceDetail}
          </span>
        </span>
      </a>
    </CardGlow>
  );
}
