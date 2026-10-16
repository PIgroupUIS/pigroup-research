"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"
import { getImagePath } from "@/lib/utils"

export function HeroInverseLogo() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let isDisposed = false
    let animationFrameId: number
    let resizeObserver: ResizeObserver | null = null
    let renderer: THREE.WebGLRenderer | null = null
    let geometry: THREE.BufferGeometry | null = null
    let particleMaterial: THREE.PointsMaterial | null = null

    const img = new Image()
    img.crossOrigin = "anonymous"
    img.src = getImagePath("/logo.png")

    img.onload = () => {
      if (isDisposed || !container) return

      const imgW = img.naturalWidth || 600
      const imgH = img.naturalHeight || 750

      const sampleCanvas = document.createElement("canvas")
      sampleCanvas.width = imgW
      sampleCanvas.height = imgH
      const ctx = sampleCanvas.getContext("2d")
      if (!ctx) return

      ctx.drawImage(img, 0, 0, imgW, imgH)
      const imgData = ctx.getImageData(0, 0, imgW, imgH).data

      let width = container.clientWidth || window.innerWidth
      let height = container.clientHeight || window.innerHeight

      const scene = new THREE.Scene()
      scene.fog = new THREE.FogExp2(0x050503, 0.03)

      const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
      camera.position.set(0, 0, 7.5)

      const getLogoOffset = (w: number, h: number) => {
        if (w < 768) return { offsetX: 0, offsetY: 0, scaleMult: 0.8 }
        const vFov = (camera.fov * Math.PI) / 180
        const visibleHeight = 2 * Math.tan(vFov / 2) * 7.5
        const visibleWidth = visibleHeight * (w / h)
        const offsetX = Math.min(visibleWidth * 0.22, 3.2)
        return { offsetX, offsetY: 0, scaleMult: 1.0 }
      }

      const initialParams = getLogoOffset(width, height)
      let currentLogoOffsetX = initialParams.offsetX

      const targetCoords: number[] = []
      const step = Math.max(2, Math.floor(imgW / 230))
      const scale = 3.6 / imgW

      for (let y = 0; y < imgH; y += step) {
        for (let x = 0; x < imgW; x += step) {
          const idx = (y * imgW + x) * 4
          if (imgData[idx + 3] > 80) {
            const posX = (x - imgW / 2) * scale * initialParams.scaleMult
            const posY = -(y - imgH / 2) * scale * initialParams.scaleMult
            const posZ = (Math.random() - 0.5) * 0.08
            targetCoords.push(posX, posY, posZ)
          }
        }
      }

      const count = targetCoords.length / 3
      if (count === 0) return

      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      })
      renderer.setSize(width, height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setClearColor(0x000000, 0)
      container.appendChild(renderer.domElement)

      geometry = new THREE.BufferGeometry()
      const currentPos = new Float32Array(count * 3)
      const targetPos = new Float32Array(count * 3)
      const noisePos = new Float32Array(count * 3)
      const randomSpeeds = new Float32Array(count)

      for (let i = 0; i < count; i++) {
        targetPos[i * 3] = targetCoords[i * 3] + currentLogoOffsetX
        targetPos[i * 3 + 1] = targetCoords[i * 3 + 1]
        targetPos[i * 3 + 2] = targetCoords[i * 3 + 2]

        const radius = Math.pow(Math.random(), 0.6) * 11.0
        const theta = Math.random() * Math.PI * 2
        const phi = (Math.random() - 0.5) * Math.PI

        noisePos[i * 3] = radius * Math.cos(theta) * Math.cos(phi) * 1.3
        noisePos[i * 3 + 1] = radius * Math.sin(phi) * 0.75
        noisePos[i * 3 + 2] = (Math.random() - 0.5) * 5.0

        currentPos[i * 3] = targetPos[i * 3]
        currentPos[i * 3 + 1] = targetPos[i * 3 + 1]
        currentPos[i * 3 + 2] = targetPos[i * 3 + 2]

        randomSpeeds[i] = 0.8 + Math.random() * 0.4
      }

      geometry.setAttribute("position", new THREE.BufferAttribute(currentPos, 3))

      particleMaterial = new THREE.PointsMaterial({
        size: 0.038,
        color: 0xd8ad42,
        transparent: true,
        opacity: 0.95,
        blending: THREE.AdditiveBlending,
      })

      const particleSystem = new THREE.Points(geometry, particleMaterial)
      scene.add(particleSystem)

      let progress = 1.0
      let dir = -1
      let holdTimer = 4.0
      const PAUSE_AT_100 = 4.5
      const PAUSE_AT_0 = 1.0
      const clock = new THREE.Clock()

      const animate = () => {
        if (isDisposed || !renderer || !geometry || !particleMaterial) return
        animationFrameId = requestAnimationFrame(animate)

        const delta = Math.min(clock.getDelta(), 0.1)

        if (holdTimer > 0) {
          holdTimer -= delta
        } else {
          progress += dir * delta * 0.42

          if (progress >= 1.0) {
            progress = 1.0
            dir = -1
            holdTimer = PAUSE_AT_100
          } else if (progress <= 0.02) {
            progress = 0.02
            dir = 1
            holdTimer = PAUSE_AT_0
          }
        }

        if (progress >= 0.92) {
          particleMaterial.color.setHex(0xfad36b)
          particleMaterial.size = 0.036
          particleMaterial.opacity = 0.98
        } else if (progress > 0.3) {
          particleMaterial.color.setHex(0xd8ad42)
          particleMaterial.size = 0.042
          particleMaterial.opacity = 0.85
        } else {
          particleMaterial.color.setHex(0xa6741c)
          particleMaterial.size = 0.046
          particleMaterial.opacity = 0.65
        }

        const pos = geometry.attributes.position.array as Float32Array
        const time = clock.getElapsedTime()

        for (let i = 0; i < count; i++) {
          const idx = i * 3
          const spd = randomSpeeds[i]

          const floatNoiseX = Math.sin(time * 0.4 + i) * 0.18 * (1 - progress)
          const floatNoiseY = Math.cos(time * 0.5 + i * 2) * 0.18 * (1 - progress)

          const targetX = noisePos[idx] + floatNoiseX + (targetPos[idx] - noisePos[idx]) * progress
          const targetY = noisePos[idx + 1] + floatNoiseY + (targetPos[idx + 1] - noisePos[idx + 1]) * progress
          const targetZ = noisePos[idx + 2] + (targetPos[idx + 2] - noisePos[idx + 2]) * progress

          pos[idx] += (targetX - pos[idx]) * (delta * 5.8 * spd)
          pos[idx + 1] += (targetY - pos[idx + 1]) * (delta * 5.8 * spd)
          pos[idx + 2] += (targetZ - pos[idx + 2]) * (delta * 5.8 * spd)
        }
        geometry.attributes.position.needsUpdate = true

        const rotDamping = progress > 0.9 ? 0.12 : 0.4
        particleSystem.rotation.y = Math.sin(time * 0.3) * 0.08 * rotDamping

        renderer.render(scene, camera)
      }

      animate()

      const handleResize = () => {
        if (isDisposed || !container || !renderer) return
        width = container.clientWidth
        height = container.clientHeight
        camera.aspect = width / height
        camera.updateProjectionMatrix()
        renderer.setSize(width, height)

        const newParams = getLogoOffset(width, height)
        if (newParams.offsetX !== currentLogoOffsetX) {
          currentLogoOffsetX = newParams.offsetX
          for (let i = 0; i < count; i++) {
            targetPos[i * 3] = targetCoords[i * 3] + currentLogoOffsetX
          }
        }
      }

      resizeObserver = new ResizeObserver(handleResize)
      resizeObserver.observe(container)
    }

    return () => {
      isDisposed = true
      cancelAnimationFrame(animationFrameId)
      if (resizeObserver) resizeObserver.disconnect()
      if (renderer && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      if (geometry) geometry.dispose()
      if (particleMaterial) particleMaterial.dispose()
      if (renderer) renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none select-none z-0"
      aria-hidden="true"
    />
  )
}
