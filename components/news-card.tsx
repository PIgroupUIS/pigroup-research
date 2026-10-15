"use client"

import Link from "next/link"
import { getImagePath } from "@/lib/utils"
import type { NewsItem } from "@/lib/data"
import { useLanguage } from "./language-context"

// Same news teaser on the home page and on /noticias. Whole block links to the detail page.
export function NewsCard({ item, lead = false, delay = 0 }: { item: NewsItem; lead?: boolean; delay?: number }) {
  const { t } = useLanguage()
  return (
    <article data-reveal style={{ ["--reveal-delay" as string]: `${delay}ms` }}>
      <Link href={`/noticias/${item.id}`} className={`group block ${lead ? "md:grid md:grid-cols-[1.3fr_1fr] md:gap-10 md:items-center" : ""}`}>
        <div className="aspect-[16/10] overflow-hidden bg-muted rounded">
          <img
            src={getImagePath(item.image)}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        </div>
        <div className={lead ? "mt-6 md:mt-0" : "mt-5"}>
          <p className="eyebrow">
            <time dateTime={item.date}>{item.dateFormatted}</time> · {item.category}
          </p>
          <h3
            className={`mt-3 font-serif font-semibold leading-snug text-foreground transition-colors group-hover:text-gold-deep ${
              lead ? "text-2xl md:text-4xl" : "text-xl md:text-2xl"
            }`}
          >
            {item.title}
          </h3>
          <p className="mt-3 text-muted-foreground leading-relaxed">{item.summary}</p>
          <span className="mt-4 inline-block text-sm font-medium underline decoration-gold underline-offset-4">
            {t.news.readArticle}
          </span>
        </div>
      </Link>
    </article>
  )
}
