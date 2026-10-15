"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { SectionHeading } from "@/components/page-hero"
import { Authors, venue } from "@/components/publication-entry"
import { getImagePath } from "@/lib/utils"
import { publications } from "@/lib/data"
import { useLanguage } from "./language-context"

export function PublicationsSection() {
  const { t } = useLanguage()
  const starred = publications.filter((p) => p.starred)
  if (starred.length === 0) return null

  return (
    <section id="publicaciones" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow={t.publications.eyebrow} title={t.publications.title} />
          <Link href="/publicaciones" className="mb-12 md:mb-16 inline-flex items-center gap-2 text-sm font-medium hover:text-gold-deep">
            {t.publications.allPublications} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="space-y-20">
          {starred.map((pub, i) => (
            <article
              key={pub.id}
              data-reveal
              className={`grid md:grid-cols-2 gap-8 md:gap-14 items-center ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}
            >
              <Link href={`/publicaciones/${pub.id}`} className="group block overflow-hidden rounded bg-muted border border-border">
                <img
                  src={getImagePath(pub.image || "/placeholder.svg")}
                  alt={`Figura de ${pub.title}`}
                  loading="lazy"
                  decoding="async"
                  className="w-full aspect-[16/10] object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </Link>
              <div>
                <p className="eyebrow">
                  {venue(pub)} · {pub.year}
                </p>
                <h3 className="mt-3 font-serif text-2xl md:text-3xl font-semibold leading-snug">
                  <Link href={`/publicaciones/${pub.id}`} className="hover:text-gold-deep transition-colors">
                    {pub.title}
                  </Link>
                </h3>
                <Authors authors={pub.authors} className="mt-4 text-muted-foreground" />
                <p className="mt-4 text-muted-foreground leading-relaxed line-clamp-3">{pub.abstract}</p>
                <div className="mt-6 flex gap-6 text-sm font-medium">
                  <Link href={`/publicaciones/${pub.id}`} className="underline decoration-gold underline-offset-4 hover:text-gold-deep">
                    {t.publications.readAbstract}
                  </Link>
                  <a href={pub.pdfUrl} target="_blank" rel="noopener noreferrer" className="hover:text-gold-deep">
                    PDF ↗
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
