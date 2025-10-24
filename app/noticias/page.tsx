"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { Calendar, ArrowLeft, Clock, User } from "lucide-react"
import { getImagePath, getPagePath } from "@/lib/utils"

interface NewsItem {
  id: number
  title: string
  description: string
  summary: string
  date: string
  dateFormatted: string
  image: string
  featured: boolean
  category: string
  tags: string[]
  author: string
  readTime: string
}

export default function NewsPage() {
  const [allNews, setAllNews] = useState<NewsItem[]>([])
  const [filteredNews, setFilteredNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set())

  useEffect(() => {
    const loadNews = async () => {
      try {
        const response = await fetch(getImagePath('/news.json'))
        const data = await response.json()
        // Ordenar por fecha (más recientes primero) y luego por destacadas
        const sorted = data.news.sort((a: NewsItem, b: NewsItem) => {
          const dateA = new Date(a.date).getTime()
          const dateB = new Date(b.date).getTime()
          if (dateB !== dateA) return dateB - dateA
          if (a.featured !== b.featured) return a.featured ? -1 : 1
          return 0
        })
        setAllNews(sorted)
        setFilteredNews(sorted)
      } catch (error) {
        console.error('Error loading news:', error)
      } finally {
        setLoading(false)
      }
    }

    loadNews()
  }, [])

  useEffect(() => {
    let filtered = allNews

    if (categoryFilter !== "all") {
      filtered = filtered.filter(item => item.category === categoryFilter)
    }

    setFilteredNews(filtered)
  }, [allNews, categoryFilter])

  const toggleExpanded = (id: number) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedItems(newExpanded)
  }

  // Obtener categorías únicas
  const uniqueCategories = [...new Set(allNews.map(item => item.category))].sort()

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
      <Header />
      
      {/* Hero Section */}
      <div className="bg-primary text-primary-foreground py-16 pt-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
              Todas las Noticias
            </h1>
            <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
              Explora todas las novedades, logros y actividades de nuestro grupo de investigación
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
                Mostrando {filteredNews.length} de {allNews.length} noticias
              </div>
              <div className="flex gap-4">
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las categorías</SelectItem>
                    {uniqueCategories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* News Grid */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNews.map((item: NewsItem) => {
                const isExpanded = expandedItems.has(item.id)
                return (
                  <Card 
                    key={item.id} 
                    className={`overflow-hidden hover:shadow-xl transition-all duration-300 ${
                      item.featured ? 'ring-2 ring-accent/20 bg-accent/5' : ''
                    }`}
                  >
                    {/* Imagen */}
                    <div className="aspect-video relative overflow-hidden bg-muted">
                      <img
                        src={getImagePath(item.image)}
                        alt={item.title}
                        loading="lazy"
                        className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                      />
                      {item.featured && (
                        <div className="absolute top-3 left-3 bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-medium">
                          Destacada
                        </div>
                      )}
                    </div>
                    
                    {/* Contenido */}
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>{item.dateFormatted}</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {item.category}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg font-serif leading-tight line-clamp-2">
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                        {isExpanded ? item.description : item.summary}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {item.tags.slice(0, isExpanded ? item.tags.length : 3).map((tag, index) => (
                          <Badge 
                            key={index}
                            variant="secondary" 
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                        {!isExpanded && item.tags.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{item.tags.length - 3}
                          </Badge>
                        )}
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-3 border-t text-xs text-muted-foreground">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            <span>{item.author}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{item.readTime}</span>
                          </div>
                        </div>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-auto p-0 text-xs text-primary hover:text-primary/80"
                          onClick={() => toggleExpanded(item.id)}
                        >
                          {isExpanded ? 'Ver menos' : 'Leer más'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {filteredNews.length === 0 && (
              <div className="text-center py-16">
                <div className="text-muted-foreground text-lg">
                  No se encontraron noticias con los filtros seleccionados
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}