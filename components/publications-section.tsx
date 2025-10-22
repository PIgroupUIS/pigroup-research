"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AuthorsList } from "@/components/ui/authors-list"
import { ExternalLink, Download, ArrowRight } from "lucide-react"
import { getImagePath, getPagePath } from "@/lib/utils"

interface Publication {
  id: number
  title: string
  authors: string
  journal: string
  conference: string
  year: number
  image: string | null
  pdfUrl: string
  externalUrl: string
  starred: boolean
  abstract: string
  keywords: string[]
}

export function PublicationsSection() {
  const [starredPublications, setStarredPublications] = useState<Publication[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadPublications = async () => {
      try {
        const response = await fetch(getImagePath('/publications.json'))
        const data = await response.json()
        // Filtrar solo las publicaciones destacadas
        const starred = data.publications.filter((pub: Publication) => pub.starred)
        setStarredPublications(starred)
      } catch (error) {
        console.error('Error loading publications:', error)
      } finally {
        setLoading(false)
      }
    }

    loadPublications()
  }, [])

  if (loading) {
    return (
      <section id="publicaciones" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto text-center">
            <div className="animate-pulse">
              <div className="h-12 bg-muted rounded mb-4"></div>
              <div className="h-6 bg-muted rounded max-w-2xl mx-auto mb-16"></div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="publicaciones" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-4">Publicaciones Destacadas</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explora nuestras contribuciones científicas más relevantes en revistas y conferencias internacionales
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {starredPublications.map((pub: Publication) => (
              <Card
                key={pub.id}
                className="flex flex-col overflow-hidden hover:shadow-xl transition-shadow border-border"
              >
                <div className="aspect-video relative overflow-hidden bg-muted">
                  <img
                    src={pub.image ? getImagePath(pub.image) : getImagePath("/placeholder.svg")}
                    alt={pub.title}
                    loading="lazy"
                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-300 object-center md:object-top rounded-b-none"
                    style={{ aspectRatio: '16/9', background: '#f3f3f3' }}
                  />
                </div>
                <CardHeader className="flex-grow">
                  <CardTitle className="text-lg font-serif leading-tight mb-2">
                    <a 
                      href={process.env.NODE_ENV === "production" 
                        ? `/pigroup-research/publicaciones/${pub.id}` 
                        : `/publicaciones/${pub.id}`}
                      className="hover:text-accent transition-colors cursor-pointer"
                    >
                      {pub.title}
                    </a>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <AuthorsList authors={pub.authors} maxVisible={2} />
                    <p className="italic">{pub.conference}, {pub.year}</p>
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

          {/* Botón Ver Más Publicaciones */}
          <div className="text-center mt-12">
            <Button
              size="lg"
              variant="outline"
              className="border-accent text-black hover:bg-accent hover:text-accent-foreground bg-transparent font-sans font-medium"
              asChild
            >
              <a href={process.env.NODE_ENV === "production" ? "/pigroup-research/publicaciones" : "/publicaciones"}>
                Ver Todas las Publicaciones
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
