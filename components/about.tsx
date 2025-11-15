// Updated About component with requested changes + animations

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
    title: "경매 권리분석보고서 우수상",
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
    description: "타임금융교육원 부동산운용 교육 이수",
  },
  {
    icon: Star,
    title: "서울부동산포럼 장학생",
    period: "2025.11",
    description: "제13회 우수 장학생 선정",
  },
]

const SKILLS = [
  {
    icon: BarChart3,
    title: "데이터 기반 수익성 분석",
    description:
      "DCF, NOI, Cap-rate를 활용해 프로젝트의 현금흐름과 수익 구조를 숫자로 설계합니다.",
  },
  {
    icon: Users,
    title: "프로젝트 협업·커뮤니케이션",
    description:
      "학술제·케이스 스터디·실무 프로젝트에서 역할을 조율하고, 결과물을 끝까지 책임집니다.",
  },
  {
    icon: Rocket,
    title: "실행력 중심의 업무 스타일",
    description:
      "목표를 쪼개서 우선순위를 세우고, 측정 가능한 결과로 연결되는 액션을 빠르게 실행합니다.",
  },
]

const STORY_PARAGRAPHS = [
  "저는 사람이 머무는 공간과 그 공간이 만들어내는 변화에 깊은 관심을 가지고 있습니다.",
  "부동산·비즈니스 분야에서 쌓아온 분석 경험은 하나의 프로젝트가 자본, 사람, 도시의 움직임이 맞물리며 만들어지는 결과물임을 이해하게 해주었습니다.",
  "이를 통해 공간을 좀 더 입체적으로 바라보고, 그 안에 담긴 가능성을 읽어내는 기준을 갖추게 되었습니다.",
  "앞으로도 변화하는 시장의 흐름을 읽고, 팀과 함께 현실적이면서도 의미 있는 성과를 만들며, 선택한 길에서 확실한 결과를 보여주는 사람이 되고자 합니다.",
]

const HOBBIES = ["🎨 전시회 관람", "✈️ 여행", "🎭 연극 관람", "🗣️ 영어 스피치 트레이닝"]

const STORY_IMAGE = "/uploads/about-image-1763032621623.jpg"

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
      duration: 1.1, // ← 여기서 속도 느리게
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
                  className="grid grid-cols-1 gap-4"
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
                        className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90 px-5 py-5 shadow-[0_8px_18px_rgba(15,23,42,0.06)] transition-colors duration-300 hover:border-slate-300"
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900/5">
                            <Icon className="h-5 w-5 text-slate-900" />
                          </div>

                          <div className="flex-1">
                            <h4 className="text-[16px] font-semibold text-slate-900">
                              {skill.title}
                            </h4>
                            <p className="mt-2 text-[15px] text-slate-600 leading-relaxed">
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

        {/* ------------------ ABOUT ME ------------------ */}
<div>
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
              className="text-[16px] sm:text-[17px] text-slate-600 leading-relaxed"
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
</div>


        {/* ------------------ 취미 (스크롤 페이드인 + 호버 애니메이션) ------------------ */}
        <motion.div
          className="text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeInUp}
          custom={0.12}
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
  boxShadow: "0 8px 20px rgba(15,23,42,0.05)", // 훨씬 약한 그림자
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
