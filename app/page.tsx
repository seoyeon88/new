"use client"

import { NavBar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Projects } from "@/components/projects"
import { Contact } from "@/components/contact"
import { Home, User, FolderOpen, Mail } from "lucide-react"

export default function Page() {
  return (
    <main>
      {/* 상단 네비게이션 바 */}
      <NavBar
        items={[
          { name: "홈", url: "#hero", icon: Home },
          { name: "소개", url: "#about", icon: User },
          { name: "프로젝트", url: "#projects", icon: FolderOpen },
          { name: "연락", url: "#contact", icon: Mail },
        ]}
      />

      {/* 섹션들 */}
      <Hero />
      <About />
      <Projects />
      <Contact />
    </main>
  )
}
