import { describe, expect, it } from "vitest";
import { resources, resourcesFor, subjects } from "@/data/resources";

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
  it("stays in the menu with no games", () => {
    expect(subjects.map((s) => s.id)).toContain("ai-tech");
    expect(resourcesFor("ai-tech")).toEqual([]);
  });
});
