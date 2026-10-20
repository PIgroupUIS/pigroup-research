"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
// @ts-ignore
import "katex/dist/katex.min.css"
// @ts-ignore
import { BlockMath, InlineMath } from "react-katex"
import { PublicationEntry } from "@/components/publication-entry"
import { SectionHeading } from "@/components/page-hero"
import { publications } from "@/lib/data"
import { useLanguage } from "@/components/language-context"

const copy = {
  es: {
    backToHome: "← Volver al inicio",
    eyebrow: "Línea de Investigación · Óptica Computacional",
    title: "Modulo Imaging",
    subtitle:
      "Adquisición y reconstrucción de imágenes de alto rango dinámico (HDR) en una sola captura mediante sensores con reinicio cíclico, muestreo ilimitado y redes profundas desplegadas.",
    viewPubs: "Ver publicaciones ↓",
    demoEyebrow: "Pipeline de Adquisición y Reconstrucción",
    demoTitle: "De la saturación física a la codificación módulo",
    demoDesc:
      "Cuando la irradiancia de una escena supera la capacidad de pozo (λ) de un fotodetector convencional, los valores se recortan irreversiblemente a blanco. Un sensor módulo reinicia el conversor analógico-digital cada vez que alcanza el umbral, codificando el rango dinámico completo en pliegues espaciales que luego son desenvueltos algorítmicamente.",
    gainLabel: "Exposición relativa",
    thresholdNote: "Umbral de saturación del sensor λ = 1.0",
    pauseAnim: "Pausar ciclo",
    playAnim: "Animar exposición",
    scanlineTitle: "Perfil radiométrico 1D a lo largo de la línea de corte (y = y₀)",
    scanlineLegendRaw: "Irradiancia real x",
    scanlineLegendClip: "Recorte convencional",
    scanlineLegendMod: "Pliegue módulo y",
    stages: [
      {
        num: "I",
        name: "Irradiancia Real (HDR)",
        formula: "x \\in [0, \\alpha\\lambda]",
        caption:
          "Escena original con iluminación extrema (contraluz de túnel y faros frontales). La amplitud radiométrica supera hasta 3.8× el límite físico del sensor.",
      },
      {
        num: "II",
        name: "Sensor Convencional (Saturada)",
        formula: "y_{\\text{clip}} = \\min(x, \\lambda)",
        caption:
          "Todo píxel con x > λ colapsa al nivel máximo. Se destruyen los gradientes espaciales, los bordes estructurales y los objetos dentro del resplandor.",
      },
      {
        num: "III",
        name: "Sensor Módulo (Capturada)",
        formula: "y = \\mathcal{M}_{\\lambda}(x) + \\eta",
        caption:
          "El ADC aplica reinicios cíclicos de voltaje cada múltiplos de 2λ. Las franjas de plegado preservan intacta la información de alta frecuencia sin saturar.",
      },
      {
        num: "IV",
        name: "Imagen Restaurada (Unrolled)",
        formula: "\\hat{x} = \\mathcal{F}_{\\theta}(y) = y + 2\\lambda\\hat{k}",
        caption:
          "La red desplegada estima el mapa entero de saltos k y desenvuelve las discontinuidades artificiales, recuperando el rango dinámico completo en un disparo.",
      },
    ],
    theoryEyebrow: "Fundamento Matemático",
    theoryTitle: "Formulación del problema inverso",
    theoryIntro:
      "A diferencia de la captura HDR multi-exposición tradicional —que sufre artefactos de fantasma (ghosting) ante objetos en movimiento—, Modulo Imaging traslada el desafío del hardware óptico hacia la solución de un problema inverso no lineal y no convexo a partir de una única observación.",
    theoryBlocks: [
      {
        index: "01",
        title: "Modelo de adquisición directa y Muestreo Ilimitado",
        body: "Sea x ∈ ℝᴺ la irradiancia continua de la escena y λ > 0 el umbral de saturación del conversor analógico-digital (ADC). Mientras un sensor estándar ejecuta el operador de recorte C_λ(x) = min(max(x, 0), λ), un sensor módulo aplica el operador centrado M_λ(·) que pliega la señal dentro del intervalo [−λ, λ]:",
        math: "y = \\mathcal{M}_{\\lambda}(x) + \\eta = x - 2\\lambda k + \\eta, \\qquad k = \\left\\lfloor \\frac{x + \\lambda}{2\\lambda} \\right\\rfloor \\in \\mathbb{Z}^N",
        footer:
          "donde k ∈ ℤᴺ representa el campo latente de conteo de reinicios (folding map) y η modela el ruido electrónico e incertidumbre de cuantización.",
      },
      {
        index: "02",
        title: "Diferencias finitas de orden superior y desenvolvimiento en DCT",
        body: "Bajo el teorema de Muestreo Ilimitado (Unlimited Sampling), si las diferencias finitas espaciales de orden m de la señal subyacente están acotadas por ‖Δᵐx‖_∞ < λ, el operador módulo conmuta con el operador de diferencia:",
        math: "\\mathcal{M}_{\\lambda}\\left(\\Delta^m y\\right) = \\Delta^m x \\implies \\Delta^m k = \\frac{1}{2\\lambda}\\left(\\Delta^m x - \\mathcal{M}_{\\lambda}(\\Delta^m y)\\right)",
        footer:
          "En presencia de ruido y bordes abruptos naturales en imágenes 2D, formulamos un esquema autorregresivo de desenvolvimiento ℓ₂ resuelto eficientemente en el dominio de la Transformada de Coseno Discreta (DCT) mediante operadores de diferencias de alto orden.",
      },
      {
        index: "03",
        title: "Redes profundas desplegadas (Deep Unrolling) y Equivariancia de Escala",
        body: "En escenas reales, distinguir entre un borde natural de alto contraste y una discontinuidad artificial de módulo (±2λ) es un problema inverso severamente mal condicionado. Lo planteamos como una optimización variacional desplegada en K etapas iterativas con levantamiento de características (feature lifting) y regularización auto-supervisada por equivariancia de escala:",
        math: "\\hat{x} = \\arg\\min_{x \\in \\mathbb{R}^N} \\frac{1}{2}\\left\\|\\mathcal{M}_{\\lambda}(x) - y\\right\\|_2^2 + \\tau\\,\\mathcal{R}_{\\theta}(x), \\qquad \\mathcal{F}_{\\theta}\\!\\left(\\mathcal{M}_{\\lambda}(\\alpha x)\\right) = \\alpha\\,\\mathcal{F}_{\\theta}\\!\\left(\\mathcal{M}_{\\lambda}(x)\\right)",
        footer:
          "La restricción de equivariancia frente a factores de exposición α > 0 permite adaptar la red sin necesidad de pares (y, x) de referencia y preserva la integridad semántica para tareas posteriores como detección de objetos en conducción autónoma.",
      },
    ],
    pubsEyebrow: "Producción Científica",
    pubsTitle: "Publicaciones en Modulo Imaging",
    pubsSubtitle:
      "Artículos en revistas IEEE Transactions, conferencias y preprints desarrollados por el grupo en reconstrucción HDR y percepción visual con sensores módulo.",
  },
  en: {
    backToHome: "← Back to home",
    eyebrow: "Research Line · Computational Optics",
    title: "Modulo Imaging",
    subtitle:
      "Single-shot high dynamic range (HDR) acquisition and reconstruction via self-resetting modulo sensors, unlimited sampling, and deep unrolled optimization networks.",
    viewPubs: "View publications ↓",
    demoEyebrow: "Acquisition & Reconstruction Pipeline",
    demoTitle: "From physical saturation to modulo encoding",
    demoDesc:
      "When scene irradiance exceeds the full-well capacity (λ) of a conventional photodetector, pixel intensities clip irreversibly to white. A modulo sensor resets its analog-to-digital converter whenever the threshold is reached, encoding the full dynamic range into spatial folds that are subsequently unwrapped algorithmically.",
    gainLabel: "Relative exposure",
    thresholdNote: "Sensor saturation threshold λ = 1.0",
    pauseAnim: "Pause cycle",
    playAnim: "Animate exposure",
    scanlineTitle: "1D radiometric profile along the cross-section line (y = y₀)",
    scanlineLegendRaw: "True irradiance x",
    scanlineLegendClip: "Conventional clipping",
    scanlineLegendMod: "Modulo folding y",
    stages: [
      {
        num: "I",
        name: "True Irradiance (HDR)",
        formula: "x \\in [0, \\alpha\\lambda]",
        caption:
          "Original high-contrast scene (tunnel exit glare and oncoming headlights). Radiometric amplitude reaches up to 3.8× the physical sensor limit.",
      },
      {
        num: "II",
        name: "Conventional Sensor (Saturated)",
        formula: "y_{\\text{clip}} = \\min(x, \\lambda)",
        caption:
          "Every pixel with x > λ collapses to the maximum ceiling. Spatial gradients, structural edges, and obstacles inside the glare are lost.",
      },
      {
        num: "III",
        name: "Modulo Sensor (Wrapped)",
        formula: "y = \\mathcal{M}_{\\lambda}(x) + \\eta",
        caption:
          "The self-resetting ADC folds voltage at integer multiples of 2λ. Concentric modulo fringes preserve high-frequency spatial gradients without clipping.",
      },
      {
        num: "IV",
        name: "Restored Image (Unrolled)",
        formula: "\\hat{x} = \\mathcal{F}_{\\theta}(y) = y + 2\\lambda\\hat{k}",
        caption:
          "The deep unrolled network estimates the integer folding field k and unwraps artificial discontinuities, restoring the full dynamic range from a single shot.",
      },
    ],
    theoryEyebrow: "Mathematical Foundation",
    theoryTitle: "Inverse problem formulation",
    theoryIntro:
      "Unlike multi-exposure HDR bracketing—which suffers from motion ghosting in dynamic environments—Modulo Imaging shifts the burden from optical hardware to solving a non-linear, non-convex inverse problem from a single modulo observation.",
    theoryBlocks: [
      {
        index: "01",
        title: "Forward Acquisition Model & Unlimited Sampling",
        body: "Let x ∈ ℝᴺ denote the continuous scene irradiance and λ > 0 the saturation threshold of the analog-to-digital converter (ADC). Whereas a conventional sensor applies the clipping operator C_λ(x) = min(max(x, 0), λ), a modulo sensor applies the centered folding operator M_λ(·) mapping intensities into [−λ, λ]:",
        math: "y = \\mathcal{M}_{\\lambda}(x) + \\eta = x - 2\\lambda k + \\eta, \\qquad k = \\left\\lfloor \\frac{x + \\lambda}{2\\lambda} \\right\\rfloor \\in \\mathbb{Z}^N",
        footer:
          "where k ∈ ℤᴺ is the latent integer reset-count field (folding map) and η models sensor read noise and quantization uncertainty.",
      },
      {
        index: "02",
        title: "Higher-Order Finite Differences & DCT Phase Unwrapping",
        body: "Under the Unlimited Sampling theorem, whenever the m-th order spatial finite differences of the underlying signal satisfy ‖Δᵐx‖_∞ < λ, the modulo operator commutes with the difference operator:",
        math: "\\mathcal{M}_{\\lambda}\\left(\\Delta^m y\\right) = \\Delta^m x \\implies \\Delta^m k = \\frac{1}{2\\lambda}\\left(\\Delta^m x - \\mathcal{M}_{\\lambda}(\\Delta^m y)\\right)",
        footer:
          "To handle sensor noise and sharp natural scene edges in 2D images, we formulate an autoregressive ℓ₂ phase unwrapping scheme solved in closed form in the Discrete Cosine Transform (DCT) domain via higher-order finite differences.",
      },
      {
        index: "03",
        title: "Deep Unrolled Networks & Scale-Equivariant Regularization",
        body: "In real-world captures, disentangling natural high-contrast edges from artificial modulo wrap discontinuities (±2λ) is severely ill-posed. We cast recovery as a variational optimization unrolled into K iterative stages equipped with feature lifting and self-supervised scale-equivariant regularization:",
        math: "\\hat{x} = \\arg\\min_{x \\in \\mathbb{R}^N} \\frac{1}{2}\\left\\|\\mathcal{M}_{\\lambda}(x) - y\\right\\|_2^2 + \\tau\\,\\mathcal{R}_{\\theta}(x), \\qquad \\mathcal{F}_{\\theta}\\!\\left(\\mathcal{M}_{\\lambda}(\\alpha x)\\right) = \\alpha\\,\\mathcal{F}_{\\theta}\\!\\left(\\mathcal{M}_{\\lambda}(x)\\right)",
        footer:
          "Enforcing equivariance across exposure scales α > 0 enables self-supervised adaptation without paired ground-truth HDR data and preserves structural fidelity for downstream perception such as autonomous driving object detection.",
      },
    ],
    pubsEyebrow: "Scientific Output",
    pubsTitle: "Modulo Imaging Publications",
    pubsSubtitle:
      "IEEE Transactions journal articles, conference proceedings, and preprints by PI-Group researchers on HDR modulo reconstruction and visual perception.",
  },
}

const MODULO_PUB_IDS = new Set([4, 5, 2, 6, 7])
const moduloPublications = publications.filter((p) => MODULO_PUB_IDS.has(p.id))

// Evaluates normalized synthetic scene irradiance x(u, v) in [0, 1] before exposure gain α.
// Represents an architectural tunnel exit with a bright solar core, structural ribs, and a foreground vehicle silhouette.
function evaluateSceneNormalized(u: number, v: number): number {
  // Primary blinding light source (tunnel portal / sun core)
  const dx1 = u - 0.52
  const dy1 = v - 0.44
  const sunCore = 0.96 * Math.exp(-(dx1 * dx1) / (2 * 0.14 * 0.14) - (dy1 * dy1) / (2 * 0.16 * 0.16))

  // Secondary headlight / specular reflection
  const dx2 = u - 0.34
  const dy2 = v - 0.56
  const secondaryGlow = 0.42 * Math.exp(-(dx2 * dx2) / (2 * 0.08 * 0.08) - (dy2 * dy2) / (2 * 0.07 * 0.07))

  // Architectural radial ribs / structural bands inside the bright region
  const angle = Math.atan2(v - 0.44, u - 0.52)
  const dist = Math.sqrt(dx1 * dx1 + dy1 * dy1)
  const structuralRings = 0.08 * Math.cos(dist * 38.0) * Math.exp(-dist * 2.8)
  const radialStruts = 0.05 * Math.cos(angle * 8.0) * Math.exp(-dist * 3.2)

  // Road surface gradient & perspective lane lines
  const roadGrad = v > 0.52 ? 0.18 * ((v - 0.52) / 0.48) : 0.06
  const laneDist = Math.abs(u - 0.5 - (u - 0.5) * (v - 0.5))
  const laneMark = v > 0.6 && Math.abs(laneDist - 0.18) < 0.012 ? 0.16 : 0

  // High-contrast silhouette object (e.g. vehicle / obstacle inside the bright zone)
  const inVehicleBody = u > 0.44 && u < 0.60 && v > 0.48 && v < 0.64
  const inVehicleCabin = u > 0.465 && u < 0.575 && v > 0.41 && v < 0.49
  const silhouetteFactor = inVehicleBody || inVehicleCabin ? 0.38 : 1.0

  // Headlight pair on the vehicle
  const hlLeft = Math.exp(-Math.pow(u - 0.465, 2) / 0.0005 - Math.pow(v - 0.55, 2) / 0.0005) * 0.55
  const hlRight = Math.exp(-Math.pow(u - 0.575, 2) / 0.0005 - Math.pow(v - 0.55, 2) / 0.0005) * 0.55

  const raw =
    (0.08 + sunCore + secondaryGlow + structuralRings + radialStruts + roadGrad + laneMark) *
      silhouetteFactor +
    hlLeft +
    hlRight

  return Math.max(0.02, Math.min(1.35, raw))
}

export default function ModuloImagingPage() {
  const { language } = useLanguage()
  const c = copy[language]

  const [gain, setGain] = useState<number>(3.1)
  const [isPlaying, setIsPlaying] = useState<boolean>(true)

  const canvasNormalRef = useRef<HTMLCanvasElement | null>(null)
  const canvasSatRef = useRef<HTMLCanvasElement | null>(null)
  const canvasModRef = useRef<HTMLCanvasElement | null>(null)
  const canvasRecRef = useRef<HTMLCanvasElement | null>(null)

  // Smoothly oscillate exposure gain α ∈ [1.15, 3.65] when animation is active
  useEffect(() => {
    if (!isPlaying) return
    let rafId: number
    const start = performance.now()
    const initialPhase = Math.asin(Math.max(-1, Math.min(1, (gain - 2.4) / 1.25)))

    const tick = (now: number) => {
      const elapsed = (now - start) / 1000
      const nextGain = 2.4 + 1.25 * Math.sin(elapsed * 1.15 + initialPhase)
      setGain(Number(nextGain.toFixed(2)))
      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [isPlaying])

  // Render the 4 synchronized 2D canvases using strictly PI-Group charcoal/ivory/gold palette
  useEffect(() => {
    const W = 180
    const H = 128
    const lambda = 1.0
    const scanY = Math.floor(H * 0.55)

    const canvases = [
      { ref: canvasNormalRef.current, mode: "normal" as const },
      { ref: canvasSatRef.current, mode: "saturated" as const },
      { ref: canvasModRef.current, mode: "modulo" as const },
      { ref: canvasRecRef.current, mode: "restored" as const },
    ]

    canvases.forEach(({ ref, mode }) => {
      if (!ref) return
      const ctx = ref.getContext("2d")
      if (!ctx) return

      const imgData = ctx.createImageData(W, H)
      const data = imgData.data

      for (let py = 0; py < H; py++) {
        const v = py / (H - 1)
        for (let px = 0; px < W; px++) {
          const u = px / (W - 1)
          const xNorm = evaluateSceneNormalized(u, v)
          const x = xNorm * gain // True irradiance in [0, gain * 1.35]

          let r = 18
          let g = 18
          let b = 18

          if (mode === "normal" || mode === "restored") {
            // Reinhart-like compressing tone-map of HDR ground truth / restored signal
            // Slightly warm charcoal-to-ivory scale
            const compressed = x / (1 + 0.32 * x)
            const tVal = Math.min(1, compressed / 1.05)
            // Subtle residual noise on restored to reflect real inverse recovery
            const jitter =
              mode === "restored" ? Math.sin(px * 12.9898 + py * 78.233) * 0.008 : 0
            const lum = Math.max(0, Math.min(1, tVal + jitter))
            r = Math.round(18 + lum * 232)
            g = Math.round(18 + lum * 229)
            b = Math.round(20 + lum * 222)
          } else if (mode === "saturated") {
            // Hard clipping at λ = 1.0: everything >= λ bleaches to flat white
            const clipped = Math.min(x, lambda) / lambda
            if (x >= lambda) {
              r = 252
              g = 252
              b = 250
            } else {
              r = Math.round(18 + clipped * 225)
              g = Math.round(18 + clipped * 223)
              b = Math.round(20 + clipped * 218)
            }
          } else if (mode === "modulo") {
            // Modulo wrapping: y = x mod λ, with gold contour emphasis at folding boundaries
            const wraps = Math.floor(x / lambda)
            const folded = (x % lambda) / lambda
            if (wraps > 0) {
              // Blend charcoal (#121212) -> PI-Group gold (#C9A43E) -> ivory (#F5F6F8) across each fold
              if (folded < 0.55) {
                const k = folded / 0.55
                r = Math.round(18 + k * (201 - 18))
                g = Math.round(18 + k * (164 - 18))
                b = Math.round(18 + k * (62 - 18))
              } else {
                const k = (folded - 0.55) / 0.45
                r = Math.round(201 + k * (245 - 201))
                g = Math.round(164 + k * (246 - 164))
                b = Math.round(62 + k * (248 - 62))
              }
            } else {
              r = Math.round(18 + folded * 185)
              g = Math.round(18 + folded * 183)
              b = Math.round(20 + folded * 178)
            }
          }

          // Subtle horizontal reference scanline marker at y = y₀
          if (py === scanY && px % 4 < 2) {
            r = 201
            g = 164
            b = 62
          }

          const idx = (py * W + px) * 4
          data[idx] = r
          data[idx + 1] = g
          data[idx + 2] = b
          data[idx + 3] = 255
        }
      }

      ctx.putImageData(imgData, 0, 0)
    })
  }, [gain])

  // Compute 1D scanline samples along y₀ = 0.55 for the SVG waveform comparison
  const numSamples = 120
  const lambdaVal = 1.0
  const maxPlotY = 4.2
  const scanlineSamples = Array.from({ length: numSamples }, (_, i) => {
    const u = i / (numSamples - 1)
    const x = evaluateSceneNormalized(u, 0.55) * gain
    const yClip = Math.min(x, lambdaVal)
    const yMod = x % lambdaVal
    return { u, x, yClip, yMod }
  })

  const buildSvgPath = (getter: (d: (typeof scanlineSamples)[0]) => number) =>
    scanlineSamples
      .map((d, idx) => {
        const px = (d.u * 1000).toFixed(1)
        const py = (180 - (Math.min(getter(d), maxPlotY) / maxPlotY) * 160).toFixed(1)
        return `${idx === 0 ? "M" : "L"} ${px} ${py}`
      })
      .join(" ")

  const thresholdY = (180 - (lambdaVal / maxPlotY) * 160).toFixed(1)

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Editorial Hero — matches PageHero tokens */}
      <section className="on-ink bg-ink text-primary-foreground pt-32 pb-16 md:pt-40 md:pb-20 border-b border-white/10">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="mb-8">
            <Link
              href="/"
              className="font-mono text-xs uppercase tracking-[0.16em] text-primary-foreground/65 hover:text-gold transition-colors"
            >
              {c.backToHome}
            </Link>
          </div>

          <p className="eyebrow mb-5">{c.eyebrow}</p>
          <h1 className="font-serif text-4xl md:text-6xl font-semibold leading-[1.05] max-w-4xl text-balance">
            {c.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-primary-foreground/75 leading-relaxed">
            {c.subtitle}
          </p>

          <div className="mt-10 flex items-center gap-8">
            <a
              href="#publicaciones"
              className="inline-block bg-gold text-ink px-5 py-2.5 rounded text-sm font-medium transition-colors hover:bg-primary-foreground"
            >
              {c.viewPubs}
            </a>
            <div className="h-px flex-1 max-w-24 bg-gold/50" />
          </div>
        </div>
      </section>

      {/* Interactive 4-Stage Visual Pipeline: Normal -> Saturated -> Modulo -> Restored */}
      <section className="py-20 md:py-28 border-b border-border">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
            <div className="max-w-3xl">
              <p className="eyebrow mb-4">{c.demoEyebrow}</p>
              <h2 className="font-serif text-3xl md:text-5xl font-semibold leading-tight text-foreground">
                {c.demoTitle}
              </h2>
              <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed">
                {c.demoDesc}
              </p>
            </div>

            {/* Minimalist Instrument Control Bar */}
            <div className="w-full md:w-80 shrink-0 border border-border bg-secondary/50 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  {c.gainLabel}
                </span>
                <span className="font-mono text-sm font-semibold text-foreground">
                  α = {gain.toFixed(2)}λ
                </span>
              </div>
              <input
                type="range"
                min="1.0"
                max="3.8"
                step="0.05"
                value={gain}
                onChange={(e) => {
                  setIsPlaying(false)
                  setGain(parseFloat(e.target.value))
                }}
                aria-label={c.gainLabel}
                className="w-full accent-ink cursor-pointer"
              />
              <div className="mt-3 flex items-center justify-between text-xs font-mono">
                <span className="text-muted-foreground">{c.thresholdNote}</span>
                <button
                  type="button"
                  onClick={() => setIsPlaying((p) => !p)}
                  className="text-gold-deep hover:underline font-medium cursor-pointer"
                >
                  {isPlaying ? c.pauseAnim : c.playAnim}
                </button>
              </div>
            </div>
          </div>

          {/* 4-Stage Visual Strip: Normal | Saturated | Modulo | Restored */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-border">
            {c.stages.map((stage, idx) => {
              const canvasRef =
                idx === 0
                  ? canvasNormalRef
                  : idx === 1
                    ? canvasSatRef
                    : idx === 2
                      ? canvasModRef
                      : canvasRecRef

              return (
                <div
                  key={stage.num}
                  className="border-r border-b border-border p-5 flex flex-col justify-between bg-background"
                >
                  <div>
                    <div className="flex items-baseline justify-between gap-2 mb-3">
                      <span className="font-mono text-xs uppercase tracking-[0.18em] text-gold-deep">
                        {stage.num}
                      </span>
                      <span className="font-mono text-xs text-muted-foreground">
                        <InlineMath math={stage.formula} />
                      </span>
                    </div>

                    <h3 className="font-serif text-lg font-semibold text-foreground mb-3">
                      {stage.name}
                    </h3>

                    <div className="relative aspect-[180/128] w-full bg-ink overflow-hidden border border-border mb-4">
                      <canvas
                        ref={canvasRef}
                        width={180}
                        height={128}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {stage.caption}
                  </p>
                </div>
              )
            })}
          </div>

          {/* 1D Cross-Section Oscilloscope Plot (Strictly Ink, Gold, Secondary) */}
          <div className="mt-8 border border-border bg-secondary/30 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-foreground">
                {c.scanlineTitle}
              </p>
              <div className="flex flex-wrap items-center gap-6 font-mono text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-2">
                  <span className="inline-block w-5 h-0.5 bg-ink" />
                  {c.scanlineLegendRaw}
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="inline-block w-5 h-0 border-t-2 border-dashed border-muted-foreground" />
                  {c.scanlineLegendClip}
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="inline-block w-5 h-0.5 bg-gold" />
                  {c.scanlineLegendMod}
                </span>
              </div>
            </div>

            <svg
              viewBox="0 0 1000 190"
              className="w-full h-40 overflow-visible"
              role="img"
              aria-label={c.scanlineTitle}
            >
              {/* Baseline y = 0 */}
              <line
                x1="0"
                y1="180"
                x2="1000"
                y2="180"
                stroke="#DDE1E7"
                strokeWidth="1"
              />
              {/* Saturation threshold line y = λ */}
              <line
                x1="0"
                y1={thresholdY}
                x2="1000"
                y2={thresholdY}
                stroke="#8A6A17"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
              <text
                x="996"
                y={Number(thresholdY) - 6}
                textAnchor="end"
                className="fill-gold-deep font-mono text-[11px]"
              >
                λ = 1.0
              </text>

              {/* True HDR irradiance x(u) = Restored x̂(u) */}
              <path
                d={buildSvgPath((d) => d.x)}
                fill="none"
                stroke="#121212"
                strokeWidth="1.75"
              />

              {/* Clipped signal min(x, λ) */}
              <path
                d={buildSvgPath((d) => d.yClip)}
                fill="none"
                stroke="#556070"
                strokeWidth="1.5"
                strokeDasharray="6 4"
              />

              {/* Modulo wrapped signal M_λ(x) */}
              <path
                d={buildSvgPath((d) => d.yMod)}
                fill="none"
                stroke="#C9A43E"
                strokeWidth="2.2"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* Theoretical Foundations — Editorial two-column layout with KaTeX */}
      <section className="py-20 md:py-28 bg-secondary border-b border-border">
        <div className="container mx-auto px-4 max-w-6xl">
          <SectionHeading eyebrow={c.theoryEyebrow} title={c.theoryTitle}>
            {c.theoryIntro}
          </SectionHeading>

          <div className="border-t border-border">
            {c.theoryBlocks.map((block) => (
              <article
                key={block.index}
                className="grid md:grid-cols-[1fr_2fr] gap-6 md:gap-12 py-12 border-b border-border items-start"
              >
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-gold-deep mb-2">
                    {block.index}
                  </p>
                  <h3 className="font-serif text-2xl font-semibold leading-snug text-foreground">
                    {block.title}
                  </h3>
                </div>

                <div className="space-y-5">
                  <p className="text-foreground/85 leading-relaxed">{block.body}</p>
                  <div className="bg-background border border-border px-6 py-4 overflow-x-auto text-foreground">
                    <BlockMath math={block.math} />
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {block.footer}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Publications — Reuses standard PublicationEntry component */}
      <section id="publicaciones" className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <SectionHeading eyebrow={c.pubsEyebrow} title={c.pubsTitle}>
            {c.pubsSubtitle}
          </SectionHeading>

          <div className="border-t border-border">
            {moduloPublications.map((pub, i) => (
              <PublicationEntry key={pub.id} pub={pub} delay={Math.min(i, 3) * 80} />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
