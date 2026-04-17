import { getCollection } from "astro:content";
import { toLegacyPath } from "./legacy";

export interface FeaturedItem {
  href: string;
  title: string;
  description: string;
  status: string;
  tech: string[];
}

const curatedProjectIds = ["minsop", "huaikan", "qingtongxia"];
const curatedBlogMeta: Record<string, Omit<FeaturedItem, "href" | "title">> = {
  "2024-11-20-lerobot": {
    description: "相对社区主线，Lerobot 的贡献主要落在 FR3 实机闭环、Hikrobot 相机、触觉、回放和 MuJoCo 仿真。",
    status: "开源项目",
    tech: ["FR3", "Hikrobot", "ACT", "Tactile", "MuJoCo"]
  },
  "2024-11-20-zeroth01": {
    description: "面向低成本人形机器人的开源实践，覆盖硬件搭建、仿真、强化学习与部署验证。",
    status: "开源项目",
    tech: ["MilkV", "STS3215", "3D Print", "Reinforcement Learning", "Isaac Gym"]
  }
};

export async function getFeaturedItems() {
  const projects = await getCollection("projects");
  const blogEntries = await getCollection("blog");

  const projectItems: FeaturedItem[] = curatedProjectIds
    .map((id) => projects.find((entry) => entry.id === id))
    .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry))
    .map((project) => ({
      href: `/projects/${project.id}/`,
      title: project.data.title,
      description: project.data.description,
      status: project.data.status,
      tech: project.data.tech
    }));

  const blogItems: FeaturedItem[] = Object.entries(curatedBlogMeta)
    .map(([id, meta]) => {
      const entry = blogEntries.find((item) => item.id === id);
      if (!entry) return undefined;
      return {
        href: toLegacyPath(entry.id, entry.data.date),
        title: entry.data.title,
        description: meta.description,
        status: meta.status,
        tech: meta.tech
      };
    })
    .filter((entry): entry is FeaturedItem => Boolean(entry));

  return [...projectItems, ...blogItems];
}
