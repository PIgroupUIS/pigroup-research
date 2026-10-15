"use client"

import { useState, useRef, useEffect } from "react"
import { useLanguage } from "./language-context"
import { Check } from "lucide-react"

// Clean SVG flag icons cropped in circular badges
function FlagSpain({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 512 512" className={className} aria-hidden="true">
      <defs>
        <clipPath id="circle-clip-es">
          <circle cx="256" cy="256" r="256" />
        </clipPath>
      </defs>
      <g clipPath="url(#circle-clip-es)">
        <rect width="512" height="128" fill="#AA151B" />
        <rect y="128" width="512" height="256" fill="#F1BF00" />
        <rect y="384" width="512" height="128" fill="#AA151B" />
      </g>
    </svg>
  )
}

function FlagUSA({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 512 512" className={className} aria-hidden="true">
      <defs>
        <clipPath id="circle-clip-us">
          <circle cx="256" cy="256" r="256" />
        </clipPath>
      </defs>
      <g clipPath="url(#circle-clip-us)">
        {/* Red and white stripes */}
        <rect width="512" height="512" fill="#B22234" />
        <path
          d="M0,39.4h512M0,118.2h512M0,196.9h512M0,275.7h512M0,354.5h512M0,433.2h512"
          stroke="#FFFFFF"
          strokeWidth="39.4"
        />
        {/* Blue canton */}
        <rect width="230" height="275.7" fill="#3C3B6E" />
        {/* Stylized star dots for crisp miniature rendering */}
        <g fill="#FFFFFF">
          <circle cx="50" cy="50" r="14" />
          <circle cx="115" cy="50" r="14" />
          <circle cx="180" cy="50" r="14" />
          <circle cx="82" cy="100" r="14" />
          <circle cx="147" cy="100" r="14" />
          <circle cx="50" cy="150" r="14" />
          <circle cx="115" cy="150" r="14" />
          <circle cx="180" cy="150" r="14" />
          <circle cx="82" cy="200" r="14" />
          <circle cx="147" cy="200" r="14" />
        </g>
      </g>
    </svg>
  )
}

const languages = [
  { code: "es", label: "Español", Flag: FlagSpain },
  { code: "en", label: "English", Flag: FlagUSA },
] as const

export function LanguageSwitch() {
  const { language, setLanguage } = useLanguage()
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const current = languages.find((l) => l.code === language) || languages[0]
  const CurrentFlag = current.Flag

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      {/* Circle button showing only the active flag */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="group relative flex items-center justify-center w-8 h-8 rounded-full border border-white/20 bg-ink hover:border-gold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gold/50 shadow-sm"
        aria-label={`Idioma actual: ${current.label}. Clic para cambiar`}
        aria-expanded={open}
      >
        <span className="w-6 h-6 rounded-full overflow-hidden block transition-transform group-hover:scale-105">
          <CurrentFlag className="w-full h-full object-cover" />
        </span>
      </button>

      {/* Floating Dropdown Selector */}
      {open && (
        <div className="absolute right-0 mt-2 w-40 origin-top-right rounded-md bg-ink border border-white/15 shadow-xl z-50 py-1 backdrop-blur-sm animate-in fade-in zoom-in-95 duration-150">
          {languages.map((lang) => {
            const ItemFlag = lang.Flag
            const isSelected = language === lang.code

            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => {
                  setLanguage(lang.code)
                  setOpen(false)
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2 text-xs font-medium transition-colors ${
                  isSelected
                    ? "text-gold bg-white/5 font-semibold"
                    : "text-primary-foreground/80 hover:text-primary-foreground hover:bg-white/10"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-4 h-4 rounded-full overflow-hidden shrink-0 border border-white/20">
                    <ItemFlag className="w-full h-full object-cover" />
                  </span>
                  <span>{lang.label}</span>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-gold" />}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
