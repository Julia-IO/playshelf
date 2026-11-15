import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { queryOptions } from "@tanstack/react-query";
import type { Database } from "@/integrations/supabase/types";
import type { RatingSummary } from "./ratings-schema";

export const getRatings = createServerFn({ method: "GET" }).handler(async (): Promise<{ ratings: RatingSummary[]; available: boolean }> => {
  try {
    const url = process.env["SUPABASE_URL"];
    const key = process.env["SUPABASE_PUBLISHABLE_KEY"];
    if (!url || !key) return { ratings: [], available: false };
    const client = createClient<Database>(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: { fetch: (input, init) => {
        const headers = new Headers(init?.headers);
        if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) headers.delete("Authorization");
        headers.set("apikey", key);
        return fetch(input, { ...init, headers });
      } },
    });
    const { data, error } = await client.rpc("game_rating_summary");
    if (error) return { ratings: [], available: false };
    return { ratings: data ?? [], available: true };
  } catch {
    return { ratings: [], available: false };
  }
});

export const ratingsQueryOptions = queryOptions({
  queryKey: ["game-ratings"],
  queryFn: () => getRatings(),
  staleTime: 15_000,
});