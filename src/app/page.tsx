import { Reveal } from "@/components/reveal";
import { WordReveal } from "@/components/word-reveal";
import { ImageFill } from "@/components/image-fill";

function Quote({ children }: { children: React.ReactNode }) {
  return (
    <div className="py-2">
      <span aria-hidden className="block font-serif text-5xl italic leading-none text-accent/50">
        &ldquo;
      </span>
      <p className="-mt-2 text-pretty text-xl font-semibold leading-snug tracking-tight text-foreground sm:text-2xl">
        {children}
      </p>
    </div>
  );
}

export default function Home() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16 sm:py-20">
      <Reveal>
        <div className="relative w-28 sm:w-32">
          <div className="absolute -inset-6 -z-10 rounded-full bg-gradient-to-br from-accent/40 via-fuchsia-500/20 to-teal-400/20 blur-2xl" />
          <div className="relative aspect-[3/4] overflow-hidden rounded-2xl shadow-lg ring-1 ring-border">
            <ImageFill src="/images/profile.jpg" alt="박서준 프로필 사진" objectPosition="center 20%" />
          </div>
        </div>
      </Reveal>

      <Reveal delay={100} className="mt-7">
        <h1 className="text-pretty text-3xl font-semibold tracking-tight sm:text-4xl">
          안녕하세요, 박서준입니다.
        </h1>
      </Reveal>

      <div className="mt-12 space-y-6 sm:space-y-5">
        <WordReveal text="좋은 개발자는 코드를 잘 짜는 사람이 아니라, 사람의 삶에 가치를 더하는 사람이라고 믿습니다." />
        <WordReveal text="지금은 청각장애인을 위한 쉬운 자막 서비스, 이편한자막의 대표를 맡고 있습니다." />
        <WordReveal text="저는 생각과 확신을 구분하는 편입니다. 아무리 그럴듯해 보여도, 그 문제를 직접 겪는 사람을 만나기 전까진 확신하지 않습니다. 주말마다 봉사를 다니던 시절부터, 자연스럽게 장애인 관련 문제에 관심이 갔습니다. 다만 제가 당사자는 아니었습니다. 그래서 문제를 풀려면 당사자를 직접 만나야 한다고 생각했습니다." />

        <WordReveal text="그 생각 하나로 강동구 수어통역센터의 문을 두드렸습니다. 약속도 없이, 확신만 들고 찾아간 자리였습니다. 낯선 곳에 불쑥 찾아가 다짜고짜 궁금한 걸 묻는 게 편하지만은 않았습니다. 그래도 통역사님은 시간을 내주셨습니다. 이런저런 이야기를 나누다가, 제가 옳다고 믿었던 걸 흔드는 한마디를 들었습니다." />
        <Quote>청각장애인들은 자막이 있어도 이해를 하지 못해요.</Quote>
        <WordReveal text="자막이 있는데, 이해를 못 한다고요? 이유를 되물었습니다. 많은 농인분들에게 한국수어가 모국어이고, 한국어는 그다음에 배우는 언어라는 걸 그때 처음 알았습니다. 제가 맞다고 믿었던 전제 자체가 틀렸던 겁니다. 이상하게도 실망스럽지 않았습니다. 확신이 아니라 질문에서 다시 시작해야 한다는 걸, 그 자리에서 배웠습니다." />

        <WordReveal text="이후로 저는 문제를 만나면 증상보다 원인이 어디 있는지부터 봅니다. 증상만 고치면 같은 문제가 금방 다시 생기기 때문입니다. 코드를 짜는 일보다, 무엇을 만들고 누구를 위해 만들지 정하는 일에 더 자신 있는 것도 그때부터입니다." />

        <WordReveal text="이편한자막을 만들 때도 그 태도가 그대로 이어졌습니다. 한국어를 수어 문법에 맞게 바꾸는 일은 생각보다 훨씬 복잡했고, 처음 세운 규칙은 자주 틀렸습니다. 틀릴 때마다 다시 현장을 찾아가 확인받고 고쳤습니다. 완성해서 보여주는 게 아니라, 틀린 채로 가서 고치는 방식이 익숙해진 것도 그 무렵부터입니다." />
        <WordReveal text="그렇게 만든 서비스로 제19회 서울시 직업계고 창의아이디어 경진대회에서 은상을 받았고, 미국 창의도시 탐방까지 다녀왔습니다. 그곳에서 실리콘밸리 액셀러레이터 Plug and Play 부사장님에게 들은 한마디가 제 생각을 또 한 번 바꿨습니다. 완벽해질 때까지 기다리지 말고 일단 시작해서 빨리 배우고 빨리 실패하라는 말이었습니다. 완벽한 답을 준비해서 보여주는 게 아니라, 지금 있는 걸로 계속 확인받으며 고쳐 나가면 된다는 걸 그때 받아들였습니다." />

        <WordReveal text="한국에 돌아와 사용자 테스트를 이어갔습니다. 어느 날 농인협회 회장님께 서비스를 보여드릴 기회가 생겼습니다. 화면을 한참 들여다보시던 회장님이 잠시 말을 잇지 못하시더니, 이렇게 말씀하셨습니다." />
        <Quote>정말 감사합니다.</Quote>
        <WordReveal text="그 순간, 대회에서 끝낼 일이 아니라는 걸 느꼈습니다. 여기서 멈추지 않고 정말 끝까지 만들어봐야겠다는 동기가 생겼습니다. 다만 혼자서는 다 할 수 없다는 것도 함께 깨달았습니다. 그 무렵, 기획과 개발만 고집하던 저희 팀에 디자이너가 합류했습니다." />

        <WordReveal text="학생회장, 동아리 활동, 이편한자막까지 한꺼번에 챙기다 보니, 우선순위가 흔들릴 때도 있었습니다. 여러 가능성을 동시에 시도하다 보면 뭘 먼저 끝내야 할지 헷갈리는 순간이 옵니다. 그럴 때마다 목표와 마감을 먼저 정하고 움직이는 습관을 새로 들이고 있습니다. 완벽하게 고쳐졌다고는 못 하지만, 적어도 제가 다듬어야 할 부분이라는 건 분명히 압니다." />

        <WordReveal text="강동구 수어통역센터 문을 두드리던 마음은 지금도 그대로입니다. 확신이 서지 않으면 일단 가서 확인하고, 제가 세운 기준이라면 저부터 먼저 지키는 것. 앞으로 어떤 문제를 마주하든, 이 방식이 제가 일하는 방법일 겁니다." />
      </div>
    </div>
  );
}
