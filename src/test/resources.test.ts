import { describe, expect, it } from "vitest";
import { resources, resourcesFor, subjects } from "@/data/resources";

describe("Mission: Order of Operations", () => {
  it("belongs to Maths", () => {
    expect(resourcesFor("maths").map((game) => game.slug)).toContain("mission-order-of-operations");
    expect(resources.find((game) => game.slug === "mission-order-of-operations")?.subjects).toEqual(["maths"]);
  });

  it("has the requested 8+ age label", () => {
    expect(resources.find((game) => game.slug === "mission-order-of-operations")?.ages).toBe("8+");
  });
});

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
describe("Beat Lab", () => {
  it("belongs to Music", () => {
    expect(resourcesFor("music").map((game) => game.slug)).toContain("beat-lab");
    expect(resources.find((game) => game.slug === "beat-lab")?.subjects).toEqual(["music"]);
  });

  it("has the requested 8+ age label", () => {
    expect(resources.find((game) => game.slug === "beat-lab")?.ages).toBe("8+");
  });
});
describe("Little Town", () => {
  it("belongs to Creativity", () => {
    expect(resourcesFor("creativity").map((game) => game.slug)).toContain("little-town");
    expect(resources.find((game) => game.slug === "little-town")?.subjects).toEqual(["creativity"]);
  });

  it("has the requested 3+ age label", () => {
    expect(resources.find((game) => game.slug === "little-town")?.ages).toBe("3+");
  });
});
describe("Splat! Art Studio", () => {
  it("belongs to Creativity", () => {
    expect(resourcesFor("creativity").map((game) => game.slug)).toContain("splat-art-studio");
    expect(resources.find((game) => game.slug === "splat-art-studio")?.subjects).toEqual(["creativity"]);
  });

  it("has the requested 7+ age label", () => {
    expect(resources.find((game) => game.slug === "splat-art-studio")?.ages).toBe("7+");
  });
});
