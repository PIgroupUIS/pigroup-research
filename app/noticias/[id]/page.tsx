import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { news } from "@/lib/data"
import { NewsDetailContent } from "./news-detail-content"

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

  return <NewsDetailContent item={item} more={more} />
}
