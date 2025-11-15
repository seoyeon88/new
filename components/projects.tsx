"use client"

import * as React from "react"
import { useState, useEffect, useRef } from "react"
import { X, ChevronDown } from "lucide-react"

interface Project {
  image: string
  video?: string
  title: string
  description: string
  pdf?: string
}

const PROJECTS: Project[] = [
  {
    image: "/uploads/project-0-1763031851249.png",
    title: "평택 라움프라자 신축사업 PF IM",
    description:
      "신규 상업시설 개발을 위한 PF 구조 설계, 사업성 분석, 리스크 요인 검토 및 투자자용 IM 제작",
    pdf: "/Pyeongtaek_IM.pdf",
  },
  {
    image: "/Geumgok_AuctionReport-thumb.png",
    title: "금곡 엘지아파트 경매 권리분석 보고서",
    description:
      "말소기준권리·선순위·후순위 권리관계 분석 및 배당가능액/낙찰가 계산에 기반한 실무형 분석 보고서",
    pdf: "/Geumgok_AuctionReport.pdf",
  },
  {
    image: "/Seongsu_SiteVisitReport-thumb.png",
    title: "성수 SKV1센터 1 임장활동 보고서",
    description:
      "입지·접근성·주변 상권 및 개발계획을 조사하고, 물리적 특성·임대현황·수요 등을 분석한 현장 보고서",
    pdf: "/Seongsu_SiteVisitReport.pdf",
  },
  {
    image: "/Shinchon_SitePlanning-thumb.png",
    title: "신촌 민자역사 공실 해소 및 청년주택 전환안",
    description:
      "높은 공실률을 보유하는 기존 건물 철거 후 청년주택을 도입하는 주거복합 및 역세권 활성화 개발안",
    pdf: "https://drive.google.com/file/d/1ObmWZpUI-MN--fdx8WAI3HR5I1ElB9Hq/preview",
  },
  {
    image: "/Gwanggyo_AssetManagement-thumb.png",
    title: "광교 원희캐슬 B동 수익성 개선안",
    description:
      "저수익 구간의 임대구조 재진단 및 리모델링·임대전략·MD 재편을 통한 NOI 개선 전략 제안",
    pdf: "https://drive.google.com/file/d/1CbS6JZM17Ie3OEpqdUQ4hlUHRpgy-5eX/preview",
  },
  {
    image: "/Singapore_LandLeaseHousing-thumb.png",
    title: "싱가포르 토지임대부주택의 국내 정착방안",
    description:
      "토지임대부 구조·공급체계·가격 메커니즘 분석 및 국내 정착 방안 제안",
    pdf: "/Singapore_LandLeaseHousing.pdf",
  },
]

const INITIAL_DISPLAY = 6
const LOAD_MORE_COUNT = 3

function getProjectTag(title: string): string {
  if (title.includes("PF") || title.toLowerCase().includes("information memorandum"))
    return "PF / IM"
  if (title.includes("공실") || title.includes("계획 연구")) return "도시·주거 계획"
  if (title.includes("수익성 개선")) return "자산관리 / AM"
  if (title.includes("경매")) return "경매 / 권리분석"
  if (title.includes("임장") || title.includes("현장")) return "임장 / 리포트"
  if (title.includes("토지임대") || title.includes("제도")) return "제도·정책 연구"
  return "프로젝트"
}

export function Projects() {
  const [displayCount, setDisplayCount] = useState(INITIAL_DISPLAY)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement | null>(null)

  const visibleProjects = PROJECTS.slice(0, displayCount)
  const hasMoreProjects = PROJECTS.length > displayCount

  // 섹션 인터섹션 애니메이션
  useEffect(() => {
    const target = sectionRef.current
    if (!target) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.15 },
    )

    observer.observe(target)
    return () => observer.disconnect()
  }, [])

  // ESC로 모달 닫기
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedImage(null)
        setSelectedPdf(null)
      }
    }
    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [])

  const loadMore = () => {
    setDisplayCount((prev) => Math.min(prev + LOAD_MORE_COUNT, PROJECTS.length))
  }

  return (
    <>
      <section
        id="projects"
        ref={sectionRef}
        className={`w-full border-t border-slate-200 bg-slate-50/60 py-20 sm:py-24 lg:py-28 transition-all duration-1000 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-10 xl:px-0">
          {/* 섹션 헤더 */}
          <header className="mb-12 sm:mb-14 lg:mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span className="text-[11px] font-medium tracking-[0.18em] text-slate-600">
                PROJECTS
              </span>
            </div>

            <div className="mt-5 space-y-5">
              <h2 className="text-4xl sm:text-5xl lg:text-[2.9rem] font-semibold tracking-tight text-slate-900">
                프로젝트
              </h2>
              <p className="text-[16px] sm:text-[18px] lg:text-[20px] text-slate-600 max-w-3xl leading-relaxed">
  클릭하여 전체 프로젝트를 확인할 수 있습니다.
</p>
            </div>
          </header>

          {/* 프로젝트 그리드 – 큰 카드 없이 흩뿌리기 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
            {visibleProjects.map((project, index) => {
              const tag = getProjectTag(project.title)
              const hasPdf = !!project.pdf

              return (
                <article
                  key={index}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white/95 shadow-[0_8px_18px_rgba(15,23,42,0.06)] hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(15,23,42,0.14)] transition-all duration-300 cursor-pointer"
                  onClick={() => {
                    if (hasPdf) {
                      setSelectedPdf(project.pdf!)
                    } else if (project.video) {
                      setSelectedImage(project.video)
                    } else {
                      setSelectedImage(project.image)
                    }
                  }}
                >
                  {/* 썸네일 – 빈 여백 없이 꽉 차게 */}
                  <div className="relative w-full h-56 sm:h-60 lg:h-64 overflow-hidden bg-slate-100">
                    {project.video ? (
                      <video
                        src={project.video}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                        autoPlay
                        loop
                        muted
                        playsInline
                      />
                    ) : (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                    )}

                    {/* 상단 태그 */}
                    <div className="absolute left-3 top-3 flex flex-wrap gap-2">
                      <span className="inline-flex items-center rounded-full bg-black/75 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
                        {tag}
                      </span>
                      {hasPdf && (
                        <span className="inline-flex items-center rounded-full bg-white/85 px-2 py-1 text-[10px] font-medium text-slate-800 shadow-sm">
                          PDF 리포트
                        </span>
                      )}
                    </div>
                  </div>

                  {/* 텍스트 영역 */}
                  <div className="flex flex-col flex-1 px-4 py-5">
                    <h3 className="text-[16px] sm:text-[18px] lg:text-[19px] font-semibold text-slate-900 leading-snug line-clamp-2">
                      {project.title}
                    </h3>

                    <p className="mt-5 sm:mt-5 mb-8 text-[14px] sm:text-[15px] text-slate-600 leading-relaxed line-clamp-4">
                      {project.description}
                    </p>

                    {/* 하단 메타 – 카테고리 삭제, '자세히 보기'만 유지 */}
                    <div className="mt-4 flex items-center justify-end text-[11px] text-slate-500">
                      <span className="inline-flex items-center gap-1 group-hover:text-slate-900 transition-colors">
                        자세히 보기
                        <span className="text-[13px]">↗</span>
                      </span>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>

          {/* 더보기 버튼 */}
          {hasMoreProjects && (
            <div className="mt-10 text-center">
              <button
                onClick={loadMore}
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/95 px-6 py-2.5 text-sm font-medium text-slate-800 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all"
              >
                <ChevronDown className="h-4 w-4" />
                더 많은 프로젝트 보기
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 이미지 / 비디오 모달 */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] bg-black/70 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative bg-slate-950/5 backdrop-blur-md rounded-2xl shadow-2xl max-w-4xl max-h-[85vh] w-full overflow-hidden border border-slate-700/60"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/70 hover:bg-black/85 text-slate-100 shadow-lg transition-all hover:scale-110"
              aria-label="닫기"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative w-full h-full flex items-center justify-center p-4">
              {selectedImage.includes(".mp4") ||
              selectedImage.includes(".webm") ||
              selectedImage.includes("youtube") ? (
                <video
                  src={selectedImage}
                  className="max-w-full max-h-[75vh] object-contain rounded-lg"
                  controls
                  autoPlay
                  loop
                />
              ) : (
                <img
                  src={selectedImage}
                  alt="프로젝트 미디어"
                  className="max-w-full max-h-[75vh] object-contain rounded-lg"
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* PDF 모달 */}
      {selectedPdf && (
        <div
          className="fixed inset-0 z-[110] bg-black/70 flex items-center justify-center p-4"
          onClick={() => setSelectedPdf(null)}
        >
          <div
            className="relative bg-slate-950/5 backdrop-blur-md rounded-2xl shadow-2xl max-w-5xl w-full h-[85vh] overflow-hidden border border-slate-700/60"
            onClick={(e) => e.stopPropagation()}
            onContextMenu={(e) => e.preventDefault()}
          >
            <button
              onClick={() => setSelectedPdf(null)}
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/70 hover:bg-black/85 text-slate-100 shadow-lg transition-all hover:scale-110"
              aria-label="닫기"
            >
              <X className="w-5 h-5" />
            </button>

            <iframe
              src={selectedPdf}
              className="w-full h-full rounded-lg"
              style={{ border: "none" }}
            />
          </div>
        </div>
      )}
    </>
  )
}
