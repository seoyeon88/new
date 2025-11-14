"use client"

import { ArrowUp } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex items-center justify-between gap-4 text-sm text-muted-foreground">
        <p>© {currentYear} Portfolio. All rights reserved.</p>
        <button
          onClick={scrollToTop}
          className="p-2 rounded-full hover:bg-muted transition-colors"
          aria-label="맨 위로"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      </div>
    </footer>
  )
}
