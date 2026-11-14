import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronRight, Folder, FolderOpen, Share2, Play } from "lucide-react";
import heroArt from "@/assets/hero-art.jpg";
import { resources, resourcesFor, subjects } from "@/data/resources";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Playshelf — free games & learning resources for kids" },
      { name: "description", content: "Browse free HTML games by subject: Maths, Creativity, Music, English, Spanish, Physics, Biology and more." },
      { property: "og:title", content: "Playshelf — free games for curious kids" },
      { property: "og:description", content: "Free HTML games and educational resources by subject, for families and kids." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const dotColors = ["bg-dot-red", "bg-dot-yellow", "bg-dot-blue"];

function Row({ active, onClick, icon, label, count }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string; count?: number }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-[15px] transition-colors",
        active ? "bg-row-active text-row-active-foreground" : "hover:bg-accent",
      )}
    >
      {icon}
      <span className="flex-1 truncate">{label}</span>
      {count !== undefined && <span className={cn("text-xs", active ? "opacity-70" : "text-muted-foreground")}>{count}</span>}
      <ChevronRight className={cn("h-4 w-4", active ? "" : "text-muted-foreground")} />
    </button>
  );
}

function Index() {
  const [subject, setSubject] = useState<string | null>(null);
  const [slug, setSlug] = useState<string | null>(null);
  const list = subject ? resourcesFor(subject) : [];
  const res = resources.find((r) => r.slug === slug && list.includes(r));

  const share = async () => {
    if (!res) return;
    const url = `${location.origin}/play/${res.slug}`;
    if (navigator.share) await navigator.share({ title: res.name, url }).catch(() => {});
    else await navigator.clipboard.writeText(url);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      <img src={heroArt} alt="Colourful glossy shapes, letters and numbers" width={1600} height={1104}
        className="animate-float fade-edges pointer-events-none absolute left-[340px] top-1/2 hidden w-[calc(100vw-400px)] max-w-[1150px] -translate-y-1/2 lg:block" />

      <div className={cn("panel-glass relative z-10 m-3 flex flex-col overflow-hidden rounded-3xl border border-border sm:m-5 lg:h-[calc(100vh-2.5rem)]",
        res ? "lg:w-[1100px]" : subject ? "lg:w-[680px]" : "lg:w-[330px]")}>
        <header className="flex items-center justify-between border-b border-border px-6 py-5">
          <Link to="/" onClick={() => { setSubject(null); setSlug(null); }} className="text-2xl font-bold tracking-tight">
            playshelf<span className="text-dot-red">.</span>
          </Link>
          <a href="mailto:hello@example.com" className="rounded-full bg-secondary px-4 py-1.5 text-sm font-medium hover:bg-accent">Contact</a>
        </header>

        <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
          {/* Subjects */}
          <div className="flex flex-col lg:w-[330px] lg:shrink-0 lg:border-r lg:border-border">
            <nav className="flex-1 space-y-0.5 overflow-y-auto p-3">
              {subjects.map((s) => {
                const active = subject === s.id;
                const Icon = active ? FolderOpen : Folder;
                return (
                  <Row key={s.id} active={active} label={s.name} count={resourcesFor(s.id).length}
                    icon={<Icon className="h-5 w-5" strokeWidth={1.6} />}
                    onClick={() => { setSubject(s.id); setSlug(null); }} />
                );
              })}
            </nav>
            <div className="hidden border-t border-border p-6 text-sm leading-relaxed text-muted-foreground lg:block">
              Playshelf is a growing collection of free games and learning resources for curious kids, updated regularly.
              Made with love by <span className="font-medium text-foreground">Julia Díez</span>.
            </div>
          </div>

          {/* Games */}
          {subject && (
            <div className="border-t border-border p-3 lg:w-[350px] lg:shrink-0 lg:border-r lg:border-t-0">
              {list.length === 0 ? (
                <p className="px-3 py-2 text-sm text-muted-foreground">New games coming soon ✨</p>
              ) : list.map((r, i) => (
                <Row key={r.slug} active={slug === r.slug} label={r.name} onClick={() => setSlug(r.slug)}
                  icon={<span className={cn("h-5 w-5 rounded-full", dotColors[i % 3])} />} />
              ))}
            </div>
          )}

          {/* Detail */}
          {res && (
            <div className="flex-1 overflow-y-auto border-t border-border p-6 lg:border-t-0">
              <Link to="/play/$slug" params={{ slug: res.slug }} className="block overflow-hidden rounded-2xl border border-border">
                <img src={res.thumb} alt={res.name} className="aspect-[4/3] w-full object-cover transition-transform hover:scale-[1.02]" />
              </Link>
              <dl className="mt-5 space-y-2 text-sm">
                {[["Name", res.name], ["Ages", res.ages], ["Date added", res.dateAdded],
                  ["Subjects", res.subjects.map((id) => subjects.find((s) => s.id === id)?.name).join(", ")],
                  ["Tags", res.tags.join(", ")]].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4"><dt>{k}</dt><dd className="text-right text-muted-foreground">{v}</dd></div>
                ))}
              </dl>
              <h3 className="mt-5 text-sm">Description</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{res.description}</p>
              <div className="mt-5 flex gap-2">
                <button onClick={share} className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-4 py-1.5 text-sm font-medium hover:bg-accent"><Share2 className="h-4 w-4" />Share</button>
                <Link to="/play/$slug" params={{ slug: res.slug }} className="inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-1.5 text-sm font-medium text-primary-foreground"><Play className="h-4 w-4" />Play</Link>
              </div>
            </div>
          )}
        </div>
      </div>
      <a href="https://substack.com/@juliadiez" target="_blank" rel="noreferrer"
        className="panel-glass fixed bottom-5 right-5 z-20 inline-flex items-center gap-2 rounded-xl border border-border px-3 py-2 text-sm font-medium hover:bg-accent">
        <span className="h-5 w-5 rounded-full bg-dot-red" />
        @juliadiez
      </a>
    </main>
  );
}
