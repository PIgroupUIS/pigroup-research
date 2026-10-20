"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
// @ts-ignore
import "katex/dist/katex.min.css"
// @ts-ignore
import { BlockMath, InlineMath } from "react-katex"
import { getImagePath } from "@/lib/utils"
import { PublicationEntry } from "@/components/publication-entry"
import { SectionHeading } from "@/components/page-hero"
import { publications } from "@/lib/data"
import { useLanguage } from "@/components/language-context"

const copy = {
  es: {
    backToHome: "← Volver al inicio",
    eyebrow: "Línea de Investigación · Reconstrucción Temporal de Escenas",
    title: "Time-Reverse Imaging",
    subtitle:
      "Inferencia y reconstrucción visual de estados pasados de una escena a partir de observaciones presentes RGB e infrarrojas mediante huellas térmicas residuales y modelos de lenguaje visual.",
    viewPubs: "Ver publicaciones ↓",
    pipelineEyebrow: "Inferencia Temporal a partir de Rastros Térmicos",
    pipelineTitle: "Del estado presente a la escena segundos atrás",
    pipelineDesc:
      "Una cámara RGB convencional solo registra la configuración geométrica del instante actual (t). Sin embargo, el contacto humano (~37 °C) transfiere calor a las superficies, dejando huellas infrarrojas que decaen exponencialmente y actúan como una memoria física pasiva para reconstruir el estado en t − Δt.",
    blendLabel: "Inspección espectral en t",
    blendRGB: "100% RGB",
    blendIR: "100% Térmica",
    pauseAnim: "Pausar barrido",
    playAnim: "Animar fusión RGB / IR",
    decayTitle: "Curva de disipación térmica superficial T(t) tras finalizar el contacto (Δt = 15 s)",
    decayLegendSurface: "Temperatura en zona de contacto (silla / libro)",
    decayLegendAmb: "Temperatura ambiente T_amb",
    decayMarker: "Instante de captura t (Δt = 15 s)",
    stages: [
      {
        num: "I",
        name: "Observación Presente RGB",
        formula: "I_t^{\\text{RGB}} \\text{ en } t = 0\\text{ s}",
        image: "/time-reverse-imaging/present-fame.png",
        alt: "Escena presente capturada en espectro visible RGB",
        caption:
          "En el instante presente t, el sujeto se encuentra de pie junto al escritorio. El libro rojo permanece cerrado sobre la mesa y la silla a la derecha está vacía; la imagen RGB no contiene evidencia de dónde estuvo la persona segundos antes.",
      },
      {
        num: "II",
        name: "Huella Termográfica Residual",
        formula: "I_t^{\\text{IR}} \\propto T(\\mathbf{r}, t)",
        image: "/time-reverse-imaging/thermal-info.png",
        alt: "Captura termográfica FLIR mostrando rastros de calor en la silla y el libro",
        caption:
          "La cámara térmica FLIR revela dos anomalías calóricas invisibles al ojo humano: una huella térmica intensa sobre el asiento y espaldar de la silla vacía y una traza palmar de ~26.0 °C sobre la portada del libro.",
      },
      {
        num: "III",
        name: "Escena Pasada Reconstruida",
        formula: "\\hat{x}_{t - \\Delta t} \\text{ en } \\Delta t = 15\\text{ s}",
        image: "/time-reverse-imaging/prediction-3.png",
        alt: "Estado pasado reconstruido mostrando al sujeto sentado leyendo el libro",
        caption:
          "Combinando la geometría de I_t^RGB, el mapa de calor I_t^IR y el razonamiento semántico de un VLM dentro de un proceso de difusión restringido, se recupera la configuración previa: el sujeto sentado leyendo el libro.",
      },
    ],
    inspectorEyebrow: "Fusión Multimodal en el Presente",
    inspectorTitle: "Superposición radiométrica RGB + Infrarrojo",
    inspectorDesc:
      "Desliza el control para superponer la captura termográfica sobre la imagen RGB en el instante t. Las zonas de transferencia de calor (asiento de la silla y superficie del libro) anclan espacialmente la hipótesis generativa del estado pasado.",
    theoryEyebrow: "Fundamento Teórico y Metodología",
    theoryTitle: "Formulación del problema inverso temporal",
    theoryIntro:
      "Mientras que los problemas inversos clásicos en óptica computacional buscan recuperar señales latentes simultáneas x_t a partir de mediciones degradadas y_t = H(x_t) + η, Time-Reverse Imaging plantea estimar una escena pasada x_{t−Δt} para un horizonte Δt > 0.",
    theoryBlocks: [
      {
        index: "01",
        title: "Codificación temporal pasiva mediante difusión de calor",
        body: "Cuando un cuerpo humano a temperatura fisiológica T₀ ≈ 37 °C interactúa con objetos del entorno a temperatura ambiente T_amb, transfiere energía térmica por conducción. Al cesar el contacto en t − Δt, la temperatura superficial T(r, t) decae siguiendo la ley de enfriamiento de Newton y difusión térmica:",
        math: "T(\\mathbf{r}, t) = T_{\\text{amb}} + \\left(T(\\mathbf{r}, t - \\Delta t) - T_{\\text{amb}}\\right)e^{-\\kappa\\,\\Delta t} + \\eta_{\\text{IR}}(\\mathbf{r}), \\qquad \\Delta t > 0",
        footer:
          "donde κ depende de la difusividad térmica del material (textil, madera, papel) y η_IR modela el ruido del microbolómetro. Esta firma exponencial codifica tanto la geometría del contacto como el tiempo transcurrido Δt.",
      },
      {
        index: "02",
        title: "Inferencia semántica con VLMs y difusión condicional restringida",
        body: "A partir del par multimodal presente y_t = {I_t^RGB, I_t^IR}, un primer Modelo de Lenguaje Visual (VLM) analiza las trazas calóricas para inferir una descripción estructurada c_past de la acción ocurrida en t − Δt. Esta hipótesis semántica condiciona un modelo de difusión latente guiado por un segundo VLM crítico que preserva la identidad del sujeto y el fondo estático Ω_static:",
        math: "\\hat{x}_{t - \\Delta t} = \\arg\\min_{x} \\; \\left\\|\\mathcal{P}_{\\Omega_{\\text{static}}}(x - I_t^{\\text{RGB}})\\right\\|_2^2 + \\lambda_{\\text{IR}}\\,\\mathcal{L}_{\\text{trace}}\\left(x, I_t^{\\text{IR}}\\right) + \\lambda_{\\text{VLM}}\\,\\mathcal{L}_{\\text{diff}}\\left(x \\,\\middle|\\, c_{\\text{past}}\\right)",
        footer:
          "La imagen RGB fija la apariencia del entorno y del individuo, mientras que el mapa térmico y el descriptor semántico dirigen la síntesis de la pose humana e interacción con objetos en el pasado.",
      },
      {
        index: "03",
        title: "Evaluación cuantitativa de bajo y alto nivel (Estudio de Ablación)",
        body: "Evaluamos la reconstrucción tanto en fidelidad de imagen de bajo nivel (PSNR y SSIM respecto al ground truth grabado 15 s y 30 s antes) como en consistencia semántica de alto nivel mediante precisión de objetos (OA) y error medio por articulación de pose 3D (MPJPE):",
        math: "\\text{RGB Only: } 15.81\\text{ dB}\\,|\\,\\text{MPJPE } 395.1 \\quad\\longrightarrow\\quad \\text{RGB + IR + VLM: } 18.12\\text{ dB}\\,|\\,\\text{MPJPE } 97.81",
        footer:
          "Sin la modalidad térmica (RGB Only), el modelo es incapaz de inferir que la persona estuvo sentada (MPJPE de 395.1 mm). Al integrar la traza térmica y el descriptor del VLM, el error de pose cae un 75.2 % y se recupera la interacción exacta con el libro.",
      },
    ],
    ablationEyebrow: "Evidencia Experimental",
    ablationTitle: "Estudio de ablación y escenas de referencia",
    ablationSubtitle:
      "Comparación experimental entre modalidades de entrada (RGB, RGB + Térmica, y RGB + Térmica + Descriptor VLM) frente a la escena real pasada (Ground Truth).",
    ablationFig1Caption:
      "Figura 1. Estudio de ablación cuantitativo y cualitativo (fila superior: reconstrucción RGB y métricas PSNR | SSIM; fila inferior: segmentación semántica y pose 3D con métricas OA | MPJPE).",
    ablationFig2Caption:
      "Figura 2. Escenas de prueba multimodales emparejadas: captura térmica en el presente (Thermal), imagen visible en el presente (RGB) y estado pasado real (GT).",
    tableModality: "Modalidad de Entrada",
    tableLowLevel: "Bajo Nivel (PSNR ↑ / SSIM ↑)",
    tableHighLevel: "Alto Nivel (OA ↑ / MPJPE ↓)",
    tableObservation: "Comportamiento en la Reconstrucción",
    tableRows: [
      {
        mod: "RGB únicamente",
        low: "15.81 dB / 0.72",
        high: "60.24 % / 395.1 mm",
        obs: "Falla en localizar la posición pasada en la silla; mantiene al sujeto de pie.",
      },
      {
        mod: "RGB + Térmica (IR)",
        low: "18.02 dB / 0.76",
        high: "64.12 % / 316.9 mm",
        obs: "Ubica correctamente al sujeto sentado gracias a la huella calórica del asiento.",
      },
      {
        mod: "RGB + Térmica (IR) + Descriptor VLM",
        low: "18.12 dB / 0.78",
        high: "68.98 % / 97.81 mm",
        obs: "Recupera tanto la postura sentada como la acción semántica de lectura del libro.",
      },
    ],
    pubsEyebrow: "Producción Científica",
    pubsTitle: "Publicaciones en Time-Reverse Imaging",
    pubsSubtitle:
      "Investigación desarrollada en cooperación entre la Universidad Industrial de Santander (UIS) y GIPSA-lab (Université Grenoble Alpes).",
  },
  en: {
    backToHome: "← Back to home",
    eyebrow: "Research Line · Temporal Scene Reconstruction",
    title: "Time-Reverse Imaging",
    subtitle:
      "Visual inference and reconstruction of past scene states from present RGB and infrared observations using residual thermal traces and visual language models.",
    viewPubs: "View publications ↓",
    pipelineEyebrow: "Temporal Inference from Thermal Traces",
    pipelineTitle: "From the present observation to seconds into the past",
    pipelineDesc:
      "A conventional RGB camera only records the geometric configuration of the present instant (t). However, human contact (~37 °C) transfers heat to touched surfaces, leaving infrared imprints that decay exponentially and act as a passive physical memory to reconstruct the scene state at t − Δt.",
    blendLabel: "Spectral inspection at t",
    blendRGB: "100% RGB",
    blendIR: "100% Thermal",
    pauseAnim: "Pause sweep",
    playAnim: "Animate RGB / IR fusion",
    decayTitle: "Surface thermal dissipation curve T(t) after contact ends (Δt = 15 s)",
    decayLegendSurface: "Contact zone temperature (chair / book)",
    decayLegendAmb: "Ambient temperature T_amb",
    decayMarker: "Capture instant t (Δt = 15 s)",
    stages: [
      {
        num: "I",
        name: "Present RGB Observation",
        formula: "I_t^{\\text{RGB}} \\text{ at } t = 0\\text{ s}",
        image: "/time-reverse-imaging/present-fame.png",
        alt: "Present scene captured in visible RGB spectrum",
        caption:
          "At present time t, the subject stands beside the desk. The red book lies closed on the table and the chair on the right is empty; the RGB frame alone carries no clue of where the person was seconds earlier.",
      },
      {
        num: "II",
        name: "Residual Thermal Trace",
        formula: "I_t^{\\text{IR}} \\propto T(\\mathbf{r}, t)",
        image: "/time-reverse-imaging/thermal-info.png",
        alt: "FLIR thermal capture revealing heat traces on the chair and book",
        caption:
          "The FLIR thermal camera exposes two heat anomalies invisible to the naked eye: a strong thermal imprint on the empty chair seat and backrest, plus a ~26.0 °C hand imprint on the red book cover.",
      },
      {
        num: "III",
        name: "Reconstructed Past Scene",
        formula: "\\hat{x}_{t - \\Delta t} \\text{ at } \\Delta t = 15\\text{ s}",
        image: "/time-reverse-imaging/prediction-3.png",
        alt: "Reconstructed past state showing the subject seated reading the book",
        caption:
          "Coupling the spatial anchor of I_t^RGB, the thermal trace I_t^IR, and VLM semantic reasoning within a constrained diffusion process recovers the prior state: the subject seated on the chair reading the book.",
      },
    ],
    inspectorEyebrow: "Present-Time Multimodal Fusion",
    inspectorTitle: "RGB + Infrared radiometric overlay",
    inspectorDesc:
      "Slide the control to blend the thermographic capture over the RGB image at instant t. The heat transfer regions (chair seat and book cover) spatially anchor the generative hypothesis of the past state.",
    theoryEyebrow: "Theoretical Foundation & Methodology",
    theoryTitle: "Temporal inverse problem formulation",
    theoryIntro:
      "Whereas classical inverse problems in computational optics aim to recover simultaneous latent signals x_t from degraded measurements y_t = H(x_t) + η, Time-Reverse Imaging seeks to estimate a past scene state x_{t−Δt} over a backward horizon Δt > 0.",
    theoryBlocks: [
      {
        index: "01",
        title: "Passive Temporal Encoding via Heat Diffusion",
        body: "When a human body at physiological temperature T₀ ≈ 37 °C interacts with surrounding objects at ambient temperature T_amb, thermal energy transfers via conduction. Once contact ceases at t − Δt, the surface temperature T(r, t) decays according to Newton's cooling law and thermal diffusion:",
        math: "T(\\mathbf{r}, t) = T_{\\text{amb}} + \\left(T(\\mathbf{r}, t - \\Delta t) - T_{\\text{amb}}\\right)e^{-\\kappa\\,\\Delta t} + \\eta_{\\text{IR}}(\\mathbf{r}), \\qquad \\Delta t > 0",
        footer:
          "where κ depends on material thermal diffusivity (fabric, wood, paper) and η_IR models microbolometer read noise. This exponential signature encodes both the contact geometry and the elapsed time Δt.",
      },
      {
        index: "02",
        title: "VLM Semantic Inference & Constrained Conditional Diffusion",
        body: "Given the present multimodal pair y_t = {I_t^RGB, I_t^IR}, a first Visual Language Model (VLM) inspects the residual heat traces to infer a structured semantic description c_past of the action at t − Δt. This semantic prior conditions a latent diffusion model guided by a second critic VLM that preserves subject identity and the static background Ω_static:",
        math: "\\hat{x}_{t - \\Delta t} = \\arg\\min_{x} \\; \\left\\|\\mathcal{P}_{\\Omega_{\\text{static}}}(x - I_t^{\\text{RGB}})\\right\\|_2^2 + \\lambda_{\\text{IR}}\\,\\mathcal{L}_{\\text{trace}}\\left(x, I_t^{\\text{IR}}\\right) + \\lambda_{\\text{VLM}}\\,\\mathcal{L}_{\\text{diff}}\\left(x \\,\\middle|\\, c_{\\text{past}}\\right)",
        footer:
          "The RGB frame anchors the environment and subject appearance, while the thermal map and semantic descriptor steer the synthesis of past human pose and object interaction.",
      },
      {
        index: "03",
        title: "Low-Level & High-Level Quantitative Evaluation (Ablation Study)",
        body: "We evaluate reconstruction across both low-level image fidelity (PSNR and SSIM against ground truth recorded 15 s and 30 s earlier) and high-level semantic consistency via object accuracy (OA) and 3D pose mean per-joint position error (MPJPE):",
        math: "\\text{RGB Only: } 15.81\\text{ dB}\\,|\\,\\text{MPJPE } 395.1 \\quad\\longrightarrow\\quad \\text{RGB + IR + VLM: } 18.12\\text{ dB}\\,|\\,\\text{MPJPE } 97.81",
        footer:
          "Without the thermal modality (RGB Only), the model cannot infer that the person was previously seated (MPJPE of 395.1 mm). Incorporating the thermal trace and VLM descriptor reduces pose error by 75.2% and recovers the exact book-reading interaction.",
      },
    ],
    ablationEyebrow: "Experimental Evidence",
    ablationTitle: "Ablation study and reference scenes",
    ablationSubtitle:
      "Experimental comparison across input modalities (RGB, RGB + Thermal, and RGB + Thermal + VLM Descriptor) against the true past scene (Ground Truth).",
    ablationFig1Caption:
      "Figure 1. Quantitative and qualitative ablation study (top row: RGB reconstruction and PSNR | SSIM metrics; bottom row: semantic segmentation and 3D pose with OA | MPJPE metrics).",
    ablationFig2Caption:
      "Figure 2. Paired multimodal test scenes: present thermal capture (Thermal), present visible frame (RGB), and true past scene state (GT).",
    tableModality: "Input Modality",
    tableLowLevel: "Low-Level (PSNR ↑ / SSIM ↑)",
    tableHighLevel: "High-Level (OA ↑ / MPJPE ↓)",
    tableObservation: "Reconstruction Behavior",
    tableRows: [
      {
        mod: "RGB Only",
        low: "15.81 dB / 0.72",
        high: "60.24 % / 395.1 mm",
        obs: "Fails to localize the past seated position on the chair; leaves subject standing.",
      },
      {
        mod: "RGB + Thermal (IR)",
        low: "18.02 dB / 0.76",
        high: "64.12 % / 316.9 mm",
        obs: "Correctly places the subject seated on the chair via the seat heat trace.",
      },
      {
        mod: "RGB + Thermal (IR) + VLM Descriptor",
        low: "18.12 dB / 0.78",
        high: "68.98 % / 97.81 mm",
        obs: "Recovers both the seated posture and the semantic action of reading the book.",
      },
    ],
    pubsEyebrow: "Scientific Output",
    pubsTitle: "Time-Reverse Imaging Publications",
    pubsSubtitle:
      "Research conducted in cooperation between Universidad Industrial de Santander (UIS) and GIPSA-lab (Université Grenoble Alpes).",
  },
}

const TIME_REVERSE_PUB_IDS = new Set([1])
const timeReversePublications = publications.filter((p) => TIME_REVERSE_PUB_IDS.has(p.id))

export default function TimeReverseImagingPage() {
  const { language } = useLanguage()
  const c = copy[language]

  const [irBlend, setIrBlend] = useState<number>(0.55)
  const [isPlaying, setIsPlaying] = useState<boolean>(true)

  // Smoothly oscillate RGB/Thermal overlay blend α_IR ∈ [0.05, 0.95] when animation is active
  useEffect(() => {
    if (!isPlaying) return
    let rafId: number
    const start = performance.now()
    const initialPhase = Math.asin(Math.max(-1, Math.min(1, (irBlend - 0.5) / 0.45)))

    const tick = (now: number) => {
      const elapsed = (now - start) / 1000
      const next = 0.5 + 0.45 * Math.sin(elapsed * 1.1 + initialPhase)
      setIrBlend(Number(next.toFixed(2)))
      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [isPlaying])

  // Compute Newton thermal decay curve T(Δt) = T_amb + (T_0 - T_amb) * exp(-κ * Δt) for Δt in [0, 35] seconds
  const numSamples = 100
  const tAmb = 21.0
  const tInitial = 33.5
  const kappa = 0.06
  const maxTemp = 35.0
  const minTemp = 19.0

  const decaySamples = Array.from({ length: numSamples }, (_, i) => {
    const dt = (i / (numSamples - 1)) * 35 // 0 to 35 seconds after contact ends
    const temp = tAmb + (tInitial - tAmb) * Math.exp(-kappa * dt)
    return { dt, temp }
  })

  const buildDecayPath = () =>
    decaySamples
      .map((d, idx) => {
        const px = ((d.dt / 35) * 1000).toFixed(1)
        const py = (170 - ((d.temp - minTemp) / (maxTemp - minTemp)) * 145).toFixed(1)
        return `${idx === 0 ? "M" : "L"} ${px} ${py}`
      })
      .join(" ")

  const ambY = (170 - ((tAmb - minTemp) / (maxTemp - minTemp)) * 145).toFixed(1)
  const captureDt = 15 // Capture at Δt = 15 s
  const captureX = ((captureDt / 35) * 1000).toFixed(1)
  const captureTemp = tAmb + (tInitial - tAmb) * Math.exp(-kappa * captureDt)
  const captureY = (170 - ((captureTemp - minTemp) / (maxTemp - minTemp)) * 145).toFixed(1)

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Editorial Hero — matches PageHero tokens and Modulo Imaging */}
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

      {/* 3-Stage Experimental Pipeline + Interactive Spectral Fusion Inspector */}
      <section className="py-20 md:py-28 border-b border-border">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
            <div className="max-w-3xl">
              <p className="eyebrow mb-4">{c.pipelineEyebrow}</p>
              <h2 className="font-serif text-3xl md:text-5xl font-semibold leading-tight text-foreground">
                {c.pipelineTitle}
              </h2>
              <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed">
                {c.pipelineDesc}
              </p>
            </div>

            {/* Minimalist Spectral Blend Instrument Control */}
            <div className="w-full md:w-80 shrink-0 border border-border bg-secondary/50 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  {c.blendLabel}
                </span>
                <span className="font-mono text-sm font-semibold text-foreground">
                  IR = {Math.round(irBlend * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={irBlend}
                onChange={(e) => {
                  setIsPlaying(false)
                  setIrBlend(parseFloat(e.target.value))
                }}
                aria-label={c.blendLabel}
                className="w-full accent-ink cursor-pointer"
              />
              <div className="mt-3 flex items-center justify-between text-xs font-mono">
                <span className="text-muted-foreground">
                  {c.blendRGB} ↔ {c.blendIR}
                </span>
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

          {/* 4-Column Strip: Stage I (Present RGB) | Stage II (Present IR) | Interactive Overlay | Stage III (Reconstructed Past) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-border">
            {c.stages.map((stage) => (
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

                  <div className="relative aspect-[3/4] w-full bg-ink overflow-hidden border border-border mb-4">
                    <img
                      src={getImagePath(stage.image)}
                      alt={stage.alt}
                      loading="eager"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  {stage.caption}
                </p>
              </div>
            ))}

            {/* 4th Panel: Interactive RGB + Thermal Overlay Inspector */}
            <div className="border-r border-b border-border p-5 flex flex-col justify-between bg-secondary/25">
              <div>
                <div className="flex items-baseline justify-between gap-2 mb-3">
                  <span className="font-mono text-xs uppercase tracking-[0.18em] text-gold-deep">
                    I + II
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">
                    <InlineMath math={`(1-\\alpha)I_t^{\\text{RGB}} + \\alpha I_t^{\\text{IR}}`} />
                  </span>
                </div>

                <h3 className="font-serif text-lg font-semibold text-foreground mb-3">
                  {c.inspectorTitle}
                </h3>

                <div className="relative aspect-[3/4] w-full bg-ink overflow-hidden border border-border mb-4">
                  <img
                    src={getImagePath("/time-reverse-imaging/present-fame.png")}
                    alt="Base RGB frame"
                    className="w-full h-full object-cover"
                  />
                  <img
                    src={getImagePath("/time-reverse-imaging/thermal-info.png")}
                    alt="Overlay Thermal frame"
                    style={{ opacity: irBlend }}
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-75"
                  />
                  <div className="absolute bottom-2 right-2 bg-ink/85 text-primary-foreground px-2 py-0.5 font-mono text-[11px] border border-gold/40">
                    α = {irBlend.toFixed(2)}
                  </div>
                </div>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed">
                {c.inspectorDesc}
              </p>
            </div>
          </div>

          {/* 1D Thermal Dissipation Plot (Strictly Ink, Gold, Secondary) */}
          <div className="mt-8 border border-border bg-secondary/30 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-foreground">
                {c.decayTitle}
              </p>
              <div className="flex flex-wrap items-center gap-6 font-mono text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-2">
                  <span className="inline-block w-5 h-0.5 bg-gold" />
                  {c.decayLegendSurface}
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="inline-block w-5 h-0 border-t-2 border-dashed border-muted-foreground" />
                  {c.decayLegendAmb}
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-ink" />
                  {c.decayMarker}
                </span>
              </div>
            </div>

            <svg
              viewBox="0 0 1000 185"
              className="w-full h-40 overflow-visible"
              role="img"
              aria-label={c.decayTitle}
            >
              {/* Baseline axis */}
              <line x1="0" y1="170" x2="1000" y2="170" stroke="#DDE1E7" strokeWidth="1" />

              {/* Ambient temperature asymptote T_amb = 21 °C */}
              <line
                x1="0"
                y1={ambY}
                x2="1000"
                y2={ambY}
                stroke="#556070"
                strokeWidth="1.25"
                strokeDasharray="6 4"
              />
              <text
                x="996"
                y={Number(ambY) - 6}
                textAnchor="end"
                className="fill-muted-foreground font-mono text-[11px]"
              >
                T_amb ≈ 21.0 °C
              </text>

              {/* Vertical marker at Δt = 15 s */}
              <line
                x1={captureX}
                y1="20"
                x2={captureX}
                y2="170"
                stroke="#8A6A17"
                strokeWidth="1"
                strokeDasharray="3 3"
              />

              {/* Exponential cooling curve T(Δt) */}
              <path
                d={buildDecayPath()}
                fill="none"
                stroke="#C9A43E"
                strokeWidth="2.4"
              />

              {/* Point at t - Δt = 0 s (Contact ends) */}
              <circle cx="0" cy="38.6" r="4" fill="#121212" />
              <text
                x="10"
                y="34"
                className="fill-foreground font-mono text-[11px]"
              >
                t − Δt (Contacto inicial ~33.5 °C)
              </text>

              {/* Point at Δt = 15 s (FLIR Capture ~26.0 °C) */}
              <circle cx={captureX} cy={captureY} r="4.5" fill="#121212" stroke="#C9A43E" strokeWidth="2" />
              <text
                x={Number(captureX) + 10}
                y={Number(captureY) - 8}
                className="fill-foreground font-mono text-[11px] font-semibold"
              >
                Captura FLIR (Δt = 15 s, T ≈ 26.0 °C)
              </text>
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

      {/* Experimental Ablation Study & Reference Scenes */}
      <section className="py-20 md:py-28 bg-background border-b border-border">
        <div className="container mx-auto px-4 max-w-6xl">
          <SectionHeading eyebrow={c.ablationEyebrow} title={c.ablationTitle}>
            {c.ablationSubtitle}
          </SectionHeading>

          {/* Editorial Quantitative Ablation Table */}
          <div className="overflow-x-auto border-t border-b border-border mb-14">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border font-mono text-xs uppercase tracking-wider text-gold-deep bg-secondary/40">
                  <th className="py-3.5 px-4">{c.tableModality}</th>
                  <th className="py-3.5 px-4">{c.tableLowLevel}</th>
                  <th className="py-3.5 px-4">{c.tableHighLevel}</th>
                  <th className="py-3.5 px-4">{c.tableObservation}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-sm">
                {c.tableRows.map((row, idx) => (
                  <tr
                    key={row.mod}
                    className={idx === 2 ? "bg-secondary/30 font-medium" : ""}
                  >
                    <td className="py-4 px-4 font-mono text-xs text-foreground">
                      {row.mod}
                    </td>
                    <td className="py-4 px-4 font-mono text-xs text-foreground">
                      {row.low}
                    </td>
                    <td className="py-4 px-4 font-mono text-xs text-foreground">
                      {row.high}
                    </td>
                    <td className="py-4 px-4 text-muted-foreground">
                      {row.obs}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Experimental Figures Grid using verified image paths */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_1fr] gap-8 items-start">
            <figure className="border border-border bg-secondary/20 p-4">
              <div className="overflow-hidden border border-border bg-white">
                <img
                  src={getImagePath("/time-reverse-imaging/Ablation_study.jpg")}
                  alt={c.ablationFig1Caption}
                  loading="lazy"
                  className="w-full h-auto object-contain"
                />
              </div>
              <figcaption className="mt-3 font-mono text-xs text-muted-foreground leading-relaxed">
                {c.ablationFig1Caption}
              </figcaption>
            </figure>

            <figure className="border border-border bg-secondary/20 p-4">
              <div className="overflow-hidden border border-border bg-white">
                <img
                  src={getImagePath("/references_scenes.jpg")}
                  alt={c.ablationFig2Caption}
                  loading="lazy"
                  className="w-full h-auto object-contain"
                />
              </div>
              <figcaption className="mt-3 font-mono text-xs text-muted-foreground leading-relaxed">
                {c.ablationFig2Caption}
              </figcaption>
            </figure>
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
            {timeReversePublications.map((pub, i) => (
              <PublicationEntry key={pub.id} pub={pub} delay={Math.min(i, 3) * 80} />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
