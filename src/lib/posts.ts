import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const POSTS_DIR = path.join(process.cwd(), "content/blog");

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  summary?: string;
  category?: string;
  cover?: string;
};

function listSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getAllPosts(): PostMeta[] {
  return listSlugs()
    .map((slug) => {
      const raw = fs.readFileSync(path.join(POSTS_DIR, `${slug}.md`), "utf8");
      const { data } = matter(raw);
      return {
        slug,
        title: data.title ?? slug,
        date: data.date ?? "",
        summary: data.summary ?? "",
        category: data.category ?? "",
        cover: data.cover ?? "",
      } as PostMeta;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

function slugify(text: string) {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/(^-|-$)/g, "");
}

export async function getPost(slug: string) {
  const raw = fs.readFileSync(path.join(POSTS_DIR, `${slug}.md`), "utf8");
  const { data, content } = matter(raw);

  const toc = [...content.matchAll(/^##\s+(.+)$/gm)].map((m) => ({
    text: m[1].trim(),
    id: slugify(m[1].trim()),
  }));

  const processed = await remark().use(html, { sanitize: false }).process(content);
  let contentHtml = processed.toString();
  let i = 0;
  contentHtml = contentHtml.replace(/<h2>(.*?)<\/h2>/g, () => {
    const t = toc[i++];
    return `<h2 id="${t.id}">${t.text}</h2>`;
  });

  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? "",
    category: data.category ?? "",
    contentHtml,
    toc,
  };
}
