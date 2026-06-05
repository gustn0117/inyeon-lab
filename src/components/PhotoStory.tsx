"use client";
import Image from "next/image";

/* ═══ PHOTO STORY — 잡지 화보 스타일 ═══ */
export default function PhotoStory() {
  return (
    <section className="relative py-16 sm:py-20 lg:py-24">
      <div className="container-apple">
        {/* 헤더 — 좌 카피 + 우 캡션 */}
        <div className="grid grid-cols-12 gap-y-6 lg:gap-x-10 items-end mb-12 sm:mb-16 reveal">
          <div className="col-span-12 lg:col-span-8">
            <div className="label-sm mb-6">A NEW WAY TO MEET</div>
            <h2 className="h-section font-bold text-ink" style={{ fontWeight: 700 }}>
              가볍게,<br />
              그리고 진심으로.
            </h2>
          </div>
          <p className="col-span-12 lg:col-span-4 text-base sm:text-lg text-ink-soft leading-relaxed">
            결혼이 목표가 아닌, 마음에 드는 사람과 자연스럽게 만나는 시간.
            인연연구소는 그런 만남의 시작을 책임집니다.
          </p>
        </div>

        {/* 사진 그리드 — 비대칭 */}
        <div className="grid grid-cols-12 gap-3 sm:gap-5 reveal">
          {/* 큰 사진 (좌, 7컬럼) */}
          <figure className="col-span-12 lg:col-span-7 relative rounded-2xl overflow-hidden bg-tertiary" style={{ aspectRatio: "4/3" }}>
            <Image src="/photos/p3.jpg" alt="" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 60vw" />
            <figcaption className="absolute bottom-5 left-5 sm:bottom-6 sm:left-6 text-white">
              <div className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] opacity-80 mb-1">CHAPTER 01</div>
              <div className="text-base sm:text-lg font-bold">첫 만남, 카페</div>
            </figcaption>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
          </figure>

          {/* 작은 사진 + 큰 텍스트 카드 (우, 5컬럼) */}
          <div className="col-span-12 lg:col-span-5 grid grid-rows-2 gap-3 sm:gap-5">
            <figure className="relative rounded-2xl overflow-hidden bg-tertiary">
              <Image src="/photos/p1.jpg" alt="" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 40vw" />
              <figcaption className="absolute bottom-5 left-5 text-white">
                <div className="text-[10px] font-semibold tracking-[0.2em] opacity-80">CHAPTER 02</div>
                <div className="text-sm font-bold mt-0.5">대화, 그리고 호감</div>
              </figcaption>
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
            </figure>

            <div className="card-rainbow hover-magnetic rounded-2xl text-ink p-7 sm:p-9 flex flex-col justify-between relative overflow-hidden bg-white-solid">
              <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full blur-3xl opacity-40" style={{ background: "linear-gradient(135deg, #ec4d7e, #fb7185)" }} />
              <div className="relative label-sm">CHAPTER 03</div>
              <div className="relative">
                <h3 className="text-2xl sm:text-3xl font-bold text-ink mb-3" style={{ fontWeight: 700 }}>
                  그리고<br /><span className="text-rainbow">새로운 인연.</span>
                </h3>
                <p className="text-sm text-ink-soft leading-relaxed font-medium">
                  매칭사가 함께 만들어가는<br />당신만의 이야기.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
