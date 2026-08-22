"use client";

import { useEffect, useRef } from "react";

// 이편한자막 공식 사이트(easysub-official.vercel.app)의 스크롤 변환 데모를 참고한 버전.
// 조사는 반짝였다가 회전하며 날아가 사라지고, 어려운 말은 흐려지며 위로 빠지고 쉬운 말이
// 반짝이며 튀어 들어오고, "기상청은"은 문장 맨 앞에서 맨 뒤로 호를 그리며 이동한다 —
// 스크롤 진행도에 맞춰 이 세 가지가 순서대로 일어난다.
//
// 중앙 정렬은 text-align:center 대신 position:absolute + left:50%/top:50% +
// translate(-50%,-50%)+scale 조합을 쓴다 — translate(-50%,-50%)의 퍼센트 기준은
// transform 안의 scale과 무관하게 항상 "원래(스케일 전) 박스 크기"이므로, 스케일을
// 아무리 바꿔도 중심이 항상 부모 중심에 고정된다(실측으로 어긋남을 보정할 필요가 없음).

const PARTICLE_RANGES: [number, number][] = [
  [0.03, 0.16], // 기상청 + 은
  [0.1, 0.23], // 전국 + 에
  [0.17, 0.3], // 눈 + 이
];
const SWAP_RANGES: [number, number][] = [
  [0.38, 0.54],
  [0.48, 0.64],
];
const MOVER_RANGE: [number, number] = [0.7, 0.95];

function clamp(v: number, a: number, b: number) {
  return Math.max(a, Math.min(b, v));
}
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
function phaseT(p: number, start: number, end: number) {
  if (end <= start) return p >= end ? 1 : 0;
  return clamp((p - start) / (end - start), 0, 1);
}
function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function ScrollTransformDemo({ title }: { title?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const sentenceRef = useRef<HTMLParagraphElement>(null);
  const fitBoxRef = useRef<HTMLDivElement>(null);
  const particleRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const particleWidths = useRef<number[]>([]);
  const swapPairs = useRef<{ a: HTMLSpanElement | null; b: HTMLSpanElement | null }[]>([
    { a: null, b: null },
    { a: null, b: null },
  ]);
  const swapWidths = useRef<{ a: number; b: number }[]>([]);
  const moverFrontRef = useRef<HTMLSpanElement>(null);
  const moverEndRef = useRef<HTMLSpanElement>(null);
  const moverWidth = useRef(0);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    swapPairs.current.forEach(({ b }) => {
      if (b) b.style.width = "";
    });
    if (moverEndRef.current) moverEndRef.current.style.width = "";

    particleWidths.current = particleRefs.current.map((el) => el?.getBoundingClientRect().width ?? 0);
    swapWidths.current = swapPairs.current.map(({ a, b }) => ({
      a: a?.getBoundingClientRect().width ?? 0,
      b: b?.getBoundingClientRect().width ?? 0,
    }));
    moverWidth.current = moverFrontRef.current?.getBoundingClientRect().width ?? 0;
    if (moverEndRef.current) moverEndRef.current.style.width = "0px";
    swapPairs.current.forEach(({ b }) => {
      if (b) b.style.width = "0px";
    });

    let raf = 0;
    function apply(p: number) {
      // 조사: 반짝(확대+발광) 후 회전하며 위로 빠지듯 사라진다.
      particleRefs.current.forEach((el, i) => {
        if (!el) return;
        const t = phaseT(p, PARTICLE_RANGES[i][0], PARTICLE_RANGES[i][1]);
        const w = particleWidths.current[i];
        if (t <= 0) {
          el.style.width = `${w}px`;
          el.style.opacity = "1";
          el.style.transform = "none";
          el.style.textShadow = "none";
          el.style.filter = "none";
          return;
        }
        const flashT = clamp(t / 0.3, 0, 1);
        const goT = clamp((t - 0.3) / 0.7, 0, 1);
        const scale = t < 0.3 ? lerp(1, 1.5, flashT) : lerp(1.5, 0.2, goT);
        const glow = t < 0.3 ? lerp(0, 24, flashT) : lerp(24, 0, goT);
        const rotate = t < 0.3 ? 0 : lerp(0, 30, goT);
        const translateY = t < 0.3 ? 0 : lerp(0, -18, goT);
        el.style.width = t < 0.3 ? `${w}px` : `${lerp(w, 0, goT)}px`;
        el.style.opacity = String(t < 0.3 ? 1 : 1 - goT);
        el.style.filter = goT > 0.05 ? `blur(${lerp(0, 5, goT)}px)` : "none";
        el.style.textShadow = glow > 0.5 ? `0 0 ${glow}px rgba(255,255,255,.95)` : "none";
        el.style.transform = `translateY(${translateY}px) scale(${scale}) rotate(${rotate}deg)`;
      });

      // 어려운 말: 흐려지며 위로, 회전하며 빠진다 / 쉬운 말: 반짝이며 튀어 들어온다.
      swapPairs.current.forEach(({ a, b }, i) => {
        if (!a || !b) return;
        const t = phaseT(p, SWAP_RANGES[i][0], SWAP_RANGES[i][1]);
        const { a: aw, b: bw } = swapWidths.current[i];
        const outT = clamp(t / 0.5, 0, 1);
        const inT = clamp((t - 0.5) / 0.5, 0, 1);

        a.style.width = `${outT < 1 ? aw : 0}px`;
        a.style.opacity = String(1 - outT);
        a.style.filter = outT > 0.05 ? `blur(${lerp(0, 7, outT)}px)` : "none";
        a.style.transform = `translateY(${lerp(0, -22, outT)}px) scale(${lerp(1, 0.65, outT)}) rotate(${lerp(0, -10, outT)}deg)`;

        const bt = clamp(inT / 0.6, 0, 1);
        const bScale = lerp(0.4, 1.08, bt) - (bt > 0.8 ? (bt - 0.8) * 0.4 : 0);
        const glow = Math.sin(clamp(inT, 0, 1) * Math.PI) * 30;
        b.style.width = `${inT > 0 ? bw : 0}px`;
        b.style.opacity = String(clamp(inT / 0.3, 0, 1));
        b.style.transform = `translateY(${lerp(20, 0, bt)}px) scale(${bScale})`;
        b.style.textShadow = glow > 0.5 ? `0 0 ${glow}px rgba(255,255,255,.95)` : "none";
      });

      // 기상청은: 호를 그리며 문장 맨 앞에서 맨 뒤로 이동, 도착 시 반짝인다.
      const mt = easeInOutCubic(phaseT(p, MOVER_RANGE[0], MOVER_RANGE[1]));
      const arc = Math.sin(clamp(phaseT(p, MOVER_RANGE[0], MOVER_RANGE[1]), 0, 1) * Math.PI) * 16;
      if (moverFrontRef.current) {
        moverFrontRef.current.style.width = `${lerp(moverWidth.current, 0, mt)}px`;
        moverFrontRef.current.style.opacity = String(1 - mt);
        moverFrontRef.current.style.transform = `translateY(${-arc}px) rotate(${lerp(0, -8, mt)}deg)`;
      }
      if (moverEndRef.current) {
        moverEndRef.current.style.width = `${lerp(0, moverWidth.current, mt)}px`;
        moverEndRef.current.style.opacity = String(mt);
        // 착지 순간에만 반짝 빛나고 사라지게 — 끝까지 밝게 남아있지 않도록 펄스 형태로.
        const landT = mt > 0.75 ? clamp((mt - 0.75) / 0.25, 0, 1) : 0;
        const landGlow = Math.sin(landT * Math.PI) * 20;
        moverEndRef.current.style.transform = `translateY(${-arc}px) rotate(${lerp(8, 0, mt)}deg)`;
        moverEndRef.current.style.textShadow = landGlow > 0.5 ? `0 0 ${landGlow}px rgba(255,255,255,.9)` : "none";
      }

      if (progressBarRef.current) progressBarRef.current.style.width = `${p * 100}%`;

      // 문장이 화면보다 넓어지면 통째로 줄인다. absolute + left:50%/top:50% +
      // translate(-50%,-50%)의 퍼센트 기준은 스케일과 무관한 원래 박스 크기라서,
      // scale을 뒤에 이어붙여도 중심이 항상 고정된다(측정 보정 불필요).
      if (sentenceRef.current && fitBoxRef.current) {
        sentenceRef.current.style.transform = "translate(-50%, -50%) scale(1)";
        const natural = sentenceRef.current.scrollWidth;
        const available = fitBoxRef.current.clientWidth * 0.94;
        const scale = natural > available ? available / natural : 1;
        sentenceRef.current.style.transform = `translate(-50%, -50%) scale(${scale})`;
      }
    }

    function onScroll() {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const wrap = wrapRef.current;
        if (!wrap) return;
        const rect = wrap.getBoundingClientRect();
        const total = rect.height - window.innerHeight;
        const p = total > 0 ? clamp(-rect.top / total, 0, 1) : 0;
        apply(p);
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={wrapRef} style={{ height: "220vh" }}>
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center px-6">
        {title && <p className="mb-8 text-xl font-extrabold text-foreground">{title}</p>}

        <div className="mx-auto h-1 w-24 overflow-hidden rounded-full bg-border">
          <div ref={progressBarRef} className="h-full w-0 bg-accent" />
        </div>

        <div ref={fitBoxRef} className="relative mt-10 h-16 w-full sm:h-20">
          <p
            ref={sentenceRef}
            className="absolute whitespace-nowrap text-xl font-black leading-snug tracking-tight text-white sm:text-2xl md:text-3xl"
            style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
          >
              <span
                ref={moverFrontRef}
                style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}
              >
                기상청
              </span>
              <span
                ref={(el) => {
                  particleRefs.current[0] = el;
                }}
                style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}
              >
                은
              </span>{" "}
              <span style={{ display: "inline-block" }}>내일 아침</span>{" "}
              <span style={{ display: "inline-block" }}>
                전국
                <span
                  ref={(el) => {
                    particleRefs.current[1] = el;
                  }}
                  style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}
                >
                  에
                </span>
              </span>{" "}
              <span style={{ display: "inline-block" }}>
                눈
                <span
                  ref={(el) => {
                    particleRefs.current[2] = el;
                  }}
                  style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}
                >
                  이
                </span>
              </span>{" "}
              <span style={{ display: "inline-block" }}>많이</span>{" "}
              <span
                ref={(el) => {
                  swapPairs.current[0].a = el;
                }}
                style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}
              >
                내릴 것이라고
              </span>
              <span
                ref={(el) => {
                  swapPairs.current[0].b = el;
                }}
                style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom", width: 0, opacity: 0 }}
              >
                오다
              </span>{" "}
              <span
                ref={(el) => {
                  swapPairs.current[1].a = el;
                }}
                style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}
              >
                예보했습니다
              </span>
              <span
                ref={(el) => {
                  swapPairs.current[1].b = el;
                }}
                style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom", width: 0, opacity: 0 }}
              >
                말하다
              </span>{" "}
              <span
                ref={moverEndRef}
                style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom", width: 0, opacity: 0 }}
              >
                기상청
          </span>
          </p>
        </div>
      </div>
    </div>
  );
}
