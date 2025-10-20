import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getImagePath(path: string): string {
  const basePath = process.env.NODE_ENV === "production" ? "/pigroup-research" : ""
  return `${basePath}${path}`
}

export function getPagePath(path: string): string {
  const basePath = process.env.NODE_ENV === "production" ? "/pigroup-research" : ""
  
  // Si la ruta es solo "/", devolver solo el basePath o "/"
  if (path === "/") {
    return basePath || "/"
  }
  
  // Para otras rutas, agregar el basePath
  return `${basePath}${path}`
}
