"use client";

import { useState } from "react";
import Link from "next/link";
import { ImageFill } from "@/components/image-fill";
import type { PostMeta } from "@/lib/posts";

export function BlogGrid({ posts }: { posts: PostMeta[] }) {
  const categories = Array.from(new Set(posts.map((p) => p.category).filter(Boolean))) as string[];
  const [active, setActive] = useState<string | null>(null);
  const filtered = active ? posts.filter((p) => p.category === active) : posts;

  return (
    <div>
      {categories.length > 1 && (
        <div className="mt-8 flex flex-wrap gap-2">
          <button
            onClick={() => setActive(null)}
            className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
              active === null ? "bg-foreground text-background" : "bg-card text-muted hover:text-foreground"
            }`}
          >
            전체
          </button>
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
                active === c ? "bg-foreground text-background" : "bg-card text-muted hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      )}

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {filtered.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group relative block aspect-[4/5] overflow-hidden rounded-xl">
            <ImageFill
              src={post.cover || undefined}
              alt={post.title}
              placeholderLabel="사진"
              sizes="(min-width: 640px) 33vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black from-5% via-black/70 via-45% to-transparent to-90% transition-opacity group-hover:from-black" />
            <div className="absolute inset-x-0 bottom-10 px-4">
              <p className="text-lg font-black leading-tight tracking-tight text-white sm:text-xl">
                {post.title}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
