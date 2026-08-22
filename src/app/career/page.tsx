import { Reveal } from "@/components/reveal";
import { ExpandableRow } from "@/components/expandable-row";
import { ExpandSection } from "@/components/expand-section";
import {
  leadership,
  events,
  experience,
  awards,
  recognitions,
  education,
  certificates,
  stack,
} from "@/lib/career";

export const metadata = { title: "경력 · 박서준" };

function SectionTitle({ children, bold }: { children: React.ReactNode; bold?: boolean }) {
  return (
    <div>
      <h2 className="text-lg font-semibold tracking-tight">{children}</h2>
      <div className={`mt-4 ${bold ? "border-t-2 border-foreground/20" : "border-t border-border"}`} />
    </div>
  );
}

export default function CareerPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-20">
      <Reveal>
        <h1 className="text-3xl font-semibold tracking-tight">경력</h1>
      </Reveal>

      <Reveal delay={80} className="mt-16">
        <SectionTitle bold>학력</SectionTitle>

        <div className="py-5">
          <p className="text-lg font-semibold text-foreground">
            {education.school} · {education.department}
          </p>
          <p className="mt-0.5 text-xs text-foreground/45">{education.period}</p>
        </div>

        <div className="py-5">
          <p className="text-xs text-foreground/45">전공 성취</p>
          <p className="mt-1 text-sm text-foreground/70">{education.major}</p>
          <p className="mt-0.5 text-xs text-foreground/45">{education.hours}</p>
        </div>

        <div className="border-t border-border pt-5">
          <p className="text-xs text-foreground/45">교내 수상</p>
          <div className="mt-3">
            <ExpandSection
              totalCount={education.schoolAwards.length}
              visible={education.schoolAwards.slice(0, 3).map((a) => (
                <div
                  key={a.name + a.date}
                  className="flex flex-col gap-1 border-b border-border py-3 last:border-none sm:grid sm:grid-cols-[5.5rem_1fr] sm:gap-4"
                >
                  <span className="text-xs leading-snug text-foreground/45 sm:pt-0.5">{a.date}</span>
                  <span className="text-sm text-foreground/70">{a.name}</span>
                </div>
              ))}
              hidden={education.schoolAwards.slice(3).map((a) => (
                <div
                  key={a.name + a.date}
                  className="flex flex-col gap-1 border-b border-border py-3 last:border-none sm:grid sm:grid-cols-[5.5rem_1fr] sm:gap-4"
                >
                  <span className="text-xs leading-snug text-foreground/45 sm:pt-0.5">{a.date}</span>
                  <span className="text-sm text-foreground/70">{a.name}</span>
                </div>
              ))}
            />
          </div>
        </div>
      </Reveal>

      <div className="mt-16">
        <SectionTitle>리더십</SectionTitle>
        <div className="mt-4">
          {leadership.map((e, i) => (
            <Reveal key={e.org + e.role} delay={i * 60}>
              <ExpandableRow date={e.period} title={e.role} subtitle={e.org} desc={e.desc} detail={e.detail} />
            </Reveal>
          ))}
        </div>
      </div>

      <div className="mt-16">
        <SectionTitle>행사 기획</SectionTitle>
        <p className="mt-2 text-xs text-foreground/45">참여 규모가 20명에서 100명까지 늘어온 궤적입니다.</p>
        <div className="mt-4">
          {events.map((e, i) => (
            <Reveal key={e.name} delay={i * 60}>
              <ExpandableRow
                date={e.date}
                title={e.name}
                subtitle={`${e.org} · ${e.role} · ${e.scale}`}
                detail={e.detail}
              />
            </Reveal>
          ))}
        </div>
      </div>

      <div className="mt-16">
        <SectionTitle>실무 경험</SectionTitle>
        <div className="mt-4">
          {experience.map((e, i) => (
            <Reveal key={e.org + e.role} delay={i * 60}>
              <ExpandableRow date={e.period} title={e.org} subtitle={e.role} desc={e.desc} detail={e.detail} />
            </Reveal>
          ))}
        </div>
      </div>

      <div className="mt-16">
        <SectionTitle>수상</SectionTitle>
        <div className="mt-4">
          <ExpandSection
            totalCount={awards.length}
            visible={awards.slice(0, 4).map((a, i) => (
              <Reveal key={a.name} delay={i * 60}>
                <ExpandableRow
                  date={a.date}
                  title={a.name}
                  subtitle={[a.grade, a.org].filter(Boolean).join(" · ")}
                  detail={a.detail}
                />
              </Reveal>
            ))}
            hidden={awards.slice(4).map((a) => (
              <ExpandableRow
                key={a.name}
                date={a.date}
                title={a.name}
                subtitle={[a.grade, a.org].filter(Boolean).join(" · ")}
                detail={a.detail}
              />
            ))}
          />
        </div>
      </div>

      <div className="mt-16">
        <SectionTitle>장학금 · 표창</SectionTitle>
        <div className="mt-4">
          {recognitions.map((r, i) => (
            <Reveal key={r.name} delay={i * 60}>
              <ExpandableRow date={r.date} title={r.name} subtitle={r.org} detail={r.detail} />
            </Reveal>
          ))}
        </div>
      </div>

      <Reveal className="mt-16">
        <SectionTitle>자격증</SectionTitle>
        <div className="mt-6 flex flex-wrap items-end gap-6">
          {certificates.map((c) => (
            <div key={c.name} className="flex flex-col items-start">
              {c.src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={c.src}
                  alt={c.name}
                  className={`rounded-lg shadow ${c.orientation === "landscape" ? "h-36 w-auto" : "h-56 w-auto"}`}
                />
              ) : (
                <div
                  className={`flex items-center justify-center rounded-lg bg-white shadow ${
                    c.orientation === "landscape" ? "h-36 w-52" : "h-56 w-40"
                  }`}
                >
                  <span className="text-sm text-gray-400">자격증 사진</span>
                </div>
              )}
              <p className="mt-2 text-sm text-foreground/70">{c.name}</p>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal className="mt-16">
        <SectionTitle>기술 스택</SectionTitle>
        <p className="mt-6 text-sm text-foreground/70">{stack.join(" · ")}</p>
      </Reveal>
    </div>
  );
}
