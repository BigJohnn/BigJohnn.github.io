import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,markdown,mdx}", base: "./src/content/blog" }),
  schema: z
    .object({
      layout: z.string().optional(),
      title: z.string(),
      subtitle: z.string().optional(),
      date: z.coerce.date(),
      author: z.string().optional(),
      tags: z.array(z.string()).default([]),
      "header-img": z.string().optional(),
      description: z.string().optional(),
      featured: z.boolean().optional(),
      draft: z.boolean().optional()
    })
    .passthrough()
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    featured: z.boolean().default(false),
    status: z.string(),
    tech: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
    repo: z.string().url().optional(),
    demo: z.string().url().optional(),
    relatedPostSlug: z.string().optional(),
    order: z.number().int().default(999)
  })
});

const pages = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/pages" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional()
  })
});

export const collections = { blog, projects, pages };
