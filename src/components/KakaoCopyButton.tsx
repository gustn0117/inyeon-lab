import { KAKAO_OPEN_CHAT_URL } from "@/lib/contact";

type Props = { variant?: "yellow" | "pill"; className?: string };

export default function KakaoCopyButton({ variant = "yellow", className = "" }: Props) {
  if (variant === "pill") {
    return (
      <a
        href={KAKAO_OPEN_CHAT_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="카카오톡 오픈채팅 상담 열기"
        className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-yellow-300 text-[#3C1E1E] font-bold text-sm hover:scale-[1.02] transition-transform ${className}`}
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3C6.477 3 2 6.463 2 10.691c0 2.735 1.81 5.13 4.533 6.478l-.926 3.408c-.082.3.258.546.521.378l3.96-2.532c.618.094 1.257.144 1.912.144 5.523 0 10-3.463 10-7.876C22 6.463 17.523 3 12 3z" /></svg>
        카카오톡 상담하기
      </a>
    );
  }

  return (
    <a
      href={KAKAO_OPEN_CHAT_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="카카오톡 오픈채팅 상담 열기"
      className={`btn bg-yellow-300 text-[#3C1E1E] hover:bg-yellow-400 w-full sm:w-auto shadow-md font-bold ${className}`}
    >
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3C6.477 3 2 6.463 2 10.691c0 2.735 1.81 5.13 4.533 6.478l-.926 3.408c-.082.3.258.546.521.378l3.96-2.532c.618.094 1.257.144 1.912.144 5.523 0 10-3.463 10-7.876C22 6.463 17.523 3 12 3z" /></svg>
      카카오톡 상담 연결
    </a>
  );
}
