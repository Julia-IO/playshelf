import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Maximize } from "lucide-react";
import { resources } from "@/data/resources";
import { ShareButton } from "@/components/ShareButton";

export const Route = createFileRoute("/play/$slug")({
  loader: ({ params }) => {
    const resource = resources.find((r) => r.slug === params.slug);
    if (!resource) throw notFound();
    return resource;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.name} — Playshelf` : "Unavailable — Playshelf" },
      { name: "description", content: loaderData?.description ?? "Game not found." },
      { property: "og:title", content: loaderData?.name ?? "Playshelf" },
      { property: "og:description", content: loaderData?.description ?? "" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Play,
});

function Play() {
  const r = Route.useLoaderData();
  return (
    <div className="fixed inset-0 flex flex-col bg-background">
      <header className="flex items-center justify-between gap-3 px-4 py-3">
        <Link to="/" className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-sm font-medium hover:bg-accent">
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>
        <span className="font-bold">{r.name}</span>
        <div className="flex items-center gap-2">
        <ShareButton slug={r.slug} name={r.name} />
        <button
          onClick={() => document.getElementById("game")?.requestFullscreen?.()}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground"
        >
          <Maximize className="h-4 w-4" /> Full screen
        </button>
        </div>
      </header>
      <iframe id="game" src={r.file} title={r.name} className="mx-3 mb-3 flex-1 rounded-2xl border border-border bg-card" allow="autoplay; fullscreen" />
    </div>
  );
}
