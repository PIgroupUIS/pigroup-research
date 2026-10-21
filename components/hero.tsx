"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { getImagePath } from "@/lib/utils"
// @ts-ignore
import "katex/dist/katex.min.css"
import { HeroFormulasBg } from "./hero-formulas-bg"
import { useLanguage } from "./language-context"
import { HeroInverseLogo } from "./hero-inverse-logo"

export function Hero() {
  const { t } = useLanguage()

  return (
    <section id="inicio" className="on-ink relative min-h-screen flex items-center overflow-hidden bg-ink text-primary-foreground">
      <HeroFormulasBg />
      <HeroInverseLogo />

      <div className="container mx-auto px-4 max-w-6xl relative z-10 pt-20 md:pt-24 pb-12 grid md:grid-cols-[1.2fr_1fr] gap-8 md:gap-12 items-center w-full">
        <div>
          <h1
            className="font-serif text-4xl md:text-6xl lg:text-7xl font-semibold leading-[1.02] text-balance hero-in"
            style={{ animationDelay: "120ms" }}
          >
            {t.hero.title}
          </h1>
          <p
            className="mt-6 text-lg md:text-xl text-primary-foreground/75 max-w-xl leading-relaxed hero-in"
            style={{ animationDelay: "240ms" }}
          >
            {t.hero.description}
          </p>
          <div className="mt-10 flex flex-wrap gap-4 hero-in" style={{ animationDelay: "360ms" }}>
            <Link
              href="/publicaciones"
              className="inline-flex items-center gap-2 bg-gold text-ink px-6 py-3 rounded font-medium transition-colors hover:bg-primary-foreground"
            >
              {t.hero.viewPublications} <ArrowRight className="h-4 w-4" />
            </Link>
            <a href="#contacto" className="inline-flex items-center px-6 py-3 rounded font-medium border border-primary-foreground/40 transition-colors hover:border-gold hover:text-gold">
              {t.hero.contact}
            </a>
          </div>
        </div>

        {/* Espacio reservado para el logo 3D en la columna derecha */}
        <div className="hidden md:block min-h-[360px]" aria-hidden="true" />
      </div>

      <style>{`
        @keyframes hero-in { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: none; } }
        .hero-in { animation: hero-in 0.9s cubic-bezier(.2,.7,.2,1) both; }
      `}</style>
    </section>
  )
}
