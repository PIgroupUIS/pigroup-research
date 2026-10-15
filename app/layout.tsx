import type React from "react"
import type { Metadata } from "next"
import { IBM_Plex_Sans, IBM_Plex_Mono, Source_Serif_4 } from "next/font/google"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { RevealObserver } from "@/components/reveal-observer"
import { LanguageProvider } from "@/components/language-context"
import "./globals.css"

const body = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-body", display: "swap" })
const display = Source_Serif_4({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-display", display: "swap" })
const meta = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-meta", display: "swap" })

const basePath = process.env.NODE_ENV === "production" ? "/pigroup-research" : ""

export const metadata: Metadata = {
  title: {
    default: "PIGroup Research — Universidad Industrial de Santander",
    template: "%s · PIGroup Research",
  },
  description: "Grupo de investigación PIGroup de la Universidad Industrial de Santander",
  icons: {
    icon: [
      { url: `${basePath}/icon.png`, type: "image/png" },
      { url: `${basePath}/favicon.ico` },
    ],
    apple: `${basePath}/apple-icon.png`,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${body.variable} ${display.variable} ${meta.variable}`}>
      <head>
        <link rel="icon" type="image/png" href={`${basePath}/icon.png`} />
        <link rel="shortcut icon" href={`${basePath}/favicon.ico`} />
        <link rel="apple-touch-icon" href={`${basePath}/apple-icon.png`} />
      </head>
      <body className="font-sans antialiased">
        <LanguageProvider>
          <Header />
          {children}
          <Footer />
          <RevealObserver />
        </LanguageProvider>
      </body>
    </html>
  )
}
