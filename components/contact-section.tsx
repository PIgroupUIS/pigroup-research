"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, MapPin, Phone, Instagram, Linkedin, Github } from "lucide-react"
import { getImagePath, getPagePath } from "@/lib/utils"

export function ContactSection() {
  return (
    <section id="contacto" className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-sans font-bold text-foreground mb-4">Contacto</h2>
            <p className="text-lg font-sans text-muted-foreground max-w-2xl mx-auto">
              ¿Interesado en colaborar o conocer más sobre nuestro trabajo? Contáctanos
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Contact Information */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="font-sans">Información de Contacto</CardTitle>
                <CardDescription className="font-sans">
                  Estamos ubicados en la Universidad Industrial de Santander
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-accent/10 p-3 rounded-lg">
                    <MapPin className="h-5 w-5 text-black" />
                  </div>
                  <div>
                    <h3 className="font-sans font-semibold mb-1">Dirección</h3>
                    <p className="text-sm font-sans text-muted-foreground leading-relaxed">
                      Universidad Industrial de Santander
                      <br />
                      Carrera 27 Calle 9<br />
                      Bucaramanga, Santander, Colombia
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-accent/10 p-3 rounded-lg">
                    <Mail className="h-5 w-5 text-black" />
                  </div>
                  <div>
                    <h3 className="font-sans font-semibold mb-1">Email</h3>
                    <a href="mailto:pigroup.uis@gmail.com" className="text-sm font-sans text-black hover:underline">
                      pigroup.uis@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-accent/10 p-3 rounded-lg">
                    <Phone className="h-5 w-5 text-black" />
                  </div>
                  <div>
                    <h3 className="font-sans font-semibold mb-1">Teléfono</h3>
                    <a href="tel:+5776344000" className="text-sm font-sans text-black hover:underline">
                      +57 (7) 634 4000 Ext. 2525
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Media & Quick Actions */}
            <Card className="border-2 border-accent/20 lg:col-span-1">
              <CardHeader>
                <CardTitle className="font-sans">Síguenos en Redes Sociales</CardTitle>
                <CardDescription className="font-sans">
                  Mantente al día con nuestras últimas investigaciones
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  <Button
                    asChild
                    variant="outline"
                    className="flex flex-col h-auto py-4 gap-2 hover:bg-accent/10 hover:border-accent bg-transparent"
                  >
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <Instagram className="h-5 w-5 text-black" />
                      <span className="text-xs font-sans">Instagram</span>
                    </a>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    className="flex flex-col h-auto py-4 gap-2 hover:bg-accent/10 hover:border-accent bg-transparent"
                  >
                    <a href="https://www.linkedin.com/in/pi-research-group-49383938b/" target="_blank" rel="noopener noreferrer">
                      <Linkedin className="h-5 w-5 text-black" />
                      <span className="text-xs font-sans">LinkedIn</span>
                    </a>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    className="flex flex-col h-auto py-4 gap-2 hover:bg-accent/10 hover:border-accent bg-transparent"
                  >
                    <a href="https://github.com/PIgroupUIS" target="_blank" rel="noopener noreferrer">
                      <Github className="h-5 w-5 text-black" />
                      <span className="text-xs font-sans">GitHub</span>
                    </a>
                  </Button>
                </div>

                {/* Horario agregado aquí para optimizar espacio */}
                <div className="border-t pt-4">
                  <h3 className="font-sans font-semibold mb-3 text-sm">Horario de Atención</h3>
                  <div className="space-y-2 text-xs font-sans">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Lun - Vie:</span>
                      <span className="font-medium">8:00 AM - 5:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sáb - Dom:</span>
                      <span className="font-medium">Cerrado</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions Card - Email & Visit */}
            <Card className="border-2 border-accent/20 hover:border-accent/40 transition-colors lg:col-span-1">
              <CardHeader>
                <CardTitle className="font-sans">Conecta con Nosotros</CardTitle>
                <CardDescription className="font-sans">
                  Formas directas de contactarnos y visitarnos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Email Button */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Mail className="h-4 w-4 text-accent" />
                    <span className="text-sm font-medium">Envía un Email</span>
                  </div>
                  <Button 
                    asChild 
                    variant="outline"
                    className="w-full font-sans font-medium border-accent text-black hover:bg-accent hover:text-accent-foreground bg-transparent"
                  >
                    <a href="mailto:pigroup.uis@gmail.com">Escribir Email</a>
                  </Button>
                </div>

                {/* Visit Button */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="h-4 w-4 text-accent" />
                    <span className="text-sm font-medium">Ubícanos</span>
                  </div>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full font-sans font-medium border-accent text-black hover:bg-accent hover:text-accent-foreground bg-transparent"
                  >
                    <a
                      href="https://maps.google.com/?q=Universidad+Industrial+de+Santander"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Ver en Google Maps
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Additional Info Card - Mobile responsive */}
            <Card className="md:col-span-2 lg:col-span-3 bg-accent/5 border-accent/30">
              <CardContent className="p-6">
                <div className="text-center max-w-4xl mx-auto">
                  <h3 className="font-sans font-semibold text-lg mb-2">¿Tienes un proyecto en mente?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Estamos interesados en colaboraciones académicas, proyectos de investigación y oportunidades de intercambio científico.
                    No dudes en contactarnos para explorar posibles sinergias.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button 
                      asChild 
                      className="bg-primary text-primary-foreground hover:bg-primary/90 font-sans font-medium"
                    >
                      <a href="mailto:pigroup.uis@gmail.com?subject=Propuesta%20de%20Colaboración">
                        Proponer Colaboración
                      </a>
                    </Button>
                    <Button 
                      asChild 
                      variant="outline"
                      className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-sans font-medium bg-background"
                    >
                      <a href={getPagePath("/publicaciones")}>
                        Ver Nuestro Trabajo
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
