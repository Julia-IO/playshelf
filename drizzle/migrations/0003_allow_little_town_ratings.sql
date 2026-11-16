CREATE OR REPLACE FUNCTION public.rate_game(p_slug text, p_voter uuid, p_stars integer)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
 IF p_voter IS NULL OR p_slug IS NULL OR p_slug NOT IN ('beat-lab','cat-tag-vs-robot-cats','dot-band','mission-order-of-operations','little-town') OR p_stars IS NULL OR p_stars < 1 OR p_stars > 5 THEN
  RAISE EXCEPTION 'Invalid rating';
 END IF;
 INSERT INTO public.game_ratings(game_slug,voter_id,stars) VALUES(p_slug,p_voter,p_stars)
 ON CONFLICT(game_slug,voter_id) DO UPDATE SET stars=excluded.stars, updated_at=now()
 WHERE game_ratings.updated_at < now() - interval '2 seconds';
 IF NOT FOUND THEN RAISE EXCEPTION 'Please wait a moment before changing your rating'; END IF;
END;
$function$;

ALTER TABLE public.game_ratings DROP CONSTRAINT game_ratings_game_slug_check;
ALTER TABLE public.game_ratings ADD CONSTRAINT game_ratings_game_slug_check CHECK (game_slug IN ('beat-lab','cat-tag-vs-robot-cats','dot-band','mission-order-of-operations','little-town'));