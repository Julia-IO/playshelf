import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Maximize } from "lucide-react";
import { resources } from "@/data/resources";
import { ShareButton } from "@/components/ShareButton";
import { Button } from "@/components/ui/button";

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
      <header className="grid shrink-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-x-2 gap-y-3 px-3 py-3 sm:flex sm:justify-between sm:gap-3 sm:px-4">
        <Button asChild variant="secondary" className="w-fit shrink-0 rounded-full px-3 sm:px-4">
          <Link to="/"><ArrowLeft className="h-4 w-4" /> Back</Link>
        </Button>
        <h1 className="order-first col-span-2 min-w-0 break-words text-base font-bold leading-snug sm:order-none sm:flex-1 sm:text-center">{r.name}</h1>
        <div className="flex shrink-0 items-center gap-2">
        <ShareButton slug={r.slug} name={r.name} />
        <Button
          onClick={() => document.getElementById("game")?.requestFullscreen?.()}
          className="shrink-0 rounded-full px-3 sm:px-4"
        >
          <Maximize className="h-4 w-4" /> Full screen
        </Button>
        </div>
      </header>
      <iframe id="game" src={r.file} title={r.name} className="mx-3 mb-3 min-h-0 flex-1 rounded-2xl border border-border bg-card" allow="autoplay; fullscreen" />
    </div>
  );
}
