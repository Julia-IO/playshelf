import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { ratingSchema } from "@/lib/ratings-schema";
import { resources } from "@/data/resources";
import { displayedRating, starFill } from "@/lib/rating-display";

const voter = "de588580-bc67-4fa9-96bc-a7a082d19892";
describe("Game star ratings", () => {
  it("allows the maths game in the database voting rule alongside every current game", () => {
    const sql = readFileSync("drizzle/migrations/0001_allow_maths_game_ratings.sql", "utf8");
    const allowed = sql.match(/p_slug NOT IN \(([^)]+)\)/)?.[1].match(/'([^']+)'/g)?.map((slug) => slug.slice(1, -1)) ?? [];
    expect(allowed).toContain("mission-order-of-operations");
    expect(resources.every((game) => allowed.includes(game.slug))).toBe(true);
    expect(allowed).not.toContain("missing");
  });
  it("starts personal voting with five empty stars, independently of the community", () => {
    expect(displayedRating(0, 0)).toBe(0);
    expect([1, 2, 3, 4, 5].map((star) => starFill(displayedRating(0, 0), star))).toEqual([0, 0, 0, 0, 0]);
  });
  it("shows a visitor's own rating after voting", () => {
    expect(displayedRating(3, 0)).toBe(3);
  });
  it("previews a choice before showing the saved rating again", () => {
    expect(displayedRating(3, 2)).toBe(2);
    expect(displayedRating(3, 0)).toBe(3);
  });
  it("represents fractional community averages without rounding up", () => {
    expect([1, 2, 3, 4, 5].map((star) => starFill(4.5, star))).toEqual([1, 1, 1, 1, 0.5]);
  });
  it("accepts whole-star ratings from 1 to 5", () => {
    for (const stars of [1, 2, 3, 4, 5]) expect(ratingSchema.parse({ slug: "beat-lab", voter, stars }).stars).toBe(stars);
    for (const stars of [0, 6, 2.5]) expect(ratingSchema.safeParse({ slug: "beat-lab", voter, stars }).success).toBe(false);
  });
  it("supports every game and rejects unknown games", () => {
    for (const game of resources) expect(ratingSchema.safeParse({ slug: game.slug, voter, stars: 4 }).success).toBe(true);
    expect(ratingSchema.safeParse({ slug: "missing", voter, stars: 4 }).success).toBe(false);
  });
  it("requires a random browser identifier", () => {
    expect(ratingSchema.safeParse({ slug: "beat-lab", voter: "", stars: 5 }).success).toBe(false);
  });
});