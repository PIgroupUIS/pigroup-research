import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { getImagePath } from "@/lib/utils"
// @ts-ignore
import "katex/dist/katex.min.css"
import { HeroFormulasBg } from "./hero-formulas-bg"

export function Hero() {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-primary">

      <HeroFormulasBg />

      <div className="container mx-auto px-4 py-32 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8 flex justify-center">
            <Image
              src={getImagePath("/logo.png") || "/placeholder.svg"}
              alt="PIGroup Logo"
              width={300}
              height={300}
              className="w-60 h-60 md:w-72 md:h-72 object-contain"
            />
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-sans font-bold text-primary-foreground mb-6 text-balance">
            PIGroup Research
          </h1>

          <p className="text-lg md:text-xl font-sans text-primary-foreground/90 mb-8 max-w-2xl mx-auto text-pretty leading-relaxed">
            Grupo de investigación de la Universidad Industrial de Santander dedicado a la innovación y excelencia en
            investigación científica
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 font-sans font-medium"
              asChild
            >
              <a href="#publicaciones">
                Ver Publicaciones
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary font-sans font-medium"
              asChild
            >
              <a href="#contacto">Contáctanos</a>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary-foreground rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-primary-foreground rounded-full" />
        </div>
      </div>
    </section>
  )
}
