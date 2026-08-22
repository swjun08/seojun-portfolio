import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/reveal";
import { RevealHtml } from "@/components/reveal-html";
import { EasysubMedia } from "@/components/project-media/easysub-media";
import { getAllProjects, getProject } from "@/lib/projects";

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

// ponytail: per-slug media map, single project today — revisit if this grows past a handful
const MEDIA: Record<string, React.ComponentType<{ serviceUrl?: string }>> = {
  easysub: EasysubMedia,
};

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug).catch(() => null);
  if (!project) notFound();

  const Media = MEDIA[slug];

  return (
    <div className="mx-auto max-w-2xl px-6 py-20">
      <Reveal>
        <Link href="/project" className="text-sm text-muted transition hover:text-foreground">
          ← 프로젝트
        </Link>
      </Reveal>

      {Media && (
        <div className="mt-8">
          <Media serviceUrl={project.serviceUrl} />
        </div>
      )}

      {project.contentHtml.trim().length > 0 && (
        <RevealHtml
          html={project.contentHtml}
          className="prose prose-neutral dark:prose-invert mt-16 max-w-none prose-p:leading-relaxed prose-img:mx-auto prose-img:max-w-[min(480px,100%)] prose-img:rounded-xl prose-img:shadow-lg"
        />
      )}
    </div>
  );
}
