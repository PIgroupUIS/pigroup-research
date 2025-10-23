import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { NewsSection } from "@/components/news-section"
import { PublicationsSection } from "@/components/publications-section"
import { ResearchAreasSection } from "@/components/research-areas-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <ResearchAreasSection />
      <NewsSection />
      <PublicationsSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
