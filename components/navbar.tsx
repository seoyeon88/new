"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { LucideIcon, Settings } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
}

interface NavBarProps {
  items: NavItem[]
  className?: string
  logo?: string
  logoImage?: string
  isEditMode?: boolean
  onEditMenu?: () => void
}

export function NavBar({ items, className, logo, logoImage, isEditMode, onEditMenu }: NavBarProps) {
  const [activeTab, setActiveTab] = useState(items[0]?.name || "")

  useEffect(() => {
    const handleScroll = () => {
      const sections = items.map((item) => item.url.substring(1))
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })

      if (currentSection) {
        const activeItem = items.find((item) => item.url === `#${currentSection}`)
        if (activeItem) {
          setActiveTab(activeItem.name)
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [items])

  const scrollToSection = (url: string) => {
    const element = document.querySelector(url)
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.scrollY
      window.scrollTo({
        top: offsetTop - 80,
        behavior: "smooth",
      })
    }
  }

  return (
    <div
      className={cn(
        "fixed top-4 inset-x-4 z-50 translate-x-0 md:top-6 md:inset-x-auto md:left-1/2 md:-translate-x-1/2",
        className,
      )}
    >
      <div
        className={cn(
          "flex w-full max-w-[1500px] items-center justify-center overflow-hidden",
          "bg-slate-100/60 backdrop-blur-xl py-1 px-6 md:px-8 rounded-full",
        )}
      >
        {(logo || logoImage) && (
          <div className="flex-shrink-0 px-3 md:px-4 py-1">
            {logoImage ? (
              <img
                src={logoImage}
                alt={logo || "Logo"}
                className="h-8 w-auto"
                onError={(e) => {
                  e.currentTarget.style.display = "none"
                  if (logo) {
                    const textLogo = document.createElement("span")
                    textLogo.className = "font-bold text-foreground"
                    textLogo.textContent = logo
                    e.currentTarget.parentElement?.appendChild(textLogo)
                  }
                }}
              />
            ) : null}
          </div>
        )}

        <div className="flex items-center justify-center gap-4 md:gap-6">
          {items.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.name

            return (
              <button
                key={item.name}
                onClick={() => {
                  setActiveTab(item.name)
                  scrollToSection(item.url)
                }}
                className={cn(
                  "relative flex flex-shrink-0 items-center justify-center cursor-pointer",
                  "text-xs md:text-sm font-medium px-3 md:px-5 py-1.5 rounded-full transition-colors",
                  "text-foreground/70 hover:text-primary",
                  isActive && "text-primary",
                )}
              >
                <span className="hidden md:inline">{item.name}</span>

                <span className="md:hidden">
                  <Icon size={18} strokeWidth={2.5} />
                </span>

                {isActive && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-white/70 backdrop-blur-sm"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 26,
                    }}
                  />
                )}
              </button>
            )
          })}
        </div>

        {isEditMode && onEditMenu && (
          <button
            onClick={onEditMenu}
            className="ml-1 p-2 rounded-full hover:bg-muted transition-colors"
            title="메뉴 편집"
          >
            <Settings className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  )
}
