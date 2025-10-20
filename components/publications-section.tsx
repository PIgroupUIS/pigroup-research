import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Download } from "lucide-react"
import { getImagePath } from "@/lib/utils"

const publications = [
  {
    id: 1,
    title: "See the past: Time-Reversed Scene Reconstruction from Thermal Traces Using Visual Language Models",
    description:
      "El estudio propone un método que, usando imágenes térmicas y RGB, reconstruye eventos ocurridos hasta 120 segundos antes, aprovechando las huellas de calor humano y combinando modelos visual-lingüísticos con un proceso de difusión para lograr reconstrucciones coherentes del pasado.",
    authors: "Kebin Contreras, Luis Toscano-Palomino, Mauro Dalla Mura, Jorge Bacca",
    journal: "arXiv preprint",
    year: "2025",
    image: "/references_scenes.png",
    pdfUrl: "https://arxiv.org/abs/2510.05408",
    externalUrl: "https://ieeexplore.ieee.org",
  },
  {
    id: 2,
    title: "Deep Robust Object Detection Under High Illumination Conditions Using Modulo Images",
    description:
      "El trabajo propone usar imágenes módulo para detectar drones bajo alta iluminación, evitando la saturación del sensor y logrando más del 96% de precisión sin necesidad de reconstruir imágenes HDR.",
    authors: "Luis Toscano-Palomino, Kebin Contreras, Brayan Monroy, Jorge Bacca",
    journal: "IEEE",
    year: "2025",
    image: "/drones.png",
    pdfUrl: "https://ieeexplore.ieee.org/abstract/document/11156687",
    externalUrl: "https://nature.com",
  },
  {
    id: 3,
    title: "Automated Classification of Cocoa Bean Fermentation Levels Using Computer Vision",
    description:
      "El estudio desarrolla un sistema automatizado para clasificar el nivel de fermentación del cacao mediante modelos YOLO y redes convolucionales. Usando imágenes RGB de granos cortados y etiquetados según la norma NTC 1252:2021, el modelo YOLOv8m obtuvo el mejor desempeño, con un F1-score de 0.6685, superando versiones anteriores de YOLO.",
    authors: "Juan Suarez, Juan Espinosa, Kebin Contreras, Jorge Bacca",
    journal: "IEEE",
    year: "2025",
    image: "/distributed-systems-network.png",
    pdfUrl: "https://ieeexplore.ieee.org/abstract/document/11156348",
    externalUrl: "https://dl.acm.org",
  },
  
]

export function PublicationsSection() {
  return (
    <section id="publicaciones" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-4">Publicaciones</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explora nuestras contribuciones científicas en revistas y conferencias internacionales
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {publications.map((pub) => (
              <Card
                key={pub.id}
                className="flex flex-col overflow-hidden hover:shadow-xl transition-shadow border-border"
              >
                <div className="aspect-video relative overflow-hidden bg-muted">
                  <img
                    src={getImagePath(pub.image) || getImagePath("/placeholder.svg")}
                    alt={pub.title}
                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader className="flex-grow">
                  <CardTitle className="text-lg font-serif leading-tight mb-2">{pub.title}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed">{pub.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p className="font-medium">{pub.authors}</p>
                    <p className="italic">
                      {pub.journal}, {pub.year}
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2 pt-4">
                  <Button
                    variant="default"
                    size="sm"
                    className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90"
                    asChild
                  >
                    <a href={pub.pdfUrl} target="_blank" rel="noopener noreferrer">
                      <Download className="h-4 w-4 mr-2" />
                      PDF
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent" asChild>
                    <a href={pub.externalUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Ver más
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
