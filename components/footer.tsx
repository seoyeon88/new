// components/footer.tsx
"use client"

import * as React from "react"

const CONTACT_INFO = {
  email: "kimbob206@gmail.com",
  location: "서울시 양천구",
}

export function Footer() {
  return (
    <footer className="bg-slate-900/90 text-white pb-20 text-xs"> {/* 전체 글자 크기 축소 */}
      {/* 전체 폭 상단 가로선 */}
      <div className="w-full border-t border-slate-700/60" />

      {/* 메인 컨텐츠 */}
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-10 xl:px-0 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-6">

          {/* ===== 왼쪽 컬럼 (배서연 + 카피라이트) ===== */}
          <div className="space-y-2 text-left"> {/* 감소된 여백 */}
            <h3 className="text-sm font-semibold">Bae Seoyeon</h3> {/* lg → sm */}

            <p className="text-xs opacity-80 leading-relaxed">
              © 2025 <span className="font-medium text-white">Bae Seoyeon</span>. All rights reserved.
            </p>
          </div>

          {/* ===== 중앙 NAVIGATION ===== */}
          <div className="space-y-2 mx-auto text-left">
            <h4 className="text-xs font-semibold tracking-wide">NAVIGATION</h4>
            <div className="flex flex-col gap-1 text-xs opacity-80">
              <a href="#hero" className="hover:opacity-100 transition-colors">Home</a>
              <a href="#about" className="hover:opacity-100 transition-colors">About</a>
              <a href="#projects" className="hover:opacity-100 transition-colors">Projects</a>
              <a href="#contact" className="hover:opacity-100 transition-colors">Contact</a>
            </div>
          </div>

          {/* ===== 오른쪽 CONTACT ===== */}
          <div className="space-y-2 sm:ml-auto text-left">
            <h4 className="text-xs font-semibold tracking-wide">CONTACT</h4>
            <div className="flex flex-col gap-1 text-xs opacity-80">
              <a href={`mailto:${CONTACT_INFO.email}`} className="hover:opacity-100 transition-colors">
                {CONTACT_INFO.email}
              </a>
              <p>{CONTACT_INFO.location}</p>
            </div>
          </div>

        </div>
      </div>

      {/* 전체 폭 하단 가로선 */}
      <div className="w-full border-t border-slate-700/60" />
    </footer>
  )
}
