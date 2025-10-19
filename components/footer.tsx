import Image from "next/image"
import Link from "next/link"
import { Instagram, Linkedin, Github } from "lucide-react"
import { getImagePath } from "@/lib/utils"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Logo and Description */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Image
                  src={getImagePath("/logo.png") || "/placeholder.svg"}
                  alt="PIGroup Logo"
                  width={40}
                  height={40}
                  className="w-10 h-10"
                />
                <span className="text-lg font-serif font-bold">PIGroup Research</span>
              </div>
              <p className="text-sm text-primary-foreground/80 leading-relaxed">
                Grupo de investigación de la Universidad Industrial de Santander dedicado a la excelencia científica.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-serif font-semibold mb-4">Enlaces Rápidos</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#inicio"
                    className="text-sm text-primary-foreground/80 hover:text-accent transition-colors"
                  >
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link
                    href="#noticias"
                    className="text-sm text-primary-foreground/80 hover:text-accent transition-colors"
                  >
                    Noticias
                  </Link>
                </li>
                <li>
                  <Link
                    href="#publicaciones"
                    className="text-sm text-primary-foreground/80 hover:text-accent transition-colors"
                  >
                    Publicaciones
                  </Link>
                </li>
                <li>
                  <Link
                    href="#contacto"
                    className="text-sm text-primary-foreground/80 hover:text-accent transition-colors"
                  >
                    Contacto
                  </Link>
                </li>
              </ul>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="font-serif font-semibold mb-4">Síguenos</h3>
              <div className="flex gap-4">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary-foreground/10 p-3 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary-foreground/10 p-3 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary-foreground/10 p-3 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-primary-foreground/20 pt-8 text-center">
            <p className="text-sm text-primary-foreground/70">
              © {currentYear} PIGroup Research - Universidad Industrial de Santander. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
