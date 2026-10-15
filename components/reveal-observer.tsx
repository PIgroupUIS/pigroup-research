"use client"

import { useEffect } from "react"

// One observer for the whole site: any element with data-reveal fades in when it enters the viewport.
export function RevealObserver() {
  useEffect(() => {
    document.documentElement.classList.add("js")
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible")
            io.unobserve(e.target)
          }
        }),
      { rootMargin: "0px 0px -8% 0px" },
    )
    const scan = () => document.querySelectorAll("[data-reveal]:not(.is-visible)").forEach((el) => io.observe(el))
    scan()
    // Catch elements added later (filters, client navigation)
    const mo = new MutationObserver(scan)
    mo.observe(document.body, { childList: true, subtree: true })
    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [])
  return null
}
