"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getPagePath } from "@/lib/utils"
import { ArrowRight, Zap, Eye, Brain } from "lucide-react"

const researchAreas = [
  {
    id: "time-reverse-imaging",
    title: "Time-Reverse Imaging",
    description: "Reconstrucción de escenas pasadas utilizando trazas térmicas y modelos de lenguaje visual para resolver problemas inversos temporales",
    icon: Eye,
    href: "/ramas/time-reverse-imaging",
    highlights: ["Visión Computacional", "Machine Learning", "Problemas Inversos"]
  },
  // Futuras ramas de investigación se pueden agregar aquí
]

export function ResearchAreasSection() {
  return (
    <section id="research-areas" className="py-24 bg-white relative overflow-hidden">
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-black mb-6">
            Ramas de <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Investigación</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Exploramos las fronteras de la ciencia computacional a través de diferentes líneas de investigación que combinan teoría y práctica
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {researchAreas.map((area, index) => {
            const IconComponent = area.icon
            return (
              <a 
                key={area.id} 
                href={getPagePath(area.href)}
                className="block group cursor-pointer"
              >
                <Card className="h-full bg-white border-2 border-gray-100 overflow-hidden transition-all duration-300 ease-out group-hover:border-yellow-400 group-hover:shadow-xl group-hover:shadow-yellow-400/10 group-hover:-translate-y-1">
                  
                  {/* Clean header with minimal icon */}
                  <div className="relative p-6 pb-4 border-b border-gray-50 group-hover:border-yellow-100 transition-colors duration-300">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 bg-gray-50 group-hover:bg-gradient-to-br group-hover:from-yellow-400 group-hover:to-yellow-500 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:shadow-lg">
                        <IconComponent className="h-5 w-5 text-gray-600 group-hover:text-black transition-colors duration-300" />
                      </div>
                      <div className="text-xs font-medium text-gray-400 group-hover:text-yellow-600 transition-colors duration-300">
                        #{String(index + 1).padStart(2, '0')}
                      </div>
                    </div>
                  </div>

                  <CardHeader className="pt-4 pb-3 px-6">
                    <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-black transition-all duration-300 leading-tight">
                      {area.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="px-6 pb-6">
                    <CardDescription className="text-gray-600 leading-relaxed mb-4 group-hover:text-gray-700 transition-colors duration-300">
                      {area.description}
                    </CardDescription>

                    {/* Minimal highlights */}
                    <div className="flex flex-wrap gap-1 mb-6">
                      {area.highlights.map((highlight, idx) => (
                        <span 
                          key={idx}
                          className="text-xs px-2 py-1 bg-gray-50 text-gray-600 rounded-md group-hover:bg-yellow-50 group-hover:text-yellow-700 transition-all duration-300 border border-transparent group-hover:border-yellow-200"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>

                    {/* Minimal call to action */}
                    <div className="flex items-center text-sm font-medium text-gray-500 group-hover:text-yellow-600 transition-colors duration-300">
                      <span>Explorar investigación</span>
                      <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 group-hover:text-yellow-500 transition-all duration-300" />
                    </div>
                  </CardContent>
                </Card>
              </a>
            )
          })}
        </div>

        {/* Minimal bottom decoration */}
        <div className="text-center mt-16">
          <p className="text-gray-400 text-sm">
            Más líneas de investigación próximamente
          </p>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-yellow-400 to-transparent mx-auto mt-4"></div>
        </div>
      </div>
    </section>
  )
}