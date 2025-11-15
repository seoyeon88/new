"use client"

import * as React from "react"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import {
  Phone,
  Mail,
  MessageCircle,
  Instagram,
  Youtube,
  Facebook,
  MapPin,
  Clock,
  Globe,
  Twitter,
  Send,
  Linkedin,
  Edit2,
  X,
  Plus,
  Github,
  MessageSquare,
  Twitch,
  Save,
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { EditableText } from "@/components/editable/editable-text"
import { EditableBackground } from "@/components/editable/editable-background"
import { useInlineEditor } from "@/contexts/inline-editor-context"

// 사용 가능한 소셜 아이콘 정의
const AVAILABLE_ICONS = {
  instagram: Instagram,
  youtube: Youtube,
  facebook: Facebook,
  twitter: Twitter,
  linkedin: Linkedin,
  github: Github,
  discord: MessageSquare,
  twitch: Twitch,
  telegram: Send,
  globe: Globe,
  message: MessageCircle,
  mail: Mail,
}

export function Contact() {
  const { getData, saveData, isEditMode, saveToFile } = useInlineEditor()

  const [showProfileModal, setShowProfileModal] = useState(false)
  const [showSocialModal, setShowSocialModal] = useState(false)
  const [showQRModal, setShowQRModal] = useState(false)
  const [showIconPicker, setShowIconPicker] = useState<number | null>(null)

  // 섹션 애니메이션용 상태 + ref
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement | null>(null)

  // 기본 데이터
  const defaultInfo = {
    name: "배서연",
    title: "단국대학교 도시계획·부동산학부",
    company: "",
    experience: "Junior",
    phone: "010-3246-8533",
    email: "kimbob206@gmail.com",
    website: "",
    location: "서울시 양천구",
    workTime: "평일 09:00 - 18:00",
    responseTime: "24시간 이내 응답",
    sectionTitle: "연락처",
    sectionSubtitle:
      "프로젝트 문의나 협업 제안을 기다리고 있습니다. 편하신 방법으로 연락주세요!",
    qrTitle: "QR 코드로 연락처 저장",
    qrSubtitle: "스캔하면 연락처가 자동으로 저장됩니다",
    bottomMessage:
      "데이터로 리스크를 줄이고, 성과를 함께 만드는 파트너가 되겠습니다.",
    bottomSubMessage:
      "시간 내어 제 포트폴리오를 살펴봐 주셔서 감사합니다.",
    qrContent: ["name", "phone", "email", "location", "website"],
    profileEmoji: "✨",
    background: { image: "", video: "", color: "", opacity: 0.1 },
  }

  // 소셜 링크 기본값
  const defaultSocialLinks: { name: string; icon: string; url: string }[] = [
    {
      name: "LinkedIn",
      icon: "linkedin",
      url: "https://www.linkedin.com/in/seoyeon0825",
    },
    {
      name: "Instagram",
      icon: "instagram",
      url: "https://www.instagram.com/",
    },
    {
      name: "GitHub",
      icon: "github",
      url: "https://github.com/seoyeon0825",
    },
    {
      name: "Email",
      icon: "mail",
      url: "kimbob206@gmail.com",
    },
    {
      name: "Messege",
      icon: "message",
      url: "https://www.instagram.com/?flo=true",
    },
  ]

  const [contactInfo, setContactInfo] = useState(defaultInfo)
  const [socialLinks, setSocialLinks] = useState(defaultSocialLinks)
  const [backgroundData, setBackgroundData] = useState(defaultInfo.background)

  // 데이터 로드
  useEffect(() => {
    const savedData = getData("contact-info") as typeof defaultInfo | null
    if (savedData) {
      setContactInfo({ ...defaultInfo, ...savedData })
      if (savedData.background) {
        setBackgroundData(savedData.background)
      }
    }

    const savedSocial = getData("contact-social-links") as
      | { name: string; icon: string; url: string }[]
      | null
    if (savedSocial) {
      setSocialLinks(savedSocial)
    }

    const savedBg = getData("contact-background") as {
      image: string
      video: string
      color: string
      opacity: number
    } | null
    if (savedBg) {
      setBackgroundData(savedBg)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditMode])

  const updateContactInfo = (key: string, value: any) => {
    const newInfo = { ...contactInfo, [key]: value }
    setContactInfo(newInfo)
    saveData("contact-info", newInfo)
  }

  const addSocialLink = () => {
    const newLinks = [
      ...socialLinks,
      { name: "새 링크", icon: "globe", url: "" },
    ]
    setSocialLinks(newLinks)
    saveData("contact-social-links", newLinks)
  }

  const updateSocialLink = (
    index: number,
    field: "name" | "icon" | "url",
    value: string,
  ) => {
    const newLinks = [...socialLinks]
    newLinks[index] = { ...newLinks[index], [field]: value }
    setSocialLinks(newLinks)
    saveData("contact-social-links", newLinks)
  }

  const removeSocialLink = (index: number) => {
    const newLinks = socialLinks.filter((_, i) => i !== index)
    setSocialLinks(newLinks)
    saveData("contact-social-links", newLinks)
  }

  // QR 코드용 vCard 생성
  const generateVCard = () => {
    const qrContent =
      contactInfo.qrContent && contactInfo.qrContent.length > 0
        ? contactInfo.qrContent
        : ["name", "phone", "email"]

    let vCard = "BEGIN:VCARD\nVERSION:3.0\n"

    if (qrContent.includes("name")) {
      const displayName = contactInfo.title
        ? `${contactInfo.name} (${contactInfo.title})`
        : contactInfo.name

      vCard += `FN:${displayName}\n`
      vCard += `N:${contactInfo.name};;;;\n`
    }

    if (qrContent.includes("company") && contactInfo.company) {
      vCard += `ORG:${contactInfo.company}\n`
    }

    if (qrContent.includes("phone")) {
      vCard += `TEL;TYPE=CELL:${contactInfo.phone}\n`
    }

    if (qrContent.includes("email")) {
      vCard += `EMAIL:${contactInfo.email}\n`
    }

    if (qrContent.includes("location") && contactInfo.location) {
      vCard += `ADR;TYPE=WORK:;;${contactInfo.location};;;;\n`
    }

    if (qrContent.includes("website") && contactInfo.website) {
      vCard += `URL:${contactInfo.website}\n`
    }

    const activeSocialLinks = socialLinks.filter((link) => link.url)
    if (activeSocialLinks.length > 0) {
      let note = "SNS:\\n"
      activeSocialLinks.forEach((link) => {
        note += `${link.name}: ${link.url}\\n`
      })
      vCard += `NOTE:${note}\n`
    }

    vCard += "END:VCARD"
    return vCard
  }

  const vCardString = generateVCard()
  const encodedVCard = encodeURIComponent(vCardString.trim())
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=${encodedVCard}`

  // 스크롤 인 애니메이션
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
    <EditableBackground
      image={backgroundData.image}
      video={backgroundData.video}
      color={backgroundData.color}
      opacity={backgroundData.opacity}
      onChange={(data) => {
        const newData = { ...backgroundData, ...data }
        setBackgroundData(newData)
        saveData("contact-background", newData)

        const updatedContactInfo = { ...contactInfo, background: newData }
        setContactInfo(updatedContactInfo)
        saveData("contact-info", updatedContactInfo)
      }}
      storageKey="contact-background"
      className="relative"
    >
      <section
        id="contact"
        ref={sectionRef}
        className="relative py-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 상단 헤더 영역: 좌측 정렬 */}
          <div
            className={`mb-14 lg:mb-16 transform transition-all duration-1000 ease-out
              ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
            `}
          >
            <div className="flex flex-col gap-6">
              <div className="space-y-3">
                <p className="inline-block text-xs tracking-[0.18em] uppercase text-primary/80">
                  CONTACT
                </p>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground">
                  <EditableText
                    value={contactInfo.sectionTitle}
                    onChange={(value) => updateContactInfo("sectionTitle", value)}
                    storageKey="contact-sectionTitle"
                  />
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground max-w-3xl leading-relaxed">
                  <EditableText
                    value={contactInfo.sectionSubtitle}
                    onChange={(value) => updateContactInfo("sectionSubtitle", value)}
                    storageKey="contact-sectionSubtitle"
                    multiline
                  />
                </p>
              </div>
            </div>
          </div>

          {/* 메인 레이아웃: 좌측 정보 / 우측 QR */}
          <div
            className={`grid grid-cols-1 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1.1fr)] gap-10 lg:gap-12 xl:gap-16
              transform transition-all duration-1000 ease-out
              ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
            `}
            style={{ transitionDelay: isVisible ? "0.12s" : "0s" }}
          >
            {/* 좌측: 프로필 + 주요 연락 + 소셜 */}
            <div className="space-y-8">
              {/* 상단 프로필 영역 + 인라인 편집 버튼 */}
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1.5">
                  <h3 className="text-sm font-medium tracking-[0.16em] text-muted-foreground uppercase">
                    Profile
                  </h3>
                  
                </div>
                {isEditMode && (
                  <button
                    onClick={() => setShowProfileModal(true)}
                    className="inline-flex items-center gap-1.5 border border-border/80 bg-background/90 px-3 py-1.5 text-xs rounded-none hover:bg-muted/80 transition-colors"
                    title="프로필 편집"
                  >
                    <Edit2 className="h-3.5 w-3.5" />
                    <span>프로필 편집</span>
                  </button>
                )}
              </div>

              {/* 프로필 카드 */}
              <Card className="border border-border/70 bg-background/95 shadow-sm rounded-none px-6 sm:px-8 py-7">
                <div className="flex flex-col sm:flex-row items-start gap-6">
                  {/* 프로필 이미지 (이모지 → 이미지 변경) */}
                  <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 bg-primary/5 relative overflow-hidden">
                    <Image
                      src="/seoyeon_character.png"
                      alt={`${contactInfo.name} 프로필 이미지`}
                      fill
                      className="object-contain"
                      sizes="96px"
                    />
                  </div>

                  <div className="flex-1 space-y-2">
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-semibold text-foreground">
                        {contactInfo.name}
                      </h3>
                      <p className="text-sm sm:text-base text-primary mt-0.5">
                        {contactInfo.title}
                        {contactInfo.company ? ` · ${contactInfo.company}` : ""}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
                      <p className="text-muted-foreground">
                        <span className="font-medium text-foreground">경력&nbsp;|&nbsp;</span>
                        {contactInfo.experience}
                      </p>
                      <p className="text-muted-foreground">
                        <span className="font-medium text-foreground">응답&nbsp;|&nbsp;</span>
                        {contactInfo.responseTime}
                      </p>
                      <p className="text-muted-foreground">
                        <span className="font-medium text-foreground">위치&nbsp;|&nbsp;</span>
                        {contactInfo.location}
                      </p>
                      
                    </div>
                  </div>
                </div>
              </Card>

              {/* 주요 연락 수단 영역 */}
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <h3 className="text-sm font-medium tracking-[0.16em] text-muted-foreground uppercase">
                      Direct contact
                    </h3>
                    
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* 전화 */}
                  <a href={`tel:${contactInfo.phone}`} className="group">
                    <Card className="border border-border/70 bg-background/95 shadow-sm hover:shadow-md transition-all rounded-none hover:-translate-y-0.5 cursor-pointer">
                      <div className="flex items-center gap-3 px-4 py-4">
                        <div className="w-10 h-10 flex items-center justify-center bg-emerald-500/10 group-hover:bg-emerald-500/15 transition-colors">
                          <Phone className="h-5 w-5 text-emerald-600" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-0.5">
                            PHONE
                          </p>
                          <p className="text-sm font-medium text-foreground truncate">
                            {contactInfo.phone}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </a>

                  {/* 이메일 */}
                  <a href={`mailto:${contactInfo.email}`} className="group">
                    <Card className="border border-border/70 bg-background/95 shadow-sm hover:shadow-md transition-all rounded-none hover:-translate-y-0.5 cursor-pointer">
                      <div className="flex items-center gap-3 px-4 py-4">
                        <div className="w-10 h-10 flex items-center justify-center bg-sky-500/10 group-hover:bg-sky-500/15 transition-colors">
                          <Mail className="h-5 w-5 text-sky-600" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-0.5">
                            EMAIL
                          </p>
                          <p className="text-sm font-medium text-foreground truncate">
                            {contactInfo.email}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </a>

                  {/* 위치 */}
                  <Card className="border border-border/70 bg-background/95 shadow-sm rounded-none">
                    <div className="flex items-center gap-3 px-4 py-4">
                      <div className="w-10 h-10 flex items-center justify-center bg-primary/5">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-0.5">
                          LOCATION
                        </p>
                        <p className="text-sm font-medium text-foreground truncate">
                          {contactInfo.location}
                        </p>
                      </div>
                    </div>
                  </Card>

                  {/* 업무시간 */}
                  <Card className="border border-border/70 bg-background/95 shadow-sm rounded-none">
                    <div className="flex items-center gap-3 px-4 py-4">
                      <div className="w-10 h-10 flex items-center justify-center bg-primary/5">
                        <Clock className="h-5 w-5 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-0.5">
                          WORK TIME
                        </p>
                        <p className="text-sm font-medium text-foreground truncate">
                          {contactInfo.workTime}
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>

              {/* 소셜 미디어 영역 */}
              <div className="space-y-4 pt-2 border-t border-dashed border-border/60 mt-6">
                <div className="flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <h3 className="text-sm font-medium tracking-[0.16em] text-muted-foreground uppercase">
                      Social
                    </h3>
                    
                  </div>
                  {isEditMode && (
                    <button
                      onClick={() => setShowSocialModal(true)}
                      className="inline-flex items-center gap-1.5 border border-border/80 bg-background/90 px-3 py-1.5 text-xs rounded-none hover:bg-muted/80 transition-colors"
                      title="소셜 미디어 편집"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                      <span>소셜 편집</span>
                    </button>
                  )}
                </div>

                <Card className="border border-border/70 bg-background/95 shadow-sm rounded-none px-4 py-4">
                  <div className="flex flex-wrap gap-2.5">
                    {socialLinks.map((link, index) => {
                      if (!link.url) return null

                      const Icon =
                        AVAILABLE_ICONS[
                          link.icon as keyof typeof AVAILABLE_ICONS
                        ] || Globe

                      const isEmail =
                        link.icon === "mail" || link.url.startsWith("mailto:")
                      const href =
                        isEmail && !link.url.startsWith("mailto:")
                          ? `mailto:${link.url}`
                          : link.url

                      let bgClass = "bg-primary/5 hover:bg-primary/10"
                      let iconClass = "text-primary"

                      switch (link.icon) {
                        case "message":
                          bgClass = "bg-yellow-500/5 hover:bg-yellow-500/10"
                          iconClass = "text-yellow-600"
                          break
                        case "instagram":
                          bgClass = "bg-pink-500/5 hover:bg-pink-500/10"
                          iconClass = "text-pink-600"
                          break
                        case "youtube":
                          bgClass = "bg-red-500/5 hover:bg-red-500/10"
                          iconClass = "text-red-600"
                          break
                        case "facebook":
                          bgClass = "bg-blue-600/5 hover:bg-blue-600/10"
                          iconClass = "text-blue-600"
                          break
                        case "twitter":
                          bgClass = "bg-sky-500/5 hover:bg-sky-500/10"
                          iconClass = "text-sky-600"
                          break
                        case "linkedin":
                          bgClass = "bg-blue-700/5 hover:bg-blue-700/10"
                          iconClass = "text-blue-700"
                          break
                        case "telegram":
                          bgClass = "bg-blue-500/5 hover:bg-blue-500/10"
                          iconClass = "text-blue-500"
                          break
                        case "github":
                          bgClass = "bg-zinc-800/5 hover:bg-zinc-800/10"
                          iconClass = "text-zinc-800"
                          break
                        case "discord":
                          bgClass = "bg-purple-500/5 hover:bg-purple-500/10"
                          iconClass = "text-purple-600"
                          break
                        case "twitch":
                          bgClass = "bg-purple-600/5 hover:bg-purple-600/10"
                          iconClass = "text-purple-700"
                          break
                        case "mail":
                          bgClass = "bg-blue-500/5 hover:bg-blue-500/10"
                          iconClass = "text-blue-600"
                          break
                      }

                      return (
                        <a
                          key={index}
                          href={href}
                          target={isEmail ? undefined : "_blank"}
                          rel={isEmail ? undefined : "noopener noreferrer"}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium tracking-tight border border-border/80 ${bgClass} rounded-none transition-colors`}
                          aria-label={link.name}
                          title={link.name}
                        >
                          <Icon className={`h-4 w-4 ${iconClass}`} />
                          <span className="truncate max-w-[120px]">
                            {link.name}
                          </span>
                        </a>
                      )
                    })}
                  </div>

                  {socialLinks.every((link) => !link.url) && (
                    <p className="text-sm text-muted-foreground mt-2">
                      소셜 미디어 링크를 추가해주세요.
                    </p>
                  )}
                </Card>
              </div>
            </div>

            {/* 우측: QR + 요약 안내 */}
            <div className="space-y-6 lg:pl-8 lg:border-l lg:border-border/60">
              <Card className="border border-border/70 bg-background/95 shadow-sm rounded-none px-6 sm:px-8 py-7">
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="space-y-1">
                    <h4 className="text-base sm:text-lg font-semibold text-foreground">
  <EditableText
    value={contactInfo.qrTitle}
    onChange={(value) => updateContactInfo("qrTitle", value)}
    storageKey="contact-qrTitle"
  />
</h4>
<p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
  <EditableText
    value={contactInfo.qrSubtitle}
    onChange={(value) => updateContactInfo("qrSubtitle", value)}
    storageKey="contact-qrSubtitle"
    multiline
  />
</p>
                  </div>
                  {isEditMode && (
                    <button
                      onClick={() => setShowQRModal(true)}
                      className="inline-flex items-center gap-1.5 border border-border/80 bg-background/90 px-3 py-1.5 text-xs rounded-none hover:bg-muted/80 transition-colors"
                      title="QR 코드 설정"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                      <span>QR 설정</span>
                    </button>
                  )}
                </div>

                {/* QR 코드 + 포함 정보만 유지 (사용예시/권장 설정 블록 삭제) */}
                <div className="grid grid-cols-1 gap-6">
                  <div className="flex justify-center">
                    <div className="border border-border/80 bg-background/80 p-3 rounded-none">
                      <Image
                        src={qrCodeUrl}
                        alt="연락처 QR 코드"
                        width={280}
                        height={280}
                        className="w-[220px] h-[220px] sm:w-[260px] sm:h-[260px]"
                        style={{ imageRendering: "crisp-edges" }}
                        unoptimized
                      />
                    </div>
                  </div>

                  <div className="space-y-3 border border-dashed border-border/70 bg-muted/40 px-4 py-4 rounded-none">
                    <p className="text-xs text-muted-foreground">
                      📱 카메라 또는 QR 스캐너로 코드를 인식하면, 연락처 앱에 아래
                      정보가 자동으로 채워집니다.
                    </p>
                    <div className="text-xs text-muted-foreground">
                      <span className="font-medium text-foreground">
                        포함된 정보:&nbsp;
                      </span>
                      {contactInfo.qrContent?.length
                        ? contactInfo.qrContent
                            .map((key) => {
                              switch (key) {
                                case "name":
                                  return "이름"
                                case "phone":
                                  return "전화번호"
                                case "email":
                                  return "이메일"
                                case "title":
                                  return "직함"
                                case "company":
                                  return "회사"
                                case "location":
                                  return "위치"
                                case "website":
                                  return "웹사이트"
                                default:
                                  return key
                              }
                            })
                            .join(", ")
                        : "없음"}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* 하단 메시지 (각진 박스) */}
          <div
            className={`mt-16 sm:mt-18 lg:mt-20 transform transition-all duration-1000 ease-out
              ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
            `}
            style={{ transitionDelay: isVisible ? "0.25s" : "0s" }}
          >
            <div className="border border-border/70 bg-background/95 shadow-sm px-6 sm:px-8 py-7 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between rounded-none">
              <div className="flex-1 space-y-1.5">
                <p className="text-xs sm:text-sm font-medium tracking-wide text-muted-foreground">
                  <EditableText
                    value={contactInfo.bottomSubMessage}
                    onChange={(value) =>
                      updateContactInfo("bottomSubMessage", value)
                    }
                    storageKey="contact-bottomSubMessage"
                  />
                </p>
                <p className="text-base sm:text-lg font-semibold text-foreground">
                  <EditableText
                    value={contactInfo.bottomMessage}
                    onChange={(value) =>
                      updateContactInfo("bottomMessage", value)
                    }
                    storageKey="contact-bottomMessage"
                  />
                </p>
              </div>
              <div className="hidden sm:flex flex-col items-end text-[11px] text-muted-foreground tracking-[0.18em] uppercase">
                <span>Ready to collaborate</span>
                <span>Project · Research · Career talk</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 모달들 ===== */}

      {/* 프로필 편집 모달 */}
      {showProfileModal && isEditMode && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]">
          <div className="bg-background border rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">프로필 정보 편집</h3>
              <button
                onClick={() => setShowProfileModal(false)}
                className="p-1 hover:bg-muted rounded-lg transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* 기본 정보 */}
            <div className="space-y-4 mb-6">
              <h4 className="font-medium">기본 정보</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground">이름</label>
                  <input
                    type="text"
                    value={contactInfo.name}
                    onChange={(e) =>
                      updateContactInfo("name", e.target.value)
                    }
                    className="w-full px-3 py-2 border rounded-lg bg-background"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">직함</label>
                  <input
                    type="text"
                    value={contactInfo.title}
                    onChange={(e) =>
                      updateContactInfo("title", e.target.value)
                    }
                    className="w-full px-3 py-2 border rounded-lg bg-background"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">
                    회사명 (선택)
                  </label>
                  <input
                    type="text"
                    value={contactInfo.company}
                    onChange={(e) =>
                      updateContactInfo("company", e.target.value)
                    }
                    className="w-full px-3 py-2 border rounded-lg bg-background"
                    placeholder="회사명"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">경력</label>
                  <input
                    type="text"
                    value={contactInfo.experience}
                    onChange={(e) =>
                      updateContactInfo("experience", e.target.value)
                    }
                    className="w-full px-3 py-2 border rounded-lg bg-background"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">
                    프로필 이모지
                  </label>
                  <input
                    type="text"
                    value={contactInfo.profileEmoji}
                    onChange={(e) =>
                      updateContactInfo("profileEmoji", e.target.value)
                    }
                    className="w-full px-3 py-2 border rounded-lg bg-background"
                    placeholder="👤"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">
                    응답 시간
                  </label>
                  <input
                    type="text"
                    value={contactInfo.responseTime}
                    onChange={(e) =>
                      updateContactInfo("responseTime", e.target.value)
                    }
                    className="w-full px-3 py-2 border rounded-lg bg-background"
                  />
                </div>
              </div>
            </div>

            {/* 연락처 정보 */}
            <div className="space-y-4 mb-6">
              <h4 className="font-medium">연락처</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground">
                    전화번호
                  </label>
                  <input
                    type="text"
                    value={contactInfo.phone}
                    onChange={(e) =>
                      updateContactInfo("phone", e.target.value)
                    }
                    className="w-full px-3 py-2 border rounded-lg bg-background"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">
                    이메일
                  </label>
                  <input
                    type="email"
                    value={contactInfo.email}
                    onChange={(e) =>
                      updateContactInfo("email", e.target.value)
                    }
                    className="w-full px-3 py-2 border rounded-lg bg-background"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">위치</label>
                  <input
                    type="text"
                    value={contactInfo.location}
                    onChange={(e) =>
                      updateContactInfo("location", e.target.value)
                    }
                    className="w-full px-3 py-2 border rounded-lg bg-background"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">
                    업무시간
                  </label>
                  <input
                    type="text"
                    value={contactInfo.workTime}
                    onChange={(e) =>
                      updateContactInfo("workTime", e.target.value)
                    }
                    className="w-full px-3 py-2 border rounded-lg bg-background"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">
                    웹사이트
                  </label>
                  <input
                    type="text"
                    value={contactInfo.website || ""}
                    onChange={(e) =>
                      updateContactInfo("website", e.target.value)
                    }
                    className="w-full px-3 py-2 border rounded-lg bg-background"
                    placeholder="https://example.com"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={async () => {
                  const success = await saveToFile("contact", "Info", contactInfo)
                  if (success) {
                    console.log("✅ 프로필 정보 저장 완료")
                  }
                  setShowProfileModal(false)
                }}
                className="flex-1 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center gap-2"
              >
                <Save className="h-4 w-4" />
                저장 & 완료
              </button>
              <button
                onClick={() => setShowProfileModal(false)}
                className="flex-1 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 소셜 미디어 편집 모달 */}
      {showSocialModal && isEditMode && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]">
          <div className="bg-background border rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">소셜 링크 편집</h3>
              <button
                onClick={() => {
                  setShowSocialModal(false)
                  setShowIconPicker(null)
                }}
                className="p-1 hover:bg-muted rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3">
              {socialLinks.map((link, index) => {
                const Icon =
                  AVAILABLE_ICONS[link.icon as keyof typeof AVAILABLE_ICONS] ||
                  Globe

                return (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 border rounded-lg"
                  >
                    <div className="w-10 h-10 rounded-full border border-foreground/20 flex items-center justify-center">
                      <Icon className="h-5 w-5" />
                    </div>

                    <input
                      type="text"
                      value={link.name}
                      onChange={(e) =>
                        updateSocialLink(index, "name", e.target.value)
                      }
                      placeholder="플랫폼 이름"
                      className="w-32 px-3 py-2 border rounded-lg bg-background"
                    />

                    <div className="relative">
                      <button
                        onClick={() =>
                          setShowIconPicker(
                            showIconPicker === index ? null : index,
                          )
                        }
                        className="px-3 py-2 border rounded-lg bg-background hover:bg-muted flex items-center gap-2"
                      >
                        <Icon className="h-4 w-4" />
                        <span className="text-sm">아이콘 변경</span>
                      </button>

                      {showIconPicker === index && (
                        <div className="absolute top-full mt-2 left-0 bg-background border rounded-lg shadow-lg p-2 z-50 w-64 max-h-64 overflow-y-auto">
                          <div className="text-xs font-medium text-muted-foreground mb-2 px-2">
                            소셜 미디어
                          </div>
                          <div className="grid grid-cols-4 gap-1">
                            {[
                              { value: "instagram", label: "Instagram" },
                              { value: "youtube", label: "YouTube" },
                              { value: "facebook", label: "Facebook" },
                              { value: "twitter", label: "Twitter" },
                              { value: "linkedin", label: "LinkedIn" },
                              { value: "github", label: "GitHub" },
                              { value: "discord", label: "Discord" },
                              { value: "twitch", label: "Twitch" },
                              { value: "telegram", label: "Telegram" },
                              { value: "message", label: "메시지" },
                              { value: "mail", label: "이메일" },
                              { value: "globe", label: "웹사이트" },
                            ].map(({ value, label }) => {
                              const IconOption =
                                AVAILABLE_ICONS[
                                  value as keyof typeof AVAILABLE_ICONS
                                ]
                              return (
                                <button
                                  key={value}
                                  onClick={() => {
                                    updateSocialLink(index, "icon", value)
                                    setShowIconPicker(null)
                                  }}
                                  className="p-2 hover:bg-muted rounded-lg flex flex-col items-center gap-1 transition-colors"
                                  title={label}
                                >
                                  <IconOption className="h-5 w-5" />
                                  <span className="text-xs">{label}</span>
                                </button>
                              )
                            })}
                          </div>
                        </div>
                      )}
                    </div>

                    <input
                      type="text"
                      value={link.url}
                      onChange={(e) =>
                        updateSocialLink(index, "url", e.target.value)
                      }
                      placeholder="URL 또는 이메일"
                      className="flex-1 px-3 py-2 border rounded-lg bg-background"
                    />

                    <button
                      onClick={() => removeSocialLink(index)}
                      className="p-2 text-destructive hover:bg-destructive/10 rounded-lg"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )
              })}

              <button
                onClick={addSocialLink}
                className="w-full py-3 border-2 border-dashed rounded-lg hover:border-primary hover:bg-primary/5 transition-all"
              >
                <Plus className="h-4 w-4 inline mr-2" />
                소셜 링크 추가
              </button>
            </div>

            <div className="mt-6 pt-4 border-t">
              <p className="text-sm text-muted-foreground mb-4">
                💡 팁: 플랫폼 이름을 입력하고, 아이콘을 선택한 후 URL을 입력하세요.
                빈 URL은 표시되지 않습니다.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={async () => {
                    const success = await saveToFile(
                      "contact",
                      "SocialLinks",
                      socialLinks,
                    )
                    if (success) {
                      console.log("✅ 소셜 링크 저장 완료")
                    }
                    setShowSocialModal(false)
                    setShowIconPicker(null)
                  }}
                  className="flex-1 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  저장 & 완료
                </button>
                <button
                  onClick={() => {
                    setShowSocialModal(false)
                    setShowIconPicker(null)
                  }}
                  className="flex-1 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* QR 코드 설정 모달 */}
      {showQRModal && isEditMode && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]">
          <div className="bg-background border rounded-lg p-6 max-w-lg w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">QR 코드 설정</h3>
              <button
                onClick={() => setShowQRModal(false)}
                className="p-1 hover:bg-muted rounded-lg transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <p className="text-sm text-muted-foreground">
                QR 코드에 포함할 정보를 선택하세요
              </p>

              <div className="space-y-2">
                {[
                  { key: "name", label: "이름" },
                  { key: "phone", label: "전화번호" },
                  { key: "email", label: "이메일" },
                  { key: "title", label: "직함" },
                  { key: "company", label: "회사명" },
                  { key: "location", label: "위치" },
                  { key: "website", label: "웹사이트" },
                ].map(({ key, label }) => (
                  <label key={key} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={contactInfo.qrContent?.includes(key) || false}
                      onChange={(e) => {
                        const currentContent = contactInfo.qrContent || []
                        const newContent = e.target.checked
                          ? [...currentContent, key]
                          : currentContent.filter(
                              (item: string) => item !== key,
                            )
                        updateContactInfo("qrContent", newContent)
                      }}
                      className="rounded"
                    />
                    <span className="text-sm">{label}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              onClick={() => setShowQRModal(false)}
              className="w-full py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
            >
              완료
            </button>
          </div>
        </div>
      )}
    </EditableBackground>
  )
}
