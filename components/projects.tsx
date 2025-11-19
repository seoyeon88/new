"use client"

import * as React from "react"
import { useState, useEffect, useRef } from "react"
import { X, ChevronDown } from "lucide-react"

interface ProjectDetails {
  objective: string
  approach: string[]
  result: string[]
  role: string[]
}

interface Project {
  image: string
  video?: string
  title: string
  description: string
  pdf?: string
  details: ProjectDetails
}

const PROJECTS: Project[] = [
  {
    image: "/uploads/project-0-1763031851249.png",
    title: "평택 라움프라자 신축사업 PF IM",
    description:
      "신규 상업시설 개발을 위한 PF 구조 설계, 사업성 분석, 리스크 요인 검토 및 투자자용 IM 제작",
    pdf: "/Pyeongtaek_IM.pdf",
    details: {
      objective:
        "평택시 동삭동 849-3,4번지 일대 근린생활시설 신축사업으로, 토지 확보·인허가·시공 확약이 완료된 상태에서 PF 130억 조달을 전제로 사업성·입지·수요·리스크를 종합적으로 검토한 프로젝트입니다.",
      approach: [
        "PF 구조 및 대출 조건(금리·LTV·All-in·조기상환 조건 등) 수치 검토",
        "책임준공, 우선수익권, 담보 조건 점검",
        "인구·소득·산업단지 등 생활 SOC를 기준으로 한 수요조사",
        "인근 근린상가 계약 평단가 및 분양사례를 활용한 분양가 산정 및 경쟁력 검토",
        "사업비·분양수입·수익률을 기준으로 한 사업수지 및 민감도 분석",
      ],
      result: [
        "PF 130억 조달 기준 LTV 48.1%, All-in 10.2%, 필수사업비 확보율 101.6% 구조 도출",
        "시공사 책임준공 및 신탁 우선수익권 구조를 통해 공사·준공 리스크를 제한적인 수준으로 관리",
        "인근매물 대비 분양가 경쟁력 확보, 1층 평단가는 인근 상가 대비 약 20~30% 낮은 수준",
        "총사업비 대비 세전이익 약 86.7억, 수익률 약 32.1% 수준으로 사업성 확보 가능",
      ],
      role: [
        "PF 구조도, 사업비, 금융 조건 등 핵심 금융 파트 정리 및 수치 검증",
        "인근 상가 거래사례·평단가 비교를 통한 분양가 검토 및 경쟁력 분석",
        "사업수지표 작성, 주요 민감도 분석 및 IM 문서 내 금융 파트 구조화",
      ],
    },
  },
  {
    image: "/Geumgok_AuctionReport-thumb.png",
    title: "금곡 엘지아파트 경매 권리분석 보고서",
    description:
      "말소기준권리·선순위·후순위 권리관계 분석 및 배당가능액/낙찰가 계산에 기반한 실무형 분석 보고서",
    pdf: "/Geumgok_AuctionReport.pdf",
    details: {
      objective: "수원시 권선구 금곡동 금곡LG아파트를 대상으로 권리관계·입지·시세·수익성을 통합적으로 검토한 보고서입니다. 경매 투자에서 핵심인 ‘인수 리스크 → 적정 낙찰가 → 수익률’의 흐름을 실제 데이터 기반으로 분석해 투자 타당성을 평가했습니다.",
      approach: [
      "등기부·임차인 자료 기반으로 권리관계 구조 정리 및 예상 배당 흐름 검토",
      "금곡·호매실 일대 상권·교통·학군·개발 계획 등 수요 요인을 조사해 입지 경쟁력 분석",
      "실거래가·KB 시세·경매 낙찰사례를 비교해 적정 낙찰가를 산정",
      "대출·부대비용을 포함한 총투입비 산정 후, 2년 보유/전세 운용 시 수익률 계산",
      ],
      result: [
      "말소기준권리 이후 등기는 모두 소멸되는 구조로 인수 리스크가 제한적",
      "인근 사례 대비 감가를 반영해 적정 낙찰가 약 3.72억 도출",
      "대출 반영 시 총투입 약 3.54억 수준으로 추정",
      "2년 보유 후 매도 기준 세전 수익률 약 13.1%",
      "전세 운용 시 적정 전세가는 약 2.6억으로 판단",
      ],
      role: [
      "권리관계 분석 및 예상배당표 작성",
      "적정 낙찰가 및 수익률 산정 모델 구축",
      "전체 보고서 구조 설계 및 실행 가능한 문서 형태로 정리",
      ],
    },
  },
  {
    image: "/Seongsu_SiteVisitReport-thumb.png",
    title: "성수 SKV1센터 1 임장활동 보고서",
    description:
      "입지·접근성·주변 상권 및 개발계획을 조사하고, 물리적 특성·임대현황·수요 등을 분석한 현장 보고서",
    pdf: "/Seongsu_SiteVisitReport.pdf",
    details: {
      objective: "서울 성수동 소재 SK V1 CENTER 1을 대상으로 건물 구조·입지·주변 상권·교통·편의시설·개발계획·매물 시세 등을 종합적으로 조사한 임장활동 보고서입니다. 지식산업센터의 실제 상품성·수요·경쟁력을 현장에서 판단하기 위한 목적의 분석입니다.",
      approach: [
      "연면적·층수·주차·승강기대수 등 건물 기본 스펙 확인",
      "교통 접근성·편의시설·생활환경 등을 기반으로 지역 분석",
      "산업개발진흥지구 확대, 전략정비구역, 삼표부지 개발 등 주요 개발계획 검토",
      "최신 매물 가격 및 과거 실거래가 데이터 비교 분석",
      "현장 조사 기반의 상품성 평가 및 SWOT 정리",
      ],
      result: [
      "성수동 산업·주거·문화 복합 수요의 영향을 받는 입지적 장점 확인",
      "삼표부지 개발 및 정비구역 추진 등 중장기 개발 모멘텀 존재",
      "인근 경쟁 지식산업센터 대비 상품성 경쟁력 상·중 수준으로 판단",
      ],
      role: [
      "현장 방문을 통한 건물 구조·층별 용도·테넌트 리스트 직접조사",
      "매물 가격 및 실거래가 비교 데이터 정리 및 가격대 분석",
      "임장 기반의 핵심 인사이트 정리 및 SWOT 분석 수행",
      ],
    },
  },
  {
    image: "/Shinchon_SitePlanning-thumb.png",
    title: "신촌 민자역사 공실 해소 및 청년주택 전환안",
    description:
      "높은 공실률을 보유하는 기존 건물 철거 후 청년주택을 도입하는 주거복합 및 역세권 활성화 개발안",
    pdf: "https://drive.google.com/file/d/1ObmWZpUI-MN--fdx8WAI3HR5I1ElB9Hq/preview",
    details: {
      objective: "장기간 공실과 체납으로 방치된 신촌 민자역사를 조사하고, 법적 구조·상권·이해관계·현장 여건을 기반으로 현실적인 재개발 및 활성화 방안을 도출했습니다.",
      approach: [
      "민자역사의 소유·운영 구조, 점용기간, 법적 쟁점 등을 기반으로 제약 요인 분석",
      "철로·동선·소음 등 물리적 문제와 상권 침체·청년 주거 수요 등 사회적 문제 파악",
      "SM그룹·코레일·국가철도공단 등 주요 이해관계자 구조와 협의 가능성 검토",
      "청년주택 도입, 동선 개선, 재건축을 전제로 한 복합 개발 시나리오 설계",
      ],
      result: [
      "장기 공실·체납·안전 문제로 기존 구조에서의 정상 운영 가능성 매우 낮음",
      "법적·물리적 조건을 종합할 때 국가 귀속 후 무상철거가 가장 타당한 방안으로 도출",
      "철로 상부 보행데크 설치는 현실적 한계가 크며, 기존 육교 및 회전교차로를 활용한 대학–상권–역사 연결 동선 개선이 적합",
      "저층 상가 활성화+상층부 청년주거+지상 보행 동선 확보를 중심으로 최종 개발안 구성",
      ],
      role: [
      "상권·유동인구·주거 수요 자료 조사 및 기존 민자역사 철거계획 검토",
      "주요 개발안의 논리 구조화 및 제안서 핵심 서술 정리",
      ],
    },
  },
  {
    image: "/Gwanggyo_AssetManagement-thumb.png",
    title: "광교 원희캐슬 B동 수익성 개선안",
    description:
      "저수익 구간의 임대구조 재진단 및 리모델링·임대전략·MD 재편을 통한 NOI 개선 전략 제안",
    pdf: "https://drive.google.com/file/d/1CbS6JZM17Ie3OEpqdUQ4hlUHRpgy-5eX/preview",
    details: {
      objective: "광교 법조타운 인근에 위치한 원희캐슬 B동 7·8층의 임대 현황·운영비·Cap Rate·IRR을 분석해 현재 수익성을 점검하고, 개선 시나리오 적용 시 투자 매력도가 얼마나 변화하는지 평가했습니다.",
      approach: [
      "1년차부터 7년차 보유 후 매각까지의 현금흐름을 연도별로 정리해 DCF 관점에서 분석",
      "현재 임대조건을 반영해 Cap Rate·매각가·IRR 산정",
      "월세 인상, 관리비 조정, 보증금 증액, 렌트프리 조건 조정 등 네 가지 개선 시나리오 설정",
      "각 시나리오별 NOI·IRR 변화를 비교해 수익성 개선 여지를 검토",
      ],
      result: [
      "기존 IRR은 약 6.84% 수준으로, 기대 수익률 대비 매입 매력도가 제한적임",
      "네 가지 개선안 중 IRR이 실제로 상승한 경우는 option 2(관리비 3,000원 인상 및 월세 인상률 완화) 뿐이었고, 상승 폭도 약 0.09%p로 제한적임",
      "층 일부만 매입하는 구조로 부가수익 창출 여지가 작고, 운영 효율성 개선 폭도 크지 않음",
      "법조타운 인근 입지 자체의 안정성은 인정되지만, 현재 조건에서는 매입가 재조정 없이는 투자 적정성이 낮다고 판단함",
      ],
      role: [
      "보유·매각 기간을 반영한 현금흐름표 정리 및 IRR·NOI 등 수익성 지표 비교",
      "개선 시나리오별 현금흐름·IRR 변화 분석 및 인사이트 도출",
      "발표 자료 레이아웃 구성 및 최종 결론 정리에 참여",
      ],
    },
  },
  {
    image: "/Singapore_LandLeaseHousing-thumb.png",
    title: "싱가포르 토지임대부주택의 국내 정착방안",
    description:
      "토지임대부 구조·공급체계·가격 메커니즘 분석 및 국내 정착 방안 제안",
    pdf: "/Singapore_LandLeaseHousing.pdf",
    details: {
      objective: "싱가포르의 토지임대부주택(HDB) 제도를 구조적으로 분석하고, 이를 서울의 주요 행정구 내에서 현실적으로 적용할 수 있는지 검토한 주택정책 연구 과제입니다.",
      approach: [
      "싱가포르 HDB 제도의 공급 방식, 재원 구조, 가격 메커니즘 등 핵심 정책 요소 분석",
      "국내 공공주택 공급 현황 및 기존 토지임대주택 제도의 실패 요인 정리",
      "서울 국·공유지 분포, 지가 수준, PIR 등을 기준으로 적용 가능 지역 검토",
      "적합 행정구를 도출하고, 해당 지역 기반의 공급·정착 시나리오 마련",
      ],
      result: [
      "싱가포르는 넓은 국유지 보유와 CPF 활용 등으로 공공주택 공급이 안정적으로 운영됨",
      "한국은 토지임대료 부담, 소유 중심 인식, 공급량 부족 등으로 제도 정착이 어려움",
      "서울 국공유지는 대부분 이미 활용 중이거나 주택 건설에 적합하지 않은 입지 비중이 큼",
      "지가 안정화 관점에서는 중구·종로구·서초구가 비교적 적용 가능성이 있는 지역으로 도출됨",
      ],
      role: [
      "싱가포르 HDB와 국내 제도 비교를 위한 자료 조사 및 정책 구조 정리",
      "서울 국·공유지 검토 및 공급 대상지 선정 과정 논리 구성",
      "발표 슬라이드 제작 및 전체 구조 정리",
      ],
    },
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
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
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
        setSelectedProject(null)
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
                각 프로젝트별 상세 개요를 클릭하여 확인하실 수 있습니다.
              </p>
            </div>
          </header>

          {/* 프로젝트 그리드 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
            {visibleProjects.map((project, index) => {
              const tag = getProjectTag(project.title)
              const hasPdf = !!project.pdf

              return (
                <article
                  key={index}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white/95 shadow-[0_8px_18px_rgba(15,23,42,0.06)] hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(15,23,42,0.14)] transition-all duration-300 cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  {/* 썸네일 */}
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

                    <p className="mt-5 mb-8 text-[14px] sm:text-[15px] text-slate-600 leading-relaxed line-clamp-4">
                      {project.description}
                    </p>

                    <div className="mt-auto flex items-center justify-end text-[11px] text-slate-500">
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

      {/* 프로젝트 상세 모달 (PDF + 목적/접근/결과/역할) */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-[110] bg-black/70 flex items-center justify-center p-4"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative bg-slate-950/5 backdrop-blur-md rounded-2xl shadow-2xl max-w-6xl w-full h-[88vh] overflow-hidden border border-slate-700/60"
            onClick={(e) => e.stopPropagation()}
            onContextMenu={(e) => e.preventDefault()}
          >
            {/* 닫기 버튼 */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-3 right-3 z-20 p-2 rounded-full bg-black/70 hover:bg-black/85 text-slate-100 shadow-lg transition-all hover:scale-110"
              aria-label="닫기"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
              {/* 왼쪽: PDF 뷰어 */}
              <div className="border-b lg:border-b-0 lg:border-r border-slate-700/40 bg-slate-900/40">
                {selectedProject.pdf ? (
                  <iframe
                    src={selectedProject.pdf}
                    className="w-full h-full"
                    style={{ border: "none" }}
                    title={selectedProject.title}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-200 text-sm">
                    이 프로젝트에는 아직 PDF가 연결되지 않았습니다.
                  </div>
                )}
              </div>

              {/* 오른쪽: 프로젝트 상세 설명 */}
              <div className="relative p-6 sm:p-7 lg:p-8 overflow-y-auto">
                {/* 헤더 */}
                <header className="mb-5 space-y-2">
                  <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-slate-400">
                    Project Detail
                  </p>
                  <h3 className="text-lg sm:text-xl lg:text-[1.35rem] font-semibold text-white leading-snug">
                    {selectedProject.title}
                  </h3>
                  <p className="text-[13px] text-slate-300 mt-1">
                    {getProjectTag(selectedProject.title)}
                  </p>
                </header>

                <div className="space-y-5 text-[13px] sm:text-[14px] text-slate-100/90 leading-relaxed">
                  {/* 목적 */}
                  <section>
                    <h4 className="text-[12px] font-semibold uppercase tracking-[0.18em] text-emerald-300 mb-1.5">
                      Objective
                    </h4>
                    <p className="text-slate-100/90">
                      {selectedProject.details.objective ||
                        "이 프로젝트의 목적(Objective)을 여기에 입력해 주세요."}
                    </p>
                  </section>

                  {/* 접근방법 */}
                  <section>
                    <h4 className="text-[12px] font-semibold uppercase tracking-[0.18em] text-emerald-300 mb-1.5">
                      Approach
                    </h4>
                    {selectedProject.details.approach.length > 0 ? (
                      <ul className="list-disc list-inside space-y-1.5 text-slate-100/90">
                        {selectedProject.details.approach.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-slate-100/80">
                        분석 접근방법(데이터·모델링·리서치·시나리오 등)을 bullet로 정리해 주세요.
                      </p>
                    )}
                  </section>

                  {/* 결과 / 성과 */}
                  <section>
                    <h4 className="text-[12px] font-semibold uppercase tracking-[0.18em] text-emerald-300 mb-1.5">
                      Result
                    </h4>
                    {selectedProject.details.result.length > 0 ? (
                      <ul className="list-disc list-inside space-y-1.5">
                        {selectedProject.details.result.map((item, idx) => (
                          <li key={idx} className="text-emerald-200 font-medium">
                            {item}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-slate-100/80">
                        NOI 개선률, IRR 변화, Cap-rate, 비용 절감 효과 등 핵심 지표를 bullet로 정리해 주세요.
                      </p>
                    )}
                  </section>

                  {/* 역할 */}
                  <section>
                    <h4 className="text-[12px] font-semibold uppercase tracking-[0.18em] text-emerald-300 mb-1.5">
                      Role
                    </h4>
                    {selectedProject.details.role.length > 0 ? (
                      <ul className="list-disc list-inside space-y-1.5 text-slate-100/90">
                        {selectedProject.details.role.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-slate-100/80">
                        이 프로젝트에서 본인이 맡았던 역할(모델링, 리서치, 보고서 작성 등)을 구체적으로 적어 주세요.
                      </p>
                    )}
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
