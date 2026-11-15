import { useEffect, useId, useState } from "react";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { ratingsQueryOptions } from "@/lib/ratings.functions";
import { ratingSchema } from "@/lib/ratings-schema";
import { displayedRating, starFill } from "@/lib/rating-display";
import { cn } from "@/lib/utils";

function SketchStar({ fill, small = false }: { fill: number; small?: boolean }) {
  const id = useId();
  return <svg aria-hidden="true" viewBox="0 0 40 40" className={cn(small ? "h-5 w-5" : "!h-8 !w-8", fill > 0 ? "text-rating-ink" : "text-muted-foreground")}>
    <defs><clipPath id={id}><rect width={40 * fill} height="40" /></clipPath></defs>
    <path d="M20 3.5 24.8 14l11.4 1.4-8.4 8 2.4 12L20 29.5 9.3 35l2.4-11.6-8.2-8 11.6-1.8Z" className="fill-rating-fill" clipPath={`url(#${id})`} />
    <path d="M20 3.5 24.8 14l11.4 1.4-8.4 8 2.4 12L20 29.5 9.3 35l2.4-11.6-8.2-8 11.6-1.8Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <path d="m19.2 5 5 10.4 10.1 1.3-7.8 7.8 2 9.3-8.3-4.9-9.4 4.7 2-10.4-7.2-7 10-1.9Z" fill="none" stroke="currentColor" strokeWidth=".65" strokeLinejoin="round" opacity=".65" />
  </svg>;
}

export function GameRating({ slug, compact = false }: { slug: string; compact?: boolean }) {
  const { data } = useSuspenseQuery(ratingsQueryOptions);
  const queryClient = useQueryClient();
  const [mine, setMine] = useState(0);
  const [preview, setPreview] = useState(0);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const summary = data.ratings.find((rating) => rating.slug === slug);
  const voteId = useId();
  const score = displayedRating(mine, preview);

  useEffect(() => {
    setMine(0); setPreview(0); setMessage(""); setOpen(false);
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
    <section aria-label="Game rating" className={cn("min-w-0", compact ? "text-center" : "mt-5 border-t border-border pt-4")}>
      <div className={cn("flex flex-wrap items-center gap-x-2 gap-y-1", compact && "justify-center")}>
        <p className="text-xs font-medium">Community rating</p>
        {summary && <div aria-label={`Community average ${summary.average.toFixed(1)} out of 5`} className="flex shrink-0 items-center gap-0.5">
          {[1, 2, 3, 4, 5].map((stars) => <span className="sketch-star" key={stars}><SketchStar small fill={starFill(summary.average, stars)} /></span>)}
        </div>}
        <p className="text-xs text-muted-foreground">
          {summary ? `${summary.average.toFixed(1)} / 5 · ${summary.count} ${summary.count === 1 ? "vote" : "votes"} in total` : data.available ? "No community votes yet" : "Ratings temporarily unavailable"}
        </p>
      </div>
      <Button variant="ghost" size="sm" className="mt-1 text-xs underline underline-offset-4" aria-expanded={open} aria-controls={voteId}
        onClick={() => { setOpen(!open); setMine(0); setPreview(0); setMessage(""); }}>
        Rate this game
      </Button>
      {open && <div id={voteId} className={cn("mt-1 border-t border-border pt-2", compact && "flex flex-col items-center")}>
      <p className="mb-1 text-xs font-medium">Your rating</p>
      <div className="flex shrink-0 items-center" role="group" aria-label="Your rating">
        {[1, 2, 3, 4, 5].map((stars) => (
          <Button key={stars} variant="ghost" size="icon" disabled={busy}
            aria-label={`Give ${stars} ${stars === 1 ? "star" : "stars"}`} aria-pressed={mine === stars}
            title={`${stars} ${stars === 1 ? "star" : "stars"}`}
            onPointerEnter={() => setPreview(stars)} onPointerLeave={() => setPreview(0)}
            onFocus={() => setPreview(stars)} onBlur={() => setPreview(0)} onClick={() => void vote(stars)}
            className={cn("sketch-star h-11 w-11 rounded-full", starFill(score, stars) > 0 ? "text-rating-ink" : "text-muted-foreground")}>
            <SketchStar fill={starFill(score, stars)} />
          </Button>
        ))}
      </div>
      </div>}
      <p role="status" aria-live="polite" className={cn("text-xs text-muted-foreground", compact ? "w-full text-center" : "mt-1", message ? "" : "sr-only")}>
        {busy ? "Saving your stars…" : message}
      </p>
    </section>
  );
}