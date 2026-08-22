"use client";

import { useRef, useState } from "react";
import Image from "next/image";

// 실제 익스텐션 UI(overlay.css, overlay.js, word-panel.js, settings.js)를 그대로 재현한 데모.
// 배경은 저작권 문제를 피하기 위해 실제 영상 화면 대신 별도 이미지를 씁니다.
// 국립국어원 수어사전 API는 정적 사이트에서 직접 호출하면 CORS로 막혀서(실제 익스텐션은
// 콘텐츠 스크립트 권한으로 이를 우회함), 아래 단어들은 실제 한국수어사전(sldict.korean.go.kr)에서
// 직접 검색해 확인한 수형 설명·뜻풀이를 그대로 옮겨왔습니다.

const MODES = [
  { id: "original", label: "원문", text: "기상청은 내일 아침 전국에 눈이 많이 내릴 것이라고 예보했습니다" },
  { id: "easy", label: "쉬운말", text: "기상청은 내일 아침 전국에 눈이 많이 온다고 말했습니다" },
  { id: "ksl", label: "수어 어순", text: "내일 아침 전국 눈 많이 오다 말하다 기상청" },
] as const;

const TABS = [
  { id: "sign", label: "수어 보기" },
  { id: "meaning", label: "뜻풀이" },
  { id: "grammar", label: "문법 노트" },
  { id: "compare", label: "원문 비교" },
] as const;
type TabId = (typeof TABS)[number]["id"];

const DICT: Record<string, { title: string; desc: string; url: string }> = {
  눈이: {
    title: "눈(이 내리다)",
    desc: "오른 주먹의 1지를 펴서 끝으로 치아를 가리킨 다음, 손등이 위로 손끝이 밖으로 향하게 편 두 손의 손가락을 번갈아 움직이며 눈앞에서 아래로 내립니다.",
    url: "https://sldict.korean.go.kr/front/sign/signContentsView.do?origin_no=5398&top_category=CTE&category=&searchKeyword=%EB%88%88&searchCondition=&search_gubun=&museum_type=00&current_pos_index=1",
  },
  눈: {
    title: "눈(이 내리다)",
    desc: "오른 주먹의 1지를 펴서 끝으로 치아를 가리킨 다음, 손등이 위로 손끝이 밖으로 향하게 편 두 손의 손가락을 번갈아 움직이며 눈앞에서 아래로 내립니다.",
    url: "https://sldict.korean.go.kr/front/sign/signContentsView.do?origin_no=5398&top_category=CTE&category=&searchKeyword=%EB%88%88&searchCondition=&search_gubun=&museum_type=00&current_pos_index=1",
  },
  내일: {
    title: "내일, 명일",
    desc: "오른 주먹의 1지를 펴서 바닥이 밖으로 향하게 세워 오른쪽 눈 옆에 댔다가 밖으로 내밉니다.",
    url: "https://sldict.korean.go.kr/front/sign/signContentsView.do?origin_no=6442&top_category=CTE&category=&searchKeyword=%EB%82%B4%EC%9D%BC&searchCondition=&search_gubun=&museum_type=00&current_pos_index=0",
  },
  아침: {
    title: "일출, 동, 아침, (해가)돋다",
    desc: "왼손을 손등이 위로 손끝이 오른쪽으로 향하게 하고, 그 밑에서 오른손의 1·5지 끝을 맞대어 동그라미를 만들어 왼손 안에서 밖으로 약간 올립니다.",
    url: "https://sldict.korean.go.kr/front/sign/signContentsView.do?origin_no=2231&top_category=CTE&category=&searchKeyword=%EC%95%84%EC%B9%A8&searchCondition=&search_gubun=&museum_type=00&current_pos_index=0",
  },
  많이: {
    title: "많다, 흔하다",
    desc: "손바닥이 위로 손끝이 밖으로 향하게 편 두 손의 손가락을 5지부터 구부려 주먹을 쥡니다.",
    url: "https://sldict.korean.go.kr/front/sign/signContentsView.do?origin_no=6094&top_category=CTE&category=&searchKeyword=%EB%A7%8E%EB%8B%A4&searchCondition=&search_gubun=&museum_type=00&current_pos_index=0",
  },
  오다: {
    title: "오다, 도래",
    desc: "손등이 밖으로 향한 오른 주먹의 1지를 펴서 몸 가까이로 당깁니다.",
    url: "https://sldict.korean.go.kr/front/sign/signContentsView.do?origin_no=7704&top_category=CTE&category=&searchKeyword=%EC%98%A4%EB%8B%A4&searchCondition=&search_gubun=&museum_type=00&current_pos_index=0",
  },
  말하다: {
    title: "말, 말하다, 언어",
    desc: "오른 주먹의 1지를 펴서 세워 옆면을 입에 댔다가 밖으로 내밉니다.",
    url: "https://sldict.korean.go.kr/front/sign/signContentsView.do?origin_no=6135&top_category=CTE&category=&searchKeyword=%EB%A7%90%ED%95%98%EB%8B%A4&searchCondition=&search_gubun=&museum_type=00&current_pos_index=0",
  },
};

const COLOR_SCHEMES = {
  "white-on-black": { label: "흰 글씨 / 검정 배경", text: "#ffffff", bg: "8, 8, 8" },
  "yellow-on-black": { label: "노란 글씨 / 검정 배경", text: "#ffe066", bg: "8, 8, 8" },
  "black-on-white": { label: "검정 글씨 / 흰 배경", text: "#111111", bg: "255, 255, 255" },
} as const;
type SchemeId = keyof typeof COLOR_SCHEMES;

const FONT_FAMILIES = {
  sans: { label: "기본(고딕)", css: '"Apple SD Gothic Neo", "Malgun Gothic", "Noto Sans KR", sans-serif' },
  serif: { label: "명조체", css: '"Nanum Myeongjo", "Batang", serif' },
  rounded: { label: "둥근 고딕", css: '"Apple SD Gothic Neo", "Malgun Gothic", sans-serif' },
} as const;
type FontId = keyof typeof FONT_FAMILIES;

const DEFAULT_POS = { top: 78, left: 50 };

// overlay.js의 buildMoveIcon()과 동일한 4방향 화살표 아이콘
function MoveIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 3 L12 10" />
      <path d="M8.5 6.5 L12 3 L15.5 6.5" />
      <path d="M12 21 L12 14" />
      <path d="M8.5 17.5 L12 21 L15.5 17.5" />
      <path d="M3 12 L10 12" />
      <path d="M6.5 8.5 L3 12 L6.5 15.5" />
      <path d="M21 12 L14 12" />
      <path d="M17.5 8.5 L21 12 L17.5 15.5" />
    </svg>
  );
}

export function DemoPlayer() {
  const containerRef = useRef<HTMLDivElement>(null);

  const [modeId, setModeId] = useState<(typeof MODES)[number]["id"]>("original");
  const mode = MODES.find((m) => m.id === modeId)!;
  const words = mode.text.split(" ");

  const [panelWord, setPanelWord] = useState<string | null>(null);
  const [tab, setTab] = useState<TabId>("sign");
  const [settingsOpen, setSettingsOpen] = useState(false);

  const [pos, setPos] = useState(DEFAULT_POS);
  const [fontSize, setFontSize] = useState(20);
  const [opacity, setOpacity] = useState(0.75);
  const [scheme, setScheme] = useState<SchemeId>("white-on-black");
  const [font, setFont] = useState<FontId>("sans");

  function openPanel(word: string) {
    setSettingsOpen(false);
    setPanelWord(word);
    setTab("sign");
  }

  // 클릭 지점이 아니라 커서가 "움직인 만큼"만 이동시킨다 — 절대 좌표를 그대로 쓰면
  // 자막 중심이 커서 위치로 홱 튀는 문제가 있다(overlay.js의 실제 드래그 로직과 동일).
  function onDragPointerDown(e: React.PointerEvent) {
    e.preventDefault();
    const container = containerRef.current;
    if (!container) return;
    const startX = e.clientX;
    const startY = e.clientY;
    const startPos = pos;

    function onMove(ev: PointerEvent) {
      const rect = container!.getBoundingClientRect();
      const dxPct = ((ev.clientX - startX) / rect.width) * 100;
      const dyPct = ((ev.clientY - startY) / rect.height) * 100;
      setPos({
        left: Math.min(92, Math.max(8, startPos.left + dxPct)),
        top: Math.min(92, Math.max(10, startPos.top + dyPct)),
      });
    }
    function onUp() {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    }
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  }

  const s = COLOR_SCHEMES[scheme];
  const underline = scheme === "black-on-white" ? "rgba(17,17,17,0.4)" : "rgba(255,255,255,0.5)";
  const hoverBg = scheme === "black-on-white" ? "rgba(17,17,17,0.1)" : "rgba(255,255,255,0.18)";
  const dictEntry = panelWord ? DICT[panelWord] : undefined;

  return (
    <div>
      <div
        ref={containerRef}
        className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-border shadow-lg"
      >
        <Image
          src="/images/project/easysub/demo-bg.jpg"
          alt=""
          fill
          className="object-cover"
          sizes="(min-width: 640px) 640px, 100vw"
        />
        <div className="absolute inset-0 bg-black/10" />

        {/* 자막 오버레이 — overlay.css #ieasy-caption-root/#ieasy-caption-text 재현, 드래그 가능 */}
        <div
          className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 px-4"
          style={{ top: `${pos.top}%`, left: `${pos.left}%` }}
        >
          <p
            key={mode.id}
            className="caption-fade whitespace-nowrap rounded px-3.5 py-1.5 text-center leading-snug"
            style={{
              backgroundColor: `rgba(${s.bg}, ${opacity})`,
              color: s.text,
              fontSize: `${fontSize}px`,
              fontFamily: FONT_FAMILIES[font].css,
            }}
          >
            {words.map((w, i) => (
              <span key={i} className="group relative">
                <span className="pointer-events-none absolute bottom-full left-1/2 mb-1.5 -translate-x-1/2 whitespace-nowrap rounded bg-white px-2 py-1 text-[11px] text-[#111] opacity-0 shadow transition-opacity group-hover:opacity-100">
                  {w}
                </span>
                <button
                  type="button"
                  onClick={() => openPanel(w)}
                  className="cursor-pointer border-b border-dotted"
                  style={{ borderColor: underline }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = hoverBg)}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  {w}
                </button>
                {i < words.length - 1 ? " " : ""}
              </span>
            ))}
          </p>

          {/* 토글 바 — overlay.css .ieasy-caption-toggle-btn 재현 */}
          <div className="flex items-center gap-1.5">
            {MODES.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => {
                  setModeId(m.id);
                  setPanelWord(null);
                }}
                className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-[13px] transition ${
                  m.id === modeId
                    ? "border-white bg-white font-semibold text-[#111]"
                    : "border-white/40 bg-black/50 text-white hover:bg-white/10"
                }`}
              >
                {m.label}
              </button>
            ))}
            <button
              type="button"
              aria-label="설정"
              onClick={() => {
                setPanelWord(null);
                setSettingsOpen((v) => !v);
              }}
              className={`flex h-8 w-8 items-center justify-center rounded-full border text-sm transition ${
                settingsOpen
                  ? "border-white bg-white text-[#111]"
                  : "border-white/40 bg-black/50 text-white hover:bg-white/10"
              }`}
            >
              ⚙
            </button>
            <button
              type="button"
              aria-label="자막 위치 옮기기 (눌러서 드래그)"
              onPointerDown={onDragPointerDown}
              className="flex h-8 w-8 cursor-move items-center justify-center rounded-full border border-white/40 bg-black/50 text-white hover:bg-white/10"
            >
              <MoveIcon />
            </button>
          </div>
        </div>

        {/* 단어 상세 패널 — overlay.css #ieasy-word-panel, word-panel.js 구조 재현 */}
        {panelWord && (
          <div className="absolute bottom-3 right-3 flex max-h-[70%] w-[260px] flex-col overflow-hidden rounded-[10px] bg-white text-[#111] shadow-xl sm:w-[300px]">
            <div className="flex items-center justify-between border-b border-[#eee] px-3 py-2.5 font-semibold">
              <span>&quot;{panelWord}&quot;</span>
              <button
                type="button"
                onClick={() => setPanelWord(null)}
                aria-label="닫기"
                className="p-1 text-[#666] hover:text-[#111]"
              >
                ✕
              </button>
            </div>
            <div className="flex border-b border-[#eee]">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTab(t.id)}
                  className={`flex-1 px-1 py-2 text-xs ${
                    tab === t.id ? "border-b-2 border-[#111] font-semibold text-[#111]" : "text-[#666]"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <div className="flex-1 overflow-y-auto p-3.5 text-[13px] leading-relaxed">
              {tab === "sign" &&
                (dictEntry ? (
                  <div>
                    <p className="mb-2 font-semibold">{dictEntry.title}</p>
                    <p className="mb-3 text-[#333]">{dictEntry.desc}</p>
                    <a
                      href={dictEntry.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block rounded-md bg-[#2952e3] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#1f3fc0]"
                    >
                      ▶ 수형 영상 보기 (새 탭, 한국수어사전)
                    </a>
                  </div>
                ) : (
                  <p className="italic text-[#666]">
                    관련 수어 정보를 찾지 못했습니다. (조사·존칭이 붙은 어절은 검색이 잘 안 될 수 있음)
                  </p>
                ))}
              {tab === "meaning" &&
                (dictEntry ? (
                  <p>
                    {dictEntry.title}: {dictEntry.desc}
                  </p>
                ) : (
                  <p className="italic text-[#666]">사전 데이터 연동 전 (TODO)</p>
                ))}
              {tab === "grammar" &&
                (dictEntry ? (
                  <p>
                    한국수어는 조사가 거의 없고, 시간·장소를 나타내는 말이 문장 앞쪽에 오는 경향이 있습니다.
                    (정확한 문법 분석은 수어통역사 자문이 필요한 영역입니다)
                  </p>
                ) : (
                  <p className="italic text-[#666]">수어 문법 분석은 수어통역사 자문 검증이 필요한 영역 (TODO)</p>
                ))}
              {tab === "compare" && <p>{mode.text}</p>}
            </div>
          </div>
        )}

        {/* 설정 패널 — 실제 익스텐션의 최신 "자막 표시 설정" UI 재현 */}
        {settingsOpen && (
          <div className="absolute bottom-3 right-3 flex max-h-[85%] w-[280px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[rgba(14,14,17,0.92)] text-white shadow-xl backdrop-blur-xl sm:w-[310px]">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3.5 text-[15px] font-semibold">
              자막 표시 설정
              <button
                type="button"
                onClick={() => setSettingsOpen(false)}
                aria-label="닫기"
                className="p-1 text-white/50 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 space-y-5 overflow-y-auto p-4">
              <div>
                <p className="mb-2 text-sm text-white/80">글씨 크기</p>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min={14}
                    max={28}
                    value={fontSize}
                    onChange={(e) => setFontSize(Number(e.target.value))}
                    className="flex-1 accent-accent"
                  />
                  <span className="w-9 text-right text-xs text-white/50">{fontSize}px</span>
                </div>
              </div>

              <div>
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-white/40">스타일</p>

                <p className="mb-2 text-sm text-white/80">배경 투명도</p>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={Math.round(opacity * 100)}
                    onChange={(e) => setOpacity(Number(e.target.value) / 100)}
                    className="flex-1 accent-accent"
                  />
                  <span className="w-9 text-right text-xs text-white/50">{opacity.toFixed(2)}</span>
                </div>
              </div>

              <div>
                <p className="mb-2 text-sm text-white/80">색상</p>
                <div className="grid grid-cols-3 gap-2">
                  {(Object.keys(COLOR_SCHEMES) as SchemeId[]).map((key) => {
                    const c = COLOR_SCHEMES[key];
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setScheme(key)}
                        className={`rounded-lg border p-1 transition ${
                          scheme === key ? "border-accent" : "border-white/10 hover:border-white/25"
                        }`}
                      >
                        <span
                          className="flex h-11 items-center justify-center rounded text-sm font-semibold"
                          style={{ backgroundColor: `rgb(${c.bg})`, color: c.text }}
                        >
                          가나다
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <p className="mb-2 text-sm text-white/80">글꼴</p>
                <div className="grid grid-cols-3 gap-2">
                  {(Object.keys(FONT_FAMILIES) as FontId[]).map((key) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setFont(key)}
                      className={`rounded-lg border p-2 text-center transition ${
                        font === key ? "border-accent bg-accent/10" : "border-white/10 bg-white/5 hover:border-white/25"
                      }`}
                    >
                      <span className="block text-base font-semibold" style={{ fontFamily: FONT_FAMILIES[key].css }}>
                        가나다
                      </span>
                      <span className="mt-1 block text-[10px] text-white/50">{FONT_FAMILIES[key].label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setPos(DEFAULT_POS);
                  setFontSize(20);
                  setOpacity(0.75);
                  setScheme("white-on-black");
                  setFont("sans");
                }}
                className="w-full rounded-lg border border-white/10 py-2.5 text-sm text-white/70 transition hover:bg-white/5 hover:text-white"
              >
                기본값으로 되돌리기
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
