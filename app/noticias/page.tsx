import type { Metadata } from "next"
import { PageHero } from "@/components/page-hero"
import { news } from "@/lib/data"
import { NewsList } from "./news-list"

export const metadata: Metadata = { title: "Noticias" }

export default function NewsPage() {
  return (
    <main>
      <PageHero eyebrow="Noticias" title="Actividades, logros y seminarios del grupo" />
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 max-w-6xl">
          <NewsList items={news} />
        </div>
      </section>
    </main>
  )
}