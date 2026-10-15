"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { getImagePath } from "@/lib/utils"

const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/noticias", label: "Noticias" },
  { href: "/publicaciones", label: "Publicaciones" },
  { href: "/equipo", label: "Equipo" },
]

import { useLanguage } from "./language-context"
import { LanguageSwitch } from "./language-switch"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { t } = useLanguage()

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  const solid = isScrolled || open
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href))

  const navItems = [
    { href: "/", label: t.nav.home },
    { href: "/noticias", label: t.nav.news },
    { href: "/publicaciones", label: t.nav.publications },
    { href: "/equipo", label: t.nav.team },
  ]

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? "bg-ink border-b border-white/10" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 max-w-6xl h-16 md:h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 text-primary-foreground">
          <img src={getImagePath("/logo.png")} alt="" width={28} height={35} className="h-9 w-auto" />
          <span className="font-serif text-lg font-semibold tracking-tight">PIGroup Research</span>
        </Link>

        {/* Desktop Navigation & Language Switch */}
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex items-center gap-8" aria-label="Principal">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`relative py-1 text-sm font-medium transition-colors hover:text-gold after:absolute after:left-0 after:-bottom-0.5 after:h-px after:bg-gold after:transition-all ${
                  isActive(item.href) ? "text-gold after:w-full" : "text-primary-foreground after:w-0 hover:after:w-full"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <LanguageSwitch />
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-3 md:hidden">
          <LanguageSwitch />
          <button
            type="button"
            className="p-2 text-primary-foreground"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="md:hidden bg-ink border-t border-white/10 px-4 pb-6" aria-label="Móvil">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block py-3 border-b border-white/10 font-medium ${
                isActive(item.href) ? "text-gold" : "text-primary-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
