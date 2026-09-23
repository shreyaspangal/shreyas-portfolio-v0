"use client";

import posthog from "posthog-js";
import type { Project } from "@/data/projects";
import { ProjectIcon } from "@/components/icons";
import { CardGlow } from "@/components/card-glow";

export function ProjectCard({ project }: { project: Project }) {
  return (
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
    </a>
  );
}
