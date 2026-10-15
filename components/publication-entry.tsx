import Link from "next/link"
import { team, type Publication } from "@/lib/data"

const memberSurnames = team.map((m) => m.apellido.toLowerCase())

// Full author list, group members emphasised (standard on academic lab sites).
export function Authors({ authors, className = "" }: { authors: string; className?: string }) {
  const list = authors.split(",").map((a) => a.trim())
  return (
    <p className={className}>
      {list.map((a, i) => (
        <span key={a}>
          {memberSurnames.some((s) => a.toLowerCase().includes(s)) ? <strong className="font-semibold text-foreground">{a}</strong> : a}
          {i < list.length - 1 && ", "}
        </span>
      ))}
    </p>
  )
}

export const venue = (p: Publication) => p.conference || p.journal

// One bibliographic row, used on the home page and on /publicaciones.
export function PublicationEntry({ pub, delay = 0 }: { pub: Publication; delay?: number }) {
  return (
    <article
      data-reveal
      style={{ ["--reveal-delay" as string]: `${delay}ms` }}
      className="grid md:grid-cols-[6rem_1fr] gap-2 md:gap-8 py-8 border-b border-border"
    >
      <p className="font-mono text-sm text-gold-deep">{pub.year}</p>
      <div>
        <h3 className="font-serif text-xl md:text-2xl font-semibold leading-snug">
          <Link href={`/publicaciones/${pub.id}`} className="hover:text-gold-deep transition-colors">
            {pub.title}
          </Link>
        </h3>
        <Authors authors={pub.authors} className="mt-2 text-muted-foreground" />
        <p className="mt-1 text-sm italic text-muted-foreground">{venue(pub)}</p>
        <div className="mt-4 flex gap-6 text-sm font-medium">
          <Link href={`/publicaciones/${pub.id}`} className="underline decoration-gold underline-offset-4 hover:text-gold-deep">
            Resumen
          </Link>
          <a href={pub.pdfUrl} target="_blank" rel="noopener noreferrer" className="hover:text-gold-deep">
            PDF ↗
          </a>
        </div>
      </div>
    </article>
  )
}
