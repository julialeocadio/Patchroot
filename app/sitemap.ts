import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://patchroot.com";

  const locales = ["en", "pt", "es"];

  const pages = [
    "",
    "/services",
    "/about",
    "/contact",
    "/blog",
  ];

  return locales.flatMap((locale) =>
    pages.map((page) => ({
      url: `${baseUrl}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: page === "" ? 1 : 0.8,
    }))
  );
}