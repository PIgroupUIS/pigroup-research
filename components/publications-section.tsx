import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Download } from "lucide-react"
import { getImagePath } from "@/lib/utils"

const publications = [
  {
    id: 1,
    title: "Optimización de Algoritmos Cuánticos para Problemas NP-Completos",
    description:
      "Este estudio presenta un enfoque novedoso para la optimización de algoritmos cuánticos aplicados a problemas de complejidad NP-completa, demostrando mejoras significativas en tiempo de ejecución.",
    authors: "García, M., Rodríguez, L., Martínez, A.",
    journal: "IEEE Transactions on Quantum Computing",
    year: "2024",
    image: "/quantum-computing-abstract.png",
    pdfUrl: "#",
    externalUrl: "https://ieeexplore.ieee.org",
  },
  {
    id: 2,
    title: "Aprendizaje Profundo Aplicado a Diagnóstico Médico",
    description:
      "Investigación sobre la aplicación de redes neuronales profundas para el diagnóstico temprano de enfermedades cardiovasculares, alcanzando una precisión del 94%.",
    authors: "López, C., Fernández, P., Sánchez, R.",
    journal: "Nature Machine Intelligence",
    year: "2024",
    image: "/medical-ai-diagnosis.jpg",
    pdfUrl: "#",
    externalUrl: "https://nature.com",
  },
  {
    id: 3,
    title: "Sistemas Distribuidos para Procesamiento de Big Data",
    description:
      "Propuesta de arquitectura distribuida escalable para el procesamiento eficiente de grandes volúmenes de datos en tiempo real.",
    authors: "Ramírez, J., Torres, M., Gómez, S.",
    journal: "ACM Computing Surveys",
    year: "2023",
    image: "/distributed-systems-network.png",
    pdfUrl: "#",
    externalUrl: "https://dl.acm.org",
  },
  {
    id: 4,
    title: "Criptografía Post-Cuántica: Nuevos Paradigmas",
    description:
      "Análisis exhaustivo de algoritmos criptográficos resistentes a ataques de computadoras cuánticas y su implementación práctica.",
    authors: "Vargas, D., Moreno, A., Castro, L.",
    journal: "Journal of Cryptology",
    year: "2023",
    image: "/cryptography-security.jpg",
    pdfUrl: "#",
    externalUrl: "https://link.springer.com",
  },
  {
    id: 5,
    title: "Robótica Colaborativa en Entornos Industriales",
    description:
      "Desarrollo de sistemas robóticos colaborativos seguros para la automatización de procesos industriales complejos.",
    authors: "Herrera, F., Díaz, N., Ruiz, P.",
    journal: "IEEE Robotics and Automation Letters",
    year: "2023",
    image: "/collaborative-robots-industry.jpg",
    pdfUrl: "#",
    externalUrl: "https://ieeexplore.ieee.org",
  },
  {
    id: 6,
    title: "Computación en la Nube: Optimización de Recursos",
    description:
      "Estrategias innovadoras para la optimización del uso de recursos en infraestructuras de computación en la nube.",
    authors: "Ortiz, M., Navarro, C., Jiménez, A.",
    journal: "Cloud Computing Journal",
    year: "2023",
    image: "/cloud-computing-infrastructure.jpg",
    pdfUrl: "#",
    externalUrl: "https://cloudcomputing.com",
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
