const STATS = [
  {
    value: "은상",
    label: (
      <>
        제19회 서울시 직업계고 창의아이디어경진대회{" "}
        <span className="whitespace-nowrap">(1,095팀 중)</span>
      </>
    ),
  },
  { value: "4개 기관", label: "서비스 이용 의향서 확보" },
  { value: "2026.09", label: "서울삼성학교 파일럿 운영 예정" },
] as const;

export function StatRow() {
  return (
    <div>
      <p className="text-center text-xl font-extrabold text-foreground">성과</p>
      <div className="mx-auto mt-8 flex max-w-sm flex-col divide-y divide-border">
        {STATS.map((s) => (
          <div key={s.value} className="flex items-center justify-between gap-6 py-5 text-left">
            <p className="text-sm leading-snug text-foreground/60">{s.label}</p>
            <p className="shrink-0 text-3xl font-black tracking-tight text-accent">{s.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
