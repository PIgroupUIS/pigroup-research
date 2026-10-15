"use client"

import { PageHero } from "@/components/page-hero"
import { news } from "@/lib/data"
import { NewsList } from "./news-list"
import { useLanguage } from "@/components/language-context"

export default function NewsPage() {
  const { t } = useLanguage()

  return (
    <main>
      <PageHero eyebrow={t.news.eyebrow} title={t.news.pageTitle} />
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 max-w-6xl">
          <NewsList items={news} />
        </div>
      </section>
    </main>
  )
}