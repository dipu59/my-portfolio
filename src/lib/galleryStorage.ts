import fs from "fs/promises";
import path from "path";

export interface CommentItem {
  id: string;
  author: string;
  text: string;
  createdAt: string;
}

export interface PhotoData {
  likes: number;
  likedBy: string[];
  comments: CommentItem[];
}

export type GalleryDataMap = Record<string, PhotoData>;

const DATA_FILE_PATH = path.join(process.cwd(), "data", "gallery-data.json");

// In-memory fallback in case filesystem is restricted
let inMemoryCache: GalleryDataMap | null = null;

const DEFAULT_DATA: GalleryDataMap = {
  "photo-001": {
    likes: 42,
    likedBy: [],
    comments: [
      {
        id: "c101",
        author: "rahul_dev",
        text: "Great workspace vibe! Keep crushing it 🚀",
        createdAt: "2024-11-10T14:22:00.000Z",
      },
      {
        id: "c102",
        author: "tech_priya",
        text: "Incredible focus and dedication. Inspiring!",
        createdAt: "2024-11-11T09:15:00.000Z",
      },
    ],
  },
  "photo-002": {
    likes: 38,
    likedBy: [],
    comments: [
      {
        id: "c201",
        author: "sarah.codes",
        text: "Super clean portrait. Love the aesthetic!",
        createdAt: "2024-11-09T18:40:00.000Z",
      },
    ],
  },
  "photo-003": {
    likes: 29,
    likedBy: [],
    comments: [
      {
        id: "c301",
        author: "vikram_ui",
        text: "Sharp look brother! ⚡",
        createdAt: "2024-11-08T11:05:00.000Z",
      },
    ],
  },
  "photo-004": {
    likes: 56,
    likedBy: [],
    comments: [
      {
        id: "c401",
        author: "marcus_web",
        text: "Chill-Bay real-time rooms are smooth as butter. Outstanding job!",
        createdAt: "2024-11-11T16:30:00.000Z",
      },
      {
        id: "c402",
        author: "dev_ananya",
        text: "Socket.io implementation here is next level 👌",
        createdAt: "2024-11-12T08:12:00.000Z",
      },
    ],
  },
  "photo-005": {
    likes: 47,
    likedBy: [],
    comments: [
      {
        id: "c501",
        author: "kevin_fintech",
        text: "Stripe checkout flow feels seamless. Great UI work!",
        createdAt: "2024-11-07T20:10:00.000Z",
      },
    ],
  },
  "photo-006": {
    likes: 64,
    likedBy: [],
    comments: [
      {
        id: "c601",
        author: "elena_design",
        text: "Those motion transitions are unreal! 60 FPS perfection ✨",
        createdAt: "2024-11-10T19:45:00.000Z",
      },
      {
        id: "c602",
        author: "cyber_sam",
        text: "The dark aesthetic is top tier.",
        createdAt: "2024-11-11T14:02:00.000Z",
      },
    ],
  },
  "photo-007": {
    likes: 35,
    likedBy: [],
    comments: [
      {
        id: "c701",
        author: "arun_gourmet",
        text: "Really useful product for restaurant management!",
        createdAt: "2024-11-09T10:18:00.000Z",
      },
    ],
  },
  "photo-008": {
    likes: 51,
    likedBy: [],
    comments: [
      {
        id: "c801",
        author: "frontend_ninja",
        text: "Keep inspiring with your work Dipu! 🎨",
        createdAt: "2024-11-12T12:00:00.000Z",
      },
    ],
  },
};

export async function getGalleryData(): Promise<GalleryDataMap> {
  if (inMemoryCache !== null) {
    return inMemoryCache;
  }
  try {
    const raw = await fs.readFile(DATA_FILE_PATH, "utf-8");
    const parsed = JSON.parse(raw);
    const merged: GalleryDataMap = { ...DEFAULT_DATA, ...parsed };
    inMemoryCache = merged;
    return merged;
  } catch {
    const fallback: GalleryDataMap = { ...DEFAULT_DATA };
    inMemoryCache = fallback;
    return fallback;
  }
}

export async function saveGalleryData(data: GalleryDataMap): Promise<void> {
  inMemoryCache = data;
  try {
    await fs.mkdir(path.dirname(DATA_FILE_PATH), { recursive: true });
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error("Warning: could not write gallery-data.json to disk, using in-memory cache:", error);
  }
}
