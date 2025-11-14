"use client"

import * as React from "react"
import { useState, useEffect, useRef } from "react"
import { X, Plus, Upload, ChevronDown, LayoutGrid } from "lucide-react"
import { EditableText } from "@/components/editable/editable-text"
import { EditableMedia } from "@/components/editable/editable-media"
import { EditableBackground } from "@/components/editable/editable-background"
import { useInlineEditor } from "@/contexts/inline-editor-context"
import { COMMON_STYLES } from "@/lib/constants"

export function Projects() {
  const { getData, saveData, isEditMode, saveToFile } = useInlineEditor()

  // 기본 데이터
  const defaultInfo = {
    title: "프로젝트",
    subtitle: "이미지를 클릭하면 전체 프로젝트가 열립니다",
    initialDisplay: 3,
    loadMoreCount: 3,
    background: {"image":"","video":"","color":"","opacity":0.1},
    projects: [{"image":"/uploads/project-0-1763031851249.png","video":"","title":"평택시 동삭동 라움프라자 신축사업 PF Information Memorandum","description":"신규 상업시설 개발을 위한 PF 구조 설계, 사업성 분석, 리스크 요인 검토 및 투자자용 IM 제작","pdf":"/Pyeongtaek_IM.pdf"},{"image":"/Geumgok_AuctionReport-thumb.png","video":"","title":"금곡엘지아파트 경매 권리분석보고서","description":"말소기준권리·선순위·후순위 권리관계 분석 및 배당가능액/낙찰가 계산에 기반한 실무형 분석 보고서","pdf":"/Geumgok_AuctionReport.pdf"},{"image":"/Seongsu_SiteVisitReport-thumb.png","video":"","title":"성수동 SKV1센터 1 임장활동보고서","description":"입지·접근성·주변 상권 및 개발계획을 조사하고, 건물 물리적 특성·임대현황·수요·위험요인을 분석한 현장 기반 자산진단 보고서","pdf":"/Seongsu_SiteVisitReport.pdf"},{"image":"/Shinchon_SitePlanning-thumb.png","video":"","title":"신촌 민자역사 공실 문제 해결을 위한 청년주택 및 주거단지 계획 연구","description":"철거 후 청년주택·생활지원시설을 도입하는 주거복합 및 역세권 활성화 개발안 수립","pdf":"https://drive.google.com/file/d/1ObmWZpUI-MN--fdx8WAI3HR5I1ElB9Hq/preview"},{"image":"/Gwanggyo_AssetManagement-thumb.png","video":"","title":"광교 원희캐슬 B동 수익성 개선안","description":"저수익 구간의 임대구조 재진단 후 리모델링·임대전략·MD 구성 재편을 통한 NOI 개선 전략","pdf":"https://drive.google.com/file/d/1CbS6JZM17Ie3OEpqdUQ4hlUHRpgy-5eX/preview"},{"image":"/Singapore_LandLeaseHousing-thumb.png","video":"","title":"싱가포르 토지임대부주택 제도 정착방안","description":"싱가포르 토지임대부 구조·공급체계·가격 메커니즘을 분석하고 국내 정착 방안 제안","pdf":"/Singapore_LandLeaseHousing.pdf"}] as Array<{ image: string; video?: string; title: string; description: string }>
  }

  const [projectsInfo, setProjectsInfo] = useState(defaultInfo)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null)
  const [showProjectModal, setShowProjectModal] = useState(false)
  const [displayCount, setDisplayCount] = useState(defaultInfo.initialDisplay)
  const [showDisplaySettings, setShowDisplaySettings] = useState(false)
  const [newProject, setNewProject] = useState({
    image: "",
    title: "",
    description: "",
  })
  const [backgroundData, setBackgroundData] = useState(defaultInfo.background)

  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement | null>(null)

  // 데이터 로드
  useEffect(() => {
    const savedData = getData("projects-info") as typeof defaultInfo | null
    if (savedData) {
      const mergedData = { ...defaultInfo, ...savedData }
      setProjectsInfo(mergedData)
      setDisplayCount(mergedData.initialDisplay || defaultInfo.initialDisplay)
      if (savedData.background) {
        setBackgroundData(savedData.background)
      }
    }

    const savedBg = getData("projects-background") as {
      image: string
      video: string
      color: string
      opacity: number
    } | null
    if (savedBg) {
      setBackgroundData(savedBg)
    }
  }, [isEditMode])

  const updateProjectsInfo = async (
    key: string,
    value:
      | string
      | number
      | boolean
      | typeof projectsInfo.projects
      | typeof projectsInfo.background,
  ) => {
    const newInfo = { ...projectsInfo, [key]: value }
    setProjectsInfo(newInfo)
    saveData("projects-info", newInfo)
    await saveToFile("projects", "Info", newInfo)
  }

  const updateProject = async (index: number, field: string, value: string) => {
    const newProjects = [...projectsInfo.projects]
    newProjects[index] = { ...newProjects[index], [field]: value }
    await updateProjectsInfo("projects", newProjects)
  }

  const removeProject = async (index: number) => {
    const projectToRemove = projectsInfo.projects[index]

    if (projectToRemove.image && projectToRemove.image.includes("/uploads/")) {
      try {
        const response = await fetch("/api/delete-image", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ imagePath: projectToRemove.image }),
        })
        if (response.ok) {
          console.log(`✅ 프로젝트 이미지 삭제 완료: ${projectToRemove.image}`)
        }
      } catch (error) {
        console.error("프로젝트 이미지 삭제 실패:", error)
      }
    }

    if (projectToRemove.video && projectToRemove.video.includes("/uploads/")) {
      try {
        const response = await fetch("/api/delete-image", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ imagePath: projectToRemove.video }),
        })
        if (response.ok) {
          console.log(`✅ 프로젝트 비디오 삭제 완료: ${projectToRemove.video}`)
        }
      } catch (error) {
        console.error("프로젝트 비디오 삭제 실패:", error)
      }
    }

    const newProjects = projectsInfo.projects.filter((_, i) => i !== index)
    await updateProjectsInfo("projects", newProjects)
  }

  const validProjects = projectsInfo.projects
  const visibleProjects = isEditMode
    ? validProjects
    : validProjects.slice(0, displayCount)
  const hasMoreProjects = validProjects.length > displayCount

  const loadMore = () => {
    setDisplayCount((prev) =>
      Math.min(prev + projectsInfo.loadMoreCount, validProjects.length),
    )
  }

  // 섹션 진입 애니메이션
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

  // 프로젝트 타입 태그
  const getProjectTag = (title: string) => {
    if (title.includes("PF") || title.toLowerCase().includes("information memorandum"))
      return "PF / IM"
    if (title.includes("공실") || title.includes("계획 연구"))
      return "도시·주거 계획"
    if (title.includes("수익성 개선")) return "자산관리 / AM"
    if (title.includes("경매")) return "경매 / 권리분석"
    if (title.includes("임장") || title.includes("현장")) return "임장 / 리포트"
    if (title.includes("토지임대") || title.includes("제도"))
      return "제도·정책 연구"
    return "프로젝트"
  }

  const getPdfBadgeText = (project: (typeof projectsInfo.projects)[number]) =>
    (project as any).pdf
      ? "PDF 리포트"
      : project.video
      ? "미디어 뷰"
      : "이미지 확대"

  // A4 / PPT 비율 결정 로직
  const isA4Project = (
    project: (typeof projectsInfo.projects)[number],
    index: number,
  ) => {
    const a4Keywords = [
      "Information Memorandum",
      "경매 권리분석보고서",
      "임장활동보고서",
    ]
    if (index <= 2) return true
    return a4Keywords.some((k) => project.title.includes(k))
  }

  const getAspectClass = (
    project: (typeof projectsInfo.projects)[number],
    index: number,
  ) => {
    return isA4Project(project, index) ? "aspect-[3/4]" : "aspect-video"
  }

  return (
    <>
      <EditableBackground
        image={backgroundData.image}
        video={backgroundData.video}
        color={backgroundData.color}
        opacity={backgroundData.opacity}
        onChange={(data) => {
          const newData = { ...backgroundData, ...data }
          setBackgroundData(newData)
          saveData("projects-background", newData)

          const updatedProjectsInfo = { ...projectsInfo, background: newData }
          setProjectsInfo(updatedProjectsInfo)
          saveData("projects-info", updatedProjectsInfo)
        }}
        storageKey="projects-background"
        className="relative py-20 bg-neutral-50"
      >
        <section
          id="projects"
          ref={sectionRef}
          className={`w-full transition-all duration-1000 ease-out ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6 pointer-events-none"
          }`}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* 섹션 헤더 */}
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-10">
              <div>
                <div className="inline-flex items-center gap-2 border border-slate-200 bg-white/80 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500 rounded-none">
                  <span className="inline-block h-1.5 w-1.5 bg-slate-700" />
                  Project Portfolio
                </div>
                <h2 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
                  <span className="bg-gradient-to-r from-slate-900 via-slate-700 to-slate-600 bg-clip-text text-transparent">
                    <EditableText
                      value={projectsInfo.title}
                      onChange={(value) => updateProjectsInfo("title", value)}
                      storageKey="projects-title"
                    />
                  </span>
                </h2>
                <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-2xl leading-relaxed">
                  <EditableText
                    value={projectsInfo.subtitle}
                    onChange={(value) =>
                      updateProjectsInfo("subtitle", value)
                    }
                    storageKey="projects-subtitle"
                    multiline
                  />
                </p>
              </div>

              {/* 우측 상단 요약/컨트롤 */}
              <div className="flex flex-col items-start md:items-end gap-2 text-xs sm:text-sm text-muted-foreground">
                <div className="inline-flex items-center gap-2 border border-slate-200 bg-white/80 px-3 py-1 rounded-none">
                  <span className="font-medium text-slate-700">
                    총 {validProjects.length}개 프로젝트
                  </span>
                  <span className="h-1 w-1 bg-slate-300" />
                  <span>
                    처음{" "}
                    <span className="font-medium">
                      {projectsInfo.initialDisplay}
                    </span>
                    개 노출 ·{" "}
                    <span className="font-medium">
                      {projectsInfo.loadMoreCount}
                    </span>
                    개씩 더보기
                  </span>
                </div>

                {isEditMode && (
                  <button
                    onClick={() => setShowDisplaySettings(true)}
                    className="inline-flex items-center gap-1 border border-dashed border-slate-300 bg-white/70 px-3 py-1 text-[11px] font-medium text-slate-600 hover:border-slate-500 hover:bg-slate-50 transition-all rounded-none"
                  >
                    <LayoutGrid className="h-3 w-3" />
                    리스트 노출 설정
                  </button>
                )}
              </div>
            </div>

            {/* 프로젝트가 없을 때 */}
            {validProjects.length === 0 && !isEditMode ? (
              <div className="text-center py-24 border border-dashed border-slate-200 bg-white/80 rounded-none">
                <p className="text-sm font-medium text-slate-500 mb-2">
                  아직 등록된 프로젝트가 없습니다.
                </p>
                <p className="text-xs text-muted-foreground">
                  진행했던 리포트, 수업 과제, 학회 프로젝트 등을 정리해서 포트폴리오로
                  만들어 보세요.
                </p>
              </div>
            ) : (
              <>
                {/* 프로젝트 카드 그리드 */}
                <div
                  className={`
                    grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10
                    transform transition-all duration-1000 ease-out
                    ${
                      isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-8"
                    }
                  `}
                  style={{ transitionDelay: isVisible ? "0.12s" : "0s" }}
                >
                  {visibleProjects.map((project, index) => {
                    const tag = getProjectTag(project.title)
                    const pdfBadge = getPdfBadgeText(project)
                    const aspectClass = getAspectClass(project, index)
                    const pdfPath = (project as any).pdf as string | undefined

                    return (
                      <article
                        key={index}
                        className="group flex flex-col relative cursor-pointer border border-slate-200 bg-white/95 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 rounded-none"
                        onClick={() => {
                          if (!isEditMode) {
                            if (pdfPath) {
                              setSelectedPdf(pdfPath)
                            } else {
                              setSelectedImage(project.video || project.image)
                            }
                          }
                        }}
                      >
                        {isEditMode && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              removeProject(index)
                            }}
                            className={COMMON_STYLES.deleteButton}
                          >
                            <X className={COMMON_STYLES.deleteIcon} />
                          </button>
                        )}

                        {/* 프로젝트 썸네일 */}
                        <div
                          className={`relative overflow-hidden bg-slate-100 ${aspectClass}`}
                        >
                          {project.video ? (
                            <video
                              src={project.video}
                              className="absolute inset-0 w-full h-full object-contain bg-slate-100 transition-transform duration-300 group-hover:scale-[1.03]"
                              autoPlay
                              loop
                              muted
                              playsInline
                            />
                          ) : (
                            <EditableMedia
                              src={project.image || ""}
                              onChange={(src) =>
                                updateProject(index, "image", src)
                              }
                              type="auto"
                              storageKey={`project-${index}-image`}
                              className="absolute inset-0 w-full h-full object-contain bg-slate-100 transition-transform duration-300 group-hover:scale-[1.03]"
                              alt={project.title}
                              purpose={`project-${index}`}
                            />
                          )}

                          {/* 상단 좌측 태그들 */}
                          <div className="absolute left-3 top-3 flex flex-wrap gap-2">
                            <span className="inline-flex items-center bg-black/70 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-sm rounded-none">
                              {tag}
                            </span>
                            {pdfPath && (
                              <span className="inline-flex items-center bg-white/90 px-2.5 py-1 text-[11px] font-medium text-slate-800 backdrop-blur-sm rounded-none">
                                PDF 리포트
                              </span>
                            )}
                          </div>

                          {/* 하단 그라데이션 + 안내 텍스트 (뷰 모드에서만) */}
                          {!isEditMode && (
                            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/65 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end">
                              <div className="w-full px-4 pb-3 flex items-center justify-between gap-2 text-[11px] text-slate-100">
                                <span className="truncate">
                                  {project.title || "프로젝트 보기"}
                                </span>
                                <span className="inline-flex items-center bg-white/15 px-2 py-1 backdrop-blur-sm rounded-none">
                                  {pdfBadge} 열기
                                </span>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* 텍스트 영역 */}
                        <div className="flex flex-col flex-1 px-4 py-3.5">
                          <h3 className="text-sm sm:text-[15px] font-semibold text-slate-900 mb-1.5 line-clamp-2">
                            <EditableText
                              value={project.title || "프로젝트 제목"}
                              onChange={(value) =>
                                updateProject(index, "title", value)
                              }
                              storageKey={`project-${index}-title`}
                            />
                          </h3>
                          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3">
                            <EditableText
                              value={project.description || "프로젝트 설명"}
                              onChange={(value) =>
                                updateProject(index, "description", value)
                              }
                              storageKey={`project-${index}-description`}
                              multiline
                            />
                          </p>

                          {/* 하단 메타라인 */}
                          <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400">
                            <span className="inline-flex items-center gap-1">
                              <span className="h-1 w-1 bg-slate-300" />
                              <span>{pdfBadge}</span>
                            </span>
                            <span className="inline-flex items-center gap-1">
                              <span className="h-1 w-1 bg-slate-300" />
                              <span>클릭하여 상세 보기</span>
                            </span>
                          </div>
                        </div>
                      </article>
                    )
                  })}

                  {/* 편집 모드에서 프로젝트 추가 카드 */}
                  {isEditMode && (
                    <button
                      type="button"
                      onClick={() => setShowProjectModal(true)}
                      className="flex flex-col items-center justify-center h-full min-h-[220px] border-2 border-dashed border-slate-300 bg-white/70 hover:border-slate-600 hover:bg-slate-50 transition-all rounded-none"
                    >
                      <Plus className="h-8 w-8 mb-2 text-slate-400" />
                      <p className="text-sm font-medium text-slate-600">
                        프로젝트 추가
                      </p>
                      <p className="mt-1 text-[11px] text-muted-foreground">
                        썸네일 · 제목 · 설명 · PDF 리포트를 등록할 수 있습니다.
                      </p>
                    </button>
                  )}
                </div>

                {/* 더보기 버튼 */}
                {hasMoreProjects && !isEditMode && (
                  <div className="text-center mt-10">
                    <button
                      onClick={loadMore}
                      className="inline-flex items-center gap-2 border border-slate-300 bg-white/90 px-6 py-2.5 text-sm font-medium text-slate-800 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all rounded-none"
                    >
                      <ChevronDown className="h-4 w-4" />
                      더 많은 프로젝트 보기
                      <span className="text-xs text-slate-400">
                        ({validProjects.length - displayCount}개 남음)
                      </span>
                    </button>
                  </div>
                )}

                {isEditMode && (
                  <div className="text-center mt-6">
                    <button
                      onClick={() => setShowDisplaySettings(true)}
                      className="inline-flex items-center gap-2 border border-slate-300 bg-white/90 px-5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all rounded-none"
                    >
                      <LayoutGrid className="h-4 w-4" />
                      카드 노출 개수 / 더보기 설정
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </EditableBackground>

      {/* 이미지 확대 모달 */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] bg-black/70 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative bg-background rounded-lg shadow-2xl max-w-4xl max-h-[85vh] w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-background/80 hover:bg-background shadow-lg transition-all hover:scale-110"
              aria-label="닫기"
            >
              <X className="w-5 h-5 text-foreground" />
            </button>

            <div className="relative w-full h-full flex items-center justify-center p-4">
              {selectedImage &&
              (selectedImage.includes(".mp4") ||
                selectedImage.includes(".webm") ||
                selectedImage.includes("youtube")) ? (
                <video
                  src={selectedImage}
                  className="max-w-full max-h-[75vh] object-contain rounded"
                  controls
                  autoPlay
                  loop
                />
              ) : (
                <img
                  src={selectedImage}
                  alt="확대된 프로젝트 이미지"
                  className="max-w-full max-h-[75vh] object-contain rounded"
                  onError={(e) => {
                    const target = e.currentTarget
                    target.style.display = "none"
                    const parent = target.parentElement
                    if (parent) {
                      const placeholder = document.createElement("div")
                      placeholder.className =
                        "text-muted-foreground text-center py-20"
                      placeholder.innerHTML =
                        '<span class="text-6xl">📁</span><p class="mt-4">미디어를 불러올 수 없습니다</p>'
                      parent.appendChild(placeholder)
                    }
                  }}
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* PDF 모달 */}
      {selectedPdf && (
        <div
          className="fixed inset-0 z-[200] bg-black/70 flex items-center justify-center p-4"
          onClick={() => setSelectedPdf(null)}
        >
          <div
            className="relative bg-background rounded-lg shadow-2xl max-w-5xl w-full h-[85vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            onContextMenu={(e) => e.preventDefault()}
          >
            <button
              onClick={() => setSelectedPdf(null)}
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-background/80 hover:bg-background shadow-lg transition-all hover:scale-110"
              aria-label="닫기"
            >
              <X className="w-5 h-5 text-foreground" />
            </button>

            <iframe
              src={selectedPdf}
              className="w-full h-full rounded"
              style={{ border: "none" }}
            />
          </div>
        </div>
      )}

      {/* 새 프로젝트 추가 모달 */}
      {showProjectModal && isEditMode && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
          <div className="bg-background border rounded-xl p-6 max-w-2xl w-full mx-4 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">새 프로젝트 추가</h3>
              <button
                onClick={async () => {
                  if (
                    newProject.image &&
                    newProject.image.includes("/uploads/")
                  ) {
                    try {
                      await fetch("/api/delete-image", {
                        method: "DELETE",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ imagePath: newProject.image }),
                      })
                    } catch (error) {
                      console.error("Failed to delete uploaded file:", error)
                    }
                  }
                  setNewProject({ image: "", title: "", description: "" })
                  setShowProjectModal(false)
                }}
                className="p-1 hover:bg-muted rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* 이미지/비디오 업로드 */}
              <div>
                <label className="text-sm font-medium mb-2 block">
                  프로젝트 이미지/비디오
                </label>
                <div className="h-48 border border-dashed border-muted rounded-lg overflow-hidden bg-muted/40">
                  {newProject.image ? (
                    <div className="relative h-full">
                      {newProject.image.includes(".mp4") ||
                      newProject.image.includes(".webm") ? (
                        <video
                          src={newProject.image}
                          className="w-full h-full object-cover"
                          autoPlay
                          loop
                          muted
                          playsInline
                        />
                      ) : (
                        <img
                          src={newProject.image}
                          alt="프로젝트 미리보기"
                          className="w-full h-full object-cover"
                        />
                      )}
                      <button
                        onClick={() =>
                          setNewProject({ ...newProject, image: "" })
                        }
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center gap-2 px-4 text-center">
                      <input
                        id="project-upload"
                        type="file"
                        accept="image/*,video/mp4,video/webm"
                        onChange={async (e) => {
                          const file = e.target.files?.[0]
                          if (!file) return

                          const isVideo = file.type.includes("video")
                          const maxSize = isVideo
                            ? 20 * 1024 * 1024
                            : 5 * 1024 * 1024

                          if (file.size > maxSize) {
                            alert(
                              `파일 크기는 ${
                                isVideo ? "20MB" : "5MB"
                              } 이하여야 합니다`,
                            )
                            return
                          }

                          const formData = new FormData()
                          formData.append("file", file)
                          formData.append("purpose", `project-${Date.now()}`)

                          try {
                            const response = await fetch(
                              isVideo
                                ? "/api/upload-video"
                                : "/api/upload-image",
                              {
                                method: "POST",
                                body: formData,
                              },
                            )

                            const result = await response.json()

                            if (result.success) {
                              setNewProject({
                                ...newProject,
                                image: result.path,
                              })
                            } else {
                              alert(`❌ ${result.error}`)
                            }
                          } catch {
                            alert("업로드 중 오류가 발생했습니다")
                          }
                        }}
                        className="hidden"
                      />
                      <label
                        htmlFor="project-upload"
                        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 cursor-pointer text-sm font-medium"
                      >
                        <Upload className="h-4 w-4 inline mr-2" />
                        파일 업로드
                      </label>
                      <input
                        type="text"
                        value={newProject.image}
                        onChange={(e) =>
                          setNewProject({
                            ...newProject,
                            image: e.target.value,
                          })
                        }
                        placeholder="또는 이미지/영상 URL 입력 (https://...)"
                        className="w-full mt-2 px-3 py-2 border rounded-lg bg-background text-xs"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* 프로젝트 제목 */}
              <div>
                <label className="text-sm font-medium mb-1 block">
                  프로젝트 제목
                </label>
                <input
                  type="text"
                  value={newProject.title}
                  onChange={(e) =>
                    setNewProject({ ...newProject, title: e.target.value })
                  }
                  placeholder="예: 평택시 동삭동 라움프라자 신축사업 PF IM"
                  className="w-full px-3 py-2 border rounded-lg bg-background text-sm"
                />
              </div>

              {/* 프로젝트 설명 */}
              <div>
                <label className="text-sm font-medium mb-1 block">
                  프로젝트 설명
                </label>
                <textarea
                  value={newProject.description}
                  onChange={(e) =>
                    setNewProject({
                      ...newProject,
                      description: e.target.value,
                    })
                  }
                  placeholder="예: 사업성 분석, PF 구조 설계, 리스크 요인 검토 등 구체적인 역할과 결과를 작성해 주세요."
                  className="w-full px-3 py-2 border rounded-lg bg-background resize-none text-sm"
                  rows={3}
                />
              </div>
            </div>

            <div className="mt-6 flex gap-2">
              <button
                onClick={async () => {
                  if (newProject.title && newProject.description) {
                    const isVideo =
                      newProject.image &&
                      (newProject.image.includes(".mp4") ||
                        newProject.image.includes(".webm"))

                    const projectData = {
                      image: isVideo ? "" : newProject.image,
                      video: isVideo ? newProject.image : "",
                      title: newProject.title,
                      description: newProject.description,
                    }

                    const updatedProjects = [
                      ...projectsInfo.projects,
                      projectData,
                    ]
                    const updatedInfo = {
                      ...projectsInfo,
                      projects: updatedProjects,
                    }
                    setProjectsInfo(updatedInfo)
                    saveData("projects-info", updatedInfo)

                    const success = await saveToFile(
                      "projects",
                      "Info",
                      updatedInfo,
                    )
                    if (success) {
                      alert("✅ 프로젝트가 추가되고 파일에 저장되었습니다!")
                    }

                    setNewProject({
                      image: "",
                      title: "",
                      description: "",
                    })
                    setShowProjectModal(false)
                  } else {
                    alert("제목과 설명을 입력해주세요")
                  }
                }}
                className="flex-1 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 text-sm font-medium"
              >
                추가
              </button>
              <button
                onClick={async () => {
                  if (
                    newProject.image &&
                    newProject.image.includes("/uploads/")
                  ) {
                    try {
                      await fetch("/api/delete-image", {
                        method: "DELETE",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ imagePath: newProject.image }),
                      })
                    } catch (error) {
                      console.error("Failed to delete uploaded file:", error)
                    }
                  }
                  setNewProject({ image: "", title: "", description: "" })
                  setShowProjectModal(false)
                }}
                className="flex-1 py-2 border rounded-lg hover:bg-muted text-sm"
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 표시 설정 모달 */}
      {showDisplaySettings && isEditMode && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]">
          <div className="bg-background border rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">더보기 / 노출 개수 설정</h3>
              <button
                onClick={() => setShowDisplaySettings(false)}
                className="p-1 hover:bg-muted rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-6">
              {/* 초기 표시 개수 */}
              <div>
                <label className="text-sm font-medium mb-2 block">
                  처음에 보여줄 프로젝트 개수
                </label>
                <div className="grid grid-cols-4 gap-2 mb-2">
                  {[3, 6, 9, 12].map((num) => (
                    <button
                      key={num}
                      onClick={() => {
                        updateProjectsInfo("initialDisplay", num)
                        setDisplayCount(Math.min(displayCount, num))
                      }}
                      className={`py-2 px-3 rounded-lg border text-xs transition-all ${
                        projectsInfo.initialDisplay === num
                          ? "bg-primary text-primary-foreground border-primary"
                          : "hover:bg-muted"
                      }`}
                    >
                      {num}개
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  value={projectsInfo.initialDisplay}
                  onChange={(e) => {
                    const value = Math.max(1, parseInt(e.target.value) || 1)
                    updateProjectsInfo("initialDisplay", value)
                    setDisplayCount(Math.min(displayCount, value))
                  }}
                  min={1}
                  max={100}
                  className="w-full px-3 py-2 border rounded-lg bg-background text-sm"
                  placeholder="직접 입력 (1-100)"
                />
              </div>

              {/* 더보기 클릭 시 추가 개수 */}
              <div>
                <label className="text-sm font-medium mb-2 block">
                  더보기 클릭 시 추가로 보여줄 개수
                </label>
                <div className="grid grid-cols-4 gap-2 mb-2">
                  {[3, 6, 9, 12].map((num) => (
                    <button
                      key={num}
                      onClick={() => updateProjectsInfo("loadMoreCount", num)}
                      className={`py-2 px-3 rounded-lg border text-xs transition-all ${
                        projectsInfo.loadMoreCount === num
                          ? "bg-primary text-primary-foreground border-primary"
                          : "hover:bg-muted"
                      }`}
                    >
                      {num}개
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  value={projectsInfo.loadMoreCount}
                  onChange={(e) => {
                    const value = Math.max(1, parseInt(e.target.value) || 1)
                    updateProjectsInfo("loadMoreCount", value)
                  }}
                  min={1}
                  max={100}
                  className="w-full px-3 py-2 border rounded-lg bg-background text-sm"
                  placeholder="직접 입력 (1-100)"
                />
              </div>

              {/* 현재 상태 미리보기 */}
              <div className="p-4 bg-muted/30 rounded-lg text-xs">
                <p className="text-sm font-medium mb-2">현재 설정</p>
                <p className="text-muted-foreground">
                  • 전체 프로젝트: {validProjects.length}개
                </p>
                <p className="text-muted-foreground">
                  • 처음 표시: {projectsInfo.initialDisplay}개
                </p>
                <p className="text-muted-foreground">
                  • 더보기 클릭당: {projectsInfo.loadMoreCount}개씩 추가
                </p>
                {validProjects.length > projectsInfo.initialDisplay && (
                  <p className="mt-2 text-primary">
                    → 더보기 버튼{" "}
                    {Math.ceil(
                      (validProjects.length - projectsInfo.initialDisplay) /
                        projectsInfo.loadMoreCount,
                    )}
                    번 클릭 시 전체 노출
                  </p>
                )}
              </div>

              {/* 팁 */}
              <div className="p-4 bg-primary/10 rounded-lg text-[11px] leading-relaxed">
                <p className="font-medium mb-1">💡 추천 설정</p>
                <p className="text-muted-foreground">
                  • 프로젝트가 많은 경우: 6개 표시, 3개씩 추가
                  <br />
                  • 프로젝트가 적은 경우: 3개 표시, 3개씩 추가
                  <br />
                  • 모바일 가독성을 위해 3의 배수로 맞추는 것을 권장합니다.
                </p>
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <button
                onClick={() => {
                  updateProjectsInfo("initialDisplay", 6)
                  updateProjectsInfo("loadMoreCount", 3)
                  setDisplayCount(6)
                }}
                className="flex-1 py-2 border rounded-lg hover:bg-muted text-sm"
              >
                기본값으로 초기화
              </button>
              <button
                onClick={async () => {
                  const success = await saveToFile(
                    "projects",
                    "Info",
                    projectsInfo,
                  )
                  if (success) {
                    alert("✅ 프로젝트 설정이 파일에 저장되었습니다!")
                  }
                  setShowDisplaySettings(false)
                }}
                className="flex-1 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 text-sm font-medium"
              >
                📁 저장 & 완료
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
