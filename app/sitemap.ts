import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { projects } from "@/data/projects";

const BASE = "https://shreyaspangal.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts().map((post) => ({
    url: `${BASE}/blog/${post.slug}`,
    lastModified: new Date(post.date),
  }));

  const projectPages = projects.map((project) => ({
    url: `${BASE}/projects/${project.slug}`,
    lastModified: new Date(),
  }));

  return [{ url: BASE, lastModified: new Date() }, ...projectPages, ...posts];
}
