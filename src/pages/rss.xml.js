import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { site } from "../data/site";
import { toLegacyPath } from "../utils/legacy";

export async function GET(context) {
  const posts = (await getCollection("blog")).sort((a, b) => b.data.date - a.data.date);

  return rss({
    title: site.title,
    description: site.description,
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.subtitle ?? post.data.description ?? "",
      link: toLegacyPath(post.id, post.data.date)
    }))
  });
}
