import { z } from "zod";
import { resources } from "@/data/resources";

export const ratingSchema = z.object({
  slug: z.string().refine((slug) => resources.some((game) => game.slug === slug), "Unknown game"),
  voter: z.string().uuid(),
  stars: z.number().int().min(1).max(5),
});

export type RatingSummary = { slug: string; average: number; count: number };