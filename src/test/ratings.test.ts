import { describe, expect, it } from "vitest";
import { ratingSchema } from "@/lib/ratings-schema";
import { resources } from "@/data/resources";
import { displayedRating, starFill } from "@/lib/rating-display";

const voter = "de588580-bc67-4fa9-96bc-a7a082d19892";
describe("Game star ratings", () => {
  it("shows the community average before a visitor votes", () => {
    expect(displayedRating(5, 0, 0)).toBe(5);
    expect([1, 2, 3, 4, 5].map((star) => starFill(displayedRating(5, 0, 0), star))).toEqual([1, 1, 1, 1, 1]);
  });
  it("shows a visitor's own rating after voting", () => {
    expect(displayedRating(5, 3, 0)).toBe(3);
  });
  it("previews a choice before showing the saved rating again", () => {
    expect(displayedRating(5, 3, 2)).toBe(2);
    expect(displayedRating(5, 3, 0)).toBe(3);
  });
  it("represents fractional community averages without rounding up", () => {
    expect([1, 2, 3, 4, 5].map((star) => starFill(4.5, star))).toEqual([1, 1, 1, 1, 0.5]);
    expect(displayedRating(undefined, 0, 0)).toBe(0);
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