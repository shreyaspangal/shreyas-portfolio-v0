import Link from "next/link";
import { work } from "@/data/work";
import { socials } from "@/data/socials";
import { getAllPosts } from "@/lib/blog";
import { WorkRow } from "@/components/work-row";
import { SocialRow } from "@/components/social-row";
import { SectionLabel } from "@/components/section-label";
import { DottedSeparator, AvailablePill } from "@/components/decorations";
import { PencilIcon } from "@/components/icons";
import { Chip } from "@/components/chip";
import { PopIn } from "@/components/pop-in";
import { Reveal } from "@/components/reveal";
import { CardGlow } from "@/components/card-glow";

export default function Home() {
  const posts = getAllPosts();

  return (
    <main className="mx-auto max-w-content px-5">
      {/* top: avatar + name + nav — staggered pop-in on load */}
      <header className="flex flex-col gap-3.5 pt-12">
        <PopIn delay={0}>
          <div className="flex items-center gap-2.75">
            {/* swap for a real photo:
                <span className="size-10 overflow-hidden rounded-[9px]">
                  <img src="/me.jpg" alt="Shreyas Pangal" className="size-full object-cover" />
                </span> */}
            <span className="flex size-10 shrink-0 items-center justify-center rounded-[9px] border border-hairline bg-gradient-to-br from-elev to-elev font-mono text-sm font-medium text-fg shadow-[0_2px_8px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)]">
              SP
            </span>
            <h1 className="text-[22px] font-semibold tracking-tight">
              Shreyas Pangal
            </h1>
          </div>
        </PopIn>

        <PopIn delay={0.09}>
          <div className="flex flex-wrap items-center gap-4">
            <nav className="flex items-center gap-4.5">
              <Link
                href="#work"
                className="border-b border-dotted border-transparent text-sm text-muted transition-colors hover:border-accent hover:text-fg"
              >
                Work
              </Link>
              <Link
                href="#writing"
                className="border-b border-dotted border-transparent text-sm text-muted transition-colors hover:border-accent hover:text-fg"
              >
                Writing
              </Link>
              <Link
                href="#socials"
                className="border-b border-dotted border-transparent text-sm text-muted transition-colors hover:border-accent hover:text-fg"
              >
                Socials
              </Link>
            </nav>
            <AvailablePill />
          </div>
        </PopIn>
      </header>

      {/* bio: conversational, inline links carry the positioning */}
      <section className="space-y-3.5 pt-6.5">
        <PopIn delay={0.16}>
          <p>
            I&apos;m a frontend engineer in Bengaluru who builds interfaces
            for moments where being wrong has a cost — trust-critical,
            real-time, and AI-assisted product UIs.
          </p>
        </PopIn>
        <PopIn delay={0.22}>
          <p>
            Right now I&apos;m building{" "}
            <a
              href="https://github.com/shreyaspangal/care-align"
              target="_blank"
              rel="noopener noreferrer"
              className="text-fg underline decoration-accent decoration-dotted underline-offset-3 hover:text-accent"
            >
              CareAlign
            </a>
            , a tool that makes medical documents readable without inventing
            things along the way. Across five years I&apos;ve worked in
            diagnostics, DeFi, and AI — domains where the screen is the last
            thing between a person and a costly misread.
          </p>
        </PopIn>
        <PopIn delay={0.28}>
          <p>
            Open to senior frontend roles and select freelance work.{" "}
            <a
              href="#socials"
              className="text-fg underline decoration-accent decoration-dotted underline-offset-3 hover:text-accent"
            >
              Get in touch
            </a>
            .
          </p>
        </PopIn>
      </section>

      <DottedSeparator />

      {/* work */}
      <section id="work">
        <Reveal>
          <SectionLabel>Work</SectionLabel>
          <div className="flex flex-col gap-1.5">
            {work.map((item) => (
              <WorkRow key={item.slug} item={item} />
            ))}
          </div>
        </Reveal>
      </section>

      <DottedSeparator />

      {/* writing */}
      <section id="writing">
        <Reveal>
          <SectionLabel>Writing</SectionLabel>
          <div className="flex flex-col gap-1.5">
            {posts.length === 0 ? (
              <p className="text-sm text-muted">More writing coming soon.</p>
            ) : (
              posts.map((post) => (
                <CardGlow key={post.slug} className="-mx-3.5 rounded-[13px]">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group grid grid-cols-[38px_1fr] items-center gap-4 rounded-[13px] border border-transparent px-3.5 py-4 transition-colors duration-250 hover:border-white/10 hover:bg-white/3"
                  >
                    <Chip variant="write">
                      <PencilIcon />
                    </Chip>
                    <span className="flex items-center justify-between gap-3.5">
                      <span className="text-[15.5px] transition-colors group-hover:text-accent">
                        {post.title}
                      </span>
                      <span className="font-mono text-xs whitespace-nowrap text-faint transition-colors group-hover:text-accent">
                        {post.date}
                      </span>
                    </span>
                  </Link>
                </CardGlow>
              ))
            )}
          </div>
        </Reveal>
      </section>

      <DottedSeparator />

      {/* socials */}
      <section id="socials">
        <Reveal>
          <SectionLabel>Socials</SectionLabel>
          <div className="flex flex-col gap-1.5">
            {socials.map((link) => (
              <SocialRow key={link.label} link={link} />
            ))}
          </div>
        </Reveal>
      </section>

      <DottedSeparator />

      <footer className="pb-16 pt-2 text-center">
        <p className="font-mono text-[11.5px] tracking-wide text-faint">
          Built by Shreyas, in Bengaluru
        </p>
      </footer>
    </main>
  );
}
