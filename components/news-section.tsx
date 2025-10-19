import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "lucide-react"
import { getImagePath } from "@/lib/utils"

const newsItems = [
  {
    id: 1,
    title: "Nueva publicación en revista internacional",
    description:
      "Nuestro equipo ha publicado un artículo innovador sobre algoritmos de optimización en la revista IEEE Transactions.",
    date: "15 de Marzo, 2024",
    image: "/research-laboratory-equipment.jpg",
  },
  {
    id: 2,
    title: "Conferencia Internacional 2024",
    description: "PIGroup participará en la conferencia internacional de computación científica en Bogotá.",
    date: "8 de Marzo, 2024",
    image: "/academic-conference.png",
  },
  {
    id: 3,
    title: "Nuevo proyecto de investigación aprobado",
    description: "Hemos recibido financiación para un proyecto de tres años sobre inteligencia artificial aplicada.",
    date: "1 de Marzo, 2024",
    image: "/artificial-intelligence-research.jpg",
  },
]

export function NewsSection() {
  return (
    <section id="noticias" className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-4">Últimas Noticias</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Mantente al día con las últimas novedades y logros de nuestro grupo de investigación
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsItems.map((news) => (
              <Card key={news.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video relative overflow-hidden bg-muted">
                  <img
                    src={news.image || getImagePath("/placeholder.svg")}
                    alt={news.title}
                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Calendar className="h-4 w-4" />
                    <span>{news.date}</span>
                  </div>
                  <CardTitle className="text-xl font-serif">{news.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">{news.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
