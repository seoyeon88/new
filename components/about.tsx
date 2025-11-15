"use client"

import * as React from "react"
import { useState, useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import {
  Briefcase,
  GraduationCap,
  Award,
  Heart,
  Coffee,
  Book,
  Plus,
  X,
  Settings,
  Calendar,
  Building,
  User,
  Trophy,
  Star,
  Lightbulb,
  Target,
  Rocket,
  Shield,
  Sparkles,
  Code,
  Database,
  Palette,
  Megaphone,
  BarChart3,
  LineChart,
  PieChart,
  Activity,
  Brain,
  Cpu,
  Layers,
  Package,
  Server,
  Smartphone,
  Monitor,
  Wifi,
  Cloud,
  Lock,
  Key,
  Eye,
  Search,
  Filter,
  Edit,
  FileText,
  FolderOpen,
  GitBranch,
  Hash,
  Inbox,
  Send,
  MessageSquare,
  Music,
  Camera,
  Video,
  Mic,
  Volume2,
  Headphones,
  Radio,
  Zap,
  Globe,
  Users,
  TrendingUp,
  BookOpen,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  Home,
  School,
} from "lucide-react"
import { EditableText } from "@/components/editable/editable-text"
import { EditableMedia } from "@/components/editable/editable-media"
import { EditableBackground } from "@/components/editable/editable-background"
import { useInlineEditor } from "@/contexts/inline-editor-context"
import { COMMON_STYLES } from "@/lib/constants"
import FadeUp from "@/components/animations/FadeUp"

// 경험 카드용 아이콘
const AVAILABLE_ICONS = {
  briefcase: Briefcase,
  graduation: GraduationCap,
  award: Award,
  trophy: Trophy,
  star: Star,
  lightbulb: Lightbulb,
  target: Target,
  rocket: Rocket,
  shield: Shield,
  building: Building,
  calendar: Calendar,
  book: Book,
  heart: Heart,
  coffee: Coffee,
  user: User,
  zap: Zap,
  globe: Globe,
  users: Users,
  trending: TrendingUp,
  bookOpen: BookOpen,
  mapPin: MapPin,
  clock: Clock,
  check: CheckCircle,
  alert: AlertCircle,
  home: Home,
  school: School,
}

// 스킬 카드용 아이콘
const SKILL_ICONS = {
  trophy: Trophy,
  sparkles: Sparkles,
  target: Target,
  rocket: Rocket,
  star: Star,
  zap: Zap,
  lightbulb: Lightbulb,
  brain: Brain,
  code: Code,
  database: Database,
  palette: Palette,
  megaphone: Megaphone,
  barChart: BarChart3,
  lineChart: LineChart,
  pieChart: PieChart,
  activity: Activity,
  cpu: Cpu,
  layers: Layers,
  package: Package,
  server: Server,
  smartphone: Smartphone,
  monitor: Monitor,
  wifi: Wifi,
  cloud: Cloud,
  lock: Lock,
  key: Key,
  eye: Eye,
  search: Search,
  filter: Filter,
  edit: Edit,
  fileText: FileText,
  folderOpen: FolderOpen,
  gitBranch: GitBranch,
  hash: Hash,
  inbox: Inbox,
  send: Send,
  messageSquare: MessageSquare,
  music: Music,
  camera: Camera,
  video: Video,
  mic: Mic,
  volume: Volume2,
  headphones: Headphones,
  radio: Radio,
  heart: Heart,
  shield: Shield,
  globe: Globe,
  users: Users,
}

export function About() {
  const { getData, saveData, isEditMode, saveToFile } = useInlineEditor()

  // 기본 데이터
  const defaultInfo = {
    title: "소개",
    subtitle: "성취와 경험을 한눈에 정리한 프로필입니다.",
    background: { image: "", video: "", color: "", opacity: 0.1 },
    experienceCards: [
      {
        icon: "graduation",
        title: "단국대학교 죽전캠퍼스",
        period: "2023.03 ~ 2027.02(졸업예정)",
        description: "부동산학 전공 및 경영학 복수전공",
      },
      {
        icon: "graduation",
        title: "URID 12-13기",
        period: "2024.03 - 2024.12",
        description: "교내 부동산학회 활동",
      },
      {
        icon: "award",
        title: "경매 권리분석보고서 우수상",
        period: "2025.01",
        description: "건국대 · 단국대 · 중앙대 연합 학술제",
      },
      {
        icon: "briefcase",
        title: "무궁화신탁 Internship",
        period: "2025.07 - 2025.09",
        description: "신탁영업 1본부 3팀",
      },
      {
        icon: "book",
        title: "금융직무특화교육 이수",
        period: "2025.09",
        description: "타임금융교육원 부동산운용 교육 이수",
      },
      {
        icon: "star",
        title: "서울부동산포럼 장학생",
        period: "2025.11",
        description: "제13회 우수장학생 선정",
      },
    ],
    skills: [
      {
        icon: "barChart",
        title: "데이터 기반 분석",
        description:
          "부동산 수익성 분석(DCF, NOI, Cap-rate)과 재무모델링을 통해 의사결정의 근거를 설계합니다.",
      },
      {
        icon: "users",
        title: "협업과 커뮤니케이션",
        description:
          "학술제·케이스 스터디·실무 프로젝트에서 역할을 조율하고, 결과물을 끝까지 책임집니다.",
      },
      {
        icon: "rocket",
        title: "실행력",
        description:
          "목표 달성을 위한 우선순위를 스스로 설정하고, 측정 가능한 결과로 연결하는 것을 중시합니다.",
      },
    ],
    storyTitle: "About me",
    story: [
      "저는 사람이 머무는 공간과 그 공간이 만들어내는 변화에 깊은 관심을 가지고 있습니다.",
      "부동산·비즈니스 분야에서 쌓아온 분석 경험은 하나의 프로젝트가 자본, 사람, 도시의 움직임이 맞물리며 만들어지는 결과물임을 이해하게 해주었습니다.",
      "이를 통해 공간을 좀 더 입체적으로 바라보고, 그 안에 담긴 가능성을 읽어내는 기준을 갖추게 되었습니다.",
      "앞으로도 변화하는 시장의 흐름을 읽고, 팀과 함께 현실적이면서도 의미 있는 성과를 만들며, 선택한 길에서 확실한 결과를 보여주는 사람이 되고자 합니다.",
    ],
    storyImage: "/uploads/about-image-1763032621623.jpg",
    hobbies: ["🎨 전시회 관람", "✈️ 여행", "🎭 연극 관람", "🗣️ 영어 스피치 트레이닝"],
  }

  const [aboutInfo, setAboutInfo] = useState(defaultInfo)
  const [backgroundData, setBackgroundData] = useState(defaultInfo.background)
  const [showCareerModal, setShowCareerModal] = useState(false)
  const [showSkillModal, setShowSkillModal] = useState(false)
  const [showHobbyModal, setShowHobbyModal] = useState(false)

  // 스크롤 진입 애니메이션용
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement | null>(null)

  // 데이터 로드
  useEffect(() => {
    const savedData = getData("about-info") as typeof defaultInfo | null
    if (savedData) {
      setAboutInfo({ ...defaultInfo, ...savedData })
      if (savedData.background) {
        setBackgroundData(savedData.background)
      }
    }

    const savedBg = getData("about-background") as
      | { image: string; video: string; color: string; opacity: number }
      | null
    if (savedBg) {
      setBackgroundData(savedBg)
    }
  }, [getData, isEditMode])

  // 인터섹션 옵저버
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px 15% 0px",
      },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const updateAboutInfo = (
    key: string,
    value:
      | string
      | boolean
      | typeof aboutInfo.skills
      | typeof aboutInfo.experienceCards
      | typeof aboutInfo.story
      | typeof aboutInfo.hobbies
      | number
      | { image: string; video: string; color: string; opacity: number },
  ) => {
    const newInfo = { ...aboutInfo, [key]: value }
    setAboutInfo(newInfo)
    saveData("about-info", newInfo)
  }

  const updateExperienceCard = (index: number, field: string, value: string) => {
    const newCards = [...aboutInfo.experienceCards]
    newCards[index] = { ...newCards[index], [field]: value }
    updateAboutInfo("experienceCards", newCards)
  }

  const addExperienceCard = () => {
    updateAboutInfo("experienceCards", [
      ...aboutInfo.experienceCards,
      {
        icon: "briefcase",
        title: "새 경험",
        period: "2024",
        description: "설명을 입력하세요",
      },
    ])
  }

  const removeExperienceCard = (index: number) => {
    updateAboutInfo(
      "experienceCards",
      aboutInfo.experienceCards.filter((_, i) => i !== index),
    )
  }

  const updateSkill = (index: number, field: string, value: string) => {
    const newSkills = [...aboutInfo.skills]
    newSkills[index] = { ...newSkills[index], [field]: value }
    updateAboutInfo("skills", newSkills)
  }

  const addSkill = () => {
    updateAboutInfo("skills", [
      ...aboutInfo.skills,
      { icon: "star", title: "새 스킬", description: "스킬 설명" },
    ])
  }

  const removeSkill = (index: number) => {
    updateAboutInfo(
      "skills",
      aboutInfo.skills.filter((_, i) => i !== index),
    )
  }

  const updateStory = (index: number, value: string) => {
    const newStory = [...aboutInfo.story]
    newStory[index] = value
    updateAboutInfo("story", newStory)
  }

  const addStory = () => {
    updateAboutInfo("story", [...aboutInfo.story, "새로운 문단"])
  }

  const removeStory = (index: number) => {
    updateAboutInfo(
      "story",
      aboutInfo.story.filter((_, i) => i !== index),
    )
  }

  const updateHobby = (index: number, value: string) => {
    const newHobbies = [...aboutInfo.hobbies]
    newHobbies[index] = value
    updateAboutInfo("hobbies", newHobbies)
  }

  const addHobby = () => {
    updateAboutInfo("hobbies", [...aboutInfo.hobbies, "🎯 새 취미"])
  }

  const removeHobby = (index: number) => {
    updateAboutInfo(
      "hobbies",
      aboutInfo.hobbies.filter((_, i) => i !== index),
    )
  }

  return (
    <EditableBackground
      image={backgroundData.image}
      video={backgroundData.video}
      color={backgroundData.color}
      opacity={backgroundData.opacity}
      onChange={(data) => {
        const newData = { ...backgroundData, ...data }
        setBackgroundData(newData)
        saveData("about-background", newData)

        const updatedAboutInfo = { ...aboutInfo, background: newData }
        setAboutInfo(updatedAboutInfo)
        saveData("about-info", updatedAboutInfo)
      }}
      storageKey="about-background"
      className="relative"
    >
      <section
        id="about"
        ref={sectionRef}
        className={`w-full border-t border-slate-200 pt-24 transition-all duration-1000 ease-out ${
          isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-6 pointer-events-none"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* 섹션 헤더 */}
          <div className="mb-14 lg:mb-16">
            <div className="space-y-3">
              <p className="inline-block text-xs tracking-[0.18em] uppercase text-primary/80">
                ABOUT
              </p>
              <h2 className="text-4xl sm:text-5xl font-semibold text-foreground">
                <EditableText
                  value={aboutInfo.title}
                  onChange={(value) => updateAboutInfo("title", value)}
                  storageKey="about-title"
                />
              </h2>
              <p className="text-base text-muted-foreground max-w-3xl leading-relaxed">
                <EditableText
                  value={aboutInfo.subtitle}
                  onChange={(value) => updateAboutInfo("subtitle", value)}
                  storageKey="about-subtitle"
                  multiline
                />
              </p>
            </div>
          </div>

          {/* 상단: 경험 + 핵심 역량 헤더 */}
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1.3fr)] gap-10 mb-4">
            {/* 경험 제목 */}
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                경험 & 이력
              </h3>
              {isEditMode && (
                <button
                  onClick={() => setShowCareerModal(true)}
                  className="inline-flex items-center gap-1.5 border border-border/80 bg-background/90 px-3 py-1.5 text-xs rounded-none text-muted-foreground hover:bg-muted/80 transition-colors"
                >
                  <Settings className="h-3 w-3" />
                  편집
                </button>
              )}
            </div>

            {/* 핵심 역량 제목 */}
            {(aboutInfo.skills.length > 0 || isEditMode) && (
              <div className="flex items-center justify-between lg:justify-end">
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  핵심 역량
                </h3>
                {isEditMode && (
                  <button
                    onClick={() => setShowSkillModal(true)}
                    className="ml-3 inline-flex items-center gap-1.5 border border-border/80 bg-background/90 px-3 py-1.5 text-xs rounded-none text-muted-foreground hover:bg-muted/80 transition-colors"
                  >
                    <Settings className="h-3 w-3" />
                    편집
                  </button>
                )}
              </div>
            )}
          </div>

          {/* 경험 + 핵심 역량 카드 영역 */}
          <div className="relative mb-20">
            {/* 컬럼 시각적 분리 라인 */}
            <div
              className="hidden lg:block absolute inset-y-2 left-1/2 w-px bg-border/70 pointer-events-none"
              aria-hidden="true"
            />

            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1.3fr)] gap-10">
              {/* 경험 리스트 */}
              <div className="space-y-5">
                <div className="mb-1">
                  <p className="text-xs font-medium uppercase tracking-[0.24em] text-primary/80">
                    Experience Timeline
                  </p>
                </div>

                {aboutInfo.experienceCards?.map((card, index) => {
                  const Icon =
                    AVAILABLE_ICONS[
                      card.icon as keyof typeof AVAILABLE_ICONS
                    ] || Briefcase

                  return (
                    <Card
                      key={index}
                      className="relative overflow-hidden border border-border/70 bg-background/95 px-5 py-4 shadow-sm rounded-none hover:shadow-md hover:-translate-y-0.5 hover:border-primary/40 transition-all"
                    >
                      <div className="absolute inset-y-0 left-0 w-[2px] bg-gradient-to-b from-primary/80 via-primary/50 to-primary/20" />

                      {isEditMode && (
                        <button
                          onClick={() => removeExperienceCard(index)}
                          className={COMMON_STYLES.deleteButton}
                        >
                          <X className={COMMON_STYLES.deleteIcon} />
                        </button>
                      )}

                      <div className="flex items-start gap-4 pl-3">
                        <div className="mt-0.5 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center justify-between gap-1.5">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-mono text-muted-foreground/80">
                                #{(index + 1).toString().padStart(2, "0")}
                              </span>
                              {/* 카드 타이틀: 중(text-base) */}
                              <h4 className="text-base font-semibold text-foreground">
                                <EditableText
                                  value={card.title}
                                  onChange={(value) =>
                                    updateExperienceCard(
                                      index,
                                      "title",
                                      value,
                                    )
                                  }
                                  storageKey={`about-experience-${index}-title`}
                                />
                              </h4>
                            </div>

                            <p className="text-sm font-medium text-muted-foreground">
                              <EditableText
                                value={card.period}
                                onChange={(value) =>
                                  updateExperienceCard(
                                    index,
                                    "period",
                                    value,
                                  )
                                }
                                storageKey={`about-experience-${index}-period`}
                              />
                            </p>
                          </div>

                          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                            <EditableText
                              value={card.description}
                              onChange={(value) =>
                                updateExperienceCard(
                                  index,
                                  "description",
                                  value,
                                )
                              }
                              storageKey={`about-experience-${index}-description`}
                            />
                          </p>
                        </div>
                      </div>
                    </Card>
                  )
                })}

                {isEditMode && (
                  <button
                    onClick={addExperienceCard}
                    className="w-full border-2 border-dashed border-muted-foreground/30 bg-background/95 px-4 py-4 text-sm text-muted-foreground hover:border-primary hover:bg-primary/5 transition-all rounded-none"
                  >
                    <Plus className="mr-1 inline h-4 w-4" />
                    경험 카드 추가
                  </button>
                )}
              </div>

              {/* 핵심 역량 */}
              {(aboutInfo.skills.length > 0 || isEditMode) && (
                <div className="space-y-7 lg:pl-6 lg:border-l lg:border-border/60">
                  <div className="mb-1">
                    <p className="text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
                      Core Skills
                    </p>
                  </div>

                  {aboutInfo.skills.map((skill, index) => {
                    const Icon =
                      SKILL_ICONS[skill.icon as keyof typeof SKILL_ICONS] ||
                      Trophy

                    return (
                      <Card
                        key={index}
                        className="relative overflow-hidden border border-border/70 bg-background/95 px-5 py-4 shadow-sm rounded-none hover:shadow-md hover:-translate-y-0.5 hover:border-primary/40 transition-all"
                      >
                        {isEditMode && (
                          <button
                            onClick={() => removeSkill(index)}
                            className={COMMON_STYLES.deleteButton}
                          >
                            <X className={COMMON_STYLES.deleteIcon} />
                          </button>
                        )}
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-primary/10">
                            <Icon className="h-5 w-5 text-primary" />
                          </div>

                          <div className="flex-1">
                            <div className="flex items-center justify-between gap-2">
                              {/* 스킬 타이틀: 중(text-base) */}
                              <h4 className="text-base font-semibold text-foreground">
                                <EditableText
                                  value={skill.title}
                                  onChange={(value) =>
                                    updateSkill(index, "title", value)
                                  }
                                  storageKey={`about-skill-${index}-title`}
                                />
                              </h4>
                              <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground/80">
                                SKILL {(index + 1).toString().padStart(2, "0")}
                              </span>
                            </div>

                            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                              <EditableText
                                value={skill.description}
                                onChange={(value) =>
                                  updateSkill(
                                    index,
                                    "description",
                                    value,
                                  )
                                }
                                storageKey={`about-skill-${index}-description`}
                                multiline
                              />
                            </p>
                          </div>
                        </div>
                      </Card>
                    )
                  })}

                  {aboutInfo.skills.length === 0 && !isEditMode && (
                    <p className="text-sm text-muted-foreground">
                      주요 역량을 간단히 정리해 보세요.
                    </p>
                  )}

                  {isEditMode && aboutInfo.skills.length === 0 && (
                    <button
                      onClick={addSkill}
                      className="w-full border-2 border-dashed border-muted-foreground/30 bg-background/95 px-4 py-4 text-sm text-muted-foreground hover:border-primary hover:bg-primary/5 transition-all rounded-none"
                    >
                      <Plus className="mr-1 inline h-4 w-4" />
                      스킬 추가
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* 나의 이야기 영역 */}
          {(aboutInfo.story.length > 0 || isEditMode) && (
            <FadeUp delay={0}>
              <Card className="mt-32 mb-10 border border-border/70 bg-background/95 shadow-sm rounded-none">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch">
                  {/* 텍스트 영역 */}
                  <div className="p-8 sm:p-10 lg:p-12">
                    <h3 className="text-2xl font-bold text-foreground">
                      <EditableText
                        value={aboutInfo.storyTitle}
                        onChange={(value) =>
                          updateAboutInfo("storyTitle", value)
                        }
                        storageKey="about-storyTitle"
                      />
                    </h3>

                    <div className="mt-8 space-y-4">
                      {aboutInfo.story.map((paragraph, index) => (
                        <div key={index} className="relative">
                          {isEditMode && (
                            <button
                              onClick={() => removeStory(index)}
                              className={COMMON_STYLES.deleteButton}
                            >
                              <X className={COMMON_STYLES.deleteIcon} />
                            </button>
                          )}
                          <p className="text-base text-muted-foreground leading-relaxed">
                            <EditableText
                              value={paragraph}
                              onChange={(value) =>
                                updateStory(index, value)
                              }
                              storageKey={`about-story-${index}`}
                              multiline
                            />
                          </p>
                        </div>
                      ))}
                    </div>

                    {isEditMode && (
                      <button
                        onClick={addStory}
                        className="mt-5 inline-flex items-center border border-dashed border-muted-foreground/40 px-4 py-1.5 text-xs text-muted-foreground hover:border-primary hover:bg-primary/5 transition-all rounded-none"
                      >
                        <Plus className="mr-1 h-3 w-3" />
                        문단 추가
                      </button>
                    )}
                  </div>

                  {/* 이미지 영역 */}
                  <div className="relative w-full h-full min-h-[360px] lg:min-h-[100%] overflow-hidden">
                    <EditableMedia
                      src={aboutInfo.storyImage}
                      onChange={(src) =>
                        updateAboutInfo("storyImage", src)
                      }
                      type="image"
                      storageKey="about-storyImage"
                      className="absolute inset-0 w-full h-full object-cover object-center"
                      alt="소개 이미지"
                      purpose="about-image"
                    />
                  </div>
                </div>
              </Card>
            </FadeUp>
          )}

          {/* 취미 & 관심사 */}
          {(aboutInfo.hobbies.length > 0 || isEditMode) && (
            <div className="mt-16 mb-32 text-center">
              <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-4">
                취미 & 관심사
              </h3>

              <p className="mb-6 text-sm text-muted-foreground">
                일이 아닌 시간에 저를 가장 잘 보여주는 키워드들입니다.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                {aboutInfo.hobbies.map((hobby, index) => (
                  <span
                    key={index}
                    className="relative group inline-flex items-center border border-border/70 bg-background/95 px-5 py-2.5 text-base text-foreground/90 rounded-full shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
                  >
                    {isEditMode && (
                      <button
                        onClick={() => removeHobby(index)}
                        className={`${COMMON_STYLES.deleteButton} opacity-0 group-hover:opacity-100 transition-opacity`}
                      >
                        <X className={COMMON_STYLES.deleteIcon} />
                      </button>
                    )}
                    <EditableText
                      value={hobby}
                      onChange={(value) => updateHobby(index, value)}
                      storageKey={`about-hobby-${index}`}
                    />
                  </span>
                ))}

                {isEditMode && (
                  <button
                    onClick={() => setShowHobbyModal(true)}
                    className="inline-flex items-center border border-dashed border-muted-foreground/40 px-5 py-2.5 text-base text-muted-foreground hover:border-primary hover:bg-primary/5 transition-all rounded-full"
                  >
                    <Settings className="mr-1 h-4 w-4" />
                    취미 편집
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ===== 아래부터는 모달들 (디자인/타이포 영향 적어서 구조 유지) ===== */}

      {/* 경험 카드 편집 모달 */}
      {showCareerModal && isEditMode && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
          <div className="bg-background border rounded-lg p-6 max-w-3xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">경험 카드 편집</h3>
              <button
                onClick={() => setShowCareerModal(false)}
                className="p-1 hover:bg-muted rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3">
              {aboutInfo.experienceCards?.map((card, index) => {
                const Icon =
                  AVAILABLE_ICONS[card.icon as keyof typeof AVAILABLE_ICONS] ||
                  Briefcase
                return (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 border rounded-lg bg-muted/30"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <select
                        value={card.icon}
                        onChange={(e) =>
                          updateExperienceCard(index, "icon", e.target.value)
                        }
                        className="w-32 px-2 py-1 text-xs border rounded-lg bg-background"
                      >
                        <option value="briefcase">💼 직장</option>
                        <option value="graduation">🎓 학교</option>
                        <option value="award">🏆 수상</option>
                        <option value="trophy">🏅 성과</option>
                        <option value="star">⭐ 우수</option>
                        <option value="lightbulb">💡 아이디어</option>
                        <option value="target">🎯 목표</option>
                        <option value="rocket">🚀 시작</option>
                        <option value="shield">🛡️ 보안</option>
                        <option value="building">🏢 회사</option>
                        <option value="calendar">📅 기간</option>
                        <option value="book">📚 교육</option>
                        <option value="heart">❤️ 열정</option>
                        <option value="coffee">☕ 일상</option>
                        <option value="user">👤 개인</option>
                      </select>
                    </div>

                    <div className="flex-1 space-y-2">
                      <input
                        type="text"
                        value={card.title}
                        onChange={(e) =>
                          updateExperienceCard(index, "title", e.target.value)
                        }
                        placeholder="예: 단국대학교, 무궁화신탁, 학술제 수상 등"
                        className="w-full px-3 py-2 border rounded-lg bg-background font-semibold text-sm"
                      />

                      <div className="flex flex-col sm:flex-row gap-2">
                        <input
                          type="text"
                          value={card.period}
                          onChange={(e) =>
                            updateExperienceCard(index, "period", e.target.value)
                          }
                          placeholder="예: 2023.03 ~, 2024, 2025.07 - 2025.09"
                          className="flex-1 px-3 py-2 border rounded-lg bg-background text-sm"
                        />

                        <input
                          type="text"
                          value={card.description}
                          onChange={(e) =>
                            updateExperienceCard(
                              index,
                              "description",
                              e.target.value,
                            )
                          }
                          placeholder="예: 인턴십, 학회 활동, 수상 내용 등"
                          className="flex-1 px-3 py-2 border rounded-lg bg-background text-sm"
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => removeExperienceCard(index)}
                      className="p-2 text-destructive hover:bg-destructive/10 rounded-lg"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )
              })}

              <button
                onClick={addExperienceCard}
                className="w-full py-3 border-2 border-dashed rounded-lg hover:border-primary hover:bg-primary/5 transition-all text-sm"
              >
                <Plus className="h-4 w-4 inline mr-2" />
                카드 추가
              </button>
            </div>

            <div className="mt-6 pt-4 border-t">
              <div className="flex gap-2">
                <button
                  onClick={() => setShowCareerModal(false)}
                  className="flex-1 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80"
                >
                  닫기
                </button>
                <button
                  onClick={async () => {
                    const success = await saveToFile("about", "Info", aboutInfo)
                    if (success) {
                      alert("✅ 소개 설정이 파일에 저장되었습니다!")
                      setShowCareerModal(false)
                    } else {
                      alert("❌ 파일 저장에 실패했습니다.")
                    }
                  }}
                  className="flex-1 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 font-medium"
                >
                  📁 파일에 저장
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 스킬 편집 모달 */}
      {showSkillModal && isEditMode && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[2147483647]">
          <div className="bg-background border rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">핵심 역량 편집</h3>
              <button
                onClick={() => setShowSkillModal(false)}
                className="p-1 hover:bg-muted rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3">
              {aboutInfo.skills.map((skill, index) => {
                const Icon =
                  SKILL_ICONS[skill.icon as keyof typeof SKILL_ICONS] ||
                  Trophy
                return (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 border rounded-lg bg-muted/30"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <select
                        value={skill.icon}
                        onChange={(e) =>
                          updateSkill(index, "icon", e.target.value)
                        }
                        className="w-32 px-2 py-1 text-xs border rounded-lg bg-background"
                      >
                        <optgroup label="기술 스킬">
                          <option value="code">💻 코드/개발</option>
                          <option value="database">🗜️ 데이터베이스</option>
                          <option value="server">🌐 서버/클라우드</option>
                          <option value="smartphone">📱 모바일</option>
                          <option value="monitor">🖥️ 프론트엔드</option>
                          <option value="cpu">🤖 AI/ML</option>
                          <option value="gitBranch">🌿 Git/버전관리</option>
                          <option value="lock">🔒 보안</option>
                        </optgroup>
                        <optgroup label="비즈니스">
                          <option value="barChart">📊 데이터 분석</option>
                          <option value="lineChart">📈 성과 분석</option>
                          <option value="pieChart">🥧 통계/시각화</option>
                          <option value="megaphone">📢 마케팅</option>
                          <option value="target">🎯 전략/기획</option>
                          <option value="users">👥 팀워크</option>
                        </optgroup>
                        <optgroup label="창의적 스킬">
                          <option value="palette">🎨 디자인</option>
                          <option value="camera">📷 사진/영상</option>
                          <option value="music">🎵 음악/오디오</option>
                          <option value="edit">✏️ 글쓰기/편집</option>
                          <option value="video">🎬 영상 제작</option>
                        </optgroup>
                        <optgroup label="일반 역량">
                          <option value="trophy">🏆 리더십</option>
                          <option value="sparkles">✨ 혁신</option>
                          <option value="rocket">🚀 실행력</option>
                          <option value="brain">🧠 분석력</option>
                          <option value="lightbulb">💡 창의력</option>
                          <option value="zap">⚡ 속도/효율</option>
                          <option value="star">⭐ 전문성</option>
                          <option value="heart">❤️ 열정</option>
                          <option value="shield">🛡️ 신뢰성</option>
                          <option value="globe">🌍 글로벌</option>
                        </optgroup>
                      </select>
                    </div>

                    <div className="flex-1 space-y-2">
                      <input
                        type="text"
                        value={skill.title}
                        onChange={(e) =>
                          updateSkill(index, "title", e.target.value)
                        }
                        placeholder="예: 데이터 분석, 프로젝트 관리, 협업 리더십"
                        className="w-full px-3 py-2 border rounded-lg bg-background font-semibold text-sm"
                      />

                      <textarea
                        value={skill.description}
                        onChange={(e) =>
                          updateSkill(index, "description", e.target.value)
                        }
                        placeholder="예: 수익성 분석 및 수지모델링을 통해 프로젝트 리스크와 수익 구조를 함께 설계합니다."
                        className="w-full px-3 py-2 border rounded-lg bg-background resize-none text-sm"
                        rows={2}
                      />
                    </div>

                    <button
                      onClick={() => removeSkill(index)}
                      className="p-2 text-destructive hover:bg-destructive/10 rounded-lg"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )
              })}

              <button
                onClick={addSkill}
                className="w-full py-3 border-2 border-dashed rounded-lg hover:border-primary hover:bg-primary/5 transition-all text-sm"
              >
                <Plus className="h-4 w-4 inline mr-2" />
                스킬 추가
              </button>
            </div>

            <div className="mt-6 pt-4 border-t">
              <p className="text-sm text-muted-foreground mb-4">
                💡 팁: 이 페이지의 톤은 Hero와 유사하게, 3~5개의 핵심 역량만 가볍고 명확하게
                정리하는 것이 좋습니다.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowSkillModal(false)}
                  className="flex-1 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80"
                >
                  닫기
                </button>
                <button
                  onClick={async () => {
                    const success = await saveToFile("about", "Info", aboutInfo)
                    if (success) {
                      alert("✅ 소개 설정이 파일에 저장되었습니다!")
                      setShowSkillModal(false)
                    } else {
                      alert("❌ 파일 저장에 실패했습니다.")
                    }
                  }}
                  className="flex-1 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 font-medium"
                >
                  📁 파일에 저장
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 취미 편집 모달 */}
      {showHobbyModal && isEditMode && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[2147483647]">
          <div className="bg-background border rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">취미 & 관심사 편집</h3>
              <button
                onClick={() => setShowHobbyModal(false)}
                className="p-1 hover:bg-muted rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3">
              {aboutInfo.hobbies.map((hobby, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 border rounded-lg bg-muted/20"
                >
                  <input
                    type="text"
                    value={hobby}
                    onChange={(e) => updateHobby(index, e.target.value)}
                    placeholder="예: 🎨 전시회 관람"
                    className="flex-1 px-3 py-2 border rounded-lg bg-background text-sm"
                  />

                  <button
                    onClick={() => removeHobby(index)}
                    className="p-2 text-destructive hover:bg-destructive/10 rounded-lg"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}

              <button
                onClick={addHobby}
                className="w-full py-3 border-2 border-dashed rounded-lg hover:border-primary hover:bg-primary/5 transition-all text-sm"
              >
                <Plus className="h-4 w-4 inline mr-2" />
                취미 추가
              </button>
            </div>

            <div className="mt-6 pt-4 border-t">
              <div className="mb-4">
                <p className="text-sm font-medium mb-2">🎯 취미 예시:</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "📚 독서",
                    "☕ 카페 투어",
                    "🎨 전시회 관람",
                    "✈️ 여행",
                    "🏃 러닝",
                    "📸 사진",
                    "🎮 게임",
                    "🎬 영화 감상",
                    "🎵 음악 감상",
                    "🍳 요리",
                    "🌱 가드닝",
                    "🏊 수영",
                    "🧘 요가",
                    "🎸 기타 연주",
                    "✍️ 글쓰기",
                    "🏕️ 캠핑",
                    "🎭 연극 관람",
                    "🎪 공연 관람",
                    "🚴 자전거",
                    "⛷️ 스키",
                  ].map((example) => (
                    <button
                      key={example}
                      className="px-3 py-1 text-sm bg-muted hover:bg-primary/10 rounded-full transition-all"
                      onClick={() => {
                        if (!aboutInfo.hobbies.includes(example)) {
                          updateAboutInfo("hobbies", [
                            ...aboutInfo.hobbies,
                            example,
                          ])
                        }
                      }}
                    >
                      {example}
                    </button>
                  ))}
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                💡 팁: 너무 많은 취미보다는, 지금의 나를 잘 보여주는 3~5개 정도만 정리하는 것이
                Hero와 톤이 잘 맞습니다.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowHobbyModal(false)}
                  className="flex-1 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80"
                >
                  닫기
                </button>
                <button
                  onClick={async () => {
                    const success = await saveToFile("about", "Info", aboutInfo)
                    if (success) {
                      alert("✅ 소개 설정이 파일에 저장되었습니다!")
                      setShowHobbyModal(false)
                    } else {
                      alert("❌ 파일 저장에 실패했습니다.")
                    }
                  }}
                  className="flex-1 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 font-medium"
                >
                  📁 파일에 저장
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </EditableBackground>
  )
}
