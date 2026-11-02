"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import l from "./landing.module.css";

// 운영자가 보내준 소개팅 후기 카카오톡 캡처(2026-11-02, 원본은 1102/) — 이름은 오픈채팅 무작위 닉네임, 프로필은 캐릭터·모자이크.
// 가장자리에 잘린 말풍선과 2번 왼쪽 위 프로필 사진 조각만 정리해 public/reviews/에 두었다. alt에는 화면 읽기용으로 대화 내용을 옮겨 둔다.
const REVIEWS = [
  { src: "/reviews/match-review-01.jpg", width: 1080, height: 420, text: "“한번 더 보기로 했어요! 이번주 토요일이요! 생각보다 나이 차이가 안 느껴지더라구용”" },
  { src: "/reviews/match-review-02.jpg", width: 964, height: 478, text: "“네네 만났어요~ 내일 한번 더 뵙기로 했습니다” — 매니저 답장 “오 다행입니다 :) 좋은 소식 있으시길 바랍니다!”" },
  { src: "/reviews/match-review-03.jpg", width: 1080, height: 1059, text: "“이번에는 월요일에 만날 수 있을 것 같습니다. 좋은 분 같았습니다. 좀 더 이야기해 봐야 알겠지만 행복한 가정에서 잘 지낸 좋은 분 같습니다. 저는 요리 좋아하는 사람을 좋아해서 좋은 감정으로 보려고 합니다.” — 매니저 답장 “잘되시면 좋겠습니다 ㅎㅎ”" },
  { src: "/reviews/match-review-04.jpg", width: 1080, height: 500, text: "“항상 안부 물어주시는 것도 너무 감사하구, 사실 매니저님만큼 잘 소개시켜 주는 분도 없기에… 다시 연락드리게 되었습니다!!”" },
  { src: "/reviews/match-review-05.jpg", width: 1080, height: 549, text: "“안녕하세요? 간호사분 괜찮으셔서 내일 또 보기로 했습니다!”" },
  { src: "/reviews/match-review-06.jpg", width: 1080, height: 597, text: "“저 여기 너무 마음에 드는데, 제 주위 친구들 매니저님 소개시켜 드려도 되나요?”" },
  { src: "/reviews/match-review-07.jpg", width: 1080, height: 549, text: "“안녕하세요 매니저님! 꾸준한 매칭 감사해요..! 조건도 마음에 들어요 ㅎㅎ”" },
  { src: "/reviews/match-review-08.jpg", width: 1080, height: 471, text: "“저 정말 좋은 업체 만난 것 같아서 기분이 너무 좋고 설레요”" },
];

export default function ReviewStrip() {
  const track = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    // 띠 높이는 지금 보이는 카드(절반 넘게 보이는 것) 중 가장 긴 것에 맞춘다 — 가장 긴 3번에 고정하면 휴대폰에서 짧은 캡처 아래위가 휑하다
    const fit = () => {
      const box = el.getBoundingClientRect();
      const shown = Array.from(el.querySelectorAll("li")).filter(li => { const r = li.getBoundingClientRect(); return Math.min(r.right, box.right) - Math.max(r.left, box.left) >= r.width / 2; });
      const tallest = Math.max(0, ...shown.map(li => li.offsetHeight));
      el.style.height = tallest ? `${tallest}px` : "";
    };
    let timer: ReturnType<typeof setTimeout> | undefined;
    const update = () => {
      setEdge({ start: el.scrollLeft < 4, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 4 });
      clearTimeout(timer);
      timer = setTimeout(fit, 90);
    };
    fit();
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { el.removeEventListener("scroll", update); window.removeEventListener("resize", update); clearTimeout(timer); };
  }, []);
  // 화면에 다 보이는 카드 수만큼 넘긴다 — 컴퓨터는 몇 장씩, 휴대폰은 한 장씩
  const move = (direction: 1 | -1) => {
    const el = track.current;
    const card = el?.querySelector("li");
    if (!el || !card?.parentElement || (direction < 0 ? edge.start : edge.end)) return;
    const step = card.getBoundingClientRect().width + parseFloat(getComputedStyle(card.parentElement).columnGap || "0");
    const page = Math.max(1, Math.floor((el.clientWidth + 1) / step)) * step;
    el.scrollBy({ left: direction * page, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };
  // 넘김 버튼은 띠 위에 둔다 — 띠 높이가 카드마다 바뀌어도 버튼 자리는 그대로.
  // 끝에 닿으면 disabled 대신 aria-disabled — disabled로 바뀌는 순간 키보드 초점이 버튼에서 빠져 위치를 잃는다
  return <div data-editorial-reveal>
    <div className={l.reviewNav}>
      <button type="button" onClick={() => move(-1)} aria-disabled={edge.start} aria-label="이전 후기 보기"><CaretLeft size={18} weight="bold" aria-hidden="true" /></button>
      <button type="button" onClick={() => move(1)} aria-disabled={edge.end} aria-label="다음 후기 보기"><CaretRight size={18} weight="bold" aria-hidden="true" /></button>
    </div>
    <div ref={track} className={l.reviewTrack} role="region" aria-label="소개팅 후기 캡처 — 옆으로 넘겨 볼 수 있어요" tabIndex={0}>
      <ul>{REVIEWS.map((review, i) => <li key={review.src}><Image src={review.src} width={review.width} height={review.height} alt={`소개팅 후기 ${i + 1}: ${review.text}`} sizes="(max-width: 900px) 84vw, 372px" quality={90} /></li>)}</ul>
    </div>
  </div>;
}
