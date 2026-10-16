import { getCollection } from "astro:content";
import { toLegacyPath } from "./legacy";

export interface FeaturedItem {
  href: string;
  title: string;
  description: string;
  status: string;
  tech: string[];
}

export interface ProjectListItem extends FeaturedItem {
  updatedAt: Date;
}

type ProjectEntry = Awaited<ReturnType<typeof getCollection<"projects">>>[number];
type BlogEntry = Awaited<ReturnType<typeof getCollection<"blog">>>[number];

const curatedProjectIds = [
  "ego-umi-data-collection",
  "umi-trajectory-gt",
  "fr3-workstation-il-closed-loop",
  "minsop",
  "act-pi05-thor-deployment"
];
const curatedBlogMeta: Record<string, Omit<FeaturedItem, "href" | "title">> = {
  "2024-11-20-lerobot": {
    description: "基于 LeRobot 的系统集成与扩展，覆盖多模态采集、FR3 实机闭环、标定与回放诊断。",
    status: "基于开源框架的工程实践",
    tech: ["LeRobot", "FR3", "Calibration", "Data Quality", "MuJoCo"]
  },
  "2024-11-20-zeroth01": {
    description: "面向低成本人形机器人的开源实践，覆盖硬件搭建、仿真、强化学习与部署验证。",
    status: "开源项目",
    tech: ["MilkV", "STS3215", "3D Print", "Reinforcement Learning", "Isaac Gym"]
  }
};

const toProjectItem = (project: ProjectEntry, blogEntries: BlogEntry[]): ProjectListItem => {
  const relatedPost = project.data.relatedPostSlug
    ? blogEntries.find((entry) => entry.id === project.data.relatedPostSlug)
    : undefined;

  return {
    href: relatedPost ? toLegacyPath(relatedPost.id, relatedPost.data.date) : `/projects/${project.id}/`,
    title: project.data.title,
    description: project.data.description,
    status: project.data.status,
    tech: project.data.tech,
    updatedAt: project.data.updatedAt ?? project.data.publishedAt
  };
};

const toBlogItem = (entry: BlogEntry, meta: Omit<FeaturedItem, "href" | "title">): ProjectListItem => ({
  href: toLegacyPath(entry.id, entry.data.date),
  title: entry.data.title,
  description: meta.description,
  status: meta.status,
  tech: meta.tech,
  updatedAt: entry.data.date
});

export async function getFeaturedProjectRelatedPostIds(limit = 3) {
  const projects = await getCollection("projects");

  return new Set(
    curatedProjectIds
      .slice(0, limit)
      .map((id) => projects.find((entry) => entry.id === id)?.data.relatedPostSlug)
      .filter((slug): slug is string => Boolean(slug))
  );
}

export async function getFeaturedItems(): Promise<FeaturedItem[]> {
  const projects = await getCollection("projects");
  const blogEntries = await getCollection("blog");

  const projectItems = curatedProjectIds
    .map((id) => projects.find((entry) => entry.id === id))
    .filter((entry): entry is ProjectEntry => Boolean(entry))
    .map((project) => toProjectItem(project, blogEntries));

  const blogItems = Object.entries(curatedBlogMeta)
    .map(([id, meta]) => {
      const entry = blogEntries.find((item) => item.id === id);
      return entry ? toBlogItem(entry, meta) : undefined;
    })
    .filter((entry): entry is ProjectListItem => Boolean(entry));

  return [...projectItems, ...blogItems];
}

/** All project work, newest last-updated first. */
export async function getAllProjectItems(): Promise<ProjectListItem[]> {
  const projects = await getCollection("projects");
  const blogEntries = await getCollection("blog");

  const projectItems = projects.map((project) => toProjectItem(project, blogEntries));

  const blogItems = Object.entries(curatedBlogMeta)
    .map(([id, meta]) => {
      const entry = blogEntries.find((item) => item.id === id);
      return entry ? toBlogItem(entry, meta) : undefined;
    })
    .filter((entry): entry is ProjectListItem => Boolean(entry));

  return [...projectItems, ...blogItems].sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
}
