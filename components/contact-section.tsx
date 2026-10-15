"use client"

import { SectionHeading } from "@/components/page-hero"
import { Mail, MapPin, Phone, Instagram, Linkedin, Github } from "lucide-react"
import { useLanguage } from "./language-context"

export function ContactSection() {
  const { t } = useLanguage()
  const mapAddress = "Ak 27 #calle 9, Bucaramanga, Santander, Colombia"
  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(mapAddress)}&t=&z=16&ie=UTF8&iwloc=&output=embed`

  return (
    <section id="contacto" className="py-24 md:py-32 bg-secondary">
      <div className="container mx-auto px-4 max-w-6xl">
        <SectionHeading eyebrow={t.contact.eyebrow} title={t.contact.title}>
          {t.contact.description}
        </SectionHeading>

        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-8 items-stretch" data-reveal>
          {/* Info Card */}
          <div className="bg-background border border-border rounded p-8 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded bg-secondary text-gold-deep border border-border">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm uppercase tracking-wide">{t.contact.location}</h3>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                    Universidad Industrial de Santander<br />
                    Ak 27 #calle 9<br />
                    Bucaramanga, Santander, Colombia
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded bg-secondary text-gold-deep border border-border">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm uppercase tracking-wide">Email</h3>
                  <a
                    href="mailto:pigroup.uis@gmail.com"
                    className="mt-1 block text-sm text-muted-foreground hover:text-gold-deep transition-colors"
                  >
                    pigroup.uis@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded bg-secondary text-gold-deep border border-border">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm uppercase tracking-wide">{t.contact.phone}</h3>
                  <a
                    href="tel:+5776344000"
                    className="mt-1 block text-sm text-muted-foreground hover:text-gold-deep transition-colors"
                  >
                    +57 (7) 634 4000 Ext. 2525
                  </a>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-6 border-t border-border">
              <p className="eyebrow mb-3">{t.contact.social}</p>
              <div className="flex gap-3">
                <a
                  href="https://github.com/PIgroupUIS"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded border border-border hover:border-gold hover:text-gold-deep transition-colors text-foreground"
                  aria-label="GitHub"
                >
                  <Github className="h-4 w-4" />
                </a>
                <a
                  href="https://www.linkedin.com/in/pi-research-group-49383938b/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded border border-border hover:border-gold hover:text-gold-deep transition-colors text-foreground"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded border border-border hover:border-gold hover:text-gold-deep transition-colors text-foreground"
                  aria-label="Instagram"
                >
                  <Instagram className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Interactive Google Map Embed */}
          <div className="rounded overflow-hidden border border-border bg-muted min-h-[360px] relative shadow-sm">
            <iframe
              title="Ubicación PIGroup UIS"
              width="100%"
              height="100%"
              style={{ minHeight: "360px", border: 0 }}
              loading="lazy"
              allowFullScreen={false}
              referrerPolicy="no-referrer-when-downgrade"
              src={mapEmbedUrl}
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
