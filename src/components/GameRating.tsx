import { useEffect, useId, useState } from "react";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { ratingsQueryOptions } from "@/lib/ratings.functions";
import { ratingSchema } from "@/lib/ratings-schema";
import { displayedRating, starFill } from "@/lib/rating-display";
import { cn } from "@/lib/utils";

export function GameRating({ slug, compact = false }: { slug: string; compact?: boolean }) {
  const { data } = useSuspenseQuery(ratingsQueryOptions);
  const queryClient = useQueryClient();
  const [mine, setMine] = useState(0);
  const [preview, setPreview] = useState(0);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const summary = data.ratings.find((rating) => rating.slug === slug);
  const fillId = useId();
  const score = displayedRating(summary?.average, mine, preview);

  useEffect(() => {
    setMine(0); setPreview(0); setMessage("");
    try {
      const value = Number(localStorage.getItem(`playshelf-rating:${slug}`));
      if (Number.isInteger(value) && value >= 1 && value <= 5) setMine(value);
    } catch { /* Ratings still work when browser storage is unavailable. */ }
  }, [slug]);

  const vote = async (stars: number) => {
    if (busy) return;
    setBusy(true); setMessage("");
    try {
      let voter: string | null = null;
      try { voter = localStorage.getItem("playshelf-rating-voter"); } catch { /* handled below */ }
      if (!voter || !ratingSchema.safeParse({ slug, voter, stars }).success) {
        voter = crypto.randomUUID();
        // Without persistent storage we cannot reliably remember this browser's vote.
        localStorage.setItem("playshelf-rating-voter", voter);
      }
      const valid = ratingSchema.parse({ slug, voter, stars });
      const { error } = await supabase.rpc("rate_game", { p_slug: valid.slug, p_voter: valid.voter, p_stars: valid.stars });
      if (error) throw error;
      setMine(stars);
      try { localStorage.setItem(`playshelf-rating:${slug}`, String(stars)); } catch { /* saved remotely */ }
      setMessage(`You rated this ${stars} ${stars === 1 ? "star" : "stars"} — thanks!`);
      await queryClient.invalidateQueries({ queryKey: ratingsQueryOptions.queryKey });
    } catch {
      setMessage("Couldn't save your stars. Please try again in a moment.");
    } finally { setBusy(false); }
  };

  return (
    <section aria-label="Game rating" className={cn("min-w-0", compact ? "flex flex-wrap items-center justify-center gap-x-3 gap-y-1" : "mt-5 border-t border-border pt-4")}>
      <p className={cn("text-xs font-medium", compact ? "w-full text-center" : "mb-1")}>Rate this game</p>
      <div className="flex shrink-0 items-center" role="group" aria-label="Rate this game">
        {[1, 2, 3, 4, 5].map((stars) => (
          <Button key={stars} variant="ghost" size="icon" disabled={busy}
            aria-label={`Give ${stars} ${stars === 1 ? "star" : "stars"}`} aria-pressed={mine === stars}
            title={`${stars} ${stars === 1 ? "star" : "stars"}`}
            onPointerEnter={() => setPreview(stars)} onPointerLeave={() => setPreview(0)}
            onFocus={() => setPreview(stars)} onBlur={() => setPreview(0)} onClick={() => void vote(stars)}
            className={cn("sketch-star h-11 w-11 rounded-full", starFill(score, stars) > 0 ? "text-rating-ink" : "text-muted-foreground")}>
            <svg aria-hidden="true" viewBox="0 0 40 40" className="!h-8 !w-8">
              <defs><clipPath id={`${fillId}-${stars}`}><rect width={40 * starFill(score, stars)} height="40" /></clipPath></defs>
              <path d="M20 3.5 24.8 14l11.4 1.4-8.4 8 2.4 12L20 29.5 9.3 35l2.4-11.6-8.2-8 11.6-1.8Z" className="fill-rating-fill" clipPath={`url(#${fillId}-${stars})`} />
              <path d="M20 3.5 24.8 14l11.4 1.4-8.4 8 2.4 12L20 29.5 9.3 35l2.4-11.6-8.2-8 11.6-1.8Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
              <path d="m19.2 5 5 10.4 10.1 1.3-7.8 7.8 2 9.3-8.3-4.9-9.4 4.7 2-10.4-7.2-7 10-1.9Z" fill="none" stroke="currentColor" strokeWidth=".65" strokeLinejoin="round" opacity=".65" />
            </svg>
          </Button>
        ))}
      </div>
      <p className={cn("text-xs text-muted-foreground", compact && "w-full text-center")}>
        {summary ? `Community average: ${summary.average.toFixed(1)} / 5 · ${summary.count} ${summary.count === 1 ? "vote" : "votes"} in total` : data.available ? "No community votes yet" : "Ratings temporarily unavailable"}
      </p>
      <p role="status" aria-live="polite" className={cn("text-xs text-muted-foreground", compact ? "w-full text-center" : "mt-1", message ? "" : "sr-only")}>
        {busy ? "Saving your stars…" : message}
      </p>
    </section>
  );
}