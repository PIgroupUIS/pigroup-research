import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { NewsCard } from "@/components/news-card"
import { getImagePath } from "@/lib/utils"
import { news } from "@/lib/data"

// One template for every news item: pages are generated from news.json at build time.
export function generateStaticParams() {
  return news.map((n) => ({ id: String(n.id) }))
}

type Props = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const item = news.find((n) => String(n.id) === id)
  return item ? { title: item.title, description: item.summary } : {}
}

export default async function NewsDetailPage({ params }: Props) {
  const { id } = await params
  const item = news.find((n) => String(n.id) === id)
  if (!item) notFound()
  const more = news.filter((n) => n.id !== item.id).slice(0, 2)

  return (
    <main>
      <section className="on-ink bg-ink text-primary-foreground pt-32 md:pt-40 pb-40 md:pb-56">
        <div className="container mx-auto px-4 max-w-3xl">
          <Link href="/noticias" className="inline-flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-gold">
            <ArrowLeft className="h-4 w-4" /> Noticias
          </Link>
          <p className="eyebrow mt-10">
            <time dateTime={item.date}>{item.dateFormatted}</time> · {item.category}
          </p>
          <h1 className="mt-4 font-serif text-3xl md:text-5xl font-semibold leading-[1.1] text-balance">{item.title}</h1>
          <p className="mt-6 font-mono text-xs text-primary-foreground/60">
            {item.author} · {item.readTime} de lectura
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-4xl -mt-28 md:-mt-44">
        <img
          src={getImagePath(item.image)}
          alt={item.title}
          fetchPriority="high"
          className="w-full aspect-[16/9] object-cover rounded bg-muted"
        />
      </div>

      <article className="container mx-auto px-4 max-w-3xl py-14 md:py-20">
        <p className="text-xl md:text-2xl font-serif leading-relaxed text-foreground">{item.summary}</p>
        <div className="mt-8 space-y-6 text-lg leading-[1.8] text-foreground/85">
          {item.description.split(/\n\s*\n/).map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        {item.tags.length > 0 && (
          <p className="mt-12 pt-6 border-t border-border font-mono text-xs text-muted-foreground">
            {item.tags.map((t) => `#${t}`).join("  ")}
          </p>
        )}
      </article>

      {more.length > 0 && (
        <section className="bg-secondary py-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <p className="eyebrow mb-10">Más noticias</p>
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
