"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, ArrowRight } from "lucide-react"
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

export function NewsSection() {
  const [featuredNews, setFeaturedNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadNews = async () => {
      try {
        const response = await fetch(getImagePath('/news.json'))
        const data = await response.json()
        // Filtrar solo las noticias destacadas y tomar las 3 más recientes
        const featured = data.news
          .filter((item: NewsItem) => item.featured)
          .sort((a: NewsItem, b: NewsItem) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, 3)
        setFeaturedNews(featured)
      } catch (error) {
        console.error('Error loading news:', error)
      } finally {
        setLoading(false)
      }
    }

    loadNews()
  }, [])

  if (loading) {
    return (
      <section id="noticias" className="py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
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
    <section id="noticias" className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-4">Noticias <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Destacadas</span></h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Mantente al día con las últimas novedades y logros más importantes de nuestro grupo de investigación
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredNews.map((news: NewsItem) => (
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
                    <span>{news.dateFormatted}</span>
                    <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">
                      {news.category}
                    </span>
                  </div>
                  <CardTitle className="text-xl font-serif">{news.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {news.summary}
                  </CardDescription>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t">
                    <span className="text-xs text-muted-foreground">{news.readTime} de lectura</span>
                    <span className="text-xs font-medium text-primary">Destacada</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Botón Ver Más Noticias */}
          <div className="text-center mt-12">
            <Button
              size="lg"
              variant="outline"
              className="border-accent text-black hover:bg-accent hover:text-accent-foreground bg-transparent font-sans font-medium"
              asChild
            >
              <a href={getPagePath('/noticias')}>
                Ver Todas las Noticias
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
