export const leadership: { org: string; role: string; period: string; desc?: string; detail?: string }[] = [
  {
    org: "서울인공지능고등학교",
    role: "제34대 학생회장",
    period: "2025.07 – 2026.07",
    desc: "등교 복장 지도 방식을 바꿔, 학생회 임원부터 매일 교복을 갖춰 입도록 했습니다.",
    detail:
      "생활지도 순번은 주 3회였지만, 빠져도 티가 안 나는 날에도 1년 내내 매일 교문에 나가 인사와 복장 점검을 함께했습니다. 다른 사람에게 지키라고 요구하는 기준이라면 저부터 예외 없이 지켜야 설득력이 생긴다고 생각했기 때문입니다. 그 결과 하루 20명대였던 사복 착용 위반이 서너 명 수준까지 줄었습니다.",
  },
  {
    org: "서울인공지능고등학교",
    role: "AI컴퓨터과 전공 동아리 부장",
    period: "2025.03 – 현재",
    desc: "",
  },
];

export const events: { date: string; org: string; name: string; role: string; scale: string; detail?: string }[] = [
  {
    date: "2025.11.30",
    org: "파이썬사용자모임",
    name: "PyAI 심포지움",
    role: "운영팀, 연사 섭외 및 현장 운영",
    scale: "100명",
  },
  {
    date: "2025.07.15",
    org: "서울인공지능고등학교",
    name: "Oops 컨퍼런스",
    role: "총괄 기획 및 현장 운영",
    scale: "40명",
    detail:
      "실패 경험을 두려워하지 않는 개발자들의 이야기를 나누는 자리를 직접 기획해 학교 행사로 발전시켰습니다. 연사로도 참여해 진로를 탐색하며 겪은 시행착오를 학생들과 나눴고, 역할 분담과 진행을 총괄하며 기획·운영 전반을 관리했습니다.",
  },
  {
    date: "2025.02.15",
    org: "KSDC",
    name: "2025 Project Summit (부산)",
    role: "총괄 기획 및 현장 운영",
    scale: "23명",
    detail:
      "행사 일주일 전, 메인 후원사가 갑자기 50만 원 규모의 후원을 철회했습니다. 유지해야 할 것과 조정 가능한 것을 나누고, 신규 후원처 10곳에 연락해 2곳에서 부족분을 채웠습니다. 운영팀에는 상황을 투명하게 공유해 현장 혼선을 막았습니다. 행사는 무사히 끝났지만, 이 경험으로 위기 대응보다 외부 의존도가 높은 요소를 미리 파악하는 사전 예방이 더 중요하다는 걸 배웠습니다.",
  },
  {
    date: "2024.08.10",
    org: "KSDC",
    name: "Hyper App 2024",
    role: "연사 섭외 및 관리, 현장 운영",
    scale: "80명",
  },
];

export const experience: { org: string; role: string; period: string; desc?: string; detail?: string }[] = [
  {
    org: "넥스트젠코퍼레이션",
    role: "콘텐츠 에디터",
    period: "2026.03",
    desc: "nextgen.kr 공식 인스타그램 매거진의 카드뉴스 게시물을 제작하며, Figma로 레이아웃을 직접 설계했습니다.",
    detail:
      "한 달간 인스타그램 매거진 카드뉴스 게시물 제작을 맡아 총 6개 게시물을 만들었습니다. Figma로 레이아웃을 직접 설계하면서 디자인 툴 활용 능력을 키웠습니다.",
  },
  {
    org: "한국마이크로소프트",
    role: "코파일럿+PC 앰버서더 2기",
    period: "2025.02 – 2025.03",
    desc: "",
  },
  {
    org: "㈜클레버러스",
    role: "인턴",
    period: "2025.01 – 2025.03",
    desc: "웹사이트를 반응형으로 새로 만들고, SNS에 올라갈 홍보 콘텐츠도 함께 제작했습니다.",
  },
];

// 실제 대회에서 등수/상을 받은 것만. 장학금·표창은 아래 recognitions로 분리.
export const awards: { name: string; grade: string; org: string; date: string; detail?: string }[] = [
  {
    name: "디지털새싹 해커톤대회 CODE2025",
    grade: "대상",
    org: "한국과학창의재단",
    date: "2025.11.20",
    detail: "다문화 학생을 위한 쉬운 한국어 변환 서비스로 대상 수상. 자세한 이야기는 블로그에 있습니다.",
  },
  {
    name: "2025 WCRC 자율주행자동차",
    grade: "동상",
    org: "한국폴리텍I대학",
    date: "2025.11.08",
    detail: "대회장 차선을 직접 촬영해 라벨링하고 자율주행시켰습니다. 돌발 장애물이 나오면 일시정지하도록, 신호도 인식하도록 학습시켰습니다.",
  },
  {
    name: "2025 WCRC 인공지능 모델링",
    grade: "장려상",
    org: "한국로봇콘텐츠협회",
    date: "2025.11.05",
    detail: "비전 AI를 학습시키기 위해 이미지 데이터 라벨링, 전처리, 학습을 모두 직접 진행했습니다.",
  },
  {
    name: "제19회 서울시 직업계고 창의아이디어경진대회",
    grade: "은상",
    org: "서울특별시교육감",
    date: "2025.11.03",
    detail: "이편한자막으로 1,095개 팀 중 은상 수상. 자세한 이야기는 홈·블로그에 있습니다.",
  },
  {
    name: "DK Kim 글로벌 리더십캠프 Final Project",
    grade: "First Prize",
    org: "디케이킴재단",
    date: "2025.07.30",
    detail:
      "청소년 안전 앱 'Safe Steps'를 기획하고 MVP를 개발했습니다. 이 캠프에서 '좋은 개발자는 코드를 잘 짜는 사람이 아니라 사람의 삶에 가치를 더할 수 있는 사람'이라는 확신을 얻었습니다.",
  },
  {
    name: "2024 양철우 과학장학재단 AI 창의융합 경진대회",
    grade: "동상",
    org: "양철우과학장학재단",
    date: "2024.11.16",
    detail: "1학년 때 '스프라이트 팀'으로 참가해 본선까지 진출하며 수상했습니다. 앞으로 더 발전된 프로젝트에 도전하고 싶다는 마음으로, 이후 대회들에 계속 참가했습니다.",
  },
  {
    name: "제2회 AI 로봇발명 메이커대회",
    grade: "금상",
    org: "경기도교육감",
    date: "2024.11.09",
    detail: "고속도로에 압력판을 설치해 차량이 지나가며 만드는 에너지를 비축해뒀다가, 밤에 가로등을 밝히는 데 쓸 수 있을지 데이터 분석으로 연구했습니다.",
  },
  { name: "제2회 전국 청소년 IT 경시대회 (프로그래밍 언어 부문, 고등부)", grade: "동상", org: "한국정보기술진흥원", date: "2024.03.25" },
];

// 대회 등수가 아닌 선발/추천형 인정
export const recognitions: { name: string; org: string; date: string; detail?: string }[] = [
  { name: "서울미래직업계고 장학생 선정", org: "서울미래인재단", date: "2026.06.16" },
  { name: "배현진 국회의원 표창 (봉사 부문)", org: "", date: "" },
  { name: "강동구청장 표창", org: "강동구청장", date: "" },
];

export const education = {
  school: "서울인공지능고등학교",
  department: "AI컴퓨터과",
  period: "2024.09 – 현재 (일반고등학교에서 전학)",
  major: "전문교과(전기전자·정보통신 계열) NCS 능력단위 11개 전 과목 A",
  hours: "총 670시간 이수",
  schoolAwards: [
    { name: "창의아이디어 나눔 한마당 금상", date: "2026.07.20" },
    { name: "교과성적우수상 (정보통신기기하드웨어개발, 데이터베이스프로그래밍, 사물인터넷서비스기획)", date: "2026.07.20" },
    { name: "모범학생상", date: "2026.07.20" },
    { name: "교과성적우수상 (문학, 빅데이터 분석)", date: "2026.01.09" },
    { name: "모범학생상", date: "2026.01.09" },
    { name: "AI 메이커 챌린지 한마당 은상(2위)", date: "2025.07.18" },
    { name: "창의아이디어 나눔 한마당 금상", date: "2025.07.18" },
    { name: "교과성적우수상 (국어, 영어, 통합과학, 음악, 빅데이터엑셀, 정보통신기기하드웨어개발, 빅데이터분석)", date: "2025.07.18" },
    { name: "모범학생상", date: "2025.07.18" },
    { name: "교과우수상 (영어, 한국사, 통합사회, 통합과학, 정보, 인공지능과 미래사회)", date: "2025.01.10" },
  ],
};

export const certificates: { name: string; src?: string; orientation: "portrait" | "landscape" }[] = [
  { name: "프로그래밍기능사", src: "/images/certificates/programming.jpg", orientation: "portrait" },
  { name: "무선설비기능사", src: "/images/certificates/wireless.jpg", orientation: "portrait" },
  { name: "COS Pro Python 1급", src: "/images/certificates/cospro.jpg", orientation: "landscape" },
];

export const stack = ["Python", "JavaScript", "React", "Figma", "데이터 분석"];
