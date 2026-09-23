import { work } from "@/data/work";
import { socials, type SocialLink } from "@/data/socials";
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
import { TrackedLink, TrackedAnchor } from "@/components/tracked-link";

const contactHref = (chip: SocialLink["chip"]) =>
  socials.find((link) => link.chip === chip)?.href;

export default function Home() {
  const posts = getAllPosts();

  return (
    <main className="mx-auto max-w-content px-5">
      {/* top: avatar + name + nav — staggered pop-in on load */}
      <header className="flex flex-col gap-3.5 pt-12">
        <PopIn delay={0}>
          <div className="flex items-center gap-2.75">
            <span className="size-10 overflow-hidden rounded-[9px]">
              <img src="/me.jpeg" alt="Shreyas Pangal" className="size-full object-cover" />
            </span>
            <h1 className="text-[22px] font-semibold tracking-tight">
              Shreyas Pangal
            </h1>
          </div>
        </PopIn>

        <PopIn delay={0.09}>
          <div className="flex flex-wrap items-center gap-4">
            <nav className="flex items-center gap-4.5">
              <TrackedLink
                href="#work"
                event="nav_link_clicked"
                properties={{ section: "work" }}
                className="border-b border-dotted border-transparent text-sm text-muted transition-colors hover:border-accent hover:text-fg"
              >
                Work
              </TrackedLink>
              <TrackedLink
                href="#writing"
                event="nav_link_clicked"
                properties={{ section: "writing" }}
                className="border-b border-dotted border-transparent text-sm text-muted transition-colors hover:border-accent hover:text-fg"
              >
                Writing
              </TrackedLink>
              <TrackedLink
                href="#socials"
                event="nav_link_clicked"
                properties={{ section: "socials" }}
                className="border-b border-dotted border-transparent text-sm text-muted transition-colors hover:border-accent hover:text-fg"
              >
                Socials
              </TrackedLink>
            </nav>
            <AvailablePill />
          </div>
        </PopIn>
      </header>

      {/* bio: conversational, inline links carry the positioning */}
      <section className="space-y-3.5 pt-6.5">
        <PopIn delay={0.16}>
          <p>
            I&apos;m a frontend engineer in Bengaluru building interfaces
            for trust-critical, and real-time product UIs.
          </p>
        </PopIn>
        <PopIn delay={0.22}>
          <p>
            I like building things people actually enjoy using: small,
            finished, and out in the world rather than sitting in a branch.
            Most of the work goes into the details nobody is meant to notice,
            which is the part I like most.
          </p>
        </PopIn>
        {/* <PopIn delay={0.25}>
          <p>
            I got here sideways — a marketing degree, then a few years
            teaching myself to code until it stuck. Outside of work I tinker
            with AI agents, drink more coffee than I should, and play
            badminton on weekends.
          </p>
        </PopIn> */}
        <PopIn delay={0.28}>
          <p>
            You can reach me at{" "}
            <TrackedAnchor
              href={contactHref("x")}
              target="_blank"
              rel="noopener noreferrer"
              event="contact_link_clicked"
              properties={{ channel: "x" }}
              className="text-fg underline decoration-accent decoration-dotted underline-offset-3 hover:text-accent"
            >
              ShreyasPangal
            </TrackedAnchor>
            , via{" "}
            <TrackedAnchor
              href={contactHref("mail")}
              event="contact_link_clicked"
              properties={{ channel: "email" }}
              className="text-fg underline decoration-accent decoration-dotted underline-offset-3 hover:text-accent"
            >
              email
            </TrackedAnchor>
            , or see my code on{" "}
            <TrackedAnchor
              href={contactHref("github")}
              target="_blank"
              rel="noopener noreferrer"
              event="contact_link_clicked"
              properties={{ channel: "github" }}
              className="text-fg underline decoration-accent decoration-dotted underline-offset-3 hover:text-accent"
            >
              GitHub
            </TrackedAnchor>
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
                  <TrackedLink
                    href={`/blog/${post.slug}`}
                    event="blog_post_clicked"
                    properties={{ slug: post.slug, title: post.title }}
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
                  </TrackedLink>
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
