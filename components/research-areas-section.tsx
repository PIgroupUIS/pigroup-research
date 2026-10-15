"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { SectionHeading } from "@/components/page-hero"
import { useLanguage } from "./language-context"

const researchAreas = {
  es: [
    {
      id: "time-reverse-imaging",
      title: "Time-Reverse Imaging",
      description:
        "Reconstrucción de escenas pasadas utilizando trazas térmicas y modelos de lenguaje visual para resolver problemas inversos temporales.",
      href: "/ramas/time-reverse-imaging",
      highlights: ["Visión computacional", "Machine learning", "Problemas inversos"],
    },
  ],
  en: [
    {
      id: "time-reverse-imaging",
      title: "Time-Reverse Imaging",
      description:
        "Past scene reconstruction using thermal traces and visual language models to solve temporal inverse problems.",
      href: "/ramas/time-reverse-imaging",
      highlights: ["Computer Vision", "Machine Learning", "Inverse Problems"],
    },
  ],
}

export function ResearchAreasSection() {
  const { language, t } = useLanguage()
  const areas = researchAreas[language]

  return (
    <section id="research-areas" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <SectionHeading eyebrow={t.researchAreas.eyebrow} title={t.researchAreas.title}>
          {t.researchAreas.description}
        </SectionHeading>

        <ul className="border-t border-border">
          {areas.map((area) => (
            <li key={area.id} data-reveal>
              <Link
                href={area.href}
                className="group grid md:grid-cols-[1fr_2fr_auto] gap-4 md:gap-10 items-baseline py-10 border-b border-border"
              >
                <h3 className="font-serif text-2xl md:text-3xl font-semibold transition-colors group-hover:text-gold-deep">
                  {area.title}
                </h3>
                <div>
                  <p className="text-muted-foreground leading-relaxed">{area.description}</p>
                  <p className="mt-3 font-mono text-xs text-muted-foreground">{area.highlights.join(" · ")}</p>
                </div>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-foreground">
                  {t.researchAreas.explore}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}