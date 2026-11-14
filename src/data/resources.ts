import aiYouThumbnail from "@/assets/level-up-ai-and-you.jpg.asset.json";
import appsWorkThumbnail from "@/assets/level-up-how-apps-work.jpg.asset.json";
import catTagThumbnail from "@/assets/cat-tag-vs-robot-cats.jpg.asset.json";

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
    slug: "level-up-ai-and-you",
    name: "Level Up: AI & You",
    file: "/games/level-up-ai-and-you.html",
    thumb: aiYouThumbnail.url,
    subjects: ["ai-tech"],
    ages: "10+",
    dateAdded: "Nov 14, 2026",
    tags: ["AI", "Thinking", "Online safety"],
    description:
      "A guided presentation and game for an adult to lead, ideally with a group of kids playing in teams. Level up from AI rookie to scam-proof expert: spot what's real or fake, earn XP and learn to stay safe online.",
    color: "dot-blue",
  },
  {
    slug: "level-up-how-apps-work",
    name: "Level Up 2: How Apps Really Work",
    file: "/games/level-up-how-apps-work.html",
    thumb: appsWorkThumbnail.url,
    subjects: ["ai-tech"],
    ages: "10+",
    dateAdded: "Nov 14, 2026",
    tags: ["Apps", "Coding", "Technology"],
    description:
      "A guided presentation and game for an adult to lead, ideally with a group of kids playing in teams. Discover front end, back end, APIs and AI through a restaurant story, and learn how to talk to an AI that writes code for you.",
    color: "dot-yellow",
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
