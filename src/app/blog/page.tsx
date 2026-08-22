import { Reveal } from "@/components/reveal";
import { BlogGrid } from "@/components/blog-grid";
import { getAllPosts } from "@/lib/posts";

export const metadata = { title: "블로그 · 박서준" };

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <Reveal>
        <h1 className="text-3xl font-semibold tracking-tight">블로그</h1>
      </Reveal>

      {posts.length === 0 ? (
        <p className="mt-14 text-muted">아직 글이 없습니다. 곧 첫 글을 올릴게요.</p>
      ) : (
        <Reveal delay={100}>
          <BlogGrid posts={posts} />
        </Reveal>
      )}
    </div>
  );
}
