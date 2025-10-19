"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, MapPin, Phone, Instagram, Linkedin, Github } from "lucide-react"

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
            <Card className="md:col-span-2 lg:col-span-1">
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
                    <a href="mailto:pigroup@uis.edu.co" className="text-sm font-sans text-black hover:underline">
                      pigroup@uis.edu.co
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

            <Card className="border-2 border-accent/20 md:col-span-2 lg:col-span-2">
              <CardHeader>
                <CardTitle className="font-sans">Síguenos en Redes Sociales</CardTitle>
                <CardDescription className="font-sans">
                  Mantente al día con nuestras últimas investigaciones y noticias
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <Button
                    asChild
                    variant="outline"
                    className="flex flex-col h-auto py-6 gap-2 hover:bg-accent/10 hover:border-accent bg-transparent"
                  >
                    <a href="https://instagram.com/pigroup" target="_blank" rel="noopener noreferrer">
                      <Instagram className="h-6 w-6 text-black" />
                      <span className="text-xs font-sans">Instagram</span>
                    </a>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    className="flex flex-col h-auto py-6 gap-2 hover:bg-accent/10 hover:border-accent bg-transparent"
                  >
                    <a href="https://linkedin.com/company/pigroup" target="_blank" rel="noopener noreferrer">
                      <Linkedin className="h-6 w-6 text-black" />
                      <span className="text-xs font-sans">LinkedIn</span>
                    </a>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    className="flex flex-col h-auto py-6 gap-2 hover:bg-accent/10 hover:border-accent bg-transparent"
                  >
                    <a href="https://github.com/pigroup" target="_blank" rel="noopener noreferrer">
                      <Github className="h-6 w-6 text-black" />
                      <span className="text-xs font-sans">GitHub</span>
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Email Card */}
            <Card className="border-2 border-accent/20 hover:border-accent/40 transition-colors md:col-span-2 lg:col-span-1">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-accent/10 p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-black" />
                  </div>
                  <CardTitle className="font-sans">Envíanos un Email</CardTitle>
                </div>
                <CardDescription className="font-sans">
                  La forma más directa de contactarnos para consultas académicas y colaboraciones
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full font-sans bg-accent text-accent-foreground hover:bg-accent/90">
                  <a href="mailto:pigroup@uis.edu.co">Escribir Email</a>
                </Button>
              </CardContent>
            </Card>

            <Card className="md:col-span-2 lg:col-span-1">
              <CardHeader>
                <CardTitle className="font-sans">Horario de Atención</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm font-sans">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Lunes - Viernes:</span>
                    <span className="font-medium">8:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sábado - Domingo:</span>
                    <span className="font-medium">Cerrado</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-accent/20 md:col-span-2 lg:col-span-1">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-accent/10 p-3 rounded-lg">
                    <MapPin className="h-6 w-6 text-black" />
                  </div>
                  <CardTitle className="font-sans">Visítanos</CardTitle>
                </div>
                <CardDescription className="font-sans text-foreground">
                  Estamos en la Universidad Industrial de Santander, Bucaramanga
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  asChild
                  variant="outline"
                  className="w-full font-sans border-accent text-black hover:bg-accent hover:text-accent-foreground bg-transparent"
                >
                  <a
                    href="https://maps.google.com/?q=Universidad+Industrial+de+Santander"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ver en Google Maps
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
