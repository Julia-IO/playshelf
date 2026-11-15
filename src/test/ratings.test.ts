import { describe, expect, it } from "vitest";
import { ratingSchema } from "@/lib/ratings-schema";
import { resources } from "@/data/resources";

const voter = "de588580-bc67-4fa9-96bc-a7a082d19892";
describe("Game star ratings", () => {
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