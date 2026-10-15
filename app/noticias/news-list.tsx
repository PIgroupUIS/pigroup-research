"use client"

import { useState } from "react"
import { NewsCard } from "@/components/news-card"
import type { NewsItem } from "@/lib/data"

export function NewsList({ items }: { items: NewsItem[] }) {
  const [category, setCategory] = useState("all")
  const categories = [...new Set(items.map((n) => n.category))].sort()
  const shown = category === "all" ? items : items.filter((n) => n.category === category)

  return (
    <>
      {categories.length > 1 && (
        <div className="flex flex-wrap gap-x-6 gap-y-2 mb-14 border-b border-border" role="tablist">
          {["all", ...categories].map((c) => (
            <button
              key={c}
              role="tab"
              aria-selected={category === c}
              onClick={() => setCategory(c)}
              className={`-mb-px pb-3 text-sm font-medium border-b-2 transition-colors ${
                category === c ? "border-gold text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {c === "all" ? "Todas" : c}
            </button>
          ))}
        </div>
      )}
      <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
        {shown.map((item, i) => (
          <NewsCard key={item.id} item={item} delay={(i % 2) * 120} />
        ))}
      </div>
    </>
  )
}
