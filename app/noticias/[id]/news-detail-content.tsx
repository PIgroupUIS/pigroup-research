"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { NewsCard } from "@/components/news-card"
import { getImagePath } from "@/lib/utils"
import type { NewsItem } from "@/lib/data"
import { useLanguage } from "@/components/language-context"

export function NewsDetailContent({ item, more }: { item: NewsItem; more: NewsItem[] }) {
  const { language, t } = useLanguage()
  const isEn = language === "en"

  const title = isEn && item.title_en ? item.title_en : item.title
  const summary = isEn && item.summary_en ? item.summary_en : item.summary
  const description = isEn && item.description_en ? item.description_en : item.description
  const dateFormatted = isEn && item.dateFormatted_en ? item.dateFormatted_en : item.dateFormatted
  const category = isEn && item.category_en ? item.category_en : item.category
  const tags = isEn && item.tags_en ? item.tags_en : item.tags

  return (
    <main>
      <section className="on-ink bg-ink text-primary-foreground pt-32 md:pt-40 pb-40 md:pb-56">
        <div className="container mx-auto px-4 max-w-3xl">
          <Link href="/noticias" className="inline-flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-gold">
            <ArrowLeft className="h-4 w-4" /> {t.news.backToNews}
          </Link>
          <p className="eyebrow mt-10">
            <time dateTime={item.date}>{dateFormatted}</time> · {category}
          </p>
          <h1 className="mt-4 font-serif text-3xl md:text-5xl font-semibold leading-[1.1] text-balance">{title}</h1>
          <p className="mt-6 font-mono text-xs text-primary-foreground/60">
            {item.author} · {item.readTime} {t.news.readTime}
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-4xl -mt-28 md:-mt-44">
        <img
          src={getImagePath(item.image)}
          alt={title}
          fetchPriority="high"
          className="w-full aspect-[16/9] object-cover rounded bg-muted"
        />
      </div>

      <article className="container mx-auto px-4 max-w-3xl py-14 md:py-20">
        <p className="text-xl md:text-2xl font-serif leading-relaxed text-foreground">{summary}</p>
        <div className="mt-8 space-y-6 text-lg leading-[1.8] text-foreground/85">
          {description.split(/\n\s*\n/).map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        {tags && tags.length > 0 && (
          <p className="mt-12 pt-6 border-t border-border font-mono text-xs text-muted-foreground">
            {tags.map((tg) => `#${tg}`).join("  ")}
          </p>
        )}
      </article>

      {more.length > 0 && (
        <section className="bg-secondary py-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <p className="eyebrow mb-10">{t.news.moreNews}</p>
            <div className="grid md:grid-cols-2 gap-12">
              {more.map((n) => (
                <NewsCard key={n.id} item={n} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
