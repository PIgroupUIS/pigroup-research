import type { Metadata } from "next"
import { PageHero } from "@/components/page-hero"
import { PublicationEntry } from "@/components/publication-entry"
import { publications } from "@/lib/data"

export const metadata: Metadata = { title: "Publicaciones" }

export default function PublicationsPage() {
  return (
    <main>
      <PageHero eyebrow="Publicaciones" title="Artículos, preprints y conferencias">
        {publications.length} trabajos, ordenados del más reciente al más antiguo.
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