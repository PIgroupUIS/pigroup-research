"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { ArrowLeft, Mail, ExternalLink, GraduationCap, MapPin, User } from "lucide-react"
import { getImagePath } from "@/lib/utils"

interface TeamMember {
  id: number
  nombre: string
  apellido: string
  cargo: string
  nivelEscolar: string
  especialidad?: string
  institucion: string
  imagen: string
  scholar: string | null
  paginaPersonal: string | null
  email: string
  orcid?: string | null
  bio?: string
  areasInvestigacion: string[]
  activo: boolean
}

export default function EquipoPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadTeam = async () => {
      try {
        const response = await fetch(getImagePath('/equipo.json'))
        const data = await response.json()
        // Filtrar solo miembros activos y ordenar por nivel académico
        const activeMembers = data.team
          .filter((member: TeamMember) => member.activo)
          .sort((a: TeamMember, b: TeamMember) => {
            const levels = {
              'Doctorado': 4,
              'Maestría': 3,
              'Pregrado': 2,
              'Bachiller': 1
            }
            const levelA = levels[a.nivelEscolar as keyof typeof levels] || 0
            const levelB = levels[b.nivelEscolar as keyof typeof levels] || 0
            return levelB - levelA
          })
        setTeamMembers(activeMembers)
      } catch (error) {
        console.error('Error loading team:', error)
      } finally {
        setLoading(false)
      }
    }

    loadTeam()
  }, [])

  const getNivelEscolarIcon = (nivel: string) => {
    switch (nivel.toLowerCase()) {
      case 'doctorado':
        return '🎓'
      case 'maestría':
        return '📚'
      case 'pregrado':
        return '📖'
      case 'bachiller':
        return '🎒'
      default:
        return '📄'
    }
  }

  const getNivelEscolarColor = (nivel: string) => {
    switch (nivel.toLowerCase()) {
      case 'doctorado':
        return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'maestría':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'pregrado':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'bachiller':
        return 'bg-orange-100 text-orange-800 border-orange-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-32">
          <div className="animate-pulse">
            <div className="h-12 bg-muted rounded mb-4"></div>
            <div className="h-6 bg-muted rounded max-w-2xl mx-auto mb-16"></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1,2,3,4,5,6].map(i => (
                <div key={i} className="bg-muted rounded-lg h-96"></div>
              ))}
            </div>
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
              Nuestro Equipo
            </h1>
            <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
              Conoce a los investigadores y estudiantes que conforman el grupo PIGroup de la Universidad Industrial de Santander
            </p>
          </div>
        </div>
      </div>

      {/* Team Stats */}
      <div className="bg-secondary py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="bg-background rounded-lg p-4">
                <div className="text-2xl font-bold text-primary">{teamMembers.length}</div>
                <div className="text-sm text-muted-foreground">Miembros Activos</div>
              </div>
              <div className="bg-background rounded-lg p-4">
                <div className="text-2xl font-bold text-primary">
                  {teamMembers.filter(m => m.nivelEscolar === 'Doctorado').length}
                </div>
                <div className="text-sm text-muted-foreground">Doctores</div>
              </div>
              <div className="bg-background rounded-lg p-4">
                <div className="text-2xl font-bold text-primary">
                  {teamMembers.filter(m => m.nivelEscolar === 'Maestría').length}
                </div>
                <div className="text-sm text-muted-foreground">Magísteres</div>
              </div>
              <div className="bg-background rounded-lg p-4">
                <div className="text-2xl font-bold text-primary">
                  {teamMembers.filter(m => m.nivelEscolar === 'Pregrado').length}
                </div>
                <div className="text-sm text-muted-foreground">Estudiantes</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Members */}
      <div className="py-12 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {teamMembers.map((member: TeamMember) => (
                <Card key={member.id} className="overflow-hidden border border-border/60 hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
                  <div>
                    {/* Header con Avatar compacto y Badge */}
                    <div className="pt-6 pb-2 px-6 flex flex-col items-center text-center">
                      <div className="relative mb-4">
                        <div className="w-28 h-28 rounded-full overflow-hidden ring-4 ring-background shadow-md bg-muted">
                          <img
                            src={getImagePath(member.imagen)}
                            alt={`${member.nombre} ${member.apellido}`}
                            loading="lazy"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = getImagePath('/placeholder-user.jpg');
                            }}
                          />
                        </div>
                      </div>

                      <Badge className={`${getNivelEscolarColor(member.nivelEscolar)} border text-xs mb-2 font-medium`}>
                        <span className="mr-1">{getNivelEscolarIcon(member.nivelEscolar)}</span>
                        {member.nivelEscolar}
                      </Badge>

                      <CardTitle className="text-lg font-serif mb-1">
                        {member.nombre} {member.apellido}
                      </CardTitle>
                      <p className="text-muted-foreground font-medium text-xs tracking-tight">{member.cargo}</p>
                    </div>

                    <CardContent className="px-6 pt-2 pb-4 space-y-3">
                      {/* Áreas de investigación */}
                      <div>
                        <h4 className="text-[11px] font-semibold text-muted-foreground mb-1.5 uppercase tracking-wider">
                          Áreas de Investigación
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {member.areasInvestigacion.slice(0, 3).map((area, index) => (
                            <Badge key={index} variant="secondary" className="text-[11px] font-normal py-0.5">
                              {area}
                            </Badge>
                          ))}
                          {member.areasInvestigacion.length > 3 && (
                            <Badge variant="secondary" className="text-[11px] font-normal py-0.5">
                              +{member.areasInvestigacion.length - 3}
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Información adicional */}
                      <div className="space-y-1.5 text-xs text-muted-foreground pt-1">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-3.5 w-3.5 flex-shrink-0 text-muted-foreground/70" />
                          <span className="truncate">{member.institucion}</span>
                        </div>
                        {member.email && (
                          <div className="flex items-center gap-2">
                            <Mail className="h-3.5 w-3.5 flex-shrink-0 text-muted-foreground/70" />
                            <a 
                              href={`mailto:${member.email}`}
                              className="truncate hover:text-primary transition-colors"
                            >
                              {member.email}
                            </a>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </div>

                  <div className="px-6 pb-5 pt-0">
                    {/* Enlaces */}
                    <div className="flex gap-2 pt-2 border-t border-border/40">
                      {member.scholar && (
                        <Button
                          asChild
                          variant="outline"
                          size="sm"
                          className="flex-1 text-xs border-accent text-black hover:bg-accent hover:text-accent-foreground bg-transparent"
                        >
                          <a 
                            href={member.scholar} 
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            <GraduationCap className="h-3 w-3 mr-1" />
                            Scholar
                          </a>
                        </Button>
                      )}
                      {member.paginaPersonal && (
                        <Button
                          asChild
                          variant="outline"
                          size="sm"
                          className="flex-1 text-xs border-accent text-black hover:bg-accent hover:text-accent-foreground bg-transparent"
                        >
                          <a 
                            href={member.paginaPersonal} 
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="h-3 w-3 mr-1" />
                            Web
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {teamMembers.length === 0 && (
              <div className="text-center py-16">
                <div className="text-muted-foreground text-lg">
                  No se encontraron miembros del equipo
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}