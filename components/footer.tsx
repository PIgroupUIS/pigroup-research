"use client"

import Link from "next/link"
import { Instagram, Linkedin, Github } from "lucide-react"
import { getImagePath } from "@/lib/utils"
import { useLanguage } from "./language-context"

export function Footer() {
  const currentYear = new Date().getFullYear()
  const { t } = useLanguage()

  return (
    <footer className="on-ink bg-ink text-primary-foreground py-14 border-t border-white/10">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid md:grid-cols-[1.5fr_1fr_1fr] gap-10 mb-12">
          {/* Logo and Description */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-3">
              <img
                src={getImagePath("/logo.png")}
                alt="PIGroup Logo"
                width={32}
                height={40}
                className="h-8 w-auto"
              />
              <span className="font-serif text-lg font-semibold tracking-tight">PiGroup Research</span>
            </Link>
            <p className="text-sm text-primary-foreground/70 leading-relaxed max-w-sm">
              {t.footer.description}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <p className="eyebrow mb-4">{t.footer.navigation}</p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-primary-foreground/75 hover:text-gold transition-colors">
                  {t.nav.home}
                </Link>
              </li>
              <li>
                <Link href="/noticias" className="text-primary-foreground/75 hover:text-gold transition-colors">
                  {t.nav.news}
                </Link>
              </li>
              <li>
                <Link href="/publicaciones" className="text-primary-foreground/75 hover:text-gold transition-colors">
                  {t.nav.publications}
                </Link>
              </li>
              <li>
                <Link href="/equipo" className="text-primary-foreground/75 hover:text-gold transition-colors">
                  {t.nav.team}
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <p className="eyebrow mb-4">{t.footer.connect}</p>
            <div className="flex gap-3">
              <a
                href="https://github.com/PIgroupUIS"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded border border-white/10 hover:border-gold hover:text-gold transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/pi-research-group-49383938b/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded border border-white/10 hover:border-gold hover:text-gold transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded border border-white/10 hover:border-gold hover:text-gold transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-primary-foreground/60">
          <p>© {currentYear} PiGroup Research · Universidad Industrial de Santander. Todos los derechos reservados.</p>
          <p className="font-mono">Bucaramanga, Colombia</p>
        </div>
      </div>
    </footer>
  )
}
