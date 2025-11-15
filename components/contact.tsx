"use client"

import * as React from "react"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import {
  Mail,
  MapPin,
  ArrowRight,
  Linkedin,
  Github,
  MessageCircle,
  Send,
  Twitter,
  Youtube,
  Facebook,
  MessageSquare,
  Twitch,
} from "lucide-react"
import { Card } from "@/components/ui/card"

const SOCIAL_ICONS = {
  linkedin: Linkedin,
  github: Github,
  message: MessageCircle,
  mail: Mail,
  globe: Send,
  twitter: Twitter,
  youtube: Youtube,
  facebook: Facebook,
  discord: MessageSquare,
  twitch: Twitch,
  telegram: Send,
} as const

type SocialKey = keyof typeof SOCIAL_ICONS

interface SocialLink {
  name: string
  icon: SocialKey
  url: string
}

const CONTACT_INFO = {
  name: "배서연",
  title: "단국대학교 도시계획·부동산학부",
  company: "",
  experience: "Junior",
  email: "kimbob206@gmail.com",
  website: "",
  location: "서울시 양천구",
  workTime: "평일 09:00 - 18:00",
  responseTime: "24시간 이내 응답",
  sectionTitle: "연락처",
  sectionSubtitle:
    "프로젝트 문의나 협업 제안을 기다리고 있습니다. 편하신 방법으로 연락 주세요!",
  qrTitle: "QR 코드로 연락처 저장",
  bottomSubMessage: "시간 내어 제 포트폴리오를 살펴봐 주셔서 감사합니다.",
  qrContent: ["name", "email", "location"] as const,
}

const SOCIAL_LINKS: SocialLink[] = [
  {
    name: "LinkedIn",
    icon: "linkedin",
    url: "https://www.linkedin.com/in/seoyeon0825",
  },
  {
    name: "GitHub",
    icon: "github",
    url: "https://github.com/seoyeon0825",
  },
  {
    name: "Email",
    icon: "mail",
    url: "mailto:kimbob206@gmail.com",
  },
  {
    name: "Message",
    icon: "message",
    url: "https://www.instagram.com/?flo=true",
  },
]

// vCard 생성
function generateVCard() {
  const info = CONTACT_INFO
  const qrContent =
    info.qrContent.length > 0 ? info.qrContent : (["name", "email"] as const)

  let vCard = "BEGIN:VCARD\nVERSION:3.0\n"

  if (qrContent.includes("name")) {
    const displayName = info.title ? `${info.name} (${info.title})` : info.name
    vCard += `FN:${displayName}\n`
    vCard += `N:${info.name};;;;\n`
  }

  if (qrContent.includes("email")) {
    vCard += `EMAIL:${info.email}\n`
  }

  if (qrContent.includes("location")) {
    vCard += `ADR;TYPE=WORK:;;${info.location};;;;\n`
  }

  const activeSocialLinks = SOCIAL_LINKS.filter((l) => l.url)
  if (activeSocialLinks.length > 0) {
    let note = "SNS:\\n"
    activeSocialLinks.forEach((l) => {
      note += `${l.name}: ${l.url}\\n`
    })
    vCard += `NOTE:${note}\n`
  }

  vCard += "END:VCARD"
  return vCard
}

const VCARD_STRING = generateVCard()
const QR_CODE_URL = `https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=${encodeURIComponent(
  VCARD_STRING.trim(),
)}`

export function Contact() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement | null>(null)

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
      { threshold: 0.2 },
    )

    observer.observe(target)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="contact"
      ref={sectionRef}
      className={`relative border-t border-slate-200 
        bg-slate-50
        pt-20 pb-24 sm:pb-28 
        transition-all duration-1000 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
    >
      {/* 자연스러운 한 톤 어둡게 오버레이 */}
      <div className="absolute inset-0 bg-black/2 pointer-events-none"></div>

      {/* 메인 콘텐츠 컨테이너 */}
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-10 xl:px-0">
        {/* ===== 헤더 ===== */}
        <header className="mb-10 lg:mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span className="text-[12px] font-medium tracking-[0.18em] text-slate-600">
              CONTACT
            </span>
          </div>

          <div className="mt-5 space-y-4">
            <h2 className="text-4xl sm:text-5xl lg:text-[2.9rem] font-semibold tracking-tight text-slate-900">
              {CONTACT_INFO.sectionTitle}
            </h2>
            <p className="text-[16px] sm:text-[18px] lg:text-[20px] text-slate-600 max-w-3xl leading-relaxed">
              {CONTACT_INFO.sectionSubtitle}
            </p>
          </div>
        </header>

        {/* ===== 메인 영역 (단일 카드) ===== */}
        <div className="relative">
          <Card
            className={`relative border border-slate-200/80 bg-white/95 rounded-[32px] 
              px-6 sm:px-8 py-9 sm:py-10 
              shadow-[0_12px_26px_rgba(15,23,42,0.08)] 
              transition-all duration-1000 ease-out ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
          >
            <div className="grid lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] gap-8 lg:gap-12 xl:gap-16">
              {/* ===== 좌측: 프로필 + 이메일 + 소셜 ===== */}
              <div className="flex flex-col justify-center space-y-6 pl-6 sm:pl-7 lg:pl-9">
                {/* 프로필 영역 */}
                <div className="flex items-start gap-5 sm:gap-6 scale-110 origin-left">
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 rounded-2xl bg-slate-900/5 overflow-hidden">
                    <Image
                      src="/seoyeon_character.png"
                      alt={`${CONTACT_INFO.name} 프로필 이미지`}
                      fill
                      className="object-contain"
                    />
                  </div>

                  <div className="flex-1 space-y-3">
                    <div>
                      <h3 className="text-2xl sm:text-[1.6rem] font-semibold text-slate-900">
                        {CONTACT_INFO.name}
                      </h3>
                      <p className="mt-1 text-sm sm:text-[15px] text-emerald-700">
                        {CONTACT_INFO.title}
                        {CONTACT_INFO.company ? ` · ${CONTACT_INFO.company}` : ""}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 text-xs sm:text-[13px] text-slate-600">
                      <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mr-1.5" />
                        {CONTACT_INFO.experience} · Real Estate
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5">
                        <MapPin className="h-3.5 w-3.5 text-emerald-600" />
                        서울시
                      </span>
                      <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1.5">
                        {CONTACT_INFO.responseTime}
                      </span>
                    </div>
                  </div>
                </div>
              
                {/* 메인 CTA – 이메일 */}
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="group rounded-2xl bg-slate-900/90 text-slate-50 px-5 py-4 sm:px-6 sm:py-4 flex items-center justify-between gap-4 cursor-pointer transition-all hover:bg-slate-900"
                >
                  <div className="space-y-1">
                    <p className="text-[12px] uppercase tracking-[0.18em] text-slate-300">
                      PRIMARY CHANNEL
                    </p>
                    <p className="text-sm sm:text-[15px] font-medium">
                      {CONTACT_INFO.email}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-[12px] sm:text-sm font-medium">
                    이메일 보내기
                    <ArrowRight className="h-4 w-4 translate-x-0 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </a>

                {/* 구분선 */}
                <div className="border-t border-slate-200/70 pt-5" />

                {/* 소셜 아이콘 스트립 */}
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm sm:text-[16px] font-semibold text-slate-700 ml-1 sm:ml-0">
                    Social Channels
                  </p>
                  <div className="flex items-center gap-2.5">
                    {SOCIAL_LINKS.filter((link) => link.url).map((link, index) => {
                      const Icon = SOCIAL_ICONS[link.icon]
                      const isEmail =
                        link.icon === "mail" || link.url.startsWith("mailto:")

                      return (
                        <a
                          key={index}
                          href={link.url}
                          target={isEmail ? undefined : "_blank"}
                          rel={isEmail ? undefined : "noopener noreferrer"}
                          className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-50/80 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-colors"
                        >
                          <Icon className="h-4 w-4" />
                        </a>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* ===== 우측: QR 영역 ===== */}
<div className="mt-4 lg:mt-0 lg:pl-4 lg:pr-20 flex flex-col justify-center items-center lg:items-end">
                <div className="space-y-5 w-full lg:w-auto flex flex-col items-center lg:items-end">
                  <div className="space-y-2 text-center lg:text-center">
                    <h4 className="text-lg sm:text-xl font-semibold text-slate-900">
                      {CONTACT_INFO.qrTitle}
                    </h4>
                    <p className="text-sm text-slate-600">
                      카메라로 스캔 시 선택한 정보가 연락처로 저장됩니다.
                    </p>
                  </div>

                  <div className="pr-3.5 flex justify-center lg:justify-end">
                    <div className="border border-slate-200 bg-slate-50 p-3 rounded-2xl">
                      <Image
                        src={QR_CODE_URL}
                        alt="연락처 QR 코드"
                        width={280}
                        height={280}
                        className="w-[200px] h-[200px] sm:w-[220px] sm:h-[220px]"
                        style={{ imageRendering: "crisp-edges" }}
                        unoptimized
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* ===== 하단 메시지 ===== */}
        <div
          className={`mt-37 text-center transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: isVisible ? "0.15s" : "0s" }}
        >
          <p className="text-lg sm:text-2xl font-semibold text-slate-600 mb-2">
            제 작업과 여정을 찾아와 주셔서 감사합니다.
          </p>
          <p className="text-sm sm:text-base text-slate-500">
            앞으로의 가능성을 함께 만들어갈 수 있기를 기대합니다.
          </p>
        </div>
      </div>
    </section>
  )
}
