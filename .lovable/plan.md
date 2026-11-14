# Add "AI & Tech" category with the two Level Up games

## Category name
**AI & Tech** — short, clear for kids and parents, and leaves room for future coding/computers games. (Alternatives if you prefer: "Digital World", "Tech Lab".)

## What you'll see
- New **AI & Tech** folder in the left menu (placed after Biology, before "By kids, for kids").
- Two games inside, both labelled **10+**, dated Nov 14, 2026:
  - **Level Up: AI & You** — tags: AI, Thinking, Online safety.
  - **Level Up 2: How Apps Really Work** — tags: Apps, Coding, Technology.
- Each gets a preview picture taken from its start screen, a short description written from the game content, and plays at its own page with Share working.

## Technical details
- Copy both HTML files into `public/games/` (`level-up-ai-and-you.html`, `level-up-how-apps-work.html`).
- Screenshot each start screen and store as asset thumbnails.
- Add subject `{ id: "ai-tech", name: "AI & Tech" }` and two resource entries in `src/data/resources.ts`.
- Add tests: both games are in `ai-tech` and have ages `10+`. Verify in browser that both play.
