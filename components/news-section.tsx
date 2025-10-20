import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "lucide-react"
import { getImagePath } from "@/lib/utils"

const newsItems = [
  {
    id: 1,
    title: "Inicio del semillero con invitada internacional",
    description:
      "El semillero de investigación PI Group dio inicio a sus actividades del semestre con la participación de la Dra. Tatiana Gelvez (Lyon, Francia), quien compartió con los nuevos integrantes sus experiencias en problemas inversos y métodos numéricos. Este encuentro marcó el comienzo de los Seminarios Internacionales y los espacios de investigación colaborativa del grupo, promoviendo la formación científica y el intercambio académico de alto nivel.",
    date: "15 de Octubre, 2025",
    image: "/seminario1.jpg",
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
                    src={getImagePath(news.image) || getImagePath("/placeholder.svg")}
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
