"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { SectionHeading } from "@/components/page-hero"
import { NewsCard } from "@/components/news-card"
import { news } from "@/lib/data"
import { useLanguage } from "./language-context"

export function NewsSection() {
  const { t } = useLanguage()
  const [lead, ...rest] = news.filter((n) => n.featured).slice(0, 3)
  if (!lead) return null

  return (
    <section id="noticias" className="py-24 md:py-32 bg-secondary">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow={t.news.eyebrow} title={t.news.title} />
          <Link href="/noticias" className="mb-12 md:mb-16 inline-flex items-center gap-2 text-sm font-medium hover:text-gold-deep">
            {t.news.allNews} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <NewsCard item={lead} lead />
        {rest.length > 0 && (
          <div className="mt-16 grid md:grid-cols-2 gap-12">
            {rest.map((item, i) => (
              <NewsCard key={item.id} item={item} delay={i * 120} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
