import type React from "react"

// Dark band at the top of every inner page; the fixed header sits on top of it.
export function PageHero({ eyebrow, title, children }: { eyebrow: string; title: string; children?: React.ReactNode }) {
  return (
    <section className="on-ink bg-ink text-primary-foreground pt-36 pb-16 md:pt-44 md:pb-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <p className="eyebrow mb-5">{eyebrow}</p>
        <h1 className="font-serif text-4xl md:text-6xl font-semibold leading-[1.05] max-w-4xl text-balance">{title}</h1>
        {children && <div className="mt-6 max-w-2xl text-lg text-primary-foreground/75 leading-relaxed">{children}</div>}
        <div className="mt-12 h-px w-24 bg-gold" />
      </div>
    </section>
  )
}

// Section heading used on the home page and inner pages.
export function SectionHeading({ eyebrow, title, children }: { eyebrow: string; title: string; children?: React.ReactNode }) {
  return (
    <header className="mb-12 md:mb-16 max-w-3xl" data-reveal>
      <p className="eyebrow mb-4">{eyebrow}</p>
      <h2 className="font-serif text-3xl md:text-5xl font-semibold leading-tight text-foreground">{title}</h2>
      {children && <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{children}</p>}
    </header>
  )
}
