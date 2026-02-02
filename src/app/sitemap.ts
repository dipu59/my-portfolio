import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://dipubiswas.in",
      lastModified: new Date(),
    },
    {
      url: "https://dipubiswas.in/#works",
      lastModified: new Date(),
    },
    {
      url: "https://dipubiswas.in/#skill",
      lastModified: new Date(),
    },
    {
      url: "https://dipubiswas.in/#contact",
      lastModified: new Date(),
    },
  ];
}
