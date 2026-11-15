export function displayedRating(average: number | undefined, mine: number, preview: number) {
  return preview || mine || average || 0;
}

export function starFill(score: number, stars: number) {
  return Math.max(0, Math.min(1, score - stars + 1));
}