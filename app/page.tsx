import { Hero } from "@/components/hero"
import { NewsSection } from "@/components/news-section"
import { PublicationsSection } from "@/components/publications-section"
import { ResearchAreasSection } from "@/components/research-areas-section"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <ResearchAreasSection />
      <NewsSection />
      <PublicationsSection />
    </main>
  )
}
