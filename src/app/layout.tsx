import type { Metadata } from "next"
import { Bodoni_Moda, Space_Grotesk } from "next/font/google"
import { ShaderBackground } from "@/components/shader-background"
import "./globals.css"

const displayFont = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-display-google",
  weight: ["500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
})

const bodyFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-body-google",
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "Vishay Agarwal",
  description: "A hyper-reactive portfolio foundation with a global ShaderGradient background.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body className={`${bodyFont.className} min-h-screen antialiased`}>
        <div className="site-shell">
          <ShaderBackground />
          <div className="site-overlay" aria-hidden="true" />
          <div className="site-noise" aria-hidden="true" />
          <div className="site-content">{children}</div>
        </div>
      </body>
    </html>
  )
}
