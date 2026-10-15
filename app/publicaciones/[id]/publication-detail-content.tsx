"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Authors, venue } from "@/components/publication-entry"
import { getImagePath } from "@/lib/utils"
import type { Publication } from "@/lib/data"
import { useLanguage } from "@/components/language-context"

function bibtex(p: Publication) {
  const first = p.authors.split(",")[0].trim().split(" ").pop()?.toLowerCase() ?? "pigroup"
  const key = `${first}${p.year}${p.title.split(" ")[0].toLowerCase().replace(/\W/g, "")}`
  return `@article{${key},
  title   = {${p.title}},
  author  = {${p.authors.split(",").map((a) => a.trim()).join(" and ")}},
  journal = {${p.journal}},
  year    = {${p.year}},
  url     = {${p.externalUrl}}
}`
}

export function PublicationDetailContent({ pub }: { pub: Publication }) {
  const { language, t } = useLanguage()
  const isEn = language === "en"

  const abstract = isEn && pub.abstract_en ? pub.abstract_en : pub.abstract
  const keywords = isEn && pub.keywords_en ? pub.keywords_en : pub.keywords

  const links = [
    { href: pub.pdfUrl, label: "PDF" },
    pub.externalUrl && pub.externalUrl !== pub.pdfUrl ? { href: pub.externalUrl, label: t.publications.paperPage } : null,
    pub.supplementaryMaterial ? { href: pub.supplementaryMaterial, label: t.publications.supplementary } : null,
  ].filter(Boolean) as { href: string; label: string }[]

  return (
    <main>
      <section className="on-ink bg-ink text-primary-foreground pt-32 md:pt-40 pb-16 md:pb-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <Link href="/publicaciones" className="inline-flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-gold">
            <ArrowLeft className="h-4 w-4" /> {t.publications.backToPublications}
          </Link>
          <p className="eyebrow mt-10">
            {venue(pub)} · {pub.year}
          </p>
          <h1 className="mt-4 font-serif text-3xl md:text-5xl font-semibold leading-[1.1] text-balance">{pub.title}</h1>
          <Authors authors={pub.authors} className="mt-6 text-lg text-primary-foreground/75 [&_strong]:text-primary-foreground" />
          <div className="mt-8 flex flex-wrap gap-4">
            {links.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center px-5 py-2.5 rounded text-sm font-medium transition-colors ${
                  i === 0 ? "bg-gold text-ink hover:bg-primary-foreground" : "border border-primary-foreground/40 hover:border-gold hover:text-gold"
                }`}
              >
                {l.label} ↗
              </a>
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-5xl py-14 md:py-20 grid md:grid-cols-[1fr_16rem] gap-12">
        <article>
          {pub.image && (
            <figure className="mb-12">
              <img
                src={getImagePath(pub.image)}
                alt={`Figura principal de ${pub.title}`}
                className="w-full rounded border border-border bg-muted"
              />
            </figure>
          )}
          <h2 className="eyebrow mb-4">{t.publications.summary}</h2>
          <p className="text-lg leading-[1.8] text-foreground/85">{abstract}</p>

          <details className="mt-12 border-t border-border pt-6 group">
            <summary className="cursor-pointer eyebrow list-none">
              {t.publications.citeBibtex} <span className="group-open:hidden">+</span><span className="hidden group-open:inline">−</span>
            </summary>
            <pre className="mt-4 overflow-x-auto rounded bg-secondary p-4 font-mono text-xs leading-relaxed text-foreground">{bibtex(pub)}</pre>
          </details>
        </article>

        <aside className="space-y-8 text-sm md:border-l md:border-border md:pl-8 h-fit">
          <div>
            <p className="eyebrow mb-2">{t.publications.publishedIn}</p>
            <p className="text-foreground">{pub.journal}</p>
          </div>
          <div>
            <p className="eyebrow mb-2">{t.publications.year}</p>
            <p className="font-mono text-foreground">{pub.year}</p>
          </div>
          {keywords && keywords.length > 0 && (
            <div>
              <p className="eyebrow mb-2">{t.publications.keywords}</p>
              <ul className="space-y-1 text-muted-foreground">
                {keywords.map((k) => (
                  <li key={k}>{k}</li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>
    </main>
  )
}
