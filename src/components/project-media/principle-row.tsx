const PRINCIPLES = [
  { step: "01", title: "조사 생략", desc: "한국수어는 조사 없이 어순과 문맥으로 의미를 전달합니다." },
  { step: "02", title: "어휘 단순화", desc: "한자어와 관용 표현을 일상적인 어휘로 바꿉니다." },
  { step: "03", title: "어순 재배열", desc: "시간·장소를 문두로, 서술어를 문미로 — 수어 문법에 맞춥니다." },
] as const;

export function PrincipleRow() {
  return (
    <div>
      <p className="text-center text-xl font-extrabold text-foreground">수어 친화형 자막의 원리</p>
      <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-3 sm:divide-x sm:divide-border">
        {PRINCIPLES.map((p) => (
          <div key={p.step} className="text-center sm:px-6">
            <p className="text-xs font-black tracking-wide text-accent">{p.step}</p>
            <p className="mt-2 text-lg font-bold text-foreground">{p.title}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-foreground/60">{p.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
