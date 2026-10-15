import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { publications } from "@/lib/data"
import { PublicationDetailContent } from "./publication-detail-content"

// One template for every publication: pages are generated from publications.json at build time.
export function generateStaticParams() {
  return publications.map((p) => ({ id: String(p.id) }))
}

type Props = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const pub = publications.find((p) => String(p.id) === id)
  return pub ? { title: pub.title, description: pub.abstract.slice(0, 160) } : {}
}

export default async function PublicationDetailPage({ params }: Props) {
  const { id } = await params
  const pub = publications.find((p) => String(p.id) === id)
  if (!pub) notFound()

  return <PublicationDetailContent pub={pub} />
}