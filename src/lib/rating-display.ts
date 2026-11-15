export function displayedRating(mine: number, preview: number) {
  return preview || mine || 0;
}

export function starFill(score: number, stars: number) {
  return Math.max(0, Math.min(1, score - stars + 1));
}