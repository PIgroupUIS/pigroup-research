"use client"

import { PageHero } from "@/components/page-hero"
import { PublicationEntry } from "@/components/publication-entry"
import { publications } from "@/lib/data"
import { useLanguage } from "@/components/language-context"

export default function PublicationsPage() {
  const { language, t } = useLanguage()

  const subtitle =
    language === "en"
      ? `${publications.length} works, ordered from most recent to oldest.`
      : `${publications.length} trabajos, ordenados del más reciente al más antiguo.`

  return (
    <main>
      <PageHero eyebrow={t.publications.eyebrow} title={t.publications.pageTitle}>
        {subtitle}
      </PageHero>
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-5xl border-t border-border">
          {publications.map((pub, i) => (
            <PublicationEntry key={pub.id} pub={pub} delay={Math.min(i, 3) * 80} />
          ))}
        </div>
      </section>
    </main>
  )
}