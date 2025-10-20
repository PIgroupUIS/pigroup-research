"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AuthorsList } from "@/components/ui/authors-list"
import { ExternalLink, Download, ArrowLeft } from "lucide-react"
import { getImagePath, getPagePath } from "@/lib/utils"
import Link from "next/link"

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

export default function PublicationsPage() {
  const [publications, setPublications] = useState<Publication[]>([])
  const [filteredPublications, setFilteredPublications] = useState<Publication[]>([])
  const [loading, setLoading] = useState(true)
  const [yearFilter, setYearFilter] = useState<string>("all")
  const [conferenceFilter, setConferenceFilter] = useState<string>("all")

  useEffect(() => {
    const loadPublications = async () => {
      try {
        const response = await fetch(getImagePath('/publications.json'))
        const data = await response.json()
        setPublications(data.publications)
        setFilteredPublications(data.publications)
      } catch (error) {
        console.error('Error loading publications:', error)
      } finally {
        setLoading(false)
      }
    }

    loadPublications()
  }, [])

  useEffect(() => {
    let filtered = publications

    if (yearFilter !== "all") {
      filtered = filtered.filter(pub => pub.year.toString() === yearFilter)
    }

    if (conferenceFilter !== "all") {
      filtered = filtered.filter(pub => pub.conference === conferenceFilter)
    }

    // Ordenar por año (más recientes primero) y luego por destacadas
    filtered.sort((a, b) => {
      if (a.year !== b.year) return b.year - a.year
      if (a.starred !== b.starred) return a.starred ? -1 : 1
      return 0
    })

    setFilteredPublications(filtered)
  }, [publications, yearFilter, conferenceFilter])

  // Obtener años únicos
  const uniqueYears = [...new Set(publications.map(pub => pub.year))].sort((a, b) => b - a)
  
  // Obtener conferencias únicas
  const uniqueConferences = [...new Set(publications.map(pub => pub.conference))].sort()

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-32">
          <div className="animate-pulse">
            <div className="h-12 bg-muted rounded mb-4"></div>
            <div className="h-6 bg-muted rounded max-w-2xl mx-auto mb-16"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <a 
              href={process.env.NODE_ENV === "production" ? "/pigroup-research" : "/"}
              className="inline-flex items-center text-primary-foreground/80 hover:text-primary-foreground mb-6 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver al inicio
            </a>
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
              Todas las Publicaciones
            </h1>
            <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
              Explora el catálogo completo de nuestras investigaciones y contribuciones científicas
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-secondary py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Mostrando {filteredPublications.length} de {publications.length} publicaciones
              </div>
              <div className="flex gap-4">
                <Select value={yearFilter} onValueChange={setYearFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Año" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los años</SelectItem>
                    {uniqueYears.map(year => (
                      <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={conferenceFilter} onValueChange={setConferenceFilter}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Conferencia" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las conferencias</SelectItem>
                    {uniqueConferences.map(conference => (
                      <SelectItem key={conference} value={conference}>{conference}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Publications Grid */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="space-y-6">
              {filteredPublications.map((pub: Publication) => (
                <Card 
                  key={pub.id} 
                  className={`overflow-hidden hover:shadow-lg transition-shadow ${
                    pub.starred ? 'ring-2 ring-accent/20 bg-accent/5' : ''
                  }`}
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Imagen solo para publicaciones destacadas */}
                    {pub.starred && pub.image && (
                      <div className="md:w-80 aspect-video md:aspect-square relative overflow-hidden bg-muted">
                        <img
                          src={getImagePath(pub.image)}
                          alt={pub.title}
                          loading="lazy"
                          className="object-cover w-full h-full"
                        />
                        {pub.starred && (
                          <div className="absolute top-3 left-3 bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-medium">
                            Destacada
                          </div>
                        )}
                      </div>
                    )}
                    
                    {/* Contenido */}
                    <div className="flex-1 p-6">
                      <div className="flex flex-col h-full">
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div className="text-sm text-muted-foreground flex items-center gap-2">
                              <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">
                                {pub.conference}
                              </span>
                              <span>{pub.year}</span>
                              {pub.starred && !pub.image && (
                                <span className="bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs">
                                  Destacada
                                </span>
                              )}
                            </div>
                          </div>
                          
                          <h3 className="text-xl font-serif font-bold mb-3 leading-tight">
                            {pub.title}
                          </h3>
                          
                          <div className="space-y-2 mb-4">
                            <AuthorsList 
                              authors={pub.authors} 
                              maxVisible={3}
                              className="mb-2"
                            />
                            <p className="text-sm italic text-muted-foreground">
                              {pub.journal}, {pub.year}
                            </p>
                          </div>

                          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                            {pub.abstract}
                          </p>

                          <div className="flex flex-wrap gap-1 mb-4">
                            {pub.keywords.slice(0, 4).map((keyword, index) => (
                              <span 
                                key={index}
                                className="bg-muted text-muted-foreground px-2 py-1 rounded text-xs"
                              >
                                {keyword}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Botones */}
                        <div className="flex gap-3 pt-4">
                          <Button
                            variant="default"
                            size="sm"
                            className="bg-accent text-accent-foreground hover:bg-accent/90"
                            asChild
                          >
                            <a href={pub.pdfUrl} target="_blank" rel="noopener noreferrer">
                              <Download className="h-4 w-4 mr-2" />
                              PDF
                            </a>
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            asChild
                          >
                            <a href={pub.externalUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Ver más
                            </a>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {filteredPublications.length === 0 && (
              <div className="text-center py-16">
                <div className="text-muted-foreground text-lg">
                  No se encontraron publicaciones con los filtros seleccionados
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}