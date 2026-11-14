import { describe, expect, it } from "vitest";
import { resources, resourcesFor } from "@/data/resources";

describe("Cat Tag vs Robot Cats", () => {
  it("belongs to By kids, for kids", () => {
    expect(resourcesFor("by-kids").map((game) => game.slug)).toContain("cat-tag-vs-robot-cats");
    expect(resources.find((game) => game.slug === "cat-tag-vs-robot-cats")?.subjects).toEqual(["by-kids"]);
  });

  it("has the requested 4+ age label", () => {
    expect(resources.find((game) => game.slug === "cat-tag-vs-robot-cats")?.ages).toBe("4+");
  });
});
describe("AI & Tech", () => {
  const slugs = ["level-up-ai-and-you", "level-up-how-apps-work"];
  it("contains both Level Up games", () => {
    expect(resourcesFor("ai-tech").map((g) => g.slug)).toEqual(expect.arrayContaining(slugs));
  });
  it("labels both games 10+", () => {
    for (const s of slugs) expect(resources.find((g) => g.slug === s)?.ages).toBe("10+");
  });
});
