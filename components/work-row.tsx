import type { WorkItem } from "@/data/work";
import { Chip } from "@/components/chip";
import { WorkIcon } from "@/components/icons";
import { CardGlow } from "@/components/card-glow";

export function WorkRow({ item }: { item: WorkItem }) {
  return (
    <CardGlow className="-mx-3.5 rounded-[13px]">
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex flex-wrap items-start gap-4 rounded-[13px] border border-transparent px-3.5 py-4 transition-colors duration-250 hover:border-white/10 hover:bg-white/3"
      >
        <span className="mt-px shrink-0 max-sm:w-full">
          <Chip variant={item.chip}>
            <WorkIcon chip={item.chip} />
          </Chip>
        </span>

        <span className="min-w-0 flex-1 basis-52">
          <span className="flex flex-wrap items-center gap-2.5">
            <span className="text-[16px] font-medium tracking-tight text-fg group-hover:text-accent transition-colors">
              {item.title}
            </span>
            <span className="size-0.75 rounded-full bg-faint" />
            <span className="font-mono text-xs text-faint">
              {item.role} · {item.period}
            </span>
          </span>

          <span className="mt-2.5 block border-l-[1.5px] border-accent pl-2.5 font-mono text-[11.5px] leading-snug text-muted group-hover:text-fg transition-colors">
            <b className="font-medium text-accent">{item.evidenceLabel}</b>
            {"  "}
            {item.evidenceDetail}
          </span>
        </span>
      </a>
    </CardGlow>
  );
}
