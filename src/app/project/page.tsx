import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { getAllProjects } from "@/lib/projects";

export const metadata = { title: "프로젝트 · 박서준" };

export default function ProjectListPage() {
  const projects = getAllProjects();

  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <Reveal>
        <h1 className="text-3xl font-semibold tracking-tight">프로젝트</h1>
      </Reveal>

      <Reveal delay={100} className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {projects.map((p) => (
          <Link
            key={p.slug}
            href={`/project/${p.slug}`}
            className="group block overflow-hidden rounded-xl border border-border bg-card transition hover:border-foreground/20"
          >
            <div className="flex aspect-[4/3] items-center justify-center bg-white p-10">
              {p.cover ? (
                <Image
                  src={p.cover}
                  alt={p.title}
                  width={400}
                  height={200}
                  className="max-h-full w-full object-contain transition duration-300 group-hover:scale-105"
                />
              ) : (
                <span className="text-sm text-muted">이미지 준비 중</span>
              )}
            </div>
            <div className="p-5">
              <p className="text-lg font-bold tracking-tight text-foreground">{p.title}</p>
              <p className="mt-1.5 text-sm leading-snug text-foreground/60">{p.tagline}</p>
            </div>
          </Link>
        ))}
      </Reveal>
    </div>
  );
}
