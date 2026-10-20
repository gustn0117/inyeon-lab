export type Program = {
  id: string;
  name: string;
  duration: string;
  price: number;
  tagline: string;
  description: string;
  audience: string;
  features: string[];
  featured: boolean;
};

export const BANK_ACCOUNT = { bank: "우체국은행", number: "703355-02-126368", holder: "김가영" };
export const won = (amount: number) => `${amount.toLocaleString("ko-KR")}원`;

export const PROGRAM_IMAGES: Record<string, string> = {
  consultation: "consultant-v3.webp",
  conversation: "process-01-v2.webp",
  diagnosis: "process-02-v2.webp",
  intensive: "process-04-v2.webp",
  premium: "meeting-wide-v4.webp",
};

export const DEFAULT_PROGRAMS: Program[] = [
  {
    id: "consultation", name: "연애 고민 상담", duration: "30분", price: 19900,
    tagline: "혼자 복잡했던 마음, 함께 정리하는 시간.",
    description: "답장이 느려진 이유부터 다음 만남을 제안하는 타이밍까지. 지금 가장 답답한 상황을 함께 살펴보고, 다음에 어떻게 말하고 행동할지 구체적으로 정리합니다.",
    audience: "지금 겪는 썸·소개팅·연애 고민에 대한 조언이 필요한 분",
    features: ["현재 상황과 고민 분석", "상황에 맞는 1:1 조언", "바로 실천할 다음 행동 정리", "사진 기반 스타일링 제안 1회"], featured: false,
  },
  {
    id: "conversation", name: "카톡·말투 개선 코칭", duration: "1회", price: 29000,
    tagline: "하고 싶은 말이, 호감이 되는 말로.",
    description: "대화가 자꾸 끊기거나 답장을 쓸 때마다 망설여지나요? 실제 대화를 바탕으로 말투, 질문, 답장의 길이와 흐름을 살펴봅니다. 나다운 표현을 지키면서 편안하게 대화를 이어가는 방법을 제안합니다.",
    audience: "카톡 답장과 이성과의 대화에서 어려움을 느끼는 분",
    features: ["실제 카카오톡 대화 분석", "말투·답장 방식 피드백", "자연스러운 질문과 호감 표현 제안", "사진 기반 스타일링 제안 1회"], featured: false,
  },
  {
    id: "diagnosis", name: "연애 종합 진단", duration: "60분", price: 49000,
    tagline: "반복되는 어려움에는, 살펴볼 패턴이 있습니다.",
    description: "소개팅은 나가지만 다음 만남으로 이어지지 않거나, 비슷한 고민이 반복된다면 시작점을 찾아야 합니다. 연애 경험, 대화 습관, 다가가는 방식과 관계에서의 태도를 함께 분석해 나에게 필요한 개선 순서를 잡습니다.",
    audience: "연애가 어려운 이유와 나에게 필요한 변화를 알고 싶은 분",
    features: ["연애 경험·성향 종합 분석", "대화·관계 형성 습관 점검", "소개팅 실전에서의 개선 방향", "개인별 실천 우선순위 제안", "사진 기반 스타일링 제안 1회"], featured: false,
  },
  {
    id: "intensive", name: "2주 집중 연애코칭", duration: "2주", price: 149000,
    tagline: "아는 것에서 끝내지 않고, 직접 연습하도록.",
    description: "좋은 조언도 내 상황에 적용해봐야 달라집니다. 2주 동안 주 3회 카카오톡 코칭으로 대화와 호감 표현을 연습하고, 실제 소개팅과 썸에서 겪은 상황을 피드백받습니다. 작은 과제를 실천하며 나에게 맞는 소통 방식을 찾아갑니다.",
    audience: "다가오는 소개팅이나 현재의 썸에 실전 피드백이 필요한 분",
    features: ["초기 연애 성향 분석", "주 3회 카카오톡 코칭 · 총 6회", "말투·대화 습관 개선 훈련", "소개팅·썸 상황별 실전 피드백", "개인별 맞춤 과제", "사진 기반 스타일링 제안 1회"], featured: true,
  },
  {
    id: "premium", name: "4주 프리미엄 연애코칭", duration: "4주", price: 249000,
    tagline: "한 번의 답장보다, 오래 이어질 관계의 힘을.",
    description: "관계가 시작되는 순간부터 가까워지는 과정까지, 내 습관을 충분히 살펴보고 바꾸고 싶다면. 4주간 심층 분석과 반복 연습, 실전 피드백과 개선 점검을 이어갑니다. 내 의사를 편안하게 전하고 상대를 이해하는 힘을 기릅니다.",
    audience: "반복되는 연애 습관을 꾸준히 점검하고 개선하고 싶은 분",
    features: ["심층 연애 성향·문제점 분석", "주 3회 맞춤 카카오톡 코칭 · 총 12회", "대화·호감 표현 집중 훈련", "소개팅·썸 상황별 실전 피드백", "맞춤 과제 및 개선 과정 점검", "연애 습관 개선", "사진 기반 스타일링 제안 1회"], featured: false,
  },
];

export const COACHING_MATCH_EVENT = {
  title: "코칭 후, 무료 소개팅 연결 이벤트",
  description: "코칭 후 서로 맞는 분이 있을 경우, 희망하시는 분에 한해 무료 소개팅 연결 서비스도 제공합니다. 이벤트 참여는 선택사항입니다.",
};

export const FAQS = [
  { question: "상담은 어떻게 진행되나요?", answer: "모든 코칭은 카카오톡 1:1 비대면 채팅으로 진행됩니다. 신청과 입금 확인 후 남겨주신 연락처로 연락드려 일정을 조율합니다. 소개팅 실전 코칭도 만남 전 대화 준비와 만남 후 상황 피드백을 카카오톡으로 함께 진행합니다." },
  { question: "연애 경험이 없어도 신청할 수 있나요?", answer: "네. 경험의 유무와 관계없이 현재 상황에 맞춰 진행합니다. 이성과 대화를 시작하는 방법, 나를 표현하는 방법 등 필요한 부분부터 차근차근 연습할 수 있습니다." },
  { question: "어떤 프로그램을 선택하면 좋을까요?", answer: "하나의 고민을 정리하려면 30분 고민 상담, 실제 대화를 살펴보려면 카톡·말투 개선 코칭, 반복되는 어려움의 원인을 찾으려면 60분 종합 진단을 권합니다. 실전 연습과 꾸준한 피드백을 원하시면 2주 또는 4주 코칭을 선택해주세요. 무료 자가진단이나 무료 상담 신청으로 먼저 도움받을 수도 있습니다." },
  { question: "신청과 결제는 어떻게 하나요?", answer: "프로그램 선택 후 성함·연락처·입금자명을 작성해주세요. 안내된 우체국은행 계좌로 해당 프로그램 금액을 입금하시면, 입금 확인 후 남겨주신 연락처로 연락드립니다. 계좌이체 방식으로 운영합니다." },
  { question: "2주와 4주 코칭은 무엇이 다른가요?", answer: "모두 주 3회 카카오톡 코칭을 진행하며 2주는 총 6회, 4주는 총 12회입니다. 2주는 당면한 소개팅·썸 상황의 실전 연습에, 4주는 심층 분석과 반복되는 연애 습관의 개선·점검에 집중합니다. 회차별 일정과 진행 범위는 시작 전 함께 조율합니다." },
  { question: "사진은 꼭 제출해야 하나요?", answer: "아닙니다. 일반 상담에서 사진 제출은 선택사항입니다. 무료 첫인상 진단을 원하시면 본인 사진을 첨부해주세요. 유료 프로그램에는 희망자에 한해 사진 기반 스타일링 제안이 프로그램당 1회 포함됩니다." },
  { question: "코칭 후 무료 소개팅 연결도 받을 수 있나요?", answer: COACHING_MATCH_EVENT.description },
  { question: "상담 내용이나 사진이 공개되나요?", answer: "모든 상담은 100% 비밀유지 원칙으로 진행합니다. 상담 내용과 제출 사진은 담당자의 상담·피드백 목적으로만 사용하며, 동의 없이 후기·홍보 자료로 공개하거나 외부에 공유하지 않습니다. 자세한 보관·파기 기준은 개인정보 처리방침에서 확인할 수 있습니다." },
  { question: "코칭을 받으면 연애에 성공할 수 있나요?", answer: "연애 성공이나 상대의 마음을 보장하지는 않습니다. 인연연구소는 대화 방식, 호감 표현과 관계 형성 태도를 점검하고, 스스로 더 나은 선택과 소통을 할 수 있도록 돕습니다." },
  { question: "무료 상담과 유료 코칭은 무엇이 다른가요?", answer: "무료 상담은 남겨주신 고민을 확인하고 현재 상황과 적합한 프로그램을 안내하는 과정입니다. 실제 대화 분석, 구체적인 연습과 지속적인 피드백은 선택하신 유료 프로그램의 범위에 따라 진행합니다. 무료 첫인상 진단은 사진과 스타일링 고민에 대한 간단한 피드백을 카카오톡으로 제공합니다." },
  { question: "취소·환불은 어떻게 요청하나요?", answer: "카카오톡으로 신청자 성함·연락처·프로그램명을 알려주세요. 코칭 시작 전 또는 일부 진행 후 등 이용 상태를 확인하여 취소·환불 절차와 금액을 안내합니다. 자세한 내용은 하단의 취소 및 환불 안내를 확인해주세요." },
];

export const CONCERNS = [
  { id: "date", label: "소개팅이 다음 만남으로 이어지지 않아요", short: "소개팅", program: "diagnosis", reason: "첫 만남의 대화와 호감 표현, 만남 이후의 소통까지 함께 점검하고 개선 순서를 잡아보세요." },
  { id: "flirting", label: "썸에서 연애로 나아가고 싶어요", short: "썸·호감 표현", program: "intensive", reason: "상황에 맞는 호감 표현과 만남 제안을 연습하고, 실제 반응을 바탕으로 피드백받아보세요." },
  { id: "conflict", label: "연애 중 갈등을 풀고 싶어요", short: "연애 중 갈등", program: "consultation", reason: "지금의 갈등을 정리하고, 내 마음과 원하는 바를 상대에게 어떻게 전할지 함께 살펴보세요." },
  { id: "chat", label: "카톡과 이성 대화가 어려워요", short: "카톡·대화", program: "conversation", reason: "실제 대화에서 막히는 지점을 찾고, 질문·답장·말투를 나에게 맞는 표현으로 바꿔보세요." },
  { id: "style", label: "첫인상과 스타일을 바꾸고 싶어요", short: "첫인상·스타일", program: "free", reason: "본인 사진과 고민을 남기면 어울리는 헤어·의상과 첫인상 개선 방향을 카카오톡으로 안내해드립니다." },
  { id: "habit", label: "비슷한 연애 고민이 계속 반복돼요", short: "반복되는 연애 습관", program: "premium", reason: "심층 분석과 꾸준한 연습으로 반복되는 습관을 살피고, 변화하는 과정을 함께 점검해보세요." },
] as const;

export const QUIZ_QUESTIONS = [
  { text: "호감이 가는 사람에게 먼저 대화를 시작하는 것이 어렵다.", dimension: "confidence" },
  { text: "카톡을 보낼 때 무슨 말을 해야 할지 오래 고민한다.", dimension: "conversation" },
  { text: "소개팅에서 질문만 주고받다 대화가 끝나곤 한다.", dimension: "conversation" },
  { text: "좋아하는 마음을 언제, 어떻게 표현해야 할지 모르겠다.", dimension: "expression" },
  { text: "상대의 답장 속도나 작은 반응에 쉽게 불안해진다.", dimension: "relationship" },
  { text: "내 장점을 자연스럽게 보여주는 것이 어렵다.", dimension: "confidence" },
  { text: "다음 만남을 제안할 타이밍을 자주 놓친다.", dimension: "expression" },
  { text: "갈등이 생기면 내 마음이나 원하는 바를 말하기 어렵다.", dimension: "relationship" },
  { text: "상대가 편하게 이어갈 수 있는 질문을 만드는 것이 어렵다.", dimension: "conversation" },
  { text: "관계에서 비슷한 어려움을 반복하지만 이유를 잘 모르겠다.", dimension: "relationship" },
] as const;

export type Dimension = (typeof QUIZ_QUESTIONS)[number]["dimension"];
export const DIMENSIONS: Record<Dimension, { name: string; type: string; tip: string; program: string }> = {
  confidence: { name: "다가가기·자기표현", type: "천천히 마음을 여는 신중형", tip: "멋진 첫마디보다 짧고 편안한 인사부터 시작해보세요. 내 일상과 관심사 한 가지를 먼저 나누는 연습이 도움이 됩니다.", program: "diagnosis" },
  conversation: { name: "카톡·대화 흐름", type: "대화의 실마리를 찾는 탐색형", tip: "질문 뒤에 내 경험 한 줄을 더해보세요. 질문과 답만 주고받는 흐름에서 벗어나 서로의 이야기를 나눌 수 있습니다.", program: "conversation" },
  expression: { name: "호감 표현·만남 제안", type: "표현의 타이밍을 배우는 조심형", tip: "‘언제 한번 봐요’ 대신 ‘이야기 즐거웠어요. 이번 주말에 커피 한 잔 어때요?’처럼 마음과 제안을 함께 전해보세요.", program: "intensive" },
  relationship: { name: "관계 속 감정 소통", type: "관계의 균형을 찾는 섬세형", tip: "상대의 의도를 추측하기 전에 내가 느낀 감정과 원하는 바를 구분해 적어보세요. 차분한 대화를 준비하는 데 도움이 됩니다.", program: "premium" },
};

export function calculateDiagnosis(answers: number[]) {
  if (answers.length !== QUIZ_QUESTIONS.length || Array.from(answers).some(v => !Number.isInteger(v) || v < 0 || v > 2)) throw new Error("모든 문항에 답변해주세요.");
  const scores = Object.fromEntries(Object.keys(DIMENSIONS).map(key => [key, 0])) as Record<Dimension, number>;
  const counts = { confidence: 0, conversation: 0, expression: 0, relationship: 0 };
  QUIZ_QUESTIONS.forEach((q, i) => { scores[q.dimension] += answers[i]; counts[q.dimension]++; });
  const domains = (Object.keys(DIMENSIONS) as Dimension[]).map(key => ({ key, score: scores[key] / (counts[key] * 2) }));
  const highest = [...domains].sort((a, b) => b.score - a.score)[0];
  const comfortable = domains.every(d => d.score < 0.5);
  return { domains, focus: highest.key, comfortable, programId: comfortable ? "consultation" : DIMENSIONS[highest.key].program };
}

export type ApplicationKind = "consultation" | "impression" | "paid";
export type CoachingApplication = {
  id: string; kind: ApplicationKind; name: string; phone: string; kakaoId: string;
  age: string; gender: string; concern: string; direction: string; preferredAt: string;
  programId: string; programName: string; price: number; depositor: string;
  requestedProgramName: string; adultConsent: true; termsConsent: boolean;
  photoPath: string | null; privacyConsent: true; photoConsent: boolean; consentVersion: string;
  status: "received" | "contacted" | "paid" | "completed";
  createdAt: string; updatedAt: string;
};

export const APPLICATION_LABELS = { consultation: "무료 상담", impression: "무료 첫인상 진단", paid: "유료 코칭 신청" };
export const STATUS_LABELS = { received: "접수", contacted: "연락 완료", paid: "입금 확인", completed: "진행 완료" };
