import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, Maximize, X } from "lucide-react";
import { resources } from "@/data/resources";
import { ShareButton } from "@/components/ShareButton";
import { Button } from "@/components/ui/button";
import { GameRating } from "@/components/GameRating";
import { ratingsQueryOptions } from "@/lib/ratings.functions";

export const Route = createFileRoute("/play/$slug")({
  loader: async ({ params, context }) => {
    const resource = resources.find((r) => r.slug === params.slug);
    if (!resource) throw notFound();
    await context.queryClient.ensureQueryData(ratingsQueryOptions);
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
  const [maximized, setMaximized] = useState(false);
  useEffect(() => {
    if (!maximized) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMaximized(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [maximized]);
  const goFullscreen = () => {
    const el = document.getElementById("game") as (HTMLElement & { webkitRequestFullscreen?: () => void }) | null;
    if (el?.requestFullscreen && document.fullscreenEnabled) {
      el.requestFullscreen().catch(() => setMaximized(true));
    } else if (el?.webkitRequestFullscreen) {
      el.webkitRequestFullscreen();
    } else {
      setMaximized(true);
    }
  };
  return (
    <div className="fixed inset-0 flex flex-col bg-background">
      {!maximized && (<>
      <header className="grid shrink-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-x-2 gap-y-3 px-3 py-3 sm:flex sm:justify-between sm:gap-3 sm:px-4">
        <Button asChild variant="secondary" className="w-fit shrink-0 rounded-full px-3 sm:px-4">
          <Link to="/"><ArrowLeft className="h-4 w-4" /> Back</Link>
        </Button>
        <h1 className="order-first col-span-2 min-w-0 break-words text-base font-bold leading-snug sm:order-none sm:flex-1 sm:text-center">{r.name}</h1>
        <div className="flex shrink-0 items-center gap-2">
        <ShareButton slug={r.slug} name={r.name} />
        <Button
          onClick={goFullscreen}
          className="shrink-0 rounded-full px-3 sm:px-4"
        >
          <Maximize className="h-4 w-4" /> Full screen
        </Button>
        </div>
      </header>
      <div className="shrink-0 px-3 pb-2">
        <GameRating key={r.slug} slug={r.slug} compact />
      </div>
      </>)}
      {maximized && (
        <Button
          onClick={() => setMaximized(false)}
          variant="secondary"
          aria-label="Exit full screen"
          className="fixed right-3 top-3 z-[60] rounded-full px-3 shadow-lg"
          style={{ top: "max(0.75rem, env(safe-area-inset-top))" }}
        >
          <X className="h-4 w-4" /> Exit
        </Button>
      )}
      <iframe id="game" src={r.file} title={r.name} className={maximized ? "fixed inset-0 z-50 h-full w-full border-0 bg-card" : "mx-3 mb-3 min-h-0 flex-1 rounded-2xl border border-border bg-card"} allow={r.slug === "beat-lab" ? "autoplay; fullscreen; microphone" : "autoplay; fullscreen"} />
    </div>
  );
}
