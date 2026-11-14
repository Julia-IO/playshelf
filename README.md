# Playshelf

Playshelf is a collection of games and educational resources by Julia Díez, freely available for kids, families, and anyone who wants to learn through play. Resources run directly in the browser and are mostly built in HTML.

**Production website:** [playshelf.org](https://playshelf.org)

## Explore the shelf

Browse resources by subject: Maths, Creativity, Music, English, Spanish, Physics, and Biology. The **By kids, for kids** category is for games created by children, focused on free play.

Choose a subject, select a game, and open it to play. Resources can belong to more than one subject, and the Share button lets you share a game link.

The first resource is **[Dot Band](https://playshelf.org/play/dot-band)**, a Music and Creativity game where colourful dots become melodies, rhythms, and layered sounds.

## Adding a resource

1. Place the standalone HTML game in `public/games/`, along with a thumbnail image.
2. Add an entry in `src/data/resources.ts` with its name, slug, file and thumbnail paths, subjects, and other resource details.
3. The game appears under its assigned subjects and opens at `/play/<slug>`.

Games are displayed in an iframe, so each resource can keep its own interface and interactions.

## Contact

Questions or feedback: [hello@juliadiezlopez.com](mailto:hello@juliadiezlopez.com).

## Build with Lovable

This project was built with [Lovable](https://lovable.dev).

When Git sync is connected, changes made in Lovable sync to the repository, and changes pushed to the configured synced branch return to Lovable.

## Development

The site uses React, TanStack Start, and Tailwind CSS. To work locally, install [Bun](https://bun.sh), then run:

```sh
git clone <this-repository-url>
cd <repository-name>
bun install
bun run dev
```
