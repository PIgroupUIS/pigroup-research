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
        
        <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto">
          {researchAreas.map((area, index) => {
            const IconComponent = area.icon
            return (
              <a 
                key={area.id} 
                href={getPagePath(area.href)}
                className="block group cursor-pointer"
              >
                <Card className="relative overflow-hidden bg-gradient-to-r from-white via-yellow-50/50 to-white border border-yellow-200/30 shadow-md transition-all duration-500 ease-out group-hover:shadow-xl group-hover:shadow-yellow-400/20 group-hover:border-yellow-400/50 group-hover:-translate-y-1">
                  
                  {/* Fondo decorativo */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-100/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Línea decorativa superior */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"></div>

                  <div className="relative z-10 p-6">
                    <div className="flex items-center space-x-6">
                      
                      {/* Ícono compacto */}
                      <div className="relative flex-shrink-0">
                        <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-yellow-400/50">
                          <IconComponent className="h-7 w-7 text-white" />
                        </div>
                        {/* Efecto de resplandor */}
                        <div className="absolute inset-0 w-14 h-14 bg-yellow-400 rounded-xl opacity-0 group-hover:opacity-20 group-hover:scale-125 transition-all duration-500 blur-md"></div>
                      </div>

                      {/* Contenido principal horizontal */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            {/* Título y número */}
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-xl font-bold text-gray-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-yellow-600 group-hover:to-orange-600 transition-all duration-300">
                                {area.title}
                              </h3>
                              <span className="text-xs font-semibold px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full group-hover:bg-gradient-to-r group-hover:from-yellow-200 group-hover:to-orange-200 group-hover:text-orange-700 transition-all duration-300">
                                #{String(index + 1).padStart(2, '0')}
                              </span>
                            </div>
                            
                            {/* Descripción */}
                            <p className="text-gray-600 text-sm leading-relaxed mb-3 group-hover:text-gray-700 transition-colors duration-300 line-clamp-2">
                              {area.description}
                            </p>

                            {/* Tags horizontales */}
                            <div className="flex flex-wrap gap-2">
                              {area.highlights.map((highlight, idx) => (
                                <span 
                                  key={idx}
                                  className="text-xs px-3 py-1 bg-white border border-yellow-200 text-gray-600 rounded-full transition-all duration-300 group-hover:bg-yellow-50 group-hover:border-yellow-300 group-hover:text-yellow-700 group-hover:scale-105"
                                  style={{
                                    transitionDelay: `${idx * 50}ms`
                                  }}
                                >
                                  {highlight}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Call to action compacto */}
                          <div className="flex items-center space-x-2 ml-4 flex-shrink-0">
                            <span className="text-sm font-medium text-gray-500 group-hover:text-yellow-600 transition-colors duration-300 hidden sm:block">
                              Explorar
                            </span>
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 group-hover:bg-gradient-to-r group-hover:from-yellow-400 group-hover:to-orange-400 transition-all duration-300 group-hover:shadow-lg">
                              <ArrowRight className="h-4 w-4 text-gray-500 group-hover:text-white transform group-hover:translate-x-0.5 transition-all duration-300" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Efecto de brillo sutil */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
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