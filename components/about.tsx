"use client"

import * as React from "react"
import { Card } from "@/components/ui/card"
import {
  Briefcase,
  GraduationCap,
  Award,
  Star,
  BarChart3,
  Users,
  Rocket,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { motion } from "framer-motion"

const EXPERIENCES = [
  {
    icon: GraduationCap,
    title: "단국대학교 죽전캠퍼스",
    period: "2023.03 ~ 2027.02(졸업 예정)",
    description: "부동산학 전공 및 경영학 복수전공",
  },
  {
    icon: GraduationCap,
    title: "URID 12-13기",
    period: "2024.03 ~ 2024.12",
    description: "교내 부동산 학회 활동",
  },
  {
    icon: Award,
    title: "학년수석 달성",
    period: "2024.03 ~ 2024.12",
    description: "2학년 1 · 2학기 연속 석차 1위",
  },
  {
    icon: Award,
    title: "경매 권리분석보고서 우수상 수상",
    period: "2025.01",
    description: "건국대 · 단국대 · 중앙대 연합 학술제",
  },
  {
    icon: Briefcase,
    title: "무궁화신탁 Internship",
    period: "2025.07 ~ 2025.09",
    description: "신탁영업 1본부 3팀",
  },
  {
    icon: Briefcase,
    title: "금융직무 특화 교육 이수",
    period: "2025.09",
    description: "타임금융교육원 부동산운용 교육",
  },
  {
    icon: Star,
    title: "서울부동산포럼 장학생 선정",
    period: "2025.11",
    description: "제13회 우수 장학생 선정",
  },
]

const SKILLS = [
  {
    icon: BarChart3,
    title: "Financial Modeling",
    description:
      "DCF, IRR/NPV, Cap-rate, NOI 모델링, PF 시나리오 분석을 통해 자산의 현금흐름과 수익 구조를 정교한 숫자로 설계합니다.",
  },
  {
    icon: Users,
    title: "Real Estate Analysis",
    description:
      "국토부 실거래가·토지이음·개별공시지가·건축물대장 등 공공데이터를 활용해 입지·수요·임대차 구조를 분석하고, 말소기준권리 등 리스크 요소를 검토합니다.",
  },
  {
    icon: Rocket,
    title: "PF Documentation",
    description:
      "IM·시장 리서치·PERT/CPM 일정 분석 등 의사결정에 필요한 보고서를 체계적으로 제작합니다.",
  },
]

const STORY_PARAGRAPHS = [
  "상업용 부동산의 가치는 단순히 건물의 크기나 입지로만 결정되지 않는다고 믿습니다.",
  "대학교 2학년 때 참여한 상업시설 분석 프로젝트에서 저수익 오피스 자산의 임대차 구조를 재배치해 NOI를 개선한 경험이 제 생각을 더 확고하게 만들었습니다.",
  "이 경험을 계기로, 같은 공간이라도 임대 구조를 재설계하고 운영 방식을 조정하며, 데이터 기반 시나리오를 적용하면 수익성이 완전히 달라질 수 있다는 점에 깊은 매력을 느끼게 되었습니다.",
  "저는 특히 Excel 모델링, DCF, Cap-rate/NOI 분석 같은 정량분석과, 입지·수요·법규·임대전략을 해석하는 정성분석을 함께 다루는 것을 강점으로 삼고 있습니다.",
  "앞으로도 변화하는 시장의 흐름을 읽고, 팀과 함께 현실적이면서도 의미 있는 성과를 만들며, 선택한 길에서 확실한 결과를 보여주는 전문가로 성장하고자 합니다.",
]

const HOBBIES = ["🎨 전시회 관람", "✈️ 여행", "🎭 연극 관람", "🗣️ 영어 스피치 트레이닝"]

const STORY_IMAGE = "/uploads/about-image-1763032621623.jpg"

// 👉 장학·수상 증서 슬라이더용 데이터
const ACHIEVEMENTS = [
  {
    title: "경매 권리분석보고서 우수상",
    subtitle: "건국대 · 단국대 · 중앙대 연합 학술제",
    period: "2025.01",
    image: "/uploads/achievement-auction-report.jpg",
  },
  {
    title: "서울부동산포럼 우수 장학생",
    subtitle: "제13회 서울부동산포럼 장학증서",
    period: "2025.11",
    image: "/uploads/achievement-scholarship.jpg",
  },
  {
    title: "2학년 학년수석 장학증서",
    subtitle: "2학년 1 · 2학기 연속 학년수석",
    period: "2024.03 ~ 2024.12",
    image: "/uploads/achievement-top-student.jpg",
  },
]

/* ------------------ 애니메이션 variants ------------------ */

// 섹션별 페이드 인 + 위에서 아래로 슬라이드
const fadeInUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay,
      duration: 0.6,
      ease: [0.22, 0.61, 0.36, 1],
    },
  }),
}

const fadeInUpSlow = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay,
      duration: 1.1,
      ease: [0.22, 0.61, 0.36, 1],
    },
  }),
}

// 리스트 컨테이너: 자식 스태거
const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
}

// 리스트 아이템: 살짝 위에서 등장
const listItem = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.25, 0.8, 0.25, 1],
    },
  },
}

/* ------------------ Achievements Slider ------------------ */

function AchievementsSlider() {
  const scrollRef = React.useRef<HTMLDivElement | null>(null)

  const scrollBy = (direction: "left" | "right") => {
    const container = scrollRef.current
    if (!container) return
    const amount = container.clientWidth * 0.8

    container.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    })
  }

  return (
    <div className="relative">
      {/* 좌우 네비게이션 버튼 (md 이상에서만 표시) */}
      <button
        type="button"
        onClick={() => scrollBy("left")}
        className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white/95 shadow-sm hover:bg-slate-50"
      >
        <span className="sr-only">이전</span>
        <ChevronLeft className="h-4 w-4 text-slate-700" />
      </button>

      <button
        type="button"
        onClick={() => scrollBy("right")}
        className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white/95 shadow-sm hover:bg-slate-50"
      >
        <span className="sr-only">다음</span>
        <ChevronRight className="h-4 w-4 text-slate-700" />
      </button>

      {/* 가로 스크롤 카드 리스트 */}
      <div
        ref={scrollRef}
        className="flex gap-5 sm:gap-6 overflow-x-auto scroll-smooth pb-2 pt-1 pr-2 -mr-2"
      >
        {ACHIEVEMENTS.map((item, idx) => (
          <div
            key={idx}
            className="min-w-[220px] sm:min-w-[260px] md:min-w-[280px] lg:min-w-[300px] max-w-xs rounded-2xl border border-slate-200/80 bg-slate-50/80 shadow-[0_10px_25px_rgba(15,23,42,0.06)] overflow-hidden"
          >
            <div className="aspect-[4/3] w-full overflow-hidden bg-slate-200">
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="px-4 sm:px-5 py-4 sm:py-5">
              <p className="text-[12px] font-medium text-slate-500 mb-1">
                {item.period}
              </p>
              <h4 className="text-[15px] sm:text-[16px] font-semibold text-slate-900">
                {item.title}
              </h4>
              <p className="mt-1.5 text-[14px] text-slate-600 leading-relaxed">
                {item.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function About() {
  return (
    <section
      id="about"
      className="w-full border-t border-slate-200 bg-slate-50/60 py-20 sm:py-24 lg:py-28"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-10 xl:px-0">
        {/* ------------------ 섹션 헤더 (스크롤 페이드인) ------------------ */}
        <motion.header
          className="mb-12 sm:mb-14 lg:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeInUp}
        >
          <motion.div
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {/* subtle pulse 애니메이션 추가 */}
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75 animate-ping" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            <span className="text-[11px] font-medium tracking-[0.18em] text-slate-600">
              ABOUT
            </span>
          </motion.div>

          <div className="mt-5 space-y-5">
            <h2 className="text-4xl sm:text-5xl lg:text-[2.9rem] font-semibold tracking-tight text-slate-900">
              소개
            </h2>

            <p className="text-[16px] sm:text-[18px] lg:text-[20px] text-slate-600 max-w-3xl leading-relaxed">
              부동산 금융·자산관리 관련 핵심 이력과 역량을 정리한 섹션입니다.
            </p>
          </div>
        </motion.header>

        {/* ------------------ 경험 & 스킬 카드 (스크롤 페이드인) ------------------ */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          custom={0.05}
          variants={fadeInUp}
        >
          <Card
            className="
              relative 
              mb-20 
              border border-slate-200/80 
              bg-white/95 
              shadow-[0_18px_40px_rgba(15,23,42,0.08)] 
              rounded-3xl 
              px-6 sm:px-10 lg:px-12
              pt-6 sm:pt-8 lg:pt-10
              pb-12 sm:pb-16 lg:pb-20
            "
          >
            <div className="grid grid-cols-1 lg:grid-cols-[1.7fr_1.3fr] gap-10 lg:gap-14">
              {/* ------------------ EXPERIENCE TIMELINE ------------------ */}
              <div>
                <div className="mb-8">
                  <p className="text-lg sm:text-xl font-semibold uppercase tracking-[0.22em] text-slate-500">
                    Experience Timeline
                  </p>
                </div>

                <motion.ol
                  className="relative border-l border-slate-200/70 pl-4 space-y-7"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                >
                  {EXPERIENCES.map((exp, index) => {
                    const Icon = exp.icon
                    return (
                      <motion.li
                        key={index}
                        variants={listItem}
                        className="relative pl-4 group"
                        whileHover={{
                          y: -4,
                          scale: 1.01,
                          transition: { type: "spring", stiffness: 260, damping: 18 },
                        }}
                      >
                        {/* 타임라인 노드 + 호버 시 강조 */}
                        <span className="absolute -left-[9px] top-2 flex h-4 w-4 items-center justify-center">
                          <span className="absolute h-4 w-4 rounded-full bg-slate-900 shadow-sm" />
                          <span className="absolute h-4 w-4 rounded-full border-2 border-white" />
                          <span className="h-2 w-2 rounded-full bg-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </span>

                        <div
                          className="
                            relative overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-50/80 
                            px-5 py-4 shadow-[0_10px_25px_rgba(15,23,42,0.06)]
                            transition-all duration-300
                            group-hover:border-slate-300
                            group-hover:bg-white
                          "
                        >
                          <div className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />

                          <div className="flex items-start gap-4 pt-2">
                            <div
                              className="
                                mt-0.5 flex h-10 w-10 items-center justify-center rounded-xl bg-white
                                transition-transform duration-300
                                group-hover:scale-105
                              "
                            >
                              <Icon className="h-5 w-5 text-slate-900" />
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-2">
                                <h3 className="text-[16px] font-semibold text-slate-900">
                                  {exp.title}
                                </h3>
                                <p className="text-[12px] font-medium text-slate-500 whitespace-nowrap">
                                  {exp.period}
                                </p>
                              </div>

                              <p className="mt-1.5 text-[15px] text-slate-600 leading-relaxed">
                                {exp.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.li>
                    )
                  })}
                </motion.ol>
              </div>

              {/* ------------------ CORE SKILLS ------------------ */}
              <div className="space-y-8">
                <div className="mb-8">
                  <p className="text-lg sm:text-xl font-semibold uppercase tracking-[0.22em] text-slate-500">
                    Core Skills
                  </p>
                </div>

                <motion.div
                  className="grid grid-cols-1 gap-5"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                >
                  {SKILLS.map((skill, index) => {
                    const Icon = skill.icon
                    return (
                      <motion.div
                        key={index}
                        variants={listItem}
                        whileHover={{
                          y: -4,
                          scale: 1.01,
                          transition: { type: "spring", stiffness: 260, damping: 20 },
                        }}
                        whileTap={{ scale: 0.99 }}
                        className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90 px-5 py-7 sm:py-8 shadow-[0_8px_18px_rgba(15,23,42,0.06)] transition-colors duration-300 hover:border-slate-300"
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900/5">
                            <Icon className="h-5 w-5 text-slate-900" />
                          </div>

                          <div className="flex-1">
                            <h4 className="text-[16px] font-semibold text-slate-900">
                              {skill.title}
                            </h4>
                            <p className="mt-3 text-[15px] text-slate-600 leading-relaxed">
                              {skill.description}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </motion.div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* ------------------ ACHIEVEMENTS (성과/장학) ------------------ */}
        <motion.div
          className="mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeInUpSlow}
          custom={0.1}
        >
          <Card className="border border-slate-200/80 bg-white/95 rounded-3xl px-6 sm:px-8 lg:px-10 py-8 sm:py-10 lg:py-12 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
            <div className="mb-6 sm:mb-7">
              <p className="text-lg sm:text-xl font-semibold uppercase tracking-[0.22em] text-slate-500">
                Achievements
              </p>
              <p className="mt-2 text-[14px] sm:text-[15px] text-slate-600">
                수상 내역과 장학증서를 한눈에 볼 수 있도록 정리한 하이라이트입니다.
              </p>
            </div>

            <AchievementsSlider />
          </Card>
        </motion.div>

        {/* ------------------ ABOUT ME ------------------ */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeInUp}
          custom={0.12}
        >
          <Card className="mb-16 border border-slate-200/80 bg-white/95 shadow-[0_18px_40px_rgba(15,23,42,0.08)] rounded-3xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 sm:p-10 lg:p-12">
                <h3 className="text-2xl sm:text-3xl font-semibold uppercase tracking-[0.22em] text-slate-900">
                  About Me
                </h3>

                <div className="mt-6 space-y-4">
                  {STORY_PARAGRAPHS.map((text, idx) => (
                    <p
                      key={idx}
                      className="text-[16px] sm:text-[17px] text-slate-600 leading-relaxed indent-5 sm:indent-6"
                    >
                      {text}
                    </p>
                  ))}
                </div>
              </div>

              <div className="relative min-h-[260px] sm:min-h-[320px]">
                <img
                  src={STORY_IMAGE}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/18 via-transparent to-slate-900/5" />
              </div>
            </div>
          </Card>
        </motion.div>

        {/* ------------------ 취미 (스크롤 페이드인 + 호버 애니메이션) ------------------ */}
        <motion.div
          className="text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeInUp}
          custom={0.14}
        >
          <h3 className="text-lg sm:text-xl font-semibold uppercase tracking-[0.25em] text-slate-500 mb-7">
            HOBBIES & INTERESTS
          </h3>

          <motion.div
            className="flex flex-wrap justify-center gap-4 sm:gap-5"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {HOBBIES.map((hobby, index) => (
              <motion.span
                key={index}
                variants={listItem}
                whileHover={{
                  y: -1.5,
                  scale: 1.015,
                  boxShadow: "0 8px 20px rgba(15,23,42,0.05)",
                  transition: { type: "spring", stiffness: 260, damping: 20 },
                }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center rounded-full border border-slate-200 bg-white px-6 sm:px-7 py-3 text-[15px] sm:text-[16px] text-slate-700 shadow-sm cursor-default"
              >
                {hobby}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
