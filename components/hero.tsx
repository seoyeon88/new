"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { ArrowRight, Download } from "lucide-react"

export function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 50)

    return () => clearTimeout(timer)
  }, [])

  const handleSectionClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault()
      const el = document.querySelector(href)
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    }
  }

  return (
    <section
      id="hero"
className="relative min-h-[calc(111vh-80px)] flex items-center py-20 sm:py-24 lg:py-28 bg-white"
    >
      {/* 부드러운 라디얼 그라디언트 오버레이 */}
      <div className="pointer-events-none absolute inset-0 -z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(148,163,184,0.32),transparent_55%)]" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 sm:px-8 lg:px-10 xl:px-0 flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16 lg:justify-between">
        {/* 왼쪽: 메인 텍스트 영역 */}
        <div
          className={`max-w-xl lg:max-w-2xl space-y-8 transform transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"
          }`}
        >

          {/* 메인 타이포 */}
          <div className="space-y-4">
            <h1 className="text-balance text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold tracking-tight text-slate-900">
              <span className="opacity-90 bg-gradient-to-r from-slate-900 via-stone-700 to-slate-900 bg-clip-text text-transparent block
              tracking-[-0.01em]
              drop-shadow-[0_1px_1px_rgba(0,0,0,0.10)]">
  Real Estate
</span>
<span className="opacity-90 bg-gradient-to-r from-slate-900 via-stone-700 to-slate-900 bg-clip-text text-transparent block mt-1
tracking-[-0.01em]
drop-shadow-[0_1px_1px_rgba(0,0,0,0.10)]">
  Portfolio
</span>
              <span className="mt-4 block text-2xl sm:text-3xl lg:text-[1.9rem] text-slate-600">
                부동산 자산의 활용도를 높이는 전략을 연구합니다.
              </span>
            </h1>
            {/* 기존 설명 문단(부동산 자산의 활용도를...)은 제거함 */}
          </div>

          {/* CTA 버튼들 */}
          <div className="space-y-4 pt-4">
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                onClick={(e) => handleSectionClick(e, "#projects")}
                className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-7 py-3.5 text-[15px] font-medium text-slate-50 shadow-sm transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/70"
              >
                <ArrowRight className="h-4 w-4" />
                프로젝트 보러가기
              </a>

              <a
                href="/Seoyeon_Resume.pdf"
                download
                className="inline-flex items-center gap-2 rounded-full border border-slate-300/90 bg-white/80 px-7 py-3.5 text-[15px] font-medium text-slate-800 backdrop-blur-sm shadow-sm transition hover:bg-slate-50 hover:border-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
              >
                <Download className="h-4 w-4" />
                Download Resume
              </a>
            </div>
          </div>
        </div>

        {/* 오른쪽: 프로필 카드 + 역량 요약 */}
        <div
  className={`w-full max-w-md lg:max-w-sm xl:max-w-md transform scale-87 transition-all duration-700 ease-out ${
    isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"
  } lg:absolute`}
  style={{
    transitionDelay: isVisible ? "0.25s" : "0s",
    right: "-60px",  // 👉 여기 숫자 마음대로 조절해서 오른쪽으로 이동량 컨트롤
    top: "-70px",    // 👉 위/아래 위치도 여기서 마음대로 조정
  }}
>

<div className="relative rounded-3xl border border-slate-200/80 bg-white/80 pl-12 pr-6 py-6 shadow-md backdrop-blur-sm">
            {/* 상단 프로필 */}
            <div className="flex items-center gap-4">
              <div className="relative w-[96px] h-[112px] overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 mr-2">
  <img
    src="/profile.jpg"
    alt="배서연 프로필 사진"
    className="w-full h-full object-cover"
  />
</div>

              <div className="space-y-1 self-center pl-1.5">
  <p className="text-2xl sm:text-3xl font-semibold tracking-widest text-slate-900 mt-2 mb-2">
    배서연
  </p>
  <p className="text-sm sm:text-base text-slate-500 tracking-wide">
    단국대학교 도시계획·부동산학부
  </p>
</div>

            </div>

            {/* 구분선 */}
            <div className="my-5 h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

            {/* 코어 포커스 + 키워드 */}
            <div className="mt-6 space-y-4">
              <div className="mb-8">
                <p className="mb-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
  Core Focus
</p>
<ul className="space-y-1.5 text-sm sm:text-[15px] text-slate-800">
                  <li>• 오피스·상업시설 PF 및 IM 작성</li>
                  <li>• 수익성 분석 (DCF, IRR, NOI, Cap-rate)</li>
                  <li>• 경매·권리분석 및 리스크 검토</li>
                </ul>
              </div>

              <div className="mt-4">
                <p className="mb-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
  Keywords
</p>
<div className="flex flex-wrap gap-1.5 text-xs sm:text-sm">
                  <span className="rounded-full border border-slate-200 bg-white/80 px-3 py-1">
                    # Real Estate Finance
                  </span>
                  <span className="rounded-full border border-slate-200 bg-white/80 px-3 py-1">
                    # Asset Management
                  </span>
                  <span className="rounded-full border border-slate-200 bg-white/80 px-3 py-1">
                    # PF·개발사업 수지분석
                  </span>
                  <span className="rounded-full border border-slate-200 bg-white/80 px-3 py-1">
                    # 데이터 기반 의사결정
                  </span>
                </div>
              </div>
            </div>

            {/* 하단 여백 (카드 높이 유지용) */}
            <div className="mt-2 h-4" />
          </div>
        </div>
      </div>
    </section>
  )
}
