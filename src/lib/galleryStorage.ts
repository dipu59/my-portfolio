import fs from "fs/promises";
import path from "path";

export interface PhotoData {
  likes: number;
  likedBy: string[];
}

export type GalleryDataMap = Record<string, PhotoData>;

const DATA_FILE_PATH = path.join(process.cwd(), "data", "gallery-data.json");

let inMemoryCache: GalleryDataMap | null = null;

const DEFAULT_DATA: GalleryDataMap = {
  "photo-001": { likes: 42, likedBy: [] },
  "photo-002": { likes: 38, likedBy: [] },
  "photo-003": { likes: 29, likedBy: [] },
  "photo-004": { likes: 56, likedBy: [] },
  "photo-005": { likes: 47, likedBy: [] },
  "photo-006": { likes: 64, likedBy: [] },
  "photo-007": { likes: 35, likedBy: [] },
  "photo-008": { likes: 51, likedBy: [] },
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
    console.error("Warning: could not write gallery-data.json to disk:", error);
  }
}
