"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getImagePath, getPagePath } from "@/lib/utils"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { href: "#inicio", label: "Inicio", isSection: true },
    { href: "/noticias", label: "Noticias", isSection: false },
    { href: "/publicaciones", label: "Publicaciones", isSection: false },
    { href: "/equipo", label: "Equipo", isSection: false },
    { href: "#contacto", label: "Contacto", isSection: true },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="#inicio" className="flex items-center">
            <span
              className={`text-xl font-sans font-bold transition-colors ${
                isScrolled ? "text-foreground" : "text-white"
              }`}
            >
              PIGroup Research
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              if (item.isSection) {
                // Para secciones de la página (scroll)
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    className={`text-sm font-sans font-medium transition-colors ${
                      isScrolled ? "text-foreground hover:text-gold" : "text-white hover:text-gold"
                    }`}
                  >
                    {item.label}
                  </a>
                )
              } else {
                // Para páginas separadas (Next.js routing)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-sm font-sans font-medium transition-colors ${
                      isScrolled ? "text-foreground hover:text-gold" : "text-white hover:text-gold"
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              }
            })}
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className={`md:hidden ${isScrolled ? "" : "text-white hover:text-white hover:bg-white/10"}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 flex flex-col gap-4 bg-background/95 backdrop-blur-md rounded-lg p-4 -mx-4">
            {navItems.map((item) => {
              if (item.isSection) {
                // Para secciones de la página (scroll)
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    className="text-sm font-sans font-medium text-foreground hover:text-accent transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                )
              } else {
                // Para páginas separadas (Next.js routing)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-sm font-sans font-medium text-foreground hover:text-accent transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )
              }
            })}
          </nav>
        )}
      </div>
    </header>
  )
}
