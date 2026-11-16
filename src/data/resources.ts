import catTagThumbnail from "@/assets/cat-tag-vs-robot-cats.jpg.asset.json";
import beatLabThumbnail from "@/assets/beat-lab-preview.png.asset.json";
import operationsThumbnail from "@/assets/order-of-operations-cover.png.asset.json";

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
  { id: "ai-tech", name: "AI & Tech", emoji: "🤖" },
  { id: "biology", name: "Biology", emoji: "🌱" },
  { id: "by-kids", name: "By kids, for kids", emoji: "🧸" },
  { id: "creativity", name: "Creativity", emoji: "🎨" },
  { id: "english", name: "English", emoji: "📖" },
  { id: "maths", name: "Maths", emoji: "🔢" },
  { id: "music", name: "Music", emoji: "🎵" },
  { id: "physics", name: "Physics", emoji: "🧲" },
  { id: "spanish", name: "Spanish", emoji: "🗣️" },
];

// To add a game: drop the .html file in public/games/ and add an entry here.
export const resources: Resource[] = [
  {
    slug: "splat-art-studio",
    name: "Splat! Art Studio",
    file: "/games/splat-art-studio.html",
    thumb: "/games/splat-art-studio.jpg",
    subjects: ["creativity"],
    ages: "7+",
    dateAdded: "Nov 16, 2026",
    tags: ["Painting", "Art history", "Famous artists", "English & Spanish"],
    description:
      "Visit the studios of great artists with Splat the ink blot. Hear their stories, then paint like cave painters, Seurat, Van Gogh, Mondrian and Kandinsky, hang your work in your own book and guess who painted it. Playable in English and Spanish.",
    color: "dot-blue",
  },
  {
    slug: "little-town",
    name: "Little Town",
    file: "/games/little-town.html",
    thumb: "/games/little-town.jpg",
    subjects: ["creativity"],
    ages: "3+",
    dateAdded: "Nov 16, 2026",
    tags: ["Town", "Animals", "Vehicles", "Free play"],
    description:
      "Explore a little picture-book town that comes alive when you tap. Drag the animals, people and vehicles around, ring the school bell, switch day to night and find what happens around every corner.",
    color: "dot-yellow",
  },
  {
    slug: "mission-order-of-operations",
    name: "Mission: Order of Operations",
    file: "/games/mission-order-of-operations.html",
    thumb: operationsThumbnail.url,
    subjects: ["maths"],
    ages: "8+",
    dateAdded: "Nov 15, 2026",
    tags: ["Arithmetic", "Order of operations", "Brackets"],
    description:
      "Solve number puzzles in the right order and earn stars. Explore three levels of addition, subtraction, multiplication, division and brackets, with step-by-step hints and extra practice.",
    color: "dot-yellow",
  },
  {
    slug: "beat-lab",
    name: "Beat Lab",
    file: "/games/beat-lab/index.html",
    thumb: beatLabThumbnail.url,
    subjects: ["music"],
    ages: "8+",
    dateAdded: "Nov 15, 2026",
    tags: ["Beats", "Instruments", "Recording", "Mixing"],
    description:
      "Build your own song with drum beats, bass lines, melodies and your voice. Explore instruments, arrange tracks, mix sounds and complete musical missions.",
    color: "dot-blue",
  },
  {
    slug: "cat-tag-vs-robot-cats",
    name: "Cat Tag vs Robot Cats",
    file: "/games/cat-tag-vs-robot-cats.html",
    thumb: catTagThumbnail.url,
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
