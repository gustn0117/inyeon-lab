"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import { APPLICATION_LABELS, STATUS_LABELS, type CoachingApplication, type Program, won } from "@/lib/coaching";

const button = "rounded-lg border border-stone-200 bg-white px-3 py-2 text-xs font-semibold text-stone-700 hover:bg-stone-50 disabled:opacity-50";
const input = "w-full rounded-lg border border-stone-300 bg-white px-3 py-2.5 text-sm text-stone-800 focus:outline-none focus:border-[#742d40]";
const date = (value: string) => new Date(value).toLocaleString("ko-KR", { timeZone: "Asia/Seoul", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" });

function PrivatePhoto({ id, password, close }: { id: string; password: string; close: () => void }) {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    const controller = new AbortController();
    let objectUrl = "";
    fetch(`/api/coaching/applications?photo=${encodeURIComponent(id)}`, { headers: { "x-admin-password": password }, cache: "no-store", signal: controller.signal })
      .then(async res => { if (!res.ok) throw new Error("사진을 불러오지 못했습니다."); const blob = await res.blob(); if (controller.signal.aborted) return; objectUrl = URL.createObjectURL(blob); setUrl(objectUrl); })
      .catch(err => { if (!controller.signal.aborted) setError(err.message || "사진을 불러오지 못했습니다."); });
    return () => { controller.abort(); if (objectUrl) URL.revokeObjectURL(objectUrl); };
  }, [id, password]);
  return <div className="mt-4 rounded-xl border border-stone-200 bg-stone-50 p-4"><div className="flex items-center justify-between mb-3"><p className="text-xs font-semibold text-stone-600">관리자 전용 첨부 사진</p><button type="button" className={button} onClick={close}>사진 닫기</button></div>{error ? <p role="alert" className="text-xs text-red-600">{error}</p> : url ? <img src={url} alt="신청자가 첨부한 상담용 본인 사진" className="mx-auto max-h-[450px] max-w-full rounded-lg object-contain" /> : <p role="status" className="text-xs text-stone-500">사진을 불러오는 중…</p>}</div>;
}

export function CoachingApplicationsAdmin({ password }: { password: string }) {
  const [applications, setApplications] = useState<CoachingApplication[]>([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [photoId, setPhotoId] = useState<string | null>(null);
  const headers = { "x-admin-password": password };
  const load = useCallback(async () => {
    setLoading(true); setError("");
    try {
      const res = await fetch(`/api/coaching/applications?offset=${offset}`, { headers: { "x-admin-password": password }, cache: "no-store" });
      const data = await res.json();
      if (!res.ok || !Array.isArray(data.applications)) throw new Error(data.error || "신청 내역을 불러오지 못했습니다.");
      setApplications(data.applications); setHasMore(data.hasMore === true);
    } catch (err) { setError(err instanceof Error ? err.message : "연결 상태를 확인해주세요."); }
    finally { setLoading(false); }
  }, [password, offset]);
  useEffect(() => { load(); setPhotoId(null); }, [load]);
  const update = async (application: CoachingApplication, status: CoachingApplication["status"]) => {
    setBusy(true); setError("");
    try {
      const res = await fetch("/api/coaching/applications", { method: "PATCH", headers: { ...headers, "Content-Type": "application/json" }, body: JSON.stringify({ id: application.id, status }) });
      const data = await res.json(); if (!res.ok) throw new Error(data.error || "상태를 변경하지 못했습니다.");
      setApplications(current => current.map(item => item.id === application.id ? { ...item, status } : item));
    } catch (err) { setError(err instanceof Error ? err.message : "상태를 변경하지 못했습니다."); }
    finally { setBusy(false); }
  };
  const remove = async (application: CoachingApplication) => {
    if (!confirm(`${application.name}님의 신청과 첨부 사진을 영구 삭제할까요?`)) return;
    setBusy(true); setError("");
    try {
      const res = await fetch(`/api/coaching/applications?id=${encodeURIComponent(application.id)}`, { method: "DELETE", headers });
      const data = await res.json(); if (!res.ok) throw new Error(data.error || "삭제하지 못했습니다.");
      if (applications.length === 1 && offset > 0) setOffset(offset - 50); else await load();
    } catch (err) { setError(err instanceof Error ? err.message : "삭제하지 못했습니다."); }
    finally { setBusy(false); }
  };
  return <section>
    <div className="mb-4 flex flex-wrap items-center justify-between gap-3"><div><h2 className="text-base font-bold text-stone-800">무료 상담 · 소개팅 신청 · 유료 코칭 신청</h2><p className="mt-1 text-xs text-stone-500">입금 내역은 직접 확인 후 상태를 변경해주세요. 사진은 관리자에게만 표시됩니다.</p></div><button type="button" className={button} onClick={load} disabled={loading || busy}>새로고침</button></div>
    {error && <p role="alert" className="mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-700">{error}</p>}
    {loading ? <p role="status" className="p-8 text-center text-sm text-stone-500">신청 내역을 불러오는 중…</p> : !applications.length && !error ? <p className="rounded-xl bg-white p-10 text-center text-sm text-stone-500">접수된 코칭 신청이 없습니다.</p> : <div className="space-y-4">{applications.map(application => <article key={application.id} className="rounded-xl border border-stone-200 bg-white p-5 sm:p-6">
      <div className="flex flex-wrap justify-between gap-3"><div><span className="rounded bg-[#f3e9e7] px-2 py-1 text-[10px] font-bold text-[#742d40]">{APPLICATION_LABELS[application.kind]}</span><h3 className="mt-3 text-lg font-bold text-stone-800">{application.name}</h3><a href={`tel:${application.phone}`} className="text-sm text-[#742d40]">{application.phone}</a>{application.kakaoId && <p className="mt-1 text-xs text-stone-600">카카오톡 ID: {application.kakaoId}</p>}</div><div className="text-right"><p className="text-[11px] text-stone-500">{date(application.createdAt)}</p><p className="mt-1 text-[10px] text-stone-400">접수번호 {application.id.slice(0, 8).toUpperCase()}</p><label className="mt-3 block text-xs text-stone-600">처리 상태<select aria-label={`${application.name}님 처리 상태`} className="ml-2 rounded border border-stone-200 px-2 py-1.5 text-xs" value={application.status} disabled={busy} onChange={event => update(application, event.target.value as CoachingApplication["status"])}>{Object.entries(STATUS_LABELS).filter(([key]) => key !== "paid" || application.kind === "paid").map(([key, label]) => <option key={key} value={key}>{label}</option>)}</select></label></div></div>
      {application.kind === "paid" && <div className="mt-4 rounded-lg bg-stone-50 p-4 text-sm"><strong className="text-[#742d40]">{application.programName} · {won(application.price)}</strong><p className="mt-1 text-xs text-stone-600">입금자명: {application.depositor} · 입금 상태: {application.status === "received" || application.status === "contacted" ? "직접 확인 필요" : "관리자 처리 완료"}</p></div>}
      <dl className="mt-4 grid gap-3 text-xs sm:grid-cols-2">{[["희망 프로그램", application.requestedProgramName], ["만 나이 / 성별", [application.age ? `${application.age}세` : "", application.gender].filter(Boolean).join(" / ")], ["지역 / 직업 / 키", [application.region, application.job, application.height ? `${application.height}cm` : ""].filter(Boolean).join(" / ")], ["희망 상담 방향", application.direction], ["희망 일시 (한국 시간)", application.preferredAt?.replace("T", " ")]].filter(([, value]) => value).map(([label, value]) => <div key={label}><dt className="mb-1 text-stone-400">{label}</dt><dd className="text-stone-700">{value}</dd></div>)}</dl>
      {application.concern && <div className="mt-4 border-t border-stone-100 pt-4"><h4 className="text-xs font-bold text-stone-500">{application.kind === "impression" ? "간단한 자기소개" : "고민 및 질문"}</h4><p className="mt-2 whitespace-pre-wrap break-words text-sm leading-7 text-stone-700">{application.concern}</p></div>}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3"><div className="flex flex-wrap items-center gap-3"><p className="text-[10px] text-stone-400">개인정보 동의 확인 · 사진 {application.photoConsent ? "동의 확인" : "미첨부"} · 동의 버전 {application.consentVersion}</p>{application.photoPath && <button type="button" className={button} onClick={() => setPhotoId(photoId === application.id ? null : application.id)}>첨부 사진 {photoId === application.id ? "닫기" : "보기"}</button>}</div><button type="button" className="text-xs text-red-600 disabled:opacity-50" disabled={busy} onClick={() => remove(application)}>신청·사진 삭제</button></div>
      {photoId === application.id && <PrivatePhoto id={application.id} password={password} close={() => setPhotoId(null)} />}
    </article>)}</div>}
    <div className="mt-5 flex items-center justify-between gap-3"><button type="button" className={button} disabled={offset === 0 || loading} onClick={() => setOffset(offset - 50)}>이전 50건</button><span className="text-xs text-stone-500">{Math.floor(offset / 50) + 1} 페이지</span><button type="button" className={button} disabled={!hasMore || loading} onClick={() => setOffset(offset + 50)}>다음 50건</button></div>
  </section>;
}

export function CoachingProgramsAdmin({ password }: { password: string }) {
  const [programs, setPrograms] = useState<Program[] | null>(null);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const [busy, setBusy] = useState(false);
  const load = useCallback(async () => {
    setError("");
    try { const res = await fetch("/api/coaching/programs", { cache: "no-store" }); const data = await res.json(); if (!res.ok || !Array.isArray(data.programs)) throw new Error(data.error || "프로그램을 불러오지 못했습니다."); setPrograms(data.programs); }
    catch (err) { setError(err instanceof Error ? err.message : "프로그램을 불러오지 못했습니다."); }
  }, []);
  useEffect(() => { load(); }, [load]);
  const change = (id: string, patch: Partial<Program>) => { setSaved(false); setPrograms(current => current?.map(p => p.id === id ? { ...p, ...patch } : p) ?? null); };
  const save = async (event: FormEvent) => {
    event.preventDefault(); setBusy(true); setError(""); setSaved(false);
    try {
      const res = await fetch("/api/coaching/programs", { method: "PUT", headers: { "Content-Type": "application/json", "x-admin-password": password }, body: JSON.stringify({ programs }) });
      const data = await res.json(); if (!res.ok) throw new Error(data.error || "저장하지 못했습니다."); setSaved(true);
    } catch (err) { setError(err instanceof Error ? err.message : "저장하지 못했습니다."); }
    finally { setBusy(false); }
  };
  return <section><h2 className="text-base font-bold text-stone-800">코칭 프로그램 · 가격 관리</h2><p className="mt-2 mb-5 text-xs leading-6 text-stone-500">저장하면 홈페이지, 상세페이지와 신청서에 반영됩니다. 기존 접수 건의 신청 금액은 유지됩니다.</p>{error && <p role="alert" className="mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-700">{error} {!programs && <button type="button" className={button} onClick={load}>다시 불러오기</button>}</p>}{saved && <p role="status" className="mb-4 rounded-lg bg-green-50 p-4 text-sm text-green-800">프로그램 정보가 저장되었습니다.</p>}{programs ? <form onSubmit={save}><fieldset disabled={busy} className="space-y-4">{programs.map(program => <article className="rounded-xl border border-stone-200 bg-white p-5 sm:p-6" key={program.id}><h3 className="mb-4 text-sm font-bold text-[#742d40]">{program.name}</h3><div className="grid gap-4 sm:grid-cols-2"><label className="grid gap-1.5 text-xs text-stone-600">프로그램명<input className={input} value={program.name} required maxLength={100} onChange={event => change(program.id, { name: event.target.value })} /></label><label className="grid gap-1.5 text-xs text-stone-600">기간 / 회차<input className={input} value={program.duration} required maxLength={60} onChange={event => change(program.id, { duration: event.target.value })} /></label><label className="grid gap-1.5 text-xs text-stone-600">전체 이용 금액 (원)<input className={input} type="number" min={1000} max={10000000} step={1} required value={program.price} onChange={event => change(program.id, { price: Number(event.target.value) })} /></label><label className="flex items-center gap-2 self-end py-3 text-xs text-stone-600"><input type="checkbox" checked={program.featured} onChange={event => change(program.id, { featured: event.target.checked })} />프로그램 강조 표시</label><label className="grid gap-1.5 text-xs text-stone-600 sm:col-span-2">한 줄 소개<input className={input} value={program.tagline} maxLength={200} required onChange={event => change(program.id, { tagline: event.target.value })} /></label><label className="grid gap-1.5 text-xs text-stone-600 sm:col-span-2">상세 설명<textarea className={`${input} min-h-[120px]`} value={program.description} maxLength={2000} required onChange={event => change(program.id, { description: event.target.value })} /></label><label className="grid gap-1.5 text-xs text-stone-600 sm:col-span-2">추천 대상<input className={input} value={program.audience} maxLength={500} required onChange={event => change(program.id, { audience: event.target.value })} /></label><label className="grid gap-1.5 text-xs text-stone-600 sm:col-span-2">포함 내용 (한 줄에 하나씩)<textarea className={`${input} min-h-[140px]`} defaultValue={program.features.join("\n")} required maxLength={2400} onBlur={event => change(program.id, { features: event.target.value.split("\n").map(s => s.trim()).filter(Boolean) })} /></label></div></article>)}<button type="submit" disabled={busy} className="rounded-lg bg-[#742d40] px-6 py-3 text-sm font-bold text-white disabled:opacity-50">{busy ? "저장 중…" : "프로그램 정보 저장"}</button></fieldset></form> : !error && <p role="status" className="py-10 text-center text-sm text-stone-500">프로그램을 불러오는 중…</p>}</section>;
}
