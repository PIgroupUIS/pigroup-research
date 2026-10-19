"use client"

import { PageHero } from "@/components/page-hero"
import { getImagePath } from "@/lib/utils"
import { team, type TeamMember } from "@/lib/data"
import { GraduationCap, Mail } from "lucide-react"
import { useLanguage } from "@/components/language-context"

function Portrait({ m, priority = false }: { m: TeamMember; priority?: boolean }) {
  const name = `${m.nombre} ${m.apellido}`
  const content = !m.imagen || m.imagen.includes("placeholder") ? (
    <div className="aspect-[4/5] rounded bg-ink flex items-center justify-center">
      <span className="font-serif text-6xl text-gold">
        {m.nombre[0]}
        {m.apellido[0]}
      </span>
    </div>
  ) : (
    <div className="aspect-[4/5] overflow-hidden rounded bg-muted">
      <img
        src={getImagePath(m.imagen)}
        alt={name}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
      />
    </div>
  )

  if (m.paginaPersonal) {
    return (
      <a
        href={m.paginaPersonal}
        target="_blank"
        rel="noopener noreferrer"
        title={name}
        aria-label={name}
        className="block cursor-pointer focus:outline-none focus:ring-2 focus:ring-gold rounded"
      >
        {content}
      </a>
    )
  }

  return content
}

function Links({ m }: { m: TeamMember }) {
  const { t } = useLanguage()
  const links = [
    m.scholar && { href: m.scholar, label: t.team.googleScholar, icon: GraduationCap },
    m.email && { href: `mailto:${m.email}`, label: `${t.team.email} (${m.email})`, icon: Mail },
  ].filter(Boolean) as { href: string; label: string; icon: React.ComponentType<{ className?: string }> }[]

  if (!links.length) return null

  return (
    <div className="flex items-center gap-2">
      {links.map((l) => {
        const IconComponent = l.icon
        return (
          <a
            key={l.href}
            href={l.href}
            title={l.label}
            aria-label={l.label}
            {...(l.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="p-2 rounded border border-border text-foreground hover:border-gold hover:text-gold-deep transition-colors bg-background"
          >
            <IconComponent className="h-4 w-4" />
          </a>
        )
      })}
    </div>
  )
}

export default function EquipoPage() {
  const [lead, ...members] = team
  const { language, t } = useLanguage()
  const isEn = language === "en"

  return (
    <main>
      <PageHero eyebrow={t.team.eyebrow} title={t.team.title}>
        {t.team.subtitle}
      </PageHero>

      {lead && (
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4 max-w-6xl grid md:grid-cols-[22rem_1fr] gap-10 md:gap-16 items-end group" data-reveal>
            <Portrait m={lead} priority />
            <div className="pb-2">
              <p className="eyebrow">{isEn && lead.cargo_en ? lead.cargo_en : lead.cargo}</p>
              <h2 className="mt-3 font-serif text-4xl md:text-6xl font-semibold leading-none">
                {lead.nombre} {lead.apellido}
              </h2>
              {lead.bio && <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-xl">{isEn && lead.bio_en ? lead.bio_en : lead.bio}</p>}
              <p className="mt-6 text-muted-foreground">
                {(isEn && lead.areasInvestigacion_en ? lead.areasInvestigacion_en : lead.areasInvestigacion).join(" · ")}
              </p>
              <div className="mt-6 h-px w-24 bg-gold" />
              <div className="mt-6">
                <Links m={lead} />
              </div>
            </div>
          </div>
        </section>
      )}

      {members.length > 0 && (
        <section className="pb-24 md:pb-32">
          <div className="container mx-auto px-4 max-w-6xl">
            <p className="eyebrow mb-10 pt-10 border-t border-border">{t.team.researchers}</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-14">
              {members.map((m, i) => {
                const cargo = isEn && m.cargo_en ? m.cargo_en : m.cargo
                const areas = (isEn && m.areasInvestigacion_en ? m.areasInvestigacion_en : m.areasInvestigacion).slice(0, 3).join(" · ")
                return (
                  <article key={m.id} className="group" data-reveal style={{ ["--reveal-delay" as string]: `${(i % 4) * 100}ms` }}>
                    <Portrait m={m} />
                    <h3 className="mt-5 font-serif text-2xl font-semibold leading-tight">
                      {m.nombre} {m.apellido}
                    </h3>
                    <div className="mt-2 h-px w-8 bg-gold transition-all duration-500 group-hover:w-16" />
                    <p className="mt-3 text-sm font-medium text-foreground">{cargo}</p>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{areas}</p>
                    <div className="mt-4">
                      <Links m={m} />
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}