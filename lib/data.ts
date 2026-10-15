// Content lives in public/*.json; importing it here bundles it at build time (no client fetch, no loading flash).
import newsJson from "@/public/news.json"
import pubsJson from "@/public/publications.json"
import teamJson from "@/public/equipo.json"

export interface NewsItem {
  id: number
  title: string
  description: string
  summary: string
  date: string
  dateFormatted: string
  image: string
  featured: boolean
  category: string
  tags: string[]
  author: string
  readTime: string
}

export interface Publication {
  id: number
  title: string
  authors: string
  journal: string
  conference: string | null
  year: number
  image: string | null
  pdfUrl: string
  externalUrl: string
  supplementaryMaterial?: string | null
  starred: boolean
  abstract: string
  keywords: string[]
}

export interface TeamMember {
  id: number
  nombre: string
  apellido: string
  cargo: string
  nivelEscolar: string
  institucion: string
  imagen: string
  scholar: string | null
  paginaPersonal: string | null
  email: string
  bio?: string
  areasInvestigacion: string[]
  activo: boolean
}

export const news = ([...newsJson.news] as NewsItem[]).sort((a, b) => b.date.localeCompare(a.date))
export const publications = ([...pubsJson.publications] as Publication[]).sort(
  (a, b) => b.year - a.year || Number(b.starred) - Number(a.starred),
)
// Order in equipo.json is the display order (director first)
export const team = (teamJson.team as TeamMember[]).filter((m) => m.activo)
