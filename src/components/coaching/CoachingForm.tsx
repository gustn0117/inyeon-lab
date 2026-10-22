"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, CheckCircle, LockKey, UploadSimple, X } from "@phosphor-icons/react";
import { BANK_ACCOUNT, type ApplicationKind, type Program, won } from "@/lib/coaching";
import { trackCoachingEvent } from "@/lib/analytics";
import { KAKAO_ID } from "@/lib/contact";
import KakaoIdButton from "./KakaoIdButton";
import s from "./coaching.module.css";

export function BankDetails({ price }: { price: number }) {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout>>();
  useEffect(() => () => { if (timeout.current) clearTimeout(timeout.current); }, []);
  const copy = async () => {
    try { await navigator.clipboard.writeText(BANK_ACCOUNT.number); setCopied(true); setCopyError(false); timeout.current = setTimeout(() => setCopied(false), 2200); }
    catch { setCopyError(true); }
  };
  return <div className={s.bankBox}><h3>계좌이체 안내</h3><p>{BANK_ACCOUNT.bank} · 예금주 {BANK_ACCOUNT.holder}</p><strong className={s.bankNumber}>{BANK_ACCOUNT.number}</strong><button type="button" className={s.copyButton} onClick={copy}>{copied ? "계좌번호를 복사했어요 ✓" : "계좌번호 복사"}</button>{copyError && <p role="status" style={{ marginTop: 8 }}>위 계좌번호를 길게 눌러 복사해주세요.</p>}<div className={s.price}>{won(price)}<small>입금 금액</small></div><p>입금 확인 후 남겨주신 연락처로 연락드려<br />상담 일정을 확정합니다.</p></div>;
}

export default function CoachingForm({ mode, initialKind = "consultation", initialProgramId = "", initialPrograms = null, compact = false }: { compact?: boolean; mode: "free" | "paid"; initialKind?: ApplicationKind; initialProgramId?: string; initialPrograms?: Program[] | null }) {
  const paid = mode === "paid";
  const [kind, setKind] = useState<ApplicationKind>(paid ? "paid" : initialKind === "impression" ? "impression" : "consultation");
  const [programs, setPrograms] = useState(initialPrograms);
  const [programId, setProgramId] = useState(initialPrograms?.some(p => p.id === initialProgramId) ? initialProgramId : "");
  const selected = programs?.find(p => p.id === programId);
  const [photo, setPhoto] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [photoError, setPhotoError] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [receipt, setReceipt] = useState<{ id: string; kind: ApplicationKind; name: string; programName: string; price: number } | null>(null);
  const requestId = useRef("");
  const fileInput = useRef<HTMLInputElement>(null);
  const success = useRef<HTMLDivElement>(null);
  const checkoutTracked = useRef(false);

  useEffect(() => { if (!photo) { setPreview(""); return; } const url = URL.createObjectURL(photo); setPreview(url); return () => URL.revokeObjectURL(url); }, [photo]);
  useEffect(() => { if (receipt) success.current?.focus(); }, [receipt]);
  useEffect(() => { if (selected && !checkoutTracked.current) { checkoutTracked.current = true; trackCoachingEvent("InitiateCheckout", { content_ids: selected.id, value: selected.price, currency: "KRW" }); } }, [selected]);

  const refreshPrograms = async () => {
    setRefreshing(true);
    try { const res = await fetch("/api/coaching/programs", { cache: "no-store" }); const data = await res.json(); if (!res.ok || !Array.isArray(data.programs)) throw new Error(); setPrograms(data.programs); }
    catch { setError("프로그램 정보를 불러오지 못했습니다. 잠시 후 다시 시도해주세요."); }
    finally { setRefreshing(false); }
  };
  const choosePhoto = (file: File | undefined) => {
    setPhotoError("");
    if (!file) { setPhoto(null); return; }
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type) || file.size > 5 * 1024 * 1024) { setPhotoError("JPG·PNG·WebP 형식의 5MB 이하 사진을 선택해주세요."); setPhoto(null); if (fileInput.current) fileInput.current.value = ""; return; }
    setPhoto(file);
  };
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (busy) return;
    if (paid && !selected) { setError("신청할 프로그램을 먼저 선택해주세요."); return; }
    if (kind === "impression" && !photo) { setPhotoError("첫인상 진단을 위한 본인 사진을 첨부해주세요."); fileInput.current?.focus(); return; }
    const form = event.currentTarget;
    const data = new FormData(form);
    if (!requestId.current) requestId.current = crypto.randomUUID();
    data.set("requestId", requestId.current); data.set("kind", kind);
    if (selected) { data.set("programId", selected.id); data.set("expectedPrice", String(selected.price)); }
    data.delete("photo"); if (photo) data.set("photo", photo);
    setBusy(true); setError("");
    try {
      const res = await fetch("/api/coaching/applications", { method: "POST", body: data });
      const result = await res.json();
      if (!res.ok || result.ok !== true) { if (res.status === 409 && paid) await refreshPrograms(); throw new Error(result.error || "신청을 저장하지 못했습니다. 다시 시도해주세요."); }
      trackCoachingEvent("Lead", { content_name: kind, ...(selected ? { content_ids: selected.id } : {}) });
      setReceipt({ id: result.id, kind, name: String(data.get("name")), programName: selected?.name ?? "", price: selected?.price ?? 0 });
      setPhoto(null); form.reset();
    } catch (err) { setError(err instanceof Error ? err.message : "네트워크 연결을 확인하고 다시 시도해주세요."); }
    finally { setBusy(false); }
  };

  if (receipt) return <div className={s.success} role="status" tabIndex={-1} ref={success}><span className={s.successIcon}><CheckCircle size={34} weight="light" /></span><h2>{receipt.name}님,<br />신청이 접수되었습니다.</h2>{paid ? <><p><strong>{receipt.programName}</strong> 신청 내용을 확인했습니다.<br />아래 계좌로 안내 금액을 입금해주세요.<br />신청서 제출만으로 입금이 확인되지는 않습니다.</p><BankDetails price={receipt.price} /><p>입금 확인 후 남겨주신 연락처로 연락드립니다.<br />일정은 담당자와 조율한 뒤 확정됩니다.</p></> : <p>{receipt.kind === "impression" ? "사진과 고민을 확인한 후 카카오톡으로 무료 피드백을 안내해드립니다." : "남겨주신 고민과 질문을 확인한 후 연락드려 상담을 안내해드립니다."}<br />상담 내용과 사진은 동의 없이 공개하지 않습니다.</p>}<p className={s.note}>접수번호 {receipt.id.slice(0, 8).toUpperCase()}</p><p className={s.successKakao}>카카오톡에서 ID <strong>{KAKAO_ID}</strong>을 친구 추가한 뒤 접수번호와 함께 문의해주세요.</p><div className={s.actions}><KakaoIdButton className={s.kakao} /><Link href="/" className={s.secondary}>홈으로 돌아가기</Link></div></div>;

  return <form onSubmit={submit} encType="multipart/form-data">
    {!paid && <div className={s.formTabs} role="group" aria-label="무료 신청 유형"><button type="button" className={`${s.formTab} ${kind === "consultation" ? s.formTabActive : ""}`} aria-pressed={kind === "consultation"} onClick={() => { setKind("consultation"); setError(""); }}>무료 상담 신청</button><button type="button" className={`${s.formTab} ${kind === "impression" ? s.formTabActive : ""}`} aria-pressed={kind === "impression"} onClick={() => { setKind("impression"); setError(""); }}>무료 첫인상 진단</button></div>}
    <fieldset disabled={busy} style={{ border: 0, padding: 0, margin: 0, minWidth: 0 }}>
      {paid && <><fieldset className={s.programRadios}><legend>01. 신청할 프로그램을 선택해주세요.</legend>{programs ? programs.map(program => <label className={s.programRadio} key={program.id}><input type="radio" name="programId" value={program.id} required checked={programId === program.id} onChange={() => setProgramId(program.id)} /><span className={s.programRadioBody}><strong>{program.name}</strong><small>{program.duration} · {program.tagline}</small></span><span className={s.programRadioPrice}>{won(program.price)}</span></label>) : <div className={s.notice}>프로그램 정보를 불러오지 못했습니다.<br /><button type="button" className={s.textButton} onClick={refreshPrograms} disabled={refreshing}>{refreshing ? "확인 중…" : "프로그램 정보 다시 불러오기"}</button></div>}</fieldset>{selected ? <><BankDetails price={selected.price} /><details className={s.consentDetails} style={{ marginBottom: 28 }}><summary>{selected.name} 포함 내용 확인</summary><ul style={{ paddingLeft: 16, marginTop: 10 }}>{selected.features.map(feature => <li key={feature}>{feature}</li>)}</ul></details></> : <p className={s.formHint} style={{ marginTop: 18 }}>프로그램을 선택하면 입금 금액과 계좌번호가 표시됩니다.</p>}</>}
      <h2 className={s.formTitle} data-compact-hidden={compact || undefined}>{paid ? "02. 신청자 정보를 남겨주세요." : kind === "impression" ? "나를 잘 보여주는 첫인상을 찾아보세요." : "지금의 고민을 편하게 들려주세요."}</h2>
      <p className={s.formHint} data-compact-hidden={compact || undefined}>{paid ? "입금 확인 후 아래 연락처로 연락드립니다. 입금자명이 다르면 꼭 실제 입금자명을 적어주세요." : kind === "impression" ? "본인 사진과 스타일링 고민을 남겨주시면 카카오톡으로 간단한 무료 피드백을 제공합니다." : "고민, 궁금한 점, 원하는 상담 방향을 이 신청서에 함께 적어주세요. 사진은 필요할 때만 선택해 첨부할 수 있습니다."}<br /><span className={s.required}>*</span> 필수 입력 항목</p>
      <div className={s.honeypot} aria-hidden="true"><label htmlFor="website">웹사이트</label><input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" /></div>
      <div className={s.formGrid} data-compact-grid>
        <div className={s.field}><label htmlFor="applicant-name">{paid ? "성함" : "이름 또는 닉네임"}<span className={s.required}>*</span></label><input id="applicant-name" name="name" className={s.input} required maxLength={40} autoComplete="name" placeholder={paid ? "신청자 성함" : "어떻게 불러드릴까요?"} /></div>
        <div className={s.field}><label htmlFor="applicant-phone">연락처<span className={s.required}>*</span></label><input id="applicant-phone" name="phone" className={s.input} type="tel" inputMode="tel" autoComplete="tel" required pattern="01[016789][\- ]?[0-9]{3,4}[\- ]?[0-9]{4}" maxLength={14} placeholder="010-1234-5678" /></div>
        {paid && <div className={`${s.field} ${s.full}`}><label htmlFor="depositor">입금자명<span className={s.required}>*</span></label><input id="depositor" name="depositor" className={s.input} required maxLength={40} placeholder="실제 입금하실 분의 성함" /></div>}
        <div data-compact-hidden={compact || undefined} className={`${s.field} ${s.full}`}><label htmlFor="kakao-id">카카오톡 ID<span className={s.optional}>선택</span></label><input id="kakao-id" name="kakaoId" className={s.input} maxLength={60} placeholder="전화번호로 친구 추가가 안 된다면 남겨주세요." /><p className={s.fieldHelp}>카카오톡 연락이 어려운 경우 남겨주신 휴대전화로 연결 방법을 안내합니다.</p></div>
        {!paid && <><div data-compact-hidden={compact || undefined} className={s.field}><label htmlFor="age">만 나이<span className={s.optional}>선택</span></label><input id="age" name="age" className={s.input} type="number" min={19} max={120} inputMode="numeric" placeholder="예: 28" /></div><div data-compact-hidden={compact || undefined} className={s.field}><label htmlFor="gender">성별<span className={s.optional}>선택</span></label><select id="gender" name="gender" className={s.input} defaultValue=""><option value="">선택해주세요.</option><option>여성</option><option>남성</option><option>응답하지 않음</option></select></div></>}
        {!paid && programs && <div data-compact-hidden={compact || undefined} className={`${s.field} ${s.full}`}><label htmlFor="requested-program">희망 프로그램<span className={s.optional}>선택</span></label><select id="requested-program" name="requestedProgramId" className={s.input} defaultValue=""><option value="">어떤 코칭이 좋을지 추천받고 싶어요.</option>{programs.map(program => <option key={program.id} value={program.id}>{program.name} · {won(program.price)}</option>)}</select></div>}
        <div data-compact-hidden={compact || undefined} className={`${s.field} ${s.full}`}><label htmlFor="direction">원하는 상담 방향<span className={s.optional}>선택</span></label><select id="direction" name="direction" className={s.input} defaultValue=""><option value="">함께 정하고 싶어요.</option><option>소개팅 실전 및 만남 후 피드백</option><option>썸·호감 표현</option><option>카톡·대화 방식</option><option>연애 중 갈등 및 소통</option><option>연애 성향·습관 점검</option><option>첫인상·외모·스타일링</option><option>나에게 맞는 프로그램 추천</option></select></div>
        <div className={`${s.field} ${s.full}`}><label htmlFor="concern">{kind === "impression" ? "첫인상·스타일링 고민과 질문" : "현재 상황, 고민과 질문"}{!paid ? <span className={s.required}>*</span> : <span className={s.optional}>선택</span>}</label><textarea id="concern" name="concern" className={`${s.input} ${s.textarea}`} required={!paid} maxLength={5000} placeholder={kind === "impression" ? "평소 스타일, 소개팅을 앞두고 신경 쓰이는 부분, 바꾸고 싶은 인상 등을 편하게 적어주세요." : "지금 어떤 상황인지, 가장 어려운 점과 코칭을 통해 도움받고 싶은 내용을 적어주세요. 궁금한 질문도 함께 남겨주셔도 좋습니다."} /><p className={s.fieldHelp}>최대 5,000자 · 상대의 이름·연락처 등 제3자의 개인정보는 가려주세요.</p></div>
        <div data-compact-hidden={compact || undefined} className={`${s.field} ${s.full}`}><label htmlFor="preferred-at">희망 상담 날짜 및 시간<span className={s.optional}>선택</span></label><input id="preferred-at" name="preferredAt" className={s.input} type="datetime-local" /><p className={s.fieldHelp}>한국 시간 기준 희망 일정입니다. 담당자와 조율 후 확정됩니다.</p></div>
        <div className={`${s.field} ${s.full}`}><label htmlFor="photo">본인 사진 첨부{kind === "impression" ? <span className={s.required}>*</span> : <span className={s.optional}>선택</span>}</label><div className={s.upload} data-compact-upload>{preview ? <><img src={preview} alt="첨부한 본인 사진 미리보기" className={s.photoPreview} /><button type="button" className={s.textButton} style={{ fontSize: 12, margin: "0 auto" }} onClick={() => { setPhoto(null); if (fileInput.current) fileInput.current.value = ""; }}><X size={13} /> 사진 삭제</button></> : <><UploadSimple size={26} weight="light" /><p style={{ fontSize: 12 }}>상담·첫인상 피드백에 필요한 본인 사진 1장</p></>}<div className={s.uploadPicker}><button type="button" className={s.uploadPick} onClick={() => fileInput.current?.click()} aria-describedby="photo-help">{photo ? "사진 변경" : "사진 선택"}</button><span className={s.uploadName}>{photo?.name ?? "선택된 사진이 없습니다."}</span></div><input id="photo" name="photo" ref={fileInput} className={s.fileInput} tabIndex={-1} type="file" accept="image/jpeg,image/png,image/webp" required={kind === "impression" && !photo} onChange={event => choosePhoto(event.target.files?.[0])} aria-describedby="photo-help" /></div><p id="photo-help" className={s.fieldHelp}>JPG·PNG·WebP · 최대 5MB · 사진은 비공개로 보관하며 동의 없이 공개하지 않습니다.</p>{photoError && <p role="alert" className={s.error}>{photoError}</p>}{photo && <label className={s.checkLabel}><input name="photoConsent" type="checkbox" value="true" required /><span>첨부 사진을 상담·첫인상·스타일링 피드백 목적으로 수집·이용하는 데 동의합니다. 사진은 목적 달성 후 파기하며, 홍보 자료로 사용하지 않습니다.<span className={s.required}>(사진 첨부 시 필수)</span></span></label>}</div>
      </div>
      <div className={s.consent} data-compact-consent><label className={s.checkLabel}><input type="checkbox" name="adultConsent" value="true" required /><span>만 19세 이상입니다.<span className={s.required}>(필수)</span></span></label><label className={s.checkLabel}><input type="checkbox" name="privacyConsent" value="true" required /><span><Link href="/privacy" target="_blank" rel="noopener noreferrer">개인정보 수집·이용</Link>에 동의합니다.<span className={s.required}>(필수)</span></span></label><details className={s.consentDetails}><summary>개인정보 수집·이용 내용 확인</summary><p>목적: 신청 확인, 상담 연락, 코칭·피드백 제공{paid ? ", 입금 확인" : ""}<br />필수 항목: 이름·연락처{paid ? "·입금자명·선택 프로그램" : "·고민 및 질문"}, 동의 여부<br />선택 항목: 카카오톡 ID, 나이, 성별, 희망 프로그램, 상담 방향, 희망 일정, 첨부 사진, 유료 신청 시 고민 내용<br />보유 기간: 상담·서비스 제공 목적 달성 후 지체 없이 파기합니다. 다만 거래 내역 등 관계 법령에 따라 보관해야 하는 정보는 해당 기간 동안 분리 보관합니다.<br />동의를 거부할 수 있으며, 필수 항목에 동의하지 않으면 신청이 어렵습니다. 선택 항목 미제공 시에도 일반 상담을 신청할 수 있으나, 사진 기반 진단에는 본인 사진이 필요합니다.</p></details>{paid && <label className={s.checkLabel}><input type="checkbox" name="termsConsent" value="true" required /><span>선택한 프로그램·금액, <Link href="/terms" target="_blank" rel="noopener noreferrer">이용약관</Link>과 <Link href="/refund" target="_blank" rel="noopener noreferrer">취소 및 환불 안내</Link>를 확인했습니다.<span className={s.required}>(필수)</span></span></label>}</div>
      {error && <div className={s.error} role="alert">{error}</div>}
      <button type="submit" data-compact-submit className={`${s.primary} ${s.formSubmit}`} disabled={busy || (paid && !programs)}>{busy ? "신청 내용을 안전하게 저장하고 있어요…" : "신청 접수하기"}{!busy && <ArrowUpRight size={17} />}</button>
      <p className={s.micro} style={{ justifyContent: "center" }}><LockKey size={13} /> 상담 내용과 사진은 동의 없이 공개하지 않습니다.</p>
      {paid && <p className={s.note}>신청서 제출 후 계좌이체를 진행해주세요. 입금 확인 후 남겨주신 연락처로 연락드립니다. 상담 희망일은 예약 확정일이 아닙니다.</p>}
    </fieldset>
  </form>;
}
