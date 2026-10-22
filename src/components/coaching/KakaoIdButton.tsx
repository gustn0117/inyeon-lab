"use client";

import { ChatCircleDots } from "@phosphor-icons/react";
import { KAKAO_COPIED_EVENT, KAKAO_ID } from "@/lib/contact";

// 카카오톡 ID를 복사하는 버튼 — ID로 바로 친구 추가하는 링크는 카카오톡이 제공하지 않아 복사 후 붙여넣게 한다.
// 복사 결과 안내는 QuickActions가 화면 아래에 띄운다.
export async function copyKakaoId() {
  let copied = false;
  try { await navigator.clipboard.writeText(KAKAO_ID); copied = true; }
  catch {
    const field = document.createElement("textarea");
    field.value = KAKAO_ID; field.style.position = "fixed"; field.style.opacity = "0";
    document.body.appendChild(field); field.select();
    try { copied = document.execCommand("copy"); } catch {}
    field.remove();
  }
  window.dispatchEvent(new CustomEvent(KAKAO_COPIED_EVENT, { detail: { copied } }));
}

export default function KakaoIdButton({ className, children = <><ChatCircleDots size={18} weight="fill" aria-hidden="true" /> 카카오톡 ID {KAKAO_ID} 복사</> }: { className?: string; children?: React.ReactNode }) {
  return <button type="button" className={className} onClick={copyKakaoId}>{children}</button>;
}
