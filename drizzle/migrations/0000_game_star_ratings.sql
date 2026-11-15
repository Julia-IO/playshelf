CREATE TABLE public.game_ratings (
 game_slug text NOT NULL CHECK (game_slug IN ('beat-lab','cat-tag-vs-robot-cats','dot-band')),
 voter_id uuid NOT NULL,
 stars smallint NOT NULL CHECK (stars BETWEEN 1 AND 5),
 updated_at timestamptz NOT NULL DEFAULT now(),
 PRIMARY KEY (game_slug,voter_id)
);
GRANT ALL ON public.game_ratings TO service_role;
ALTER TABLE public.game_ratings ENABLE ROW LEVEL SECURITY;
CREATE FUNCTION public.game_rating_summary() RETURNS TABLE(slug text, average double precision, count bigint)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$ SELECT game_slug, avg(stars)::double precision, count(*) FROM public.game_ratings GROUP BY game_slug $$;
REVOKE ALL ON FUNCTION public.game_rating_summary() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.game_rating_summary() TO anon, authenticated, service_role;
CREATE FUNCTION public.rate_game(p_slug text, p_voter uuid, p_stars integer) RETURNS void
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
BEGIN
 IF p_voter IS NULL OR p_slug IS NULL OR p_slug NOT IN ('beat-lab','cat-tag-vs-robot-cats','dot-band') OR p_stars IS NULL OR p_stars < 1 OR p_stars > 5 THEN
  RAISE EXCEPTION 'Invalid rating';
 END IF;
 INSERT INTO public.game_ratings(game_slug,voter_id,stars) VALUES(p_slug,p_voter,p_stars)
 ON CONFLICT(game_slug,voter_id) DO UPDATE SET stars=excluded.stars, updated_at=now()
 WHERE game_ratings.updated_at < now() - interval '2 seconds';
 IF NOT FOUND THEN RAISE EXCEPTION 'Please wait a moment before changing your rating'; END IF;
END;
$$;
REVOKE ALL ON FUNCTION public.rate_game(text,uuid,integer) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.rate_game(text,uuid,integer) TO anon, authenticated, service_role;
COMMENT ON TABLE public.game_ratings IS 'Anonymous browser capability UUIDs; no public row access. Only aggregates and bounded vote RPCs are exposed. Clearing browser storage can allow repeat votes; this is not a verified-person voting system.';