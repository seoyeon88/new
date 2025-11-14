"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { ArrowRight, Download, Mail } from "lucide-react"
import { EditableText } from "@/components/editable/editable-text"
import { EditableBackground } from "@/components/editable/editable-background"
import { useInlineEditor } from "@/contexts/inline-editor-context"

export function Hero() {
  const { getData, saveData, isEditMode } = useInlineEditor()

  const defaultInfo = {
    title: "배서연",
    subtitle: "부동산 금융 · 자산관리 포트폴리오",
    description: "데이터 기반 분석과 현장 경험을 바탕으로 오피스, 주거, 개발사업의\n가치를 설계하고 리스크를 관리합니다.",
    badge: "Real Estate Finance & Asset Management",
    primaryButtonLabel: "프로젝트 보러가기",
    secondaryButtonLabel: "Download Resume",
    mailButtonLabel: "이메일 연락하기"
  }

  const [heroInfo, setHeroInfo] = useState(defaultInfo)
  const [backgroundData, setBackgroundData] = useState({
    image: "",
    video: "",
    color: "",
    opacity: 0.1,
  })

  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const saved = getData("hero-info") as typeof defaultInfo | null
    if (saved) setHeroInfo({ ...defaultInfo, ...saved })

    const savedBg = getData("hero-background") as
      | { image: string; video: string; color: string; opacity: number }
      | null
    if (savedBg) setBackgroundData(savedBg)

    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 50)

    return () => clearTimeout(timer)
  }, [isEditMode])

  const updateHeroInfo = (key: keyof typeof defaultInfo, value: string) => {
    const next = { ...heroInfo, [key]: value }
    setHeroInfo(next)
    saveData("hero-info", next)
  }

  return (
    <EditableBackground
      image={backgroundData.image}
      video={backgroundData.video}
      color={backgroundData.color}
      opacity={backgroundData.opacity}
      onChange={(data) => {
        const nextBg = { ...backgroundData, ...data }
        setBackgroundData(nextBg)
        saveData("hero-background", nextBg)
      }}
      storageKey="hero-background"
      className="relative"
    >
      <section
        id="hero"
        className="relative overflow-hidden min-h-[calc(100vh-80px)] flex items-center py-16 sm:py-20 lg:py-24"
      >
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -left-48 top-0 h-72 w-96 rounded-full bg-slate-200/60 blur-3xl" />
          <div className="absolute bottom-0 -right-48 h-72 w-96 rounded-full bg-blue-100/50 blur-3xl" />
        </div>

        <div className="w-full flex flex-col gap-12 px-6 sm:px-10 lg:px-40 lg:flex-row lg:items-start lg:justify-between">
          <div
            className={`max-w-2xl space-y-6 transform transition-all duration-700 ease-out ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-500/10 px-3 py-1 text-xs font-medium text-primary">
              <span className="h-2 w-2 rounded-full bg-primary" />
              <EditableText
                value={heroInfo.badge}
                onChange={(v) => updateHeroInfo("badge", v)}
                storageKey="hero-badge"
              />
            </div>

            <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              <span className="bg-gradient-to-r from-primary via-blue-600 to-purple-500 bg-clip-text text-transparent">
                <EditableText
                  value={heroInfo.title}
                  onChange={(v) => updateHeroInfo("title", v)}
                  storageKey="hero-title"
                />
              </span>
              <span className="mt-6 block text-2xl text-muted-foreground sm:text-3xl">
                <EditableText
                  value={heroInfo.subtitle}
                  onChange={(v) => updateHeroInfo("subtitle", v)}
                  storageKey="hero-subtitle"
                />
              </span>
            </h1>

            <p className="text-pretty text-base text-muted-foreground sm:text-lg whitespace-pre-line">
              <EditableText
                value={heroInfo.description}
                onChange={(v) => updateHeroInfo("description", v)}
                storageKey="hero-description"
                multiline
              />
            </p>

            <div className="mt-8 space-y-2">
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={isEditMode ? undefined : "#projects"}
                  onClick={(e) => {
                    if (isEditMode) e.preventDefault()
                  }}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-md shadow-primary/25 transition hover:bg-primary/90"
                >
                  <ArrowRight className="h-4 w-4" />
                  <EditableText
                    value={heroInfo.primaryButtonLabel}
                    onChange={(v) => updateHeroInfo("primaryButtonLabel", v)}
                    storageKey="hero-primaryButton"
                  />
                </a>

                <a
                  href={isEditMode ? undefined : "/Seoyeon_Resume.pdf"}
                  download={!isEditMode}
                  onClick={(e) => {
                    if (isEditMode) e.preventDefault()
                  }}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-5 py-2.5 text-sm font-medium text-foreground shadow-sm transition hover:bg-muted/80"
                >
                  <Download className="h-4 w-4" />
                  <EditableText
                    value={heroInfo.secondaryButtonLabel}
                    onChange={(v) => updateHeroInfo("secondaryButtonLabel", v)}
                    storageKey="hero-secondaryButton"
                  />
                </a>
              </div>

              <div className="flex">
                <a
                  href={isEditMode ? undefined : "mailto:kimbob206@gmail.com"}
                  onClick={(e) => {
                    if (isEditMode) e.preventDefault()
                  }}
                  className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-muted-foreground hover:bg-muted/70"
                >
                  <Mail className="h-4 w-4" />
                  <EditableText
                    value={heroInfo.mailButtonLabel}
                    onChange={(v) => updateHeroInfo("mailButtonLabel", v)}
                    storageKey="hero-mailButton"
                  />
                </a>
              </div>
            </div>
          </div>

          <div
            className={`w-full max-w-xl lg:mt-13 transform transition-all duration-700 ease-out ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
            style={{ transitionDelay: isVisible ? "0.4s" : "0s" }}
          >
            <div className="flex flex-col items-stretch gap-8 lg:flex-row lg:items-center">
              <div className="flex-1 space-y-7">
                <div className="rounded-none border border-border/80 bg-background/80 p-5 shadow-lg backdrop-blur-sm">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Core Focus
                  </p>
                  <ul className="space-y-1.5 text-sm text-foreground">
                    <li>• 오피스·상업시설 PF 및 IM 작성</li>
                    <li>• 수익성 분석(DCF, IRR, NOI, Cap-rate)</li>
                    <li>• 경매·권리분석 및 리스크 검토</li>
                  </ul>
                </div>

                <div className="rounded-none border border-border/60 bg-gradient-to-br from-slate-300/10 via-background to-muted/30 p-5 shadow-md backdrop-blur-sm">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Keywords
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="rounded-full bg-background/70 px-3 py-1">
                      #Real Estate Finance
                    </span>
                    <span className="rounded-full bg-background/70 px-3 py-1">
                      #Asset Management
                    </span>
                    <span className="rounded-full bg-background/70 px-3 py-1">
                      #PF·개발사업 수지분석
                    </span>
                    <span className="rounded-full bg-background/70 px-3 py-1">
                      #데이터 기반 의사결정
                    </span>
                  </div>
                </div>
              </div>

              <div
                className={`flex justify-center lg:justify-end transform transition-all duration-700 ease-out ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                <div className="w-[210px] max-w-[60vw] rounded-none overflow-hidden border border-border/60 shadow-md bg-background">
                  <img
                    src="/profile.jpg"
                    alt="배서연 프로필 사진"
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </EditableBackground>
  )
}
