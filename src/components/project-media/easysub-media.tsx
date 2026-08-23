import { DemoPlayer } from "@/components/project-media/demo-player";
import { ScrollTransformDemo } from "@/components/project-media/scroll-transform-demo";
import { PrincipleRow } from "@/components/project-media/principle-row";
import { StatRow } from "@/components/project-media/stat-row";

export function EasysubMedia({ serviceUrl }: { serviceUrl?: string }) {
  return (
    <div className="space-y-16">
      <div className="flex flex-col items-center text-center">
        <p className="text-sm text-foreground/60">수어 사용자를 위한 AI 기반 쉬운 자막 서비스</p>
        <p className="mt-2 text-3xl font-black tracking-tight text-foreground sm:text-4xl">이편한자막</p>
        {serviceUrl && (
          <a
            href={serviceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center rounded-full bg-foreground px-6 py-3 text-base font-bold text-background shadow-lg transition hover:scale-[1.03] hover:opacity-90"
          >
            서비스 바로가기 ↗
          </a>
        )}
      </div>

      <div className="mx-auto max-w-lg space-y-4 text-left leading-relaxed text-foreground/70">
        <p>
          한국수어를 제1언어로 쓰는 농인 중 일부에게는 한국어 자막의 어순과 조사가 낯설게 느껴집니다. 자막이
          있어도 뜻을 온전히 따라가기 어려운 경우가 있는 이유입니다.
        </p>
        <p>
          이편한자막은 이 구조적인 간극에서 출발했습니다. 화면에 뜨는 자막을 실시간으로 감지해, 한국수어
          문법에 가깝게 다시 짜서 보여주는 크롬 확장 프로그램을 만들었습니다.
        </p>
      </div>

      <div>
        <p className="text-center text-xl font-extrabold text-foreground">이편한자막 익스텐션</p>
        <p className="mt-1.5 text-center text-sm text-foreground/50">
          자막을 클릭하고, 아래 버튼들을 직접 눌러보세요
        </p>
        <div className="mt-4">
          <DemoPlayer />
        </div>
        <p className="mt-3 text-center text-xs text-foreground/40 sm:hidden">
          이 데모는 모바일보다 컴퓨터 환경에서 더 편하게 볼 수 있어요
        </p>
      </div>

      <ScrollTransformDemo title="이편한자막 변환 원리" />

      <PrincipleRow />

      <StatRow />
    </div>
  );
}
