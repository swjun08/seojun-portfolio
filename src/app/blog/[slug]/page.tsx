import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/reveal";
import { RevealHtml } from "@/components/reveal-html";
import { ImageFill } from "@/components/image-fill";
import { getAllPosts, getPost } from "@/lib/posts";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug).catch(() => null);
  if (!post) notFound();

  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <Reveal>
        <Link href="/blog" className="text-sm text-muted transition hover:text-foreground">
          ← 블로그
        </Link>
      </Reveal>

      <div className="mt-8 lg:grid lg:grid-cols-[11rem_1fr] lg:gap-12">
        {post.toc.length > 0 && (
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <p className="text-xs font-medium text-muted">Contents</p>
              <ul className="mt-3 space-y-2 border-l border-border pl-3 text-sm">
                {post.toc.map((t) => (
                  <li key={t.id}>
                    <a href={`#${t.id}`} className="text-muted transition hover:text-foreground">
                      {t.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <div className="max-w-2xl">
          <Reveal delay={80}>
            {post.category && (
              <p className="text-xs font-medium tracking-wide text-accent">{post.category}</p>
            )}
            <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">{post.title}</h1>
            <div className="mt-4 flex items-center gap-2">
              <div className="relative h-7 w-7 overflow-hidden rounded-full">
                <ImageFill src="/images/profile.jpg" alt="박서준" objectPosition="center 20%" />
              </div>
              <p className="text-sm text-muted">
                박서준 · <span>{post.date}</span>
              </p>
            </div>
          </Reveal>

          <RevealHtml
            html={post.contentHtml}
            className="prose prose-neutral dark:prose-invert mt-10 max-w-none prose-p:leading-relaxed prose-img:mx-auto prose-img:max-w-[min(480px,100%)] prose-img:rounded-xl prose-img:shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}
