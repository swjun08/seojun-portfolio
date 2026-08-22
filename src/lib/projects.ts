import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const PROJECTS_DIR = path.join(process.cwd(), "content/project");

export type ProjectMeta = {
  slug: string;
  title: string;
  tagline: string;
  period: string;
  cover?: string;
};

function listSlugs(): string[] {
  if (!fs.existsSync(PROJECTS_DIR)) return [];
  return fs
    .readdirSync(PROJECTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getAllProjects(): ProjectMeta[] {
  return listSlugs().map((slug) => {
    const raw = fs.readFileSync(path.join(PROJECTS_DIR, `${slug}.md`), "utf8");
    const { data } = matter(raw);
    return {
      slug,
      title: data.title ?? slug,
      tagline: data.tagline ?? "",
      period: data.period ?? "",
      cover: data.cover ?? "",
    } as ProjectMeta;
  });
}

export async function getProject(slug: string) {
  const raw = fs.readFileSync(path.join(PROJECTS_DIR, `${slug}.md`), "utf8");
  const { data, content } = matter(raw);

  const processed = await remark().use(html, { sanitize: false }).process(content);

  return {
    slug,
    title: data.title ?? slug,
    tagline: data.tagline ?? "",
    period: data.period ?? "",
    team: data.team ?? "",
    role: data.role ?? "",
    stack: (data.stack as string[] | undefined) ?? [],
    achievements: data.achievements ?? "",
    serviceUrl: data.serviceUrl ?? "",
    cover: data.cover ?? "",
    contentHtml: processed.toString(),
  };
}
