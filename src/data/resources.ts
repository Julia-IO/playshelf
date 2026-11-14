export type Subject = { id: string; name: string; emoji: string };
export type Resource = {
  slug: string;
  name: string;
  file: string; // path under /public
  thumb: string;
  subjects: string[];
  ages: string;
  dateAdded: string;
  tags: string[];
  description: string;
  color: string; // token name for icon chip
};

export const subjects: Subject[] = [
  { id: "maths", name: "Maths", emoji: "🔢" },
  { id: "creativity", name: "Creativity", emoji: "🎨" },
  { id: "music", name: "Music", emoji: "🎵" },
  { id: "english", name: "English", emoji: "📖" },
  { id: "spanish", name: "Spanish", emoji: "🗣️" },
  { id: "physics", name: "Physics", emoji: "🧲" },
  { id: "biology", name: "Biology", emoji: "🌱" },
  { id: "by-kids", name: "By kids, for kids", emoji: "🧸" },
];

// To add a game: drop the .html file in public/games/ and add an entry here.
export const resources: Resource[] = [
  {
    slug: "cat-tag-vs-robot-cats",
    name: "Cat Tag vs Robot Cats",
    file: "/games/cat-tag-vs-robot-cats.html",
    thumb: "/games/cat-tag-vs-robot-cats.jpg",
    subjects: ["by-kids"],
    ages: "4+",
    dateAdded: "Nov 14, 2026",
    tags: ["Cats", "Tag", "Free play"],
    description:
      "Play as an orange cat in a game of tag with robot cats. Run away, chase and tag the robots in 60-second rounds.",
    color: "dot-yellow",
  },
  {
    slug: "dot-band",
    name: "Dot Band",
    file: "/games/dot-band.html",
    thumb: "/games/dot-band.jpg",
    subjects: ["music", "creativity"],
    ages: "3+",
    dateAdded: "Nov 14, 2026",
    tags: ["Paint", "Mix", "Rhythm", "Sound"],
    description:
      "Paint, mix and play with colourful dots that turn into music. Draw melodies, layer sounds, echo patterns and build your own beat.",
    color: "dot-red",
  },
];

export const resourcesFor = (subjectId: string) =>
  resources.filter((r) => r.subjects.includes(subjectId));
